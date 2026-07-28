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
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface ActionItem {
  /** Stable unique identifier for the action. */
  id: string
  /** Accessible label — rendered as visible text or `aria-label` for icon-only. */
  label: string
  /** Icon rendered inside the button (decorative, `aria-hidden`). */
  icon?: ReactNode
  /** Disables this action. */
  disabled?: boolean
  /** Marks action as destructive (applies destructive color tokens). */
  destructive?: boolean
  /** Priority determines overflow order. Higher priority items overflow last. Default 0. */
  priority?: number
  /** When true, this item never overflows into the menu regardless of space. */
  pinned?: boolean
  /** Invoked on activation (click / Enter / Space). */
  onSelect?: () => void
}

export interface AdaptiveActionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The actions to render. */
  actions: ActionItem[]
  /** Accessible label for the toolbar. Defaults to 'Actions'. */
  label?: string
  /** Localized label for the overflow trigger button. Defaults to 'More actions'. */
  moreLabel?: string
  /** Render a custom trigger for the overflow menu. Receives the count of hidden items. */
  renderMoreTrigger?: (count: number) => ReactNode
  /** Maximum visible items before overflow — independent of inline measurement. Optional. */
  maxVisible?: number
}

interface AdaptiveActionsContextValue {
  rovingIndex: number
  setRovingIndex: (i: number) => void
  itemCount: number
}

const AdaptiveActionsContext = createContext<AdaptiveActionsContextValue | null>(null)

