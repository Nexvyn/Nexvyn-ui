'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

interface LensBox {
  x: number
  y: number
  w: number
  h: number
}

interface LensGap {
  x1: number
  y1: number
  x2: number
  y2: number
  lx: number
  ly: number
  label: string
}

const MAX_BOXES = 12
const MAX_GAPS = 6
const MIN_SIZE = 8
const MIN_GAP = 4
const REMEASURE_MS = 450

function collectBoxes(root: HTMLElement, panelRect: DOMRect): LensBox[] {
  const out: LensBox[] = []
  const walk = (el: Element, depth: number) => {
    if (depth > 2) return
    for (const child of Array.from(el.children)) {
      if (out.length >= MAX_BOXES * 2) break
      if (!(child instanceof HTMLElement)) continue
      const r = child.getBoundingClientRect()
      if (r.width >= MIN_SIZE && r.height >= MIN_SIZE) {
        out.push({
          x: r.left - panelRect.left,
          y: r.top - panelRect.top,
          w: r.width,
          h: r.height,
        })
      }
      walk(child, depth + 1)
    }
  }
  walk(root, 0)
  const pruned = out.filter(
    (box) =>
      !out.some(
        (other) =>
          other !== box &&
          other.x <= box.x - MIN_GAP &&
          other.y <= box.y - MIN_GAP &&
          other.x + other.w >= box.x + box.w + MIN_GAP &&
          other.y + other.h >= box.y + box.h + MIN_GAP,
      ),
  )
  return pruned.slice(0, MAX_BOXES)
}

function collectGaps(boxes: LensBox[]): LensGap[] {
  const gaps: LensGap[] = []
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i]
      const b = boxes[j]
      const vOverlap = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) >= Math.min(a.h, b.h) / 2
      const hOverlap = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) >= Math.min(a.w, b.w) / 2
      if (vOverlap) {
        const [left, right] = a.x + a.w / 2 < b.x + b.w / 2 ? [a, b] : [b, a]
        const gap = right.x - (left.x + left.w)
        if (gap >= MIN_GAP) {
          const y = (Math.max(left.y, b.y) + Math.min(left.y + left.h, b.y + b.h)) / 2
          gaps.push({
            x1: left.x + left.w,
            y1: y,
            x2: right.x,
            y2: y,
            lx: left.x + left.w + gap / 2,
            ly: y - 7,
            label: `${Math.round(gap)}`,
          })
        }
      } else if (hOverlap) {
        const [top, bottom] = a.y + a.h / 2 < b.y + b.h / 2 ? [a, b] : [b, a]
        const gap = bottom.y - (top.y + top.h)
        if (gap >= MIN_GAP) {
          const x = leftX(top, bottom)
          gaps.push({
            x1: x,
            y1: top.y + top.h,
            x2: x,
            y2: bottom.y,
            lx: x + 5,
            ly: top.y + top.h + gap / 2 - 4,
            label: `${Math.round(gap)}`,
          })
        }
      }
    }
  }
  return gaps
    .sort((p, q) => parseFloat(p.label) - parseFloat(q.label))
    .map((gap, index, all) => {
      const { lx } = gap
      let { ly } = gap
      for (let tries = 0; tries < 3; tries++) {
        const clash = all
          .slice(0, index)
          .some((other) => Math.hypot(other.lx - lx, other.ly - ly) < 30)
        if (!clash) break
        ly += 14
      }
      return { ...gap, lx, ly }
    })
    .slice(0, MAX_GAPS)
}

function leftX(top: LensBox, bottom: LensBox) {
  return (Math.max(top.x, bottom.x) + Math.min(top.x + top.w, bottom.x + bottom.w)) / 2
}

function smallestBoxAt(boxes: LensBox[], x: number, y: number): number | null {
  let best: number | null = null
  let bestArea = Infinity
  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i]
    if (x < b.x || x > b.x + b.w || y < b.y || y > b.y + b.h) continue
    const area = b.w * b.h
    if (area < bestArea) {
      bestArea = area
      best = i
    }
  }
  return best
}

