'use client'

import {
  Blueprint,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimLabel,
  DimV,
  Selection,
} from '@/components/showcase/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/showcase/anatomy-parts'

const BP_RAIL_X = 150
const BP_RAIL_Y1 = 26
const BP_RAIL_Y2 = 128
const BP_TICK_COUNT = 16
const BP_ACTIVE_INDEX = 6
const BP_HEADING_INDICES = [0, 6, 11] as const

export function ScrollIndicatorWireframe() {
  const theme = blueprintTheme
  const ticks = Array.from({ length: BP_TICK_COUNT })
  return (
    <Blueprint>
      <g className={BP_MORPH}>
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
              strokeWidth={1}
              opacity={isPast ? theme.wireframe.strokeOpacity : theme.guide.dimOpacity}
            />
          )
        })}
      </g>
      <line
        x1={BP_RAIL_X - 14}
        y1={BP_RAIL_Y1 + (BP_ACTIVE_INDEX / (BP_TICK_COUNT - 1)) * (BP_RAIL_Y2 - BP_RAIL_Y1)}
        x2={BP_RAIL_X}
        y2={BP_RAIL_Y1 + (BP_ACTIVE_INDEX / (BP_TICK_COUNT - 1)) * (BP_RAIL_Y2 - BP_RAIL_Y1)}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.5}
      />
      <g className={BP_HIDE_ON_MORPH}>
        <text
          x={BP_RAIL_X - 22}
          y={BP_RAIL_Y1 + (BP_ACTIVE_INDEX / (BP_TICK_COUNT - 1)) * (BP_RAIL_Y2 - BP_RAIL_Y1) + 3}
          textAnchor="end"
          fontSize={8}
          fontFamily="var(--font-mono)"
          fill="currentColor"
          opacity={0.4}
        >
          SECTION
        </text>
        <Selection x={BP_RAIL_X - 14} y={BP_RAIL_Y1} w={14} h={BP_RAIL_Y2 - BP_RAIL_Y1} />
        <DimV
          x={BP_RAIL_X + 14}
          y1={BP_RAIL_Y1}
          y2={BP_RAIL_Y2}
          label={`${BP_RAIL_Y2 - BP_RAIL_Y1}`}
          labelXOffset={5}
          labelAnchor="start"
        />
        <DimLabel x={10} y={18} anchor="start">
          60 ticks, hover reveals labels
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_RAIL_X = 200
const AN_RAIL_Y1 = 10
const AN_RAIL_Y2 = 210
const AN_TICK_COUNT = 24
const AN_ACTIVE_INDEX = 9
const AN_HEADING_INDICES = [0, 9, 16, 22] as const
const AN_SECTION_LABELS = ['Intro', 'Design', 'Code', 'Ship'] as const

function tickY(i: number) {
  return AN_RAIL_Y1 + (i / (AN_TICK_COUNT - 1)) * (AN_RAIL_Y2 - AN_RAIL_Y1)
}

function TicksShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('ticks')
  const ticks = Array.from({ length: AN_TICK_COUNT })

  return (
    <g
      onMouseEnter={() => setHovered('ticks')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_RAIL_X - 20}
        y={AN_RAIL_Y1}
        width={20}
        height={AN_RAIL_Y2 - AN_RAIL_Y1}
        fill="transparent"
      />
      {ticks.map((_, i) => {
        const isMajor = AN_HEADING_INDICES.includes(i as (typeof AN_HEADING_INDICES)[number])
        const isPast = i <= AN_ACTIVE_INDEX
        return (
          <line
            key={i}
            x1={AN_RAIL_X - (isMajor ? 14 : 8)}
            y1={tickY(i)}
            x2={AN_RAIL_X}
            y2={tickY(i)}
            stroke="currentColor"
            strokeWidth={hovered === 'ticks' ? 1.5 : 1}
            opacity={isPast ? 0.8 : isMajor ? 0.4 : 0.2}
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
      <rect
        x={AN_RAIL_X - 20}
        y={AN_RAIL_Y1}
        width={20}
        height={AN_RAIL_Y2 - AN_RAIL_Y1}
        fill="transparent"
      />
      {AN_HEADING_INDICES.map((i) => {
        const isActive = i === AN_ACTIVE_INDEX
        return (
          <line
            key={i}
            x1={AN_RAIL_X - 14}
            y1={tickY(i)}
            x2={AN_RAIL_X}
            y2={tickY(i)}
            stroke={isActive ? 'var(--color-accent)' : 'currentColor'}
            strokeWidth={hovered === 'section-marks' ? 2 : 1.25}
            opacity={isActive ? 1 : 0.6}
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
  const y = tickY(AN_ACTIVE_INDEX)

  return (
    <g
      onMouseEnter={() => setHovered('thumb')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN_RAIL_X - 20} y={y - 10} width={20} height={20} fill="transparent" />
      <line
        x1={AN_RAIL_X - 14}
        y1={y}
        x2={AN_RAIL_X}
        y2={y}
        stroke="var(--color-accent)"
        strokeWidth={hovered === 'thumb' ? 3 : 2}
        className={spotlight.className}
      />
    </g>
  )
}

function CounterShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('counter')
  const y = tickY(AN_ACTIVE_INDEX)

  return (
    <g
      onMouseEnter={() => setHovered('counter')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN_RAIL_X - 60} y={y - 8} width={36} height={16} fill="transparent" />
      <text
        x={AN_RAIL_X - 24}
        y={y + 4}
        textAnchor="end"
        fontSize={9}
        fontFamily="var(--font-mono)"
        className={`fill-current text-(--color-accent) tabular-nums ${spotlight.className}`}
      >
        2/4
      </text>
    </g>
  )
}

function LabelsShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('labels')

  return (
    <g
      onMouseEnter={() => setHovered('labels')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_RAIL_X + 6}
        y={AN_RAIL_Y1}
        width={70}
        height={AN_RAIL_Y2 - AN_RAIL_Y1}
        fill="transparent"
      />
      {AN_HEADING_INDICES.map((i, idx) => (
        <text
          key={i}
          x={AN_RAIL_X + 10}
          y={tickY(i) + 3}
          fontSize={9}
          fontFamily="var(--font-mono)"
          className={`fill-current uppercase tracking-wide opacity-60 ${spotlight.className}`}
        >
          {AN_SECTION_LABELS[idx]}
        </text>
      ))}
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const isOthersHovered = hovered !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: isOthersHovered ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-all duration-200 ease-out ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={AN_RAIL_X - 14} y={AN_RAIL_Y1} w={14} h={AN_RAIL_Y2 - AN_RAIL_Y1} />
      <DimV
        x={AN_RAIL_X + 20}
        y1={AN_RAIL_Y1}
        y2={AN_RAIL_Y2}
        label={`${AN_RAIL_Y2 - AN_RAIL_Y1}`}
        labelXOffset={5}
        labelAnchor="start"
      />
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="ticks" x1={166} y1={30} x2={120} y2={30} />
      <OverlayLine id="section-marks" x1={186} y1={90} x2={140} y2={70} />
      <OverlayLine id="thumb" x1={186} y1={110} x2={140} y2={130} />
      <OverlayLine id="counter" x1={156} y1={110} x2={110} y2={170} />
      <OverlayLine id="labels" x1={226} y1={130} x2={280} y2={130} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={20}
        y={20}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="ticks" label="Tick Rail" className="items-center justify-end" isAccent />
      </foreignObject>
      <foreignObject
        x={40}
        y={60}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="section-marks"
          label="Section Mark"
          className="items-center justify-end"
        />
      </foreignObject>
      <foreignObject
        x={40}
        y={122}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="thumb" label="Thumb" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={10}
        y={162}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="counter" label="Counter" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={280}
        y={120}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="labels" label="Section Label" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function ScrollIndicatorBreakdown() {
  return (
    <AnatomyFrame viewBox="0 10 390 230" maxWidthClassName="max-w-lg">
      <g transform="translate(60, 20)">
        <TicksShape />
        <SectionMarksShape />
        <ThumbShape />
        <CounterShape />
        <LabelsShape />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}
