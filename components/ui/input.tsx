'use client'

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { playHoverSound } from '@/lib/sound'
import { springs } from '@/lib/motion-tokens'

const sizeClasses = {
  sm: 'h-9 text-xs',
  md: 'h-11 text-sm',
} as const

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md'
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  label?: string
  error?: string
  containerClassName?: string
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
      required,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const reactId = useId()
    const id = idProp ?? reactId
    const errorId = error ? `${id}-error` : undefined
    const reduceMotion = useReducedMotion()

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-(--color-fg)">
            {label}
            {required && <span className="ms-1 text-(--color-error)">*</span>}
          </label>
        )}
        <div
          onMouseEnter={() => !disabled && playHoverSound()}
          className={cn(
            'relative flex items-center gap-1.5 rounded-lg squircle-corners border bg-(--color-bg) px-3.5',
            'transition-[border-color,box-shadow] duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none',
            sizeClasses[size],
            error
              ? 'border-(--color-error) ring-1 ring-(--color-error)/20'
              : 'border-(--color-border) hover:border-(--color-border-strong) focus-within:border-(--color-accent) focus-within:ring-2 focus-within:ring-(--color-accent)/20',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          {startAdornment && (
            <span className="shrink-0 text-(--color-muted)" aria-hidden="true">
              {startAdornment}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={ariaInvalid || !!error || undefined}
            aria-describedby={ariaDescribedBy || errorId}
            className={cn(
              'flex-1 bg-transparent text-(--color-fg) outline-none placeholder:text-(--color-muted)',
              disabled && 'cursor-not-allowed',
              className,
            )}
            {...props}
          />
          {endAdornment && (
            <span className="shrink-0 text-(--color-muted)" aria-hidden="true">
              {endAdornment}
            </span>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              id={errorId}
              role="alert"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
              transition={reduceMotion ? { duration: 0 } : springs.settle}
              className="text-xs text-(--color-error)"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
Input.displayName = 'Input'

export function InputPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-72 space-y-4">
        <Input label="Email" placeholder="you@example.com" />
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
