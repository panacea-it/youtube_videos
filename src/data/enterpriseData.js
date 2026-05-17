import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Globe,
  MousePointer,
  PlayCircle,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UploadCloud,
  Users,
  Video,
  Youtube,
} from 'lucide-react'

export const systemHealth = [
  { label: 'API quota', value: 82, tone: 'bg-blue-500' },
  { label: 'Sync queue', value: 67, tone: 'bg-violet-500' },
  { label: 'AI jobs', value: 44, tone: 'bg-emerald-500' },
]

export const statCards = [
  { title: 'Total channels', value: '58', delta: '+4 this month', trend: 'up', icon: Youtube, accent: 'red' },
  { title: 'Total videos', value: '75.4K', delta: '+1,248', trend: 'up', icon: Video, accent: 'blue' },
  { title: 'Published videos', value: '69.8K', delta: '92.5% live', trend: 'up', icon: CheckCircle, accent: 'green' },
  { title: 'Scheduled videos', value: '842', delta: 'next 14 days', trend: 'flat', icon: Calendar, accent: 'violet' },
  { title: 'Draft videos', value: '4.7K', delta: '-6.8% stale', trend: 'down', icon: FileText, accent: 'amber' },
  { title: 'Total views', value: '482M', delta: '+18.4%', trend: 'up', icon: Eye, accent: 'cyan' },
  { title: 'Total revenue', value: '$1.28M', delta: '+12.9%', trend: 'up', icon: DollarSign, accent: 'emerald' },
  { title: 'Subscribers', value: '14.7M', delta: '+318K', trend: 'up', icon: Users, accent: 'pink' },
]

export const revenueSeries = [
  { date: 'Jan', revenue: 186000, ads: 122000, sponsors: 43000, memberships: 21000 },
  { date: 'Feb', revenue: 204000, ads: 137000, sponsors: 44000, memberships: 23000 },
  { date: 'Mar', revenue: 218000, ads: 146000, sponsors: 47000, memberships: 25000 },
  { date: 'Apr', revenue: 244000, ads: 159000, sponsors: 56000, memberships: 29000 },
  { date: 'May', revenue: 269000, ads: 178000, sponsors: 59000, memberships: 32000 },
  { date: 'Jun', revenue: 292000, ads: 194000, sponsors: 64000, memberships: 34000 },
  { date: 'Jul', revenue: 318000, ads: 214000, sponsors: 68000, memberships: 36000 },
  { date: 'Aug', revenue: 344000, ads: 231000, sponsors: 72000, memberships: 41000 },
  { date: 'Sep', revenue: 371000, ads: 248000, sponsors: 79000, memberships: 44000 },
  { date: 'Oct', revenue: 398000, ads: 267000, sponsors: 84000, memberships: 47000 },
  { date: 'Nov', revenue: 426000, ads: 286000, sponsors: 91000, memberships: 49000 },
  { date: 'Dec', revenue: 462000, ads: 312000, sponsors: 97000, memberships: 53000 },
]

export const growthSeries = [
  { date: 'W1', subscribers: 312000, channels: 51, views: 28 },
  { date: 'W2', subscribers: 338000, channels: 52, views: 31 },
  { date: 'W3', subscribers: 351000, channels: 52, views: 33 },
  { date: 'W4', subscribers: 386000, channels: 54, views: 37 },
  { date: 'W5', subscribers: 421000, channels: 55, views: 41 },
  { date: 'W6', subscribers: 446000, channels: 57, views: 44 },
  { date: 'W7', subscribers: 482000, channels: 58, views: 48 },
]

export const performanceSeries = [
  { name: 'Tutorials', views: 38, retention: 68, ctr: 9.8 },
  { name: 'Reviews', views: 26, retention: 54, ctr: 7.2 },
  { name: 'Shorts', views: 64, retention: 82, ctr: 12.4 },
  { name: 'Podcasts', views: 18, retention: 72, ctr: 5.8 },
  { name: 'Live', views: 22, retention: 61, ctr: 6.4 },
]

export const audienceRetention = [
  { point: '0%', retention: 100 },
  { point: '10%', retention: 92 },
  { point: '25%', retention: 78 },
  { point: '50%', retention: 63 },
  { point: '75%', retention: 47 },
  { point: '100%', retention: 36 },
]

