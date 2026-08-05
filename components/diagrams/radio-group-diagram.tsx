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
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'

const RADIO = {
  circle: 20,
  r: 10,
  dot: 10,
  gap: 12,
  rowGap: 8,
  font: 11,
  labelW: 56,
} as const

const ROWS = ['Small', 'Medium', 'Large'] as const
const SELECTED_ROW = 1

const ROW_H = RADIO.circle
const TOTAL_W = RADIO.circle + RADIO.gap + RADIO.labelW
const TOTAL_H = ROWS.length * ROW_H + (ROWS.length - 1) * RADIO.rowGap
const BP_X = (220 - TOTAL_W) / 2
const BP_Y = (140 - TOTAL_H) / 2

function bpRowY(i: number) {
  return BP_Y + i * (ROW_H + RADIO.rowGap)
}

const NEXT_ROW = SELECTED_ROW + 1

const DOT_OUT_CLASS =
  'origin-center transition-[opacity,transform] duration-(--motion-dur-base) ease-(--motion-ease-out) delay-0 group-hover:opacity-0 group-hover:scale-50 group-focus-visible:opacity-0 group-focus-visible:scale-50 motion-reduce:transition-none motion-reduce:transform-none'

const DOT_IN_CLASS =
  'origin-center opacity-0 scale-50 transition-[opacity,transform] duration-(--motion-dur-base) ease-(--motion-ease-out) delay-150 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-300 group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:delay-300 motion-reduce:transition-none motion-reduce:transform-none'

