import { useMemo, useState } from 'react'
import { ArrowUpDown, Edit, Filter, Grid, List, PlusCircle, SlidersHorizontal, Users } from 'lucide-react'
import { channels } from '../../data/enterpriseData'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { SearchInput } from '../../components/ui/input'

function statusVariant(status) {
  if (status === 'Healthy') return 'success'
  if (status === 'Review') return 'warning'
  return 'default'
}

export default function ChannelsPage() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState('table')

  const filtered = useMemo(
    () => channels.filter((channel) => channel.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Badge variant="premium">Channel portfolio</Badge>
              <h1 className="mt-3 text-3xl font-black tracking-tight">Channel management</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                Manage 50+ channels, sync health, assigned managers, revenue status, ownership, and publishing
                operations from one enterprise listing.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button><PlusCircle className="h-4 w-4" /> Add channel</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add YouTube channel</DialogTitle>
                  <DialogDescription>Connect OAuth, assign a manager, and select sync scopes.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {['Channel URL', 'Assigned manager', 'Default category', 'Sync frequency'].map((field) => (
                    <label key={field} className="text-sm font-bold">
                      {field}
                      <input className="mt-2 h-10 w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 font-normal outline-none focus:border-blue-500" placeholder={field} />
                    </label>
                  ))}
                  <Button className="sm:col-span-2">Connect channel</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <Card>
          <CardContent className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
            <SearchInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search channels..." className="max-w-lg" />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline"><Filter className="h-4 w-4" /> Filters</Button>
              <Button variant="outline"><SlidersHorizontal className="h-4 w-4" /> Bulk actions</Button>
              <div className="flex rounded-xl border border-[rgb(var(--border))] p-1">
                <button type="button" onClick={() => setView('table')} className={`rounded-lg p-2 ${view === 'table' ? 'bg-[rgb(var(--muted))]' : ''}`} aria-label="Table view">
                  <List className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setView('grid')} className={`rounded-lg p-2 ${view === 'grid' ? 'bg-[rgb(var(--muted))]' : ''}`} aria-label="Grid view">
                  <Grid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {view === 'grid' ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filtered.map((channel) => (
              <Card key={channel.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-sm font-black text-white">{channel.logo}</span>
                    <Badge variant={statusVariant(channel.status)}>{channel.status}</Badge>
                  </div>
                  <h2 className="mt-4 text-lg font-black">{channel.name}</h2>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Managed by {channel.manager}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <span><b>{channel.subscribers}</b><br />Subscribers</span>
                    <span><b>{channel.views}</b><br />Views</span>
                    <span><b>{channel.revenue}</b><br />Revenue</span>
                    <span><b>{channel.videos}</b><br />Videos</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="bg-[rgb(var(--muted))]/70 text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
                  <tr>
                    {['Channel logo', 'Channel name', 'Subscribers', 'Views', 'Revenue', 'Videos count', 'Status', 'Assigned manager', 'Last synced'].map((head) => (
                      <th key={head} className="px-4 py-3">
                        <span className="inline-flex items-center gap-1">{head} <ArrowUpDown className="h-3 w-3" /></span>
                      </th>
                    ))}
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgb(var(--border))]">
                  {filtered.map((channel) => (
                    <tr key={channel.id} className="hover:bg-[rgb(var(--muted))]/50">
                      <td className="px-4 py-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-xs font-black text-white">{channel.logo}</span>
                      </td>
                      <td className="px-4 py-4 font-black">{channel.name}</td>
                      <td className="px-4 py-4">{channel.subscribers}</td>
                      <td className="px-4 py-4">{channel.views}</td>
                      <td className="px-4 py-4 font-bold text-emerald-600 dark:text-emerald-300">{channel.revenue}</td>
                      <td className="px-4 py-4">{channel.videos}</td>
                      <td className="px-4 py-4"><Badge variant={statusVariant(channel.status)}>{channel.status}</Badge></td>
                      <td className="px-4 py-4">{channel.manager}</td>
                      <td className="px-4 py-4 text-[rgb(var(--muted-foreground))]">{channel.lastSynced}</td>
                      <td className="px-4 py-4">
                        <Button variant="ghost" size="icon" aria-label={`Edit ${channel.name}`}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Channel detail wireframe</CardTitle>
              <CardDescription>Enterprise detail pages include health, revenue, videos, ownership, sync logs, and permission tabs.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            {['Overview', 'Video inventory', 'Revenue', 'Permissions'].map((item) => (
              <div key={item} className="rounded-2xl border border-[rgb(var(--border))] p-4">
                <Users className="h-5 w-5 text-red-500" />
                <p className="mt-3 font-black">{item}</p>
                <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">Reusable tab section for channel detail workflows.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
