'use client'

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useState,
  type ReactNode,
} from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxProps {
  id?: string
  checked?: CheckedState
  defaultChecked?: boolean
  onCheckedChange?: (checked: CheckedState) => void
  name?: string
  disabled?: boolean
  required?: boolean
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  className?: string
  value?: string
}

export interface CheckboxFieldProps {
  label: string
  description?: string
  strikeThrough?: boolean
  className?: string
  children: ReactNode
}

function useControlledChecked(
  controlledValue: CheckedState | undefined,
  defaultValue: boolean | undefined,
  onChange: ((checked: CheckedState) => void) | undefined,
): [CheckedState, (next: CheckedState) => void] {
  const [internal, setInternal] = useState<CheckedState>(defaultValue ?? false)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internal

  const setValue = useCallback(
    (next: CheckedState) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [value, setValue]
}

const CHECK_PATH = 'M3.5 8.5L7 12L12.5 5.5'
const DASH_PATH = 'M4 8L12 8'

function CheckGlyph({ state, animate }: { state: CheckedState; animate: boolean }) {
  const reduceMotion = useReducedMotion()
  const isChecked = state === true
  const isIndeterminate = state === 'indeterminate'
  const shouldShow = isChecked || isIndeterminate

  if (!shouldShow) return null

  const path = isIndeterminate ? DASH_PATH : CHECK_PATH
  const shouldAnimate = animate && !reduceMotion

  return (
    <svg viewBox="0 0 16 16" fill="none" className="absolute inset-0 size-full" aria-hidden="true">
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={shouldAnimate ? { pathLength: 0, opacity: 0 } : undefined}
        transition={shouldAnimate ? springs.fast : { duration: 0 }}
      />
    </svg>
  )
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      checked: controlledChecked,
      defaultChecked,
      onCheckedChange,
      name,
      disabled = false,
      required = false,
      'aria-invalid': ariaInvalid,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      className,
      value = 'on',
    },
    forwardedRef,
  ) => {
    const [checkedState, setCheckedState] = useControlledChecked(
      controlledChecked,
      defaultChecked,
      onCheckedChange,
    )

    const [toggleCount, setToggleCount] = useState(0)

    const isChecked = checkedState === true
    const isIndeterminate = checkedState === 'indeterminate'

    const ariaCheckedValue = isIndeterminate ? 'mixed' : isChecked

    const handleClick = useCallback(() => {
      if (disabled) return
      const next: CheckedState = isIndeterminate ? true : !isChecked
      setCheckedState(next)
      setToggleCount((c) => c + 1)
    }, [disabled, isIndeterminate, isChecked, setCheckedState])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          handleClick()
        }
      },
      [handleClick],
    )

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault()
    }, [])

    return (
      <>
        <button
          id={id}
          type="button"
          role="checkbox"
          aria-checked={ariaCheckedValue}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          aria-required={required || undefined}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          className={cn(
            'relative inline-flex size-5 shrink-0 items-center justify-center rounded-[5px] supports-[corner-shape:squircle]:corner-squircle',
            'border border-(--color-border)',
            'transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-(--color-bg)',
            'disabled:cursor-not-allowed disabled:opacity-50',
            (isChecked || isIndeterminate) &&
              'border-transparent bg-(--color-fg) text-(--color-bg)',
            !(isChecked || isIndeterminate) && 'bg-(--color-bg)',
            ariaInvalid && 'border-destructive',
            className,
          )}
        >
          <CheckGlyph state={checkedState} animate={toggleCount > 0} />
        </button>
        <input
          ref={forwardedRef}
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          required={required}
          aria-hidden="true"
          tabIndex={-1}
          onChange={() => {}}
          className="pointer-events-none absolute size-0 opacity-0"
          style={{ position: 'absolute', width: 0, height: 0 }}
        />
      </>
    )
  },
)
Checkbox.displayName = 'Checkbox'

export function CheckboxField({
  label,
  description,
  strikeThrough = false,
  className,
  children,
}: CheckboxFieldProps) {
  const generatedId = useId()
  const labelId = `${generatedId}-label`
  const descriptionId = description ? `${generatedId}-description` : undefined
  const checkbox = isValidElement<CheckboxProps>(children) ? children : null
  const controlId = checkbox?.props.id ?? `${generatedId}-control`
  const describedBy = [checkbox?.props['aria-describedby'], descriptionId].filter(Boolean).join(' ')
  const control = checkbox
    ? cloneElement(checkbox, {
        id: controlId,
        'aria-labelledby':
          checkbox.props['aria-labelledby'] ?? (checkbox.props['aria-label'] ? undefined : labelId),
        'aria-describedby': describedBy || undefined,
      })
    : children

  const isChecked = checkbox?.props.checked === true
  const reduceMotion = useReducedMotion()

  return (
    <div className={cn('flex min-h-11 items-start gap-3', className)}>
      {control}
      <div className="flex flex-col gap-0.5">
        <label
          id={labelId}
          htmlFor={controlId}
          className="cursor-pointer text-base font-medium leading-tight select-none"
        >
          {strikeThrough ? (
            <span
              className={cn(
                'relative inline-block transition-colors duration-(--motion-dur-base) ease-(--motion-ease-out) motion-reduce:transition-none',
                isChecked ? 'text-(--color-muted)' : 'text-(--color-fg)',
              )}
            >
              {label}
              <motion.span
                aria-hidden="true"
                className="absolute left-0 right-0 top-1/2 h-px bg-current motion-reduce:transition-none"
                style={{ transformOrigin: 'left' }}
                initial={false}
                animate={{ scaleX: isChecked ? 1 : 0 }}
                transition={reduceMotion ? { duration: 0 } : springs.settle}
              />
            </span>
          ) : (
            <span className="text-(--color-fg)">{label}</span>
          )}
        </label>
        {description && (
          <p id={descriptionId} className="text-sm leading-snug text-(--color-muted)">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export function CheckboxPreview() {
  const [todoChecked, setTodoChecked] = useState(false)

  return (
    <div className="flex flex-col gap-4 p-8">
      <Checkbox defaultChecked />
      <Checkbox />
      <Checkbox checked="indeterminate" />
      <Checkbox disabled defaultChecked />
      <CheckboxField label="Buy groceries" strikeThrough>
        <Checkbox checked={todoChecked} onCheckedChange={(next) => setTodoChecked(next === true)} />
      </CheckboxField>
    </div>
  )
}
