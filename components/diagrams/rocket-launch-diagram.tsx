'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimH,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'

const SCALE = 0.71
const OFFSET_X = 79.6
const OFFSET_Y = 18.7

const SRC = {
  bodyLeft: 10.35,
  bodyRight: 75.35,
  bodyTop: 0,
  bodyBottom: 165.9,
} as const

const BODY_LEFT = SRC.bodyLeft * SCALE + OFFSET_X
const BODY_RIGHT = SRC.bodyRight * SCALE + OFFSET_X
const BODY_TOP = SRC.bodyTop * SCALE + OFFSET_Y
const BODY_BOTTOM = SRC.bodyBottom * SCALE + OFFSET_Y
const NOSE_TIP_Y = -8 * SCALE + OFFSET_Y

export function RocketLaunchBlueprint() {
  const theme = blueprintTheme

  return (
    <Blueprint className="h-auto w-84 sm:w-100">
      <g transform={`translate(${OFFSET_X}, ${OFFSET_Y}) scale(${SCALE})`}>
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity}
            d="M10.3516 126.117L10.2515 48.718C10.2515 42.818 14.5515 35.518 16.5515 34.818C17.5515 34.418 18.3515 35.418 18.9515 36.118C20.4515 38.018 23.2515 43.018 23.5515 46.118L23.6515 49.118V107.617"
          />
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity}
            d="M62.2515 108.518L62.4515 41.2176C62.2515 24.6176 54.2515 9.11759 44.5515 1.01759C43.7515 0.31759 42.7515 0.11759 42.1515 0.61759C36.2515 4.71759 23.2515 19.9176 23.4515 41.9176V46.0176"
          />
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity}
            d="M62.3515 108.816L62.2515 48.7165C62.2515 42.7165 65.9515 35.8165 67.7515 35.0165C69.5515 34.2165 69.8515 35.4165 70.6515 36.3165C72.0515 38.0165 74.8515 43.0165 75.0515 47.3165V127.117"
          />
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity * 0.6}
            d="M10.8516 44.6172C13.5516 47.1172 20.1516 47.3172 23.1516 44.6172"
          />
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity * 0.6}
            d="M10.3516 47.7168C13.0516 50.6168 20.8516 50.8168 23.6516 47.7168"
          />
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity * 0.6}
            d="M63.0518 44.5176C65.5518 46.7176 71.5518 47.3176 74.7518 44.6176"
          />
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity * 0.6}
            d="M62.4517 47.5176C64.6517 50.2176 72.7517 50.8176 75.0517 47.7176"
          />
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity}
            d="M27.3517 91.1176C25.4517 108.018 20.4517 117.118 9.55172 127.018C3.05172 133.318 0.251724 135.818 0.351724 144.718C0.251724 146.218 0.751725 146.118 3.05172 146.518L26.9517 150.018L27.8517 150.218L37.0517 152.418L40.6517 152.518H44.6517L49.0517 152.418L58.6517 150.518L83.6517 146.518C85.5517 146.118 85.3517 146.218 85.3517 144.718C85.3517 137.518 82.5517 134.318 77.0517 129.018C69.7517 122.018 61.3517 112.618 58.8517 98.1176C56.8517 87.0176 57.2517 82.7176 53.2517 70.0176C49.2517 57.3176 46.2517 53.5176 42.7517 53.5176C37.2517 53.5176 31.7517 66.7176 29.2517 78.7176L27.3517 91.1176Z"
            className={BP_MORPH}
            fillOpacity={0}
          />
          <path
            strokeWidth={theme.wireframe.strokeWidth / SCALE}
            strokeOpacity={theme.wireframe.strokeOpacity}
            d="M42.7516 128.516C42.0516 128.516 40.8516 134.116 40.8516 145.616C40.8516 152.716 41.4516 165.216 42.7516 165.116C43.4516 165.216 43.5516 164.116 44.0516 160.516C44.8516 155.516 45.0516 140.016 44.0516 133.116C43.5516 130.216 43.3516 128.316 42.7516 128.516Z"
          />
        </g>
        <path
          d="M38.8516 83.6176C37.8516 83.7176 36.9516 83.2176 37.0516 81.7176C36.9516 78.5176 39.5516 75.6176 42.5516 75.5176C45.5516 75.5176 48.0516 78.3176 48.2516 81.5176C48.2516 83.6176 47.4516 83.6176 45.7516 83.5176C43.4516 83.2176 41.2516 83.3176 38.8516 83.6176Z"
          stroke="currentColor"
          strokeWidth={theme.wireframe.strokeWidth / SCALE}
          strokeOpacity={theme.wireframe.strokeOpacity}
          className={`${BP_MORPH} fill-transparent group-hover:fill-(--color-accent) group-hover:fill-opacity-30`}
        />
      </g>

      <g className={BP_HIDE_ON_MORPH}>
        <Selection
          x={BODY_LEFT}
          y={NOSE_TIP_Y}
          w={BODY_RIGHT - BODY_LEFT}
          h={BODY_BOTTOM - NOSE_TIP_Y}
        />
        <DimV x={BODY_LEFT - 16} y1={BODY_TOP} y2={BODY_BOTTOM} label="166" labelXOffset={-6} />
        <DimH x1={BODY_LEFT} x2={BODY_RIGHT} y={NOSE_TIP_Y - 10} label="86" />
      </g>
    </Blueprint>
  )
}
