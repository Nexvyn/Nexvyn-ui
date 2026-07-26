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
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { useProximityHighlight, ProximityHighlight } from '@/lib/hooks/use-proximity-highlight'
import { matchesSearch, buildSearchableText } from '@/lib/search-match'

export interface ComboboxOption {
  value: string
  label: string
  description?: string
}

interface ComboboxContextValue {
  value: string
  setValue: (v: string) => void
  open: boolean
  setOpen: (next: boolean) => void
  query: string
  setQuery: (q: string) => void
  disabled: boolean
  triggerId: string
  contentId: string
  nextIndex: () => number
  labelMap: React.MutableRefObject<Map<string, string>>
  registerOption: (value: string, label: string) => void
  options: ComboboxOption[]
  placeholder: string
  emptyMessage: string
  clearable: boolean
  openOnFocus: boolean
  setValueRef: React.MutableRefObject<(v: string) => void>
  activeDescendantId: string | null
  setActiveDescendantId: (id: string | null) => void
  suppressNextFocusOpenRef: React.MutableRefObject<boolean>
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null)

function useComboboxCtx(componentName: string) {
  const ctx = useContext(ComboboxContext)
  if (!ctx) throw new Error(`${componentName} must be used within Combobox`)
  return ctx
}

interface ComboboxContentContextValue {
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
  highlightX: ReturnType<typeof import('motion/react').useSpring>
  highlightSize: MotionValue<number>
  highlightOpacity: ReturnType<typeof import('motion/react').useSpring>
  axis: 'x' | 'y'
  registerItem: (index: number, el: HTMLElement | null) => void
  filteredOptions: ComboboxOption[]
  setValueRef: React.MutableRefObject<(v: string) => void>
}

const ComboboxContentContext = createContext<ComboboxContentContextValue | null>(null)

function useComboboxContentCtx(componentName: string) {
  const ctx = useContext(ComboboxContentContext)
  if (!ctx) throw new Error(`${componentName} must be used within ComboboxContent`)
  return ctx
}

export interface ComboboxProps {
  children: ReactNode
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  disabled?: boolean
  clearable?: boolean
  openOnFocus?: boolean
  name?: string
  required?: boolean
  filter?: (option: ComboboxOption, query: string) => boolean
  className?: string
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      children,
      options,
      value: valueProp,
      defaultValue = '',
      onValueChange,
      placeholder = 'Search…',
      emptyMessage = 'No results.',
      disabled = false,
      clearable = true,
      openOnFocus = false,
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
    const [query, setQuery] = useState('')
    const [activeDescendantId, setActiveDescendantId] = useState<string | null>(null)
    const labelMap = useRef(new Map<string, string>())
    const selectRef = useRef<HTMLSelectElement>(null)
    const suppressNextFocusOpenRef = useRef(false)

    const reactId = useId()
    const triggerId = `${reactId}-trigger`
    const contentId = `${reactId}-content`

