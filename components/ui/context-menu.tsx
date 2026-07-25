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
} from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { useProximityHighlight, ProximityHighlight } from '@/lib/hooks/use-proximity-highlight'


export interface ContextMenuItem {
  label: string
  icon?: ReactNode
  shortcut?: string
  onSelect?: () => void
  destructive?: boolean
  disabled?: boolean
  separatorAfter?: boolean
}


interface ContextMenuContextValue {
  open: boolean
  setOpen: (next: boolean) => void
  items: ContextMenuItem[]
  onOpenChange?: (open: boolean) => void
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

function useContextMenuCtx(componentName: string) {
  const ctx = useContext(ContextMenuContext)
  if (!ctx) throw new Error(`${componentName} must be used within ContextMenu`)
  return ctx
}


export interface ContextMenuProps {
  children: ReactNode
  items: ContextMenuItem[]
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  menuClassName?: string
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, items, disabled = false, onOpenChange, className, menuClassName }, ref) => {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const longPressMovedRef = useRef(false)
    const previousFocusRef = useRef<HTMLElement | null>(null)

    const setOpenState = useCallback(
      (next: boolean) => {
        setOpen(next)
        onOpenChange?.(next)
      },
      [onOpenChange],
    )

    const handleContextMenu = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return
        e.preventDefault()
        previousFocusRef.current = document.activeElement as HTMLElement | null
        setPosition({ x: e.clientX, y: e.clientY })
        setOpenState(true)
      },
      [disabled, setOpenState],
    )

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled) return
        longPressMovedRef.current = false
        const touch = e.touches[0]
        longPressTimerRef.current = setTimeout(() => {
          if (!longPressMovedRef.current) {
            previousFocusRef.current = document.activeElement as HTMLElement | null
            setPosition({ x: touch.clientX, y: touch.clientY })
            setOpenState(true)
          }
        }, 500)
      },
      [disabled, setOpenState],
    )

    const handleTouchMove = useCallback(() => {
      longPressMovedRef.current = true
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }
    }, [])

    const handleTouchEnd = useCallback(() => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }
    }, [])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return
        if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
          e.preventDefault()
          previousFocusRef.current = document.activeElement as HTMLElement | null
          const rect = triggerRef.current?.getBoundingClientRect()
          if (rect) {
            setPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
          }
          setOpenState(true)
        }
      },
      [disabled, setOpenState],
    )

    useEffect(() => {
      if (!open) return
      const handlePointerDown = (e: PointerEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          setOpenState(false)
        }
      }
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          setOpenState(false)
          previousFocusRef.current?.focus()
        }
      }
      document.addEventListener('pointerdown', handlePointerDown)
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('pointerdown', handlePointerDown)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [open, setOpenState])

    useEffect(() => {
      return () => {
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current)
        }
      }
    }, [])

    const ctx = useMemo<ContextMenuContextValue>(
      () => ({ open, setOpen: setOpenState, items, onOpenChange }),
      [open, setOpenState, items, onOpenChange],
    )

    return (
      <ContextMenuContext.Provider value={ctx}>
        <div
          ref={(node) => {
            ;(triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          onContextMenu={handleContextMenu}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          className={cn('inline-block', className)}
        >
          {children}
        </div>
        {open && (
          <ContextMenuPanel ref={contentRef} position={position} className={menuClassName} />
        )}
      </ContextMenuContext.Provider>
    )
  },
)
ContextMenu.displayName = 'ContextMenu'


interface ContextMenuPanelProps {
  position: { x: number; y: number }
  className?: string
}

const ContextMenuPanel = forwardRef<HTMLDivElement, ContextMenuPanelProps>(
  ({ position, className }, ref) => {
    const { items, setOpen } = useContextMenuCtx('ContextMenuPanel')
    const panelRef = useRef<HTMLDivElement | null>(null)
    const reduceMotion = useReducedMotion()
    const menuId = useId()

    const { registerItem, handlers, highlightX, highlightSize, highlightOpacity, axis } =
      useProximityHighlight(panelRef, { axis: 'y' })

    const indexRef = useRef(0)
    const nextIndex = useCallback(() => {
      const idx = indexRef.current
      indexRef.current += 1
      return idx
    }, [])

    const [adjustedPos, setAdjustedPos] = useState(position)
    useEffect(() => {
      const panel = panelRef.current
      if (!panel) return
      const rect = panel.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const margin = 8

      let x = position.x
      let y = position.y

      if (x + rect.width > vw - margin) x = vw - rect.width - margin
      if (y + rect.height > vh - margin) y = vh - rect.height - margin
      if (x < margin) x = margin
      if (y < margin) y = margin

      setAdjustedPos({ x, y })
    }, [position])

    const transformOrigin = useMemo(() => {
      if (typeof window === 'undefined') return 'top left'
      const cx = position.x
      const cy = position.y
      const vw = window.innerWidth
      const vh = window.innerHeight
      const vCenterX = vw / 2
      const vCenterY = vh / 2

      const horizontal = cx < vCenterX ? 'left' : 'right'
      const vertical = cy < vCenterY ? 'top' : 'bottom'
      return `${vertical} ${horizontal}`
    }, [position])

    useEffect(() => {
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
          setOpen(false)
        } else if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey && e.key.trim()) {
          const query = e.key.toLowerCase()
          const match = Array.from(menuItems).findIndex((el) => {
            const text = (el.getAttribute('data-text-value') ?? el.textContent ?? '').toLowerCase()
            return text.startsWith(query)
          })
          if (match >= 0) {
            e.preventDefault()
            menuItems[match]?.focus()
          }
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [setOpen])

    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        ;(panelRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      },
      [ref],
    )

    const panelContent = (
      <motion.div
        ref={setRefs}
        id={menuId}
        role="menu"
        data-context-menu-content
        className={cn(
          'fixed z-300 min-w-48 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-lg squircle-corners border border-(--color-border) bg-(--color-bg) p-1.5 outline-none',
          'shadow-[0_14px_34px_-22px_rgba(0,0,0,0.15)]',
          className,
        )}
        style={{
          left: adjustedPos.x,
          top: adjustedPos.y,
          transformOrigin,
        }}
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
        {items.map((item, i) => {
          if (item.separatorAfter) {
            return (
              <div key={`item-${i}`}>
                <ContextMenuItemComponent
                  item={item}
                  nextIndex={nextIndex}
                  registerItem={registerItem}
                />
                <div
                  role="separator"
                  aria-hidden="true"
                  className="my-1 h-px bg-(--color-border)"
                />
              </div>
            )
          }
          return (
            <ContextMenuItemComponent
              key={`item-${i}`}
              item={item}
              nextIndex={nextIndex}
              registerItem={registerItem}
            />
          )
        })}
      </motion.div>
    )

    return createPortal(panelContent, document.body)
  },
)
ContextMenuPanel.displayName = 'ContextMenuPanel'


