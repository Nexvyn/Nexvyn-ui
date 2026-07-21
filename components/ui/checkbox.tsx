'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { playHoverSound, playClickSound } from '@/lib/sound'
export interface CheckboxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  indeterminate?: boolean
  name?: string
  disabled?: boolean
  required?: boolean
  strikeThrough?: boolean
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      label,
      indeterminate = false,
      name,
      disabled,
      required,
      strikeThrough = false,
      className,
      id: idProp,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref,
  ) => {
    const reactId = useId()
    const id = idProp ?? reactId
    const isControlled = checkedProp !== undefined
    const [internal, setInternal] = useState(defaultChecked)
    const value = isControlled ? checkedProp : internal
    const reduceMotion = useReducedMotion()

    const isFirstRenderRef = useRef(true)
    useEffect(() => {
      isFirstRenderRef.current = false
    }, [])

    const toggle = useCallback(() => {
      if (disabled) return
      playClickSound()
      if (indeterminate) {
        if (!isControlled) setInternal(true)
        onCheckedChange?.(true)
      } else {
        const next = !value
        if (!isControlled) setInternal(next)
        onCheckedChange?.(next)
      }
    }, [value, indeterminate, isControlled, onCheckedChange, disabled])

    const inputRef = useCallback(
      (node: HTMLInputElement | null) => {
        if (node) node.indeterminate = indeterminate
      },
      [indeterminate],
    )

    const isChecked = indeterminate ? false : value
    const ariaChecked = indeterminate ? 'mixed' : value
    const showGlyph = indeterminate || value
    // eslint-disable-next-line react-hooks/refs
    const skipDrawIn = isFirstRenderRef.current || !!reduceMotion

    return (
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked}
          disabled={disabled}
          required={required}
          readOnly
          className="sr-only"
          tabIndex={-1}
        />
        <button
          ref={ref}
          type="button"
          role="checkbox"
          aria-checked={ariaChecked}
          aria-label={label}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedby}
          disabled={disabled}
          onClick={toggle}
          onMouseEnter={() => {
            if (!disabled) playHoverSound()
          }}
          className={cn(
            'flex size-5 shrink-0 items-center justify-center rounded-[5px] squircle-corners border transition-[color,background-color,border-color,transform]',
            'active:scale-[0.97] motion-reduce:active:scale-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
            'disabled:cursor-not-allowed disabled:opacity-50',
            value
              ? 'border-(--color-fg) bg-(--color-fg) text-(--color-bg)'
              : 'border-(--color-border) bg-transparent text-transparent',
            ariaInvalid && 'border-(--color-error)',
            className,
          )}
          onPointerDown={(e) => e.preventDefault()}
          {...props}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <AnimatePresence>
              {showGlyph &&
                (indeterminate ? (
                  <motion.path
                    key="dash"
                    d="M5 12h14"
                    initial={skipDrawIn ? false : { pathLength: 0, pathOffset: 0.5 }}
                    animate={{ pathLength: 1, pathOffset: 0 }}
                    exit={{ pathLength: 0, pathOffset: 0.5 }}
                    transition={reduceMotion ? { duration: 0 } : springs.settle}
                  />
                ) : (
                  <motion.path
                    key="check"
                    d="M5 12.5l4.5 4.5L19 7.5"
                    initial={skipDrawIn ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 1 }}
                    transition={reduceMotion ? { duration: 0 } : springs.settle}
                  />
                ))}
            </AnimatePresence>
          </svg>
        </button>
        {label && (
          <label
            htmlFor={id}
            className="min-h-11 flex items-center text-sm select-none"
            onClick={toggle}
          >
            {strikeThrough ? (
              <span
                className={cn(
                  'relative inline-block transition-colors duration-(--motion-dur-base) ease-(--motion-ease-out)',
                  value ? 'text-(--color-muted)' : 'text-(--color-fg)',
                )}
              >
                {label}
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-1/2 h-px bg-current motion-reduce:transition-none"
                  style={{ transformOrigin: 'left' }}
                  initial={false}
                  animate={{ scaleX: value ? 1 : 0 }}
                  transition={reduceMotion ? { duration: 0 } : springs.settle}
                />
              </span>
            ) : (
              <span className="text-(--color-fg)">{label}</span>
            )}
          </label>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'
export function CheckboxPreview() {
  const [checked, setChecked] = useState(false)
  const [todoChecked, setTodoChecked] = useState(false)
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="space-y-3">
        <Checkbox checked={checked} onCheckedChange={setChecked} label="Accept terms" />
        <Checkbox indeterminate label="Indeterminate" />
        <Checkbox checked disabled label="Disabled" />
        <Checkbox
          checked={todoChecked}
          onCheckedChange={setTodoChecked}
          label="Buy groceries"
          strikeThrough
        />
      </div>
    </div>
  )
}
