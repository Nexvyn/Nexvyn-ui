'use client'

import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'
import { springs } from '@/lib/motion-tokens'
import { useProximityHighlight, ProximityHighlight } from '@/lib/hooks/use-proximity-highlight'
const MAX_HEIGHT = 320
const SIDE_OFFSET = 8
const VIEWPORT_MARGIN = 12
const TYPEAHEAD_RESET_MS = 500
interface SelectContextValue {
  value: string
  setValue: (v: string) => void
  open: boolean
  setOpen: (next: boolean) => void
  disabled: boolean
  triggerId: string
  contentId: string
  labelMap: React.MutableRefObject<Map<string, string>>
  registerOption: (value: string, label: string) => void
  openInteractionRef: React.MutableRefObject<'keyboard' | 'pointer'>
}

const SelectContext = createContext<SelectContextValue | null>(null)

function useSelectCtx(componentName: string) {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error(`${componentName} must be used within <Select>`)
  return ctx
}
interface SelectContentContextValue {
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
  selectedIndex: number
}

const SelectContentContext = createContext<SelectContentContextValue | null>(null)

function useSelectContentCtx(componentName: string) {
  const ctx = useContext(SelectContentContext)
  if (!ctx) throw new Error(`${componentName} must be used within <SelectContent>`)
  return ctx
}
function normalizeTypeahead(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
export interface SelectProps {
  children: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  required?: boolean
  className?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      value: valueProp,
      defaultValue = '',
      onValueChange,
      disabled = false,
      name,
      required = false,
      className,
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const value = isControlled ? valueProp : internalValue

    const [open, setOpen] = useState(false)
    const openInteractionRef = useRef<'keyboard' | 'pointer'>('pointer')
    const labelMap = useRef(new Map<string, string>())
    const [options, setOptions] = useState<{ value: string; label: string }[]>([])
    const registerOption = useCallback((v: string, label: string) => {
      labelMap.current.set(v, label)
      setOptions((prev) => {
        const idx = prev.findIndex((o) => o.value === v)
        if (idx >= 0) {
          if (prev[idx].label === label) return prev
          const next = [...prev]
          next[idx] = { value: v, label }
          return next
        }
        return [...prev, { value: v, label }]
      })
    }, [])

    const reactId = useId()
    const triggerId = `${reactId}-trigger`
    const contentId = `${reactId}-content`

    const setValue = useCallback(
      (v: string) => {
        if (!isControlled) setInternalValue(v)
        onValueChange?.(v)
        setOpen(false)
        requestAnimationFrame(() => {
          document.getElementById(triggerId)?.focus()
        })
      },
      [isControlled, onValueChange, triggerId],
    )
    useEffect(() => {
      if (!open) return
      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as Node
        if ((target as HTMLElement).closest?.('[data-select-trigger]')) return
        if ((target as HTMLElement).closest?.('[data-select-content]')) return
        setOpen(false)
      }
      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [open])
    useEffect(() => {
      if (!open) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          setOpen(false)
          document.getElementById(triggerId)?.focus()
        }
      }
      document.addEventListener('keydown', handleKeyDown as EventListener)
      return () => document.removeEventListener('keydown', handleKeyDown as EventListener)
    }, [open, triggerId])

    const ctx = useMemo<SelectContextValue>(
      () => ({
        value,
        setValue,
        open,
        setOpen,
        disabled,
        triggerId,
        contentId,
        labelMap,
        registerOption,
        openInteractionRef,
      }),
      [value, setValue, open, disabled, triggerId, contentId, registerOption],
    )

    return (
      <SelectContext.Provider value={ctx}>
        <div className={cn('relative inline-block', className)}>
          {children}
          {/* Visually-hidden native <select> for form validation + react-hook-form */}
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
            name={name}
            required={required}
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            onFocus={(e) => e.preventDefault()}
          >
            <option value="">{/* placeholder */}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </SelectContext.Provider>
    )
  },
)
Select.displayName = 'Select'
export interface SelectTriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: ReactNode
  showChevron?: boolean
  disabled?: boolean
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, showChevron = true, className, disabled: disabledProp, onClick, ...props }, ref) => {
    const {
      open,
      setOpen,
      disabled: rootDisabled,
      triggerId,
      contentId,
      openInteractionRef,
    } = useSelectCtx('SelectTrigger')
    const reduceMotion = useReducedMotion()
    const disabled = disabledProp ?? rootDisabled

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        data-select-trigger
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? contentId : undefined}
        disabled={disabled}
        className={cn(
          'flex min-h-11 w-full items-center justify-between gap-2 border border-(--color-border) bg-(--color-surface) px-4 py-3 text-left text-sm font-medium text-(--color-fg) transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
          'rounded-lg supports-[corner-shape:squircle]:corner-squircle supports-[corner-shape:squircle]:rounded-[11px]',
          'hover:bg-(--color-surface-2)',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        onClick={(e) => {
          onClick?.(e)
          if (!disabled) {
            openInteractionRef.current = 'pointer'
            setOpen(!open)
          }
        }}
        onKeyDown={(e) => {
          if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
            e.preventDefault()
            if (!disabled) {
              openInteractionRef.current = 'keyboard'
              setOpen(true)
            }
          }
        }}
        {...props}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">{children}</span>
        {showChevron && (
          <motion.span
            className="shrink-0 text-(--color-muted)"
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduceMotion ? { duration: 0 } : springs.moderate}
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
          </motion.span>
        )}
      </button>
    )
  },
)
SelectTrigger.displayName = 'SelectTrigger'
export interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
  placeholder?: string
}

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder = 'Select…', className, ...props }, ref) => {
    const { value, labelMap } = useSelectCtx('SelectValue')
    const reduceMotion = useReducedMotion()
    const label = value ? (labelMap.current.get(value) ?? value) : undefined

    if (reduceMotion) {
      return (
        <span
          ref={ref}
          className={cn('min-w-0 truncate', !label && 'text-(--color-muted)', className)}
          {...props}
        >
          {label ?? placeholder}
        </span>
      )
    }

    return (
      <span
        ref={ref}
        className={cn('min-w-0 truncate', !label && 'text-(--color-muted)', className)}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                ...springs.fast,
                opacity: { duration: 0.12 },
              }}
              className="inline-block min-w-0 truncate"
            >
              {label}
            </motion.span>
          ) : (
            <motion.span
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
              className="inline-block min-w-0 truncate"
            >
              {placeholder}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    )
  },
)
SelectValue.displayName = 'SelectValue'
export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
  side?: 'bottom' | 'top'
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ align = 'start', side = 'bottom', children, className, ...props }, ref) => {
    const { open, setOpen, triggerId, contentId, value, openInteractionRef } =
      useSelectCtx('SelectContent')
    const panelRef = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState({ left: 0, top: 0, minWidth: 48 })
    const mounted = useMounted()
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
    const reduceMotion = useReducedMotion()
    const initialFocusIndex = useMemo(() => {
      const values: string[] = []
      collectSelectItemValues(children, values)
      const idx = values.indexOf(value)
      return idx >= 0 ? idx : 0
    }, [children, value])

    const [prevOpen, setPrevOpen] = useState(open)
    if (open !== prevOpen) {
      setPrevOpen(open)
      if (open) setFocusedIndex(initialFocusIndex)
    }

    const [focusRect, setFocusRect] = useState<{
      top: number
      left: number
      width: number
      height: number
    } | null>(null)
    const [showFocusRing, setShowFocusRing] = useState(false)

    useEffect(() => {
      if (open) setShowFocusRing(openInteractionRef.current === 'keyboard')
    }, [open, openInteractionRef])

    useEffect(() => {
      const items = open
        ? panelRef.current?.querySelectorAll<HTMLElement>('[role="option"]')
        : undefined
      const el = focusedIndex >= 0 ? items?.[focusedIndex] : undefined
      if (!el) {
        setFocusRect(null)
        return
      }
      setFocusRect({
        top: el.offsetTop,
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight,
      })
    }, [open, focusedIndex])

    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [selectedRect, setSelectedRect] = useState<{ top: number; height: number } | null>(null)

    useEffect(() => {
      if (!open) return
      const items = panelRef.current?.querySelectorAll<HTMLElement>('[role="option"]')
      if (!items?.length) return
      let found = -1
      items.forEach((el, i) => {
        if (el.getAttribute('data-value') === value) found = i
      })
      setSelectedIndex(found)
    }, [open, value])

    useEffect(() => {
      const items = open
        ? panelRef.current?.querySelectorAll<HTMLElement>('[role="option"]')
        : undefined
      const el = selectedIndex >= 0 ? items?.[selectedIndex] : undefined
      if (!el) {
        setSelectedRect(null)
        return
      }
      setSelectedRect({ top: el.offsetTop, height: el.offsetHeight })
    }, [open, selectedIndex])

    const indexedChildren = useMemo(() => {
      const counter = { current: 0 }
      return assignSelectItemIndices(children, counter)
    }, [children])
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
        left = clamp(left, VIEWPORT_MARGIN, vw - contentRect.width - VIEWPORT_MARGIN)

        let top: number
        const spaceBelow = vh - triggerRect.bottom - SIDE_OFFSET
        if (side === 'top' || (side === 'bottom' && spaceBelow < contentRect.height)) {
          top = triggerRect.top - contentRect.height - SIDE_OFFSET
        } else {
          top = triggerRect.bottom + SIDE_OFFSET
        }
        setPosition({ left, top, minWidth: triggerRect.width })
      }

      const frame = requestAnimationFrame(measure)
      window.addEventListener('resize', measure)
      window.addEventListener('scroll', measure, true)
      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('resize', measure)
        window.removeEventListener('scroll', measure, true)
      }
    }, [open, align, side, triggerId])
    useEffect(() => {
      if (!open) return
      let typeaheadQuery = ''
      let typeaheadTimeout: ReturnType<typeof setTimeout> | null = null

      const handleKeyDown = (e: globalThis.KeyboardEvent) => {
        if (!panelRef.current?.contains(document.activeElement)) return
        const items = panelRef.current.querySelectorAll<HTMLElement>(
          '[role="option"]:not([data-disabled])',
        )
        if (!items.length) return
        const count = items.length

        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setShowFocusRing(true)
          const next = (focusedIndex + 1) % count
          setFocusedIndex(next)
          items[next]?.focus()
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setShowFocusRing(true)
          const next = (focusedIndex - 1 + count) % count
          setFocusedIndex(next)
          items[next]?.focus()
        } else if (e.key === 'Home') {
          e.preventDefault()
          setShowFocusRing(true)
          setFocusedIndex(0)
          items[0]?.focus()
        } else if (e.key === 'End') {
          e.preventDefault()
          setShowFocusRing(true)
          setFocusedIndex(count - 1)
          items[count - 1]?.focus()
        } else if (e.key === 'Tab') {
          setOpen(false)
        } else if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey && e.key.trim()) {
          e.preventDefault()
          typeaheadQuery += e.key.toLowerCase()
          if (typeaheadTimeout) clearTimeout(typeaheadTimeout)
          typeaheadTimeout = setTimeout(() => {
            typeaheadQuery = ''
          }, TYPEAHEAD_RESET_MS)

          const normalizedQuery = normalizeTypeahead(typeaheadQuery)
          const match = Array.from(items).findIndex((el) => {
            const text = normalizeTypeahead(
              el.getAttribute('data-text-value') ?? el.textContent ?? '',
            )
            return text.startsWith(normalizedQuery)
          })
          if (match >= 0) {
            setShowFocusRing(true)
            setFocusedIndex(match)
            items[match]?.focus()
          }
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        if (typeaheadTimeout) clearTimeout(typeaheadTimeout)
      }
    }, [open, focusedIndex, setOpen])
    useEffect(() => {
      if (!open) return
      const frame = requestAnimationFrame(() => {
        const items = panelRef.current?.querySelectorAll<HTMLElement>(
          '[role="option"]:not([data-disabled])',
        )
        if (!items?.length) return
        const selectedIdx = Array.from(items).findIndex(
          (el) => el.getAttribute('data-value') === value,
        )
        const focusIdx = selectedIdx >= 0 ? selectedIdx : 0
        setFocusedIndex(focusIdx)
        items[focusIdx]?.focus()
      })
      return () => cancelAnimationFrame(frame)
    }, [open, value])

    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        ;(panelRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      },
      [ref],
    )

    const contentCtx = useMemo<SelectContentContextValue>(
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
        selectedIndex,
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
        selectedIndex,
      ],
    )

    if (!mounted) return null

    return createPortal(
      <SelectContentContext.Provider value={contentCtx}>
        {/* Hidden div for label registration when closed */}
        {!open && (
          <div hidden aria-hidden="true">
            {indexedChildren}
          </div>
        )}

        <AnimatePresence>
          {open && (
            <motion.div
              key="select-dropdown"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4, scaleY: 0.96 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scaleY: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scaleY: 0.96 }}
              transition={
                reduceMotion ? { duration: 0 } : { ...springs.fast, opacity: { duration: 0.12 } }
              }
              style={{
                position: 'fixed',
                left: position.left,
                top: position.top,
                zIndex: 30,
                transformOrigin: 'top center',
                minWidth: position.minWidth,
                maxWidth: 'calc(100vw - 1.5rem)',
                maxHeight: MAX_HEIGHT,
                overflowY: 'auto',
              }}
            >
              <div
                ref={setRefs}
                id={contentId}
                role="listbox"
                aria-labelledby={triggerId}
                data-select-content
                className={cn(
                  'relative min-w-48 overflow-hidden border border-(--color-border) bg-(--color-bg) p-1.5 outline-none',
                  'rounded-lg supports-[corner-shape:squircle]:corner-squircle supports-[corner-shape:squircle]:rounded-[11px]',
                  'shadow-xl',
                  className,
                )}
                tabIndex={-1}
                {...handlers}
                onMouseMove={(e) => {
                  setShowFocusRing(false)
                  handlers.onMouseMove(e)
                }}
                {...props}
              >
                {/* Selected highlight — accent tint */}
                <AnimatePresence>
                  {selectedRect && (
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-1.5 top-0 rounded-md supports-[corner-shape:squircle]:corner-squircle bg-(--color-accent)/15"
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1, y: selectedRect.top, height: selectedRect.height }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, transition: { duration: 0.08 } }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { ...springs.settle, opacity: { duration: 0.1 } }
                      }
                    />
                  )}
                </AnimatePresence>
                {/* Hover highlight — muted, springs via proximity */}
                <ProximityHighlight
                  highlightX={highlightX}
                  highlightSize={highlightSize}
                  highlightOpacity={highlightOpacity}
                  axis={axis}
                  className="mx-1.5 rounded-md supports-[corner-shape:squircle]:corner-squircle bg-(--color-surface-2)"
                />
                {/* Focus ring — keyboard-only, springs.fast */}
                <AnimatePresence>
                  {focusRect && showFocusRing && (
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none z-20 rounded-md supports-[corner-shape:squircle]:corner-squircle border-2 border-(--color-accent)"
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{
                        opacity: 1,
                        top: focusRect.top - 2,
                        left: focusRect.left - 2,
                        width: focusRect.width + 4,
                        height: focusRect.height + 4,
                      }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, transition: { duration: 0.06 } }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { ...springs.fast, opacity: { duration: 0.08 } }
                      }
                    />
                  )}
                </AnimatePresence>
                {indexedChildren}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SelectContentContext.Provider>,
      document.body,
    )
  },
)
SelectContent.displayName = 'SelectContent'
export interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  value: string
  disabled?: boolean
  textValue?: string
  index?: number
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  (
    {
      children,
      value: itemValue,
      disabled,
      textValue,
      index = 0,
      onClick: onClickProp,
      className,
      ...props
    },
    ref,
  ) => {
    const { value: selectedValue, setValue, registerOption } = useSelectCtx('SelectItem')
    const { setActiveIndex, focusedIndex, setFocusedIndex, registerItem } =
      useSelectContentCtx('SelectItem')
    const reduceMotion = useReducedMotion()

    const itemRef = useRef<HTMLDivElement | null>(null)
    const isSelected = selectedValue === itemValue
    useEffect(() => {
      const label = typeof children === 'string' ? children : itemValue
      registerOption(itemValue, label)
    }, [itemValue, children, registerOption])
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

    const resolvedTextValue = textValue ?? (typeof children === 'string' ? children : '')

    return (
      <div
        ref={setItemRef}
        role="option"
        aria-selected={isSelected}
        data-value={itemValue}
        data-proximity-index={index}
        data-disabled={disabled ? '' : undefined}
        aria-disabled={disabled || undefined}
        data-text-value={resolvedTextValue}
        tabIndex={focusedIndex === index ? 0 : -1}
        className={cn(
          'relative flex min-h-11 w-full cursor-default select-none scroll-m-1 items-center justify-between gap-3 px-3 py-2.5 text-left text-sm outline-none transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
          'rounded-md supports-[corner-shape:squircle]:corner-squircle supports-[corner-shape:squircle]:rounded-[9px]',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          isSelected ? 'text-(--color-fg)' : 'text-(--color-muted)',
          className,
        )}
        onPointerDown={(e) => {
          e.preventDefault()
        }}
        onFocus={() => {
          setFocusedIndex(index)
          setActiveIndex(index)
        }}
        onClick={(e) => {
          onClickProp?.(e)
          if (!disabled) setValue(itemValue)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (!disabled) setValue(itemValue)
          }
        }}
        {...props}
      >
        <span className="relative z-10 flex min-w-0 flex-1 items-center gap-2 truncate">
          {children}
        </span>
        {/* Drawn check */}
        <AnimatePresence>
          {isSelected && (
            <motion.svg
              key="check"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 shrink-0 text-(--color-fg)"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            >
              <motion.path
                d="M4 12L9 17L20 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={reduceMotion ? { duration: 0 } : springs.fast}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
SelectItem.displayName = 'SelectItem'
export interface SelectGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  labelClassName?: string
}

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
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
SelectGroup.displayName = 'SelectGroup'
function assignSelectItemIndices(nodes: ReactNode, counter: { current: number }): ReactNode {
  return Children.map(nodes, (child) => {
    if (!isValidElement(child)) return child
    if (child.type === SelectItem) {
      return cloneElement(child as ReactElement<SelectItemProps>, {
        index: counter.current++,
      })
    }
    if (child.type === SelectGroup) {
      const groupProps = child.props as SelectGroupProps
      return cloneElement(child as ReactElement<SelectGroupProps>, {
        children: assignSelectItemIndices(groupProps.children, counter),
      })
    }
    return child
  })
}
function collectSelectItemValues(nodes: ReactNode, values: string[]): void {
  Children.forEach(nodes, (child) => {
    if (!isValidElement(child)) return
    if (child.type === SelectItem) {
      values.push((child.props as SelectItemProps).value)
      return
    }
    if (child.type === SelectGroup) {
      collectSelectItemValues((child.props as SelectGroupProps).children, values)
    }
  })
}
export type SelectLabelProps = HTMLAttributes<HTMLDivElement>

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
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
SelectLabel.displayName = 'SelectLabel'
export type SelectSeparatorProps = HTMLAttributes<HTMLDivElement>

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
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
SelectSeparator.displayName = 'SelectSeparator'
export function SelectPreview() {
  const [value, setValue] = useState('')
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="w-56">
        <Select value={value} onValueChange={setValue} name="size">
          <SelectTrigger>
            <SelectValue placeholder="Choose size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
