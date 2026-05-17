import { cn } from '../../utils/cn'

export function Card({ className, ...props }) {
  return (
    <section
      className={cn('surface-card rounded-2xl', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex items-start justify-between gap-4 p-5 pb-3', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-base font-bold tracking-tight text-[rgb(var(--foreground))]', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('mt-1 text-sm text-[rgb(var(--muted-foreground))]', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-5 pt-2', className)} {...props} />
}
