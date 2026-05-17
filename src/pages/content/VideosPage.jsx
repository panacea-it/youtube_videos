import { useMemo, useState } from 'react'
import {
  ArrowUpDown,
  Bot,
  CalendarClock,
  CheckSquare,
  Columns3,
  Eye,
  Filter,
  Grid,
  List,
  MoreVertical,
  Pencil,
  PlusCircle,
  Search,
  UploadCloud,
  Wand2,
} from 'lucide-react'
import { videos } from '../../data/enterpriseData'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { SearchInput } from '../../components/ui/input'

const STATUS_OPTIONS = ['All videos', 'Published', 'Scheduled', 'Draft', 'Needs Review']

function statusVariant(status) {
  if (status === 'Published') return 'success'
  if (status === 'Scheduled') return 'info'
  if (status === 'Needs Review') return 'warning'
  return 'default'
}

export default function VideosPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All videos')
  const [view, setView] = useState('table')
  const [selected, setSelected] = useState([])

  const filtered = useMemo(() => {
    return videos.filter((video) => {
      const normalized = search.toLowerCase()
      const matchSearch =
        video.title.toLowerCase().includes(normalized) ||
        video.channel.toLowerCase().includes(normalized) ||
        video.category.toLowerCase().includes(normalized)
      const matchFilter = filter === 'All videos' || video.status === filter
      return matchSearch && matchFilter
    })
  }, [search, filter])

  const toggleSelected = (id) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="rounded-3xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Badge variant="danger">75,000+ managed videos</Badge>
              <h1 className="mt-3 text-3xl font-black tracking-tight">Video management center</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Bulk edit metadata, preview thumbnails, schedule campaigns, optimize SEO, and run AI workflows
                across every managed YouTube channel.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
                <Wand2 className="h-4 w-4" />
                AI optimize
              </Button>
              <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
                <CalendarClock className="h-4 w-4" />
                Bulk schedule
              </Button>
              <Button>
                <PlusCircle className="h-4 w-4" />
                Upload video
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <Card>
              <CardContent className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
                  <SearchInput
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search videos, channels, categories..."
                    className="max-w-xl"
                  />
                  <select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 text-sm font-semibold text-[rgb(var(--foreground))] outline-none focus:border-blue-500"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                    Advanced filters
                  </Button>
                  <Button variant="outline">
                    <Columns3 className="h-4 w-4" />
                    Columns
                  </Button>
                  <div className="flex rounded-xl border border-[rgb(var(--border))] p-1">
                    <button
                      type="button"
                      onClick={() => setView('table')}
                      className={`rounded-lg p-2 ${view === 'table' ? 'bg-[rgb(var(--muted))]' : ''}`}
                      aria-label="Table view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setView('grid')}
                      className={`rounded-lg p-2 ${view === 'grid' ? 'bg-[rgb(var(--muted))]' : ''}`}
                      aria-label="Grid view"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selected.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-900 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-100">
                <p className="text-sm font-bold">{selected.length} videos selected</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Bulk edit</Button>
                  <Button variant="outline" size="sm">Schedule</Button>
                  <Button variant="outline" size="sm">Assign category</Button>
                  <Button size="sm">Run AI optimization</Button>
                </div>
              </div>
            )}

            {view === 'grid' ? (
              <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {filtered.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-slate-950">
                      <img src={video.thumbnail} alt="" className="h-full w-full object-cover" />
                      <span className="absolute bottom-2 right-2 rounded-lg bg-black/75 px-2 py-1 text-xs font-bold text-white">
                        {video.duration}
                      </span>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="line-clamp-2 font-bold text-[rgb(var(--foreground))]">{video.title}</p>
                          <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{video.channel}</p>
                        </div>
                        <Badge variant={statusVariant(video.status)}>{video.status}</Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                        <span className="rounded-xl bg-[rgb(var(--muted))] p-2"><b>{video.views}</b><br />Views</span>
                        <span className="rounded-xl bg-[rgb(var(--muted))] p-2"><b>{video.revenue}</b><br />Revenue</span>
                        <span className="rounded-xl bg-[rgb(var(--muted))] p-2"><b>{video.seoScore}</b><br />SEO</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1180px] text-left">
                    <thead className="bg-[rgb(var(--muted))]/70 text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
                      <tr>
                        <th className="px-4 py-3">
                          <CheckSquare className="h-4 w-4" />
                        </th>
                        <th className="px-4 py-3">Thumbnail</th>
                        <th className="px-4 py-3">
                          <span className="flex items-center gap-1">Video title <ArrowUpDown className="h-3 w-3" /></span>
                        </th>
                        <th className="px-4 py-3">Channel</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Views</th>
                        <th className="px-4 py-3">Likes</th>
                        <th className="px-4 py-3">Comments</th>
                        <th className="px-4 py-3">Revenue</th>
                        <th className="px-4 py-3">SEO Score</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Publish date</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                      {filtered.map((video) => (
                        <tr key={video.id} className="transition hover:bg-[rgb(var(--muted))]/50">
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={selected.includes(video.id)}
                              onChange={() => toggleSelected(video.id)}
                              className="h-4 w-4 rounded border-[rgb(var(--border))]"
                              aria-label={`Select ${video.title}`}
                            />
                          </td>
                          <td className="px-4 py-4">
                            <div className="relative aspect-video w-32 overflow-hidden rounded-xl bg-slate-950">
                              <img src={video.thumbnail} alt="" className="h-full w-full object-cover" />
                              <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                {video.duration}
                              </span>
                            </div>
                          </td>
                          <td className="max-w-[280px] px-4 py-4">
                            <p className="line-clamp-2 text-sm font-bold text-[rgb(var(--foreground))]">{video.title}</p>
                            <button className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-300" type="button">
                              <Pencil className="h-3 w-3" />
                              Inline edit metadata
                            </button>
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold">{video.channel}</td>
                          <td className="px-4 py-4"><Badge>{video.category}</Badge></td>
                          <td className="px-4 py-4 text-sm font-bold">{video.views}</td>
                          <td className="px-4 py-4 text-sm">{video.likes}</td>
                          <td className="px-4 py-4 text-sm">{video.comments}</td>
                          <td className="px-4 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-300">{video.revenue}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${video.seoScore}%` }} />
                              </div>
                              <span className="text-xs font-black">{video.seoScore}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4"><Badge variant={statusVariant(video.status)}>{video.status}</Badge></td>
                          <td className="px-4 py-4 text-sm text-[rgb(var(--muted-foreground))]">{video.publishDate}</td>
                          <td className="px-4 py-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label={`Preview ${video.title}`}>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Video preview</DialogTitle>
                                  <DialogDescription>{video.title}</DialogDescription>
                                </DialogHeader>
                                <div className="p-5">
                                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-950">
                                    <img src={video.thumbnail} alt="" className="h-full w-full object-cover opacity-80" />
                                    <span className="absolute inset-0 flex items-center justify-center">
                                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-slate-950">
                                        <Eye className="h-7 w-7" />
                                      </span>
                                    </span>
                                  </div>
                                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                    <Badge variant="success">SEO {video.seoScore}</Badge>
                                    <Badge variant="info">{video.views} views</Badge>
                                    <Badge variant="premium">{video.revenue} revenue</Badge>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filtered.length === 0 && (
                  <div className="px-4 py-14 text-center">
                    <Search className="mx-auto h-10 w-10 text-[rgb(var(--muted-foreground))]" />
                    <p className="mt-3 font-bold">No videos match your filters</p>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Try another channel, status, category, or keyword.</p>
                  </div>
                )}
                <div className="flex flex-col gap-3 border-t border-[rgb(var(--border))] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Showing 1-{filtered.length} of 75,418 videos</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <aside className="space-y-6">
            <Card className="border-dashed">
              <CardHeader>
                <div>
                  <CardTitle>Drag and drop upload</CardTitle>
                  <CardDescription>Bulk upload video files, thumbnails, captions, and metadata CSVs.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-3xl border-2 border-dashed border-[rgb(var(--border))] bg-[rgb(var(--muted))]/50 p-8 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-red-500" />
                  <p className="mt-4 font-black">Drop files here</p>
                  <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">MP4, MOV, SRT, VTT, JPG, PNG, CSV</p>
                  <Button className="mt-5">Browse files</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>AI optimization queue</CardTitle>
                  <CardDescription>Automations ready for selected videos.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Generate title variants', 'Rewrite descriptions', 'Suggest tags', 'Predict viral score'].map((item) => (
                  <button key={item} type="button" className="flex w-full items-center gap-3 rounded-2xl border border-[rgb(var(--border))] p-3 text-left transition hover:bg-[rgb(var(--muted))]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                      <Bot className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold">{item}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </div>
  )
}