export const deviceAnalytics = [
  { name: 'Mobile', value: 58 },
  { name: 'TV', value: 18 },
  { name: 'Desktop', value: 16 },
  { name: 'Tablet', value: 8 },
]

export const countryAnalytics = [
  { country: 'United States', views: '118M', revenue: '$412K', ctr: '9.4%' },
  { country: 'India', views: '96M', revenue: '$186K', ctr: '11.1%' },
  { country: 'United Kingdom', views: '44M', revenue: '$144K', ctr: '8.7%' },
  { country: 'Canada', views: '31M', revenue: '$98K', ctr: '8.2%' },
]

export const heatmapRows = [
  ['76%', '82%', '71%', '64%', '55%', '49%', '42%'],
  ['58%', '61%', '66%', '72%', '78%', '81%', '74%'],
  ['41%', '48%', '52%', '69%', '88%', '91%', '84%'],
  ['33%', '37%', '45%', '58%', '70%', '77%', '69%'],
]

export const topVideos = [
  {
    id: 'tv1',
    title: 'AI Workflow for YouTube Growth Teams',
    channel: 'Creator Ops Lab',
    views: '8.4M',
    ctr: '13.2%',
    revenue: '$42.8K',
    score: 96,
  },
  {
    id: 'tv2',
    title: 'The 2026 Shorts Algorithm Explained',
    channel: 'Tube Strategy Pro',
    views: '6.9M',
    ctr: '11.6%',
    revenue: '$31.4K',
    score: 93,
  },
  {
    id: 'tv3',
    title: 'Building a 30-Day Content Calendar',
    channel: 'Marketing Systems',
    views: '4.1M',
    ctr: '9.8%',
    revenue: '$24.2K',
    score: 89,
  },
]

export const recentUploads = [
  { title: 'Revenue Optimization Playbook', channel: 'Creator Ops Lab', status: 'Published', time: '12 min ago' },
  { title: 'Monday Content Standup', channel: 'Agency Scale', status: 'Scheduled', time: '1h ago' },
  { title: 'CTR Audit: 50 Thumbnails', channel: 'Tube Strategy Pro', status: 'Draft', time: '3h ago' },
]

export const trendingChannels = [
  { name: 'Creator Ops Lab', subscribers: '2.8M', growth: '+24.8%', avatar: 'CO' },
  { name: 'Tube Strategy Pro', subscribers: '1.9M', growth: '+18.1%', avatar: 'TS' },
  { name: 'Marketing Systems', subscribers: '1.2M', growth: '+14.6%', avatar: 'MS' },
]

export const teamActivity = [
  { user: 'Maya Chen', action: 'approved 18 AI title variants', time: '4m ago', icon: Sparkles },
  { user: 'Noah Patel', action: 'scheduled 42 uploads across 9 channels', time: '16m ago', icon: Calendar },
  { user: 'Amara Singh', action: 'resolved a copyright claim', time: '38m ago', icon: ShieldAlert },
  { user: 'Leo Martin', action: 'exported the weekly revenue report', time: '1h ago', icon: FileText },
]

export const notifications = [
  { id: 1, type: 'Failed upload', message: '4K render failed for Creator Ops Lab batch upload.', severity: 'danger', time: '2m ago', icon: AlertTriangle },
  { id: 2, type: 'Revenue alert', message: 'Sponsorship revenue is pacing 21% above forecast.', severity: 'success', time: '18m ago', icon: DollarSign },
  { id: 3, type: 'Trending video', message: 'Shorts Algorithm Explained crossed 500K views in 2 hours.', severity: 'info', time: '31m ago', icon: TrendingUp },
  { id: 4, type: 'Copyright alert', message: 'Manual claim requires review before publication.', severity: 'warning', time: '1h ago', icon: ShieldAlert },
  { id: 5, type: 'Team alert', message: '3 channel managers requested elevated permissions.', severity: 'info', time: '2h ago', icon: Bell },
]

