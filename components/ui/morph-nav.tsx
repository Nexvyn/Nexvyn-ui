'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { useProximityHighlight, ProximityHighlight } from '@/lib/hooks/use-proximity-highlight'

export interface MorphNavItem {
  id: string
  label: string
  icon?: ReactNode
  href?: string
  onSelect?: () => void
  children?: MorphNavItem[]
}

type MorphNavState = 'closed' | 'main' | 'sub'

interface MorphNavContextValue {
  state: MorphNavState
  setState: (s: MorphNavState) => void
  items: MorphNavItem[]
  activeSubId: string | null
  setActiveSubId: (id: string | null) => void
  onNavigate?: (href: string, item: MorphNavItem) => void
}

const MorphNavContext = createContext<MorphNavContextValue | null>(null)

function useMorphNavCtx(componentName: string) {
  const ctx = useContext(MorphNavContext)
  if (!ctx) throw new Error(`${componentName} must be used within MorphNav`)
  return ctx
}

const PATH_HAMBURGER = 'M3 5h10M3 8h10M3 11h10'
const PATH_MINUS = 'M3 8h10'
const PATH_BACK = 'M7 5L3 8l4 3'

function getTriggerPaths(state: MorphNavState) {
  if (state === 'closed') return { top: PATH_HAMBURGER, mid: PATH_HAMBURGER, bot: PATH_HAMBURGER }
  if (state === 'main') return { top: PATH_MINUS, mid: PATH_MINUS, bot: PATH_MINUS }
  return { top: PATH_BACK, mid: PATH_BACK, bot: PATH_BACK }
}

export interface MorphNavProps {
  children?: ReactNode
  items: MorphNavItem[]
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'
  onNavigate?: (href: string, item: MorphNavItem) => void
  onOpenChange?: (open: boolean) => void
  triggerLabel?: string
  className?: string
  panelClassName?: string
}

