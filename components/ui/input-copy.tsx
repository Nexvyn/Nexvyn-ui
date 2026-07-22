'use client'

import { forwardRef, useCallback, useEffect, useRef, useState, type HTMLAttributes } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { playHoverSound, playClickSound } from '@/lib/sound'

type InputCopyVariant = 'icon' | 'button'
type InputCopyAlign = 'right' | 'left'

export interface InputCopyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: string
  label?: string
  onCopy?: () => void
  disabled?: boolean
  variant?: InputCopyVariant
  align?: InputCopyAlign
  copyLabel?: string
  copiedLabel?: string
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="2 4 20 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 12L10 16L18 8" />
    </svg>
  )
}

export const InputCopy = forwardRef<HTMLDivElement, InputCopyProps>(
  (
    {
      value,
      label,
      onCopy,
      disabled,
      variant = 'icon',
      align = 'right',
      copyLabel = 'Copy to clipboard',
      copiedLabel = 'Copied',
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const [copied, setCopied] = useState(false)
    const [copyCount, setCopyCount] = useState(0)
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleCopy = useCallback(async () => {
      if (disabled) return
      playClickSound()
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setCopyCount((c) => c + 1)
        onCopy?.()
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), 2000)
      } catch {}
    }, [value, disabled, onCopy])

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])

    const springTransition = reduceMotion ? { duration: 0 } : springs.press

    const iconSwitch = (
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key={`check-${copyCount}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={springTransition}
            className="flex items-center justify-center"
          >
            <CheckIcon />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={springTransition}
            className="flex items-center justify-center"
          >
            <CopyIcon />
          </motion.span>
        )}
      </AnimatePresence>
    )

    const actionElement =
      variant === 'button' ? (
        <span className="shrink-0 flex items-center gap-1.5 px-1.5 py-2 text-[13px] font-normal text-muted-foreground transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none group-hover:text-foreground">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key={`check-label-${copyCount}`}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={springTransition}
              >
                <CheckIcon />
                <span>{copiedLabel}</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy-label"
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={springTransition}
              >
                <CopyIcon />
                <span>Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      ) : (
        <span className="shrink-0 px-1.5 py-2 text-muted-foreground transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none group-hover:text-foreground">
          {iconSwitch}
        </span>
      )

    const valueElement = (
      <span
        className={cn(
          'flex-1 min-w-0 text-start text-[13px] text-foreground font-mono py-2 select-none truncate',
          align === 'left' ? 'ps-1' : 'ps-0',
        )}
      >
        {value}
      </span>
    )

    const buttonContent =
      align === 'left' ? (
        <>
          {actionElement}
          {valueElement}
        </>
      ) : (
        <>
          {valueElement}
          {actionElement}
        </>
      )

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-0.5',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
        {...props}
      >
        {label && (
          <span
            className={cn('text-[13px] text-muted-foreground', align === 'left' ? 'ps-1' : 'ps-0')}
          >
            {label}
          </span>
        )}
        <div className="relative">
          <button
            type="button"
            onClick={handleCopy}
            onMouseEnter={() => {
              if (!disabled) playHoverSound()
              setTooltipOpen(true)
            }}
            onMouseLeave={() => setTooltipOpen(false)}
            onFocus={() => setTooltipOpen(true)}
            onBlur={() => setTooltipOpen(false)}
            onPointerDown={(e) => e.preventDefault()}
            disabled={disabled}
            aria-label={copied ? copiedLabel : copyLabel}
            className={cn(
              'group flex items-center w-full cursor-pointer outline-none rounded-lg squircle-corners border border-border bg-card',
              'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
              'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-background',
              variant === 'icon' && 'px-2',
              variant === 'button' && 'px-2',
            )}
          >
            {buttonContent}
          </button>
          {variant === 'icon' && (
            <AnimatePresence>
              {tooltipOpen && !disabled && (
                <motion.span
                  role="tooltip"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.1 }}
                  className="pointer-events-none absolute top-full mt-1.5 inset-e-0 z-20 whitespace-nowrap rounded-md squircle-corners bg-foreground px-2 py-1 text-[11px] font-medium text-background motion-reduce:transition-none"
                >
                  {copied ? copiedLabel : copyLabel}
                </motion.span>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    )
  },
)

InputCopy.displayName = 'InputCopy'

export function InputCopyPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <InputCopy label="API Key" value="sk-proj-a1b2c3d4e5f6" variant="button" />
      </div>
    </div>
  )
}
