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
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { playHoverSound, playClickSound } from '@/lib/sound'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface RadioGroupContextValue {
  value: string | undefined
  setValue: (v: string) => void
  name?: string
  groupId: string
  focusedValue: string | null
  setFocusedValue: (v: string) => void
  itemValues: string[]
  registerItem: (v: string) => void
  unregisterItem: (v: string) => void
  required?: boolean
  ariaInvalid?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroupCtx(componentName: string) {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) throw new Error(`${componentName} must be used within RadioGroup`)
  return ctx
}

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  children?: ReactNode
  className?: string
  required?: boolean
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      name,
      children,
      className,
      required,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = useState(defaultValue)
    const value = isControlled ? valueProp : internal
    const groupId = useId()
    const containerRef = useRef<HTMLDivElement>(null)

    // Track registered item values in DOM order for roving tabindex
    const [itemValues, setItemValues] = useState<string[]>([])
    const [focusedValue, setFocusedValue] = useState<string | null>(null)

    const registerItem = useCallback((v: string) => {
      setItemValues((prev) => (prev.includes(v) ? prev : [...prev, v]))
    }, [])

    const unregisterItem = useCallback((v: string) => {
      setItemValues((prev) => prev.filter((x) => x !== v))
    }, [])

    const setValue = useCallback(
      (v: string) => {
        if (!isControlled) setInternal(v)
        onValueChange?.(v)
        setFocusedValue(v)
      },
      [isControlled, onValueChange],
    )

    // Arrow key navigation (WAI-ARIA radio group pattern)
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const count = itemValues.length
        if (count === 0) return

        const currentIdx = focusedValue ? itemValues.indexOf(focusedValue) : -1

        let nextIdx = currentIdx

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault()
          nextIdx = currentIdx < 0 ? 0 : (currentIdx + 1) % count
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault()
          nextIdx = currentIdx < 0 ? count - 1 : (currentIdx - 1 + count) % count
        } else if (e.key === 'Home') {
          e.preventDefault()
          nextIdx = 0
        } else if (e.key === 'End') {
          e.preventDefault()
          nextIdx = count - 1
        }

        if (nextIdx !== currentIdx && nextIdx >= 0) {
          const nextValue = itemValues[nextIdx]
          if (nextValue) {
            setFocusedValue(nextValue)
            setValue(nextValue)
            // Focus the button for this value directly — indexing into a
            // `[role="radio"]` querySelectorAll would desync from
            // itemValues (which excludes disabled items) whenever a
            // disabled item sits between enabled ones.
            const button = containerRef.current?.querySelector<HTMLElement>(
              `[data-radio-value="${nextValue}"]`,
            )
            button?.focus()
          }
        }
      },
      [itemValues, focusedValue, setValue],
    )

    const ctx = useMemo<RadioGroupContextValue>(
      () => ({
        value,
        setValue,
        name,
        groupId,
        focusedValue,
        setFocusedValue,
        itemValues,
        registerItem,
        unregisterItem,
        required,
        ariaInvalid,
      }),
      [
        value,
        setValue,
        name,
        groupId,
        focusedValue,
        itemValues,
        registerItem,
        unregisterItem,
        required,
        ariaInvalid,
      ],
    )

    return (
      <RadioGroupContext.Provider value={ctx}>
        <div
          ref={(node) => {
            ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="radiogroup"
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedby}
          onKeyDown={handleKeyDown}
          className={cn('flex flex-col gap-2', className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  },
)
RadioGroup.displayName = 'RadioGroup'

// ---------------------------------------------------------------------------
// RadioItem — traveling dot (the signature)
// ---------------------------------------------------------------------------

export interface RadioItemProps {
  value: string
  label?: string
  disabled?: boolean
  className?: string
}

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  ({ value: itemValue, label, disabled, className, ...props }, ref) => {
    const {
      value,
      setValue,
      name,
      groupId,
      focusedValue,
      setFocusedValue,
      itemValues,
      registerItem,
      unregisterItem,
      required,
      ariaInvalid,
    } = useRadioGroupCtx('RadioItem')
    const reduceMotion = useReducedMotion()
    const isSelected = value === itemValue
    const id = `${groupId}-${itemValue}`

    // Register/unregister with parent for roving tabindex
    useEffect(() => {
      if (disabled) return
      registerItem(itemValue)
      return () => unregisterItem(itemValue)
    }, [itemValue, disabled, registerItem, unregisterItem])

    // Roving tabindex: exactly one item is tabbable at a time — the
    // currently keyboard-focused item once the user has interacted, else
    // the selected item, else the first registered (enabled) item. Using a
    // blanket "nothing focused yet" check here would give every enabled
    // item tabIndex 0 simultaneously, breaking Tab navigation into/out of
    // the group.
    const isTabbable =
      focusedValue !== null ? focusedValue === itemValue : itemValue === (value ?? itemValues[0])

    return (
      <div ref={ref} className={cn('flex items-center gap-3 min-h-11', className)} {...props}>
        <input
          id={id}
          type="radio"
          name={name}
          value={itemValue}
          checked={isSelected}
          disabled={disabled}
          required={required}
          readOnly
          className="sr-only"
          tabIndex={-1}
        />
        <button
          type="button"
          role="radio"
          aria-checked={isSelected}
          aria-label={label}
          data-radio-value={itemValue}
          disabled={disabled}
          tabIndex={isTabbable ? 0 : -1}
          onClick={() => {
            if (!disabled) {
              playClickSound()
              setValue(itemValue)
              setFocusedValue(itemValue)
            }
          }}
          onFocus={() => setFocusedValue(itemValue)}
          onMouseEnter={() => {
            if (!disabled) playHoverSound()
          }}
          className={cn(
            'relative flex size-5 shrink-0 items-center justify-center rounded-full border p-0 transition-[color,background-color,border-color,transform]',
            'active:scale-[0.97] motion-reduce:active:scale-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isSelected ? 'border-(--color-fg)' : 'border-(--color-border)',
            ariaInvalid && 'border-(--color-error)',
          )}
          onPointerDown={(e) => e.preventDefault()}
        >
          {/* Traveling dot — the signature. Uses layoutId so motion/react
              animates a single element between positions. */}
          {isSelected && (
            <motion.span
              layoutId={`${groupId}-dot`}
              className="rounded-full bg-(--color-fg)"
              style={{ width: 8, height: 8 }}
              transition={reduceMotion ? { duration: 0 } : springs.moderate}
            />
          )}
        </button>
        {label && (
          <label
            htmlFor={id}
            className="min-h-11 flex items-center text-sm text-(--color-fg) select-none"
            onClick={() => {
              if (!disabled) {
                playClickSound()
                setValue(itemValue)
                setFocusedValue(itemValue)
              }
            }}
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)
RadioItem.displayName = 'RadioItem'

// ---------------------------------------------------------------------------
// Preview
// ---------------------------------------------------------------------------

export function RadioGroupPreview() {
  const [value, setValue] = useState('medium')
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <RadioGroup value={value} onValueChange={setValue} name="size">
        <RadioItem value="small" label="Small" />
        <RadioItem value="medium" label="Medium" />
        <RadioItem value="large" label="Large" />
      </RadioGroup>
    </div>
  )
}
