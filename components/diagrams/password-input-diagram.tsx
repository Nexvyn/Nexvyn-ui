'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import type { CSSProperties } from 'react'
import {
  DraftSurface,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const PI = {
  w: 288,
  h: 44,
  rx: 4,
  padStart: 14,
  padEnd: 48,
  labelSize: 14,
  labelGap: 8,
  labelW: 62,
  dotCount: 8,
  dotPitch: 9,
  dotR: 2.5,
  eye: 20,
  eyeInset: 12,
  hit: 44,
} as const

const S = 0.65
const BP_FIELD = { x: 28, y: 52, w: PI.w * S, h: PI.h * S, rx: PI.rx * S } as const
const BP_MID_Y = BP_FIELD.y + BP_FIELD.h / 2
const BP_LABEL_SIZE = PI.labelSize * S
const BP_PAD_Y = 10 * S
const BP_DOT_R = PI.dotR * S
const BP_DOT_XS = Array.from(
  { length: PI.dotCount },
  (_, i) => BP_FIELD.x + (PI.padStart + PI.dotR + i * PI.dotPitch) * S,
)
const BP_EYE = PI.eye * S
const BP_EYE_X = BP_FIELD.x + BP_FIELD.w - (PI.eyeInset + PI.eye) * S
const BP_EYE_Y = BP_MID_Y - BP_EYE / 2
const BP_EYE_CX = BP_EYE_X + BP_EYE / 2
const BP_DOT_DELAY_MS = 450
const BP_DOT_STEP_MS = 90

const BP_DOT_CLASS =
  'fill-transparent stroke-current opacity-50 transition-[fill,stroke,opacity] duration-(--motion-dur-slow) group-hover:fill-(--color-fg) group-hover:stroke-transparent group-hover:opacity-100 group-hover:duration-(--motion-dur-instant) group-hover:delay-(--dot-delay) group-focus-visible:fill-(--color-fg) group-focus-visible:stroke-transparent group-focus-visible:opacity-100 group-focus-visible:duration-(--motion-dur-instant) group-focus-visible:delay-(--dot-delay) motion-reduce:transition-none'

const BP_FIELD_CLASS = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface-2) group-hover:stroke-(--color-border) group-focus-visible:fill-(--color-surface-2) group-focus-visible:stroke-(--color-border)`

export function PasswordInputWireframe() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <text
        x={BP_FIELD.x}
        y={BP_FIELD.y - PI.labelGap * S - 3}
        fontSize={BP_LABEL_SIZE}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Password
      </text>

      <rect
        x={BP_FIELD.x}
        y={BP_FIELD.y}
        width={BP_FIELD.w}
        height={BP_FIELD.h}
        rx={BP_FIELD.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${BP_FIELD_CLASS}`}
      />
      {BP_DOT_XS.map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={BP_MID_Y}
          r={BP_DOT_R}
          strokeWidth={0.75}
          style={{ '--dot-delay': `${BP_DOT_DELAY_MS + i * BP_DOT_STEP_MS}ms` } as CSSProperties}
          className={BP_DOT_CLASS}
        />
      ))}
      <g style={beat(DRAFT_BEAT.anatomy)} className="fade-note">
        <g
          transform={`translate(${BP_EYE_X}, ${BP_EYE_Y}) scale(${EYE_SCALE * S})`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7 * S}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${DRAFT_INK_MORPH} opacity-55 group-hover:opacity-70 group-focus-visible:opacity-70`}
        >
          <path d={EYE_OPEN_TOP} vectorEffect="non-scaling-stroke" />
          <path d={EYE_OPEN_BOTTOM} vectorEffect="non-scaling-stroke" />
          <circle cx={12} cy={12} r={3} fill="currentColor" stroke="none" />
        </g>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_FIELD.x}
          y={BP_FIELD.y}
          w={BP_FIELD.w}
          h={BP_FIELD.h}
          style={beat(DRAFT_BEAT.handle)}
        />
        <InsetGuide
          x={BP_FIELD.x + PI.padStart * S}
          y={BP_FIELD.y + BP_PAD_Y}
          w={BP_FIELD.w - (PI.padStart + PI.padEnd) * S}
          h={BP_FIELD.h - BP_PAD_Y * 2}
          offset={0.8}
          boxX={BP_FIELD.x}
          boxY={BP_FIELD.y}
          boxW={BP_FIELD.w}
          boxH={BP_FIELD.h}
          boxRx={BP_FIELD.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <circle
          cx={BP_EYE_CX}
          cy={BP_MID_Y}
          r={(PI.hit / 2) * S}
          fill="none"
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_FIELD.x}
          x2={BP_FIELD.x + BP_FIELD.w}
          y={BP_FIELD.y + BP_FIELD.h + 12}
          label={`${PI.w}`}
          labelYOffset={9}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_FIELD.x - 12}
          y1={BP_FIELD.y}
          y2={BP_FIELD.y + BP_FIELD.h}
          label={`${PI.h}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_FIELD.x + BP_FIELD.w}
          y={BP_FIELD.y - 6}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`r${PI.rx}`}
        </MeasureNote>
        <MeasureNote
          x={BP_FIELD.x + BP_FIELD.w}
          y={BP_FIELD.y + BP_FIELD.h + 24}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`hit ${PI.hit}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const MID_Y = PI.h / 2
const LABEL_BASELINE = -PI.labelGap - 5
const LABEL_TOP = LABEL_BASELINE - PI.labelSize * 0.72
const EYE_X = PI.w - PI.eyeInset - PI.eye
const EYE_Y = MID_Y - PI.eye / 2
const EYE_CX = EYE_X + PI.eye / 2
const EYE_SCALE = PI.eye / 24
const DOT_X0 = PI.padStart + PI.dotR
const HIT_X = EYE_CX - PI.hit / 2
const EYE_OPEN_TOP = 'M1 12 C1 12 5 4 12 4 C19 4 23 12 23 12'
const EYE_OPEN_BOTTOM = 'M1 12 C1 12 5 20 12 20 C19 20 23 12 23 12'

function useHoverPart(id: string, options?: { isInteraction?: boolean }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(id, options)
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

function LabelShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('label')
  return (
    <g {...groupProps}>
      <rect
        x={-2}
        y={LABEL_TOP - 3}
        width={PI.labelW + 4}
        height={PI.labelSize + 4}
        rx={2}
        fill="currentColor"
        fillOpacity={isHovered ? 0.1 : 0}
        className={spotlight.className}
      />
      <text
        x={0}
        y={LABEL_BASELINE}
        fontSize={PI.labelSize}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Password
      </text>
    </g>
  )
}

function FieldShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('field')
  return (
    <g {...groupProps}>
      <rect
        x={0.5}
        y={0.5}
        width={PI.w - 1}
        height={PI.h - 1}
        rx={PI.rx}
        stroke="currentColor"
        strokeWidth={isHovered ? 1.75 : 1}
        fill="currentColor"
        fillOpacity={isHovered ? 0.1 : 0.05}
        className={spotlight.className}
      />
    </g>
  )
}

function MaskShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('mask')
  return (
    <g {...groupProps}>
      {Array.from({ length: PI.dotCount }, (_, i) => (
        <circle
          key={i}
          cx={DOT_X0 + i * PI.dotPitch}
          cy={MID_Y}
          r={isHovered ? PI.dotR + 0.5 : PI.dotR}
          className={`fill-current ${spotlight.className}`}
        />
      ))}
    </g>
  )
}

function EyeShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('eye')
  return (
    <g {...groupProps}>
      <rect
        x={EYE_X}
        y={EYE_Y}
        width={PI.eye}
        height={PI.eye}
        rx={2}
        fill="currentColor"
        fillOpacity={isHovered ? 0.12 : 0}
        className={spotlight.className}
      />
      <g
        transform={`translate(${EYE_X}, ${EYE_Y}) scale(${EYE_SCALE})`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={spotlight.className}
      >
        <path d={EYE_OPEN_TOP} />
        <path d={EYE_OPEN_BOTTOM} />
        <circle cx={12} cy={12} r={3} fill="currentColor" stroke="none" />
      </g>
    </g>
  )
}

function HitAreaShape() {
  const { isHovered, spotlight, groupProps } = useHoverPart('hit', { isInteraction: true })
  return (
    <g {...groupProps}>
      <rect
        x={HIT_X}
        y={MID_Y - PI.hit / 2}
        width={PI.hit}
        height={PI.hit}
        rx={PI.rx}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={isHovered ? 1.5 : 1}
        strokeDasharray="3 2"
        fill="var(--bp-accent, var(--color-accent))"
        fillOpacity={isHovered ? 0.1 : 0}
        className={spotlight.className}
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
      <MeasureV x={-12} y1={0} y2={PI.h} label={`${PI.h}`} labelXOffset={-6} />
    </g>
  )
}

function Callouts() {
  const bottomY = PI.h + 24
  const maskEnd = DOT_X0 + (PI.dotCount - 1) * PI.dotPitch
  return (
    <>
      <AnatomyCallout
        part="label"
        label="Label"
        anchor={[PI.labelW / 2, LABEL_TOP]}
        side="top"
        distance={20}
        measure={`text-sm, mb-2 (${PI.labelGap}px)`}
        caption="Label above the input, defaults to Password"
      />
      <AnatomyCallout
        part="hit"
        label="Hit area"
        anchor={[EYE_CX, 0]}
        side="top"
        distance={20 - LABEL_TOP}
        isAccent
        measure={`${PI.hit} × ${PI.hit}px, before:size-11`}
        caption="Invisible 44px target keeps the small eye easy to tap"
      />
      <AnatomyCallout
        part="mask"
        label="Mask dots"
        anchor={[(DOT_X0 + maskEnd) / 2, MID_Y + PI.dotR]}
        side="bottom"
        distance={bottomY - MID_Y - PI.dotR}
        measure="text-sm, type=password"
        caption="Characters stay masked until the eye reveals them"
      />
      <AnatomyCallout
        part="field"
        label="Input"
        anchor={[150, PI.h]}
        side="bottom"
        distance={bottomY - PI.h}
        measure={`${PI.w} × ${PI.h}px, ps-3.5 pe-12, rounded-md`}
        caption="Native input on surface-2 with an accent focus ring"
      />
      <AnatomyCallout
        part="eye"
        label="Eye toggle"
        anchor={[EYE_CX, EYE_Y + PI.eye]}
        side="bottom"
        distance={bottomY - EYE_Y - PI.eye}
        measure={`${PI.eye}px icon, inset-e-3 (${PI.eyeInset}px)`}
        caption="Pupil tracks the cursor, blinks, and toggles visibility"
      />
    </>
  )
}

export function PasswordInputBreakdown() {
  return (
    <AnatomyFrame viewBox="-41 -79 360 183" ariaLabel="Password input anatomy">
      <FieldShape />
      <HitAreaShape />
      <MaskShape />
      <EyeShape />
      <LabelShape />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}
