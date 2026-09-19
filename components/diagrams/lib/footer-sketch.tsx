'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import type { ReactNode } from 'react'
import {
  DraftSurface,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

export type FooterKind = 'simple' | 'columns' | 'centered'

const W = 172
const LANE = 18
const PAD = 12
const BP_X = (220 - W - LANE) / 2 + LANE
const RIGHT = BP_X + W - PAD
const LINK_H = 3

const HEIGHT: Record<FooterKind, number> = { simple: 44, columns: 92, centered: 84 }

const BORDER = `${DRAFT_INK_MORPH} stroke-current group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`
const LINK = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40`
const LINK_LIT = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-90 group-focus-visible:opacity-90 group-hover:delay-(--motion-dur-slow) group-focus-visible:delay-(--motion-dur-slow)`
const TITLE = `${DRAFT_INK_MORPH} fill-current opacity-45 group-hover:opacity-80 group-focus-visible:opacity-80`
const ICON = `${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-50 group-hover:opacity-80 group-focus-visible:opacity-80`

function Bar({
  x,
  y,
  w,
  lit,
  title,
}: {
  x: number
  y: number
  w: number
  lit?: boolean
  title?: boolean
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={LINK_H}
      rx={1.5}
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${lit ? LINK_LIT : title ? TITLE : LINK}`}
    />
  )
}

function Brand({ x, y, anchor = 'start' }: { x: number; y: number; anchor?: 'start' | 'middle' }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={11}
      textAnchor={anchor}
      fontFamily="var(--font-sans)"
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${DRAFT_TEXT_SOFT}`}
    >
      Nexvyn UI
    </text>
  )
}

function Icons({ x, y }: { x: number; y: number }) {
  return (
    <>
      {[0, 1].map((i) => (
        <rect
          key={i}
          x={x + i * 14}
          y={y}
          width={10}
          height={10}
          rx={3}
          strokeWidth={draftTheme.guide.strokeWidth}
          style={beat(DRAFT_BEAT.anatomy)}
          className={`fade-note ${ICON}`}
        />
      ))}
    </>
  )
}

function Row({
  widths,
  end,
  y,
  gap = 8,
  lit = 0,
}: {
  widths: number[]
  end: number
  y: number
  gap?: number
  lit?: number
}) {
  const total = widths.reduce((sum, w) => sum + w, 0) + gap * (widths.length - 1)
  const starts = widths.map(
    (_, i) => end - total + widths.slice(0, i).reduce((sum, w) => sum + w + gap, 0),
  )
  return (
    <>
      {widths.map((w, i) => (
        <Bar key={i} x={starts[i]} y={y} w={w} lit={i === lit} />
      ))}
    </>
  )
}

function Simple({ top }: { top: number }) {
  const mid = top + HEIGHT.simple / 2
  return (
    <>
      <Brand x={BP_X + PAD} y={mid + 1} />
      <Bar x={BP_X + PAD} y={mid + 6} w={34} />
      <Row widths={[22, 16, 12, 20]} end={RIGHT} y={mid - 1.5} />
    </>
  )
}

function Columns({ top }: { top: number }) {
  const unit = (W - PAD * 2 - 3 * 8) / 4.4
  const colX = (i: number) => BP_X + PAD + unit * 1.4 + 8 + i * (unit + 8)
  const sepY = top + 66
  return (
    <>
      <Brand x={BP_X + PAD} y={top + 18} />
      <Bar x={BP_X + PAD} y={top + 25} w={36} />
      <Bar x={BP_X + PAD} y={top + 31} w={28} />
      <Icons x={BP_X + PAD} y={top + 40} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Bar x={colX(i)} y={top + 12} w={18} title />
          {[22, 16, 20].map((w, j) => (
            <Bar key={j} x={colX(i)} y={top + 21 + j * 7} w={w} lit={i === 0 && j === 0} />
          ))}
        </g>
      ))}
      <path
        d={`M${BP_X + PAD} ${sepY} H${RIGHT}`}
        strokeWidth={draftTheme.guide.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${BORDER}`}
      />
      <Bar x={BP_X + PAD} y={sepY + 11} w={34} />
      <Row widths={[14, 12]} end={RIGHT} y={sepY + 11} lit={-1} />
    </>
  )
}

function Centered({ top }: { top: number }) {
  const cx = BP_X + W / 2
  const widths = [20, 14, 22, 10, 18]
  const total = widths.reduce((sum, w) => sum + w, 0) + 8 * (widths.length - 1)
  return (
    <>
      <Brand x={cx} y={top + 22} anchor="middle" />
      <Row widths={widths} end={cx + total / 2} y={top + 32} />
      <Icons x={cx - 12} y={top + 44} />
      <Bar x={cx - 20} y={top + 66} w={40} />
    </>
  )
}

const NOTES: Record<FooterKind, string> = {
  simple: 'border-t · py 32 · links gap 24',
  columns: 'border-t · 1.4fr + 3 cols · py 48',
  centered: 'border-t · py 48 · gap 24 · icons 44',
}

export function FooterBlueprint({ kind }: { kind: FooterKind }) {
  const theme = draftTheme
  const h = HEIGHT[kind]
  const top = (140 - h) / 2 - 4
  const bottom = top + h
  let body: ReactNode = null
  if (kind === 'simple') body = <Simple top={top} />
  if (kind === 'columns') body = <Columns top={top} />
  if (kind === 'centered') body = <Centered top={top} />

  return (
    <DraftSurface>
      <path
        d={`M${BP_X} ${top} H${BP_X + W}`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${BORDER}`}
      />
      {body}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <path
          d={`M${BP_X} ${top} V${bottom} H${BP_X + W} V${top}`}
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
          style={beat(DRAFT_BEAT.guide)}
          className="dash-march"
        />
        <InsetGuide
          x={BP_X + PAD}
          y={top + 6}
          w={W - PAD * 2}
          h={h - 12}
          offset={0.8}
          boxX={BP_X}
          boxY={top}
          boxW={W}
          boxH={h}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame x={BP_X} y={top} w={W} h={h} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + W}
          y={top - 10}
          label="w-full"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={top}
          y2={bottom}
          label="auto"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X}
          y={bottom + 12}
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