function ContextMenuItemComponent({
  item,
  nextIndex,
  registerItem,
}: {
  item: ContextMenuItem
  nextIndex: () => number
  registerItem: (index: number, el: HTMLElement | null) => void
}) {
  const { setOpen } = useContextMenuCtx('ContextMenuItem')
  const itemRef = useRef<HTMLButtonElement | null>(null)
  const [idx] = useState(() => nextIndex())

  useEffect(() => {
    const el = itemRef.current
    if (idx < 0 || !el) return
    registerItem(idx, el)
    return () => registerItem(idx, null)
  }, [idx, registerItem])

  return (
    <button
      ref={itemRef}
      type="button"
      role="menuitem"
      data-text-value={item.label}
      data-disabled={item.disabled ? '' : undefined}
      tabIndex={-1}
      disabled={item.disabled}
      className={cn(
        'relative flex min-h-11 w-full cursor-default select-none items-center gap-3 rounded-md squircle-corners px-3 py-2.5 text-left text-sm outline-none transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        item.destructive
          ? 'text-(--color-error) focus-visible:text-(--color-error)'
          : 'text-(--color-fg)',
      )}
      onClick={() => {
        if (!item.disabled) {
          item.onSelect?.()
          setOpen(false)
        }
      }}
    >
      {item.icon && (
        <span className="relative z-10 shrink-0 [&_svg]:size-4" aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span className="relative z-10 flex min-w-0 flex-1 items-center truncate">{item.label}</span>
      {item.shortcut && (
        <kbd
          className="relative z-10 shrink-0 rounded border border-(--color-border) bg-(--color-surface) px-1.5 py-0.5 text-[10px] font-medium text-(--color-subtle)"
          aria-hidden="true"
        >
          {item.shortcut}
        </kbd>
      )}
    </button>
  )
}


export function ContextMenuPreview() {
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <ContextMenu
        items={[
          { label: 'Copy', shortcut: '⌘C' },
          { label: 'Rename', separatorAfter: true },
          { label: 'Delete', destructive: true },
        ]}
      >
        <div className="flex h-32 w-48 items-center justify-center rounded-lg squircle-corners border border-(--color-border) bg-(--color-bg) text-sm text-(--color-muted)">
          Right-click me
        </div>
      </ContextMenu>
    </div>
  )
}