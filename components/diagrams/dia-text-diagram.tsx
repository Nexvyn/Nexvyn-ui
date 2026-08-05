'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import { Blueprint, BP_HIDE_ON_MORPH, BP_TEXT_SOFT } from '@/components/diagrams/lib/parts'

const CONTAINER = { x: 30, y: 40, w: 260, h: 70 } as const
const TEXT_X = CONTAINER.x + 16
const TEXT_Y = CONTAINER.y + 44

const BAND_CENTER = CONTAINER.x + CONTAINER.w * 0.55
const BAND_HALF_W = 30
const BAND_START_X = BAND_CENTER - BAND_HALF_W
const BAND_END_X = BAND_CENTER + BAND_HALF_W

function ContainerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')
  return (
    <rect
      x={CONTAINER.x}
      y={CONTAINER.y}
      width={CONTAINER.w}
      height={CONTAINER.h}
      rx={4}
      stroke="currentColor"
      strokeWidth={hovered === 'container' ? 2 : 1.25}
      strokeDasharray="4 3"
      fill={hovered === 'container' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'container' ? 0.04 : 0}
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
  return (
    <g
      onMouseEnter={() => setHovered('text')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <text
        x={TEXT_X}
        y={TEXT_Y}
        fontSize={14}
        fontFamily="var(--font-sans)"
        fontWeight={700}
        letterSpacing="-0.025em"
        className={`fill-current ${spotlight.className}`}
      >
        Fluid Precision
      </text>
    </g>
  )
}

function SweepBand() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('band')
  return (
    <g
      onMouseEnter={() => setHovered('band')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={BAND_START_X}
        y={CONTAINER.y}
        width={BAND_HALF_W * 2}
        height={CONTAINER.h}
        fill="url(#dia-text-anatomy-band)"
        fillOpacity={hovered === 'band' ? 0.4 : 0.22}
        className={spotlight.className}
      />
      <line
        x1={BAND_START_X}
        y1={CONTAINER.y}
        x2={BAND_START_X}
        y2={CONTAINER.y + CONTAINER.h}
        stroke="currentColor"
        strokeWidth={hovered === 'band' ? 2 : 1.5}
        strokeDasharray="5 3"
        className={spotlight.className}
      />
      <line
        x1={BAND_END_X}
        y1={CONTAINER.y}
        x2={BAND_END_X}
        y2={CONTAINER.y + CONTAINER.h}
        stroke="currentColor"
        strokeWidth={hovered === 'band' ? 2 : 1.5}
        strokeDasharray="5 3"
        className={spotlight.className}
      />
    </g>
  )
}

function DirectionArrow() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('direction')
  const arrowY = CONTAINER.y + CONTAINER.h + 16
  const arrowStartX = CONTAINER.x + 20
  const arrowEndX = CONTAINER.x + CONTAINER.w - 40
  return (
    <g
      onMouseEnter={() => setHovered('direction')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <line
        x1={arrowStartX}
        y1={arrowY}
        x2={arrowEndX}
        y2={arrowY}
        stroke="currentColor"
        strokeWidth={hovered === 'direction' ? 1.5 : 1}
        className={spotlight.className}
      />
      <path
        d={`M${arrowEndX - 6} ${arrowY - 4} L${arrowEndX} ${arrowY} L${arrowEndX - 6} ${arrowY + 4}`}
        stroke="currentColor"
        strokeWidth={hovered === 'direction' ? 1.5 : 1}
        fill="none"
        className={spotlight.className}
      />
      <text
        x={(arrowStartX + arrowEndX) / 2}
        y={arrowY - 6}
        fontSize={9}
        fontFamily="var(--font-sans)"
        textAnchor="middle"
        opacity={0.5}
        className={`fill-current ${spotlight.className}`}
      >
        sweep →
      </text>
    </g>
  )
}

export function DiaTextAnatomy() {
  return (
    <AnatomyFrame viewBox="-10 0 360 190" maxWidthClassName="max-w-[480px]">
      <defs>
        <linearGradient id="dia-text-anatomy-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c679c4" />
          <stop offset="25%" stopColor="#fa3d1d" />
          <stop offset="50%" stopColor="#ffb005" />
          <stop offset="75%" stopColor="#e1e1fe" />
          <stop offset="100%" stopColor="#0358f7" />
        </linearGradient>
      </defs>

      <ContainerShape />
      <SweepBand />
      <TextContentShape />
      <DirectionArrow />

      <OverlayLine id="container" x1={160} y1={40} x2={160} y2={18} />
      <OverlayLine id="text" x1={80} y1={84} x2={40} y2={170} />
      <OverlayLine id="band" x1={BAND_END_X} y1={50} x2={290} y2={170} />
      <OverlayLine id="direction" x1={160} y1={126} x2={160} y2={170} />

      <foreignObject
        x={110}
        y={0}
        width={110}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="container" label="Container" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={4}
        y={164}
        width={100}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="text" label="Text content" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={240}
        y={164}
        width={110}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag
          part="band"
          label="Gradient band"
          isAccent
          className="items-start justify-center"
        />
      </foreignObject>
      <foreignObject
        x={115}
        y={164}
        width={110}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag
          part="direction"
          label="Reveal direction"
          className="items-start justify-center"
        />
      </foreignObject>
    </AnatomyFrame>
  )
}

const BP_TEXT_X = 35
const BP_TEXT_Y = 78
const BP_MASK_W = 160
const BP_MASK_H = 46
const BP_MASK_X = BP_TEXT_X - 5
const BP_MASK_Y = BP_TEXT_Y - 34
const BP_BAND_W = 26

export function DiaTextBlueprint() {
  return (
    <Blueprint>
      <defs>
        <linearGradient id="dia-text-bp-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c679c4" />
          <stop offset="25%" stopColor="#fa3d1d" />
          <stop offset="50%" stopColor="#ffb005" />
          <stop offset="75%" stopColor="#e1e1fe" />
          <stop offset="100%" stopColor="#0358f7" />
        </linearGradient>
      </defs>

      <text
        x={BP_TEXT_X}
        y={BP_TEXT_Y}
        fontSize={26}
        fontWeight={700}
        letterSpacing="-0.02em"
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Dia Text
      </text>

      <rect
        x={BP_MASK_X}
        y={BP_MASK_Y}
        width={BP_BAND_W}
        height={BP_MASK_H}
        fill="url(#dia-text-bp-band)"
        opacity={0.55}
        style={{ transformBox: 'view-box' }}
        className="transition-transform duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:translate-x-[150px] group-focus-visible:translate-x-[150px] motion-reduce:transition-none"
      />

      <g className={BP_HIDE_ON_MORPH}>
        <line
          x1={BP_MASK_X + BP_MASK_W}
          y1={BP_MASK_Y}
          x2={BP_MASK_X + BP_MASK_W}
          y2={BP_MASK_Y + BP_MASK_H}
          stroke="var(--color-accent)"
          strokeWidth={1}
          strokeDasharray="2 2"
        />
      </g>
    </Blueprint>
  )
}
