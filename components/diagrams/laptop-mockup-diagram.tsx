'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  DraftSurface,
  DRAFT_FILL_MUTED,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const S = 0.5
const LID = { w: 280 * S, border: 2 * S, bezel: 6 * S, rx: 10 * S } as const
const SCREEN = { h: 184 * S, rx: 4 * S } as const
const BASE = { w: 315 * S, h: 10 * S, rx: 10 * S } as const
const NOTCH = { w: 56 * S, h: 4 * S, rx: 4 * S } as const
const SCREEN_FONT = 10

const LID_H = LID.border + LID.bezel + SCREEN.h
const LID_X = (220 - LID.w) / 2
const LID_Y = 26
const LID_BOTTOM = LID_Y + LID_H
const BASE_X = (220 - BASE.w) / 2
const SCREEN_X = LID_X + LID.border + LID.bezel
const SCREEN_Y = LID_Y + LID.border + LID.bezel
const SCREEN_W = LID.w - (LID.border + LID.bezel) * 2

function topRoundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  return `M ${x} ${y + h} V ${y + r} Q ${x} ${y} ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h} Z`
}

function bottomRoundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, h)
  return `M ${x} ${y} H ${x + w} V ${y + h - rr} Q ${x + w} ${y + h} ${x + w - rr} ${y + h} H ${x + rr} Q ${x} ${y + h} ${x} ${y + h - rr} Z`
}

export function LaptopMockupWireframe() {
  const theme = draftTheme

  return (
    <DraftSurface className="h-auto w-80 sm:w-105 lg:w-95">
      <defs>
        <pattern
          id="bp-hatch-laptop-screen"
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
      <path
        d={topRoundedRectPath(LID_X, LID_Y, LID.w, LID_H, LID.rx)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-popover) group-hover:stroke-(--color-fg) group-focus-visible:fill-(--color-popover) group-focus-visible:stroke-(--color-fg)`}
      />

      <path
        d={topRoundedRectPath(SCREEN_X, SCREEN_Y, SCREEN_W, SCREEN.h, SCREEN.rx)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_MUTED}`}
      />
      <path
        d={topRoundedRectPath(SCREEN_X, SCREEN_Y, SCREEN_W, SCREEN.h, SCREEN.rx)}
        fill="url(#bp-hatch-laptop-screen)"
        style={beat(DRAFT_BEAT.hatch)}
        className={`${DRAFT_SCAFFOLD_FADE} fade-note`}
      />
      <text
        x={SCREEN_X + SCREEN_W / 2}
        y={SCREEN_Y + SCREEN.h / 2 + SCREEN_FONT * 0.35}
        textAnchor="middle"
        fontSize={SCREEN_FONT}
        fontFamily="var(--font-sans)"
        className={`${DRAFT_INK_MORPH} fill-(--color-muted) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        Screen
      </text>

      <path
        d={bottomRoundedRectPath(BASE_X, LID_BOTTOM, BASE.w, BASE.h, BASE.rx)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-card) group-hover:stroke-transparent group-focus-visible:fill-(--color-card) group-focus-visible:stroke-transparent`}
      />
      <path
        d={bottomRoundedRectPath(110 - NOTCH.w / 2, LID_BOTTOM, NOTCH.w, NOTCH.h, NOTCH.rx)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-current opacity-30 group-hover:fill-(--color-muted) group-hover:opacity-100 group-focus-visible:fill-(--color-muted) group-focus-visible:opacity-100`}
        style={beat(DRAFT_BEAT.hatch)}
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={LID_X} y={LID_Y} w={LID.w} h={LID_H} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={LID_X}
          x2={LID_X + LID.w}
          y={LID_Y - 10}
          label="280"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BASE_X - 5}
          y1={SCREEN_Y}
          y2={LID_BOTTOM}
          label="184"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <InsetGuide
          x={SCREEN_X}
          y={SCREEN_Y}
          w={SCREEN_W}
          h={SCREEN.h}
          offset={0.8}
          boxX={LID_X}
          boxY={LID_Y}
          boxW={LID.w}
          boxH={LID_H}
          boxRx={LID.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={LID_X + LID.w + 5}
          y={LID_Y + 4}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          r10
        </MeasureNote>
        <MeasureNote
          x={LID_X + LID.w + 5}
          y={LID_Y + 15}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          p6
        </MeasureNote>
        <MeasureNote
          x={BASE_X + BASE.w + 4}
          y={LID_BOTTOM + BASE.h / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          w315
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