export function RadioGroupBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      {ROWS.map((label, i) => {
        const y = bpRowY(i)
        const cy = y + RADIO.r
        const isSelected = i === SELECTED_ROW
        const isNext = i === NEXT_ROW
        return (
          <g key={label}>
            <circle
              cx={BP_X + RADIO.r}
              cy={cy}
              r={RADIO.r}
              fill="none"
              stroke="currentColor"
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={
                isSelected ? theme.wireframe.strokeOpacity : theme.wireframe.strokeOpacity * 0.55
              }
              className={
                isSelected
                  ? `${BP_MORPH} group-hover:stroke-opacity-40 group-focus-visible:stroke-opacity-40`
                  : isNext
                    ? `${BP_MORPH} group-hover:stroke-opacity-100 group-focus-visible:stroke-opacity-100`
                    : undefined
              }
            />
            {isSelected && (
              <circle
                cx={BP_X + RADIO.r}
                cy={cy}
                r={RADIO.dot / 2}
                fill="currentColor"
                style={{ transformBox: 'fill-box' }}
                className={DOT_OUT_CLASS}
              />
            )}
            {isNext && (
              <circle
                cx={BP_X + RADIO.r}
                cy={cy}
                r={RADIO.dot / 2}
                fill="currentColor"
                style={{ transformBox: 'fill-box' }}
                className={DOT_IN_CLASS}
              />
            )}
            <text
              x={BP_X + RADIO.circle + RADIO.gap}
              y={cy + 4}
              fontSize={RADIO.font}
              fontWeight={500}
              fontFamily="var(--font-sans)"
              className={BP_TEXT_SOFT}
            >
              {label}
            </text>
          </g>
        )
      })}
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={bpRowY(SELECTED_ROW)} w={TOTAL_W} h={ROW_H} />
        <DimH x1={BP_X} x2={BP_X + RADIO.circle} y={BP_Y - 14} label={`${RADIO.circle}`} />
        <DimV x={BP_X - 12} y1={BP_Y} y2={BP_Y + RADIO.circle} label={`${RADIO.circle}`} />

        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP_X + RADIO.circle}
            y1={bpRowY(0) + RADIO.circle + 2}
            x2={BP_X + RADIO.circle}
            y2={bpRowY(0) + RADIO.circle + 7}
          />
          <line
            x1={BP_X + RADIO.circle + RADIO.gap}
            y1={bpRowY(0) + RADIO.circle + 2}
            x2={BP_X + RADIO.circle + RADIO.gap}
            y2={bpRowY(0) + RADIO.circle + 7}
          />
          <line
            x1={BP_X + RADIO.circle}
            y1={bpRowY(0) + RADIO.circle + 4.5}
            x2={BP_X + RADIO.circle + RADIO.gap}
            y2={bpRowY(0) + RADIO.circle + 4.5}
          />
        </g>
        <DimLabel
          x={BP_X + RADIO.circle + RADIO.gap / 2}
          y={bpRowY(0) + RADIO.circle + 18}
          anchor="middle"
        >
          {`${RADIO.gap}`}
        </DimLabel>

        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP_X - 6}
            y1={bpRowY(0) + RADIO.circle}
            x2={BP_X - 1}
            y2={bpRowY(0) + RADIO.circle}
          />
          <line x1={BP_X - 6} y1={bpRowY(1)} x2={BP_X - 1} y2={bpRowY(1)} />
          <line x1={BP_X - 3.5} y1={bpRowY(0) + RADIO.circle} x2={BP_X - 3.5} y2={bpRowY(1)} />
        </g>
        <DimLabel x={BP_X - 9} y={(bpRowY(0) + RADIO.circle + bpRowY(1)) / 2 + 2.5} anchor="end">
          {`${RADIO.rowGap}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const TX = 56
const TY = 20

function ContainerShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')

  return (
    <g
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={-8}
        y={-8}
        width={TOTAL_W + 16}
        height={TOTAL_H + 16}
        rx={6}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="3 3"
        strokeOpacity={0.3}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function CircleShape({ i }: { i: number }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('circle')
  const isSelected = i === SELECTED_ROW
  const y = bpRowY(i) - BP_Y
  const cy = y + RADIO.r
  return (
    <g
      onMouseEnter={() => setHovered('circle')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={RADIO.r}
        cy={cy}
        r={RADIO.r}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeOpacity={isSelected ? 1 : 0.45}
        className={i === SELECTED_ROW ? spotlight.className : undefined}
        style={i === SELECTED_ROW ? spotlight.style : undefined}
      />
    </g>
  )
}

function DotShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot')
  const y = bpRowY(SELECTED_ROW) - BP_Y
  const cy = y + RADIO.r
  return (
    <g
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle cx={RADIO.r} cy={cy} r={RADIO.r} fill="transparent" />
      <circle
        cx={RADIO.r}
        cy={cy}
        r={RADIO.dot / 2}
        fill="currentColor"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function LabelShape({ i }: { i: number }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')
  const y = bpRowY(i) - BP_Y
  const cy = y + RADIO.r
  const x = RADIO.circle + RADIO.gap
  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={x - 4} y={cy - 10} width={RADIO.labelW + 8} height={20} fill="transparent" />
      <text
        x={x}
        y={cy + 4}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={
          i === SELECTED_ROW ? `fill-current ${spotlight.className}` : 'fill-current opacity-70'
        }
        style={i === SELECTED_ROW ? spotlight.style : undefined}
      >
        {ROWS[i]}
      </text>
    </g>
  )
}

function HiddenInputShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('hidden-input')
  const y = bpRowY(SELECTED_ROW) - BP_Y
  const cy = y + RADIO.r
  return (
    <g
      onMouseEnter={() => setHovered('hidden-input')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={-6}
        y={cy - 6}
        width={12}
        height={12}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.75}
        strokeDasharray="2 1.5"
        strokeOpacity={0.5}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={0}
        y={cy + 2.5}
        textAnchor="middle"
        fontSize={6}
        fontFamily="var(--font-mono)"
        fillOpacity={0.5}
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        ⌧
      </text>
    </g>
  )
}

function FocusRingShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('focus-ring')
  const y = bpRowY(0) - BP_Y
  const cy = y + RADIO.r
  return (
    <g
      onMouseEnter={() => setHovered('focus-ring')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={RADIO.r}
        cy={cy}
        r={RADIO.r + 4}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeOpacity={0.4}
        strokeDasharray="4 2"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  const selY = bpRowY(SELECTED_ROW) - BP_Y
  const row0Bottom = bpRowY(0) - BP_Y + RADIO.circle
  const row1Top = bpRowY(1) - BP_Y
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={0} y={selY} w={RADIO.circle} h={RADIO.circle} />
      <DimH x1={0} x2={RADIO.circle} y={selY - 14} label={`${RADIO.circle}`} />
      <DimV
        x={-12}
        y1={selY}
        y2={selY + RADIO.circle}
        label={`${RADIO.circle}`}
        labelXOffset={-6}
      />
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line
          x1={RADIO.circle}
          y1={selY + RADIO.r}
          x2={RADIO.circle + RADIO.gap}
          y2={selY + RADIO.r}
        />
      </g>
      <DimLabel x={RADIO.circle + RADIO.gap / 2} y={selY + RADIO.r - 6} anchor="middle">
        {`${RADIO.gap}`}
      </DimLabel>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line x1={-16} y1={row0Bottom} x2={-10} y2={row0Bottom} />
        <line x1={-16} y1={row1Top} x2={-10} y2={row1Top} />
        <line x1={-13} y1={row0Bottom} x2={-13} y2={row1Top} />
      </g>
      <DimLabel x={-19} y={(row0Bottom + row1Top) / 2 + 2.5} anchor="end">
        {`${RADIO.rowGap}`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  const selY = bpRowY(SELECTED_ROW) - BP_Y
  const row0Y = bpRowY(0) - BP_Y
  const circleMidX = TX + RADIO.r
  const circleTop = TY + selY
  const circleCy = TY + selY + RADIO.r
  const dotBottom = circleCy + RADIO.dot / 2
  const labelMidX = TX + RADIO.circle + RADIO.gap + RADIO.labelW / 2
  const labelY = TY + selY
  const containerLeft = TX - 8
  const containerMidY = TY + TOTAL_H / 2
  const focusCy = TY + row0Y + RADIO.r
  const focusRight = TX + RADIO.r + RADIO.r + 4
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="container"
        x1={containerLeft}
        y1={containerMidY}
        x2={containerLeft - 30}
        y2={containerMidY}
      />
      <OverlayLine id="circle" x1={circleMidX} y1={circleTop} x2={circleMidX} y2={circleTop - 40} />
      <OverlayLine id="dot" x1={circleMidX} y1={dotBottom} x2={circleMidX} y2={dotBottom + 36} />
      <OverlayLine id="label" x1={labelMidX} y1={labelY} x2={labelMidX} y2={labelY - 40} />
      <OverlayLine
        id="hidden-input"
        x1={TX - 6}
        y1={circleCy}
        x2={TX - 6 - 30}
        y2={circleCy + 30}
      />
      <OverlayLine
        id="focus-ring"
        x1={focusRight}
        y1={focusCy}
        x2={focusRight + 30}
        y2={focusCy - 20}
      />
    </g>
  )
}

function Tags() {
  const selY = bpRowY(SELECTED_ROW) - BP_Y
  const row0Y = bpRowY(0) - BP_Y
  const circleMidX = TX + RADIO.r
  const circleTop = TY + selY
  const circleCy = TY + selY + RADIO.r
  const dotBottom = circleCy + RADIO.dot / 2
  const labelMidX = TX + RADIO.circle + RADIO.gap + RADIO.labelW / 2
  const labelY = TY + selY
  const containerLeft = TX - 8
  const containerMidY = TY + TOTAL_H / 2
  const focusCy = TY + row0Y + RADIO.r
  const focusRight = TX + RADIO.r + RADIO.r + 4
  return (
    <>
      <foreignObject
        x={containerLeft - 30 - 75}
        y={containerMidY - 12}
        width={75}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="container" label="Group" className="items-center justify-end" isAccent />
      </foreignObject>

      <foreignObject
        x={circleMidX - 50}
        y={circleTop - 40 - 24}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="circle"
          label="Radio circle"
          className="items-end justify-center"
          isAccent
        />
      </foreignObject>

      <foreignObject
        x={circleMidX - 60}
        y={dotBottom + 36}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="dot" label="Traveling dot" className="items-start justify-center" />
      </foreignObject>

      <foreignObject
        x={labelMidX - 45}
        y={labelY - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Label" className="items-end justify-center" />
      </foreignObject>

      <foreignObject
        x={TX - 6 - 30 - 80}
        y={circleCy + 30 - 4}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="hidden-input" label="Hidden input" className="items-center justify-end" />
      </foreignObject>

      <foreignObject
        x={focusRight + 30}
        y={focusCy - 20 - 12}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="focus-ring" label="Focus ring" className="items-end justify-start" />
      </foreignObject>
    </>
  )
}

export function RadioGroupAnatomy() {
  return (
    <AnatomyFrame viewBox="-80 -80 340 280" maxWidthClassName="max-w-[400px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <ContainerShape />
        {ROWS.map((label, i) => (
          <g key={label}>
            <CircleShape i={i} />
            <LabelShape i={i} />
          </g>
        ))}
        <DotShape />
        <HiddenInputShape />
        <FocusRingShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}
