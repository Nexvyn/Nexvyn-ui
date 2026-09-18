'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  DraftSurface,
  DRAFT_FILL_SOLID,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
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

const CTA = {
  w: 160,
  h: 92,
  px: 12,
  py: 16,
  titleFont: 14,
  lineH: 3,
  btnH: 24,
  btnFont: 10,
  primaryW: 66,
  secondaryW: 46,
  gap: 6,
  arrowW: 8,
  arrowGap: 4,
} as const

const LANE = 18
const BP_X = (220 - CTA.w - LANE) / 2 + LANE
const BP_Y = 22
const BOTTOM = BP_Y + CTA.h
const CX = BP_X + CTA.w / 2
const TITLE_Y = BP_Y + CTA.py + 11
const LINE_Y = [TITLE_Y + 7, TITLE_Y + 13]
const LINE_W = [112, 84]
const BTN_Y = LINE_Y[1] + 12
const BTN_CY = BTN_Y + CTA.btnH / 2
const BTN_X = CX - (CTA.primaryW + CTA.gap + CTA.secondaryW) / 2
const SECONDARY_X = BTN_X + CTA.primaryW + CTA.gap
const LABEL_W = 6 * CTA.btnFont * 0.55
const LABEL_X = BTN_X + (CTA.primaryW - LABEL_W - CTA.arrowGap - CTA.arrowW) / 2
const ARROW_X = LABEL_X + LABEL_W + CTA.arrowGap
const NOTE_Y = BOTTOM + 12

const TEXT_ON_SOLID = `${DRAFT_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`
const INK_ON_SOLID = `${DRAFT_INK_MORPH} stroke-current group-hover:stroke-(--color-bg) group-focus-visible:stroke-(--color-bg)`
const BOX = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`
const OUTLINE_BUTTON = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-(--color-border-strong) group-focus-visible:stroke-(--color-border-strong)`
const COPY_LINE = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40`
const ARROW_SLIDE =
  'transition-[translate] duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-slow) group-focus-visible:delay-(--motion-dur-slow) group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none motion-reduce:translate-none'

function Label({
  x,
  y,
  size,
  anchor = 'middle',
  className = DRAFT_TEXT_SOFT,
  children,
}: {
  x: number
  y: number
  size: number
  anchor?: 'start' | 'middle'
  className?: string
  children: string
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      fontFamily="var(--font-sans)"
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${className}`}
    >
      {children}
    </text>
  )
}

export function CtaCenteredBlueprint() {
  const theme = draftTheme

  return (
    <DraftSurface>
      <rect
        x={BP_X}
        y={BP_Y}
        width={CTA.w}
        height={CTA.h}
        rx={4}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${BOX}`}
      />

      <Label x={CX} y={TITLE_Y} size={CTA.titleFont}>
        Start building
      </Label>
      {LINE_Y.map((y, i) => (
        <rect
          key={y}
          x={CX - LINE_W[i] / 2}
          y={y}
          width={LINE_W[i]}
          height={CTA.lineH}
          rx={1.5}
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${COPY_LINE}`}
        />
      ))}

      <rect
        x={BTN_X}
        y={BTN_Y}
        width={CTA.primaryW}
        height={CTA.btnH}
        rx={4}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_SOLID}`}
      />
      <Label
        x={LABEL_X}
        y={BTN_CY + CTA.btnFont * 0.35}
        size={CTA.btnFont}
        anchor="start"
        className={TEXT_ON_SOLID}
      >
        Browse
      </Label>
      <g className={ARROW_SLIDE}>
        <path
          d={`M${ARROW_X} ${BTN_CY} H${ARROW_X + CTA.arrowW} M${ARROW_X + CTA.arrowW - 3.5} ${BTN_CY - 3.5} L${ARROW_X + CTA.arrowW} ${BTN_CY} L${ARROW_X + CTA.arrowW - 3.5} ${BTN_CY + 3.5}`}
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${INK_ON_SOLID}`}
        />
      </g>

      <rect
        x={SECONDARY_X}
        y={BTN_Y}
        width={CTA.secondaryW}
        height={CTA.btnH}
        rx={4}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${OUTLINE_BUTTON}`}
      />
      <Label
        x={SECONDARY_X + CTA.secondaryW / 2}
        y={BTN_CY + CTA.btnFont * 0.35}
        size={CTA.btnFont}
      >
        Docs
      </Label>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={BP_X + CTA.px}
          y={BP_Y + CTA.py}
          w={CTA.w - CTA.px * 2}
          h={CTA.h - CTA.py * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={CTA.w}
          boxH={CTA.h}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame x={BP_X} y={BP_Y} w={CTA.w} h={CTA.h} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + CTA.w}
          y={BP_Y - 10}
          label="w-full"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BOTTOM}
          label="auto"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X}
          y={NOTE_Y}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          border · r4 · py 64 · px 24
        </MeasureNote>
        <MeasureNote
          x={BP_X}
          y={NOTE_Y + 11}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          actions h44 · gap 12
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
