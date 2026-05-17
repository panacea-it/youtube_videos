import { Clapperboard, Radio, ListVideo, BarChart3, MessageSquare, Users, DollarSign, ShieldAlert, Settings } from 'lucide-react'
import ModuleListPage from '../pages/ModuleListPage'
import VideosPage from '../pages/content/VideosPage'
import AnalyticsPage from '../pages/analytics/AnalyticsPage'

export const MODULE_ROUTE_ELEMENTS = [
  { path: 'content/videos', element: <VideosPage /> },
  { path: 'content/shorts', element: <ModuleListPage icon={Clapperboard} title="Shorts" addLabel="Create Short" searchPlaceholder="Search shorts" /> },
  { path: 'content/live', element: <ModuleListPage icon={Radio} title="Live streams" addLabel="Go live" searchPlaceholder="Search streams" /> },
  { path: 'content/playlists', element: <ModuleListPage icon={ListVideo} title="Playlists" addLabel="New playlist" searchPlaceholder="Search playlists" /> },
  { path: 'analytics', element: <AnalyticsPage /> },
  { path: 'community/comments', element: <ModuleListPage icon={MessageSquare} title="Comments" addLabel="Moderate" searchPlaceholder="Search comments" /> },
  { path: 'channels', element: <ModuleListPage icon={Users} title="Channels" addLabel="Add channel" searchPlaceholder="Search channels" /> },
  { path: 'monetization', element: <ModuleListPage icon={DollarSign} title="Monetization" addLabel="View earnings" searchPlaceholder="Search" /> },
  { path: 'copyright', element: <ModuleListPage icon={ShieldAlert} title="Copyright" addLabel="Review claim" searchPlaceholder="Search claims" /> },
  { path: 'settings', element: <ModuleListPage icon={Settings} title="Studio settings" addLabel="Save" searchPlaceholder="Search settings" /> },
]
