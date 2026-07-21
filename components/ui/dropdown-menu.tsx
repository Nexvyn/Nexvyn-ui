'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { useReducedMotion, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { playHoverSound, playClickSound } from '@/lib/sound'
import { useProximityHighlight, ProximityHighlight } from '@/lib/hooks/use-proximity-highlight'
interface DropdownMenuContextValue {
  open: boolean
  setOpen: (next: boolean) => void
  triggerId: string
  contentId: string
  nextIndex: () => number

  itemsWidth: number | null
  setItemsWidth: (w: number | null) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuCtx(componentName: string) {
  const ctx = useContext(DropdownMenuContext)
  if (!ctx) throw new Error(`${componentName} must be used within DropdownMenu`)
  return ctx
}
interface DropdownMenuContentContextValue {
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
  highlightX: ReturnType<typeof import('motion/react').useSpring>
  highlightSize: MotionValue<number>
  highlightOpacity: ReturnType<typeof import('motion/react').useSpring>
  axis: 'x' | 'y'
  focusedIndex: number
  setFocusedIndex: (i: number) => void
  setOpen: (next: boolean) => void

  registerItem: (index: number, el: HTMLElement | null) => void
}

const DropdownMenuContentContext = createContext<DropdownMenuContentContextValue | null>(null)

function useDropdownMenuContentCtx(componentName: string) {
  const ctx = useContext(DropdownMenuContentContext)
  if (!ctx) throw new Error(`${componentName} must be used within DropdownMenuContent`)
  return ctx
}
export interface DropdownMenuProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function DropdownMenu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: DropdownMenuProps) {
  const isControlled = openProp !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = isControlled ? openProp : internalOpen
  const [itemsWidth, setItemsWidth] = useState<number | null>(null)

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const reactId = useId()
  const triggerId = `${reactId}-trigger`
  const contentId = `${reactId}-content`
  const indexRef = useRef(0)
  const nextIndex = useCallback(() => {
    const idx = indexRef.current
    indexRef.current += 1
    return idx
  }, [])
  useEffect(() => {
    if (!open) indexRef.current = 0
  }, [open])
  useEffect(() => {
    if (!open) return
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if ((target as HTMLElement).closest?.('[data-dropdown-trigger]')) return
      if ((target as HTMLElement).closest?.('[data-dropdown-content]')) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open, setOpen])
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        document.getElementById(triggerId)?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, setOpen, triggerId])

  const ctx = useMemo<DropdownMenuContextValue>(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
      nextIndex,
      itemsWidth,
      setItemsWidth,
    }),
    [open, setOpen, triggerId, contentId, nextIndex, itemsWidth],
  )

  return (
    <DropdownMenuContext.Provider value={ctx}>
      <div className={cn('relative inline-block', className)}>{children}</div>
    </DropdownMenuContext.Provider>
  )
}
export interface DropdownMenuTriggerProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'children'
> {
  children: ReactNode
  showChevron?: boolean
}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, showChevron = true, className, onClick, onMouseEnter, ...props }, ref) => {
    const { open, setOpen, triggerId, contentId, itemsWidth } =
      useDropdownMenuCtx('DropdownMenuTrigger')
    const reduceMotion = useReducedMotion()

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        data-dropdown-trigger
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        style={itemsWidth ? { width: itemsWidth } : undefined}
        className={cn(
          'flex min-h-11 w-full items-center justify-between gap-2 rounded-lg squircle-corners border border-(--color-border) bg-(--color-surface) px-4 py-3 text-left text-sm font-medium text-(--color-fg) transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
          'hover:bg-(--color-surface-2)',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
          className,
        )}
        onClick={(e) => {
          onClick?.(e)
          playClickSound()
          setOpen(!open)
        }}
        onMouseEnter={(e) => {
          onMouseEnter?.(e)
          playHoverSound()
        }}
        {...props}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">{children}</span>
        {showChevron && (
          <span
            className="shrink-0 text-(--color-muted)"
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: reduceMotion ? 'none' : 'transform 200ms var(--motion-ease-out)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </span>
        )}
      </button>
    )
  },
)
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'
export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
  side?: 'bottom' | 'top'
  sideOffset?: number
}

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ align = 'start', side = 'bottom', sideOffset = 8, children, className, ...props }, ref) => {
    const { open, setOpen, triggerId, contentId, itemsWidth, setItemsWidth } =
      useDropdownMenuCtx('DropdownMenuContent')

    const outerCtx = useContext(DropdownMenuContext)
    const probeIndexRef = useRef(0)
    const probeNextIndex = useCallback(() => probeIndexRef.current++, [])
    const panelRef = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState({ left: 0, top: 0 })

    const maxWidthRef = useRef(0)
    const {
      activeIndex,
      setActiveIndex,
      registerItem,
      handlers,
      highlightX,
      highlightSize,
      highlightOpacity,
      axis,
    } = useProximityHighlight(panelRef, { axis: 'y' })

    const [focusedIndex, setFocusedIndex] = useState(0)
    useEffect(() => {
      if (!open) return
      const measure = () => {
        const trigger = document.getElementById(triggerId)
        const content = panelRef.current
        if (!trigger || !content) return
        const triggerRect = trigger.getBoundingClientRect()
        const contentRect = content.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight

        let left = align === 'end' ? triggerRect.right - contentRect.width : triggerRect.left
        if (align === 'center')
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
        left = Math.max(12, Math.min(left, vw - contentRect.width - 12))

        let top: number
        const spaceBelow = vh - triggerRect.bottom - sideOffset
        if (side === 'top' || (side === 'bottom' && spaceBelow < contentRect.height)) {
          top = triggerRect.top - contentRect.height - sideOffset
        } else {
          top = triggerRect.bottom + sideOffset
        }
        setPosition({ left, top })

        const natural = Math.max(triggerRect.width, contentRect.width)
        maxWidthRef.current = Math.max(maxWidthRef.current, natural)
        setItemsWidth(maxWidthRef.current)
      }

      const frame = requestAnimationFrame(measure)
      window.addEventListener('resize', measure)
      window.addEventListener('scroll', measure, true)
      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('resize', measure)
        window.removeEventListener('scroll', measure, true)
      }
    }, [open, align, side, sideOffset, triggerId, setItemsWidth])
    useEffect(() => {
      if (!open) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!panelRef.current?.contains(document.activeElement)) return
        const items = panelRef.current.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([data-disabled])',
        )
        if (!items.length) return
        const count = items.length

        if (e.key === 'ArrowDown') {
          e.preventDefault()
          const next = (focusedIndex + 1) % count
          setFocusedIndex(next)
          items[next]?.focus()
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          const next = (focusedIndex - 1 + count) % count
          setFocusedIndex(next)
          items[next]?.focus()
        } else if (e.key === 'Home') {
          e.preventDefault()
          setFocusedIndex(0)
          items[0]?.focus()
        } else if (e.key === 'End') {
          e.preventDefault()
          setFocusedIndex(count - 1)
          items[count - 1]?.focus()
        } else if (e.key === 'Tab') {
          setOpen(false)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, focusedIndex, setOpen])
    useEffect(() => {
      if (!open) return
      const frame = requestAnimationFrame(() => {
        setFocusedIndex(0)
        panelRef.current
          ?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([data-disabled])')?.[0]
          ?.focus()
      })
      return () => cancelAnimationFrame(frame)
    }, [open])

    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        ;(panelRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      },
      [ref],
    )

    const contentCtx = useMemo<DropdownMenuContentContextValue>(
      () => ({
        activeIndex,
        setActiveIndex,
        highlightX,
        highlightSize,
        highlightOpacity,
        axis,
        focusedIndex,
        setFocusedIndex,
        setOpen,
        registerItem,
      }),
      [
        activeIndex,
        setActiveIndex,
        highlightX,
        highlightSize,
        highlightOpacity,
        axis,
        focusedIndex,
        setOpen,
        registerItem,
      ],
    )

    const measureRef = useRef<HTMLDivElement | null>(null)
    useLayoutEffect(() => {
      const el = measureRef.current
      if (!el || typeof ResizeObserver === 'undefined') return
      const update = () => {
        const w = el.getBoundingClientRect().width
        maxWidthRef.current = Math.max(maxWidthRef.current, w)
        setItemsWidth(maxWidthRef.current)
      }
      update()
      const ro = new ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
    }, [children, setItemsWidth])

    if (!open) {
      if (!outerCtx) return null

      return (
        <DropdownMenuContext.Provider value={{ ...outerCtx, nextIndex: probeNextIndex }}>
          <DropdownMenuContentContext.Provider value={contentCtx}>
            <div
              ref={measureRef}
              aria-hidden="true"
              className={cn(
                'pointer-events-none invisible fixed top-0 left-0 min-w-48 border border-(--color-border) bg-(--color-bg) p-1.5 **:min-w-max',
                'rounded-lg squircle-corners',
                className,
              )}
            >
              {children}
            </div>
          </DropdownMenuContentContext.Provider>
        </DropdownMenuContext.Provider>
      )
    }

    const content = (
      <DropdownMenuContentContext.Provider value={contentCtx}>
        <div
          ref={setRefs}
          id={contentId}
          role="menu"
          aria-labelledby={triggerId}
          data-dropdown-content
          className={cn(
            'relative z-300 min-w-48 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-lg squircle-corners border border-(--color-border) bg-(--color-bg) p-1.5 outline-none',
            'shadow-[0_14px_34px_-22px_rgba(0,0,0,0.15)]',
            className,
          )}
          style={{
            position: 'fixed',
            left: position.left,
            top: position.top,
            width: itemsWidth ?? undefined,
          }}
          tabIndex={-1}
          {...handlers}
          {...props}
        >
          <ProximityHighlight
            highlightX={highlightX}
            highlightSize={highlightSize}
            highlightOpacity={highlightOpacity}
            axis={axis}
            className="mx-1.5 rounded-md squircle-corners bg-(--color-surface-2)"
          />
          {children}
        </div>
      </DropdownMenuContentContext.Provider>
    )

    return createPortal(content, document.body)
  },
)
DropdownMenuContent.displayName = 'DropdownMenuContent'
export interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  disabled?: boolean
  destructive?: boolean
  textValue?: string
  onClick?: () => void
}

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  (
    { children, disabled, destructive, textValue, onClick, onMouseEnter, className, ...props },
    ref,
  ) => {
    const { nextIndex } = useDropdownMenuCtx('DropdownMenuItem')
    const { setActiveIndex, focusedIndex, setFocusedIndex, setOpen, registerItem } =
      useDropdownMenuContentCtx('DropdownMenuItem')

    const itemRef = useRef<HTMLDivElement | null>(null)

    const indexRef = useRef<number | null>(null)
    if (indexRef.current === null) indexRef.current = nextIndex()
    // eslint-disable-next-line react-hooks/refs
    const index = indexRef.current
    useEffect(() => {
      const el = itemRef.current
      if (index < 0 || !el) return
      registerItem(index, el)
      return () => registerItem(index, null)
    }, [index, registerItem])

    const setItemRef = useCallback(
      (node: HTMLDivElement | null) => {
        itemRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [ref],
    )

    return (
      <div
        ref={setItemRef}
        role="menuitem"
        tabIndex={focusedIndex === index ? 0 : -1}
        data-disabled={disabled ? '' : undefined}
        data-proximity-index={index}
        aria-disabled={disabled || undefined}
        aria-label={textValue}
        className={cn(
          'relative flex min-h-11 w-full cursor-default select-none scroll-m-1 items-center justify-between gap-3 rounded-md squircle-corners px-3 py-2.5 text-left text-sm outline-none transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          destructive
            ? 'text-(--color-error) focus-visible:text-(--color-error)'
            : 'text-(--color-fg)',
          className,
        )}
        onPointerDown={(e) => {
          e.preventDefault()
        }}
        onFocus={() => {
          setFocusedIndex(index)
          setActiveIndex(index)
        }}
        onClick={() => {
          if (disabled) return
          playClickSound()
          onClick?.()
          setOpen(false)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (!disabled) {
              playClickSound()
              onClick?.()
              setOpen(false)
            }
          }
        }}
        onMouseEnter={(e) => {
          onMouseEnter?.(e)
          if (!disabled) playHoverSound()
        }}
        {...props}
      >
        <span className="relative z-10 flex min-w-0 flex-1 items-center gap-2 truncate">
          {children}
        </span>
      </div>
    )
  },
)
DropdownMenuItem.displayName = 'DropdownMenuItem'
export interface DropdownMenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  labelClassName?: string
}

export const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ label, labelClassName, children, className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn(label && 'mt-2 first:mt-0', className)} {...props}>
      {label && (
        <div
          className={cn(
            'px-3 pt-1 pb-1 text-[11px] font-medium uppercase tracking-[0.12em] text-(--color-subtle)',
            labelClassName,
          )}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  ),
)
DropdownMenuGroup.displayName = 'DropdownMenuGroup'
export type DropdownMenuLabelProps = HTMLAttributes<HTMLDivElement>

export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-3 pt-1 pb-1 text-[11px] font-medium uppercase tracking-[0.12em] text-(--color-subtle)',
        className,
      )}
      {...props}
    />
  ),
)
DropdownMenuLabel.displayName = 'DropdownMenuLabel'
export type DropdownMenuSeparatorProps = HTMLAttributes<HTMLDivElement>

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-hidden="true"
      className={cn('my-1 h-px bg-(--color-border)', className)}
      {...props}
    />
  ),
)
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'
export function DropdownMenuPreview() {
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="w-56">
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
