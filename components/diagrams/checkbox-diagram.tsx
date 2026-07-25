'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  Blueprint,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'

const CHECKBOX = {
  box: 20,
  r: 5,
  gap: 12,
  font: 12,
  labelW: 78,
} as const

const CHECK_PATH = 'M4.2 10.4l3.7 3.8L15.8 6.3'

const TOTAL_W = CHECKBOX.box + CHECKBOX.gap + CHECKBOX.labelW
const BP_X = (220 - TOTAL_W) / 2
const BP_Y = (140 - CHECKBOX.box) / 2

const DRAWN_CHECK_CLASS =
  '[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-(--motion-dur-slow) ease-(--motion-ease-out) group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] motion-reduce:transition-none'

export function CheckboxBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <g transform={`translate(${BP_X}, ${BP_Y})`}>
        <rect
          x={0}
          y={0}
          width={CHECKBOX.box}
          height={CHECKBOX.box}
          rx={CHECKBOX.r}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          className={BP_FILL_SOLID}
        />
        <path
          d={CHECK_PATH}
          pathLength={1}
          fill="none"
          stroke="var(--color-bg)"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={DRAWN_CHECK_CLASS}
        />
      </g>
      <text
        x={BP_X + CHECKBOX.box + CHECKBOX.gap}
        y={BP_Y + CHECKBOX.box / 2 + 4}
        fontSize={CHECKBOX.font}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Accept terms
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={TOTAL_W} h={CHECKBOX.box} />
        <DimH x1={BP_X} x2={BP_X + CHECKBOX.box} y={BP_Y - 14} label={`${CHECKBOX.box}`} />
        <DimV x={BP_X - 12} y1={BP_Y} y2={BP_Y + CHECKBOX.box} label={`${CHECKBOX.box}`} />
        <DimLabel x={BP_X} y={BP_Y + CHECKBOX.box + 26} anchor="start">
          {`r${CHECKBOX.r}`}
        </DimLabel>
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP_X + CHECKBOX.box}
            y1={BP_Y + CHECKBOX.box + 2}
            x2={BP_X + CHECKBOX.box}
            y2={BP_Y + CHECKBOX.box + 7}
          />
          <line
            x1={BP_X + CHECKBOX.box + CHECKBOX.gap}
            y1={BP_Y + CHECKBOX.box + 2}
            x2={BP_X + CHECKBOX.box + CHECKBOX.gap}
            y2={BP_Y + CHECKBOX.box + 7}
          />
          <line
            x1={BP_X + CHECKBOX.box}
            y1={BP_Y + CHECKBOX.box + 4.5}
            x2={BP_X + CHECKBOX.box + CHECKBOX.gap}
            y2={BP_Y + CHECKBOX.box + 4.5}
          />
        </g>
        <DimLabel
          x={BP_X + CHECKBOX.box + CHECKBOX.gap / 2}
          y={BP_Y + CHECKBOX.box + 18}
          anchor="middle"
        >
          {`${CHECKBOX.gap}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const TX = 60
const TY = 70

function BoxShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('box')
  return (
    <g
      onMouseEnter={() => setHovered('box')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={0}
        width={CHECKBOX.box}
        height={CHECKBOX.box}
        rx={CHECKBOX.r}
        fill="currentColor"
        fillOpacity={0.9}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function CheckShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('check')
  return (
    <g
      onMouseEnter={() => setHovered('check')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={0} y={0} width={CHECKBOX.box} height={CHECKBOX.box} fill="transparent" />
      <path
        d={CHECK_PATH}
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function LabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')
  const x = CHECKBOX.box + CHECKBOX.gap
  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={x - 4}
        y={CHECKBOX.box / 2 - 10}
        width={CHECKBOX.labelW + 8}
        height={20}
        fill="transparent"
      />
      <text
        x={x}
        y={CHECKBOX.box / 2 + 4}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Accept terms
      </text>
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={0} y={0} w={CHECKBOX.box} h={CHECKBOX.box} />
      <DimH x1={0} x2={CHECKBOX.box} y={-14} label={`${CHECKBOX.box}`} />
      <DimV x={-12} y1={0} y2={CHECKBOX.box} label={`${CHECKBOX.box}`} labelXOffset={-6} />
      <DimLabel x={0} y={CHECKBOX.box + 14} anchor="start">
        {`r${CHECKBOX.r}`}
      </DimLabel>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line
          x1={CHECKBOX.box}
          y1={CHECKBOX.box / 2}
          x2={CHECKBOX.box + CHECKBOX.gap}
          y2={CHECKBOX.box / 2}
        />
      </g>
      <DimLabel x={CHECKBOX.box + CHECKBOX.gap / 2} y={CHECKBOX.box / 2 - 6} anchor="middle">
        {`${CHECKBOX.gap}`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  const boxMidX = TX + CHECKBOX.box / 2
  const boxTop = TY
  const boxBottom = TY + CHECKBOX.box
  const labelMidX = TX + CHECKBOX.box + CHECKBOX.gap + CHECKBOX.labelW / 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="box" x1={boxMidX} y1={boxTop} x2={boxMidX} y2={boxTop - 40} />
      <OverlayLine id="check" x1={boxMidX} y1={boxBottom} x2={boxMidX} y2={boxBottom + 36} />
      <OverlayLine id="label" x1={labelMidX} y1={boxTop} x2={labelMidX} y2={boxTop - 40} />
    </g>
  )
}

function Tags() {
  const boxMidX = TX + CHECKBOX.box / 2
  const labelMidX = TX + CHECKBOX.box + CHECKBOX.gap + CHECKBOX.labelW / 2
  return (
    <>
      <foreignObject
        x={boxMidX - 45}
        y={TY - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="box" label="Box" className="items-end justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={boxMidX - 55}
        y={TY + CHECKBOX.box + 36}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="check" label="Drawn check" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={labelMidX - 45}
        y={TY - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Label" className="items-end justify-center" />
      </foreignObject>
    </>
  )
}

export function CheckboxAnatomy() {
  return (
    <AnatomyFrame viewBox="0 -20 260 200" maxWidthClassName="max-w-[340px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <BoxShape />
        <CheckShape />
        <LabelShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}
