'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { type CSSProperties } from 'react'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_FILL_SOLID,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const SWITCH = {
  trackW: 44,
  trackH: 24,
  trackRx: 12,
  inset: 2,
  thumb: 20,
  travel: 20,
  labelGap: 12,
  labelW: 100,
  labelFont: 14,
} as const

const ROW_W = SWITCH.trackW + SWITCH.labelGap + SWITCH.labelW
const BP_X = (220 - ROW_W) / 2
const BP_Y = (140 - SWITCH.trackH) / 2
const BP_THUMB_CX = BP_X + SWITCH.inset + SWITCH.thumb / 2
const BP_THUMB_CY = BP_Y + SWITCH.trackH / 2

export function SwitchBlueprint() {
  const theme = draftTheme

  return (
    <DraftSurface>
      <defs>
        <pattern
          id="bp-hatch-switch-travel"
          width="4"
          height="4"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.35"
          />
        </pattern>
      </defs>

      <rect
        x={BP_X}
        y={BP_Y}
        width={SWITCH.trackW}
        height={SWITCH.trackH}
        rx={SWITCH.trackRx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_SOLID}`}
      />

      <g
        style={
          {
            transformOrigin: `${BP_THUMB_CX}px ${BP_THUMB_CY}px`,
            '--bp-switch-travel': `${SWITCH.travel}px`,
          } as CSSProperties
        }
        className="transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-x-(--bp-switch-travel) group-hover:delay-(--motion-dur-base) group-focus-visible:translate-x-(--bp-switch-travel) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <circle
          cx={BP_THUMB_CX}
          cy={BP_THUMB_CY}
          r={SWITCH.thumb / 2}
          fill="var(--color-bg)"
          className="fade-note"
          style={beat(DRAFT_BEAT.anatomy)}
        />
        <circle
          cx={BP_THUMB_CX}
          cy={BP_THUMB_CY}
          r={SWITCH.thumb / 2}
          fill="url(#bp-hatch-switch-travel)"
          className={DRAFT_SCAFFOLD_FADE}
        />
        <circle
          cx={BP_THUMB_CX}
          cy={BP_THUMB_CY}
          r={SWITCH.thumb / 2}
          fill="none"
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          className={`${DRAFT_INK_MORPH} stroke-current group-hover:stroke-transparent group-focus-visible:stroke-transparent`}
        />
      </g>

      <text
        x={BP_X + SWITCH.trackW + SWITCH.labelGap}
        y={BP_THUMB_CY + SWITCH.labelFont * 0.35}
        fontSize={SWITCH.labelFont}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Notifications
      </text>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_X}
          y={BP_Y}
          w={SWITCH.trackW}
          h={SWITCH.trackH}
          className="note-stamp"
          style={beat(DRAFT_BEAT.handle)}
        />
        <InsetGuide
          x={BP_X + SWITCH.inset}
          y={BP_Y + SWITCH.inset}
          w={SWITCH.trackW - SWITCH.inset * 2}
          h={SWITCH.trackH - SWITCH.inset * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={SWITCH.trackW}
          boxH={SWITCH.trackH}
          boxRx={SWITCH.trackRx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + SWITCH.trackW}
          y={BP_Y - 14}
          label={`${SWITCH.trackW}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BP_Y + SWITCH.trackH}
          label={`${SWITCH.trackH}`}
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.hatch)}
        >
          <line
            x1={BP_THUMB_CX}
            y1={BP_Y + SWITCH.trackH + 4}
            x2={BP_THUMB_CX}
            y2={BP_Y + SWITCH.trackH + 9}
          />
          <line
            x1={BP_THUMB_CX + SWITCH.travel}
            y1={BP_Y + SWITCH.trackH + 4}
            x2={BP_THUMB_CX + SWITCH.travel}
            y2={BP_Y + SWITCH.trackH + 9}
          />
          <line
            x1={BP_THUMB_CX}
            y1={BP_Y + SWITCH.trackH + 6.5}
            x2={BP_THUMB_CX + SWITCH.travel}
            y2={BP_Y + SWITCH.trackH + 6.5}
          />
        </g>
        <MeasureNote
          x={BP_THUMB_CX + SWITCH.travel / 2}
          y={BP_Y + SWITCH.trackH + 20}
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          travel 20
        </MeasureNote>
        <MeasureNote
          x={BP_X + SWITCH.trackW + 7}
          y={BP_Y + SWITCH.trackH + 20}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          r12, pad 2
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN_LABEL = 'Notifications'
const AN_LABEL_X = SWITCH.trackW + SWITCH.labelGap
const AN_LABEL_W = 84
const AN_LABEL_TOP = SWITCH.trackH / 2 + 5 - SWITCH.labelFont * 0.72
const AN_THUMB_CX = SWITCH.inset + SWITCH.thumb / 2 + SWITCH.travel
const AN_TAG_BOTTOM = -24

function ControlShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('control')
  const active = hovered === 'control'

  return (
    <rect
      x="0"
      y="0"
      width={SWITCH.trackW}
      height={SWITCH.trackH}
      rx={SWITCH.trackRx}
      fill="currentColor"
      fillOpacity={active ? 0.24 : 0.1}
      stroke="currentColor"
      strokeWidth={active ? 2 : draftTheme.wireframe.strokeWidth}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('control')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ThumbShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('thumb')
  const active = hovered === 'thumb'

  return (
    <circle
      cx={AN_THUMB_CX}
      cy={SWITCH.trackH / 2}
      r={SWITCH.thumb / 2}
      fill={active ? 'currentColor' : 'url(#bp-anatomy-hatch)'}
      stroke="currentColor"
      strokeWidth={active ? 1.75 : draftTheme.wireframe.strokeWidth}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('thumb')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function LabelShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')
  const active = hovered === 'label'

  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_LABEL_X - 2}
        y={0}
        width={AN_LABEL_W + 4}
        height={SWITCH.trackH}
        rx={4}
        fill="currentColor"
        fillOpacity={active ? 0.1 : 0}
        className={spotlight.className}
      />
      <text
        x={AN_LABEL_X}
        y={SWITCH.trackH / 2 + 5}
        fontSize={SWITCH.labelFont}
        fontFamily="var(--font-sans)"
        className={`pointer-events-none fill-current ${spotlight.className}`}
      >
        {AN_LABEL}
      </text>
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered, pinned } = useAnatomy()
  const dimmed = (hovered ?? pinned) !== null

  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={0} y={0} w={SWITCH.trackW} h={SWITCH.trackH} />
      <circle
        cx={SWITCH.inset + SWITCH.thumb / 2}
        cy={SWITCH.trackH / 2}
        r={SWITCH.thumb / 2}
        stroke="currentColor"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      />
      <InsetGuide
        x={SWITCH.inset}
        y={SWITCH.inset}
        w={SWITCH.trackW - SWITCH.inset * 2}
        h={SWITCH.trackH - SWITCH.inset * 2}
        offset={0.8}
        boxX={0}
        boxY={0}
        boxW={SWITCH.trackW}
        boxH={SWITCH.trackH}
        boxRx={SWITCH.trackRx}
        clipOffset={0.8}
      />
      <MeasureH
        x1={SWITCH.inset}
        x2={SWITCH.inset + SWITCH.travel}
        y={-10}
        label={`${SWITCH.travel}`}
      />
      <MeasureH
        x1={0}
        x2={SWITCH.trackW}
        y={SWITCH.trackH + 12}
        label={`${SWITCH.trackW}`}
        labelYOffset={9}
      />
      <MeasureH
        x1={SWITCH.trackW}
        x2={AN_LABEL_X}
        y={SWITCH.trackH + 12}
        label={`${SWITCH.labelGap}`}
        labelYOffset={9}
      />
      <MeasureV
        x={AN_LABEL_X + AN_LABEL_W + 12}
        y1={0}
        y2={SWITCH.trackH}
        label={`${SWITCH.trackH}`}
        labelXOffset={5}
        labelAnchor="start"
      />
    </g>
  )
}

export function SwitchAnatomy() {
  return (
    <AnatomyFrame viewBox="-86 -60 274 122" ariaLabel="Switch anatomy">
      <ControlShape />
      <ThumbShape />
      <LabelShape />
      <AnnotationsLayer />
      <AnatomyCallout
        part="control"
        label="Track"
        anchor={[0, SWITCH.trackH / 2]}
        side="start"
        measure={`${SWITCH.trackW} x ${SWITCH.trackH}, r${SWITCH.trackRx}`}
        caption="The role switch button, filled with fg when checked"
      />
      <AnatomyCallout
        part="thumb"
        label="Thumb"
        anchor={[AN_THUMB_CX, SWITCH.inset]}
        side="top"
        distance={SWITCH.inset - AN_TAG_BOTTOM}
        isAccent
        measure={`${SWITCH.thumb} round, inset ${SWITCH.inset}, travel ${SWITCH.travel}`}
        caption="Springs between off and on, squashes while pressed"
      />
      <AnatomyCallout
        part="label"
        label="Label"
        anchor={[AN_LABEL_X + AN_LABEL_W / 2, AN_LABEL_TOP]}
        side="top"
        distance={AN_LABEL_TOP - AN_TAG_BOTTOM}
        measure={`14px text, ${SWITCH.labelGap} gap, min-h ${SWITCH.trackH}`}
        caption="Optional label prop, clicking it toggles the switch"
      />
    </AnatomyFrame>
  )
}
