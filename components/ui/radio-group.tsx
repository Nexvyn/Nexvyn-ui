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

interface RadioGroupContextValue {
  value: string | undefined
  setValue: (v: string) => void
  name?: string
  groupId: string
  disabled: boolean
  required: boolean
  orientation: 'vertical' | 'horizontal'
  focusedValue: string | null
  setFocusedValue: (v: string | null) => void
  itemValues: string[]
  registerItem: (v: string) => void
  unregisterItem: (v: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroupCtx(componentName: string) {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) throw new Error(`${componentName} must be used within RadioGroup`)
  return ctx
}

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  disabled?: boolean
  required?: boolean
  orientation?: 'vertical' | 'horizontal'
  children?: ReactNode
  className?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      name,
      disabled = false,
      required = false,
      orientation = 'vertical',
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = useState(defaultValue)
    const value = isControlled ? valueProp : internal
    const groupId = useId()
    const containerRef = useRef<HTMLDivElement>(null)

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

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const count = itemValues.length
        if (count === 0) return

        const currentIdx = focusedValue ? itemValues.indexOf(focusedValue) : -1
        let nextIdx = currentIdx

        const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl'

        const forward =
          orientation === 'vertical' ? ['ArrowDown'] : isRTL ? ['ArrowLeft'] : ['ArrowRight']
        const backward =
          orientation === 'vertical' ? ['ArrowUp'] : isRTL ? ['ArrowRight'] : ['ArrowLeft']

        if (forward.includes(e.key)) {
          e.preventDefault()
          nextIdx = currentIdx < 0 ? 0 : (currentIdx + 1) % count
        } else if (backward.includes(e.key)) {
          e.preventDefault()
          nextIdx = currentIdx < 0 ? count - 1 : (currentIdx - 1 + count) % count
        } else if (e.key === 'Home') {
          e.preventDefault()
          nextIdx = 0
        } else if (e.key === 'End') {
          e.preventDefault()
          nextIdx = count - 1
        } else {
          return
        }

        if (nextIdx !== currentIdx && nextIdx >= 0) {
          const nextValue = itemValues[nextIdx]
          if (nextValue) {
            setFocusedValue(nextValue)
            setValue(nextValue)
            const button = containerRef.current?.querySelector<HTMLElement>(
              `[data-radio-value="${nextValue}"]`,
            )
            button?.focus()
          }
        }
      },
      [itemValues, focusedValue, setValue, orientation],
    )

    const ctx = useMemo<RadioGroupContextValue>(
      () => ({
        value,
        setValue,
        name,
        groupId,
        disabled,
        required,
        orientation,
        focusedValue,
        setFocusedValue,
        itemValues,
        registerItem,
        unregisterItem,
      }),
      [
        value,
        setValue,
        name,
        groupId,
        disabled,
        required,
        orientation,
        focusedValue,
        itemValues,
        registerItem,
        unregisterItem,
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
          aria-orientation={orientation}
          aria-required={required || undefined}
          aria-disabled={disabled || undefined}
          onKeyDown={handleKeyDown}
          className={cn(
            orientation === 'vertical' ? 'flex flex-col gap-2' : 'flex flex-row gap-4',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  },
)
RadioGroup.displayName = 'RadioGroup'

export interface RadioGroupItemProps {
  value: string
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export const RadioGroupItem = forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ value: itemValue, disabled: itemDisabled, className, children, ...props }, ref) => {
    const {
      value,
      setValue,
      name,
      groupId,
      disabled: groupDisabled,
      required,
      focusedValue,
      setFocusedValue,
      itemValues,
      registerItem,
      unregisterItem,
    } = useRadioGroupCtx('RadioGroupItem')

    const reduceMotion = useReducedMotion()
    const isDisabled = groupDisabled || itemDisabled
    const isSelected = value === itemValue
    const id = `${groupId}-${itemValue}`

    useEffect(() => {
      if (isDisabled) return
      registerItem(itemValue)
      return () => unregisterItem(itemValue)
    }, [itemValue, isDisabled, registerItem, unregisterItem])

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
          disabled={isDisabled}
          required={required}
          readOnly
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
        <button
          type="button"
          role="radio"
          aria-checked={isSelected}
          aria-labelledby={`${id}-label`}
          data-radio-value={itemValue}
          disabled={isDisabled}
          tabIndex={isTabbable ? 0 : -1}
          onClick={() => {
            if (!isDisabled) {
              playClickSound()
              setValue(itemValue)
              setFocusedValue(itemValue)
            }
          }}
          onFocus={() => setFocusedValue(itemValue)}
          onMouseEnter={() => {
            if (!isDisabled) playHoverSound()
          }}
          onPointerDown={(e) => e.preventDefault()}
          className={cn(
            'relative flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-(--color-border) p-0',
            'transition-[border-color,transform] duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none',
            'active:scale-[0.97] motion-reduce:active:scale-100 motion-reduce:transform-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isSelected && 'border-(--color-fg)',
          )}
        >
          {isSelected && (
            <motion.div
              layoutId={reduceMotion ? undefined : `${groupId}-dot`}
              className="size-2.5 rounded-full bg-(--color-fg)"
              transition={reduceMotion ? { duration: 0 } : springs.moderate}
            />
          )}
        </button>
        {children && (
          <label
            id={`${id}-label`}
            htmlFor={id}
            className={cn(
              'min-h-11 flex items-center text-sm text-(--color-fg) select-none',
              isDisabled && 'cursor-not-allowed opacity-50',
            )}
            onClick={() => {
              if (!isDisabled) {
                playClickSound()
                setValue(itemValue)
                setFocusedValue(itemValue)
              }
            }}
          >
            {children}
          </label>
        )}
      </div>
    )
  },
)
RadioGroupItem.displayName = 'RadioGroupItem'

/** @deprecated Use `RadioGroupItem` instead */
export const RadioItem = RadioGroupItem
/** @deprecated Use `RadioGroupItemProps` instead */
export type RadioItemProps = RadioGroupItemProps

export function RadioGroupPreview() {
  const [value, setValue] = useState('medium')
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <RadioGroup value={value} onValueChange={setValue} name="size">
        <RadioGroupItem value="small">Small</RadioGroupItem>
        <RadioGroupItem value="medium">Medium</RadioGroupItem>
        <RadioGroupItem value="large">Large</RadioGroupItem>
      </RadioGroup>
    </div>
  )
}
