'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, MotionConfig, useAnimationControls, useReducedMotion } from 'motion/react'
import { playHoverSound, playClickSound } from '@/lib/sound'

const MEASURE_SAFETY = 2

const EASE = [0.22, 1, 0.36, 1] as const
const EASE_ICON = [0.2, 0, 0, 1] as const

export type PrStatus = 'open' | 'draft' | 'merged' | 'closed'

export interface IdReelState {
  kind: 'numeric' | 'text'
  truncated: boolean
  full: string
  status: PrStatus | null
}

const STATUS_STYLES: Record<
  PrStatus,
  { label: string; className: string; Icon: () => React.JSX.Element }
> = {
  open: {
    label: 'Open',
    className: 'text-(--pr-open) bg-(--pr-open-bg)',
    Icon: PrOpenIcon,
  },
  draft: {
    label: 'Draft',
    className: 'text-(--pr-draft) bg-(--pr-draft-bg)',
    Icon: PrOpenIcon,
  },
  merged: {
    label: 'Merged',
    className: 'text-(--pr-merged) bg-(--pr-merged-bg)',
    Icon: PrMergedIcon,
  },
  closed: {
    label: 'Closed',
    className: 'text-(--pr-closed) bg-(--pr-closed-bg)',
    Icon: PrClosedIcon,
  },
}

const ICON_SHOWN = { opacity: 1, scale: 1, filter: 'blur(0px)' }
const ICON_HIDDEN = { opacity: 0, scale: 0.25, filter: 'blur(4px)' }

const VALUE_TYPE = 'text-xl font-semibold tracking-[-0.01em] tabular-nums whitespace-nowrap'

