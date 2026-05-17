const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'
const LIVE_CHANNELS_STORAGE_KEY = 'youtube-admin-live-channels'
const YOUTUBE_API_KEY_STORAGE_KEY = 'youtube-admin-youtube-api-key'

export function hasYoutubeEnvApiKey() {
  return Boolean(import.meta.env.VITE_YOUTUBE_API_KEY)
}

export function getStoredYoutubeApiKey() {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(YOUTUBE_API_KEY_STORAGE_KEY) || ''
}

export function saveYoutubeApiKey(apiKey) {
  if (typeof window === 'undefined') return
  const trimmed = apiKey.trim()
  if (trimmed) {
    window.localStorage.setItem(YOUTUBE_API_KEY_STORAGE_KEY, trimmed)
  } else {
    window.localStorage.removeItem(YOUTUBE_API_KEY_STORAGE_KEY)
  }
}

export function hasYoutubeApiKey() {
  return Boolean(import.meta.env.VITE_YOUTUBE_API_KEY || getStoredYoutubeApiKey())
}

function getYoutubeApiKey() {
  const apiKey = getStoredYoutubeApiKey() || import.meta.env.VITE_YOUTUBE_API_KEY
  if (!apiKey) {
    throw new Error('Add a YouTube API key in this form or set VITE_YOUTUBE_API_KEY in your .env file.')
  }
  return apiKey
}

function formatYoutubeError(payload, fallback) {
  const message = payload?.error?.message || fallback
  const reason = payload?.error?.errors?.[0]?.reason

  if (/blocked/i.test(message)) {
    return [
      message,
      'Enable YouTube Data API v3 for this key and allow these methods: channels.list, search.list, playlistItems.list, videos.list.',
      'If your .env key is restricted, paste an unrestricted/browser-allowed key in the form to override it.',
    ].join(' ')
  }

  if (reason === 'keyInvalid') return 'Invalid YouTube API key. Paste a valid API key or update VITE_YOUTUBE_API_KEY.'
  if (reason === 'quotaExceeded') return 'YouTube API quota exceeded for this key. Use another key or wait for quota reset.'
  if (reason === 'accessNotConfigured') return 'YouTube Data API v3 is not enabled for this Google Cloud project.'

  return message
}

function normalizeIdentifier(input) {
  const raw = input.trim()
  if (!raw) return ''

  try {
    const url = new URL(raw)
    const parts = url.pathname.split('/').filter(Boolean)
    if (parts[0] === 'channel' && parts[1]) return parts[1]
    if (parts[0]?.startsWith('@')) return parts[0]
    if ((parts[0] === 'user' || parts[0] === 'c') && parts[1]) return parts[1]
  } catch {
    // Plain channel IDs, handles, and usernames are expected.
  }

  return raw.replace(/^youtube\.com\//i, '').replace(/^@?handle:/i, '')
}

function compactNumber(value) {
  const number = Number(value || 0)
  if (!Number.isFinite(number)) return '0'
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(number)
}

function initials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'YT'
}

async function youtubeRequest(path, params, apiKeyOverride) {
  const url = new URL(`${YOUTUBE_API_BASE_URL}/${path}`)
  Object.entries({ ...params, key: apiKeyOverride || getYoutubeApiKey() }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value)
  })

  const response = await fetch(url.toString())
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(formatYoutubeError(payload, `YouTube API request failed (${response.status})`))
  }

  return payload
}

export async function testYoutubeApiKey(apiKey) {
  const trimmed = apiKey.trim()
  if (!trimmed) throw new Error('Enter a YouTube API key to test.')

  const payload = await youtubeRequest('channels', {
    part: 'id',
    forHandle: '@YouTube',
    maxResults: 1,
  }, trimmed)

  if (!payload.items?.length) throw new Error('The API key responded, but the YouTube test channel was not returned.')
  return true
}

