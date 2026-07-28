'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { playHoverSound, playClickSound } from '@/lib/sound'

export interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  labelSide?: 'left' | 'right'
  name?: string
  value?: string
  form?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  trackClassName?: string
  thumbClassName?: string
  labelClassName?: string
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      label,
      labelSide = 'right',
      disabled = false,
      readOnly = false,
      name,
      value: formValue = 'on',
      form,
      required,
      className,
      trackClassName,
      thumbClassName,
      labelClassName,
      id: idProp,
      onClick,
      onMouseEnter,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onPointerLeave,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...buttonProps
    },
    forwardedRef,
  ) => {
    const reactId = useId()
    const id = idProp ?? reactId
    const labelId = label ? `${id}-label` : undefined
    const isControlled = checkedProp !== undefined
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const checked = isControlled ? checkedProp : internalChecked
    const reduceMotion = useReducedMotion()
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const nativeInputRef = useRef<HTMLInputElement | null>(null)
    const thumbScaleX = useMotionValue(1)
    const isInteractive = !disabled && !readOnly

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node
        if (typeof forwardedRef === 'function') {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      },
      [forwardedRef],
    )

    useEffect(() => {
      if (isControlled) return
      const owningForm = nativeInputRef.current?.form
      if (!owningForm) return

      const reset = () => setInternalChecked(defaultChecked)
      owningForm.addEventListener('reset', reset)
      return () => owningForm.removeEventListener('reset', reset)
    }, [defaultChecked, isControlled])

    const settleThumb = useCallback(() => {
      if (reduceMotion) return
      animate(thumbScaleX, 1, springs.settle)
    }, [reduceMotion, thumbScaleX])

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented || !isInteractive) {
          if (!disabled) event.preventDefault()
          return
        }

        const nextChecked = !checked
        if (!isControlled) setInternalChecked(nextChecked)
        playClickSound()
        onCheckedChange?.(nextChecked)
      },
      [onClick, isInteractive, disabled, checked, isControlled, onCheckedChange],
    )

    const handleMouseEnter = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onMouseEnter?.(event)
        if (!event.defaultPrevented && isInteractive) playHoverSound()
      },
      [onMouseEnter, isInteractive],
    )

    const handlePointerDown = useCallback(
      (event: PointerEvent<HTMLButtonElement>) => {
        onPointerDown?.(event)
        if (event.defaultPrevented || reduceMotion || !isInteractive) return
        animate(thumbScaleX, 1.15, springs.press)
      },
      [onPointerDown, reduceMotion, isInteractive, thumbScaleX],
    )

    const handlePointerUp = useCallback(
      (event: PointerEvent<HTMLButtonElement>) => {
        onPointerUp?.(event)
        settleThumb()
      },
      [onPointerUp, settleThumb],
    )

    const handlePointerCancel = useCallback(
      (event: PointerEvent<HTMLButtonElement>) => {
        onPointerCancel?.(event)
        settleThumb()
      },
      [onPointerCancel, settleThumb],
    )

    const handlePointerLeave = useCallback(
      (event: PointerEvent<HTMLButtonElement>) => {
        onPointerLeave?.(event)
        settleThumb()
      },
      [onPointerLeave, settleThumb],
    )

    return (
      <div
        className={cn(
          'flex items-center gap-3',
          labelSide === 'left' && 'flex-row-reverse',
          className,
        )}
        data-state={checked ? 'checked' : 'unchecked'}
        data-disabled={disabled ? '' : undefined}
        data-readonly={readOnly ? '' : undefined}
      >
        <input
          ref={nativeInputRef}
          type="checkbox"
          name={name}
          value={formValue}
          form={form}
          checked={checked}
          disabled={disabled}
          required={required}
          readOnly
          aria-hidden="true"
          className="sr-only"
          tabIndex={-1}
        />
        <button
          ref={setRefs}
          id={id}
          type="button"
          {...buttonProps}
          role="switch"
          aria-checked={checked}
          aria-label={label ? undefined : ariaLabel}
          aria-labelledby={ariaLabelledBy ?? labelId}
          aria-readonly={readOnly || undefined}
          aria-required={required || undefined}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          disabled={disabled}
          data-state={checked ? 'checked' : 'unchecked'}
          data-disabled={disabled ? '' : undefined}
          data-readonly={readOnly ? '' : undefined}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerLeave}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 items-center justify-start rounded-full p-0.5 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
            'disabled:cursor-not-allowed disabled:opacity-50',
            readOnly && 'cursor-default opacity-75',
            checked ? 'bg-(--color-fg)' : 'bg-(--color-border)',
            ariaInvalid && 'ring-2 ring-(--color-error) ring-offset-2 ring-offset-(--color-bg)',
            'motion-reduce:transition-none',
            trackClassName,
          )}
        >
          <motion.span
            animate={{ x: checked ? 20 : 0 }}
            transition={reduceMotion ? { duration: 0 } : springs.settle}
            className={cn(
              'pointer-events-none inline-block size-5 rounded-full bg-(--color-bg) shadow-sm',
              thumbClassName,
            )}
            style={{ scaleX: thumbScaleX }}
          />
        </button>
        {label && (
          <label
            id={labelId}
            htmlFor={id}
            className={cn(
              'flex min-h-6 items-center text-sm text-(--color-fg) select-none',
              disabled
                ? 'cursor-not-allowed opacity-50'
                : readOnly
                  ? 'cursor-default'
                  : 'cursor-pointer',
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)
Switch.displayName = 'Switch'

export function SwitchPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="space-y-3">
        <Switch checked={checked} onCheckedChange={setChecked} label="Notifications" />
        <Switch defaultChecked label="Dark mode" />
        <Switch checked disabled label="Disabled" />
      </div>
    </div>
  )
}
