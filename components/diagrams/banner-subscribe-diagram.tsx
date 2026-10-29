'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useId } from 'react'
import {
  DraftSurface,
  DRAFT_FILL_SOLID,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const S = 0.68
const SECTION = {
  w: 200,
  pad: 20 * S,
  r: 4 * S,
  rowH: 68 * S,
  titleLine: 24 * S,
  titleFont: 16 * S,
  descGap: 4 * S,
  descLine: 20 * S,
  descFont: 14 * S,
  colGap: 16 * S,
  textColW: 70,
  fieldH: 40 * S,
  fieldPx: 12 * S,
  btnPx: 16 * S,
  fieldGap: 8 * S,
  errorGap: 8 * S,
  errorH: 20 * S,
  font: 14 * S,
} as const
const SECTION_H = SECTION.pad * 2 + SECTION.rowH

const BP_X = (220 - SECTION.w) / 2
const BP_Y = (140 - SECTION_H) / 2 - 4
const ROW_Y = BP_Y + SECTION.pad
const CONTENT_X = BP_X + SECTION.pad
const CONTENT_END = BP_X + SECTION.w - SECTION.pad
const TEXT_H = SECTION.titleLine + SECTION.descGap + SECTION.descLine
const TEXT_Y = ROW_Y + (SECTION.rowH - TEXT_H) / 2
const CHAR = SECTION.font * 0.55
const BUTTON = 'Join'
const BTN_W = SECTION.btnPx * 2 + BUTTON.length * CHAR
const FORM_X = CONTENT_X + SECTION.textColW + SECTION.colGap
const BTN_X = CONTENT_END - BTN_W
const FIELD_W = BTN_X - SECTION.fieldGap - FORM_X
const ERROR_Y = ROW_Y + SECTION.fieldH + SECTION.errorGap
const FIELD_TEXT_Y = ROW_Y + SECTION.fieldH / 2 + SECTION.font * 0.35

const SECTION_SURFACE = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface) group-focus-visible:fill-(--color-surface) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`
const FIELD_SURFACE = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`
const TEXT_ON_SOLID = `${DRAFT_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`
const TEXT_MUTED = `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:fill-(--color-muted) group-focus-visible:fill-(--color-muted) group-hover:opacity-100 group-focus-visible:opacity-100`

const PRESS_CSS = `
  @keyframes bp-subscribe-press {
    0% { transform: scale(1); }
    40% { transform: scale(0.97); }
    100% { transform: scale(1); }
  }
  .blueprint .bp-subscribe-press { transform-box: fill-box; transform-origin: center; }
  .group:hover .blueprint .bp-subscribe-press,
  .group:focus-visible .blueprint .bp-subscribe-press {
    animation: bp-subscribe-press 450ms var(--motion-ease-in-out) 650ms both;
  }
  @media (prefers-reduced-motion: reduce) {
    .group:hover .blueprint .bp-subscribe-press,
    .group:focus-visible .blueprint .bp-subscribe-press { animation: none; }
  }
`

export function BannerSubscribeBlueprint() {
  const theme = draftTheme
  const hatchId = `bp-hatch-subscribe-${useId().replace(/:/g, '')}`

  return (
    <DraftSurface>
      <style>{PRESS_CSS}</style>
      <defs>
        <pattern
          id={hatchId}
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
            strokeWidth="0.5"
            opacity="0.35"
          />
        </pattern>
      </defs>

      <rect
        x={BP_X}
        y={BP_Y}
        width={SECTION.w}
        height={SECTION_H}
        rx={SECTION.r}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${SECTION_SURFACE}`}
      />

      <text
        x={CONTENT_X}
        y={TEXT_Y + SECTION.titleLine / 2 + SECTION.titleFont * 0.35}
        fontSize={SECTION.titleFont}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Get updates
      </text>
      <text
        x={CONTENT_X}
        y={
          TEXT_Y +
          SECTION.titleLine +
          SECTION.descGap +
          SECTION.descLine / 2 +
          SECTION.descFont * 0.35
        }
        fontSize={SECTION.descFont}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${TEXT_MUTED}`}
      >
        No spam.
      </text>

      <rect
        x={FORM_X}
        y={ROW_Y}
        width={FIELD_W}
        height={SECTION.fieldH}
        rx={SECTION.r}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${FIELD_SURFACE}`}
      />
      <text
        x={FORM_X + SECTION.fieldPx}
        y={FIELD_TEXT_Y}
        fontSize={SECTION.font}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${TEXT_MUTED}`}
      >
        Email
      </text>

      <g className="bp-subscribe-press">
        <rect
          x={BTN_X}
          y={ROW_Y}
          width={BTN_W}
          height={SECTION.fieldH}
          rx={SECTION.r}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          style={beat(DRAFT_BEAT.anatomy)}
          className={`ink-draw ${DRAFT_FILL_SOLID}`}
        />
        <rect
          x={BTN_X}
          y={ROW_Y}
          width={BTN_W}
          height={SECTION.fieldH}
          rx={SECTION.r}
          fill={`url(#${hatchId})`}
          stroke="none"
          style={beat(DRAFT_BEAT.hatch)}
          className={`fade-note ${DRAFT_SCAFFOLD_FADE}`}
        />
        <text
          x={BTN_X + BTN_W / 2}
          y={FIELD_TEXT_Y}
          textAnchor="middle"
          fontSize={SECTION.font}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${TEXT_ON_SOLID}`}
        >
          {BUTTON}
        </text>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <rect
          x={FORM_X}
          y={ERROR_Y}
          width={CONTENT_END - FORM_X}
          height={SECTION.errorH}
          rx={2}
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
          style={beat(DRAFT_BEAT.guide)}
          className="dash-march"
        />
        <InsetGuide
          x={CONTENT_X}
          y={ROW_Y}
          w={SECTION.w - SECTION.pad * 2}
          h={SECTION.rowH}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={SECTION.w}
          boxH={SECTION_H}
          boxRx={SECTION.r}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame x={BP_X} y={BP_Y} w={SECTION.w} h={SECTION_H} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + SECTION.w}
          y={BP_Y - 10}
          label="w-full"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureNote
          x={BP_X}
          y={BP_Y + SECTION_H + 12}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          p20 · r4 · input h40 · gap 8
        </MeasureNote>
        <MeasureNote
          x={BP_X}
          y={BP_Y + SECTION_H + 23}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          error slot min-h 20 · success crossfade
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
