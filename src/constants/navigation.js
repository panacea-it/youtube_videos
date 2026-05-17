import {
  LayoutDashboard,
  FolderTree,
  Video,
  UploadCloud,
  CalendarClock,
  BarChart3,
  DollarSign,
  SearchCheck,
  Sparkles,
  BellRing,
  FileText,
  Users,
  Activity,
  Settings,
  PlayCircle,
} from 'lucide-react'

export const SIDEBAR_DASHBOARD = {
  id: 'dashboard',
  label: 'Command Dashboard',
  path: '/dashboard',
  icon: LayoutDashboard,
}

export const SIDEBAR_GROUPS = [
  {
    id: 'operations',
    label: 'Operations',
    icon: PlayCircle,
    children: [
      { label: 'Channels', path: '/channels', icon: PlayCircle },
      { label: 'Categories', path: '/categories', icon: FolderTree },
      { label: 'Videos', path: '/content/videos', icon: Video },
      { label: 'Upload Center', path: '/upload-center', icon: UploadCloud },
      { label: 'Schedules', path: '/schedules', icon: CalendarClock },
    ],
  },
  {
    id: 'insights',
    label: 'Growth & Insights',
    icon: BarChart3,
    children: [
      { label: 'Analytics', path: '/analytics', icon: BarChart3 },
      { label: 'Revenue', path: '/revenue', icon: DollarSign },
      { label: 'SEO Tools', path: '/seo-tools', icon: SearchCheck },
      { label: 'AI Tools', path: '/ai-tools', icon: Sparkles },
      { label: 'Reports', path: '/reports', icon: FileText },
    ],
  },
  {
    id: 'management',
    label: 'Administration',
    icon: Users,
    children: [
      { label: 'Notifications', path: '/notifications', icon: BellRing },
      { label: 'Team Management', path: '/team-management', icon: Users },
      { label: 'Activity Logs', path: '/activity-logs', icon: Activity },
      { label: 'Settings', path: '/settings', icon: Settings },
    ],
  },
]

export const SETTINGS_NAV = [
  { label: 'Studio settings', path: '/settings', icon: Settings },
]

export function getGroupIdForPath(pathname) {
  for (const group of SIDEBAR_GROUPS) {
    if (group.children.some((c) => pathname === c.path || pathname.startsWith(`${c.path}/`))) {
      return group.id
    }
  }
  return null
}