    const [registeredOptions, setRegisteredOptions] = useState<{ value: string; label: string }[]>(
      [],
    )
    const registerOption = useCallback((v: string, label: string) => {
      labelMap.current.set(v, label)
      setRegisteredOptions((prev) => {
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

    const setValue = useCallback(
      (v: string) => {
        if (!isControlled) setInternalValue(v)
        onValueChange?.(v)
        setQuery('')
        setOpen(false)
        suppressNextFocusOpenRef.current = true
        document.getElementById(triggerId)?.focus()
      },
      [isControlled, onValueChange, triggerId],
    )

    const setValueRef = useRef(setValue)
    useEffect(() => {
      setValueRef.current = setValue
    })

    useEffect(() => {
      options.forEach((opt) => registerOption(opt.value, opt.label))
    }, [options, registerOption])

    useEffect(() => {
      if (!open) return
      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as Node
        if ((target as HTMLElement).closest?.('[data-combobox-trigger]')) return
        if ((target as HTMLElement).closest?.('[data-combobox-content]')) return
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
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, triggerId])

    const ctx = useMemo<ComboboxContextValue>(
      () => ({
        value,
        setValue,
        open,
        setOpen,
        query,
        setQuery,
        disabled,
        triggerId,
        contentId,
        nextIndex: () => 0,
        labelMap,
        registerOption,
        options,
        placeholder,
        emptyMessage,
        clearable,
        openOnFocus,
        setValueRef,
        activeDescendantId,
        setActiveDescendantId,
        suppressNextFocusOpenRef,
      }),
      [
        value,
        setValue,
        open,
        query,
        disabled,
        triggerId,
        contentId,
        registerOption,
        options,
        placeholder,
        emptyMessage,
        clearable,
        openOnFocus,
        activeDescendantId,
      ],
    )

    const indexRef = useRef(0)
    const nextIndex = useCallback(() => {
      const idx = indexRef.current
      indexRef.current += 1
      return idx
    }, [])
    useEffect(() => {
      if (!open) indexRef.current = 0
    }, [open])

    const fullCtx = useMemo<ComboboxContextValue>(() => ({ ...ctx, nextIndex }), [ctx, nextIndex])

    return (
      <ComboboxContext.Provider value={fullCtx}>
        <div ref={ref} className={cn('relative inline-block', className)}>
          {children}
          <select
            ref={selectRef}
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
            <option value=""></option>
            {registeredOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </ComboboxContext.Provider>
    )
  },
)
Combobox.displayName = 'Combobox'

export interface ComboboxInputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'children'> {
  placeholder?: string
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  ({ placeholder: placeholderProp, className, onFocus, ...props }, ref) => {
    const {
      value,
      setValue,
      open,
      setOpen,
      query,
      setQuery,
      disabled,
      triggerId,
      contentId,
      labelMap,
      placeholder: ctxPlaceholder,
      clearable,
      activeDescendantId,
      suppressNextFocusOpenRef,
    } = useComboboxCtx('ComboboxInput')
    const placeholder = placeholderProp ?? ctxPlaceholder
    const displayLabel = value ? (labelMap.current.get(value) ?? value) : undefined

    const inputRef = useRef<HTMLInputElement>(null)

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
      },
      [ref],
    )

    return (
      <div className="relative flex min-h-11 w-full items-center">
        <input
          ref={setRefs}
          id={triggerId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? contentId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={open ? (activeDescendantId ?? undefined) : undefined}
          disabled={disabled}
          data-combobox-trigger
          value={query || (open ? '' : (displayLabel ?? ''))}
          placeholder={open ? placeholder : displayLabel ? '' : placeholder}
          className={cn(
            'h-11 w-full rounded-lg squircle-corners border border-(--color-border) bg-(--color-surface) pe-10 ps-4 py-2.5 text-sm text-(--color-fg) outline-none transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
            'placeholder:text-(--color-muted)',
            'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          onFocus={(e) => {
            onFocus?.(e)
            if (suppressNextFocusOpenRef.current) {
              suppressNextFocusOpenRef.current = false
              return
            }
            setOpen(true)
          }}
          onChange={(e) => {
            setQuery(e.target.value)
            if (!open) setOpen(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            aria-label="Clear selection"
            className="absolute inset-e-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-(--color-muted) transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none hover:text-(--color-fg)"
            onClick={() => {
              setValue('')
              setQuery('')
              inputRef.current?.focus()
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
        <span
          className="absolute inset-e-10 top-1/2 -translate-y-1/2 text-(--color-muted)"
          aria-hidden="true"
          style={{
            display: 'none',
          }}
        />
      </div>
    )
  },
)
ComboboxInput.displayName = 'ComboboxInput'

export interface ComboboxContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
  side?: 'bottom' | 'top'
  sideOffset?: number
}

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ align = 'start', side = 'bottom', sideOffset = 8, className, ...props }, ref) => {
    const {
      open,
      setOpen,
      triggerId,
      contentId,
      query,
      options: allOptions,
      setValueRef,
      setActiveDescendantId,
    } = useComboboxCtx('ComboboxContent')
    const panelRef = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState({ left: 0, top: 0 })

    const filteredOptions = useMemo(() => {
      if (!query) return allOptions
      return allOptions.filter((opt) =>
        matchesSearch(buildSearchableText(opt.label, opt.description), query),
      )
    }, [allOptions, query])

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

    const setActiveIndexWithDescendant = useCallback(
      (index: number | null) => {
        setActiveIndex(index)
        const option = index !== null ? filteredOptions[index] : undefined
        setActiveDescendantId(option ? `combobox-option-${option.value}` : null)
      },
      [setActiveIndex, setActiveDescendantId, filteredOptions],
    )

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
      }

      const frame = requestAnimationFrame(measure)
      window.addEventListener('resize', measure)
      window.addEventListener('scroll', measure, true)
      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('resize', measure)
        window.removeEventListener('scroll', measure, true)
      }
    }, [open, align, side, sideOffset, triggerId])

    useEffect(() => {
      if (!open) return
      const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement
        if (!target?.getAttribute('data-combobox-trigger')) return

        const count = filteredOptions.length
        if (!count) return

        if (e.key === 'ArrowDown') {
          e.preventDefault()
          const next = activeIndex === null ? 0 : (activeIndex + 1) % count
          setActiveIndexWithDescendant(next)
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          const next = activeIndex === null ? count - 1 : (activeIndex - 1 + count) % count
          setActiveIndexWithDescendant(next)
        } else if (e.key === 'Home') {
          e.preventDefault()
          setActiveIndexWithDescendant(0)
        } else if (e.key === 'End') {
          e.preventDefault()
          setActiveIndexWithDescendant(count - 1)
        } else if (e.key === 'Enter') {
          e.preventDefault()
          if (activeIndex !== null && filteredOptions[activeIndex]) {
            setValueRef.current(filteredOptions[activeIndex].value)
          }
        } else if (e.key === 'Tab') {
          setOpen(false)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [
      open,
      activeIndex,
      filteredOptions,
      setActiveIndexWithDescendant,
      triggerId,
      setOpen,
      setValueRef,
    ])

    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        ;(panelRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      },
      [ref],
    )

    const contentCtx = useMemo<ComboboxContentContextValue>(
      () => ({
        activeIndex,
        setActiveIndex: setActiveIndexWithDescendant,
        highlightX,
        highlightSize,
        highlightOpacity,
        axis,
        registerItem,
        filteredOptions,
        setValueRef,
      }),
      [
        activeIndex,
        setActiveIndexWithDescendant,
        highlightX,
        highlightSize,
        highlightOpacity,
        axis,
        registerItem,
        filteredOptions,
        setValueRef,
      ],
    )

    if (!open) return null

    const content = (
      <ComboboxContentContext.Provider value={contentCtx}>
        <div
          ref={setRefs}
          id={contentId}
          role="listbox"
          aria-labelledby={triggerId}
          data-combobox-content
          className={cn(
            'relative z-30 min-w-48 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-lg squircle-corners border border-(--color-border) bg-(--color-bg) p-1.5 outline-none',
            'shadow-[0_14px_34px_-22px_rgba(0,0,0,0.15)]',
            className,
          )}
          style={{
            position: 'fixed',
            left: position.left,
            top: position.top,
            maxHeight: 320,
            overflowY: 'auto',
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
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => (
              <ComboboxOptionItem key={opt.value} option={opt} index={i} />
            ))
          ) : (
            <div role="status" className="px-3 py-2.5 text-sm text-(--color-muted)">
              {query ? 'No results.' : 'No options.'}
            </div>
          )}
        </div>
      </ComboboxContentContext.Provider>
    )

    return createPortal(content, document.body)
  },
)
ComboboxContent.displayName = 'ComboboxContent'

