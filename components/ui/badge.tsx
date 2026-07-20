'use client'

import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center squircle font-medium whitespace-nowrap', {
  variants: {
    variant: {
      solid: 'border border-(--color-border) bg-(--color-surface) text-(--color-fg)',
      muted: 'border border-(--color-border)/60 bg-(--color-surface-2) text-(--color-muted)',
      dot: 'border border-(--color-border) bg-(--color-bg) text-(--color-muted)',
    },
    size: {
      sm: 'h-5.5 px-2.5 text-[11px] gap-1',
      md: 'h-6.5 px-3 text-[12px] gap-1.5',
      lg: 'h-8 px-3.5 text-[13px] gap-1.5',
    },
    interactive: {
      true: 'cursor-pointer transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-(--color-bg)',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    interactive: false,
  },
})

export interface BadgeProps
  extends
    Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
    Omit<VariantProps<typeof badgeVariants>, 'interactive'> {
  icon?: ReactNode
  onDismiss?: MouseEventHandler<HTMLButtonElement>
  dismissLabel?: string
  pulse?: boolean
  shimmer?: boolean
  asChild?: boolean
}

const dotSizeFor = (size: BadgeProps['size']) => (size === 'sm' ? 6 : size === 'lg' ? 8 : 7)

const dismissSizeFor = (size: BadgeProps['size']) =>
  size === 'lg' ? 'size-4 [&_svg]:size-3' : 'size-3.5 [&_svg]:size-2.5'

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'solid',
      size = 'md',
      icon,
      onDismiss,
      dismissLabel = 'Remove',
      pulse = false,
      shimmer = true,
      asChild = false,
      onClick,
      onKeyDown,
      children,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const isDot = variant === 'dot'
    const isClickable = Boolean(onClick)
    const shouldPulse = isDot && pulse && !reduceMotion
    const shouldShimmer = variant === 'solid' && shimmer && !reduceMotion
    const dotSize = dotSizeFor(size)

    const rootClassName = cn(
      badgeVariants({ variant, size, interactive: isClickable }),
      shouldShimmer && 'relative overflow-hidden',
      className,
    )

    if (asChild) {
      return (
        <Slot ref={ref} className={rootClassName} onClick={onClick} {...props}>
          {children}
        </Slot>
      )
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented || !isClickable) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>)
      }
    }

    const DotEl = shouldPulse ? motion.span : 'span'

    return (
      <span
        ref={ref}
        className={rootClassName}
        onClick={onClick}
        onKeyDown={isClickable || onKeyDown ? handleKeyDown : undefined}
        {...(isClickable ? { role: 'button', tabIndex: 0 } : {})}
        {...props}
      >
        {shouldShimmer && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, color-mix(in srgb, currentColor 30%, transparent) 50%, transparent 100%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
          />
        )}
        {isDot && (
          <DotEl
            aria-hidden="true"
            className="shrink-0 rounded-full bg-muted-foreground"
            style={{ width: dotSize, height: dotSize }}
            {...(shouldPulse
              ? {
                  animate: { opacity: [0.5, 1, 0.5] },
                  transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                }
              : {})}
          />
        )}
        {!isDot && icon && (
          <span aria-hidden="true" className="inline-flex shrink-0 [&_svg]:size-3">
            {icon}
          </span>
        )}
        <span className="min-w-0 truncate">{children}</span>
        {onDismiss && (
          <button
            type="button"
            aria-label={dismissLabel}
            className={cn(
              'relative -me-0.5 inline-flex shrink-0 items-center justify-center rounded-full text-current/70 transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none hover:text-current focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-accent)',
              dismissSizeFor(size),
            )}
            onClick={(e) => {
              e.stopPropagation()
              onDismiss(e)
            }}
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 12 12">
              <path
                d="M3 3l6 6M9 3 3 9"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.75"
              />
            </svg>
          </button>
        )}
      </span>
    )
  },
)

Badge.displayName = 'Badge'

export { badgeVariants }

export function BadgePreview() {
  return (
    <div className="flex w-full flex-col items-center gap-10 p-8">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-balance font-medium text-lg leading-snug tracking-tight text-foreground sm:text-xl">
        <span>This update is</span>
        <span className="inline-flex translate-y-px align-middle">
          <Badge>Early Access</Badge>
        </span>
        <span>and ready to ship.</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge>Solid</Badge>
        <Badge variant="muted">Muted</Badge>
        <Badge variant="dot" pulse>
          Live
        </Badge>
      </div>
    </div>
  )
}
