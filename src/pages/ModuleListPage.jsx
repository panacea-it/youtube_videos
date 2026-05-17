import { useMemo, useState } from 'react'
import { Download, Filter, PlusCircle, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { SearchInput } from '../components/ui/input'

const SAMPLE = [
  { id: 1, name: 'Enterprise content calendar', status: 'Active', updated: 'May 17, 2026', count: '58 channels' },
  { id: 2, name: 'High-priority monetization workflow', status: 'Review', updated: 'May 16, 2026', count: '1,248 assets' },
  { id: 3, name: 'AI optimization queue', status: 'Queued', updated: 'May 15, 2026', count: '384 tasks' },
]

function variantForStatus(status) {
  if (status === 'Active') return 'success'
  if (status === 'Review') return 'warning'
  return 'info'
}

export default function ModuleListPage({
  title,
  icon: Icon,
  addLabel = 'Create',
  searchPlaceholder = 'Search',
  description = 'Enterprise module workspace with filters, actions, loading, empty, and error-state architecture.',
}) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => SAMPLE.filter((row) => row.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-4">
              {Icon && (
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300">
                  <Icon className="h-7 w-7" />
                </span>
              )}
              <div>
                <Badge variant="info">Enterprise module</Badge>
                <h1 className="mt-3 text-3xl font-black tracking-tight">{title}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">{description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
              <Button><PlusCircle className="h-4 w-4" /> {addLabel}</Button>
            </div>
          </div>
        </section>

        <Card>
          <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
            <SearchInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} className="max-w-xl" />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline"><Filter className="h-4 w-4" /> Filters</Button>
              <Button variant="outline"><SlidersHorizontal className="h-4 w-4" /> Bulk actions</Button>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <Card className="overflow-hidden">
            <CardHeader>
              <div>
                <CardTitle>{title} records</CardTitle>
                <CardDescription>Responsive table/list pattern for enterprise admin modules.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filtered.map((row) => (
                <div key={row.id} className="grid gap-3 rounded-2xl border border-[rgb(var(--border))] p-4 md:grid-cols-[1fr_140px_140px_auto] md:items-center">
                  <div>
                    <p className="font-black">{row.name}</p>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">{row.count}</p>
                  </div>
                  <Badge variant={variantForStatus(row.status)}>{row.status}</Badge>
                  <span className="text-sm text-[rgb(var(--muted-foreground))]">{row.updated}</span>
                  <Button variant="outline" size="sm">Open</Button>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[rgb(var(--border))] p-10 text-center">
                  <Search className="mx-auto h-9 w-9 text-[rgb(var(--muted-foreground))]" />
                  <p className="mt-3 font-black">No records found</p>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Try a different filter or create a new record.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Component states</CardTitle>
                  <CardDescription>Reusable UX coverage for production readiness.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Loading skeletons', 'Empty state', 'Error recovery', 'Permission guard'].map((state) => (
                  <div key={state} className="rounded-2xl bg-[rgb(var(--muted))]/60 p-3 text-sm font-bold">{state}</div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </div>
  )
}