function ComboboxOptionItem({ option, index }: { option: ComboboxOption; index: number }) {
  const { setValue } = useComboboxCtx('ComboboxOptionItem')
  const { activeIndex, setActiveIndex, registerItem } = useComboboxContentCtx('ComboboxOptionItem')
  const itemRef = useRef<HTMLDivElement | null>(null)
  const isActive = activeIndex === index

  useEffect(() => {
    const el = itemRef.current
    if (index < 0 || !el) return
    registerItem(index, el)
    return () => registerItem(index, null)
  }, [index, registerItem])

  return (
    <div
      ref={itemRef}
      role="option"
      id={`combobox-option-${option.value}`}
      aria-selected={isActive}
      data-value={option.value}
      data-proximity-index={index}
      className={cn(
        'relative flex min-h-11 w-full cursor-default select-none scroll-m-1 items-center gap-3 rounded-md squircle-corners px-3 py-2.5 text-left text-sm outline-none transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
        isActive ? 'text-(--color-fg)' : 'text-(--color-muted)',
      )}
      onMouseEnter={() => setActiveIndex(index)}
      onClick={() => setValue(option.value)}
    >
      <span className="relative z-10 flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate">{option.label}</span>
        {option.description && (
          <span className="text-xs text-(--color-subtle) truncate">{option.description}</span>
        )}
      </span>
    </div>
  )
}

export function ComboboxPreview() {
  const [value, setValue] = useState('')
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="w-64">
        <Combobox
          value={value}
          onValueChange={setValue}
          options={[
            { value: 'ist', label: 'Istanbul', description: 'Türkiye' },
            { value: 'ber', label: 'Berlin' },
            { value: 'par', label: 'Paris', description: 'France' },
            { value: 'tok', label: 'Tokyo', description: 'Japan' },
          ]}
          placeholder="Search city…"
          name="city"
        >
          <ComboboxInput />
          <ComboboxContent />
        </Combobox>
      </div>
    </div>
  )
}
