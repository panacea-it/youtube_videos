import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Calendar, Download, Filter, RefreshCw, TrendingDown, TrendingUp } from 'lucide-react'
import {
  audienceRetention,
  deviceAnalytics,
  growthSeries,
  notifications,
  performanceSeries,
  recentUploads,
  revenueSeries,
  statCards,
  systemHealth,
  teamActivity,
  topVideos,
  trendingChannels,
} from '../../data/enterpriseData'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

const chartColors = ['#ef4444', '#2563eb', '#10b981', '#8b5cf6']

function accentClass(accent) {
  const map = {
    red: 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
    green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
    cyan: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
    pink: 'bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-300',
  }
  return map[accent] || map.blue
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3 shadow-xl">
      <p className="text-xs font-bold text-[rgb(var(--foreground))]">{label}</p>
      <div className="mt-2 space-y-1">
        {payload.map((item) => (
          <p key={item.name} className="text-xs text-[rgb(var(--muted-foreground))]">
            <span className="font-semibold" style={{ color: item.color }}>
              {item.name}
            </span>
            : {item.value?.toLocaleString?.() || item.value}
          </p>
        ))}
      </div>
    </div>
  )
}

function MetricCard({ stat, index }) {
  const Icon = stat.icon
  const TrendIcon = stat.trend === 'down' ? TrendingDown : TrendingUp
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="surface-card rounded-2xl p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accentClass(stat.accent)}`}>
          <Icon className="h-5 w-5" />
        </span>
        <Badge variant={stat.trend === 'down' ? 'warning' : 'success'}>
          <TrendIcon className="h-3 w-3" />
          {stat.delta}
        </Badge>
      </div>
      <p className="mt-5 text-sm font-semibold text-[rgb(var(--muted-foreground))]">{stat.title}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-[rgb(var(--foreground))]">{stat.value}</p>
    </motion.article>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel overflow-hidden rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl">
              <Badge variant="premium">Live enterprise workspace</Badge>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
                Multi-channel command dashboard
              </h1>
              <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:text-base">
                Executive overview for 58 channels, 75,000+ videos, revenue operations, scheduling, SEO, AI
                optimization, and team activity.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4" />
                Last 28 days
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button>
                <RefreshCw className="h-4 w-4" />
                Refresh live
              </Button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {systemHealth.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/70 p-4 dark:bg-slate-950/40">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-[rgb(var(--foreground))]">{item.label}</span>
                  <span className="text-[rgb(var(--muted-foreground))]">{item.value}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat, index) => (
            <MetricCard key={stat.title} stat={stat} index={index} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Revenue analytics</CardTitle>
                    <CardDescription>Ads, sponsorships, memberships, and total revenue.</CardDescription>
                  </div>
                  <Badge variant="success">+12.9%</Badge>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueSeries}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.42} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
                        <YAxis tickLine={false} axisLine={false} fontSize={12} />
                        <Tooltip content={<ChartTooltip />} />
                        <Area type="monotone" dataKey="revenue" stroke="#ef4444" fill="url(#revenueGradient)" strokeWidth={3} />
                        <Area type="monotone" dataKey="sponsors" stroke="#8b5cf6" fill="transparent" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Channel growth</CardTitle>
                    <CardDescription>Subscriber velocity and multi-channel footprint.</CardDescription>
                  </div>
                  <Badge variant="info">Real-time</Badge>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
                        <YAxis tickLine={false} axisLine={false} fontSize={12} />
                        <Tooltip content={<ChartTooltip />} />
                        <Line type="monotone" dataKey="subscribers" stroke="#2563eb" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <div>
                    <CardTitle>Video performance chart</CardTitle>
                    <CardDescription>Views, retention, and CTR by content format.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                        <YAxis tickLine={false} axisLine={false} fontSize={12} />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="views" fill="#ef4444" radius={[10, 10, 0, 0]} />
                        <Bar dataKey="retention" fill="#2563eb" radius={[10, 10, 0, 0]} />
                        <Bar dataKey="ctr" fill="#10b981" radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Audience retention</CardTitle>
                    <CardDescription>Average retention curve across top videos.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={audienceRetention}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
                        <XAxis dataKey="point" tickLine={false} axisLine={false} fontSize={12} />
                        <YAxis tickLine={false} axisLine={false} fontSize={12} />
                        <Tooltip content={<ChartTooltip />} />
                        <Line type="monotone" dataKey="retention" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Top performing videos</CardTitle>
                    <CardDescription>Ranked by blended revenue, CTR, and retention.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topVideos.map((video, index) => (
                    <div key={video.id} className="flex items-center justify-between gap-4 rounded-2xl bg-[rgb(var(--muted))]/60 p-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[rgb(var(--foreground))]">{video.title}</p>
                          <p className="text-xs text-[rgb(var(--muted-foreground))]">{video.channel}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[rgb(var(--foreground))]">{video.views}</p>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">SEO {video.score}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Device analytics</CardTitle>
                    <CardDescription>Watch behavior by platform and screen type.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-[190px_1fr] sm:items-center">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={deviceAnalytics} dataKey="value" innerRadius={52} outerRadius={78} paddingAngle={4}>
                            {deviceAnalytics.map((entry, index) => (
                              <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<ChartTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      {deviceAnalytics.map((device, index) => (
                        <div key={device.name} className="flex items-center justify-between rounded-xl bg-[rgb(var(--muted))]/60 p-3">
                          <span className="flex items-center gap-2 text-sm font-bold">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColors[index] }} />
                            {device.name}
                          </span>
                          <span className="text-sm font-black">{device.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Right activity panel</CardTitle>
                  <CardDescription>Team activity and platform notifications.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamActivity.map((item) => (
                  <div key={item.user + item.time} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--muted))]">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[rgb(var(--foreground))]">{item.user}</p>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">{item.action}</p>
                      <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Recent uploads</CardTitle>
                  <CardDescription>Fresh content entering publication flows.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentUploads.map((upload) => (
                  <div key={upload.title} className="rounded-2xl border border-[rgb(var(--border))] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-[rgb(var(--foreground))]">{upload.title}</p>
                      <Badge variant={upload.status === 'Published' ? 'success' : upload.status === 'Scheduled' ? 'info' : 'warning'}>
                        {upload.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">{upload.channel} - {upload.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Trending channels</CardTitle>
                  <CardDescription>Fastest-growing managed channels.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingChannels.map((channel) => (
                  <div key={channel.name} className="flex items-center justify-between rounded-2xl bg-[rgb(var(--muted))]/60 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-xs font-black text-white">
                        {channel.avatar}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{channel.name}</p>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">{channel.subscribers} subscribers</p>
                      </div>
                    </div>
                    <Badge variant="success">{channel.growth}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Notifications widget</CardTitle>
                  <CardDescription>Critical alerts needing triage.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="rounded-2xl border border-[rgb(var(--border))] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold">{notification.type}</p>
                      <Badge variant={notification.severity === 'danger' ? 'danger' : notification.severity}>{notification.time}</Badge>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[rgb(var(--muted-foreground))]">{notification.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </div>
  )
}
