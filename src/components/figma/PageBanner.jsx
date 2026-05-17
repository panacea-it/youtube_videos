import { cn } from '../../utils/cn'

export default function PageBanner({ icon: Icon, title, children, className }) {
  return (
    <div
      className={cn(
        'flex min-h-16 flex-wrap items-center justify-between gap-4 rounded-xl bg-[#212121] px-5 py-4 sm:px-6',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-4">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff0000]">
            <Icon className="h-5 w-5 text-white" strokeWidth={2.4} />
          </div>
        )}
        <h1 className="truncate text-lg font-bold text-white sm:text-xl">{title}</h1>
      </div>
      {children && (
        <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">{children}</div>
      )}
    </div>
  )
}
