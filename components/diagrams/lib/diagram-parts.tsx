// SPDX-License-Identifier: CC-BY-NC-4.0
// Shared drawing primitives for components/diagrams/* — licensed separately
// from the rest of this repository under CC BY-NC 4.0.
// See components/diagrams/LICENSE. NOT covered by the root MIT LICENSE.

import { type CSSProperties, type ReactNode, useId } from 'react'
const MONO = 'var(--font-mono)'

export const DRAFT_INK_MORPH =
  'transition-[fill,stroke,fill-opacity,stroke-opacity,opacity] duration-(--motion-dur-slow) group-hover:duration-(--motion-dur-showcase) group-focus-visible:duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none'

export const DRAFT_SCAFFOLD_FADE =
  'transition-opacity duration-(--motion-dur-slow) group-hover:duration-(--motion-dur-showcase) group-focus-visible:duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) delay-(--motion-dur-base) group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none'

export const DRAFT_BEAT = {
  outline: '0ms',
  anatomy: '200ms',
  guide: '350ms',
  hatch: '500ms',
  note: '550ms',
  handle: '600ms',
} as const

export const DRAFT_STAMP_STAGGER = '70ms' as const

export function stampBeat(n: number): string {
  const base = Number.parseInt(DRAFT_BEAT.note, 10)
  return `${base + n * Number.parseInt(DRAFT_STAMP_STAGGER, 10)}ms`
}

export const DRAFT_LABEL_BEAT = '400ms' as const

export const DRAFT_LABEL_ALT_BEAT = '460ms' as const

export const DRAFT_DETAIL_BEAT = {
  a: '200ms',
  b: '260ms',
  c: '300ms',
  d: '350ms',
} as const

export function beat(v: string): CSSProperties {
  return { '--beat': v } as CSSProperties
}

function morphSurface(hoverFill: string, hoverStroke: string) {
  return `${DRAFT_INK_MORPH} fill-transparent stroke-current ${hoverFill} ${hoverStroke}`
}

export const DRAFT_FILL_SOLID = morphSurface(
  'group-hover:fill-(--color-fg) group-focus-visible:fill-(--color-fg)',
  'group-hover:stroke-transparent group-focus-visible:stroke-transparent',
)

export const DRAFT_FILL_PANEL = morphSurface(
  'group-hover:fill-(--color-popover) group-focus-visible:fill-(--color-popover)',
  'group-hover:stroke-(--color-border-strong) group-focus-visible:stroke-(--color-border-strong)',
)

export const DRAFT_FILL_MUTED = morphSurface(
  'group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2)',
  'group-hover:stroke-transparent group-focus-visible:stroke-transparent',
)

export const DRAFT_TEXT_HOLLOW = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-current group-focus-visible:fill-current group-hover:stroke-transparent group-focus-visible:stroke-transparent`

export const DRAFT_TEXT_ON_SOLID = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg) group-hover:stroke-transparent group-focus-visible:stroke-transparent`

export const DRAFT_TEXT_ON_PANEL = DRAFT_TEXT_HOLLOW

export const DRAFT_TEXT_SOFT = `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`

export type DraftTheme = {
  wireframe: {
    strokeWidth: number
    textStrokeWidth: number
    strokeOpacity: number
    textOpacity: number
  }
  guide: {
    strokeWidth: number
    dimOpacity: number
    labelOpacity: number
    structOpacity: number
  }
  selection: {
    strokeWidth: number
    handleStrokeWidth: number
    opacity: number
    handleOpacity: number
  }
}

export const draftTheme: DraftTheme = {
  wireframe: {
    strokeWidth: 1.25,
    textStrokeWidth: 0.9,
    strokeOpacity: 0.85,
    textOpacity: 0.9,
  },
  guide: {
    strokeWidth: 0.75,
    dimOpacity: 0.3,
    labelOpacity: 0.5,
    structOpacity: 0.5,
  },
  selection: {
    strokeWidth: 0.75,
    handleStrokeWidth: 1,
    opacity: 0.5,
    handleOpacity: 0.8,
  },
}

