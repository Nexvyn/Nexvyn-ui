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
import {
  Blueprint,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  Selection,
} from '@/components/diagrams/lib/parts'

const RATIO = 0.55

const BP_REF_SIZE = 60
const BP_D = BP_REF_SIZE * RATIO
const BP_GLOW_R = BP_D / 2 + 4
const BP_CX = 110
const BP_CY = 66
const BP_HIT = {
  x: BP_CX - BP_REF_SIZE / 2,
  y: BP_CY - BP_REF_SIZE / 2,
  w: BP_REF_SIZE,
  h: BP_REF_SIZE,
}

export function GlowOrbBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_GLOW_R}
        fill="none"
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.5}
        className="opacity-0 transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:opacity-70 group-focus-visible:opacity-70 motion-reduce:transition-none"
      />
      <g
        style={{ transformOrigin: `${BP_CX}px ${BP_CY}px` }}
        className="transition-transform duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
      >
        <circle
          cx={BP_CX}
          cy={BP_CY}
          r={BP_D / 2}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          className={BP_FILL_SOLID}
        />
      </g>
      <text
        x={BP_CX}
        y={BP_CY + BP_REF_SIZE / 2 + 24}
        textAnchor="middle"
        fontSize={11}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        listening
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <rect
          x={BP_HIT.x}
          y={BP_HIT.y}
          width={BP_HIT.w}
          height={BP_HIT.h}
          fill="none"
          stroke="currentColor"
          strokeDasharray="2 2"
          strokeOpacity={theme.guide.structOpacity}
        />
        <Selection x={BP_CX - BP_D / 2} y={BP_CY - BP_D / 2} w={BP_D} h={BP_D} />
        <DimH
          x1={BP_CX - BP_D / 2}
          x2={BP_CX + BP_D / 2}
          y={BP_CY - BP_D / 2 - 14}
          label={`d${BP_D.toFixed(0)}`}
        />
        <DimLabel x={BP_HIT.x} y={BP_HIT.y - 22} anchor="start">
          {`${BP_REF_SIZE} × ${BP_REF_SIZE} hit area`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_REF_SIZE = 80
const AN_D = AN_REF_SIZE * RATIO
const AN_GLOW_R = AN_D / 2 + 4
const AN_CX = 140
const AN_CY = 90
const AN_HIT = {
  x: AN_CX - AN_REF_SIZE / 2,
  y: AN_CY - AN_REF_SIZE / 2,
  w: AN_REF_SIZE,
  h: AN_REF_SIZE,
}
const ORB_TOP = AN_CY - AN_D / 2
const ORB_BOTTOM = AN_CY + AN_D / 2
const GLOW_RIGHT_X = AN_CX + AN_GLOW_R

function InteractionZoneShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('zone', { isInteraction: true })
  return (
    <g
      onMouseEnter={() => setHovered('zone')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={AN_HIT.x}
        y={AN_HIT.y}
        width={AN_HIT.w}
        height={AN_HIT.h}
        fill="none"
        stroke="currentColor"
        strokeDasharray="3 3"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function GlowShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('glow')
  return (
    <g
      onMouseEnter={() => setHovered('glow')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={AN_CX}
        cy={AN_CY}
        r={AN_GLOW_R}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray="2 2"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function OrbShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('orb')
  return (
    <g
      onMouseEnter={() => setHovered('orb')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={AN_CX}
        cy={AN_CY}
        r={AN_D / 2}
        fill="currentColor"
        fillOpacity={0.9}
        className={spotlight.className}
        style={spotlight.style}
      />
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
      <Selection x={AN_CX - AN_D / 2} y={ORB_TOP} w={AN_D} h={AN_D} />
      <DimH
        x1={AN_CX - AN_D / 2}
        x2={AN_CX + AN_D / 2}
        y={ORB_TOP - 14}
        label={`d${AN_D.toFixed(0)}`}
      />
      <DimLabel x={AN_HIT.x} y={AN_HIT.y - 8} anchor="start">
        {`${AN_REF_SIZE} × ${AN_REF_SIZE} hit area`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="zone" x1={AN_CX} y1={AN_HIT.y} x2={AN_CX} y2={AN_HIT.y - 34} />
      <OverlayLine id="orb" x1={AN_CX} y1={ORB_BOTTOM} x2={AN_CX} y2={ORB_BOTTOM + 34} />
      <OverlayLine id="glow" x1={GLOW_RIGHT_X} y1={AN_CY} x2={GLOW_RIGHT_X + 34} y2={AN_CY} />
    </g>
  )
}

function Tags() {
  return (
    <>
      <foreignObject
        x={AN_CX - 55}
        y={AN_HIT.y - 34 - 24}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="zone"
          label="Interaction zone"
          className="items-end justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={AN_CX - 35}
        y={ORB_BOTTOM + 34}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="orb" label="Orb" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={GLOW_RIGHT_X + 34}
        y={AN_CY - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="glow" label="Glow" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function GlowOrbAnatomy() {
  return (
    <AnatomyFrame viewBox="65 -22 245 207" maxWidthClassName="max-w-[300px]">
      <InteractionZoneShape />
      <GlowShape />
      <OrbShape />
      <AnnotationsLayer />
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}
