import { cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

const DialogContext = createContext(null)

export function Dialog({ open, defaultOpen = false, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = typeof open === 'boolean'
  const currentOpen = isControlled ? open : internalOpen

  const setOpen = useCallback((nextOpen) => {
    if (!isControlled) setInternalOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }, [isControlled, onOpenChange])

  const value = useMemo(() => ({ open: currentOpen, setOpen }), [currentOpen, setOpen])

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

function useDialogContext() {
  const context = useContext(DialogContext)
  if (!context) throw new Error('Dialog components must be used within Dialog')
  return context
}

export function DialogTrigger({ asChild = false, children, ...props }) {
  const { setOpen } = useDialogContext()
  const handleClick = (event) => {
    props.onClick?.(event)
    if (!event.defaultPrevented) setOpen(true)
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

export function DialogClose({ asChild = false, children, ...props }) {
  const { setOpen } = useDialogContext()
  const handleClick = (event) => {
    props.onClick?.(event)
    if (!event.defaultPrevented) setOpen(false)
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

export function DialogContent({ className, children, side = 'center', ...props }) {
  const { open, setOpen } = useDialogContext()
  const sideClass =
    side === 'right'
      ? 'right-0 top-0 h-full w-full max-w-md translate-x-0 rounded-l-2xl'
      : 'left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl'

  useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, setOpen])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'surface-card fixed z-50 max-h-screen overflow-y-auto p-0 shadow-2xl focus:outline-none',
          sideClass,
          className,
        )}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-[rgb(var(--muted-foreground))] transition hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>,
    document.body,
  )
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn('border-b border-[rgb(var(--border))] p-5 pr-14', className)} {...props} />
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn('text-lg font-bold text-[rgb(var(--foreground))]', className)} {...props} />
}

export function DialogDescription({ className, ...props }) {
  return (
    <p
      className={cn('mt-1 text-sm text-[rgb(var(--muted-foreground))]', className)}
      {...props}
    />
  )
}