export function DraftSurface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 140"
      width={220}
      height={140}
      fill="none"
      overflow="visible"
      className={`blueprint overflow-visible text-(--color-fg)/80 ${className ?? ''}`}
    >
      {children}
    </svg>
  )
}

export function MeasureNote({
  x,
  y,
  anchor = 'middle',
  className,
  style,
  children,
}: {
  x: number
  y: number
  anchor?: 'start' | 'middle' | 'end'
  className?: string
  style?: CSSProperties
  children: string
}) {
  const theme = draftTheme
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={7}
      fontFamily={MONO}
      fill="currentColor"
      opacity={theme.guide.labelOpacity}
      className={`note-lift note-measure ${className ?? ''}`}
      style={style}
    >
      {children}
    </text>
  )
}

export function MeasureH({
  x1,
  x2,
  y,
  label,
  labelYOffset = -3,
  className,
  style,
}: {
  x1: number
  x2: number
  y: number
  label: string
  labelYOffset?: number
  className?: string
  style?: CSSProperties
}) {
  const theme = draftTheme
  return (
    <g className={className} style={style}>
      <g
        stroke="currentColor"
        strokeWidth={theme.guide.strokeWidth}
        opacity={theme.guide.dimOpacity}
        // dim-draw — tape-measure unroll on hover, defined in globals.css.
        className="dim-draw"
      >
        <line pathLength={1} x1={x1} y1={y - 3} x2={x1} y2={y + 3} />
        <line pathLength={1} x1={x2} y1={y - 3} x2={x2} y2={y + 3} />
        <line pathLength={1} x1={x1} y1={y} x2={x2} y2={y} />
      </g>
      <MeasureNote x={(x1 + x2) / 2} y={y + labelYOffset}>
        {label}
      </MeasureNote>
    </g>
  )
}

export function MeasureV({
  x,
  y1,
  y2,
  label,
  labelXOffset = -5,
  labelAnchor = 'end',
  className,
  style,
}: {
  x: number
  y1: number
  y2: number
  label: string
  labelXOffset?: number
  labelAnchor?: 'start' | 'middle' | 'end'
  className?: string
  style?: CSSProperties
}) {
  const theme = draftTheme
  return (
    <g className={className} style={style}>
      <g
        stroke="currentColor"
        strokeWidth={theme.guide.strokeWidth}
        opacity={theme.guide.dimOpacity}
        // dim-draw — tape-measure unroll on hover, defined in globals.css.
        className="dim-draw"
      >
        <line pathLength={1} x1={x - 3} y1={y1} x2={x + 3} y2={y1} />
        <line pathLength={1} x1={x - 3} y1={y2} x2={x + 3} y2={y2} />
        <line pathLength={1} x1={x} y1={y1} x2={x} y2={y2} />
      </g>
      <MeasureNote x={x + labelXOffset} y={(y1 + y2) / 2 + 2.5} anchor={labelAnchor}>
        {label}
      </MeasureNote>
    </g>
  )
}

