import SearchBar from '../ui/SearchBar'

export default function FilterToolbar({
  search,
  onSearchChange,
  searchPlaceholder = 'Search',
  filter,
  onFilterChange,
  filterOptions = [],
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SearchBar value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
      {filterOptions.length > 0 && (
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="h-11 rounded-lg border border-[#e5e5e5] bg-white px-3 text-sm text-[#0f0f0f] outline-none focus:border-[#065fd4] focus:ring-1 focus:ring-[#065fd4]"
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
