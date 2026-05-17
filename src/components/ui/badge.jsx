import { cn } from '../../utils/cn'

const baseBadgeClass = 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold'

const variantClasses = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  premium: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
}

export function badgeVariants({ variant = 'default' } = {}) {
  return cn(baseBadgeClass, variantClasses[variant] || variantClasses.default)
}

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