function useAdaptiveActionsCtx() {
  const ctx = useContext(AdaptiveActionsContext)
  if (!ctx) throw new Error('AdaptiveActions compound child used outside AdaptiveActions')
  return ctx
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface OverflowMenuProps {
  actions: ActionItem[]
  triggerId: string
  contentId: string
  moreLabel: string
  renderMoreTrigger?: (count: number) => ReactNode
  triggerTabIndex: number
}

function OverflowMenu({
  actions,
  triggerId,
  contentId,
  moreLabel,
  renderMoreTrigger,
  triggerTabIndex,
}: OverflowMenuProps) {
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return
      }
      setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const firstEnabled = actions.findIndex((a) => !a.disabled)
    const idx = firstEnabled >= 0 ? firstEnabled : 0
    // Use a microtask so setState isn't synchronous in the effect body
    queueMicrotask(() => {
      setFocusedIndex(idx)
    })
  }, [open, actions])

  useEffect(() => {
    if (!open || focusedIndex < 0) return
    const menu = menuRef.current
    if (!menu) return
    const items = menu.querySelectorAll<HTMLElement>('[role="menuitem"]')
    items[focusedIndex]?.focus()
  }, [open, focusedIndex])

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledIndices = actions.map((a, i) => (!a.disabled ? i : -1)).filter((i) => i >= 0)
      const currentPos = enabledIndices.indexOf(focusedIndex)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = enabledIndices[(currentPos + 1) % enabledIndices.length]
        setFocusedIndex(next)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev =
          enabledIndices[(currentPos - 1 + enabledIndices.length) % enabledIndices.length]
        setFocusedIndex(prev)
      } else if (e.key === 'Home') {
        e.preventDefault()
        setFocusedIndex(enabledIndices[0])
      } else if (e.key === 'End') {
        e.preventDefault()
        setFocusedIndex(enabledIndices[enabledIndices.length - 1])
      }
    },
    [actions, focusedIndex],
  )

  const [menuPos, setMenuPos] = useState<{
    top: number
    insetInlineEnd: number
  } | null>(null)

  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    if (!trigger) return
    const updatePos = () => {
      const rect = trigger.getBoundingClientRect()
      const isRTL = trigger.ownerDocument.defaultView?.getComputedStyle(trigger).direction === 'rtl'
      const viewportWidth = trigger.ownerDocument.documentElement.clientWidth
      // In LTR: align menu's inline-end to the trigger's inline-end (right edge)
      // In RTL: align menu's inline-end to the trigger's inline-start (left edge)
      const insetInlineEnd = isRTL ? viewportWidth - rect.left : viewportWidth - rect.right
      setMenuPos({
        top: rect.bottom + 4,
        insetInlineEnd,
      })
    }
    updatePos()
    window.addEventListener('scroll', updatePos, { passive: true })
    window.addEventListener('resize', updatePos, { passive: true })
    return () => {
      window.removeEventListener('scroll', updatePos)
      window.removeEventListener('resize', updatePos)
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        tabIndex={triggerTabIndex}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        aria-label={moreLabel}
        className={cn(
          'inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg supports-[corner-shape:squircle]:corner-squircle px-3 text-sm font-medium text-(--color-fg)',
          'transition-colors duration-(--motion-dur-fast) ease motion-reduce:transition-none',
          'hover:bg-(--color-surface-2)',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
        )}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        {renderMoreTrigger ? (
          renderMoreTrigger(actions.length)
        ) : (
          <span aria-hidden="true" className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <circle cx="4" cy="8" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="12" cy="8" r="1.5" />
            </svg>
          </span>
        )}
      </button>

      {open &&
        typeof document !== 'undefined' &&
        menuPos &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={menuRef}
              id={contentId}
              role="menu"
              aria-labelledby={triggerId}
              initial={reduceMotion ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.15, ease: [0.22, 1, 0.36, 1] }
              }
              style={{
                position: 'fixed',
                top: menuPos.top,
                insetInlineEnd: menuPos.insetInlineEnd,
                zIndex: 50,
              }}
              className="min-w-40 rounded-lg supports-[corner-shape:squircle]:corner-squircle border border-(--color-border) bg-(--color-surface) py-1 shadow-lg"
              onKeyDown={handleMenuKeyDown}
            >
              {actions.map((action, i) => (
                <button
                  key={action.id}
                  type="button"
                  role="menuitem"
                  tabIndex={i === focusedIndex ? 0 : -1}
                  disabled={action.disabled}
                  aria-disabled={action.disabled || undefined}
                  className={cn(
                    'flex min-h-10 w-full items-center gap-2 px-3 py-2 text-start text-sm',
                    'transition-colors duration-(--motion-dur-fast) ease motion-reduce:transition-none',
                    action.disabled
                      ? 'cursor-not-allowed opacity-50'
                      : action.destructive
                        ? 'text-(--color-destructive) hover:bg-(--color-destructive)/10 focus:bg-(--color-destructive)/10'
                        : 'text-(--color-fg) hover:bg-(--color-surface-2) focus:bg-(--color-surface-2)',
                    'focus:outline-none',
                  )}
                  onClick={() => {
                    if (action.disabled) return
                    action.onSelect?.()
                    setOpen(false)
                    triggerRef.current?.focus()
                  }}
                >
                  {action.icon && (
                    <span aria-hidden="true" className="shrink-0">
                      {action.icon}
                    </span>
                  )}
                  <span>{action.label}</span>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}

interface VisibleActionProps {
  action: ActionItem
  index: number
  itemRef: (el: HTMLButtonElement | null) => void
  measureRef?: (el: HTMLButtonElement | null) => void
  visible: boolean
}

function VisibleAction({ action, index, itemRef, measureRef, visible }: VisibleActionProps) {
  const { rovingIndex, setRovingIndex } = useAdaptiveActionsCtx()
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      key={action.id}
      data-aa-item
      layout={false}
      initial={reduceMotion ? false : { opacity: 0, x: -6 }}
      animate={
        visible
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: -6, scale: 0.97, pointerEvents: 'none' as const }
      }
      exit={reduceMotion ? undefined : { opacity: 0, x: 6, scale: 0.97 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'motion-reduce:transform-none motion-reduce:transition-none',
        !visible && 'pointer-events-none absolute opacity-0',
      )}
      style={!visible ? { position: 'absolute', visibility: 'hidden' } : undefined}
    >
      <button
        ref={(el) => {
          itemRef(el)
          measureRef?.(el)
        }}
        type="button"
        tabIndex={index === rovingIndex ? 0 : -1}
        disabled={action.disabled}
        aria-disabled={action.disabled || undefined}
        aria-label={!action.icon ? undefined : action.label}
        className={cn(
          'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg supports-[corner-shape:squircle]:corner-squircle px-3 text-sm font-medium',
          'transition-colors duration-(--motion-dur-fast) ease motion-reduce:transition-none',
          action.disabled
            ? 'cursor-not-allowed opacity-50'
            : action.destructive
              ? 'text-(--color-destructive) hover:bg-(--color-destructive)/10'
              : 'text-(--color-fg) hover:bg-(--color-surface-2)',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
        )}
        onClick={() => {
          if (action.disabled) return
          setRovingIndex(index)
          action.onSelect?.()
        }}
        onFocus={() => setRovingIndex(index)}
        onPointerDown={(e) => {
          // Prevent focus-visible ring on pointer click
          e.preventDefault()
          ;(e.currentTarget as HTMLElement).focus()
        }}
      >
        {action.icon && (
          <span aria-hidden="true" className="shrink-0">
            {action.icon}
          </span>
        )}
        <span className={action.icon ? 'sr-only sm:not-sr-only' : undefined}>{action.label}</span>
      </button>
    </motion.div>
  )
}

export const AdaptiveActions = forwardRef<HTMLDivElement, AdaptiveActionsProps>(
  (
    {
      actions,
      label = 'Actions',
      moreLabel = 'More actions',
      renderMoreTrigger,
      maxVisible,
      className,
      ...props
    },
    ref,
  ) => {
    const reactId = useId()
    const triggerId = `${reactId}-overflow-trigger`
    const contentId = `${reactId}-overflow-menu`

    const [rovingIndex, setRovingIndex] = useState(0)
    const [visibleCount, setVisibleCount] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const itemWidthsRef = useRef<number[]>([])
    const moreButtonWidthRef = useRef(48) // estimated; measured on mount
    const measuredRef = useRef(false)
    const measureFrameRef = useRef<number | null>(null)

    const sortedActions = useMemo(() => {
      return [...actions].sort((a, b) => {
        const ap = a.pinned ? Infinity : (a.priority ?? 0)
        const bp = b.pinned ? Infinity : (b.priority ?? 0)
        return bp - ap
      })
    }, [actions])

    const measureRowRef = useRef<HTMLDivElement>(null)

    const calculateVisibleCount = useCallback(() => {
      const container = containerRef.current
      if (!container || !measuredRef.current) return

      const containerWidth = container.offsetWidth
      const gap = 4 // gap-1 = 0.25rem = 4px
      const widths = itemWidthsRef.current
      const moreWidth = moreButtonWidthRef.current

      if (maxVisible !== undefined) {
        setVisibleCount(Math.min(maxVisible, sortedActions.length))
        return
      }

      let usedWidth = 0
      let count = 0

      for (let i = 0; i < sortedActions.length; i++) {
        const itemWidth = widths[i] ?? 44
        const nextUsed = usedWidth + itemWidth + (count > 0 ? gap : 0)

        const remaining = sortedActions.length - (i + 1)
        const needsMore = remaining > 0
        const spaceNeeded = needsMore ? nextUsed + gap + moreWidth : nextUsed

        if (spaceNeeded <= containerWidth) {
          usedWidth = nextUsed
          count++
        } else {
          // This item doesn't fit. But if it's pinned, we must include it.
          if (sortedActions[i].pinned) {
            usedWidth = nextUsed
            count++
          } else {
            break
          }
        }
      }

      const totalWidth = widths.reduce((sum, w, i) => sum + w + (i > 0 ? gap : 0), 0)
      if (totalWidth <= containerWidth) {
        count = sortedActions.length
      }

      setVisibleCount(count)
    }, [sortedActions, maxVisible])

    useIsomorphicLayoutEffect(() => {
      const measureRow = measureRowRef.current
      if (!measureRow) return
      const buttons = measureRow.querySelectorAll<HTMLElement>('[data-aa-measure]')
      const widths: number[] = []
      buttons.forEach((btn) => {
        widths.push(btn.offsetWidth)
      })
      itemWidthsRef.current = widths

      const moreBtn = measureRow.querySelector<HTMLElement>('[data-aa-more-measure]')
      if (moreBtn) {
        moreButtonWidthRef.current = moreBtn.offsetWidth
      }
      measuredRef.current = true
      calculateVisibleCount()
    }, [actions, calculateVisibleCount])

    useEffect(() => {
      const container = containerRef.current
      if (!container) return
      let cancelled = false

      const observer = new ResizeObserver(() => {
        if (cancelled) return
        // Debounce with rAF to avoid loops
        if (measureFrameRef.current !== null) {
          cancelAnimationFrame(measureFrameRef.current)
        }
        measureFrameRef.current = requestAnimationFrame(() => {
          if (!cancelled) calculateVisibleCount()
          measureFrameRef.current = null
        })
      })

      observer.observe(container)
      return () => {
        cancelled = true
        observer.disconnect()
        if (measureFrameRef.current !== null) {
          cancelAnimationFrame(measureFrameRef.current)
          measureFrameRef.current = null
        }
      }
    }, [calculateVisibleCount])

    const effectiveVisibleCount = visibleCount ?? sortedActions.length
    const visibleActions = sortedActions.slice(0, effectiveVisibleCount)
    const overflowActions = sortedActions.slice(effectiveVisibleCount)

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      const toolbar = containerRef.current
      if (!toolbar) return

      const buttons = Array.from(
        toolbar.querySelectorAll<HTMLElement>(
          '[role="toolbar"] > [data-aa-item] button:not([disabled]), [role="toolbar"] > button:not([disabled])',
        ),
      )
      if (!buttons.length) return

      const isRTL = toolbar.ownerDocument.defaultView?.getComputedStyle(toolbar).direction === 'rtl'
      const count = buttons.length
      const currentIdx = buttons.indexOf(document.activeElement as HTMLElement)
      let nextIdx = currentIdx

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextIdx = isRTL ? (currentIdx <= 0 ? count - 1 : currentIdx - 1) : (currentIdx + 1) % count
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        nextIdx = isRTL ? (currentIdx + 1) % count : currentIdx <= 0 ? count - 1 : currentIdx - 1
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIdx = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIdx = count - 1
      }

      if (nextIdx !== currentIdx && nextIdx >= 0 && nextIdx < count) {
        setRovingIndex(nextIdx)
        buttons[nextIdx]?.focus()
      }
    }, [])

    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
    const itemCount = visibleActions.length + (overflowActions.length > 0 ? 1 : 0)

    const ctx = useMemo<AdaptiveActionsContextValue>(
      () => ({ rovingIndex, setRovingIndex, itemCount }),
      [rovingIndex, itemCount],
    )

    return (
      <AdaptiveActionsContext.Provider value={ctx}>
        {/* Hidden measurement row — measures all items at full size without visible layout */}
        <div
          ref={measureRowRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            visibility: 'hidden',
            height: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {sortedActions.map((action) => (
            <button
              key={action.id}
              data-aa-measure
              type="button"
              tabIndex={-1}
              className="inline-flex min-h-11 min-w-11 items-center gap-2 px-3 text-sm font-medium"
            >
              {action.icon && <span className="shrink-0">{action.icon}</span>}
              <span>{action.label}</span>
            </button>
          ))}
          <button
            data-aa-more-measure
            type="button"
            tabIndex={-1}
            className="inline-flex min-h-11 min-w-11 items-center justify-center px-3 text-sm font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="4" cy="8" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="12" cy="8" r="1.5" />
            </svg>
          </button>
        </div>

        <div
          ref={(node) => {
            ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="toolbar"
          aria-orientation="horizontal"
          aria-label={label}
          className={cn('inline-flex w-full items-center gap-1', className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleActions.map((action, i) => (
              <VisibleAction
                key={action.id}
                action={action}
                index={i}
                visible={true}
                itemRef={(el) => {
                  itemRefs.current[i] = el
                }}
              />
            ))}
          </AnimatePresence>

          {overflowActions.length > 0 && (
            <OverflowMenu
              actions={overflowActions}
              triggerId={triggerId}
              contentId={contentId}
              moreLabel={moreLabel}
              renderMoreTrigger={renderMoreTrigger}
              triggerTabIndex={rovingIndex === visibleActions.length ? 0 : -1}
            />
          )}
        </div>
      </AdaptiveActionsContext.Provider>
    )
  },
)
AdaptiveActions.displayName = 'AdaptiveActions'

export function AdaptiveActionsPreview() {
  const actions: ActionItem[] = [
    {
      id: 'edit',
      label: 'Edit',
      priority: 3,
      icon: (
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
          <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" />
        </svg>
      ),
      onSelect: () => {},
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      priority: 2,
      icon: (
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
          <rect x="5.5" y="5.5" width="7" height="7" rx="1" />
          <path d="M3.5 10.5v-7a1 1 0 011-1h7" />
        </svg>
      ),
      onSelect: () => {},
    },
    {
      id: 'share',
      label: 'Share',
      priority: 1,
      icon: (
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
          <circle cx="12" cy="4" r="2" />
          <circle cx="4" cy="8" r="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M5.8 9l4.4 2M10.2 5L5.8 7" />
        </svg>
      ),
      onSelect: () => {},
    },
    {
      id: 'archive',
      label: 'Archive',
      priority: 0,
      icon: (
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
          <rect x="2" y="3" width="12" height="3" rx="1" />
          <path d="M3 6v7a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3" />
        </svg>
      ),
      onSelect: () => {},
    },
    {
      id: 'delete',
      label: 'Delete',
      destructive: true,
      priority: 0,
      icon: (
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
          <path d="M3 5h10M5.5 5V3.5a1 1 0 011-1h3a1 1 0 011 1V5M12 5v7.5a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 014 12.5V5" />
        </svg>
      ),
      onSelect: () => {},
    },
  ]

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <AdaptiveActions actions={actions} label="File actions" />
      </div>
    </div>
  )
}
