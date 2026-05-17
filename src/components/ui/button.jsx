import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] shadow-sm shadow-red-500/20 hover:bg-red-600',
        secondary:
          'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:opacity-90',
        outline:
          'border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]',
        ghost: 'text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]',
        subtle:
          'bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] hover:bg-slate-200 dark:hover:bg-slate-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-5',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { buttonVariants }
