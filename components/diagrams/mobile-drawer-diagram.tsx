'use client'
// Wireframe/anatomy diagram asset — licensed separately from the rest of
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
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'


const BP = {
  panelX: 14,
  panelW: 192,
  panelH: 92,
  rTop: 5,
  handleW: 16,
  handleH: 2,
  itemH: 13,
  itemGap: 3,
  padX: 10,
} as const

const BP_PANEL_Y = 140 - BP.panelH

export function MobileDrawerBlueprint() {
  const theme = blueprintTheme
  const handleY = BP_PANEL_Y + 6
  const titleY = BP_PANEL_Y + 20
  const item1Y = BP_PANEL_Y + 30
  const item2Y = item1Y + BP.itemH + BP.itemGap

  return (
    <Blueprint>
      <rect
        x={0}
        y={0}
        width={220}
        height={140}
        fill="currentColor"
        fillOpacity={0.05}
        className={`${BP_MORPH} group-hover:fill-opacity-10 group-focus-visible:fill-opacity-10`}
      />

      <path
        d={`M ${BP.panelX} ${140}
            L ${BP.panelX} ${BP_PANEL_Y + BP.rTop}
            Q ${BP.panelX} ${BP_PANEL_Y} ${BP.panelX + BP.rTop} ${BP_PANEL_Y}
            L ${BP.panelX + BP.panelW - BP.rTop} ${BP_PANEL_Y}
            Q ${BP.panelX + BP.panelW} ${BP_PANEL_Y} ${BP.panelX + BP.panelW} ${BP_PANEL_Y + BP.rTop}
            L ${BP.panelX + BP.panelW} ${140}
            Z`}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />

      <rect
        x={BP.panelX + BP.panelW / 2 - BP.handleW / 2}
        y={handleY}
        width={BP.handleW}
        height={BP.handleH}
        rx={BP.handleH / 2}
        fill="currentColor"
        className={`${BP_MORPH} opacity-40 group-hover:opacity-90 group-focus-visible:opacity-90`}
      />

      <text
        x={BP.panelX + BP.padX}
        y={titleY}
        fontSize={10}
        fontWeight={600}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Filters
      </text>

      {[item1Y, item2Y].map((y) => (
        <rect
          key={y}
          x={BP.panelX + BP.padX}
          y={y}
          width={BP.panelW - BP.padX * 2}
          height={BP.itemH}
          rx={2}
          strokeWidth={theme.wireframe.strokeWidth * 0.6}
          strokeOpacity={theme.wireframe.strokeOpacity * 0.4}
          fill="none"
          className="stroke-current"
        />
      ))}

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP.panelX} y={BP_PANEL_Y} w={BP.panelW} h={140 - BP_PANEL_Y} />
        <DimH
          x1={BP.panelX}
          x2={BP.panelX + BP.panelW}
          y={BP_PANEL_Y - 10}
          label={`${BP.panelW}`}
        />
        <DimV x={BP.panelX - 10} y1={BP_PANEL_Y} y2={140} label={`${140 - BP_PANEL_Y}`} />
        <DimLabel x={BP.panelX + BP.panelW / 2} y={BP_PANEL_Y + 5} anchor="middle">
          {`r${BP.rTop}`}
        </DimLabel>
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line x1={BP.panelX} y1={item1Y - 3} x2={BP.panelX + BP.padX} y2={item1Y - 3} />
          <line
            x1={BP.panelX + BP.panelW - BP.padX}
            y1={item1Y - 3}
            x2={BP.panelX + BP.panelW}
            y2={item1Y - 3}
          />
        </g>
        <DimLabel x={BP.panelX + BP.padX / 2} y={item1Y - 6} anchor="middle">
          {`${BP.padX}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}


const MD = {
  overlayW: 300,
  panelW: 260,
  handlePadTop: 12,
  handleH: 4,
  handleW: 36,
  handlePadBottom: 8,
  titlePadTop: 24,
  titleLineH: 24,
  titlePadBottom: 8,
  itemH: 44,
  itemGap: 12,
  contentPadX: 24,
  contentPadBottom: 24,
  panelRadius: 6,
} as const

const HANDLE_ROW_H = MD.handlePadTop + MD.handleH + MD.handlePadBottom
const TITLE_ROW_H = MD.titlePadTop + MD.titleLineH + MD.titlePadBottom
const ITEMS_H = MD.itemH * 2 + MD.itemGap
const PANEL_H = HANDLE_ROW_H + TITLE_ROW_H + ITEMS_H + MD.contentPadBottom
const PANEL_TOP_GAP = 20
const OVERLAY_H = PANEL_H + PANEL_TOP_GAP
const PANEL_X = (MD.overlayW - MD.panelW) / 2
const PANEL_Y = PANEL_TOP_GAP

const HANDLE_Y = PANEL_Y + MD.handlePadTop
const TITLE_BASELINE_Y = PANEL_Y + HANDLE_ROW_H + MD.titlePadTop + 18
const ITEMS_TOP_Y = PANEL_Y + HANDLE_ROW_H + TITLE_ROW_H
const ITEM_2_Y = ITEMS_TOP_Y + MD.itemH + MD.itemGap
const ITEM_LABELS = [
  ['Category', 'Any'],
  ['Price', 'Any'],
] as const

function OverlayShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('overlay')
  return (
    <g
      onMouseEnter={() => setHovered('overlay')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={0}
        width={MD.overlayW}
        height={OVERLAY_H}
        rx={8}
        fill="currentColor"
        fillOpacity={0.08}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function PanelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')
  return (
    <g
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <path
        d={`M ${PANEL_X} ${PANEL_Y + PANEL_H}
            L ${PANEL_X} ${PANEL_Y + MD.panelRadius}
            Q ${PANEL_X} ${PANEL_Y} ${PANEL_X + MD.panelRadius} ${PANEL_Y}
            L ${PANEL_X + MD.panelW - MD.panelRadius} ${PANEL_Y}
            Q ${PANEL_X + MD.panelW} ${PANEL_Y} ${PANEL_X + MD.panelW} ${PANEL_Y + MD.panelRadius}
            L ${PANEL_X + MD.panelW} ${PANEL_Y + PANEL_H}
            Z`}
        stroke="currentColor"
        strokeWidth={1}
        fill="currentColor"
        fillOpacity={0.03}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function HandleShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('handle')
  return (
    <g
      onMouseEnter={() => setHovered('handle')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={PANEL_X + MD.panelW / 2 - MD.handleW / 2 - 6}
        y={HANDLE_Y - 6}
        width={MD.handleW + 12}
        height={MD.handleH + 12}
        fill="transparent"
      />
      <rect
        x={PANEL_X + MD.panelW / 2 - MD.handleW / 2}
        y={HANDLE_Y}
        width={MD.handleW}
        height={MD.handleH}
        rx={MD.handleH / 2}
        fill="currentColor"
        fillOpacity={0.35}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function TitleShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('title')
  return (
    <g
      onMouseEnter={() => setHovered('title')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={PANEL_X + MD.contentPadX - 4}
        y={TITLE_BASELINE_Y - MD.titleLineH + 4}
        width={140}
        height={MD.titleLineH}
        fill="transparent"
      />
      <text
        x={PANEL_X + MD.contentPadX}
        y={TITLE_BASELINE_Y}
        fontSize={16}
        fontWeight={600}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Filters
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
      <Selection x={PANEL_X} y={PANEL_Y} w={MD.panelW} h={PANEL_H} />
      <DimH x1={PANEL_X} x2={PANEL_X + MD.panelW} y={PANEL_Y - 14} label={`${MD.panelW}`} />
      <DimV x={PANEL_X - 12} y1={PANEL_Y} y2={PANEL_Y + PANEL_H} label={`${PANEL_H}`} />
      <DimLabel x={PANEL_X + MD.panelRadius} y={PANEL_Y + 20} anchor="start">
        {`r${MD.panelRadius}`}
      </DimLabel>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line
          x1={PANEL_X}
          y1={ITEMS_TOP_Y + 10}
          x2={PANEL_X + MD.contentPadX}
          y2={ITEMS_TOP_Y + 10}
        />
        <line
          x1={PANEL_X + MD.panelW - MD.contentPadX}
          y1={ITEMS_TOP_Y + 10}
          x2={PANEL_X + MD.panelW}
          y2={ITEMS_TOP_Y + 10}
        />
        <line
          x1={PANEL_X + MD.panelW / 2 - 10}
          y1={PANEL_Y + PANEL_H - MD.contentPadBottom}
          x2={PANEL_X + MD.panelW / 2 - 10}
          y2={PANEL_Y + PANEL_H}
        />
      </g>
      <DimLabel x={PANEL_X + MD.contentPadX / 2} y={ITEMS_TOP_Y + 24} anchor="middle">
        {`${MD.contentPadX}`}
      </DimLabel>
      <DimLabel
        x={PANEL_X + MD.panelW - MD.contentPadX / 2}
        y={ITEMS_TOP_Y + 24}
        anchor="middle"
      >
        {`${MD.contentPadX}`}
      </DimLabel>
      <DimLabel
        x={PANEL_X + MD.panelW / 2 - 10}
        y={PANEL_Y + PANEL_H - MD.contentPadBottom / 2 + 3}
        anchor="end"
      >
        {`${MD.contentPadBottom}`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  const overlayTop = 0
  const handleMidX = PANEL_X + MD.panelW / 2
  const titleLeftX = PANEL_X + MD.contentPadX
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="overlay" x1={20} y1={overlayTop} x2={20} y2={overlayTop - 26} />
      <OverlayLine
        id="panel"
        x1={PANEL_X + MD.panelW}
        y1={PANEL_Y + PANEL_H / 2}
        x2={PANEL_X + MD.panelW + 30}
        y2={PANEL_Y + PANEL_H / 2}
      />
      <OverlayLine id="handle" x1={handleMidX} y1={HANDLE_Y} x2={handleMidX} y2={HANDLE_Y - 24} />
      <OverlayLine
        id="title"
        x1={titleLeftX}
        y1={TITLE_BASELINE_Y - MD.titleLineH / 2}
        x2={titleLeftX - 28}
        y2={TITLE_BASELINE_Y - MD.titleLineH / 2}
      />
    </g>
  )
}

function Tags() {
  const handleMidX = PANEL_X + MD.panelW / 2
  const titleLeftX = PANEL_X + MD.contentPadX
  return (
    <>
      <foreignObject
        x={20 - 45}
        y={0 - 26 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="overlay" label="Overlay" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={PANEL_X + MD.panelW + 30}
        y={PANEL_Y + PANEL_H / 2 - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="panel" label="Panel" className="items-center justify-start" isAccent />
      </foreignObject>
      <foreignObject
        x={handleMidX - 55}
        y={HANDLE_Y - 24 - 24}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="handle" label="Grab handle" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={titleLeftX - 28 - 90}
        y={TITLE_BASELINE_Y - MD.titleLineH / 2 - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="title" label="Title" className="items-center justify-end" />
      </foreignObject>
    </>
  )
}

export function MobileDrawerAnatomy() {
  return (
    <AnatomyFrame viewBox="-90 -66 516 306" maxWidthClassName="max-w-lg">
      <OverlayShape />
      <PanelShape />
      <HandleShape />
      <TitleShape />
      {ITEM_LABELS.map(([label, value], i) => (
        <g key={label}>
          <rect
            x={PANEL_X + MD.contentPadX}
            y={i === 0 ? ITEMS_TOP_Y : ITEM_2_Y}
            width={MD.panelW - MD.contentPadX * 2}
            height={MD.itemH}
            rx={4}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={0.35}
            fill="none"
          />
          <text
            x={PANEL_X + MD.contentPadX + 16}
            y={(i === 0 ? ITEMS_TOP_Y : ITEM_2_Y) + MD.itemH / 2 + 4}
            fontSize={13}
            fontFamily="var(--font-sans)"
            className="fill-current opacity-70"
          >
            {label}
          </text>
          <text
            x={PANEL_X + MD.panelW - MD.contentPadX - 16}
            y={(i === 0 ? ITEMS_TOP_Y : ITEM_2_Y) + MD.itemH / 2 + 4}
            fontSize={13}
            fontFamily="var(--font-sans)"
            textAnchor="end"
            className="fill-current opacity-40"
          >
            {value}
          </text>
        </g>
      ))}
      <AnnotationsLayer />
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}