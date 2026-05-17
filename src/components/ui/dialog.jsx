import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({ className, children, side = 'center', ...props }) {
  const sideClass =
    side === 'right'
      ? 'right-0 top-0 h-full w-full max-w-md translate-x-0 rounded-l-2xl'
      : 'left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl'

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
      <DialogPrimitive.Content
        className={cn(
          'surface-card fixed z-50 max-h-screen overflow-y-auto p-0 shadow-2xl focus:outline-none',
          sideClass,
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-[rgb(var(--muted-foreground))] transition hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn('border-b border-[rgb(var(--border))] p-5 pr-14', className)} {...props} />
}

export function DialogTitle({ className, ...props }) {
  return <DialogPrimitive.Title className={cn('text-lg font-bold text-[rgb(var(--foreground))]', className)} {...props} />
}

export function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      className={cn('mt-1 text-sm text-[rgb(var(--muted-foreground))]', className)}
      {...props}
    />
  )
}
