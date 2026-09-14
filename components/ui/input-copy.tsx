'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { playHoverSound, playClickSound } from '@/lib/sound'

type InputCopyVariant = 'icon' | 'button'
type InputCopyAlign = 'right' | 'left'
type CopyStatus = 'idle' | 'copied' | 'failed'

export interface InputCopyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: string
  label?: string
  onCopy?: () => void
  disabled?: boolean
  variant?: InputCopyVariant
  align?: InputCopyAlign
  copyLabel?: string
  copiedLabel?: string
  failedLabel?: string
  buttonText?: string
  resetDelay?: number
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

function legacyCopy(input: HTMLInputElement | null): boolean {
  if (!input) return false
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
  input.focus({ preventScroll: true })
  input.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  input.setSelectionRange(0, 0)
  previous?.focus({ preventScroll: true })
  return ok
}

// navigator.clipboard is undefined on insecure origins (plain http LAN IPs) and can reject in iframes.
async function writeClipboard(text: string, input: HTMLInputElement | null): Promise<boolean> {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return legacyCopy(input)
    }
  }
  return legacyCopy(input)
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
      failedLabel = 'Copy failed, text selected',
      buttonText = 'Copy',
      resetDelay = 2000,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const inputId = useId()
    const [status, setStatus] = useState<CopyStatus>('idle')
    const [copyCount, setCopyCount] = useState(0)
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const mountedRef = useRef(false)
    const copied = status === 'copied'

    useEffect(() => {
      mountedRef.current = true
      return () => {
        mountedRef.current = false
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])

    const handleCopy = useCallback(async () => {
      if (disabled) return
      playClickSound()
      const ok = await writeClipboard(value, inputRef.current)
      if (!mountedRef.current) return
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (ok) {
        setStatus('copied')
        setCopyCount((c) => c + 1)
        onCopy?.()
      } else {
        setStatus('failed')
        inputRef.current?.focus()
      }
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        setStatus('idle')
      }, resetDelay)
    }, [value, disabled, onCopy, resetDelay])

    const springTransition = reduceMotion ? { duration: 0 } : springs.press
    const tooltipTransition = reduceMotion
      ? { duration: 0 }
      : { duration: 0.1, ease: 'easeOut' as const }

    const swap = (key: string, children: ReactNode, from: number) => (
      <motion.span
        key={key}
        initial={{ opacity: 0, scale: from }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={springTransition}
        className="flex items-center justify-center gap-1.5"
      >
        {children}
      </motion.span>
    )

    const actionContent = (
      <AnimatePresence mode="wait" initial={false}>
        {copied
          ? swap(
              `check-${copyCount}`,
              <>
                <CheckIcon className="text-(--color-accent)" />
                {variant === 'button' && <span>{copiedLabel}</span>}
              </>,
              0.9,
            )
          : swap(
              'copy',
              <>
                <CopyIcon />
                {variant === 'button' && <span>{buttonText}</span>}
              </>,
              0.95,
            )}
      </AnimatePresence>
    )

    const actionButton = (
      <div className="relative flex shrink-0 self-stretch">
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
          disabled={disabled}
          aria-label={variant === 'icon' ? copyLabel : undefined}
          aria-controls={inputId}
          className={cn(
            'flex min-h-11 min-w-11 items-center justify-center rounded-md squircle-corners px-2 text-[13px] font-normal text-muted-foreground outline-none cursor-pointer',
            'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none hover:text-foreground',
            'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-accent)',
            'disabled:cursor-not-allowed',
          )}
        >
          {actionContent}
        </button>
        {variant === 'icon' && (
          <AnimatePresence>
            {tooltipOpen && !disabled && (
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={tooltipTransition}
                className="pointer-events-none absolute top-full mt-1.5 inset-e-0 z-20 whitespace-nowrap rounded-md squircle-corners bg-foreground px-2 py-1 text-[11px] font-normal text-background"
              >
                {copied ? copiedLabel : copyLabel}
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </div>
    )

    const valueInput = (
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        readOnly
        value={value}
        disabled={disabled}
        spellCheck={false}
        onFocus={(e) => e.currentTarget.select()}
        className={cn(
          'min-w-0 flex-1 truncate bg-transparent py-2 font-mono text-[13px] text-foreground outline-none',
          align === 'left' ? 'ps-1 pe-2' : 'ps-2 pe-1',
        )}
      />
    )

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-0.5', disabled && 'opacity-50', className)}
        {...props}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn('text-[13px] text-muted-foreground', align === 'left' ? 'ps-1' : 'ps-0')}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            'flex w-full items-center rounded-md squircle-corners border border-border bg-card px-0.5',
            'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
            'has-[input:focus-visible]:border-(--color-accent)',
          )}
        >
          {align === 'left' ? (
            <>
              {actionButton}
              {valueInput}
            </>
          ) : (
            <>
              {valueInput}
              {actionButton}
            </>
          )}
        </div>
        <span role="status" aria-live="polite" className="sr-only">
          {status === 'copied' ? copiedLabel : status === 'failed' ? failedLabel : ''}
        </span>
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
