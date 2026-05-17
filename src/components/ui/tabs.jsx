import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { cn } from '../../utils/cn'

const TabsContext = createContext(null)

export function Tabs({ value, defaultValue, onValueChange, children }) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = typeof value !== 'undefined'
  const currentValue = isControlled ? value : internalValue

  const setValue = useCallback((nextValue) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }, [isControlled, onValueChange])

  const contextValue = useMemo(() => ({ value: currentValue, setValue }), [currentValue, setValue])

  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
}

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs components must be used within Tabs')
  return context
}

export function TabsList({ className, ...props }) {
  return (
    <div
      role="tablist"
      className={cn('inline-flex rounded-xl bg-[rgb(var(--muted))] p-1', className)}
      {...props}
    />
  )
}

export function TabsTrigger({ className, value, ...props }) {
  const { value: activeValue, setValue } = useTabsContext()
  const isActive = activeValue === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
        'rounded-lg px-3 py-1.5 text-sm font-semibold text-[rgb(var(--muted-foreground))] transition',
        isActive && 'bg-[rgb(var(--card))] text-[rgb(var(--foreground))] shadow-sm',
        className,
      )}
      onClick={() => setValue(value)}
      {...props}
    />
  )
}

export function TabsContent({ className, value, ...props }) {
  const { value: activeValue } = useTabsContext()
  if (activeValue !== value) return null

  return <div role="tabpanel" className={cn('outline-none', className)} {...props} />
}
