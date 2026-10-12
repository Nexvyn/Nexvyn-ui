'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useId, type CSSProperties } from 'react'
import {
  DraftSurface,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

export type LogosKind = 'grid' | 'reveal' | 'hover' | 'marquee'

const W = 176
const LANE = 18
const BP_X = (220 - W - LANE) / 2 + LANE
const TOP = 28
const GRID_Y = TOP + 22
const CELL_W = W / 4
const CELL_H = 22
const ROW_Y = GRID_Y + 4
const ROW_H = 24
const STEP = 36

const MARKS = [
  { w: 10, h: 9 },
  { w: 18, h: 6 },
  { w: 9, h: 9 },
  { w: 22, h: 6 },
  { w: 10, h: 9 },
  { w: 16, h: 6 },
  { w: 9, h: 9 },
  { w: 20, h: 6 },
]

const COPY = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40`
const MARK = `${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-60 group-hover:fill-current group-hover:stroke-transparent group-hover:opacity-70 group-focus-visible:fill-current group-focus-visible:stroke-transparent group-focus-visible:opacity-70`
const LINE = `${DRAFT_INK_MORPH} stroke-current opacity-60 group-hover:stroke-(--color-border) group-hover:opacity-100 group-focus-visible:stroke-(--color-border) group-focus-visible:opacity-100`
const RISE =
  'translate-y-1 opacity-30 transition-[translate,opacity] duration-(--motion-dur-showcase) ease-(--motion-ease-out) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none'
const RECEDE =
  'transition-[scale,opacity] duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-slow) group-focus-visible:delay-(--motion-dur-slow) group-hover:scale-95 group-hover:opacity-40 group-focus-visible:scale-95 group-focus-visible:opacity-40 motion-reduce:transition-none'
const LINK_IN =
  'translate-y-1 opacity-0 transition-[translate,opacity] duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:delay-(--motion-dur-showcase) group-focus-visible:delay-(--motion-dur-showcase) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none'
const DRIFT =
  'transition-[translate] duration-(--motion-dur-ambient) ease-(--motion-ease-in-out) group-hover:-translate-x-9 group-focus-visible:-translate-x-9 motion-reduce:transition-none'

function Mark({ cx, cy, index }: { cx: number; cy: number; index: number }) {
  const { w, h } = MARKS[index % MARKS.length]
  return (
    <rect
      x={cx - w / 2}
      y={cy - h / 2}
      width={w}
      height={h}
      rx={2}
      strokeWidth={draftTheme.guide.strokeWidth + 0.25}
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${MARK}`}
    />
  )
}

function Line({ d }: { d: string }) {
  return (
    <path
      d={d}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1}
      strokeWidth={draftTheme.guide.strokeWidth}
      style={beat(DRAFT_BEAT.outline)}
      className={`ink-draw ${LINE}`}
    />
  )
}

