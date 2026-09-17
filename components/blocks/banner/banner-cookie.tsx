'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useControlledState } from '@/lib/hooks/use-controlled-state'

export interface BannerCookieProps extends Omit<
  ComponentPropsWithoutRef<'section'>,
  'title' | 'children'
> {
  title?: ReactNode
  description?: ReactNode
  acceptLabel?: string
  declineLabel?: string
  onAccept?: () => void
  onDecline?: () => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const buttonBase =
  'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md px-4 text-sm transition-[background-color,opacity,scale] duration-(--motion-dur-fast) ease-(--motion-ease-out) active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none sm:min-h-9'

export const BannerCookie = forwardRef<HTMLElement, BannerCookieProps>(
  (
    {
      className,
      title = 'We use cookies',
      description = 'Cookies keep the site working and help us understand how it is used. You can change your choice at any time.',
      acceptLabel = 'Accept all',
      declineLabel = 'Decline',
      onAccept,
      onDecline,
      open,
      defaultOpen = true,
      onOpenChange,
      'aria-label': ariaLabel = 'Cookie consent',
      ...props
    },
    ref,
  ) => {
    const [isOpen, setOpen] = useControlledState(open, defaultOpen, onOpenChange)
    const reduceMotion = useReducedMotion()
    const shift = reduceMotion ? 0 : 12
    const transition = reduceMotion
      ? { duration: 0 }
      : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.section
            ref={ref}
            aria-label={ariaLabel}
            className={cn(
              'w-full max-w-md rounded-md border border-(--color-border) bg-(--color-bg) p-4 text-(--color-fg)',
              className,
            )}
            initial={{ opacity: 0, y: shift }}
            animate={{ opacity: 1, y: 0, transition }}
            exit={{ opacity: 0, y: shift, transition }}
            {...(props as object)}
          >
            <p className="text-base">{title}</p>
            <p className="mt-1 text-sm text-pretty text-(--color-muted)">{description}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  onDecline?.()
                  setOpen(false)
                }}
                className={cn(
                  buttonBase,
                  'border border-(--color-border) text-(--color-fg) hover:bg-(--color-surface-2)',
                )}
              >
                {declineLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onAccept?.()
                  setOpen(false)
                }}
                className={cn(buttonBase, 'bg-(--color-fg) text-(--color-bg) hover:opacity-90')}
              >
                {acceptLabel}
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    )
  },
)
BannerCookie.displayName = 'BannerCookie'