function channelFromApi(item, sourceIdentifier, manager = 'Live API') {
  const snippet = item.snippet || {}
  const statistics = item.statistics || {}
  const branding = item.brandingSettings?.channel || {}
  const uploadsPlaylistId = item.contentDetails?.relatedPlaylists?.uploads
  const title = snippet.title || 'Untitled YouTube channel'

  return {
    id: item.id,
    name: title,
    logo: initials(title),
    thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
    subscribers: statistics.hiddenSubscriberCount ? 'Hidden' : compactNumber(statistics.subscriberCount),
    views: compactNumber(statistics.viewCount),
    revenue: 'Private',
    videos: Number(statistics.videoCount || 0),
    status: 'Healthy',
    manager,
    lastSynced: 'Just now',
    live: true,
    sourceIdentifier,
    description: snippet.description || branding.description || '',
    customUrl: snippet.customUrl || '',
    country: snippet.country || branding.country || '',
    publishedAt: snippet.publishedAt,
    uploadsPlaylistId,
    rawStatistics: statistics,
  }
}

async function findChannelId(identifier) {
  const normalized = normalizeIdentifier(identifier)
  if (!normalized) throw new Error('Enter a channel ID, handle, username, or YouTube channel URL.')

  if (/^UC[\w-]{20,}$/i.test(normalized)) return normalized

  const handle = normalized.startsWith('@') ? normalized : `@${normalized}`
  const byHandle = await youtubeRequest('channels', {
    part: 'id',
    forHandle: handle,
    maxResults: 1,
  })
  if (byHandle.items?.[0]?.id) return byHandle.items[0].id

  const username = normalized.replace(/^@/, '')
  const byUsername = await youtubeRequest('channels', {
    part: 'id',
    forUsername: username,
    maxResults: 1,
  })
  if (byUsername.items?.[0]?.id) return byUsername.items[0].id

  const search = await youtubeRequest('search', {
    part: 'snippet',
    type: 'channel',
    q: username,
    maxResults: 1,
  })
  const searchId = search.items?.[0]?.snippet?.channelId || search.items?.[0]?.id?.channelId
  if (searchId) return searchId

  throw new Error(`No YouTube channel found for "${identifier}".`)
}

export async function fetchLiveChannel(identifier, manager) {
  const channelId = await findChannelId(identifier)
  const payload = await youtubeRequest('channels', {
    part: 'snippet,statistics,contentDetails,brandingSettings',
    id: channelId,
    maxResults: 1,
  })
  const item = payload.items?.[0]
  if (!item) throw new Error(`No YouTube channel found for "${identifier}".`)
  return channelFromApi(item, identifier, manager)
}

export async function fetchRecentUploads(uploadsPlaylistId, maxResults = 8) {
  if (!uploadsPlaylistId) return []

  const playlist = await youtubeRequest('playlistItems', {
    part: 'snippet,contentDetails',
    playlistId: uploadsPlaylistId,
    maxResults,
  })

  const ids = (playlist.items || [])
    .map((item) => item.contentDetails?.videoId)
    .filter(Boolean)

  if (!ids.length) return []

  const videos = await youtubeRequest('videos', {
    part: 'snippet,statistics,contentDetails',
    id: ids.join(','),
    maxResults,
  })

  return (videos.items || []).map((item) => ({
    id: item.id,
    title: item.snippet?.title || 'Untitled video',
    publishedAt: item.snippet?.publishedAt,
    thumbnail: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url,
    views: compactNumber(item.statistics?.viewCount),
    likes: compactNumber(item.statistics?.likeCount),
    comments: compactNumber(item.statistics?.commentCount),
  }))
}

export function loadLiveChannels() {
  if (typeof window === 'undefined') return []
  try {
    const stored = JSON.parse(window.localStorage.getItem(LIVE_CHANNELS_STORAGE_KEY) || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

export function saveLiveChannels(channels) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LIVE_CHANNELS_STORAGE_KEY, JSON.stringify(channels))
}
