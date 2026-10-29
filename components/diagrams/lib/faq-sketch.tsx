'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

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

export type FaqKind = 'accordion' | 'grouped' | 'numbered' | 'icons'

const W = 168
const LANE = 22
const BP_X = (220 - W - LANE) / 2 + LANE
const LINE_H = 3
const ROW = 13

const COPY = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40`
const QUESTION = `${DRAFT_INK_MORPH} fill-current opacity-45 group-hover:opacity-85 group-focus-visible:opacity-85`
const RULE = `${DRAFT_INK_MORPH} stroke-current opacity-60 group-hover:stroke-(--color-border) group-hover:opacity-100 group-focus-visible:stroke-(--color-border) group-focus-visible:opacity-100`
const REVEAL =
  'opacity-0 transition-opacity duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:delay-(--motion-dur-slow) group-focus-visible:delay-(--motion-dur-slow) motion-reduce:transition-none'
const TURN =
  'transition-[rotate] duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:rotate-180 group-focus-visible:rotate-180 group-hover:delay-(--motion-dur-slow) group-focus-visible:delay-(--motion-dur-slow) motion-reduce:transition-none'

function Bar({ x, y, w, question }: { x: number; y: number; w: number; question?: boolean }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={LINE_H}
      rx={1.5}
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${question ? QUESTION : COPY}`}
    />
  )
}

function Rule({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <path
      d={`M${x} ${y} H${x + w}`}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1}
      strokeWidth={draftTheme.guide.strokeWidth}
      style={beat(DRAFT_BEAT.outline)}
      className={`ink-draw ${RULE}`}
    />
  )
}

function Heading({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={11}
      fontFamily="var(--font-sans)"
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${DRAFT_TEXT_SOFT}`}
    >
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 13}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

function Chevron({ x, y, turn }: { x: number; y: number; turn?: boolean }) {
  return (
    <g
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      className={turn ? TURN : undefined}
    >
      <path
        d={`M${x - 2.5} ${y - 1.2} L${x} ${y + 1.3} L${x + 2.5} ${y - 1.2}`}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_INK_MORPH} stroke-current opacity-50`}
      />
    </g>
  )
}

function List({
  x,
  w,
  top,
  widths,
  open,
}: {
  x: number
  w: number
  top: number
  widths: number[]
  open?: boolean
}) {
  const openExtra = open ? 14 : 0
  const rows = widths.map((qw, i) => {
    const isOpen = open && i === 0
    const rowTop = top + i * ROW + (i > 0 ? openExtra : 0)
    const y = rowTop + ROW + (isOpen ? openExtra : 0)
    return (
      <g key={i}>
        <Bar x={x} y={rowTop + ROW / 2 - 1.5} w={qw} question />
        <Chevron x={x + w - 3} y={rowTop + ROW / 2} turn={isOpen} />
        {isOpen && (
          <g className={REVEAL}>
            <Bar x={x} y={rowTop + ROW + 1} w={w - 22} />
            <Bar x={x} y={rowTop + ROW + 7} w={w - 44} />
          </g>
        )}
        <Rule x={x} y={y} w={w} />
      </g>
    )
  })
  return (
    <>
      <Rule x={x} y={top} w={w} />
      {rows}
    </>
  )
}

function Split({ kind, top }: { kind: 'accordion' | 'grouped'; top: number }) {
  const leftW = 58
  const listX = BP_X + leftW + 12
  const listW = W - leftW - 12
  return (
    <>
      <Heading x={BP_X} y={top + 8} lines={['Frequently', 'asked']} />
      <Bar x={BP_X} y={top + 26} w={50} />
      <Bar x={BP_X} y={top + 32} w={38} />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={BP_X + 5 + i * 8}
          cy={top + 46}
          r={5}
          strokeWidth={draftTheme.guide.strokeWidth}
          style={beat(DRAFT_BEAT.anatomy)}
          className={`fade-note ${DRAFT_INK_MORPH} fill-(--color-bg) stroke-current opacity-60`}
        />
      ))}
      <Bar x={BP_X} y={top + 57} w={46} />
      {kind === 'accordion' ? (
        <List x={listX} w={listW} top={top} widths={[60, 48, 66, 40, 56]} open />
      ) : (
        <>
          <Bar x={listX} y={top} w={24} />
          <List x={listX} w={listW} top={top + 6} widths={[60, 48]} open />
          <Bar x={listX} y={top + 51} w={30} />
          <List x={listX} w={listW} top={top + 57} widths={[66, 40]} />
        </>
      )}
    </>
  )
}

function Grid({ kind, top }: { kind: 'numbered' | 'icons'; top: number }) {
  const colW = (W - 16) / 3
  return (
    <>
      <Heading x={BP_X} y={top + 8} lines={['Frequently asked']} />
      <Bar x={BP_X} y={top + 14} w={64} />
      <Bar x={BP_X + W - 50} y={top + 14} w={50} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = BP_X + (i % 3) * (colW + 8)
        const y = top + 26 + Math.floor(i / 3) * 34
        return (
          <g key={i}>
            <Rule x={x} y={y} w={colW} />
            {kind === 'numbered' ? (
              <text
                x={x}
                y={y + 9}
                fontSize={7}
                fontFamily="var(--font-mono)"
                style={beat(DRAFT_LABEL_BEAT)}
                className={`fade-note ${DRAFT_TEXT_SOFT}`}
              >
                {`0${i + 1}`}
              </text>
            ) : (
              <rect
                x={x}
                y={y + 4}
                width={6}
                height={6}
                rx={1.5}
                strokeWidth={0.9}
                style={beat(DRAFT_LABEL_BEAT)}
                className={`fade-note ${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-60`}
              />
            )}
            <Bar x={x} y={y + 15} w={colW - 8} question />
            <Bar x={x} y={y + 21} w={colW - 2} />
            <Bar x={x} y={y + 26} w={colW - 14} />
          </g>
        )
      })}
    </>
  )
}

const NOTES: Record<FaqKind, string> = {
  accordion: 'lg 1fr + 1.6fr · rows hairline · one open',
  grouped: 'lg 1fr + 1.6fr · label per group',
  numbered: 'lg 3 cols · rule pt 20 · gap 40',
  icons: 'lg 3 cols · icon 18 · gap 40',
}

export function FaqBlueprint({ kind }: { kind: FaqKind }) {
  const grid = kind === 'numbered' || kind === 'icons'
  const h = grid ? 94 : 86
  const top = (153 - h) / 2

  return (
    <DraftSurface>
      {grid ? <Grid kind={kind} top={top} /> : <Split kind={kind} top={top} />}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP_X} y={top - 4} w={W} h={h} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + W}
          y={top - 14}
          label="max 1024"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={top - 4}
          y2={top - 4 + h}
          label="auto"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X}
          y={top - 4 + h + 12}
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
