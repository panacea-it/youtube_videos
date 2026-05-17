import {
  LayoutDashboard,
  Film,
  Clapperboard,
  Radio,
  ListVideo,
  BarChart3,
  MessageSquare,
  Users,
  DollarSign,
  ShieldAlert,
  Settings,
} from 'lucide-react'

/** YouTube Studio–style sidebar */
export const SIDEBAR_DASHBOARD = {
  id: 'dashboard',
  label: 'Dashboard',
  path: '/dashboard',
  icon: LayoutDashboard,
}

export const SIDEBAR_GROUPS = [
  {
    id: 'content',
    label: 'Content',
    icon: Film,
    children: [
      { label: 'Videos', path: '/content/videos', icon: Film },
      { label: 'Shorts', path: '/content/shorts', icon: Clapperboard },
      { label: 'Live', path: '/content/live', icon: Radio },
      { label: 'Playlists', path: '/content/playlists', icon: ListVideo },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: BarChart3,
    children: [
      { label: 'Analytics', path: '/analytics', icon: BarChart3 },
      { label: 'Comments', path: '/community/comments', icon: MessageSquare },
    ],
  },
  {
    id: 'management',
    label: 'Management',
    icon: Users,
    children: [
      { label: 'Channels', path: '/channels', icon: Users },
      { label: 'Monetization', path: '/monetization', icon: DollarSign },
      { label: 'Copyright', path: '/copyright', icon: ShieldAlert },
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
