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
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const REAL = { w: 256, h: 532, rx: 41.6, pad: 2, screenInset: 3.5, screenRx: 36.8 } as const
const PH_H = 106
const S = PH_H / REAL.h
const PH_W = REAL.w * S
const PH_X = (220 - PH_W) / 2
const PH_Y = 26
const PH_RX = REAL.rx * S
const SCREEN_INSET = (REAL.pad + REAL.screenInset) * S
const SCREEN_RX = REAL.screenRx * S
const ISLAND = { w: 66 * S, h: 20 * S, top: 9 * S } as const
const HOME = { h: 3 * S, bottom: 5.5 * S } as const
const BUTTON_W = 2 * S
const SCREEN_FONT = 10

const SIDE_BUTTONS = [
  { side: 'left', top: 15.5, height: 3.2 },
  { side: 'left', top: 21, height: 7.2 },
  { side: 'left', top: 30.5, height: 7.2 },
  { side: 'right', top: 23, height: 11.5 },
] as const

export function PhoneMockupWireframe() {
  const theme = draftTheme
  const screenX = PH_X + SCREEN_INSET
  const screenY = PH_Y + SCREEN_INSET
  const screenW = PH_W - SCREEN_INSET * 2
  const screenH = PH_H - SCREEN_INSET * 2
  const homeW = screenW * 0.32

  return (
    <DraftSurface className="h-auto w-90 sm:w-110">
      <defs>
        <pattern
          id="bp-hatch-phone-screen"
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
      {SIDE_BUTTONS.map((btn, i) => {
        const x = btn.side === 'left' ? PH_X - BUTTON_W : PH_X + PH_W + BUTTON_W
        const y1 = PH_Y + (btn.top / 100) * PH_H
        const y2 = y1 + (btn.height / 100) * PH_H
        return (
          <line
            key={i}
            x1={x}
            x2={x}
            y1={y1}
            y2={y2}
            strokeWidth={theme.wireframe.strokeWidth}
            strokeOpacity={theme.wireframe.strokeOpacity}
            strokeLinecap="round"
            className={`fade-note ${DRAFT_INK_MORPH} stroke-current group-hover:stroke-(--bp-accent,var(--color-accent)) group-focus-visible:stroke-(--bp-accent,var(--color-accent))`}
            style={beat(DRAFT_LABEL_ALT_BEAT)}
          />
        )
      })}

      <rect
        x={PH_X}
        y={PH_Y}
        width={PH_W}
        height={PH_H}
        rx={PH_RX}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--bp-accent,var(--color-accent)) group-hover:stroke-transparent group-focus-visible:fill-(--bp-accent,var(--color-accent)) group-focus-visible:stroke-transparent`}
      />

      <rect
        x={screenX}
        y={screenY}
        width={screenW}
        height={screenH}
        rx={SCREEN_RX}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_MUTED}`}
      />
      <rect
        x={screenX}
        y={screenY}
        width={screenW}
        height={screenH}
        rx={SCREEN_RX}
        fill="url(#bp-hatch-phone-screen)"
        style={beat(DRAFT_BEAT.hatch)}
        className={`${DRAFT_SCAFFOLD_FADE} fade-note`}
      />
      <text
        x={PH_X + PH_W / 2}
        y={screenY + screenH / 2 + SCREEN_FONT * 0.35}
        textAnchor="middle"
        fontSize={SCREEN_FONT}
        fontFamily="var(--font-sans)"
        className={`${DRAFT_INK_MORPH} fill-(--color-muted) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        Screen
      </text>

      <rect
        x={PH_X + PH_W / 2 - ISLAND.w / 2}
        y={screenY + ISLAND.top}
        width={ISLAND.w}
        height={ISLAND.h}
        rx={ISLAND.h / 2}
        className={`fade-note ${DRAFT_INK_MORPH} fill-current opacity-60 group-hover:opacity-100 group-focus-visible:opacity-100`}
        style={beat(DRAFT_BEAT.hatch)}
      />

      <rect
        x={PH_X + PH_W / 2 - homeW / 2}
        y={screenY + screenH - HOME.bottom - HOME.h}
        width={homeW}
        height={HOME.h}
        rx={HOME.h / 2}
        className={`fade-note ${DRAFT_INK_MORPH} fill-current opacity-30 group-hover:opacity-20 group-focus-visible:opacity-20`}
        style={beat(DRAFT_LABEL_ALT_BEAT)}
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={PH_X} y={PH_Y} w={PH_W} h={PH_H} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={PH_X}
          x2={PH_X + PH_W}
          y={PH_Y - 11}
          label="256"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={PH_X - 14}
          y1={PH_Y}
          y2={PH_Y + PH_H}
          label="532"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={PH_X - 20}
          y={PH_Y + 6}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          r42
        </MeasureNote>
        <InsetGuide
          x={screenX}
          y={screenY}
          w={screenW}
          h={screenH}
          offset={0.8}
          boxX={PH_X}
          boxY={PH_Y}
          boxW={PH_W}
          boxH={PH_H}
          boxRx={PH_RX}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={PH_X + PH_W + 7}
          y={screenY + ISLAND.top + ISLAND.h / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          66x20
        </MeasureNote>
        <MeasureNote
          x={PH_X + PH_W + 7}
          y={PH_Y + 19}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          2 + 3.5
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
