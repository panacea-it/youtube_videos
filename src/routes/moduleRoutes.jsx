import { lazy } from 'react'
import {
  Activity,
  BellRing,
  CalendarClock,
  DollarSign,
  FolderTree,
  UploadCloud,
} from 'lucide-react'
import ModuleListPage from '../pages/ModuleListPage'

const VideosPage = lazy(() => import('../pages/content/VideosPage'))
const AnalyticsPage = lazy(() => import('../pages/analytics/AnalyticsPage'))
const ChannelsPage = lazy(() => import('../pages/channels/ChannelsPage'))
const SeoToolsPage = lazy(() => import('../pages/seo/SeoToolsPage'))
const AiToolsPage = lazy(() => import('../pages/ai/AiToolsPage'))
const TeamManagementPage = lazy(() => import('../pages/team/TeamManagementPage'))
const ReportsPage = lazy(() => import('../pages/reports/ReportsPage'))
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'))

export const MODULE_ROUTE_ELEMENTS = [
  { path: 'channels', element: <ChannelsPage /> },
  { path: 'categories', element: <ModuleListPage icon={FolderTree} title="Categories" addLabel="New category" searchPlaceholder="Search categories" description="Organize video taxonomy, playlists, content pillars, metadata rules, and ownership boundaries." /> },
  { path: 'content/videos', element: <VideosPage /> },
  { path: 'upload-center', element: <ModuleListPage icon={UploadCloud} title="Upload Center" addLabel="Start upload" searchPlaceholder="Search uploads" description="Bulk upload queue, processing states, failed uploads, metadata imports, and transcript ingestion." /> },
  { path: 'schedules', element: <ModuleListPage icon={CalendarClock} title="Schedules" addLabel="Schedule campaign" searchPlaceholder="Search schedules" description="Cross-channel publishing calendar, embargoes, recurring drops, and time-zone optimized scheduling." /> },
  { path: 'analytics', element: <AnalyticsPage /> },
  { path: 'revenue', element: <ModuleListPage icon={DollarSign} title="Revenue" addLabel="Create revenue report" searchPlaceholder="Search revenue" description="AdSense, sponsorship, memberships, CPM, RPM, payout forecasting, and anomaly review." /> },
  { path: 'seo-tools', element: <SeoToolsPage /> },
  { path: 'ai-tools', element: <AiToolsPage /> },
  { path: 'reports', element: <ReportsPage /> },
  { path: 'notifications', element: <ModuleListPage icon={BellRing} title="Notifications" addLabel="Create alert rule" searchPlaceholder="Search notifications" description="Real-time alerts for failed uploads, revenue spikes, trending videos, copyright, and team events." /> },
  { path: 'team-management', element: <TeamManagementPage /> },
  { path: 'activity-logs', element: <ModuleListPage icon={Activity} title="Activity Logs" addLabel="Export logs" searchPlaceholder="Search activity" description="Audit trail for uploads, edits, AI actions, permissions, exports, and API sync events." /> },
  { path: 'settings', element: <SettingsPage /> },
]
