import { Calendar, Download, Filter, Globe, Monitor, Smartphone, Tablet } from 'lucide-react'
import {
  analyticsMetrics,
  audienceRetention,
  countryAnalytics,
  deviceAnalytics,
  growthSeries,
  heatmapRows,
  performanceSeries,
  revenueSeries,
  topVideos,
} from '../../data/enterpriseData'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { BarChartPanel, DonutChartPanel, LineChartPanel } from '../../components/ui/charts'

const colors = ['#ef4444', '#2563eb', '#10b981', '#8b5cf6']
const deviceIcons = [Smartphone, Monitor, Globe, Tablet]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Badge variant="info">Analytics center</Badge>
              <h1 className="mt-3 text-3xl font-black tracking-tight">Performance intelligence</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                Deep multi-channel analytics for revenue, watch time, CTR, retention, countries, devices, and
                video-level performance.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline"><Calendar className="h-4 w-4" /> Custom range</Button>
              <Button variant="outline"><Filter className="h-4 w-4" /> Segments</Button>
              <Button><Download className="h-4 w-4" /> Export analytics</Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {analyticsMetrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
                    <metric.icon className="h-5 w-5" />
                  </span>
                  <Badge variant="success">{metric.change}</Badge>
                </div>
                <p className="mt-5 text-sm font-semibold text-[rgb(var(--muted-foreground))]">{metric.label}</p>
                <p className="mt-1 text-2xl font-black">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Revenue analytics</CardTitle>
                <CardDescription>Revenue stack by ads, sponsors, memberships, and blended total.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <LineChartPanel
                data={revenueSeries}
                xKey="date"
                area
                series={[
                  { key: 'ads', label: 'Ads', color: '#ef4444' },
                  { key: 'sponsors', label: 'Sponsors', color: '#8b5cf6' },
                  { key: 'memberships', label: 'Memberships', color: '#10b981' },
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Subscriber growth</CardTitle>
                <CardDescription>Growth velocity by week across the managed channel portfolio.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <LineChartPanel
                data={growthSeries}
                xKey="date"
                series={[
                  { key: 'subscribers', label: 'Subscribers', color: '#2563eb' },
                  { key: 'views', label: 'Views', color: '#ef4444' },
                ]}
              />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <div>
                <CardTitle>CTR and watch-time performance</CardTitle>
                <CardDescription>Compare content formats by views, retention, and click-through rate.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <BarChartPanel
                data={performanceSeries}
                xKey="name"
                bars={[
                  { key: 'views', label: 'Views', color: '#ef4444' },
                  { key: 'retention', label: 'Retention', color: '#2563eb' },
                  { key: 'ctr', label: 'CTR', color: '#10b981' },
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Device analytics</CardTitle>
                <CardDescription>Share of views by device class.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <DonutChartPanel data={deviceAnalytics} colors={colors} className="h-52" />
              <div className="mt-4 space-y-2">
                {deviceAnalytics.map((item, index) => {
                  const Icon = deviceIcons[index]
                  return (
                    <div key={item.name} className="flex items-center justify-between rounded-xl bg-[rgb(var(--muted))]/60 p-3">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </span>
                      <span className="text-sm font-black">{item.value}%</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Audience retention</CardTitle>
                <CardDescription>Retention curve normalized across top uploads.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <LineChartPanel
                data={audienceRetention}
                xKey="point"
                series={[{ key: 'retention', label: 'Retention', color: '#8b5cf6' }]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Publishing heatmap</CardTitle>
                <CardDescription>Engagement intensity by daypart and weekday.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {heatmapRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-7 gap-2">
                    {row.map((value, index) => (
                      <div
                        key={`${rowIndex}-${index}`}
                        className="flex aspect-square items-center justify-center rounded-xl text-xs font-black text-white"
                        style={{ backgroundColor: `rgb(239 68 68 / ${Number.parseInt(value, 10) / 100})` }}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Country analytics</CardTitle>
                <CardDescription>Top revenue markets by views and CTR.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {countryAnalytics.map((country) => (
                <div key={country.country} className="rounded-2xl border border-[rgb(var(--border))] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold">{country.country}</p>
                    <Badge variant="success">{country.ctr}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">{country.views} views - {country.revenue} revenue</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Top-performing videos</CardTitle>
              <CardDescription>Cross-channel videos ranked by impact score.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {topVideos.map((video) => (
                <article key={video.id} className="rounded-2xl bg-[rgb(var(--muted))]/60 p-4">
                  <Badge variant="premium">Score {video.score}</Badge>
                  <h3 className="mt-3 font-black">{video.title}</h3>
                  <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{video.channel}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <span><b>{video.views}</b><br />Views</span>
                    <span><b>{video.ctr}</b><br />CTR</span>
                    <span><b>{video.revenue}</b><br />Revenue</span>
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
