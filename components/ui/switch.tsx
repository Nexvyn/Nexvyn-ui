'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { playHoverSound, playClickSound } from '@/lib/sound'

const TRACK_W = 44
const THUMB_SIZE = 20
const THUMB_TRAVEL = TRACK_W - THUMB_SIZE - 4
export interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  labelSide?: 'left' | 'right'
  name?: string
  disabled?: boolean
  required?: boolean
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
      disabled,
      name,
      required,
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

    const thumbX = useMotionValue(value ? THUMB_TRAVEL : 0)
    const thumbScaleX = useMotionValue(1)

    const prevValue = useRef(value)
    useEffect(() => {
      if (prevValue.current === value) return
      prevValue.current = value
      animate(thumbX, value ? THUMB_TRAVEL : 0, springs.settle)
    }, [value, thumbX])

    const toggle = useCallback(() => {
      if (disabled) return
      playClickSound()
      const next = !value
      if (!isControlled) setInternal(next)
      onCheckedChange?.(next)
    }, [value, isControlled, onCheckedChange, disabled])
    const handlePointerDown = useCallback(() => {
      if (reduceMotion || disabled) return
      animate(thumbScaleX, 1.15, springs.press)
    }, [reduceMotion, disabled, thumbScaleX])

    const handlePointerUp = useCallback(() => {
      if (reduceMotion || disabled) return
      animate(thumbScaleX, 1, springs.settle)
    }, [reduceMotion, disabled, thumbScaleX])

    return (
      <div
        className={cn(
          'flex items-center gap-3',
          labelSide === 'left' && 'flex-row-reverse',
          className,
        )}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={value}
          disabled={disabled}
          required={required}
          readOnly
          className="sr-only"
          tabIndex={-1}
        />
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={value}
          aria-label={label}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedby}
          disabled={disabled}
          onClick={toggle}
          onMouseEnter={() => {
            if (!disabled) playHoverSound()
          }}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
            'disabled:cursor-not-allowed disabled:opacity-50',
            value ? 'bg-(--color-fg)' : 'bg-(--color-border)',
            ariaInvalid && 'ring-2 ring-(--color-error) ring-offset-2 ring-offset-(--color-bg)',
          )}
          onPointerDown={(e) => {
            e.preventDefault()
            handlePointerDown()
          }}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          {...props}
        >
          <motion.span
            className="pointer-events-none inline-block size-5 rounded-full bg-(--color-bg) shadow-sm"
            style={{
              x: thumbX,
              scaleX: thumbScaleX,
            }}
          />
        </button>
        {label && (
          <label
            htmlFor={id}
            className="min-h-6 flex items-center text-sm text-(--color-fg) select-none"
            onClick={() => {
              if (!disabled) toggle()
            }}
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
