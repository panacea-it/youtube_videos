import { Copy, SearchCheck, Sparkles, Tags, Wand2 } from 'lucide-react'
import { growthSeries, seoKeywords } from '../../data/enterpriseData'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { SearchInput } from '../../components/ui/input'
import { LineChartPanel } from '../../components/ui/charts'

export default function SeoToolsPage() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <Badge variant="success">SEO health score 91/100</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-tight">SEO tools</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            Keyword tracking, optimization suggestions, ranking movement, and AI generation tools for titles,
            descriptions, and tags.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Optimization backlog', '384', 'warning'],
                ['Keywords tracked', '12.8K', 'info'],
                ['Titles improved', '1,248', 'success'],
              ].map(([label, value, variant]) => (
                <Card key={label}>
                  <CardContent className="p-5">
                    <SearchCheck className="h-6 w-6 text-red-500" />
                    <p className="mt-4 text-sm font-semibold text-[rgb(var(--muted-foreground))]">{label}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-2xl font-black">{value}</p>
                      <Badge variant={variant}>Live</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Keyword ranking chart</CardTitle>
                  <CardDescription>Ranking movement and search lift for tracked keywords.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <LineChartPanel
                  data={growthSeries}
                  xKey="date"
                  area
                  series={[{ key: 'subscribers', label: 'Search lift', color: '#10b981' }]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Keyword tracking</CardTitle>
                  <CardDescription>Trending keywords, rank position, volume, and movement.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {seoKeywords.map((keyword) => (
                  <div key={keyword.keyword} className="grid gap-3 rounded-2xl border border-[rgb(var(--border))] p-4 sm:grid-cols-[1fr_90px_90px_90px] sm:items-center">
                    <p className="font-black">{keyword.keyword}</p>
                    <Badge variant="premium">Rank #{keyword.rank}</Badge>
                    <span className="text-sm font-semibold">{keyword.volume}</span>
                    <Badge variant={keyword.movement.startsWith('+') ? 'success' : 'warning'}>{keyword.movement}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>AI title generator</CardTitle>
                  <CardDescription>Create high-CTR title variants from topics or transcripts.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <SearchInput placeholder="Paste topic, keyword, or video brief..." />
                <Button className="w-full"><Sparkles className="h-4 w-4" /> Generate title ideas</Button>
                {['I Tested 50 YouTube SEO Tactics: These 7 Actually Worked', 'The Enterprise YouTube Growth System Nobody Shows You'].map((title) => (
                  <div key={title} className="rounded-2xl bg-[rgb(var(--muted))]/60 p-4">
                    <p className="text-sm font-bold">{title}</p>
                    <Button variant="ghost" size="sm" className="mt-2"><Copy className="h-3 w-3" /> Copy</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Optimization suggestions</CardTitle>
                  <CardDescription>Prioritized actions for search performance.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  ['Rewrite descriptions under 900 characters', Tags],
                  ['Add primary keyword in first 55 title characters', Wand2],
                  ['Cluster hashtags by topic and audience intent', SearchCheck],
                ].map(([text, Icon]) => (
                  <div key={text} className="flex gap-3 rounded-2xl border border-[rgb(var(--border))] p-3">
                    <Icon className="h-5 w-5 text-red-500" />
                    <p className="text-sm font-semibold">{text}</p>
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
