import { BarChart3 } from 'lucide-react'
import PageBanner from '../../components/figma/PageBanner'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl space-y-5">
        <PageBanner icon={BarChart3} title="Analytics" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-[#e5e5e5] bg-white text-sm text-[#606060]">
            Views chart — connect backend analytics API
          </div>
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-[#e5e5e5] bg-white text-sm text-[#606060]">
            Watch time chart — connect backend analytics API
          </div>
        </div>
      </div>
    </div>
  )
}
