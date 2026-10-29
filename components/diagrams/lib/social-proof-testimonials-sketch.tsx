'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useId } from 'react'
import {
  DraftSurface,
  DRAFT_FILL_MUTED,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

export type TestimonialsKind = 'grid' | 'marquee'

const W = 174
const BP_X = (220 - W - 18) / 2 + 18
const TOP = 26
const CARDS_Y = TOP + 22
const GAP = 6
const COL_W = (W - GAP * 2) / 3
const MARQUEE_CARD_W = 46
const MARQUEE_CARD_H = 26
const MARQUEE_PITCH = MARQUEE_CARD_W + GAP
const ROW_2_Y = CARDS_Y + MARQUEE_CARD_H + 5
const CLIP_X = 18
const CLIP_W = 184

const COPY = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40`
const AVATAR = `${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-60 group-hover:fill-current group-hover:stroke-transparent group-hover:opacity-30 group-focus-visible:fill-current group-focus-visible:stroke-transparent group-focus-visible:opacity-30`
const REVEAL =
  'translate-y-1 opacity-40 transition-[opacity,translate] duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-(--motion-dur-slow) group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-slow) motion-reduce:transition-none motion-reduce:translate-none'
const DRIFT =
  'transition-[translate] duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:translate-none'

function Bar({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={2.5}
      rx={1.25}
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${COPY}`}
    />
  )
}

function Card({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={draftTheme.guide.strokeWidth + 0.25}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_MUTED}`}
      />
      <Bar x={x + 5} y={y + 5} w={w - 10} />
      <Bar x={x + 5} y={y + 10} w={w - 18} />
      {h > 27 && <Bar x={x + 5} y={y + 15} w={w - 14} />}
      <circle
        cx={x + 8}
        cy={y + h - 7}
        r={3}
        strokeWidth={draftTheme.guide.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${AVATAR}`}
      />
      <Bar x={x + 13} y={y + h - 8.25} w={Math.min(20, w - 18)} />
    </g>
  )
}

function Heading({ title }: { title: string }) {
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
        {title}
      </text>
      <Bar x={BP_X} y={TOP + 13} w={60} />
    </>
  )
}

const COLUMNS: [number, number][] = [
  [30, 24],
  [24, 30],
  [27, 27],
]

function Grid() {
  return (
    <>
      <Heading title="What teams say" />
      {COLUMNS.map(([first, second], i) => {
        const x = BP_X + i * (COL_W + GAP)
        return (
          <g key={i}>
            <Card x={x} y={CARDS_Y} w={COL_W} h={first} />
            <g style={{ transformBox: 'fill-box' }} className={REVEAL}>
              <Card x={x} y={CARDS_Y + first + 5} w={COL_W} h={second} />
            </g>
          </g>
        )
      })}
    </>
  )
}

function PauseButton() {
  const x = BP_X + W - 18
  const y = TOP + 1
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={18}
        height={11}
        rx={2.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={draftTheme.guide.strokeWidth + 0.25}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-(--color-border-strong) group-focus-visible:stroke-(--color-border-strong)`}
      />
      <rect
        x={x + 6.5}
        y={y + 3}
        width={1.5}
        height={5}
        rx={0.75}
        className={`fade-note ${COPY}`}
      />
      <rect x={x + 10} y={y + 3} width={1.5} height={5} rx={0.75} className={`fade-note ${COPY}`} />
    </g>
  )
}

function Row({ y, offset, drift }: { y: number; offset: number; drift: string }) {
  return (
    <g className={`${DRIFT} ${drift}`}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Card
          key={i}
          x={CLIP_X - 20 + offset + i * MARQUEE_PITCH}
          y={y}
          w={MARQUEE_CARD_W}
          h={MARQUEE_CARD_H}
        />
      ))}
    </g>
  )
}

function Marquee() {
  const id = useId().replace(/:/g, '')
  const clipId = `bp-testimonials-clip-${id}`
  const fadeId = `bp-testimonials-fade-${id}`
  const rowsH = ROW_2_Y + MARQUEE_CARD_H - CARDS_Y
  const edge = 20 / CLIP_W

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x={CLIP_X} y={CARDS_Y - 2} width={CLIP_W} height={rowsH + 4} />
        </clipPath>
        <linearGradient id={`${fadeId}-ramp`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity={0} />
          <stop offset={edge} stopColor="currentColor" stopOpacity={1} />
          <stop offset={1 - edge} stopColor="currentColor" stopOpacity={1} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
        <mask id={fadeId} style={{ maskType: 'alpha' }}>
          <rect
            x={CLIP_X}
            y={CARDS_Y - 2}
            width={CLIP_W}
            height={rowsH + 4}
            fill={`url(#${fadeId}-ramp)`}
          />
        </mask>
      </defs>
      <Heading title="In their words" />
      <PauseButton />
      <g clipPath={`url(#${clipId})`}>
        <g mask={`url(#${fadeId})`}>
          <Row
            y={CARDS_Y}
            offset={0}
            drift="group-hover:-translate-x-3 group-focus-visible:-translate-x-3"
          />
          <Row
            y={ROW_2_Y}
            offset={-MARQUEE_PITCH / 2}
            drift="group-hover:translate-x-3 group-focus-visible:translate-x-3"
          />
        </g>
      </g>
    </>
  )
}

const NOTES: Record<TestimonialsKind, string> = {
  grid: 'lg 3 cols · md 2 · mobile 3 + show more',
  marquee: 'two rows · opposite drift · pause on hover',
}

export function TestimonialsBlueprint({ kind }: { kind: TestimonialsKind }) {
  const grid = kind === 'grid'
  const bottom = grid ? CARDS_Y + 59 : ROW_2_Y + MARQUEE_CARD_H
  const gripW = grid ? COL_W : MARQUEE_CARD_W
  const gripX = grid ? BP_X : CLIP_X - 20 + MARQUEE_PITCH * 2

  return (
    <DraftSurface>
      {grid ? <Grid /> : <Marquee />}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={gripX}
          y={CARDS_Y}
          w={gripW}
          h={grid ? COLUMNS[0][0] : MARQUEE_CARD_H}
          style={beat(DRAFT_BEAT.handle)}
        />
        {grid ? (
          <MeasureH
            x1={BP_X}
            x2={BP_X + W}
            y={TOP - 10}
            label="max 1024"
            className="note-stamp"
            style={beat(stampBeat(0))}
          />
        ) : (
          <MeasureH
            x1={gripX}
            x2={gripX + gripW}
            y={bottom + 5}
            labelYOffset={9}
            label="320"
            className="note-stamp"
            style={beat(stampBeat(0))}
          />
        )}
        <MeasureNote
          x={BP_X}
          y={bottom + (grid ? 17 : 24)}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {NOTES[kind]}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
