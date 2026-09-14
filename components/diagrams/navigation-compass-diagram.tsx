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
  DRAFT_INK_MORPH,
  draftTheme,
  beat,
} from '@/components/diagrams/lib/diagram-parts'

const SPIKE_FILLS = [
  'M0.499548 92.9137C27.3142 82.6937 63.9363 57.6958 110.366 17.9201L21.7657 107.614C15.6859 102.901 9.59766 96.8914 0.499548 92.9137Z',
  'M110.509 18.0609C71.3409 65.0046 46.8222 101.949 36.9522 128.895C34.0939 121.069 27.9954 113.762 21.909 107.754L110.509 18.0609Z',
] as const

const SPIKE_CONTOUR =
  'M110.366 17.9201C63.9363 57.6958 27.3142 82.6937 0.499548 92.9137C17.4057 101.593 30.8783 113.604 36.8096 128.754C46.6795 101.808 71.1983 64.8638 110.366 17.9201ZM110.366 17.9201L21.7657 107.614'

const SPIKE_INNER = { x: 21.7657, y: 107.614 } as const
const SPIKE_AIM_CORRECTION = -44.65
const SPIKE_BEARINGS = [45, 135, 225, 315] as const
const SPIKE_BEATS = [DRAFT_BEAT.outline, '100ms', DRAFT_BEAT.anatomy, '300ms'] as const

const DIAL_R = 93.327 * 0.6
const ROSE_ROTATION = 30

const BP_SCALE = 0.18
const BP_CENTER_X = 110
const BP_CENTER_Y = 70
const BP_FACE_RINGS = [250, 242, 230] as const
const BP_DIAL = 320
const BP_TICK_BASE = { major: 290, medium: 300, minor: 310 } as const
const BP_TICK_COUNT = 180
const BP_TICK_STEP = 15

const BP_TICKS = Array.from({ length: BP_TICK_COUNT }, (_, i) => {
  const angle = (i * 360) / BP_TICK_COUNT
  const major = angle % BP_TICK_STEP === 0
  const base = major
    ? BP_TICK_BASE.major
    : angle % 5 === 0
      ? BP_TICK_BASE.medium
      : BP_TICK_BASE.minor
  const rad = ((angle - 90) * Math.PI) / 180
  const round = (v: number) => Math.round(v * 100) / 100
  return {
    major,
    x1: round(BP_CENTER_X + Math.cos(rad) * base * BP_SCALE),
    y1: round(BP_CENTER_Y + Math.sin(rad) * base * BP_SCALE),
    x2: round(BP_CENTER_X + Math.cos(rad) * BP_DIAL * BP_SCALE),
    y2: round(BP_CENTER_Y + Math.sin(rad) * BP_DIAL * BP_SCALE),
  }
})

