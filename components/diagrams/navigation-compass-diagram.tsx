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
import { Blueprint, BP_HIDE_ON_MORPH, blueprintTheme } from '@/components/diagrams/lib/parts'

/** One spike arm, matching the geometry the live component instances. */
const SPIKE_FILLS = [
  'M0.499548 92.9137C27.3142 82.6937 63.9363 57.6958 110.366 17.9201L21.7657 107.614C15.6859 102.901 9.59766 96.8914 0.499548 92.9137Z',
  'M110.509 18.0609C71.3409 65.0046 46.8222 101.949 36.9522 128.895C34.0939 121.069 27.9954 113.762 21.909 107.754L110.509 18.0609Z',
] as const

const SPIKE_CONTOUR =
  'M110.366 17.9201C63.9363 57.6958 27.3142 82.6937 0.499548 92.9137C17.4057 101.593 30.8783 113.604 36.8096 128.754C46.6795 101.808 71.1983 64.8638 110.366 17.9201ZM110.366 17.9201L21.7657 107.614'

const SPIKE_INNER = { x: 21.7657, y: 107.614 } as const
const SPIKE_AIM_CORRECTION = -44.65
const SPIKE_BEARINGS = [45, 135, 225, 315] as const

/** Matches the component: dial radius, arm rotation, and overall proportion. */
const DIAL_R = 93.327 * 0.6
const ROSE_ROTATION = 30

/** Fits the rose (tips reach ~182) into the shared 220x140 Blueprint viewBox. */
const BP_SCALE = 0.34
const BP_CENTER_X = 110
const BP_CENTER_Y = 70