export const MorphNav = forwardRef<HTMLDivElement, MorphNavProps>(
  (
    {
      items,
      placement = 'bottom-end',
      onNavigate,
      onOpenChange,
      triggerLabel = 'Menu',
      className,
      panelClassName,
    },
    ref,
  ) => {
    const [state, setState] = useState<MorphNavState>('closed')
    const [activeSubId, setActiveSubId] = useState<string | null>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const reduceMotion = useReducedMotion()

    const reactId = useId()
    const panelId = `${reactId}-panel`

    const handleSetState = useCallback(
      (next: MorphNavState) => {
        setState(next)
        onOpenChange?.(next !== 'closed')
        if (next === 'closed') {
          setActiveSubId(null)
          requestAnimationFrame(() => triggerRef.current?.focus())
        }
      },
      [onOpenChange],
    )

    useEffect(() => {
      if (state === 'closed') return
      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as Node
        if (panelRef.current?.contains(target)) return
        if (triggerRef.current?.contains(target)) return
        handleSetState('closed')
      }
      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [state, handleSetState])

    useEffect(() => {
      if (state === 'closed') return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          if (state === 'sub') {
            handleSetState('main')
          } else {
            handleSetState('closed')
          }
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [state, handleSetState])

    const ctx = useMemo<MorphNavContextValue>(
      () => ({ state, setState: handleSetState, items, activeSubId, setActiveSubId, onNavigate }),
      [state, handleSetState, items, activeSubId, onNavigate],
    )

    const paths = getTriggerPaths(state)
    const triggerAriaLabel =
      state === 'closed' ? triggerLabel : state === 'sub' ? 'Back' : `Close ${triggerLabel}`

    return (
      <MorphNavContext.Provider value={ctx}>
        <div ref={ref} className={cn('relative inline-block', className)}>
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={state !== 'closed'}
            aria-haspopup="menu"
            aria-label={triggerAriaLabel}
            className={cn(
              'flex size-11 items-center justify-center rounded-full squircle-corners bg-(--color-fg) text-(--color-bg) transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
            )}
            onClick={() => handleSetState(state === 'closed' ? 'main' : 'closed')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <motion.path
                d={paths.top}
                initial={false}
                animate={{ d: paths.top }}
                transition={reduceMotion ? { duration: 0 } : springs.settle}
              />
              <motion.path
                d={paths.mid}
                initial={false}
                animate={{ d: paths.mid }}
                transition={reduceMotion ? { duration: 0 } : springs.settle}
              />
              <motion.path
                d={paths.bot}
                initial={false}
                animate={{ d: paths.bot }}
                transition={reduceMotion ? { duration: 0 } : springs.settle}
              />
            </svg>
          </button>

          <AnimatePresence>
            {state !== 'closed' && (
              <MorphNavPanel
                ref={panelRef}
                id={panelId}
                placement={placement}
                className={panelClassName}
                triggerRef={triggerRef}
              />
            )}
          </AnimatePresence>
        </div>
      </MorphNavContext.Provider>
    )
  },
)
MorphNav.displayName = 'MorphNav'

interface MorphNavPanelProps {
  id: string
  placement: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'
  className?: string
  triggerRef: RefObject<HTMLButtonElement | null>
}

const MorphNavPanel = forwardRef<HTMLDivElement, MorphNavPanelProps>(
  ({ id, placement, className, triggerRef }, ref) => {
    const { state, setState, items, activeSubId } = useMorphNavCtx('MorphNavPanel')
    const panelRef = useRef<HTMLDivElement>(null)
    const reduceMotion = useReducedMotion()
    const [position, setPosition] = useState({ left: 0, top: 0 })

    const { registerItem, handlers, highlightX, highlightSize, highlightOpacity, axis } =
      useProximityHighlight(panelRef, { axis: 'y' })

    const displayItems = useMemo(() => {
      if (state === 'sub' && activeSubId) {
        const parent = items.find((item) => item.id === activeSubId)
        return parent?.children ?? []
      }
      return items
    }, [state, items, activeSubId])

    useEffect(() => {
      const trigger = triggerRef.current
      const panel = panelRef.current
      if (!trigger || !panel) return
      const triggerRect = trigger.getBoundingClientRect()
      const panelRect = panel.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const margin = 8

      let left: number
      let top: number

      if (placement.includes('end')) {
        left = triggerRect.right - panelRect.width
      } else {
        left = triggerRect.left
      }
      left = Math.max(margin, Math.min(left, vw - panelRect.width - margin))

      if (placement.includes('top')) {
        top = triggerRect.top - panelRect.height - 8
      } else {
        top = triggerRect.bottom + 8
      }
      top = Math.max(margin, Math.min(top, vh - panelRect.height - margin))

      setPosition({ left, top })
    }, [state, placement, displayItems, triggerRef])

    useEffect(() => {
      if (state === 'closed') return
      const panel = panelRef.current
      if (!panel) return

      const firstItem = panel.querySelector<HTMLElement>('[role="menuitem"]:not([data-disabled])')
      firstItem?.focus()

      const handleKeyDown = (e: KeyboardEvent) => {
        if (!panel.contains(document.activeElement)) return
        const menuItems = panel.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([data-disabled])',
        )
        if (!menuItems.length) return
        const count = menuItems.length
        const currentIdx = Array.from(menuItems).indexOf(document.activeElement as HTMLElement)

        if (e.key === 'ArrowDown') {
          e.preventDefault()
          const next = currentIdx < 0 ? 0 : (currentIdx + 1) % count
          menuItems[next]?.focus()
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          const next = currentIdx < 0 ? count - 1 : (currentIdx - 1 + count) % count
          menuItems[next]?.focus()
        } else if (e.key === 'Home') {
          e.preventDefault()
          menuItems[0]?.focus()
        } else if (e.key === 'End') {
          e.preventDefault()
          menuItems[count - 1]?.focus()
        } else if (e.key === 'Tab') {
          setState('closed')
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [state, setState])

    const indexRef = useRef(0)
    const nextIndex = useCallback(() => {
      const idx = indexRef.current
      indexRef.current += 1
      return idx
    }, [])

    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        ;(panelRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      },
      [ref],
    )

    return createPortal(
      <motion.div
        ref={setRefs}
        id={id}
        role="menu"
        className={cn(
          'fixed z-300 min-w-[12rem] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-lg squircle-corners border border-(--color-border) bg-(--color-bg) p-1.5 outline-none',
          'shadow-[0_14px_34px_-22px_rgba(0,0,0,0.15)]',
          className,
        )}
        style={{ left: position.left, top: position.top }}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        transition={
          reduceMotion ? { duration: 0 } : { ...springs.settle, opacity: { duration: 0.12 } }
        }
        tabIndex={-1}
        {...handlers}
      >
        <ProximityHighlight
          highlightX={highlightX}
          highlightSize={highlightSize}
          highlightOpacity={highlightOpacity}
          axis={axis}
          className="mx-1.5 rounded-md squircle-corners bg-(--color-surface-2)"
        />
        {displayItems.map((item) => (
          <MorphNavItemComponent
            key={item.id}
            item={item}
            nextIndex={nextIndex}
            registerItem={registerItem}
          />
        ))}
      </motion.div>,
      document.body,
    )
  },
)
MorphNavPanel.displayName = 'MorphNavPanel'

function MorphNavItemComponent({
  item,
  nextIndex,
  registerItem,
}: {
  item: MorphNavItem
  nextIndex: () => number
  registerItem: (index: number, el: HTMLElement | null) => void
}) {
  const { setState, setActiveSubId, onNavigate } = useMorphNavCtx('MorphNavItem')
  const itemRef = useRef<HTMLButtonElement | null>(null)
  const idxRef = useRef<number | null>(null)
  if (idxRef.current === null) idxRef.current = nextIndex()
  // eslint-disable-next-line react-hooks/refs
  const idx = idxRef.current

  useEffect(() => {
    const el = itemRef.current
    if (idx < 0 || !el) return
    registerItem(idx, el)
    return () => registerItem(idx, null)
  }, [idx, registerItem])

  const hasChildren = item.children && item.children.length > 0

  return (
    <button
      ref={itemRef}
      type="button"
      role="menuitem"
      tabIndex={-1}
      className={cn(
        'relative flex min-h-11 w-full cursor-default select-none items-center gap-3 rounded-md squircle-corners px-3 py-2.5 text-left text-sm outline-none transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
        'text-(--color-fg)',
      )}
      onClick={() => {
        if (hasChildren) {
          setActiveSubId(item.id)
          setState('sub')
        } else {
          if (item.href && onNavigate) {
            onNavigate(item.href, item)
          }
          item.onSelect?.()
          setState('closed')
        }
      }}
    >
      {item.icon && (
        <span className="relative z-10 shrink-0 [&_svg]:size-4" aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span className="relative z-10 flex min-w-0 flex-1 items-center truncate">{item.label}</span>
      {hasChildren && (
        <span className="relative z-10 shrink-0 text-(--color-muted)" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </span>
      )}
    </button>
  )
}

export function MorphNavPreview() {
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <MorphNav
        items={[
          { id: 'dash', label: 'Dashboard', href: '/dash' },
          {
            id: 'auto',
            label: 'Automations',
            children: [{ id: 'wf', label: 'Workflows', href: '/wf' }],
          },
          { id: 'settings', label: 'Settings', href: '/settings' },
        ]}
        placement="bottom-end"
      />
    </div>
  )
}
