import { useMemo, useState } from 'react'
import { Film, MoreVertical, PlusCircle } from 'lucide-react'
import PageBanner from '../../components/figma/PageBanner'
import FilterToolbar from '../../components/figma/FilterToolbar'
import { videos } from '../../data/videosData'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All videos' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'processing', label: 'Processing' },
]

function statusColor(status) {
  if (status === 'Published') return 'bg-[#2ba640] text-white'
  if (status === 'Processing') return 'bg-[#f9a825] text-[#0f0f0f]'
  return 'bg-[#606060] text-white'
}

export default function VideosPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      const matchSearch =
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.channel.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === 'all' || v.status.toLowerCase() === filter
      return matchSearch && matchFilter
    })
  }, [search, filter])

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl space-y-5">
        <PageBanner icon={Film} title="Channel content">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#cc0000]"
          >
            <PlusCircle className="h-4 w-4" />
            Upload video
          </button>
        </PageBanner>

        <FilterToolbar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search videos"
          filter={filter}
          onFilterChange={setFilter}
          filterOptions={STATUS_OPTIONS}
        />

        <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-white">
          <div className="hidden grid-cols-[minmax(280px,2fr)_1fr_1fr_1fr_1fr_40px] gap-4 border-b border-[#e5e5e5] px-4 py-3 text-xs font-medium uppercase tracking-wide text-[#606060] lg:grid">
            <span>Video</span>
            <span>Visibility</span>
            <span>Status</span>
            <span>Views</span>
            <span>Date</span>
            <span />
          </div>

          <ul className="divide-y divide-[#e5e5e5]">
            {filtered.map((video) => (
              <li
                key={video.id}
                className="grid grid-cols-1 gap-4 px-4 py-4 transition hover:bg-[#f9f9f9] lg:grid-cols-[minmax(280px,2fr)_1fr_1fr_1fr_1fr_40px] lg:items-center"
              >
                <div className="flex gap-4">
                  <div className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-lg bg-[#0f0f0f] sm:w-40">
                    <img src={video.thumbnail} alt="" className="h-full w-full object-cover" />
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
                      {video.duration}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-[#0f0f0f]">{video.title}</p>
                    <p className="mt-1 text-xs text-[#606060]">{video.channel}</p>
                  </div>
                </div>
                <p className="text-sm text-[#0f0f0f] lg:block">{video.visibility}</p>
                <span
                  className={`inline-flex w-fit rounded px-2.5 py-1 text-xs font-medium ${statusColor(video.status)}`}
                >
                  {video.status}
                </span>
                <p className="text-sm text-[#0f0f0f]">{video.views}</p>
                <p className="text-sm text-[#606060]">{video.uploaded}</p>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f2f2f2]"
                  aria-label="More actions"
                >
                  <MoreVertical className="h-4 w-4 text-[#606060]" />
                </button>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="px-4 py-12 text-center text-sm text-[#606060]">No videos match your filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}
