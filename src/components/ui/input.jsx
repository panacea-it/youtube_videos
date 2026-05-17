import { Search } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-xl border border-[rgb(var(--input))] bg-[rgb(var(--card))] px-3 text-sm text-[rgb(var(--foreground))] outline-none placeholder:text-[rgb(var(--muted-foreground))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-blue-500/20',
        className,
      )}
      {...props}
    />
  )
}

export function SearchInput({ className, inputClassName, ...props }) {
  return (
    <div className={cn('relative w-full', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted-foreground))]" />
      <Input className={cn('pl-10', inputClassName)} type="search" {...props} />
    </div>
  )
}
