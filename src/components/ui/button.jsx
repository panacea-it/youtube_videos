import { cloneElement, isValidElement } from 'react'
import { cn } from '../../utils/cn'

const baseButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] disabled:pointer-events-none disabled:opacity-50'

const variantClasses = {
  primary:
    'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] shadow-sm shadow-red-500/20 hover:bg-red-600',
  secondary: 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:opacity-90',
  outline:
    'border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]',
  ghost: 'text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]',
  subtle: 'bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] hover:bg-slate-200 dark:hover:bg-slate-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizeClasses = {
  sm: 'h-9 px-3',
  md: 'h-10 px-4',
  lg: 'h-12 px-5',
  icon: 'h-10 w-10',
}

export function buttonVariants({ variant = 'primary', size = 'md' } = {}) {
  return cn(baseButtonClass, variantClasses[variant], sizeClasses[size])
}

export function Button({ className, variant, size, asChild = false, ...props }) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if (asChild && isValidElement(props.children)) {
    const child = props.children
    const rest = { ...props }
    delete rest.children
    return cloneElement(child, {
      ...rest,
      className: cn(classes, child.props.className),
    })
  }

  return <button className={classes} {...props} />
}
