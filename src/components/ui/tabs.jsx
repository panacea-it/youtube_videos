import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../utils/cn'

export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn('inline-flex rounded-xl bg-[rgb(var(--muted))] p-1', className)}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'rounded-lg px-3 py-1.5 text-sm font-semibold text-[rgb(var(--muted-foreground))] transition data-[state=active]:bg-[rgb(var(--card))] data-[state=active]:text-[rgb(var(--foreground))] data-[state=active]:shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={cn('outline-none', className)} {...props} />
}
