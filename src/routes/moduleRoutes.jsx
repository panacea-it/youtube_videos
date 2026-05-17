import {
  Activity,
  BellRing,
  CalendarClock,
  DollarSign,
  FolderTree,
  UploadCloud,
} from 'lucide-react'
import ModuleListPage from '../pages/ModuleListPage'
import VideosPage from '../pages/content/VideosPage'
import AnalyticsPage from '../pages/analytics/AnalyticsPage'
import ChannelsPage from '../pages/channels/ChannelsPage'
import SeoToolsPage from '../pages/seo/SeoToolsPage'
import AiToolsPage from '../pages/ai/AiToolsPage'
import TeamManagementPage from '../pages/team/TeamManagementPage'
import ReportsPage from '../pages/reports/ReportsPage'
import SettingsPage from '../pages/settings/SettingsPage'

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
