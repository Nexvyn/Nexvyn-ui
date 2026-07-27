'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_FILL_PANEL,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'

const BODY = { cx: 110, w: 38, noseY: 10, noseH: 18, h: 56 }
const BODY_TOP = BODY.noseY + BODY.noseH
const BODY_BOTTOM = BODY_TOP + BODY.h
const BODY_LEFT = BODY.cx - BODY.w / 2
const BODY_RIGHT = BODY.cx + BODY.w / 2

const FIN_FLARE = 10
const FIN_H = 12

const PAD = { w: 78, h: 7 }
const PAD_Y = BODY_BOTTOM + FIN_H - 4

const WINDOW = { cy: BODY_TOP + 16, r: 6 }

const NOZZLE_COUNT = 4
const NOZZLE_W = 3.4
const NOZZLE_H = 9
const NOZZLE_INSET = 6
const nozzleXs = Array.from({ length: NOZZLE_COUNT }, (_, i) => {
  const span = BODY.w - NOZZLE_INSET * 2
  return BODY_LEFT + NOZZLE_INSET + (span * i) / (NOZZLE_COUNT - 1)
})

export function RocketLaunchBlueprint() {
  const theme = blueprintTheme

  return (
    <Blueprint className="h-auto w-70 sm:w-85">
      <rect
        x={BODY.cx - PAD.w / 2}
        y={PAD_Y}
        width={PAD.w}
        height={PAD.h}
        rx={2}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />

      <path
        d={`M ${BODY_LEFT} ${BODY_BOTTOM - FIN_H} L ${BODY_LEFT - FIN_FLARE} ${BODY_BOTTOM + FIN_H * 0.6} L ${BODY_LEFT} ${BODY_BOTTOM} Z`}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />
      <path
        d={`M ${BODY_RIGHT} ${BODY_BOTTOM - FIN_H} L ${BODY_RIGHT + FIN_FLARE} ${BODY_BOTTOM + FIN_H * 0.6} L ${BODY_RIGHT} ${BODY_BOTTOM} Z`}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />

      <rect
        x={BODY_LEFT}
        y={BODY_TOP}
        width={BODY.w}
        height={BODY.h}
        rx={BODY.w / 2}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />

      <path
        d={`M ${BODY.cx} ${BODY.noseY} L ${BODY_RIGHT} ${BODY_TOP + 4} L ${BODY_LEFT} ${BODY_TOP + 4} Z`}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />

      <circle
        cx={BODY.cx}
        cy={WINDOW.cy}
        r={WINDOW.r}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />

      {nozzleXs.map((x, i) => (
        <rect
          key={i}
          x={x - NOZZLE_W / 2}
          y={BODY_BOTTOM - 2}
          width={NOZZLE_W}
          height={NOZZLE_H}
          rx={1}
          className={`${BP_MORPH} fill-current opacity-40 group-hover:fill-(--color-accent) group-hover:opacity-100 group-focus-visible:fill-(--color-accent) group-focus-visible:opacity-100`}
          style={{ transformOrigin: `${x}px ${BODY_BOTTOM}px` }}
        />
      ))}

      <g className={BP_HIDE_ON_MORPH}>
        <Selection
          x={BODY_LEFT - FIN_FLARE}
          y={BODY.noseY}
          w={BODY.w + FIN_FLARE * 2}
          h={BODY_BOTTOM + FIN_H - BODY.noseY}
        />
        <DimV
          x={BODY_LEFT - FIN_FLARE - 10}
          y1={BODY_TOP}
          y2={BODY_BOTTOM}
          label="56"
          labelXOffset={-6}
        />
        <DimH x1={BODY_LEFT} x2={BODY_RIGHT} y={BODY_TOP - 8} label="38" />
        <DimH
          x1={BODY.cx - PAD.w / 2}
          x2={BODY.cx + PAD.w / 2}
          y={PAD_Y + PAD.h + 10}
          label="pad 78"
        />
        <DimLabel x={BODY.cx} y={PAD_Y + PAD.h + 20} anchor="middle">
          4x engines
        </DimLabel>
      </g>
    </Blueprint>
  )
}
