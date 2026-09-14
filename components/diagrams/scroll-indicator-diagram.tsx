'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { type CSSProperties } from 'react'

import {
  DraftSurface,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  MeasureNote,
  MeasureV,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_TOTAL_TICKS = 60
const BP_LAST_TICK = BP_TOTAL_TICKS - 1
const BP_TICK_GAP = 1.8
const BP_RAIL_X = 132
const BP_RAIL_Y1 = 22
const BP_RAIL_Y2 = BP_RAIL_Y1 + BP_LAST_TICK * BP_TICK_GAP
const BP_MAJOR_W = 12
const BP_MINOR_W = 6
const BP_MARK_W = 16
const BP_LABEL_INSET = 20
const BP_LABEL_SIZE = 11
const BP_LABEL_TRACK = 0.55
const BP_LABEL_SLIDE = 8
const BP_READOUT_X = BP_RAIL_X - BP_MARK_W - 32
const BP_READOUT_SIZE = 10
const BP_SECTIONS = ['PHILOSOPHY', 'DESIGN', 'MOTION', 'SPEED', 'A11Y', 'DX', 'THEMING'] as const
const BP_ACTIVE_INDEX = 2

const bpTickY = (tick: number) => BP_RAIL_Y1 + tick * BP_TICK_GAP
const bpSectionTick = (index: number) =>
  Math.round((index / Math.max(BP_SECTIONS.length - 1, 1)) * BP_LAST_TICK)
const BP_ACTIVE_TICK = bpSectionTick(BP_ACTIVE_INDEX)
const BP_ACTIVE_Y = bpTickY(BP_ACTIVE_TICK)

export function ScrollIndicatorWireframe() {
  return (
    <DraftSurface>
      <g>
        {Array.from({ length: BP_TOTAL_TICKS }).map((_, i) => {
          const isMajor = i % 5 === 0
          const isPast = i <= BP_ACTIVE_TICK
          const tone = isPast
            ? 'opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100'
            : isMajor
              ? 'opacity-35 group-hover:opacity-50 group-focus-visible:opacity-50'
              : 'opacity-20 group-hover:opacity-25 group-focus-visible:opacity-25'
          return (
            <line
              key={i}
              x1={BP_RAIL_X - (isMajor ? BP_MAJOR_W : BP_MINOR_W)}
              y1={bpTickY(i)}
              x2={BP_RAIL_X}
              y2={bpTickY(i)}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              stroke="currentColor"
              strokeWidth={1}
              style={beat(DRAFT_BEAT.outline)}
              className={`ink-draw ${DRAFT_INK_MORPH} ${tone}`}
            />
          )
        })}
      </g>
      <g>
        {BP_SECTIONS.map((_, i) => {
          const y = bpTickY(bpSectionTick(i))
          const isActive = i === BP_ACTIVE_INDEX
          return (
            <line
              key={i}
              x1={BP_RAIL_X - BP_MARK_W}
              y1={y}
              x2={BP_RAIL_X}
              y2={y}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              stroke={isActive ? 'var(--bp-accent, var(--color-accent))' : 'currentColor'}
              strokeWidth={isActive ? 2 : 1}
              strokeLinecap={isActive ? 'round' : undefined}
              style={beat(isActive ? DRAFT_BEAT.anatomy : DRAFT_BEAT.outline)}
              className={`ink-draw ${DRAFT_INK_MORPH} ${isActive ? '' : 'opacity-45 group-hover:opacity-60 group-focus-visible:opacity-60'}`}
            />
          )
        })}
      </g>
      <text
        x={BP_READOUT_X}
        y={BP_ACTIVE_Y + BP_READOUT_SIZE * 0.35}
        fontSize={BP_READOUT_SIZE}
        fontFamily="var(--font-mono)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note tabular-nums ${DRAFT_INK_MORPH} fill-(--bp-accent,var(--color-accent)) opacity-80 group-hover:opacity-0 group-focus-visible:opacity-0`}
      >
        {`${BP_ACTIVE_INDEX + 1}/${BP_SECTIONS.length}`}
      </text>
      <g>
        {BP_SECTIONS.map((label, i) => {
          const isActive = i === BP_ACTIVE_INDEX
          return (
            <text
              key={label}
              x={BP_RAIL_X - BP_LABEL_INSET}
              y={bpTickY(bpSectionTick(i)) + BP_LABEL_SIZE * 0.35}
              textAnchor="end"
              fontSize={BP_LABEL_SIZE}
              fontFamily="var(--font-mono)"
              letterSpacing={BP_LABEL_TRACK}
              style={
                {
                  '--bp-label-slide': `${BP_LABEL_SLIDE}px`,
                  '--bp-label-delay': `${i * 35}ms`,
                } as CSSProperties
              }
              className={`translate-x-(--bp-label-slide) opacity-0 transition-[opacity,transform] duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-(--bp-label-delay) group-focus-visible:translate-x-0 group-focus-visible:delay-(--bp-label-delay) group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:transform-none ${
                isActive ? 'fill-(--bp-accent,var(--color-accent))' : 'fill-(--color-muted)'
              }`}
            >
              {label}
            </text>
          )
        })}
      </g>
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_RAIL_X - BP_MARK_W}
          y={BP_RAIL_Y1}
          w={BP_MARK_W}
          h={BP_RAIL_Y2 - BP_RAIL_Y1}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureV
          x={BP_RAIL_X + 12}
          y1={BP_RAIL_Y1}
          y2={BP_RAIL_Y2}
          label={`${BP_TOTAL_TICKS} ticks`}
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureNote
          x={10}
          y={BP_RAIL_Y1 - 9}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          ticks · hover reveals labels
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const RAIL_X = 250
const RAIL_Y1 = 36
const RAIL_Y2 = 200
const TICK_COUNT = 24
const ACTIVE = 9
const HEADINGS = [0, 9, 16, 22] as const
const LABELS = ['INTRO', 'DESIGN', 'CODE', 'SHIP'] as const

function tickY(i: number) {
  return RAIL_Y1 + (i / (TICK_COUNT - 1)) * (RAIL_Y2 - RAIL_Y1)
}

const ACTIVE_Y = tickY(ACTIVE)
const SECTION_Y = tickY(HEADINGS[1])

function TicksShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('ticks')
  return (
    <g
      onMouseEnter={() => setHovered('ticks')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={RAIL_X - 20}
        y={RAIL_Y1 - 4}
        width={24}
        height={RAIL_Y2 - RAIL_Y1 + 8}
        fill="transparent"
      />
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const isMajor = HEADINGS.includes(i as (typeof HEADINGS)[number])
        const isPast = i <= ACTIVE
        return (
          <line
            key={i}
            x1={RAIL_X - (isMajor ? 14 : 7)}
            y1={tickY(i)}
            x2={RAIL_X}
            y2={tickY(i)}
            stroke="currentColor"
            strokeWidth={hovered === 'ticks' ? 1.5 : 1}
            opacity={isPast ? 0.85 : isMajor ? 0.4 : 0.18}
            className={spotlight.className}
          />
        )
      })}
    </g>
  )
}

function SectionMarksShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('section-marks')
  return (
    <g
      onMouseEnter={() => setHovered('section-marks')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {HEADINGS.map((i) => {
        const isActive = i === ACTIVE
        return (
          <line
            key={i}
            x1={RAIL_X - 16}
            y1={tickY(i)}
            x2={RAIL_X}
            y2={tickY(i)}
            stroke={isActive ? 'var(--color-accent)' : 'currentColor'}
            strokeWidth={hovered === 'section-marks' || isActive ? 2 : 1.5}
            opacity={isActive ? 1 : 0.55}
            className={spotlight.className}
          />
        )
      })}
    </g>
  )
}

function ThumbShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('thumb')
  return (
    <g
      onMouseEnter={() => setHovered('thumb')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={RAIL_X - 22} y={ACTIVE_Y - 12} width={28} height={24} fill="transparent" />
      <line
        x1={RAIL_X - 16}
        y1={ACTIVE_Y}
        x2={RAIL_X}
        y2={ACTIVE_Y}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={hovered === 'thumb' ? 3 : 2.25}
        strokeLinecap="round"
        className={spotlight.className}
      />
    </g>
  )
}

function CounterShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('counter')
  return (
    <g
      onMouseEnter={() => setHovered('counter')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={RAIL_X - 56} y={ACTIVE_Y - 10} width={36} height={20} fill="transparent" />
      <text
        x={RAIL_X - 22}
        y={ACTIVE_Y + 3.5}
        textAnchor="end"
        fontSize={10}
        fontFamily="var(--font-mono)"
        className={`fill-(--color-accent) tabular-nums ${spotlight.className}`}
        opacity={hovered === 'counter' ? 1 : 0.9}
      >
        2/4
      </text>
    </g>
  )
}

function LabelsShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('labels')
  return (
    <g
      onMouseEnter={() => setHovered('labels')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={RAIL_X + 4}
        y={RAIL_Y1 - 8}
        width={72}
        height={RAIL_Y2 - RAIL_Y1 + 16}
        fill="transparent"
      />
      {HEADINGS.map((i, idx) => {
        const isActive = i === ACTIVE
        return (
          <text
            key={i}
            x={RAIL_X + 12}
            y={tickY(i) + 3.5}
            fontSize={11}
            fontFamily="var(--font-mono)"
            fontWeight={400}
            className={`uppercase tracking-wider ${
              isActive ? 'fill-(--color-accent)' : 'fill-current'
            } ${spotlight.className}`}
            opacity={isActive ? 1 : hovered === 'labels' ? 0.75 : 0.45}
          >
            {LABELS[idx]}
          </text>
        )
      })}
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={RAIL_X - 16} y={RAIL_Y1} w={16} h={RAIL_Y2 - RAIL_Y1} />
      <MeasureV
        x={RAIL_X + 90}
        y1={RAIL_Y1}
        y2={RAIL_Y2}
        label={`${RAIL_Y2 - RAIL_Y1}`}
        labelXOffset={5}
        labelAnchor="start"
      />
    </g>
  )
}

function CalloutLayer() {
  return (
    <>
      <AnatomyCallout
        part="ticks"
        label="Tick Rail"
        anchor={[RAIL_X - 16, RAIL_Y1]}
        side="start"
        distance={24}
        isAccent
        measure="60 ticks · major every 5"
        caption="Rail with major and minor tick marks"
      />
      <AnatomyCallout
        part="section-marks"
        label="Section Mark"
        anchor={[RAIL_X - 16, SECTION_Y]}
        side="start"
        distance={24}
        measure="7 sections · accent on active"
        caption="Section boundary markers aligned to ticks"
      />
      <AnatomyCallout
        part="thumb"
        label="Thumb"
        anchor={[RAIL_X, ACTIVE_Y]}
        side="end"
        distance={24}
        isAccent
        measure="accent indicator · 2.25px"
        caption="Current scroll position on the rail"
      />
      <AnatomyCallout
        part="counter"
        label="Counter"
        anchor={[RAIL_X - 30, ACTIVE_Y]}
        side="start"
        distance={24}
        measure="n/N readout · mono 10px"
        caption="Current section index and total"
      />
      <AnatomyCallout
        part="labels"
        label="Section Label"
        anchor={[RAIL_X + 36, SECTION_Y]}
        side="end"
        distance={24}
        measure="section names · mono uppercase"
        caption="Label reveals on hover, animated slide"
      />
    </>
  )
}

export function ScrollIndicatorBreakdown() {
  return (
    <AnatomyFrame viewBox="-10 -22 504 280" ariaLabel="Scroll indicator anatomy">
      <TicksShape />
      <SectionMarksShape />
      <ThumbShape />
      <CounterShape />
      <LabelsShape />
      <AnnotationsLayer />
      <CalloutLayer />
    </AnatomyFrame>
  )
}
