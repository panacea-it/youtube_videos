import { Calendar, FileDown, FileSpreadsheet, FileText, Send } from 'lucide-react'
import { reportCards } from '../../data/enterpriseData'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

export default function ReportsPage() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <Badge variant="premium">Executive reporting</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Reports</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            Revenue, video, channel, and team reports with scheduled delivery and PDF, CSV, and Excel exports.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reportCards.map((report) => (
            <Card key={report.title}>
              <CardContent className="p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300">
                  <report.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-black">{report.title}</h2>
                <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{report.cadence}</p>
                <p className="mt-3 text-sm font-bold">{report.exports}</p>
                <div className="mt-5 flex gap-2">
                  <Button variant="outline" size="sm"><FileDown className="h-3 w-3" /> PDF</Button>
                  <Button variant="outline" size="sm"><FileSpreadsheet className="h-3 w-3" /> CSV</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Scheduled reports</CardTitle>
                <CardDescription>Automated reporting workflows for stakeholders.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ['Weekly executive revenue pack', 'Mondays 8:00 AM', 'PDF + Excel'],
                ['Channel manager performance digest', 'Fridays 4:00 PM', 'CSV'],
                ['SEO opportunity report', 'Daily 6:00 AM', 'PDF'],
              ].map(([name, schedule, format]) => (
                <div key={name} className="grid gap-3 rounded-2xl border border-[rgb(var(--border))] p-4 md:grid-cols-[1fr_180px_130px_auto] md:items-center">
                  <p className="font-black">{name}</p>
                  <span className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]"><Calendar className="h-4 w-4" /> {schedule}</span>
                  <Badge variant="info">{format}</Badge>
                  <Button variant="outline" size="sm"><Send className="h-3 w-3" /> Send now</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Report builder</CardTitle>
                <CardDescription>Reusable components for exportable enterprise reports.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Metric blocks', 'Channel comparisons', 'Top videos', 'Team productivity', 'Revenue waterfall'].map((block) => (
                <div key={block} className="flex items-center justify-between rounded-2xl bg-[rgb(var(--muted))]/60 p-3">
                  <span className="flex items-center gap-2 text-sm font-bold"><FileText className="h-4 w-4 text-red-500" /> {block}</span>
                  <Button variant="ghost" size="sm">Add</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
