import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '../../utils/cn'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator

export function DropdownMenuContent({ className, align = 'end', ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={10}
        className={cn(
          'surface-card z-50 min-w-56 rounded-2xl p-2 shadow-xl outline-none',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm text-[rgb(var(--foreground))] outline-none transition hover:bg-[rgb(var(--muted))] data-[highlighted]:bg-[rgb(var(--muted))]',
        className,
      )}
      {...props}
    />
  )
}
