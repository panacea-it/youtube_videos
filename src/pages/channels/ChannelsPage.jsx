import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowUpDown,
  ExternalLink,
  Filter,
  Grid,
  List,
  PlusCircle,
  RefreshCw,
  SlidersHorizontal,
  Users,
} from 'lucide-react'
import { channels as demoChannels } from '../../data/enterpriseData'
import {
  fetchLiveChannel,
  fetchRecentUploads,
  hasYoutubeApiKey,
  loadLiveChannels,
  saveLiveChannels,
} from '../../services/youtubeApi'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { SearchInput } from '../../components/ui/input'

function statusVariant(status) {
  if (status === 'Healthy') return 'success'
  if (status === 'Review') return 'warning'
  return 'default'
}

function formatDate(value) {
  if (!value) return 'Unknown'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value))
}

function ChannelAvatar({ channel, size = 'md' }) {
  const sizeClass = size === 'lg' ? 'h-16 w-16 text-base' : 'h-11 w-11 text-xs'
  return channel.thumbnail ? (
    <img
      src={channel.thumbnail}
      alt=""
      className={`${sizeClass} rounded-2xl bg-slate-900 object-cover`}
    />
  ) : (
    <span className={`${sizeClass} flex items-center justify-center rounded-2xl bg-red-600 font-black text-white`}>
      {channel.logo}
    </span>
  )
}

