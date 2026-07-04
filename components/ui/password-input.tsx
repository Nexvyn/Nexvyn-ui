'use client'

import { forwardRef, useEffect, useId, useRef, useState, type InputHTMLAttributes } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

const EYE_OPEN_TOP = 'M1 12 C1 12 5 4 12 4 C19 4 23 12 23 12'
const EYE_CLOSED_TOP = 'M1 12 C1 12 5 12 12 12 C19 12 23 12 23 12'
const EYE_OPEN_BOTTOM = 'M1 12 C1 12 5 20 12 20 C19 20 23 12 23 12'
const EYE_CLOSED_BOTTOM = 'M1 12 C1 12 5 12 12 12 C19 12 23 12 23 12'
const CLIP_OPEN = 'M1 12 C1 12 5 4 12 4 C19 4 23 12 23 12 C23 12 19 20 12 20 C5 20 1 12 1 12Z'
const CLIP_CLOSED = 'M1 12 C1 12 5 12 12 12 C19 12 23 12 23 12 C23 12 19 12 12 12 C5 12 1 12 1 12Z'

const PUPIL_RX = 5
const PUPIL_RY = 3.5

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showLabel?: string
  hideLabel?: string
  containerClassName?: string
  labelClassName?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label = 'Password',
      showLabel = 'Show password',
      hideLabel = 'Hide password',
      containerClassName,
      labelClassName,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false)
    const [blinking, setBlinking] = useState(false)
    const eyeRef = useRef<SVGSVGElement | null>(null)
    const reactId = useId()
    const id = idProp ?? reactId
    const prefersReducedMotion = useReducedMotion()

    const px = useMotionValue(0)
    const py = useMotionValue(0)
    const sx = useSpring(px, { stiffness: 350, damping: 28, mass: 0.4 })
    const sy = useSpring(py, { stiffness: 350, damping: 28, mass: 0.4 })

    useEffect(() => {
      if (typeof window === 'undefined' || prefersReducedMotion) return
      const handle = (e: MouseEvent) => {
        const el = eyeRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy) || 1
        const nx = dx / dist
        const ny = dy / dist
        const reach = Math.min(1, dist / 240)
        px.set(nx * PUPIL_RX * reach)
        py.set(ny * PUPIL_RY * reach)
      }
      window.addEventListener('mousemove', handle)
      return () => window.removeEventListener('mousemove', handle)
    }, [px, py, prefersReducedMotion])

    useEffect(() => {
      if (prefersReducedMotion) return
      let timer: ReturnType<typeof setTimeout>
      const schedule = () => {
        const next = 2000 + Math.random() * 4000
        timer = setTimeout(() => {
          setBlinking(true)
          setTimeout(() => setBlinking(false), 120)
          schedule()
        }, next)
      }
      schedule()
      return () => clearTimeout(timer)
    }, [prefersReducedMotion])

    const closed = blinking || visible
    const transition = prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.14, ease: [0.22, 1, 0.36, 1] as const }

    return (
      <div className={cn('w-72', containerClassName)} data-state={visible ? 'visible' : 'hidden'}>
        {label ? (
          <label
            htmlFor={id}
            className={cn(
              'pb-2 font-medium text-sm font-sans',
              labelClassName,
            )}
            style={{ color: 'var(--color-fg)' }}
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={visible ? 'text' : 'password'}
            className={cn(
              'h-11 w-full rounded-xl ps-3.5 pe-12 py-2.5 text-sm outline-none',
              'border border-(--color-border)',
              'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-(--color-bg)',
              'transition-[border-color,box-shadow] duration-150',
              'placeholder:text-(--color-subtle)',
              className,
            )}
            style={{
              backgroundColor: 'var(--color-surface-2)',
              color: 'var(--color-fg)',
            }}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? hideLabel : showLabel}
            aria-pressed={visible}
            data-state={visible ? 'visible' : 'hidden'}
            className={cn(
              'absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--color-muted)',
              'transition-[color,transform] duration-150',
              'hover:text-(--color-fg) active:scale-90',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-accent) focus-visible:rounded-sm',
            )}
          >
            <svg
              ref={eyeRef}
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <defs>
                <clipPath id={`${id}-eye-clip`}>
                  <motion.path
                    d={CLIP_OPEN}
                    animate={{ d: closed ? CLIP_CLOSED : CLIP_OPEN }}
                    transition={transition}
                  />
                </clipPath>
              </defs>
              <motion.path
                d={EYE_OPEN_TOP}
                animate={{ d: closed ? EYE_CLOSED_TOP : EYE_OPEN_TOP }}
                transition={transition}
              />
              <motion.path
                d={EYE_OPEN_BOTTOM}
                animate={{ d: closed ? EYE_CLOSED_BOTTOM : EYE_OPEN_BOTTOM }}
                transition={transition}
              />
              <g clipPath={`url(#${id}-eye-clip)`}>
                <motion.g style={{ x: sx, y: sy }}>
                  <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                </motion.g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export function PasswordInputPreview() {
  return <PasswordInput />
}
