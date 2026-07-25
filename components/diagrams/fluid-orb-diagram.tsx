'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import { useId } from 'react'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  Blueprint,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimH,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'

const BP_FILL_ACCENT = `${BP_MORPH} fill-transparent stroke-current group-hover:fill-(--color-accent) group-focus-visible:fill-(--color-accent) group-hover:stroke-transparent group-focus-visible:stroke-transparent`

const BP_CX = 110
const BP_CY = 70
const BP_R = 42

export function FluidOrbBlueprint() {
  const theme = blueprintTheme
  const blurId = useId()
  const wrapX = BP_CX - BP_R
  const wrapY = BP_CY - BP_R
  const wrapSide = BP_R * 2

  return (
    <Blueprint>
      <defs>
        <filter id={blurId}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_R}
        filter={`url(#${blurId})`}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.6}
        className={`${BP_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface-2) group-hover:stroke-transparent group-focus-visible:fill-(--color-surface-2) group-focus-visible:stroke-transparent`}
      />
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_R - 3}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_ACCENT}
      />
      <circle
        cx={BP_CX - BP_R * 0.32}
        cy={BP_CY - BP_R * 0.32}
        r={5}
        className="fill-(--color-accent) opacity-70 group-hover:opacity-100 transition-[opacity,transform] duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none"
        style={{ transformOrigin: `${BP_CX - BP_R * 0.32}px ${BP_CY - BP_R * 0.32}px` }}
      />
      <g
        className={`${BP_HIDE_ON_MORPH} transition-transform`}
        style={{ transformOrigin: `${BP_CX}px ${BP_CY}px` }}
      >
        <Selection x={wrapX} y={wrapY} w={wrapSide} h={wrapSide} />
        <DimH x1={wrapX} x2={wrapX + wrapSide} y={wrapY - 14} label="size" />
        <DimV x={wrapX - 12} y1={wrapY} y2={wrapY + wrapSide} label="size" />
      </g>
    </Blueprint>
  )
}

const AN_CX = 140
const AN_CY = 90
const AN_R = 55

function GlowShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('glow')
  const blurId = useId()
  return (
    <g
      onMouseEnter={() => setHovered('glow')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <defs>
        <filter id={blurId}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <circle
        cx={AN_CX}
        cy={AN_CY}
        r={AN_R}
        fill="currentColor"
        fillOpacity={0.18}
        filter={`url(#${blurId})`}
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
        r={AN_R - 3}
        fill="currentColor"
        fillOpacity={0.85}
        className={spotlight.className}
        style={spotlight.style}
      />
      <circle
        cx={AN_CX - AN_R * 0.32}
        cy={AN_CY - AN_R * 0.32}
        r={7}
        fill="var(--color-bg)"
        fillOpacity={0.7}
      />
    </g>
  )
}

function WrapperAnnotation() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  const x = AN_CX - AN_R
  const y = AN_CY - AN_R
  const side = AN_R * 2
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={x} y={y} w={side} h={side} />
      <DimH x1={x} x2={x + side} y={y - 14} label="size" />
      <DimV x={x - 12} y1={y} y2={y + side} label="size" />
    </g>
  )
}

function OverlayLines() {
  const topX = AN_CX
  const topY = AN_CY - AN_R
  const glowRightX = AN_CX + AN_R * 0.7
  const glowRightY = AN_CY - AN_R * 0.7
  const orbBottomX = AN_CX
  const orbBottomY = AN_CY + AN_R
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="glow"
        x1={glowRightX}
        y1={glowRightY}
        x2={glowRightX + 34}
        y2={glowRightY - 20}
      />
      <OverlayLine id="orb" x1={orbBottomX} y1={orbBottomY} x2={orbBottomX} y2={orbBottomY + 34} />
      <OverlayLine id="wrapper" x1={topX} y1={topY} x2={topX} y2={topY - 34} />
    </g>
  )
}

function Tags() {
  const topX = AN_CX
  const topY = AN_CY - AN_R
  const glowRightX = AN_CX + AN_R * 0.7 + 34
  const glowRightY = AN_CY - AN_R * 0.7 - 20
  const orbBottomX = AN_CX
  const orbBottomY = AN_CY + AN_R + 34
  return (
    <>
      <foreignObject
        x={topX - 50}
        y={topY - 34 - 24}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="wrapper" label="Wrapper" className="items-end justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={glowRightX}
        y={glowRightY - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="glow" label="Glow halo" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={orbBottomX - 60}
        y={orbBottomY}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="orb" label="Orb surface" className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function FluidOrbAnatomy() {
  return (
    <AnatomyFrame viewBox="45 -39 280 258" maxWidthClassName="max-w-[360px]">
      <GlowShape />
      <OrbShape />
      <WrapperAnnotation />
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}