export default function ChannelsPage() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState('table')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [channelIdentifier, setChannelIdentifier] = useState('narasimhaakkisetty2112')
  const [manager, setManager] = useState('Studio Admin')
  const [liveChannels, setLiveChannels] = useState(() => loadLiveChannels())
  const [selectedChannel, setSelectedChannel] = useState(() => loadLiveChannels()[0] || null)
  const [recentUploads, setRecentUploads] = useState([])
  const [loadingChannel, setLoadingChannel] = useState(false)
  const [loadingUploads, setLoadingUploads] = useState(false)
  const [error, setError] = useState('')

  const allChannels = useMemo(() => {
    const liveIds = new Set(liveChannels.map((channel) => channel.id))
    return [...liveChannels, ...demoChannels.filter((channel) => !liveIds.has(channel.id))]
  }, [liveChannels])

  const filtered = useMemo(() => {
    const normalized = search.toLowerCase()
    return allChannels.filter((channel) => {
      return (
        channel.name.toLowerCase().includes(normalized) ||
        channel.manager.toLowerCase().includes(normalized) ||
        channel.sourceIdentifier?.toLowerCase().includes(normalized)
      )
    })
  }, [allChannels, search])

  useEffect(() => {
    saveLiveChannels(liveChannels)
  }, [liveChannels])

  useEffect(() => {
    let cancelled = false

    async function loadUploads() {
      if (!selectedChannel?.live || !selectedChannel.uploadsPlaylistId || !hasYoutubeApiKey()) {
        setRecentUploads([])
        return
      }

      setLoadingUploads(true)
      try {
        const uploads = await fetchRecentUploads(selectedChannel.uploadsPlaylistId)
        if (!cancelled) setRecentUploads(uploads)
      } catch {
        if (!cancelled) setRecentUploads([])
      } finally {
        if (!cancelled) setLoadingUploads(false)
      }
    }

    loadUploads()
    return () => {
      cancelled = true
    }
  }, [selectedChannel])

  const connectChannel = async (event) => {
    event.preventDefault()
    setError('')
    setLoadingChannel(true)

    try {
      const liveChannel = await fetchLiveChannel(channelIdentifier, manager || 'Studio Admin')
      setLiveChannels((current) => [liveChannel, ...current.filter((channel) => channel.id !== liveChannel.id)])
      setSelectedChannel(liveChannel)
      setDialogOpen(false)
    } catch (err) {
      setError(err.message || 'Unable to connect this YouTube channel.')
    } finally {
      setLoadingChannel(false)
    }
  }

  const refreshSelectedChannel = async () => {
    if (!selectedChannel?.sourceIdentifier) return
    setError('')
    setLoadingChannel(true)
    try {
      const liveChannel = await fetchLiveChannel(selectedChannel.sourceIdentifier, selectedChannel.manager)
      setLiveChannels((current) => [liveChannel, ...current.filter((channel) => channel.id !== liveChannel.id)])
      setSelectedChannel(liveChannel)
    } catch (err) {
      setError(err.message || 'Unable to refresh this YouTube channel.')
    } finally {
      setLoadingChannel(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Badge variant="premium">Channel portfolio</Badge>
              <h1 className="mt-3 text-3xl font-black tracking-tight">Channel management</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                Add a YouTube channel ID, handle, username, or URL to fetch live public channel data including
                subscribers, views, video count, profile data, and recent uploads.
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button><PlusCircle className="h-4 w-4" /> Add live channel</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add YouTube live channel</DialogTitle>
                  <DialogDescription>
                    Enter a channel ID, handle, username, or URL. Example: nisharath2326, @nisharath2326, or a
                    youtube.com/channel URL.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 p-5" onSubmit={connectChannel}>
                  {!hasYoutubeApiKey() && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100">
                      <div className="flex gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                        <div>
                          <p className="font-black">YouTube API key required</p>
                          <p className="mt-1">
                            Add <code>VITE_YOUTUBE_API_KEY=your_key</code> to your local <code>.env</code> file,
                            then restart <code>npm run dev</code>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
                      {error}
                    </div>
                  )}

                  <label className="block text-sm font-bold">
                    Channel ID, handle, username, or URL
                    <input
                      value={channelIdentifier}
                      onChange={(event) => setChannelIdentifier(event.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 font-normal outline-none focus:border-blue-500"
                      placeholder="narasimhaakkisetty2112"
                    />
                  </label>
                  <label className="block text-sm font-bold">
                    Assigned manager
                    <input
                      value={manager}
                      onChange={(event) => setManager(event.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 font-normal outline-none focus:border-blue-500"
                      placeholder="Studio Admin"
                    />
                  </label>
                  <Button className="w-full" disabled={loadingChannel || !channelIdentifier.trim()}>
                    {loadingChannel ? 'Connecting live channel...' : 'Connect and fetch live data'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <Card>
          <CardContent className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
            <SearchInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search channels..." className="max-w-lg" />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline"><Filter className="h-4 w-4" /> Filters</Button>
              <Button variant="outline"><SlidersHorizontal className="h-4 w-4" /> Bulk actions</Button>
              <div className="flex rounded-xl border border-[rgb(var(--border))] p-1">
                <button type="button" onClick={() => setView('table')} className={`rounded-lg p-2 ${view === 'table' ? 'bg-[rgb(var(--muted))]' : ''}`} aria-label="Table view">
                  <List className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setView('grid')} className={`rounded-lg p-2 ${view === 'grid' ? 'bg-[rgb(var(--muted))]' : ''}`} aria-label="Grid view">
                  <Grid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {view === 'grid' ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((channel) => (
              <Card key={channel.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <ChannelAvatar channel={channel} size="lg" />
                    <Badge variant={channel.live ? 'success' : statusVariant(channel.status)}>{channel.live ? 'Live API' : channel.status}</Badge>
                  </div>
                  <h2 className="mt-4 text-lg font-black">{channel.name}</h2>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Managed by {channel.manager}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <span><b>{channel.subscribers}</b><br />Subscribers</span>
                    <span><b>{channel.views}</b><br />Views</span>
                    <span><b>{channel.revenue}</b><br />Revenue</span>
                    <span><b>{channel.videos}</b><br />Videos</span>
                  </div>
                  <Button variant="outline" className="mt-5 w-full" onClick={() => setSelectedChannel(channel)}>
                    View details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="bg-[rgb(var(--muted))]/70 text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
                  <tr>
                    {['Channel logo', 'Channel name', 'Subscribers', 'Views', 'Revenue', 'Videos count', 'Status', 'Assigned manager', 'Last synced'].map((head) => (
                      <th key={head} className="px-4 py-3">
                        <span className="inline-flex items-center gap-1">{head} <ArrowUpDown className="h-3 w-3" /></span>
                      </th>
                    ))}
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgb(var(--border))]">
                  {filtered.map((channel) => (
                    <tr key={channel.id} className="hover:bg-[rgb(var(--muted))]/50">
                      <td className="px-4 py-4"><ChannelAvatar channel={channel} /></td>
                      <td className="px-4 py-4">
                        <p className="font-black">{channel.name}</p>
                        {channel.sourceIdentifier && <p className="text-xs text-[rgb(var(--muted-foreground))]">{channel.sourceIdentifier}</p>}
                      </td>
                      <td className="px-4 py-4">{channel.subscribers}</td>
                      <td className="px-4 py-4">{channel.views}</td>
                      <td className="px-4 py-4 font-bold text-emerald-600 dark:text-emerald-300">{channel.revenue}</td>
                      <td className="px-4 py-4">{channel.videos}</td>
                      <td className="px-4 py-4">
                        <Badge variant={channel.live ? 'success' : statusVariant(channel.status)}>{channel.live ? 'Live API' : channel.status}</Badge>
                      </td>
                      <td className="px-4 py-4">{channel.manager}</td>
                      <td className="px-4 py-4 text-[rgb(var(--muted-foreground))]">{channel.lastSynced}</td>
                      <td className="px-4 py-4">
                        <Button variant="outline" size="sm" onClick={() => setSelectedChannel(channel)}>
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div>
              <CardTitle>{selectedChannel?.live ? 'Live channel data' : 'Channel detail'}</CardTitle>
              <CardDescription>
                Public YouTube API data is shown here. Revenue, private watch-time analytics, and monetization data require OAuth/backend access.
              </CardDescription>
            </div>
            {selectedChannel?.live && (
              <Button variant="outline" onClick={refreshSelectedChannel} disabled={loadingChannel}>
                <RefreshCw className="h-4 w-4" />
                {loadingChannel ? 'Refreshing...' : 'Refresh live data'}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {selectedChannel ? (
              <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                <div className="rounded-3xl border border-[rgb(var(--border))] p-5">
                  <div className="flex items-start gap-4">
                    <ChannelAvatar channel={selectedChannel} size="lg" />
                    <div className="min-w-0">
                      <h2 className="text-xl font-black">{selectedChannel.name}</h2>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">{selectedChannel.customUrl || selectedChannel.id}</p>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-5 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    {selectedChannel.description || 'No public description available.'}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <span className="rounded-2xl bg-[rgb(var(--muted))]/60 p-3"><b>{selectedChannel.subscribers}</b><br />Subscribers</span>
                    <span className="rounded-2xl bg-[rgb(var(--muted))]/60 p-3"><b>{selectedChannel.views}</b><br />Views</span>
                    <span className="rounded-2xl bg-[rgb(var(--muted))]/60 p-3"><b>{selectedChannel.videos}</b><br />Videos</span>
                    <span className="rounded-2xl bg-[rgb(var(--muted))]/60 p-3"><b>{selectedChannel.country || 'N/A'}</b><br />Country</span>
                  </div>
                  <p className="mt-4 text-xs text-[rgb(var(--muted-foreground))]">Published: {formatDate(selectedChannel.publishedAt)}</p>
                  {selectedChannel.live && (
                    <a
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-300"
                      href={`https://www.youtube.com/channel/${selectedChannel.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open on YouTube <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black">Recent uploads</p>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">Latest public videos from the uploads playlist.</p>
                    </div>
                    {loadingUploads && <Badge variant="info">Loading...</Badge>}
                  </div>
                  {recentUploads.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {recentUploads.map((video) => (
                        <a
                          key={video.id}
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="grid gap-3 rounded-2xl border border-[rgb(var(--border))] p-3 transition hover:bg-[rgb(var(--muted))]/50 sm:grid-cols-[120px_1fr]"
                        >
                          {video.thumbnail && <img src={video.thumbnail} alt="" className="aspect-video w-full rounded-xl object-cover" />}
                          <span>
                            <span className="line-clamp-2 text-sm font-black">{video.title}</span>
                            <span className="mt-2 grid grid-cols-3 gap-2 text-xs text-[rgb(var(--muted-foreground))]">
                              <span><b>{video.views}</b><br />Views</span>
                              <span><b>{video.likes}</b><br />Likes</span>
                              <span><b>{video.comments}</b><br />Comments</span>
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-[rgb(var(--border))] p-8 text-center">
                      <Users className="mx-auto h-9 w-9 text-[rgb(var(--muted-foreground))]" />
                      <p className="mt-3 font-black">
                        {selectedChannel.live ? 'No recent uploads loaded' : 'Select or add a live channel'}
                      </p>
                      <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
                        Live uploads appear after connecting a channel with a valid YouTube API key.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[rgb(var(--border))] p-10 text-center">
                <Users className="mx-auto h-10 w-10 text-[rgb(var(--muted-foreground))]" />
                <p className="mt-3 font-black">No channel selected</p>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">Add or select a channel to view live data.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
