'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import type { CSSProperties } from 'react'
import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_SCAFFOLD_FADE,
  beat,
  DRAFT_LABEL_BEAT,
  stampBeat,
  GripFrame,
  MeasureH,
  MeasureV,
  MeasureNote,
} from '@/components/diagrams/lib/diagram-parts'

const FONT = 24
const TEXT_W = 180
const CONTAINER = { x: 0, y: 0, w: TEXT_W, h: FONT } as const
const TEXT_BASELINE = CONTAINER.y + FONT * 0.78

const BAND_CENTER = CONTAINER.x + CONTAINER.w * 0.55
const BAND_HALF_W = CONTAINER.w * 0.17
const BAND_START_X = BAND_CENTER - BAND_HALF_W
const BAND_END_X = BAND_CENTER + BAND_HALF_W

const ARROW_Y = CONTAINER.y + CONTAINER.h + 14
const ARROW_START_X = CONTAINER.x
const ARROW_END_X = CONTAINER.x + CONTAINER.w

const SWEEP_STOPS = [
  'var(--color-fg)',
  'color-mix(in oklch, var(--color-accent) 60%, var(--color-fg))',
  'var(--color-accent)',
  'color-mix(in oklch, var(--color-accent) 45%, var(--color-bg))',
  'var(--color-accent)',
] as const

const SWEEP_BAND_HALF_PCT = 17

function useEngaged(id: string) {
  const { hovered, pinned } = useAnatomy()
  return (hovered ?? pinned) === id
}

function ContainerShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')
  const active = useEngaged('container')
  return (
    <rect
      x={CONTAINER.x}
      y={CONTAINER.y}
      width={CONTAINER.w}
      height={CONTAINER.h}
      stroke="currentColor"
      strokeWidth={active ? 1.5 : 1}
      strokeDasharray="4 3"
      fill="currentColor"
      fillOpacity={active ? 0.06 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function TextContentShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('text')
  const active = useEngaged('text')
  const textProps = {
    x: CONTAINER.x,
    y: TEXT_BASELINE,
    fontSize: FONT,
    fontFamily: 'var(--font-sans)',
    letterSpacing: '-0.025em',
    textLength: TEXT_W,
    lengthAdjust: 'spacingAndGlyphs' as const,
  }
  return (
    <g
      onMouseEnter={() => setHovered('text')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <text
        {...textProps}
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 0.75 : 0.5}
        strokeOpacity={0.5}
      >
        Fluid Precision
      </text>
      <text {...textProps} clipPath="url(#dia-text-anatomy-painted)" className="fill-current">
        Fluid Precision
      </text>
    </g>
  )
}

function SweepBand() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('band')
  const active = useEngaged('band')
  return (
    <g
      onMouseEnter={() => setHovered('band')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={BAND_START_X}
        y={CONTAINER.y}
        width={BAND_HALF_W * 2}
        height={CONTAINER.h}
        fill="url(#dia-text-anatomy-band)"
        fillOpacity={active ? 0.55 : 0.3}
      />
      {[BAND_START_X, BAND_END_X].map((x) => (
        <line
          key={x}
          x1={x}
          y1={CONTAINER.y}
          x2={x}
          y2={CONTAINER.y + CONTAINER.h}
          stroke="currentColor"
          strokeWidth={active ? 1.5 : 1}
          strokeDasharray="3 2"
        />
      ))}
    </g>
  )
}

function DirectionArrow() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('direction')
  const active = useEngaged('direction')
  return (
    <g
      onMouseEnter={() => setHovered('direction')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
      stroke="currentColor"
      strokeWidth={active ? 1.5 : 1}
      fill="none"
    >
      <rect
        x={ARROW_START_X}
        y={ARROW_Y - 5}
        width={ARROW_END_X - ARROW_START_X}
        height={10}
        fill="transparent"
        stroke="none"
      />
      <line x1={ARROW_START_X} y1={ARROW_Y} x2={ARROW_END_X} y2={ARROW_Y} />
      <path
        d={`M${ARROW_END_X - 6} ${ARROW_Y - 4} L${ARROW_END_X} ${ARROW_Y} L${ARROW_END_X - 6} ${ARROW_Y + 4}`}
      />
    </g>
  )
}

export function DiaTextAnatomy() {
  return (
    <AnatomyFrame viewBox="-110 -60 418 158" ariaLabel="Dia text sweep anatomy">
      <defs>
        <linearGradient id="dia-text-anatomy-band" x1="0" y1="0" x2="1" y2="0">
          {SWEEP_STOPS.map((color, i) => (
            <stop
              key={i}
              offset={`${(i / (SWEEP_STOPS.length - 1)) * 100}%`}
              style={{ stopColor: color }}
            />
          ))}
        </linearGradient>
        <clipPath id="dia-text-anatomy-painted">
          <rect x={CONTAINER.x} y={CONTAINER.y - 4} width={BAND_END_X} height={CONTAINER.h + 8} />
        </clipPath>
      </defs>

      <ContainerShape />
      <SweepBand />
      <TextContentShape />
      <DirectionArrow />

      <AnatomyCallout
        part="container"
        label="Container"
        anchor={[CONTAINER.x, CONTAINER.y + CONTAINER.h / 2]}
        side="start"
        distance={24}
        measure={`${TEXT_W} × ${FONT} · auto width`}
        caption="Relative div with an sr-only label, sized by its text."
      />
      <AnatomyCallout
        part="band"
        label="Gradient band"
        anchor={[BAND_CENTER, CONTAINER.y]}
        side="top"
        distance={24}
        isAccent
        measure={`${Math.round(BAND_HALF_W * 2)} wide · 34% · 5 stops`}
        caption="Accent gradient that paints each glyph in as it passes (colors)."
      />
      <AnatomyCallout
        part="text"
        label="Text content"
        anchor={[CONTAINER.x + CONTAINER.w, CONTAINER.y + CONTAINER.h / 2]}
        side="end"
        distance={24}
        measure={`${FONT}px · text-2xl · tracking-tight`}
        caption="children string or array. Arrays cycle when repeat is set."
      />
      <AnatomyCallout
        part="direction"
        label="Reveal direction"
        anchor={[(ARROW_START_X + ARROW_END_X) / 2, ARROW_Y + 4]}
        side="bottom"
        distance={20}
        measure="-17% to 117% · 1.5s"
        caption="The band travels left to right over duration, then text settles."
      />
    </AnatomyFrame>
  )
}

const BP_FONT = 24
const BP_TEXT_W = 176
const BP_DIM_LANE = 20
const BP_TEXT_X = (220 - BP_TEXT_W - BP_DIM_LANE) / 2 + BP_DIM_LANE
const BP_TEXT_Y = 57
const BP_BASELINE = BP_TEXT_Y + BP_FONT * 0.78
const BP_BAND_W = BP_TEXT_W * ((SWEEP_BAND_HALF_PCT * 2) / 100)
const BP_TRAVEL = BP_TEXT_W + BP_BAND_W
const BP_BAND_REST_X = BP_TEXT_X - BP_BAND_W
const BP_GUIDE_BAND_X = BP_TEXT_X + BP_TEXT_W * 0.55 - BP_BAND_W / 2

const BP_TEXT_PROPS = {
  x: BP_TEXT_X,
  y: BP_BASELINE,
  fontSize: BP_FONT,
  fontFamily: 'var(--font-sans)',
  letterSpacing: '-0.025em',
  textLength: BP_TEXT_W,
  lengthAdjust: 'spacingAndGlyphs' as const,
}

export function DiaTextBlueprint() {
  return (
    <DraftSurface>
      <defs>
        <linearGradient id="dia-text-bp-band" x1="0" y1="0" x2="1" y2="0">
          {SWEEP_STOPS.map((color, i) => (
            <stop
              key={i}
              offset={`${(i / (SWEEP_STOPS.length - 1)) * 100}%`}
              style={{ stopColor: color }}
            />
          ))}
        </linearGradient>
        <clipPath id="dia-text-bp-glyphs">
          <text {...BP_TEXT_PROPS}>Fluid Precision</text>
        </clipPath>
      </defs>

      <text
        {...BP_TEXT_PROPS}
        style={beat(DRAFT_LABEL_BEAT)}
        className="fade-note fill-current opacity-35"
      >
        Fluid Precision
      </text>

      <g clipPath="url(#dia-text-bp-glyphs)">
        <g
          style={{ '--dia-bp-travel': `${BP_TRAVEL}px` } as CSSProperties}
          className="transition-transform duration-(--motion-dur-ambient) ease-(--motion-ease-in-out) group-hover:translate-x-(--dia-bp-travel) group-hover:delay-(--motion-dur-base) group-focus-visible:translate-x-(--dia-bp-travel) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
        >
          <rect
            x={BP_BAND_REST_X - BP_TRAVEL}
            y={BP_TEXT_Y}
            width={BP_TRAVEL}
            height={BP_FONT}
            fill="var(--color-fg)"
          />
          <rect
            x={BP_BAND_REST_X}
            y={BP_TEXT_Y}
            width={BP_BAND_W}
            height={BP_FONT}
            fill="url(#dia-text-bp-band)"
          />
        </g>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <rect
          x={BP_GUIDE_BAND_X}
          y={BP_TEXT_Y}
          width={BP_BAND_W}
          height={BP_FONT}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={0.75}
          strokeDasharray="2 2"
          opacity={0.6}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame
          x={BP_TEXT_X}
          y={BP_TEXT_Y}
          w={BP_TEXT_W}
          h={BP_FONT}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={BP_GUIDE_BAND_X}
          x2={BP_GUIDE_BAND_X + BP_BAND_W}
          y={BP_TEXT_Y - 10}
          label={`band ${SWEEP_BAND_HALF_PCT * 2}%`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_TEXT_X - 8}
          y1={BP_TEXT_Y}
          y2={BP_TEXT_Y + BP_FONT}
          label={`${BP_FONT}`}
          labelXOffset={-4}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureH
          x1={BP_TEXT_X}
          x2={BP_TEXT_X + BP_TEXT_W}
          y={BP_TEXT_Y + BP_FONT + 14}
          label="auto"
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureNote
          x={BP_TEXT_X + BP_TEXT_W}
          y={BP_TEXT_Y + BP_FONT + 27}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          sweep 1.5s
        </MeasureNote>
        <line
          x1={BP_TEXT_X + BP_TEXT_W}
          y1={BP_TEXT_Y}
          x2={BP_TEXT_X + BP_TEXT_W}
          y2={BP_TEXT_Y + BP_FONT}
          stroke="var(--color-accent)"
          strokeWidth={1}
          strokeDasharray="2 2"
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
      </g>
    </DraftSurface>
  )
}