export function NavigationCompassBlueprint() {
  const theme = blueprintTheme

  return (
    <Blueprint>
      <g
        transform={`translate(${BP_CENTER_X}, ${BP_CENTER_Y}) scale(${BP_SCALE}) rotate(${ROSE_ROTATION})`}
      >
        {SPIKE_BEARINGS.map((bearing) => (
          <g key={bearing} transform={`rotate(${bearing})`}>
            <g
              transform={`translate(0, ${-DIAL_R}) rotate(${SPIKE_AIM_CORRECTION}) translate(${-SPIKE_INNER.x}, ${-SPIKE_INNER.y})`}
            >
              {SPIKE_FILLS.map((d, i) => (
                <path
                  key={`fill-${i}`}
                  d={d}
                  fill="var(--color-bg)"
                  stroke="currentColor"
                  strokeWidth={theme.wireframe.strokeWidth / BP_SCALE}
                  strokeOpacity={theme.wireframe.strokeOpacity}
                  strokeLinejoin="round"
                />
              ))}
              <path
                d={SPIKE_CONTOUR}
                fill="none"
                stroke="currentColor"
                strokeWidth={theme.wireframe.strokeWidth / BP_SCALE}
                strokeOpacity={theme.wireframe.strokeOpacity * 0.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${4.26 / BP_SCALE} ${4.26 / BP_SCALE}`}
              />
            </g>
          </g>
        ))}

        {/* Drawn last so its fill sits over the arms, as in the component. */}
        <circle
          cx={0}
          cy={0}
          r={DIAL_R}
          fill="var(--color-bg)"
          stroke="currentColor"
          strokeWidth={theme.wireframe.strokeWidth / BP_SCALE}
          strokeOpacity={theme.wireframe.strokeOpacity}
        />

        <g className={BP_HIDE_ON_MORPH}>
          <circle
            cx={0}
            cy={0}
            r={DIAL_R * 0.55}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={1 / BP_SCALE}
            strokeDasharray={`${3 / BP_SCALE} ${3 / BP_SCALE}`}
          />
        </g>
      </g>
    </Blueprint>
  )
}

const A_CENTER = { x: 160, y: 96 } as const
const A_DIAL_R = 62
const A_TICK_R = 74
const A_LABEL_R = 88

function DialShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('dial')
  return (
    <circle
      cx={A_CENTER.x}
      cy={A_CENTER.y}
      r={A_DIAL_R}
      stroke="currentColor"
      strokeWidth={hovered === 'dial' ? 2 : 1.25}
      strokeDasharray="4 3"
      fill={hovered === 'dial' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'dial' ? 0.04 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('dial')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

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
      {Array.from({ length: 36 }, (_, i) => {
        const angle = ((i * 10 - 90) * Math.PI) / 180
        const isMajor = (i * 10) % 30 === 0
        const inner = isMajor ? A_TICK_R - 10 : A_TICK_R - 5
        return (
          <line
            key={i}
            x1={A_CENTER.x + Math.cos(angle) * inner}
            y1={A_CENTER.y + Math.sin(angle) * inner}
            x2={A_CENTER.x + Math.cos(angle) * A_TICK_R}
            y2={A_CENTER.y + Math.sin(angle) * A_TICK_R}
            stroke="currentColor"
            strokeWidth={isMajor ? 1.5 : 1}
            strokeOpacity={hovered === 'ticks' ? 0.9 : 0.45}
            className={spotlight.className}
          />
        )
      })}
    </g>
  )
}

function ActiveZoneShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('zone')
  const half = 18
  const a1 = ((-90 - half) * Math.PI) / 180
  const a2 = ((-90 + half) * Math.PI) / 180
  const p1 = { x: A_CENTER.x + Math.cos(a1) * A_LABEL_R, y: A_CENTER.y + Math.sin(a1) * A_LABEL_R }
  const p2 = { x: A_CENTER.x + Math.cos(a2) * A_LABEL_R, y: A_CENTER.y + Math.sin(a2) * A_LABEL_R }

  return (
    <g
      onMouseEnter={() => setHovered('zone')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <path
        d={`M ${A_CENTER.x} ${A_CENTER.y} L ${p1.x} ${p1.y} A ${A_LABEL_R} ${A_LABEL_R} 0 0 1 ${p2.x} ${p2.y} Z`}
        fill="var(--color-accent)"
        fillOpacity={hovered === 'zone' ? 0.22 : 0.1}
        className={spotlight.className}
      />
      <line
        x1={A_CENTER.x}
        y1={A_CENTER.y}
        x2={A_CENTER.x}
        y2={A_CENTER.y - A_LABEL_R}
        stroke="var(--color-accent)"
        strokeWidth={hovered === 'zone' ? 2 : 1.5}
        strokeDasharray="4 3"
        className={spotlight.className}
      />
    </g>
  )
}

function LinkLabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('link')
  return (
    <g
      onMouseEnter={() => setHovered('link')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <text
        x={A_CENTER.x}
        y={A_CENTER.y - A_LABEL_R - 4}
        fontSize={11}
        fontFamily="var(--font-sans)"
        fontWeight={600}
        textAnchor="middle"
        className={`fill-current ${spotlight.className}`}
      >
        Work
      </text>
      <text
        x={A_CENTER.x + A_LABEL_R + 6}
        y={A_CENTER.y + 4}
        fontSize={10}
        fontFamily="var(--font-sans)"
        textAnchor="start"
        opacity={0.45}
        className={`fill-current ${spotlight.className}`}
      >
        About
      </text>
    </g>
  )
}

function RoseShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('rose')
  return (
    <g
      onMouseEnter={() => setHovered('rose')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {([0, 90, 180, 270] as const).map((rot) => (
        <g key={rot} transform={`translate(${A_CENTER.x}, ${A_CENTER.y}) rotate(${rot})`}>
          <polygon
            points="0,0 0,-42 -7,0"
            fill="none"
            stroke="currentColor"
            strokeWidth={hovered === 'rose' ? 1.5 : 1}
            className={spotlight.className}
          />
          <polygon
            points="0,0 0,-42 7,0"
            fill="none"
            stroke="currentColor"
            strokeWidth={hovered === 'rose' ? 1.5 : 1}
            className={spotlight.className}
          />
        </g>
      ))}
      <circle
        cx={A_CENTER.x}
        cy={A_CENTER.y}
        r={4}
        fill="currentColor"
        fillOpacity={0.6}
        className={spotlight.className}
      />
    </g>
  )
}

export function NavigationCompassAnatomy() {
  return (
    <AnatomyFrame viewBox="0 0 320 210" maxWidthClassName="max-w-[480px]">
      <DialShape />
      <RoseShape />
      <TicksShape />
      <ActiveZoneShape />
      <LinkLabelShape />

      <OverlayLine id="dial" x1={A_CENTER.x - 44} y1={A_CENTER.y + 44} x2={40} y2={190} />
      <OverlayLine id="rose" x1={A_CENTER.x} y1={A_CENTER.y + 20} x2={A_CENTER.x} y2={190} />
      <OverlayLine id="ticks" x1={A_CENTER.x + 52} y1={A_CENTER.y + 52} x2={280} y2={190} />
      <OverlayLine id="zone" x1={A_CENTER.x + 24} y1={A_CENTER.y - 60} x2={286} y2={30} />

      <foreignObject
        x={0}
        y={184}
        width={90}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="dial" label="Dial" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={A_CENTER.x - 45}
        y={184}
        width={90}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="rose" label="Compass rose" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={240}
        y={184}
        width={80}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="ticks" label="Ticks" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={244}
        y={18}
        width={90}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag
          part="zone"
          label="Active zone"
          isAccent
          className="items-start justify-center"
        />
      </foreignObject>
    </AnatomyFrame>
  )
}