function Header() {
  return (
    <>
      <text
        x={BP_X}
        y={TOP + 8}
        fontSize={10}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Built on the tools
      </text>
      <rect
        x={BP_X}
        y={TOP + 13}
        width={78}
        height={2.5}
        rx={1.25}
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${COPY}`}
      />
    </>
  )
}

function Grid({ kind }: { kind: Exclude<LogosKind, 'marquee'> }) {
  const cells = MARKS.map((_, i) => ({
    cx: BP_X + (i % 4) * CELL_W + CELL_W / 2,
    cy: GRID_Y + Math.floor(i / 4) * CELL_H + CELL_H / 2,
  }))
  const marks = cells.map(({ cx, cy }, i) =>
    kind === 'reveal' ? (
      <g
        key={i}
        className={RISE}
        style={{ transitionDelay: `calc(var(--motion-dur-instant) * ${i + 4})` }}
      >
        <Mark cx={cx} cy={cy} index={i} />
      </g>
    ) : (
      <Mark key={i} cx={cx} cy={cy} index={i} />
    ),
  )
  const recedeOrigin: CSSProperties = { transformBox: 'fill-box', transformOrigin: 'center' }

  return (
    <>
      {kind === 'grid' && (
        <rect
          x={BP_X + CELL_W + 0.5}
          y={GRID_Y + 0.5}
          width={CELL_W - 1}
          height={CELL_H - 1}
          style={beat(DRAFT_BEAT.anatomy)}
          className={`fade-note ${DRAFT_INK_MORPH} fill-transparent group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2)`}
        />
      )}
      <rect
        x={BP_X}
        y={GRID_Y}
        width={W}
        height={CELL_H * 2}
        rx={3}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={draftTheme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`}
      />
      <Line d={`M${BP_X} ${GRID_Y + CELL_H} H${BP_X + W}`} />
      {[1, 2, 3].map((c) => (
        <Line key={c} d={`M${BP_X + c * CELL_W} ${GRID_Y} V${GRID_Y + CELL_H * 2}`} />
      ))}
      {kind === 'hover' ? (
        <>
          <g className={RECEDE} style={recedeOrigin}>
            {marks}
          </g>
          <g className={LINK_IN}>
            <rect
              x={BP_X + W / 2 - 25}
              y={GRID_Y + CELL_H - 6}
              width={50}
              height={12}
              rx={2.5}
              strokeWidth={draftTheme.guide.strokeWidth + 0.25}
              className="fill-(--color-bg) stroke-(--color-border-strong)"
            />
            <text
              x={BP_X + W / 2}
              y={GRID_Y + CELL_H + 2.5}
              fontSize={7}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              className="fill-current"
            >
              Full stack
            </text>
          </g>
        </>
      ) : (
        marks
      )}
    </>
  )
}

function Marquee() {
  const fadeId = `bp-logos-fade-${useId().replace(/:/g, '')}`
  const cy = ROW_Y + ROW_H / 2
  const count = Math.ceil(W / STEP) + 2

  return (
    <>
      <defs>
        <linearGradient id={`${fadeId}-ramp`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity={0} />
          <stop offset="0.15" stopColor="currentColor" stopOpacity={1} />
          <stop offset="0.85" stopColor="currentColor" stopOpacity={1} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
        <mask id={fadeId} style={{ maskType: 'alpha' }}>
          <rect x={BP_X} y={ROW_Y} width={W} height={ROW_H} fill={`url(#${fadeId}-ramp)`} />
        </mask>
      </defs>
      <Line d={`M${BP_X} ${ROW_Y} H${BP_X + W}`} />
      <Line d={`M${BP_X} ${ROW_Y + ROW_H} H${BP_X + W}`} />
      <g mask={`url(#${fadeId})`}>
        <g className={DRIFT}>
          {Array.from({ length: count }, (_, i) => (
            <Mark key={i} cx={BP_X + 14 + i * STEP} cy={cy} index={i} />
          ))}
        </g>
      </g>
    </>
  )
}

const NOTES: Record<LogosKind, string> = {
  grid: 'cols 2 · sm 4 · cell h96 · gap 1',
  reveal: 'once in view · stagger 50 · 700 out',
  hover: 'hover or focus · scale 95 · link in',
  marquee: 'list x2 · copy aria-hidden · edge mask',
}

export function LogosBlueprint({ kind }: { kind: LogosKind }) {
  const marquee = kind === 'marquee'
  const bodyY = marquee ? ROW_Y : GRID_Y
  const bodyH = marquee ? ROW_H : CELL_H * 2

  return (
    <DraftSurface>
      <Header />
      {marquee ? <Marquee /> : <Grid kind={kind} />}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP_X} y={bodyY} w={W} h={bodyH} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + W}
          y={TOP - 12}
          label="max 1024"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 10}
          y1={bodyY}
          y2={marquee ? bodyY + bodyH : bodyY + CELL_H}
          label={marquee ? '48' : '96'}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X}
          y={bodyY + bodyH + 14}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {NOTES[kind]}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
