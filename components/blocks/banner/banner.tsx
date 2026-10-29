'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'
import { useControlledState } from '@/lib/hooks/use-controlled-state'

const bannerVariants = cva('relative w-full', {
  variants: {
    variant: {
      filled: 'bg-(--color-fg) text-(--color-bg)',
      outline: 'border-b border-(--color-border) bg-(--color-bg) text-(--color-fg)',
      destructive:
        'border-b border-(--color-destructive) bg-(--color-bg) text-(--color-destructive)',
    },
  },
  defaultVariants: { variant: 'filled' },
})

export interface BannerProps
  extends
    Omit<ComponentPropsWithoutRef<'section'>, 'children'>,
    VariantProps<typeof bannerVariants> {
  children: ReactNode
  icon?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  dismissible?: boolean
  dismissLabel?: string
}

export const Banner = forwardRef<HTMLElement, BannerProps>(
  (
    {
      children,
      className,
      variant,
      icon,
      open,
      defaultOpen = true,
      onOpenChange,
      dismissible = true,
      dismissLabel = 'Dismiss banner',
      'aria-label': ariaLabel = 'Announcement',
      ...props
    },
    ref,
  ) => {
    const [isOpen, setOpen] = useControlledState(open, defaultOpen, onOpenChange)
    const reduceMotion = useReducedMotion()

    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            ref={ref}
            aria-label={ariaLabel}
            className={cn(bannerVariants({ variant }), className)}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : {
                    opacity: 0,
                    y: -8,
                    filter: 'blur(2px)',
                    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            {...(props as object)}
          >
            <div
              className={cn(
                'mx-auto flex max-w-7xl items-center justify-center px-4 py-3 text-sm',
                dismissible && 'pe-12 ps-4 sm:px-12',
              )}
            >
              {icon && (
                <span aria-hidden="true" className="me-2 inline-flex shrink-0">
                  {icon}
                </span>
              )}
              <p className="text-balance text-center leading-snug">{children}</p>
            </div>
            {dismissible && (
              <button
                type="button"
                aria-label={dismissLabel}
                onClick={() => setOpen(false)}
                onPointerDown={(event) => event.preventDefault()}
                className="absolute end-2 top-1/2 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-current transition-[background-color,scale] duration-(--motion-dur-fast) ease-(--motion-ease-out) after:absolute after:-inset-1.5 hover:bg-current/10 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    )
  },
)
Banner.displayName = 'Banner'
