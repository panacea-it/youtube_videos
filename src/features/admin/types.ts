import type { LucideIcon } from 'lucide-react'

export type AdminTheme = 'light' | 'dark'
export type VideoStatus = 'Published' | 'Scheduled' | 'Draft' | 'Needs Review'
export type ChannelStatus = 'Healthy' | 'Review' | 'Paused'
export type BadgeTone = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'premium'

export interface NavigationItem {
  label: string
  path: string
  icon: LucideIcon
}

export interface NavigationGroup {
  id: string
  label: string
  icon: LucideIcon
  children: NavigationItem[]
}

export interface MetricCardModel {
  title: string
  value: string
  delta: string
  trend: 'up' | 'down' | 'flat'
  icon: LucideIcon
  accent: string
}

export interface ChannelRow {
  id: string
  name: string
  logo: string
  subscribers: string
  views: string
  revenue: string
  videos: number
  status: ChannelStatus
  manager: string
  lastSynced: string
}

export interface VideoRow {
  id: string
  title: string
  channel: string
  category: string
  views: string
  likes: string
  comments: string
  revenue: string
  seoScore: number
  status: VideoStatus
  publishDate: string
  duration: string
  thumbnail: string
}

export interface NotificationItem {
  id: number
  type: string
  message: string
  severity: BadgeTone
  time: string
  icon: LucideIcon
}

export interface ReportCardModel {
  title: string
  icon: LucideIcon
  cadence: string
  exports: string
}

export interface AdminApiClient {
  listChannels(): Promise<ChannelRow[]>
  listVideos(params?: { search?: string; status?: VideoStatus | 'All videos' }): Promise<VideoRow[]>
  listNotifications(): Promise<NotificationItem[]>
}
