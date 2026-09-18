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

const SPLIT = {
  w: 170,
  h: 96,
  ps: 14,
  py: 14,
  titleFont: 12,
  lineH: 3,
  btnW: 60,
  btnH: 22,
  btnFont: 10,
  arrowW: 8,
  arrowGap: 4,
  phoneW: 40,
  phoneTop: 14,
  phoneR: 10,
  phonePe: 14,
} as const

const LANE = 18
const BP_X = (220 - SPLIT.w - LANE) / 2 + LANE
const BP_Y = 20
const BOTTOM = BP_Y + SPLIT.h
const TEXT_X = BP_X + SPLIT.ps
const TITLE_Y = BP_Y + SPLIT.py + 20
const LINE_Y = [TITLE_Y + 7, TITLE_Y + 13]
const LINE_W = [80, 60]
const BTN_Y = LINE_Y[1] + 11
const BTN_CY = BTN_Y + SPLIT.btnH / 2
const LABEL_W = 6 * SPLIT.btnFont * 0.55
const LABEL_X = TEXT_X + (SPLIT.btnW - LABEL_W - SPLIT.arrowGap - SPLIT.arrowW) / 2
const ARROW_X = LABEL_X + LABEL_W + SPLIT.arrowGap
const PHONE_X = BP_X + SPLIT.w - SPLIT.phonePe - SPLIT.phoneW
const PHONE_Y = BP_Y + SPLIT.phoneTop
const NOTE_Y = BOTTOM + 12

const TEXT_ON_SOLID = `${DRAFT_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`
const INK_ON_SOLID = `${DRAFT_INK_MORPH} stroke-current group-hover:stroke-(--color-bg) group-focus-visible:stroke-(--color-bg)`
const BOX = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`
const PHONE = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-fg) group-focus-visible:fill-(--color-fg)`
const SCREEN = `${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-40 group-hover:fill-(--color-bg) group-hover:opacity-100 group-hover:stroke-transparent group-focus-visible:fill-(--color-bg) group-focus-visible:opacity-100 group-focus-visible:stroke-transparent`
const COPY_LINE = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40`
const ARROW_SLIDE =
  'transition-[translate] duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-slow) group-focus-visible:delay-(--motion-dur-slow) group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none motion-reduce:translate-none'

function phonePath(x: number, y: number, w: number, r: number, bottom: number) {
  return `M${x} ${bottom} V${y + r} Q${x} ${y} ${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${bottom}`
}

export function CtaSplitBlueprint() {
  const theme = draftTheme

  return (
    <DraftSurface>
      <rect
        x={BP_X}
        y={BP_Y}
        width={SPLIT.w}
        height={SPLIT.h}
        rx={4}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${BOX}`}
      />

      <text
        x={TEXT_X}
        y={TITLE_Y}
        fontSize={SPLIT.titleFont}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Every screen
      </text>
      {LINE_Y.map((y, i) => (
        <rect
          key={y}
          x={TEXT_X}
          y={y}
          width={LINE_W[i]}
          height={SPLIT.lineH}
          rx={1.5}
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${COPY_LINE}`}
        />
      ))}

      <rect
        x={TEXT_X}
        y={BTN_Y}
        width={SPLIT.btnW}
        height={SPLIT.btnH}
        rx={4}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_SOLID}`}
      />
      <text
        x={LABEL_X}
        y={BTN_CY + SPLIT.btnFont * 0.35}
        fontSize={SPLIT.btnFont}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${TEXT_ON_SOLID}`}
      >
        Browse
      </text>
      <g className={ARROW_SLIDE}>
        <path
          d={`M${ARROW_X} ${BTN_CY} H${ARROW_X + SPLIT.arrowW} M${ARROW_X + SPLIT.arrowW - 3.5} ${BTN_CY - 3.5} L${ARROW_X + SPLIT.arrowW} ${BTN_CY} L${ARROW_X + SPLIT.arrowW - 3.5} ${BTN_CY + 3.5}`}
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${INK_ON_SOLID}`}
        />
      </g>

      <path
        d={phonePath(PHONE_X, PHONE_Y, SPLIT.phoneW, SPLIT.phoneR, BOTTOM)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${PHONE}`}
      />
      <path
        d={phonePath(PHONE_X + 2, PHONE_Y + 2, SPLIT.phoneW - 4, SPLIT.phoneR - 2, BOTTOM - 0.6)}
        strokeWidth={theme.guide.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${SCREEN}`}
      />
      <rect
        x={PHONE_X + SPLIT.phoneW / 2 - 6}
        y={PHONE_Y + 5}
        width={12}
        height={3.5}
        rx={1.75}
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-current opacity-60 group-hover:fill-(--color-fg)`}
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={TEXT_X}
          y={BP_Y + SPLIT.py}
          w={PHONE_X - TEXT_X - 10}
          h={SPLIT.h - SPLIT.py * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={SPLIT.w}
          boxH={SPLIT.h}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame x={BP_X} y={BP_Y} w={SPLIT.w} h={SPLIT.h} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + SPLIT.w}
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
          r4 · ps 56 · phone 55% · lg 2 cols
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
