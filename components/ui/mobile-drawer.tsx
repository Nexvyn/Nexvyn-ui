'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { useFocusTrap } from '@/lib/hooks/use-focus-trap'
import { useMounted } from '@/hooks/use-mounted'

export interface MobileDrawerProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  children: ReactNode
  triggerRef?: React.RefObject<HTMLElement | null>
  dismissible?: boolean
}

const MobileDrawerTitleIdContext = createContext<string | undefined>(undefined)

export interface MobileDrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export const MobileDrawerTitle = forwardRef<HTMLHeadingElement, MobileDrawerTitleProps>(
  ({ children, className, id, ...props }, ref) => {
    const contextId = useContext(MobileDrawerTitleIdContext)
    return (
      <h2
        ref={ref}
        id={id ?? contextId}
        className={cn('px-6 pt-6 pb-2 text-lg font-semibold text-(--color-fg)', className)}
        {...props}
      >
        {children}
      </h2>
    )
  },
)
MobileDrawerTitle.displayName = 'MobileDrawerTitle'

export const MobileDrawer = forwardRef<HTMLDivElement, MobileDrawerProps>(
  (
    {
      open,
      onClose,
      children,
      triggerRef: triggerRefProp,
      dismissible = true,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const mounted = useMounted()
    const panelRef = useRef<HTMLDivElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const previousScrollRef = useRef<string>('')
    const dragY = useMotionValue(0)
    const overlayOpacity = useTransform(dragY, [0, 300], [0.8, 0])

    const reactId = useId()
    const titleId = `${reactId}-drawer-title`

    useFocusTrap(dialogRef, open, triggerRefProp)

    useEffect(() => {
      if (!open) return
      previousScrollRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previousScrollRef.current
      }
    }, [open])

    const handleDragEnd = useCallback(
      (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
        if (!dismissible) return
        const panelHeight = panelRef.current?.offsetHeight ?? 300
        const pastThreshold = info.offset.y > panelHeight * 0.3
        const fastFlick = info.velocity.y > 500
        if (pastThreshold || fastFlick) {
          onClose()
        }
      },
      [dismissible, onClose],
    )

    if (!mounted) return null

    return createPortal(
      <AnimatePresence>
        {open && (
          <div
            key="mobile-drawer"
            ref={(node) => {
              ;(dialogRef as React.MutableRefObject<HTMLDivElement | null>).current = node
              if (typeof ref === 'function') ref(node)
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
            }}
            className="fixed inset-0 z-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby={'aria-label' in props ? undefined : titleId}
            {...props}
          >
            <motion.div
              className="absolute inset-0 bg-(--color-bg)"
              style={{ opacity: reduceMotion ? 0.8 : overlayOpacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: reduceMotion ? 0.8 : 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={dismissible ? onClose : undefined}
              aria-hidden="true"
            />

            <motion.div
              ref={panelRef}
              className={cn(
                'absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-lg squircle-corners bg-(--color-bg) pb-[env(safe-area-inset-bottom)]',
                className,
              )}
              style={{
                y: dragY,
              }}
              initial={reduceMotion ? { y: 0 } : { y: '100%' }}
              animate={reduceMotion ? { y: 0 } : { y: 0 }}
              exit={reduceMotion ? { y: 0 } : { y: '100%' }}
              transition={reduceMotion ? { duration: 0 } : springs.settle}
              drag={dismissible ? 'y' : false}
              dragConstraints={{ top: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              <div className="flex justify-center pt-3 pb-2" aria-hidden="true">
                <div className="h-1 w-9 rounded-full bg-(--color-border)" />
              </div>

              <MobileDrawerTitleIdContext.Provider value={titleId}>
                {children}
              </MobileDrawerTitleIdContext.Provider>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body,
    )
  },
)
MobileDrawer.displayName = 'MobileDrawer'

export function MobileDrawerPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg squircle-corners border border-(--color-border) bg-(--color-surface) px-4 py-2.5 text-sm text-(--color-fg)"
      >
        Open Drawer
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)}>
        <MobileDrawerTitle>Filters</MobileDrawerTitle>
        <div className="px-6 pb-6 space-y-3">
          {['Category', 'Price', 'Rating', 'Brand'].map((label) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-md squircle-corners border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm"
            >
              <span className="text-(--color-fg)">{label}</span>
              <span className="text-(--color-muted)">Any</span>
            </div>
          ))}
        </div>
      </MobileDrawer>
    </div>
  )
}
