import { cloneElement, createContext, isValidElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../utils/cn'

const DropdownMenuContext = createContext(null)

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const value = useMemo(() => ({ open, setOpen }), [open])

  return (
    <DropdownMenuContext.Provider value={value}>
      <span ref={rootRef} className="relative inline-flex">
        {children}
      </span>
    </DropdownMenuContext.Provider>
  )
}

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext)
  if (!context) throw new Error('DropdownMenu components must be used within DropdownMenu')
  return context
}

export function DropdownMenuTrigger({ asChild = false, children, ...props }) {
  const { setOpen } = useDropdownMenuContext()
  const handleClick = (event) => {
    props.onClick?.(event)
    if (!event.defaultPrevented) setOpen((current) => !current)
  }

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      onClick: handleClick,
    })
  }

  return (
    <button type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

export function DropdownMenuSeparator({ className, ...props }) {
  return <div className={cn('my-2 h-px bg-[rgb(var(--border))]', className)} {...props} />
}

export function DropdownMenuContent({ className, align = 'end', ...props }) {
  const { open } = useDropdownMenuContext()
  if (!open) return null

  return (
    <div
      className={cn(
        'surface-card absolute top-[calc(100%+0.625rem)] z-50 min-w-56 rounded-2xl p-2 shadow-xl outline-none',
        align === 'end' ? 'right-0' : 'left-0',
        className,
      )}
      {...props}
    />
  )
}

export function DropdownMenuItem({ className, onClick, onSelect, ...props }) {
  const { setOpen } = useDropdownMenuContext()
  const handleClick = (event) => {
    onClick?.(event)
    onSelect?.(event)
    if (!event.defaultPrevented) setOpen(false)
  }

  return (
    <button
      type="button"
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-[rgb(var(--foreground))] outline-none transition hover:bg-[rgb(var(--muted))]',
        className,
      )}
      {...props}
      onClick={handleClick}
    />
  )
}
