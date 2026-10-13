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
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const S = 0.68
const CARD = {
  w: 180,
  pad: 16 * S,
  r: 4 * S,
  titleLine: 24 * S,
  titleFont: 16 * S,
  descGap: 4 * S,
  descLine: 20 * S,
  descFont: 14 * S,
  actionsGap: 16 * S,
  btnH: 36 * S,
  btnPx: 16 * S,
  btnGap: 8 * S,
  btnFont: 14 * S,
} as const
const CARD_H =
  CARD.pad * 2 + CARD.titleLine + CARD.descGap + CARD.descLine * 2 + CARD.actionsGap + CARD.btnH

const LANE = 18
const BP_X = (220 - CARD.w - LANE) / 2 + LANE
const BP_Y = 23
const CONTENT_X = BP_X + CARD.pad
const TITLE_Y = BP_Y + CARD.pad + CARD.titleLine / 2 + CARD.titleFont * 0.35
const DESC_TOP = BP_Y + CARD.pad + CARD.titleLine + CARD.descGap
const BTN_Y = DESC_TOP + CARD.descLine * 2 + CARD.actionsGap
const CHAR = CARD.btnFont * 0.55
const ACCEPT = 'Accept all'
const DECLINE = 'Decline'
const ACCEPT_W = CARD.btnPx * 2 + ACCEPT.length * CHAR
const DECLINE_W = CARD.btnPx * 2 + DECLINE.length * CHAR
const ACCEPT_X = BP_X + CARD.w - CARD.pad - ACCEPT_W
const DECLINE_X = ACCEPT_X - CARD.btnGap - DECLINE_W
const BTN_TEXT_Y = BTN_Y + CARD.btnH / 2 + CARD.btnFont * 0.35

const CARD_SURFACE = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`
const OUTLINE_BTN = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`
const TEXT_ON_SOLID = `${DRAFT_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`
const TEXT_MUTED = `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:fill-(--color-muted) group-focus-visible:fill-(--color-muted) group-hover:opacity-100 group-focus-visible:opacity-100`

const PRESS_CSS = `
  @keyframes bp-cookie-press {
    0% { transform: scale(1); }
    40% { transform: scale(0.97); }
    100% { transform: scale(1); }
  }
  .blueprint .bp-cookie-press { transform-box: fill-box; transform-origin: center; }
  .group:hover .blueprint .bp-cookie-press,
  .group:focus-visible .blueprint .bp-cookie-press {
    animation: bp-cookie-press 450ms var(--motion-ease-in-out) 650ms both;
  }
  @media (prefers-reduced-motion: reduce) {
    .group:hover .blueprint .bp-cookie-press,
    .group:focus-visible .blueprint .bp-cookie-press { animation: none; }
  }
`

export function BannerCookieBlueprint() {
  const theme = draftTheme
  const hatchId = `bp-hatch-cookie-${useId().replace(/:/g, '')}`

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
        width={CARD.w}
        height={CARD_H}
        rx={CARD.r}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${CARD_SURFACE}`}
      />

      <text
        x={CONTENT_X}
        y={TITLE_Y}
        fontSize={CARD.titleFont}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        We use cookies
      </text>
      {['Cookies keep the site working.', 'Change your choice any time.'].map((line, index) => (
        <text
          key={line}
          x={CONTENT_X}
          y={DESC_TOP + CARD.descLine * index + CARD.descLine / 2 + CARD.descFont * 0.35}
          fontSize={CARD.descFont}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${TEXT_MUTED}`}
        >
          {line}
        </text>
      ))}

      <rect
        x={DECLINE_X}
        y={BTN_Y}
        width={DECLINE_W}
        height={CARD.btnH}
        rx={CARD.r}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${OUTLINE_BTN}`}
      />
      <text
        x={DECLINE_X + DECLINE_W / 2}
        y={BTN_TEXT_Y}
        textAnchor="middle"
        fontSize={CARD.btnFont}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        {DECLINE}
      </text>

      <g className="bp-cookie-press">
        <rect
          x={ACCEPT_X}
          y={BTN_Y}
          width={ACCEPT_W}
          height={CARD.btnH}
          rx={CARD.r}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          style={beat(DRAFT_BEAT.anatomy)}
          className={`ink-draw ${DRAFT_FILL_SOLID}`}
        />
        <rect
          x={ACCEPT_X}
          y={BTN_Y}
          width={ACCEPT_W}
          height={CARD.btnH}
          rx={CARD.r}
          fill={`url(#${hatchId})`}
          stroke="none"
          style={beat(DRAFT_BEAT.hatch)}
          className={`fade-note ${DRAFT_SCAFFOLD_FADE}`}
        />
        <text
          x={ACCEPT_X + ACCEPT_W / 2}
          y={BTN_TEXT_Y}
          textAnchor="middle"
          fontSize={CARD.btnFont}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${TEXT_ON_SOLID}`}
        >
          {ACCEPT}
        </text>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={CONTENT_X}
          y={BP_Y + CARD.pad}
          w={CARD.w - CARD.pad * 2}
          h={CARD_H - CARD.pad * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={CARD.w}
          boxH={CARD_H}
          boxRx={CARD.r}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame x={BP_X} y={BP_Y} w={CARD.w} h={CARD_H} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + CARD.w}
          y={BP_Y - 8.5}
          label="w-full · max 448"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 8}
          y1={BP_Y}
          y2={BP_Y + CARD_H}
          label="152"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X}
          y={BP_Y + CARD_H + 10}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          p16 · r4 · btn h36 · gap 8
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
