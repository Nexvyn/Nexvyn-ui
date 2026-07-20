'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_RAIL_X = 150
const BP_RAIL_Y1 = 26
const BP_RAIL_Y2 = 128
const BP_TICK_COUNT = 16
const BP_ACTIVE_INDEX = 6
const BP_HEADING_INDICES = [0, 6, 11] as const

export function ScrollIndicatorWireframe() {
  const ticks = Array.from({ length: BP_TICK_COUNT })
  const activeY =
    BP_RAIL_Y1 + (BP_ACTIVE_INDEX / (BP_TICK_COUNT - 1)) * (BP_RAIL_Y2 - BP_RAIL_Y1)
  return (
    <Blueprint>
      <g>
        {ticks.map((_, i) => {
          const y = BP_RAIL_Y1 + (i / (BP_TICK_COUNT - 1)) * (BP_RAIL_Y2 - BP_RAIL_Y1)
          const isMajor = BP_HEADING_INDICES.includes(i as (typeof BP_HEADING_INDICES)[number])
          const isPast = i <= BP_ACTIVE_INDEX
          return (
            <line
              key={i}
              x1={BP_RAIL_X - (isMajor ? 14 : 8)}
              y1={y}
              x2={BP_RAIL_X}
              y2={y}
              stroke={isPast && isMajor ? 'var(--bp-accent, var(--color-accent))' : 'currentColor'}
              strokeWidth={isMajor ? 1.25 : 1}
              className={`${BP_MORPH} ${isPast ? 'opacity-90 group-hover:opacity-100' : 'opacity-30 group-hover:opacity-50'}`}
            />
          )
        })}
      </g>
      <line
        x1={BP_RAIL_X - 16}
        y1={activeY}
        x2={BP_RAIL_X}
        y2={activeY}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <text
        x={BP_RAIL_X - 22}
        y={activeY + 3}
        textAnchor="end"
        fontSize={11}
        fontFamily="var(--font-mono)"
        fontWeight={500}
        className={`${BP_MORPH} fill-current opacity-40 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        Design
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_RAIL_X - 16} y={BP_RAIL_Y1} w={16} h={BP_RAIL_Y2 - BP_RAIL_Y1} />
        <DimV
          x={BP_RAIL_X + 14}
          y1={BP_RAIL_Y1}
          y2={BP_RAIL_Y2}
          label={`${BP_RAIL_Y2 - BP_RAIL_Y1}`}
          labelXOffset={5}
          labelAnchor="start"
        />
        <DimLabel x={10} y={18} anchor="start">
          ticks · hover reveals labels
        </DimLabel>
      </g>
    </Blueprint>
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
      <rect x={RAIL_X - 20} y={RAIL_Y1 - 4} width={24} height={RAIL_Y2 - RAIL_Y1 + 8} fill="transparent" />
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
        stroke="var(--color-accent)"
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
        className={`fill-[var(--color-accent)] tabular-nums ${spotlight.className}`}
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
      <rect x={RAIL_X + 4} y={RAIL_Y1 - 8} width={72} height={RAIL_Y2 - RAIL_Y1 + 16} fill="transparent" />
      {HEADINGS.map((i, idx) => {
        const isActive = i === ACTIVE
        return (
          <text
            key={i}
            x={RAIL_X + 12}
            y={tickY(i) + 3.5}
            fontSize={11}
            fontFamily="var(--font-mono)"
            fontWeight={isActive ? 600 : 500}
            className={`uppercase tracking-wider ${
              isActive ? 'fill-[var(--color-accent)]' : 'fill-current'
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
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={RAIL_X - 16} y={RAIL_Y1} w={16} h={RAIL_Y2 - RAIL_Y1} />
      <DimV
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

function LinesLayer() {
  const leftEdge = RAIL_X - 16
  return (
    <g strokeWidth="1" className="pointer-events-none">
      {/* Tick Rail — top left → top of rail */}
      <OverlayLine id="ticks" x1={118} y1={RAIL_Y1 + 2} x2={leftEdge} y2={RAIL_Y1 + 2} />
      {/* Section Mark — left → DESIGN major tick */}
      <OverlayLine id="section-marks" x1={118} y1={SECTION_Y} x2={leftEdge} y2={SECTION_Y} />
      {/* Thumb — left → accent line (slightly below section mark) */}
      <OverlayLine id="thumb" x1={118} y1={ACTIVE_Y + 28} x2={leftEdge} y2={ACTIVE_Y - 3} />
      {/* Counter — left → 2/4 text (stays below the Thumb leader so they don't cross) */}
      <OverlayLine id="counter" x1={118} y1={ACTIVE_Y + 56} x2={RAIL_X - 40} y2={ACTIVE_Y + 8} />
      {/* Section Label — FROM BOTTOM tag UP to DESIGN label */}
      <OverlayLine
        id="labels"
        x1={RAIL_X + 36}
        y1={RAIL_Y2 + 28}
        x2={RAIL_X + 36}
        y2={SECTION_Y + 4}
      />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject x={4} y={RAIL_Y1 - 10} width={116} height={24} className="pointer-events-none overflow-visible">
        <AnatomyTag part="ticks" label="Tick Rail" isAccent className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={4}
        y={SECTION_Y - 12}
        width={116}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="section-marks" label="Section Mark" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={4}
        y={ACTIVE_Y + 16}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="thumb" label="Thumb" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={4}
        y={ACTIVE_Y + 44}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="counter" label="Counter" className="items-center justify-end" />
      </foreignObject>
      {/* Bottom-centered under the label column */}
      <foreignObject
        x={RAIL_X - 20}
        y={RAIL_Y2 + 20}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="labels" label="Section Label" className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function ScrollIndicatorBreakdown() {
  return (
    <AnatomyFrame viewBox="-10 -22 504 280" maxWidthClassName="max-w-[605px]">
      <TicksShape />
      <SectionMarksShape />
      <ThumbShape />
      <CounterShape />
      <LabelsShape />
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}