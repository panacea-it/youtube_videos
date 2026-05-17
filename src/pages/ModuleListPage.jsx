import { useMemo, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import PageBanner from '../components/figma/PageBanner'
import FilterToolbar from '../components/figma/FilterToolbar'

const SAMPLE = [
  { id: 1, name: 'UPSC Foundation Playlist', status: 'Public', updated: 'May 12, 2026', count: '24 videos' },
  { id: 2, name: 'Ethics Masterclass', status: 'Unlisted', updated: 'May 10, 2026', count: '12 videos' },
  { id: 3, name: 'Geography Optional', status: 'Private', updated: 'May 8, 2026', count: '8 videos' },
]

export default function ModuleListPage({
  title,
  icon: Icon,
  addLabel = 'Create',
  searchPlaceholder = 'Search',
}) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => SAMPLE.filter((row) => row.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl space-y-5">
        <PageBanner icon={Icon} title={title}>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0f0f0f] hover:bg-[#f2f2f2]"
          >
            <PlusCircle className="h-4 w-4 text-[#ff0000]" />
            {addLabel}
          </button>
        </PageBanner>

        <FilterToolbar search={search} onSearchChange={setSearch} searchPlaceholder={searchPlaceholder} />

        <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-white">
          <ul className="divide-y divide-[#e5e5e5]">
            {filtered.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 hover:bg-[#f9f9f9]">
                <div>
                  <p className="font-medium text-[#0f0f0f]">{row.name}</p>
                  <p className="text-xs text-[#606060]">{row.count} · {row.updated}</p>
                </div>
                <span className="rounded-full bg-[#f2f2f2] px-3 py-1 text-xs font-medium text-[#606060]">
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