export function InsetGuide({
  x,
  y,
  w,
  h,
  offset = 0,
  boxX,
  boxY,
  boxW,
  boxH,
  boxRx = 0,
  clipOffset = 0,
  className,
  style,
}: {
  x: number
  y: number
  w: number
  h: number
  offset?: number
  boxX?: number
  boxY?: number
  boxW?: number
  boxH?: number
  boxRx?: number
  clipOffset?: number
  className?: string
  style?: CSSProperties
}) {
  const clipId = useId()
  const theme = draftTheme

  const stroke = 'var(--color-accent)'
  const strokeDasharray = '2 2'

  const ix = x - offset
  const iy = y - offset
  const iw = w + offset * 2
  const ih = h + offset * 2

  if (boxX !== undefined && boxY !== undefined && boxW !== undefined && boxH !== undefined) {
    const cx = boxX + clipOffset
    const cy = boxY + clipOffset
    const cw = boxW - clipOffset * 2
    const ch = boxH - clipOffset * 2
    const crx = Math.max(0, boxRx - clipOffset)

    return (
      <g className={className} style={style}>
        <defs>
          <clipPath id={clipId}>
            <rect x={cx} y={cy} width={cw} height={ch} rx={crx} />
          </clipPath>
        </defs>
        <g
          clipPath={`url(#${clipId})`}
          stroke={stroke}
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray={strokeDasharray}
          opacity={theme.guide.structOpacity}
        >
          <line x1={cx} y1={iy} x2={cx + cw} y2={iy} />
          <line x1={cx} y1={iy + ih} x2={cx + cw} y2={iy + ih} />
          <line x1={ix} y1={cy} x2={ix} y2={cy + ch} />
          <line x1={ix + iw} y1={cy} x2={ix + iw} y2={cy + ch} />
        </g>
      </g>
    )
  }

  return (
    <rect
      x={ix}
      y={iy}
      width={iw}
      height={ih}
      stroke={stroke}
      strokeWidth={theme.guide.strokeWidth}
      strokeDasharray={strokeDasharray}
      opacity={theme.guide.structOpacity}
      className={className}
      style={style}
    />
  )
}

export function GripFrame({
  x,
  y,
  w,
  h,
  className,
  style,
}: {
  x: number
  y: number
  w: number
  h: number
  className?: string
  style?: CSSProperties
}) {
  const theme = draftTheme

  const offset = 1
  const sx = x - offset
  const sy = y - offset
  const sw = w + offset * 2
  const sh = h + offset * 2

  const s = 3
  const corners: [number, number][] = [
    [sx, sy],
    [sx + sw, sy],
    [sx, sy + sh],
    [sx + sw, sy + sh],
  ]
  return (
    <g className={className} style={style}>
      <rect
        x={sx}
        y={sy}
        width={sw}
        height={sh}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={theme.selection.strokeWidth}
        opacity={theme.selection.opacity}
      />
      {corners.map(([cx, cy]) => (
        <rect
          key={`${cx}-${cy}`}
          x={cx - s / 2}
          y={cy - s / 2}
          width={s}
          height={s}
          fill="var(--color-bg)"
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.selection.handleStrokeWidth}
          opacity={theme.selection.handleOpacity}
          className="handle-pop"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </g>
  )
}

export function squirclePillPath(x: number, y: number, w: number, h: number) {
  const r = h / 2
  const k = 0.92
  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `C ${x + w - r + k * r} ${y}, ${x + w} ${y + r - k * r}, ${x + w} ${y + r}`,
    `C ${x + w} ${y + r + k * r}, ${x + w - r + k * r} ${y + h}, ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `C ${x + r - k * r} ${y + h}, ${x} ${y + r + k * r}, ${x} ${y + r}`,
    `C ${x} ${y + r - k * r}, ${x + r - k * r} ${y}, ${x + r} ${y}`,
    'Z',
  ].join(' ')
}

export function squircleRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  rBottom = r,
) {
  const rt = Math.min(r, h / 2)
  const rb = Math.min(rBottom, h / 2)
  const k = 0.92
  return [
    `M ${x + rt} ${y}`,
    `H ${x + w - rt}`,
    `C ${x + w - rt + k * rt} ${y}, ${x + w} ${y + rt - k * rt}, ${x + w} ${y + rt}`,
    `V ${y + h - rb}`,
    `C ${x + w} ${y + h - rb + k * rb}, ${x + w - rb + k * rb} ${y + h}, ${x + w - rb} ${y + h}`,
    `H ${x + rb}`,
    `C ${x + rb - k * rb} ${y + h}, ${x} ${y + h - rb + k * rb}, ${x} ${y + h - rb}`,
    `V ${y + rt}`,
    `C ${x} ${y + rt - k * rt}, ${x + rt - k * rt} ${y}, ${x + rt} ${y}`,
    'Z',
  ].join(' ')
}
