'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { durations } from '@/lib/motion-tokens'
import { WeightShiftText } from '@/components/ui/weight-shift-text'

interface IconBarContextValue {
  value: string | null
  setValue: (v: string | null) => void
  
  rovingIndex: number
  setRovingIndex: (i: number) => void
}

const IconBarContext = createContext<IconBarContextValue | null>(null)

function useIconBarCtx(componentName: string) {
  const ctx = useContext(IconBarContext)
  if (!ctx) throw new Error(`${componentName} must be used within IconBar`)
  return ctx
}

export interface IconBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  children: ReactNode
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (v: string | null) => void
  'aria-label'?: string
}

export const IconBar = forwardRef<HTMLDivElement, IconBarProps>(
  (
    {
      children,
      value: valueProp,
      defaultValue = null,
      onValueChange,
      'aria-label': ariaLabel = 'Toolbar',
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const value = isControlled ? valueProp : internalValue

    const setValue = useCallback(
      (v: string | null) => {
        if (!isControlled) setInternalValue(v)
        onValueChange?.(v)
      },
      [isControlled, onValueChange],
    )

    const [rovingIndex, setRovingIndex] = useState(0)
    const barRef = useRef<HTMLDivElement>(null)

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      const bar = barRef.current
      if (!bar) return
      const buttons = Array.from(
        bar.querySelectorAll<HTMLElement>('[role="toolbar"] > button:not([disabled])'),
      )
      if (!buttons.length) return

      const isRTL = bar.ownerDocument.defaultView?.getComputedStyle(bar).direction === 'rtl'
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

    const ctx = useMemo<IconBarContextValue>(
      () => ({ value, setValue, rovingIndex, setRovingIndex }),
      [value, setValue, rovingIndex],
    )

    return (
      <IconBarContext.Provider value={ctx}>
        <div
          ref={(node) => {
            ;(barRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="toolbar"
          aria-orientation="horizontal"
          aria-label={ariaLabel}
          className={cn('inline-flex items-center gap-1', className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </IconBarContext.Provider>
    )
  },
)
IconBar.displayName = 'IconBar'

export interface IconBarItemProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
  label: string
  icon: ReactNode
  disabled?: boolean
}

export const IconBarItem = forwardRef<HTMLButtonElement, IconBarItemProps>(
  ({ value: itemValue, label, icon, disabled, className, onClick, ...props }, ref) => {
    const { value, setValue, rovingIndex, setRovingIndex } = useIconBarCtx('IconBarItem')
    const reduceMotion = useReducedMotion()
    const isSelected = value === itemValue

    const measureRef = useRef<HTMLSpanElement>(null)
    const [labelWidth, setLabelWidth] = useState(0)
    const [hovered, setHovered] = useState(false)
    const itemIndexRef = useRef(-1)
    const [itemIdx, setItemIdx] = useState(-1)

    useEffect(() => {
      const bar = measureRef.current?.closest('[role="toolbar"]')
      if (!bar) return
      const buttons = Array.from(bar.querySelectorAll<HTMLElement>('[role="toolbar"] > button'))
      const idx = buttons.indexOf(measureRef.current?.closest('button') as HTMLElement)
      if (idx >= 0) {
        itemIndexRef.current = idx
        setItemIdx(idx)
      }
    }, [])

    useEffect(() => {
      const measure = () => {
        if (measureRef.current) {
          setLabelWidth(measureRef.current.offsetWidth)
        }
      }
      measure()
      if (document.fonts?.ready) {
        document.fonts.ready.then(measure)
      }
    }, [label])

    useEffect(() => {
      const el = measureRef.current
      if (!el) return
      const observer = new ResizeObserver(() => {
        setLabelWidth(el.offsetWidth)
      })
      observer.observe(el)
      return () => observer.disconnect()
    }, [])

    const bloomed = hovered || isSelected

    const expandDuration = reduceMotion ? '0ms' : durations.slow
    const collapseDuration = reduceMotion ? '0ms' : durations.base
    const isActive = bloomed && !disabled

    return (
      <>
        
        <span
          ref={measureRef}
          aria-hidden="true"
          className="absolute invisible whitespace-nowrap px-3 py-2 text-sm font-medium"
        >
          {label}
        </span>
        <button
          ref={ref}
          type="button"
          tabIndex={rovingIndex === itemIdx ? 0 : -1}
          aria-pressed={isSelected}
          aria-label={label}
          disabled={disabled}
          className={cn(
            'relative flex h-11 items-center gap-0 rounded-md squircle-corners outline-none transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
            'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
            isSelected
              ? 'bg-(--color-surface-2) text-(--color-fg)'
              : 'text-(--color-muted) hover:text-(--color-fg)',
            disabled && 'cursor-not-allowed opacity-50',
            className,
          )}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => !disabled && setHovered(true)}
          onBlur={() => setHovered(false)}
          onPointerDown={(e) => e.preventDefault()}
          onClick={(e) => {
            if (disabled) return
            onClick?.(e)
            setRovingIndex(itemIndexRef.current)
            setValue(isSelected ? null : itemValue)
          }}
          {...props}
        >
          
          <span
            className="relative z-10 flex size-9 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            {icon}
          </span>

          
          <span
            className="overflow-hidden"
            style={{
              width: isActive ? labelWidth : 0,
              transition: `width ${isActive ? expandDuration : collapseDuration} var(--motion-ease-out)`,
            }}
          >
            <span className="flex items-center pe-3">
              <WeightShiftText
                baseWeight={400}
                activeWeight={500}
                active={bloomed && !reduceMotion}
                duration="200ms"
              >
                {label}
              </WeightShiftText>
            </span>
          </span>

          
          {isSelected && (
            <span
              className="absolute top-1.5 end-1.5 size-1 rounded-full bg-(--color-accent)"
              aria-hidden="true"
            />
          )}
        </button>
      </>
    )
  },
)
IconBarItem.displayName = 'IconBarItem'

export function IconBarPreview() {
  const [value, setValue] = useState<string | null>('pen')
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <IconBar value={value} onValueChange={setValue} aria-label="Tools">
        <IconBarItem
          value="pen"
          label="Pen"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          }
        />
        <IconBarItem
          value="eraser"
          label="Eraser"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
              <path d="M22 21H7" />
              <path d="m5 11 9 9" />
            </svg>
          }
        />
        <IconBarItem
          value="fill"
          label="Fill"
          disabled
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
              <path d="m5 2 5 5" />
              <path d="M2 13h15" />
              <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.8 2-4 .3 1.2 2 2.4 2 4Z" />
            </svg>
          }
        />
      </IconBar>
    </div>
  )
}
