import { Eye, Clock, Users, IndianRupee, TrendingUp } from 'lucide-react'
import { dashboardStats, topVideos, recentComments } from '../../data/dashboardData'

const icons = [Eye, Clock, Users, IndianRupee]

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f0f0f]">Channel dashboard</h1>
          <p className="mt-1 text-sm text-[#606060]">Last 28 days · YouTube Videos Official</p>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat, i) => {
            const Icon = icons[i]
            return (
              <article
                key={stat.title}
                className="rounded-xl border border-[#e5e5e5] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[#606060]">{stat.title}</p>
                    <p className="mt-2 text-2xl font-bold text-[#0f0f0f]">{stat.value}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#2ba640]">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff0000]/10 text-[#ff0000]">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
              </article>
            )
          })}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-[#e5e5e5] bg-white p-5">
            <h2 className="text-base font-bold text-[#0f0f0f]">Top videos</h2>
            <ul className="mt-4 space-y-3">
              {topVideos.map((v) => (
                <li key={v.title} className="flex items-center justify-between gap-4 border-b border-[#f2f2f2] pb-3 last:border-0">
                  <p className="line-clamp-1 text-sm font-medium text-[#0f0f0f]">{v.title}</p>
                  <span className="shrink-0 text-xs text-[#606060]">{v.views} · CTR {v.ctr}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-[#e5e5e5] bg-white p-5">
            <h2 className="text-base font-bold text-[#0f0f0f]">Recent comments</h2>
            <ul className="mt-4 space-y-4">
              {recentComments.map((c) => (
                <li key={c.user + c.time} className="text-sm">
                  <p className="font-medium text-[#0f0f0f]">{c.user}</p>
                  <p className="mt-0.5 text-[#606060]">{c.text}</p>
                  <p className="mt-1 text-xs text-[#909090]">
                    on {c.video} · {c.time}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  )
}