export default function IdReel({
  value = '#0',
  runKey = 0,
  status,
  onStatusClick,
  width = 'max',
  maxWidth = '14rem',
  copyable = true,
  inspect = false,
  onStateChange,
}: {
  value?: string
  runKey?: number
  status?: PrStatus
  onStatusClick?: () => void
  width?: 'max' | 'fixed'
  maxWidth?: string
  copyable?: boolean
  inspect?: boolean
  onStateChange?: (state: IdReelState) => void
}) {
  const body = String(value)
    .trim()
    .replace(/^#/, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
  const kind: 'numeric' | 'text' = /^\d+$/.test(body) && body.length > 0 ? 'numeric' : 'text'
  const fullId = `#${body}`

  const pillRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  const [display, setDisplay] = useState({ head: body, tail: '', truncated: false })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    onStateChange?.({ kind, truncated: display.truncated, full: fullId, status: status ?? null })
  }, [kind, display.truncated, fullId, status, onStateChange])

  function budgetPx() {
    const pill = pillRef.current
    if (!pill) return 0
    const cs = getComputedStyle(pill)
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
    const gap = parseFloat(cs.columnGap || cs.gap) || 0
    const actionsW = actionsRef.current ? actionsRef.current.offsetWidth : 0
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const capPx = (parseFloat(cs.getPropertyValue('--id-max')) || 14) * rootPx
    let parentAvail = Infinity
    const parent = pill.parentElement
    if (parent) {
      const pcs = getComputedStyle(parent)
      parentAvail = parent.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight)
    }
    return Math.min(parentAvail, capPx) - padX - gap - actionsW - MEASURE_SAFETY
  }

  useLayoutEffect(() => {
    const cloneEl = measureRef.current
    if (!pillRef.current || !cloneEl) return undefined

    const widthOf = (text: string) => {
      cloneEl.textContent = text
      return cloneEl.scrollWidth
    }

    const measure = () => {
      const avail = budgetPx()
      if (avail <= 0) return

      let next
      if (body.length <= 2 || widthOf(fullId) <= avail) {
        next = { head: body, tail: '', truncated: false }
      } else {
        let lo = 2
        let hi = body.length - 1
        let keep = 2
        while (lo <= hi) {
          const mid = (lo + hi) >> 1
          const head = Math.ceil(mid / 2)
          const tail = mid - head
          if (widthOf(`#${body.slice(0, head)}…${body.slice(body.length - tail)}`) <= avail) {
            keep = mid
            lo = mid + 1
          } else {
            hi = mid - 1
          }
        }
        const head = Math.ceil(keep / 2)
        const tail = keep - head
        next = { head: body.slice(0, head), tail: body.slice(body.length - tail), truncated: true }
      }

      setDisplay((prev) =>
        prev.head === next.head && prev.tail === next.tail && prev.truncated === next.truncated
          ? prev
          : next,
      )
    }

    measure()
    const target = pillRef.current.parentElement || pillRef.current
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    observer?.observe(target)
    document.fonts?.ready?.then(measure).catch(() => {})
    return () => observer?.disconnect()
  }, [fullId, body, kind, status, copyable, maxWidth])

  async function copy() {
    try {
      await navigator.clipboard.writeText(fullId)
      playClickSound()
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // clipboard blocked (insecure context / denied) — no-op
    }
  }

  const headDigits = display.head.split('')
  const tailDigits = display.tail.split('')
  const statusStyle = status ? STATUS_STYLES[status] : null

  const ellipsisClass = `text-(--color-muted) px-[0.06em]${inspect ? ' outline outline-[1.5px] outline-dashed outline-[#f59e0b] outline-offset-1 rounded-[2px]' : ''}`

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={pillRef}
        layout="position"
        transition={{ duration: 0.22, ease: EASE }}
        onMouseEnter={() => playHoverSound()}
        className={[
          'relative inline-flex items-center gap-2.5 max-w-[min(100%,var(--id-max))] py-2 pl-3.5 pr-2.5 rounded-xl border transition-[border-color] duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none',
          'bg-(--color-surface) text-(--color-fg)',
          width === 'fixed' ? 'w-[min(100%,var(--id-max))]' : 'w-fit',
          inspect
            ? 'border-dashed border-[#3b82f6]'
            : 'border-(--color-border) hover:border-(--color-border-strong)',
        ].join(' ')}
        style={{ '--id-max': maxWidth } as CSSProperties}
        data-kind={kind}
      >
        <div
          className={[
            'relative flex items-center min-w-0',
            width === 'fixed' ? 'flex-1' : 'flex-[0_1_auto]',
            inspect ? 'overflow-visible' : '[overflow:clip] [overflow-clip-margin:0.3em]',
          ].join(' ')}
        >
          <span
            className={`inline-flex items-baseline min-w-0 leading-[1.09] ${VALUE_TYPE}`}
            title={fullId}
            aria-hidden="true"
          >
            <span className="mr-[0.06em] text-(--color-muted) font-medium">#</span>
            {kind === 'numeric' ? (
              <span className="inline-flex">
                {headDigits.map((digit, index) => (
                  <Reel
                    key={`h${index}-${digit}`}
                    digit={Number(digit)}
                    index={index}
                    runKey={runKey}
                    inspect={inspect && index === 0}
                  />
                ))}
                {display.truncated && <span className={ellipsisClass}>…</span>}
                {tailDigits.map((digit, index) => (
                  <Reel
                    key={`t${index}-${digit}`}
                    digit={Number(digit)}
                    index={headDigits.length + index}
                    runKey={runKey}
                    inspect={false}
                  />
                ))}
              </span>
            ) : (
              <motion.span
                className={`whitespace-nowrap${inspect ? ' outline outline-[1.5px] outline-dashed outline-[#ef4444]' : ''}`}
                key={`${display.head}|${display.tail}`}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.17, ease: EASE }}
              >
                {display.head}
                {display.truncated && <span className={ellipsisClass}>…</span>}
                {display.tail}
              </motion.span>
            )}
          </span>

          <span
            className={`absolute top-0 left-0 invisible pointer-events-none ${VALUE_TYPE}`}
            ref={measureRef}
            aria-hidden="true"
          />

          <span className="sr-only">Id {fullId}</span>

          {inspect && (
            <>
              <span className="absolute -top-[1.7rem] left-0 z-6 whitespace-nowrap rounded-sm border border-[#bfdbfe] bg-white px-[0.3125rem] py-[0.0625rem] text-[0.625rem] font-medium leading-normal tracking-[0.01em] text-[#2563eb] shadow-[0_1px_2px_rgba(0,0,0,0.08)] pointer-events-none">
                {width === 'fixed'
                  ? 'width: fixed'
                  : display.truncated
                    ? 'width: capped at max'
                    : 'width: fit-content'}
              </span>
              <span className="absolute -bottom-[1.7rem] left-0 z-6 whitespace-nowrap rounded-sm border border-[#fecaca] bg-white px-[0.3125rem] py-[0.0625rem] text-[0.625rem] font-medium leading-normal tracking-[0.01em] text-[#dc2626] shadow-[0_1px_2px_rgba(0,0,0,0.08)] pointer-events-none">
                {kind === 'numeric' ? 'reel · 1ch × 1em' : 'text · start … end'}
              </span>
              {display.truncated && (
                <span className="absolute -top-[1.7rem] right-0 z-6 whitespace-nowrap rounded-sm border border-[#fde68a] bg-white px-[0.3125rem] py-[0.0625rem] text-[0.625rem] font-medium leading-normal tracking-[0.01em] text-[#b45309] shadow-[0_1px_2px_rgba(0,0,0,0.08)] pointer-events-none">
                  middle dropped →
                </span>
              )}
            </>
          )}
        </div>

        {(statusStyle || copyable) && (
          <div className="flex-none inline-flex items-center gap-1" ref={actionsRef}>
            {statusStyle &&
              (onStatusClick ? (
                <button
                  type="button"
                  className={`grid place-items-center w-8 h-8 rounded-lg transition-[color,background-color,box-shadow,scale,filter] duration-(--motion-dur-fast) hover:brightness-95 active:scale-[0.96] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) ${statusStyle.className}`}
                  onClick={() => {
                    playClickSound()
                    onStatusClick()
                  }}
                  onMouseEnter={() => playHoverSound()}
                  aria-label={`Pull request status: ${statusStyle.label}. Click to change`}
                  title={`Pull request · ${statusStyle.label}`}
                >
                  <StatusIcon status={status!} Icon={statusStyle.Icon} />
                </button>
              ) : (
                <span
                  className={`grid place-items-center w-8 h-8 rounded-lg transition-[color,background-color] duration-(--motion-dur-fast) ${statusStyle.className}`}
                  role="img"
                  aria-label={`Pull request status: ${statusStyle.label}`}
                  title={`Pull request · ${statusStyle.label}`}
                >
                  <StatusIcon status={status!} Icon={statusStyle.Icon} />
                </span>
              ))}
            {copyable && (
              <button
                type="button"
                className="grid place-items-center w-8 h-8 rounded-lg text-(--color-muted) transition-[scale,background-color,color] duration-(--motion-dur-fast) hover:bg-(--color-surface-2) hover:text-(--color-fg) active:scale-[0.96] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)"
                onClick={copy}
                onMouseEnter={() => playHoverSound()}
                aria-label={copied ? 'Copied' : `Copy ${fullId}`}
              >
                <motion.span
                  className="[grid-area:1/1] inline-flex"
                  initial={false}
                  animate={copied ? ICON_HIDDEN : ICON_SHOWN}
                  transition={{ duration: 0.3, ease: EASE_ICON }}
                >
                  <CopyIcon />
                </motion.span>
                <motion.span
                  className="[grid-area:1/1] inline-flex text-(--color-success)"
                  initial={false}
                  animate={copied ? ICON_SHOWN : ICON_HIDDEN}
                  transition={{ duration: 0.3, ease: EASE_ICON }}
                >
                  <CheckIcon />
                </motion.span>
              </button>
            )}
          </div>
        )}
      </motion.div>
    </MotionConfig>
  )
}

