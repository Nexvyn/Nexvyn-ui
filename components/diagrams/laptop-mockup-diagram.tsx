'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  DraftSurface,
  DRAFT_FILL_PANEL,
  DRAFT_FILL_SOLID,
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
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/parts'

const LID = { x: 35, y: 18, w: 150, rx: 5.4 } as const
const SCALE = LID.w / 280

const LID_BORDER = Math.round(2 * SCALE * 10) / 10
const BEZEL = Math.round(6 * SCALE * 10) / 10
const SCREEN_H = Math.round(184 * SCALE * 10) / 10
const SCREEN_RX = Math.round(4 * SCALE * 10) / 10
const BASE_OVERHANG = Math.round(((315 - 280) / 2) * SCALE * 10) / 10
const BASE_H = Math.round(10 * SCALE * 10) / 10
const NOTCH = {
  w: Math.round(56 * SCALE * 10) / 10,
  h: Math.round(4 * SCALE * 10) / 10,
  rx: Math.round(4 * SCALE * 10) / 10,
}

function topRoundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  return `M ${x} ${y + h} V ${y + r} Q ${x} ${y} ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h} Z`
}

function bottomRoundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  return `M ${x} ${y} H ${x + w} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} Z`
}

export function LaptopMockupWireframe() {
  const theme = draftTheme
  const baseX = LID.x - BASE_OVERHANG
  const baseW = LID.w + BASE_OVERHANG * 2
  const lidH = LID_BORDER + BEZEL + SCREEN_H
  const lidBottom = LID.y + lidH
  const screenX = LID.x + BEZEL
  const screenY = LID.y + LID_BORDER + BEZEL
  const screenW = LID.w - BEZEL * 2

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
        d={topRoundedRectPath(LID.x, LID.y, LID.w, lidH, LID.rx)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />

      <path
        d={topRoundedRectPath(screenX, screenY, screenW, SCREEN_H, SCREEN_RX)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_SOLID}`}
      />
      <path
        d={topRoundedRectPath(screenX, screenY, screenW, SCREEN_H, SCREEN_RX)}
        fill="url(#bp-hatch-laptop-screen)"
        style={beat(DRAFT_BEAT.hatch)}
        className={`${DRAFT_SCAFFOLD_FADE} fade-note`}
      />

      <path
        d={bottomRoundedRectPath(baseX, lidBottom, baseW, BASE_H, LID.rx)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />

      <rect
        x={LID.x + LID.w / 2 - NOTCH.w / 2}
        y={lidBottom}
        width={NOTCH.w}
        height={NOTCH.h}
        rx={NOTCH.rx / 2}
        className={`fade-note ${DRAFT_INK_MORPH} fill-current opacity-30 group-hover:opacity-60 group-focus-visible:opacity-60`}
        style={beat(DRAFT_BEAT.hatch)}
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={baseX}
          y={LID.y}
          w={baseW}
          h={lidBottom + BASE_H - LID.y}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={LID.x}
          x2={LID.x + LID.w}
          y={LID.y - 8}
          label="280"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={baseX - 7}
          y1={LID.y}
          y2={lidBottom}
          label="184"
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={LID.x}
          y={LID.y - 12}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          r10
        </MeasureNote>
        <InsetGuide
          x={screenX}
          y={screenY}
          w={screenW}
          h={SCREEN_H}
          offset={0.8}
          boxX={LID.x}
          boxY={LID.y}
          boxW={LID.w}
          boxH={lidH}
          boxRx={LID.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={LID.x + LID.w + 6}
          y={screenY + 4}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          6
        </MeasureNote>
        <MeasureNote
          x={LID.x + LID.w / 2}
          y={lidBottom + BASE_H + 10}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          base +35
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
