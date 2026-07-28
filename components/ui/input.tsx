'use client'

import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'

const inputVariants = cva(
  [
    'relative flex items-center gap-2 rounded-lg squircle-corners border bg-transparent px-3.5',
    'border-(--color-border)',
    'transition-[border-color] duration-(--motion-dur-fast) ease-(--motion-ease-out)',
    'motion-reduce:transition-none',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-9 text-xs',
        md: 'h-11 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type InputVariantProps = VariantProps<typeof inputVariants>

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, InputVariantProps {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  label?: string
  error?: string
  containerClassName?: string
  /** Shows an accessible clear action when the input contains a value. */
  clearable?: boolean
  clearLabel?: string
  onClear?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      startAdornment,
      endAdornment,
      label,
      error,
      containerClassName,
      className,
      id: idProp,
      disabled,
      readOnly,
      required,
      clearable = false,
      clearLabel = 'Clear input',
      onClear,
      value,
      defaultValue,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef,
  ) => {
    const reactId = useId()
    const id = idProp ?? reactId
    const errorId = error ? `${id}-error` : undefined
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined
    const reduceMotion = useReducedMotion()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [focused, setFocused] = useState(false)
    const [uncontrolledHasValue, setUncontrolledHasValue] = useState(
      () => defaultValue !== undefined && defaultValue !== null && String(defaultValue).length > 0,
    )

    const isControlled = value !== undefined
    const hasValue = isControlled
      ? value !== null && String(value).length > 0
      : uncontrolledHasValue
    const isInvalid = ariaInvalid === true || ariaInvalid === 'true' || !!error
    const canClear = clearable && hasValue && !disabled && !readOnly

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof forwardedRef === 'function') {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      },
      [forwardedRef],
    )

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setUncontrolledHasValue(event.currentTarget.value.length > 0)
        onChange?.(event)
      },
      [isControlled, onChange],
    )

    const handleClear = useCallback(() => {
      const input = inputRef.current
      if (!input || disabled || readOnly) return

      const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
      valueSetter?.call(input, '')
      input.dispatchEvent(new Event('input', { bubbles: true }))
      if (!isControlled) setUncontrolledHasValue(false)
      onClear?.()
      input.focus({ preventScroll: true })
    }, [disabled, readOnly, isControlled, onClear])

    return (
      <div
        className={cn('flex min-w-0 flex-col gap-1.5', containerClassName)}
        data-disabled={disabled ? '' : undefined}
        data-invalid={isInvalid ? '' : undefined}
      >
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-(--color-fg)">
            {label}
            {required && (
              <span className="ms-1 text-(--color-error)" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative min-w-0">
          <motion.div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-[-2px] rounded-[10px] squircle-corners ring-2',
              isInvalid ? 'ring-(--color-error)' : 'ring-(--color-accent)',
            )}
            initial={false}
            animate={focused ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={
              reduceMotion ? { duration: 0 } : focused ? springs.settle : { duration: 0.15 }
            }
          />

          <div
            className={cn(
              inputVariants({ size }),
              isInvalid && 'border-(--color-error)',
              disabled && 'cursor-not-allowed opacity-50',
            )}
            data-focused={focused ? '' : undefined}
          >
            {startAdornment && (
              <span className="shrink-0 text-(--color-muted)" aria-hidden="true">
                {startAdornment}
              </span>
            )}

            <input
              ref={setRefs}
              id={id}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              aria-invalid={isInvalid || undefined}
              aria-describedby={describedBy}
              onChange={handleChange}
              onFocus={(event) => {
                setFocused(true)
                onFocus?.(event)
              }}
              onBlur={(event) => {
                setFocused(false)
                onBlur?.(event)
              }}
              className={cn(
                'min-w-0 flex-1 bg-transparent text-(--color-fg) outline-none placeholder:text-(--color-muted)',
                disabled && 'cursor-not-allowed',
                className,
              )}
              {...props}
            />

            {canClear && (
              <button
                type="button"
                aria-label={clearLabel}
                className={cn(
                  'relative -me-2 inline-flex size-9 shrink-0 items-center justify-center rounded-md squircle-corners',
                  'text-(--color-muted) hover:bg-(--color-surface-2) hover:text-(--color-fg)',
                  'transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out)',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)',
                  'after:absolute after:-inset-1 motion-reduce:transition-none',
                )}
                onPointerDown={(event) => event.preventDefault()}
                onClick={handleClear}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m4 4 8 8M12 4l-8 8" />
                </svg>
              </button>
            )}

            {endAdornment && (
              <span className="shrink-0 text-(--color-muted)" aria-hidden="true">
                {endAdornment}
              </span>
            )}
          </div>
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-(--color-error)">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export function InputPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-72 space-y-4">
        <Input label="Email" placeholder="you@example.com" clearable />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          error="Password is required"
        />
        <Input
          label="Search"
          size="sm"
          placeholder="Search…"
          startAdornment={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3.5 3.5" />
            </svg>
          }
        />
      </div>
    </div>
  )
}