export const channels = [
  {
    id: 'ch1',
    name: 'Creator Ops Lab',
    logo: 'CO',
    subscribers: '2.8M',
    views: '118M',
    revenue: '$412K',
    videos: 2840,
    status: 'Healthy',
    manager: 'Maya Chen',
    lastSynced: '3 min ago',
  },
  {
    id: 'ch2',
    name: 'Tube Strategy Pro',
    logo: 'TS',
    subscribers: '1.9M',
    views: '96M',
    revenue: '$318K',
    videos: 1924,
    status: 'Review',
    manager: 'Noah Patel',
    lastSynced: '12 min ago',
  },
  {
    id: 'ch3',
    name: 'Marketing Systems',
    logo: 'MS',
    subscribers: '1.2M',
    views: '64M',
    revenue: '$206K',
    videos: 1468,
    status: 'Healthy',
    manager: 'Amara Singh',
    lastSynced: '21 min ago',
  },
  {
    id: 'ch4',
    name: 'Agency Scale',
    logo: 'AS',
    subscribers: '840K',
    views: '42M',
    revenue: '$144K',
    videos: 1092,
    status: 'Paused',
    manager: 'Leo Martin',
    lastSynced: '1h ago',
  },
]

export const videos = [
  {
    id: 'v1',
    title: 'AI Workflow for YouTube Growth Teams',
    channel: 'Creator Ops Lab',
    category: 'AI Tools',
    views: '8.4M',
    likes: '412K',
    comments: '18.2K',
    revenue: '$42.8K',
    seoScore: 96,
    status: 'Published',
    publishDate: 'May 16, 2026',
    duration: '18:42',
    thumbnail: 'https://placehold.co/360x202/111827/ffffff?text=AI+Workflow',
  },
  {
    id: 'v2',
    title: 'The 2026 Shorts Algorithm Explained',
    channel: 'Tube Strategy Pro',
    category: 'Growth',
    views: '6.9M',
    likes: '326K',
    comments: '22.4K',
    revenue: '$31.4K',
    seoScore: 93,
    status: 'Published',
    publishDate: 'May 15, 2026',
    duration: '11:08',
    thumbnail: 'https://placehold.co/360x202/dc2626/ffffff?text=Shorts+Algorithm',
  },
  {
    id: 'v3',
    title: 'Building a 30-Day Content Calendar',
    channel: 'Marketing Systems',
    category: 'Planning',
    views: '4.1M',
    likes: '214K',
    comments: '9.8K',
    revenue: '$24.2K',
    seoScore: 89,
    status: 'Scheduled',
    publishDate: 'May 18, 2026',
    duration: '24:16',
    thumbnail: 'https://placehold.co/360x202/2563eb/ffffff?text=Content+Calendar',
  },
  {
    id: 'v4',
    title: 'CTR Audit: 50 Thumbnails Ranked',
    channel: 'Creator Ops Lab',
    category: 'SEO',
    views: '892K',
    likes: '48K',
    comments: '3.2K',
    revenue: '$8.7K',
    seoScore: 84,
    status: 'Draft',
    publishDate: 'Not set',
    duration: '31:55',
    thumbnail: 'https://placehold.co/360x202/7c3aed/ffffff?text=CTR+Audit',
  },
  {
    id: 'v5',
    title: 'Sponsorship Pricing Models for Channels',
    channel: 'Agency Scale',
    category: 'Revenue',
    views: '1.7M',
    likes: '82K',
    comments: '5.6K',
    revenue: '$19.1K',
    seoScore: 78,
    status: 'Needs Review',
    publishDate: 'May 20, 2026',
    duration: '21:33',
    thumbnail: 'https://placehold.co/360x202/059669/ffffff?text=Sponsorships',
  },
]

export const seoKeywords = [
  { keyword: 'youtube automation', rank: 2, volume: '74K', movement: '+4' },
  { keyword: 'youtube seo checklist', rank: 3, volume: '41K', movement: '+2' },
  { keyword: 'shorts algorithm 2026', rank: 1, volume: '96K', movement: '+8' },
  { keyword: 'creator analytics', rank: 6, volume: '28K', movement: '-1' },
]

