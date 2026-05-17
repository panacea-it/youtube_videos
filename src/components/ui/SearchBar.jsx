import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#606060]" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[#e5e5e5] bg-white pl-10 pr-4 text-sm text-[#0f0f0f] outline-none placeholder:text-[#909090] focus:border-[#065fd4] focus:ring-1 focus:ring-[#065fd4]"
      />
    </div>
  )
}