export function NavigationCompassBlueprint() {
  const theme = draftTheme

  return (
    <DraftSurface>
      {BP_FACE_RINGS.map((r, i) => (
        <circle
          key={r}
          cx={BP_CENTER_X}
          cy={BP_CENTER_Y}
          r={r * BP_SCALE}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth * (i === 1 ? 0.8 : 0.5)}
          strokeOpacity={theme.wireframe.strokeOpacity * (i === 2 ? 0.3 : 0.5)}
          style={beat(DRAFT_BEAT.outline)}
          className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current`}
        />
      ))}

      <g
        style={
          {
            '--nc-turn': `${-BP_TICK_STEP}deg`,
            transformOrigin: `${BP_CENTER_X}px ${BP_CENTER_Y}px`,
            ...beat(DRAFT_BEAT.anatomy),
          } as CSSProperties
        }
        className="fade-note transition-transform duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:rotate-(--nc-turn) group-hover:delay-(--motion-dur-base) group-focus-visible:rotate-(--nc-turn) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:rotate-none"
      >
        <circle
          cx={BP_CENTER_X}
          cy={BP_CENTER_Y}
          r={BP_DIAL * BP_SCALE}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeOpacity={0.4}
          strokeDasharray="2 1"
        />
        {BP_TICKS.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="currentColor"
            strokeWidth={t.major ? 0.75 : 0.4}
            className={`${DRAFT_INK_MORPH} ${t.major ? 'opacity-50 group-hover:opacity-80 group-focus-visible:opacity-80' : 'opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40'}`}
          />
        ))}
      </g>

      <g
        transform={`translate(${BP_CENTER_X}, ${BP_CENTER_Y}) scale(${BP_SCALE * NC.roseScale}) rotate(${ROSE_ROTATION})`}
      >
        {SPIKE_BEARINGS.map((bearing, i) => (
          <g key={bearing} transform={`rotate(${bearing})`}>
            <g
              transform={`translate(0, ${-DIAL_R}) rotate(${SPIKE_AIM_CORRECTION}) translate(${-SPIKE_INNER.x}, ${-SPIKE_INNER.y})`}
            >
              <g className="fade-note" style={beat(SPIKE_BEATS[i])}>
                {SPIKE_FILLS.map((fillPath, j) => (
                  <path
                    key={`fill-${j}`}
                    d={fillPath}
                    fillOpacity={0.08}
                    stroke="currentColor"
                    strokeWidth={theme.wireframe.strokeWidth * 0.8}
                    strokeOpacity={theme.wireframe.strokeOpacity * 0.6}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className={`${DRAFT_INK_MORPH} fill-transparent group-hover:fill-current group-focus-visible:fill-current`}
                  />
                ))}
              </g>
              <g className={DRAFT_SCAFFOLD_FADE}>
                <path
                  d={SPIKE_CONTOUR}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={theme.guide.strokeWidth}
                  strokeOpacity={theme.wireframe.strokeOpacity * 0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 2"
                  vectorEffect="non-scaling-stroke"
                  className="fade-note"
                  style={beat(DRAFT_BEAT.guide)}
                />
              </g>
            </g>
          </g>
        ))}

        <circle
          cx={0}
          cy={0}
          r={DIAL_R}
          fill="var(--color-bg)"
          stroke="currentColor"
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          vectorEffect="non-scaling-stroke"
        />

        <g className={DRAFT_SCAFFOLD_FADE}>
          <circle
            cx={0}
            cy={0}
            r={DIAL_R * 0.55}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={theme.guide.strokeWidth}
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
            className="fade-note"
            style={beat(DRAFT_BEAT.hatch)}
          />
        </g>
      </g>
    </DraftSurface>
  )
}

const A_SCALE = 0.4
const NC = {
  size: 756,
  roseScale: 0.9,
  faceRings: [250, 242, 230],
  dial: 320,
  tickMajor: 290,
  tickMedium: 300,
  tickMinor: 310,
  tickStretch: 25,
  tickCount: 180,
  number: 340,
  text: 360,
  zoneAngle: 75,
  zoneThreshold: 15,
  rotation: -15,
} as const

const LINK_FONT = 7.5
const NUMBER_FONT = 7
const COLUMN_X = 166

const A_LINKS = [
  { angle: 0, label: 'Home' },
  { angle: 45, label: 'Work' },
  { angle: 90, label: 'Studio' },
  { angle: 135, label: 'Journal' },
  { angle: 180, label: 'About' },
  { angle: 225, label: 'Archive' },
  { angle: 270, label: 'Contact' },
  { angle: 315, label: 'Index' },
] as const

function polar(realRadius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  const r = realRadius * A_SCALE
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r }
}

function zoneProgress(dialAngle: number) {
  const diff = Math.abs((((dialAngle + NC.rotation) % 360) + 360 - NC.zoneAngle) % 360)
  const dist = diff > 180 ? 360 - diff : diff
  if (dist >= NC.zoneThreshold) return 0
  const t = 1 - dist / NC.zoneThreshold
  return t * t * (3 - 2 * t)
}

function useHoverPart(id: string) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(id)
  return {
    isHovered: hovered === id,
    spotlight,
    groupProps: {
      onMouseEnter: () => setHovered(id),
      onMouseLeave: () => setHovered(null),
      className: 'cursor-pointer',
      style: { pointerEvents: 'all' as const, filter: spotlight.style.filter },
    },
  }
}

function FaceShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('face')
  return (
    <g {...groupProps}>
      {NC.faceRings.map((r, i) => (
        <circle
          key={r}
          r={r * A_SCALE}
          stroke="currentColor"
          strokeWidth={(i === 1 ? 2 : 1) * (isHovered ? 1.5 : 1)}
          strokeDasharray={i === 2 ? '4 4' : undefined}
          strokeOpacity={i === 2 ? 0.5 : 0.8}
          fill="none"
          className={spotlight.className}
        />
      ))}
    </g>
  )
}

function RoseShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('rose')
  return (
    <g {...groupProps}>
      <g transform={`scale(${NC.roseScale * A_SCALE}) rotate(${ROSE_ROTATION})`}>
        {SPIKE_BEARINGS.map((bearing) => (
          <g key={bearing} transform={`rotate(${bearing})`}>
            <g
              transform={`translate(0, ${-DIAL_R}) rotate(${SPIKE_AIM_CORRECTION}) translate(${-SPIKE_INNER.x}, ${-SPIKE_INNER.y})`}
            >
              {SPIKE_FILLS.map((d) => (
                <path
                  key={d}
                  d={d}
                  fill="currentColor"
                  fillOpacity={isHovered ? 0.16 : 0.06}
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className={spotlight.className}
                />
              ))}
            </g>
          </g>
        ))}
        <circle
          r={DIAL_R}
          fill="var(--color-bg)"
          stroke="currentColor"
          strokeWidth={isHovered ? 1.5 : 1}
          vectorEffect="non-scaling-stroke"
          className={spotlight.className}
        />
      </g>
    </g>
  )
}

function TicksShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('ticks')
  return (
    <g {...groupProps}>
      <circle
        r={NC.dial * A_SCALE}
        stroke="currentColor"
        strokeWidth={isHovered ? 1.5 : 1}
        strokeDasharray="6 3"
        strokeOpacity={0.6}
        fill="none"
        className={spotlight.className}
      />
      {Array.from({ length: NC.tickCount }, (_, i) => {
        const angle = (i * 360) / NC.tickCount
        const isMajor = angle % 15 === 0
        const isMedium = !isMajor && angle % 5 === 0
        const base = isMajor ? NC.tickMajor : isMedium ? NC.tickMedium : NC.tickMinor
        const inner = polar(base - zoneProgress(angle) * NC.tickStretch, angle + NC.rotation)
        const outer = polar(NC.dial, angle + NC.rotation)
        return (
          <line
            key={i}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="currentColor"
            strokeWidth={isMajor ? 1.25 : 0.75}
            strokeOpacity={isMajor ? (isHovered ? 1 : 0.8) : isHovered ? 0.8 : 0.45}
            className={spotlight.className}
          />
        )
      })}
    </g>
  )
}

function DegreesShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('degrees')
  return (
    <g {...groupProps}>
      {Array.from({ length: 24 }, (_, i) => {
        const angle = i * 15
        if (A_LINKS.some((l) => Math.abs(l.angle - angle) < 10)) return null
        const display = angle + NC.rotation
        const { x, y } = polar(NC.number, display)
        return (
          <text
            key={angle}
            transform={`translate(${x}, ${y}) rotate(${display})`}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={NUMBER_FONT}
            fontFamily="var(--font-mono)"
            fillOpacity={isHovered ? 1 : 0.6}
            className={`fill-current ${spotlight.className}`}
          >
            {angle}
          </text>
        )
      })}
    </g>
  )
}

function LinksShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('link')
  return (
    <g {...groupProps}>
      {A_LINKS.map((link) => {
        const near = zoneProgress(link.angle) > 0
        const { x, y } = polar(NC.text, link.angle + NC.rotation)
        return (
          <text
            key={link.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={near ? LINK_FONT * 1.2 : LINK_FONT}
            fontFamily="var(--font-sans)"
            fill={near ? 'var(--bp-accent, var(--color-accent))' : 'currentColor'}
            fillOpacity={near || isHovered ? 1 : 0.6}
            className={spotlight.className}
          >
            {link.label}
          </text>
        )
      })}
    </g>
  )
}

function ZoneShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('zone')
  const start = polar(NC.dial, NC.zoneAngle - NC.zoneThreshold)
  const end = polar(NC.dial, NC.zoneAngle + NC.zoneThreshold)
  const pointer = polar(NC.dial, NC.zoneAngle)
  const r = NC.dial * A_SCALE
  return (
    <g {...groupProps}>
      <path
        d={`M 0 0 L ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y} Z`}
        fill="var(--bp-accent, var(--color-accent))"
        fillOpacity={isHovered ? 0.22 : 0.1}
        className={spotlight.className}
      />
      <line
        x1={0}
        y1={0}
        x2={pointer.x}
        y2={pointer.y}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={isHovered ? 2 : 1.5}
        strokeDasharray="4 4"
        strokeOpacity={0.6}
        className={spotlight.className}
      />
    </g>
  )
}

function Callouts() {
  const zone = polar(NC.dial, NC.zoneAngle + 6)
  const degrees = polar(NC.number, 105)
  const link = polar(NC.text, NC.zoneAngle)
  const ticks = polar(NC.dial, 262)
  const face = polar(NC.faceRings[0], 278.5)
  const roseTip = polar(164, 165)
  return (
    <>
      <AnatomyCallout
        part="link"
        label="Link"
        anchor={[link.x, link.y - 4]}
        side="top"
        distance={30}
        measure={`15px text at r ${NC.text}, scale 1.2 in zone`}
        caption="Links stay upright and light with the accent in the zone"
      />
      <AnatomyCallout
        part="zone"
        label="Active zone"
        anchor={[zone.x, zone.y]}
        side="end"
        distance={COLUMN_X - zone.x}
        isAccent
        measure={`±${NC.zoneThreshold}° cone at activeZoneAngle`}
        caption="Pointer and cone for the zone; drawn when showDetails is on"
      />
      <AnatomyCallout
        part="degrees"
        label="Degree labels"
        anchor={[degrees.x + 5, degrees.y]}
        side="end"
        distance={COLUMN_X - degrees.x - 5}
        measure={`every 15° at r ${NC.number}, text-xs`}
        caption="Degree marks, hidden within 10° of a link"
      />
      <AnatomyCallout
        part="ticks"
        label="Ticks"
        anchor={[ticks.x, ticks.y]}
        side="start"
        distance={COLUMN_X + ticks.x}
        measure={`${NC.tickCount} ticks, r ${NC.tickMajor} to ${NC.dial}`}
        caption={`Rotating dial; ticks stretch in by ${NC.tickStretch} near the zone`}
      />
      <AnatomyCallout
        part="face"
        label="Face rings"
        anchor={[face.x, face.y]}
        side="start"
        distance={COLUMN_X + face.x}
        measure={`r ${NC.faceRings.join(', ')} of ${NC.size}`}
        caption="Static face rings behind the rotating dial"
      />
      <AnatomyCallout
        part="rose"
        label="Compass rose"
        anchor={[roseTip.x, roseTip.y]}
        side="bottom"
        distance={151 - roseTip.y}
        measure={`hub r ${Math.round(DIAL_R * NC.roseScale)}, arms to r 164`}
        caption="Spike rose on the diagonals, offset by roseRotation"
      />
    </>
  )
}

export function NavigationCompassAnatomy() {
  return (
    <AnatomyFrame viewBox="-262 -157 542 344" ariaLabel="Navigation compass anatomy">
      <FaceShape />
      <RoseShape />
      <ZoneShape />
      <TicksShape />
      <DegreesShape />
      <LinksShape />
      <Callouts />
    </AnatomyFrame>
  )
}