export const aiTools = [
  { title: 'AI title generation', description: 'Generate CTR-optimized title variants from transcript context.', icon: Sparkles },
  { title: 'AI description generation', description: 'Draft structured descriptions with chapters and links.', icon: Bot },
  { title: 'AI thumbnail suggestions', description: 'Score concepts, copy, emotion, contrast, and brand fit.', icon: Eye },
  { title: 'AI hashtag generator', description: 'Create topical hashtag clusters for search discovery.', icon: Search },
  { title: 'AI content planner', description: 'Plan multi-channel calendars from audience gaps.', icon: Calendar },
  { title: 'Viral score prediction', description: 'Predict launch velocity from hooks, topics, and timing.', icon: TrendingUp },
]

export const teamMembers = [
  { name: 'Maya Chen', role: 'Super Admin', team: 'Operations', productivity: 94, activity: 'Online' },
  { name: 'Noah Patel', role: 'Channel Manager', team: 'Publishing', productivity: 88, activity: 'Reviewing schedules' },
  { name: 'Amara Singh', role: 'SEO Manager', team: 'Optimization', productivity: 91, activity: 'Keyword audit' },
  { name: 'Leo Martin', role: 'Video Editor', team: 'Creative', productivity: 82, activity: 'Rendering batch' },
  { name: 'Sofia Reyes', role: 'Analytics Team', team: 'Insights', productivity: 89, activity: 'Revenue report' },
]

export const permissions = [
  { role: 'Super Admin', channels: 'All', publish: true, revenue: true, ai: true, settings: true },
  { role: 'Channel Manager', channels: 'Assigned', publish: true, revenue: false, ai: true, settings: false },
  { role: 'SEO Manager', channels: 'Assigned', publish: false, revenue: false, ai: true, settings: false },
  { role: 'Video Editor', channels: 'Assigned', publish: false, revenue: false, ai: false, settings: false },
  { role: 'Analytics Team', channels: 'Read only', publish: false, revenue: true, ai: false, settings: false },
]

export const reportCards = [
  { title: 'Revenue reports', icon: DollarSign, cadence: 'Daily + weekly', exports: 'PDF, CSV, Excel' },
  { title: 'Video reports', icon: Video, cadence: 'Weekly', exports: 'CSV, Excel' },
  { title: 'Channel reports', icon: Youtube, cadence: 'Monthly', exports: 'PDF, CSV' },
  { title: 'Team reports', icon: Users, cadence: 'Weekly', exports: 'PDF, Excel' },
]

export const settingsSections = [
  { title: 'General settings', icon: Activity, description: 'Workspace identity, locale, time zone, and defaults.' },
  { title: 'API integrations', icon: UploadCloud, description: 'Connect data warehouses, Slack, HubSpot, and Monday.com.' },
  { title: 'YouTube API settings', icon: Youtube, description: 'Quota monitoring, OAuth apps, sync windows, and scopes.' },
  { title: 'AI provider settings', icon: Bot, description: 'Model routing, provider keys, spending caps, and audit logs.' },
  { title: 'Notification settings', icon: Bell, description: 'Alert rules for teams, channels, revenue, and copyright.' },
  { title: 'User permissions', icon: Users, description: 'Roles, teams, invitations, approvals, and SSO policies.' },
  { title: 'Theme settings', icon: Globe, description: 'Light/dark defaults, density, dashboard cards, and branding.' },
  { title: 'Security settings', icon: ShieldAlert, description: 'MFA, session policies, IP allowlists, and data retention.' },
]

export const searchSuggestions = [
  { label: 'Open video management', path: '/content/videos', icon: PlayCircle },
  { label: 'Review revenue anomalies', path: '/revenue', icon: DollarSign },
  { label: 'Generate AI titles', path: '/ai-tools', icon: Bot },
  { label: 'View channel sync health', path: '/channels', icon: Youtube },
  { label: 'Export executive report', path: '/reports', icon: FileText },
]

export const analyticsMetrics = [
  { label: 'CTR', value: '9.8%', change: '+1.4%', icon: MousePointer },
  { label: 'Watch time', value: '31.2M hrs', change: '+11.2%', icon: Clock },
  { label: 'Avg view duration', value: '7:42', change: '+0:36', icon: PlayCircle },
  { label: 'Engagement rate', value: '6.4%', change: '+0.9%', icon: BarChart3 },
]