export function BlueprintLens({
  panelRef,
  contentRef,
  active,
  diagram,
}: {
  panelRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  active: boolean
  diagram?: ReactNode
}) {
  const [boxes, setBoxes] = useState<LensBox[]>([])
  const [gaps, setGaps] = useState<LensGap[]>([])
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [fit, setFit] = useState<LensBox | null>(null)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const hasDiagram = diagram != null

  useEffect(() => {
    if (!active || !hasDiagram) return
    const panel = panelRef.current
    if (!panel) return
    const measure = () => {
      const content = contentRef.current
      if (!content) return
      const panelRect = panel.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      // Full-bleed wrappers mirror the content box, they say nothing about the component
      const found = collectBoxes(content, panelRect).filter(
        (b) => b.w < contentRect.width * 0.95 || b.h < contentRect.height * 0.95,
      )
      if (found.length === 0) {
        setFit({
          x: contentRect.left - panelRect.left,
          y: contentRect.top - panelRect.top,
          w: contentRect.width,
          h: contentRect.height,
        })
        return
      }
      let x1 = Infinity
      let y1 = Infinity
      let x2 = -Infinity
      let y2 = -Infinity
      for (const b of found) {
        x1 = Math.min(x1, b.x)
        y1 = Math.min(y1, b.y)
        x2 = Math.max(x2, b.x + b.w)
        y2 = Math.max(y2, b.y + b.h)
      }
      setFit({ x: x1, y: y1, w: x2 - x1, h: y2 - y1 })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active, hasDiagram, panelRef, contentRef])

  useEffect(() => {
    if (!active || hasDiagram) return
    const panel = panelRef.current
    if (!panel) return

    let latest: LensBox[] = []
    const measure = () => {
      const content = contentRef.current
      if (!content) return
      const panelRect = panel.getBoundingClientRect()
      latest = collectBoxes(content, panelRect)
      setBoxes(latest)
      setGaps(collectGaps(latest))
      const p = pointer.current
      setActiveIdx(p ? smallestBoxAt(latest, p.x, p.y) : null)
    }

    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (raf) return
      const { clientX, clientY } = e
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = panel.getBoundingClientRect()
        const p = { x: clientX - r.left, y: clientY - r.top }
        pointer.current = p
        setActiveIdx(smallestBoxAt(latest, p.x, p.y))
      })
    }

    measure()
    // Coalesce scroll/resize into one rAF so layout reads never queue behind every tick.
    let measureRaf = 0
    const scheduleMeasure = () => {
      if (measureRaf) return
      measureRaf = requestAnimationFrame(() => {
        measureRaf = 0
        measure()
      })
    }
    const interval = window.setInterval(measure, REMEASURE_MS)
    panel.addEventListener('pointermove', onMove)
    window.addEventListener('resize', scheduleMeasure, { passive: true })
    window.addEventListener('scroll', scheduleMeasure, { passive: true, capture: true })
    return () => {
      window.clearInterval(interval)
      panel.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('scroll', scheduleMeasure, true)
      if (raf) cancelAnimationFrame(raf)
      if (measureRaf) cancelAnimationFrame(measureRaf)
    }
  }, [active, hasDiagram, panelRef, contentRef])

  if (!active) return null

  const activeBox = activeIdx !== null ? boxes[activeIdx] : null

  return (
    <div
      aria-hidden="true"
      data-blueprint-lens
      className="pointer-events-none absolute inset-0 z-30 hidden animate-in fade-in overflow-hidden rounded-2xl duration-(--motion-dur-fast) [@media(hover:hover)]:block motion-reduce:animate-none"
    >
      <div
        className="absolute inset-0 size-full overflow-hidden"
        style={{
          WebkitMaskImage:
            'radial-gradient(circle 56px at var(--lx, -200px) var(--ly, -200px), black 90%, transparent 100%)',
          maskImage:
            'radial-gradient(circle 56px at var(--lx, -200px) var(--ly, -200px), black 90%, transparent 100%)',
        }}
      >
        {hasDiagram && (
          <>
            <div className="absolute inset-0 bg-(--color-surface)" />
            {fit && (
              // 220×140 = DraftSurface canvas, cover-fit to the live component's real bounds
              <div
                className="absolute left-0 top-0 flex items-center justify-center"
                style={{
                  width: 220,
                  height: 140,
                  transform: `translate(${fit.x + fit.w / 2 - 110}px, ${fit.y + fit.h / 2 - 70}px) scale(${Math.max(fit.w / 220, fit.h / 140)})`,
                }}
              >
                {diagram}
              </div>
            )}
          </>
        )}
        {!hasDiagram && (
          <svg className="size-full overflow-visible">
            {boxes.map((box, i) => (
              <g key={i}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  fill="none"
                  strokeWidth={1}
                  strokeDasharray={i === activeIdx ? undefined : '2 2'}
                  className="bp-box-in motion-reduce:animate-none"
                  style={{
                    stroke: 'var(--color-accent)',
                    animationDelay: `${Math.min(i, 8) * 20}ms`,
                  }}
                  opacity={i === activeIdx ? 0.9 : 0.55}
                />
                {i === activeIdx &&
                  (
                    [
                      [box.x, box.y],
                      [box.x + box.w, box.y],
                      [box.x, box.y + box.h],
                      [box.x + box.w, box.y + box.h],
                    ] as const
                  ).map(([hx, hy]) => (
                    <rect
                      key={`${hx}-${hy}`}
                      x={hx - 1.5}
                      y={hy - 1.5}
                      width={3}
                      height={3}
                      strokeWidth={1}
                      style={{ fill: 'var(--color-bg)', stroke: 'var(--color-accent)' }}
                      opacity={0.9}
                    />
                  ))}
              </g>
            ))}
            {gaps.map((gap, i) => {
              const pillW = 8 + gap.label.length * 5.5
              const horizontal = gap.y1 === gap.y2
              return (
                <g key={`g${i}`} strokeWidth={1} style={{ stroke: 'var(--color-accent)' }}>
                  <g opacity={0.8}>
                    <line x1={gap.x1} y1={gap.y1} x2={gap.x2} y2={gap.y2} />
                    {horizontal ? (
                      <>
                        <line x1={gap.x1} y1={gap.y1 - 3} x2={gap.x1} y2={gap.y1 + 3} />
                        <line x1={gap.x2} y1={gap.y2 - 3} x2={gap.x2} y2={gap.y2 + 3} />
                      </>
                    ) : (
                      <>
                        <line x1={gap.x1 - 3} y1={gap.y1} x2={gap.x1 + 3} y2={gap.y1} />
                        <line x1={gap.x2 - 3} y1={gap.y2} x2={gap.x2 + 3} y2={gap.y2} />
                      </>
                    )}
                  </g>
                  <rect
                    x={gap.lx - pillW / 2}
                    y={gap.ly - 7}
                    width={pillW}
                    height={12}
                    rx={2}
                    style={{
                      fill: 'var(--color-surface)',
                      stroke: 'var(--color-border)',
                      strokeWidth: 0.5,
                    }}
                  />
                  <text
                    x={gap.lx}
                    y={gap.ly + 2}
                    fontSize={8.5}
                    textAnchor="middle"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fill: 'var(--color-fg)',
                      stroke: 'none',
                      fontWeight: 400,
                    }}
                  >
                    {gap.label}
                  </text>
                </g>
              )
            })}
          </svg>
        )}
      </div>

      {/* Physical left/top on purpose: lens coordinates are measured from rect.left */}
      <div
        className="pointer-events-none absolute left-0 top-0 size-28 rounded-full border border-dashed"
        style={{
          transform: 'translate(var(--lx, -200px), var(--ly, -200px)) translate(-50%, -50%)',
          borderColor: 'var(--color-accent)',
          opacity: 0.75,
        }}
      >
        <span className="absolute left-1/2 top-0.5 h-2 w-px -translate-x-1/2 bg-(--color-accent)" />
        <span className="absolute left-1/2 bottom-0.5 h-2 w-px -translate-x-1/2 bg-(--color-accent)" />
        <span className="absolute top-1/2 left-0.5 h-px w-2 -translate-y-1/2 bg-(--color-accent)" />
        <span className="absolute top-1/2 right-0.5 h-px w-2 -translate-y-1/2 bg-(--color-accent)" />
        <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent)" />
        {activeBox && (
          <span
            className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-sm border px-1 py-px font-mono text-[9px] font-normal tabular-nums"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-fg)',
            }}
          >
            {Math.round(activeBox.w)}×{Math.round(activeBox.h)}
          </span>
        )}
      </div>
    </div>
  )
}
