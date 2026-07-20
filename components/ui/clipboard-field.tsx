'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'
import { playHoverSound, playClickSound } from '@/lib/sound'

const KEYFRAME_STYLE_ID = '__clipboard_field_kf__'

function ensureKeyframes() {
  if (typeof document === 'undefined') return
  if (document.getElementById(KEYFRAME_STYLE_ID)) return
  const style = document.createElement('style')
  style.id = KEYFRAME_STYLE_ID
  style.textContent = `
    @keyframes cf-fade-out {
      from { opacity: 1; transform: scale(1); }
      to   { opacity: 0; transform: scale(0.97); }
    }
    @keyframes cf-fade-in {
      from { opacity: 0; transform: scale(0.97); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes cf-icon-exit {
      from { opacity: 1; transform: scale(1) rotate(0deg); }
      to   { opacity: 0; transform: scale(0.7) rotate(-8deg); }
    }
    @keyframes cf-icon-enter {
      from { opacity: 0; transform: scale(0.7) rotate(8deg); }
      to   { opacity: 1; transform: scale(1) rotate(0deg); }
    }
  `
  document.head.appendChild(style)
}

export interface ClipboardFieldProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onCopy' | 'value'
> {
  value: string
  prompt?: string
  copiedLabel?: string
  copyLabel?: string
  resetDelay?: number
  onCopy?: () => void
  hideIcon?: boolean
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export const ClipboardField = forwardRef<HTMLButtonElement, ClipboardFieldProps>(
  (
    {
      value,
      prompt = '$',
      copiedLabel = 'Copied to clipboard',
      copyLabel = 'Copy to clipboard',
      resetDelay = 2000,
      onCopy,
      hideIcon = false,
      disabled,
      className,
      onClick,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false)
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
      ensureKeyframes()
    }, [])

    useEffect(
      () => () => {
        if (resetTimer.current) clearTimeout(resetTimer.current)
      },
      [],
    )

    const handleCopy = useCallback(async () => {
      if (disabled) return
      playClickSound()
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        onCopy?.()
        if (resetTimer.current) clearTimeout(resetTimer.current)
        resetTimer.current = setTimeout(() => setCopied(false), resetDelay)
      } catch {
      }
    }, [disabled, value, onCopy, resetDelay])

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-copied={copied ? '' : undefined}
        aria-label={copied ? copiedLabel : copyLabel}
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) void handleCopy()
        }}
        onMouseEnter={() => playHoverSound()}
        onPointerDown={(e) => {
          e.preventDefault()
        }}
        className={cn(
          'clipboard-field group relative inline-grid max-w-full cursor-pointer items-center gap-x-2',
          'rounded-xl squircle-corners border border-(--color-border) bg-(--color-surface-2)',
          'px-3 py-2.5 font-mono text-[13px] leading-none text-(--color-fg)',
          'outline-none select-none',
          hideIcon ? 'grid-cols-[auto_1fr]' : 'grid-cols-[auto_1fr_auto]',
          'transition-[border-color,background-color] duration-(--motion-dur-fast) ease-(--motion-ease-in-out) motion-reduce:transition-none',
          'hover:border-(--color-border-strong) hover:bg-(--color-surface)',
          'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-(--color-bg)',
          'active:scale-[0.98] motion-reduce:active:scale-100',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 text-(--color-muted) tabular-nums"
        >
          {prompt}
        </span>

        {/* Both layers share col 2 — crossfade only, button width never changes. */}
        <span
          data-slot="command"
          style={{
            willChange: 'opacity, transform',
            animation: copied
              ? 'cf-fade-out 0.18s var(--motion-ease-in-out) forwards'
              : 'cf-fade-in 0.14s var(--motion-ease-out) forwards',
          }}
          className={cn(
            'col-start-2 row-start-1 min-w-0 overflow-hidden whitespace-nowrap text-start text-(--color-muted)',
            'pointer-events-none',
            'motion-reduce:[animation:none]',
          )}
        >
          {value}
        </span>

        <span
          data-slot="copied"
          aria-hidden={!copied}
          style={{
            willChange: 'opacity, transform',
            animation: copied
              ? 'cf-fade-in 0.18s 40ms var(--motion-ease-out) both'
              : 'cf-fade-out 0.1s var(--motion-ease-in-out) both',
          }}
          className={cn(
            'col-start-2 row-start-1 min-w-0 overflow-hidden whitespace-nowrap text-start text-(--color-fg)',
            'motion-reduce:[animation:none] motion-reduce:opacity-0',
          )}
        >
          {copiedLabel}
        </span>

        {!hideIcon && (
          <span
            aria-hidden="true"
            className="relative col-start-3 row-start-1 size-4 shrink-0 text-(--color-muted) transition-colors duration-(--motion-dur-fast) group-hover:text-(--color-fg) group-data-[copied]:text-(--color-fg)"
          >
            <span
              style={{
                willChange: 'opacity, transform',
                animation: copied
                  ? 'cf-icon-exit 0.08s var(--motion-ease-in-out) forwards'
                  : 'cf-icon-enter 0.12s var(--motion-ease-out) forwards',
              }}
              className="absolute inset-0 flex items-center justify-center motion-reduce:[animation:none]"
            >
              <CopyIcon />
            </span>
            <span
              style={{
                willChange: 'opacity, transform',
                animation: copied
                  ? 'cf-icon-enter 0.12s 40ms var(--motion-ease-out) both'
                  : 'cf-icon-exit 0.06s var(--motion-ease-in-out) both',
              }}
              className="absolute inset-0 flex items-center justify-center motion-reduce:[animation:none] motion-reduce:opacity-0"
            >
              <CheckIcon />
            </span>
          </span>
        )}
      </button>
    )
  },
)

ClipboardField.displayName = 'ClipboardField'

export function ClipboardFieldPreview() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <ClipboardField value="npx shadcn@latest add @nexvyn/badge" className="w-full max-w-md" />
    </div>
  )
}