function StatusIcon({ status, Icon }: { status: PrStatus; Icon: () => React.JSX.Element }) {
  return (
    <motion.span
      className="[grid-area:1/1] inline-flex"
      key={status}
      initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.3, ease: EASE_ICON }}
    >
      <Icon />
    </motion.span>
  )
}

function Reel({
  digit,
  index,
  runKey,
  inspect,
}: {
  digit: number
  index: number
  runKey: number
  inspect: boolean
}) {
  const reduced = useReducedMotion()
  const controls = useAnimationControls()
  const target = `${-(10 + digit)}em`

  useEffect(() => {
    if (runKey <= 0 || reduced) return
    controls.set({ y: '0em' })
    controls.start({ y: target, transition: { duration: 0.64, ease: EASE, delay: index * 0.055 } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey])

  return (
    <motion.span
      className={`relative w-[1ch] h-[1em] overflow-hidden text-center${inspect ? ' outline outline-[1.5px] outline-dashed outline-[#ef4444]' : ''}`}
      aria-hidden="true"
      initial={{ opacity: 0, filter: 'blur(2px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.17, ease: EASE }}
    >
      <motion.span className="flex flex-col" style={{ y: target }} animate={controls}>
        {REEL_FIGURES.map((n, i) => (
          <span className="h-[1em] leading-[1em]" key={i}>
            {n}
          </span>
        ))}
      </motion.span>
    </motion.span>
  )
}

const REEL_FIGURES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function GitBranch({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function PrOpenIcon() {
  return (
    <GitBranch>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </GitBranch>
  )
}

function PrMergedIcon() {
  return (
    <GitBranch>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </GitBranch>
  )
}

function PrClosedIcon() {
  return (
    <GitBranch>
      <circle cx="6" cy="6" r="3" />
      <path d="M6 9v12" />
      <path d="m21 3-6 6" />
      <path d="m21 9-6-6" />
      <circle cx="18" cy="18" r="3" />
    </GitBranch>
  )
}

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}
