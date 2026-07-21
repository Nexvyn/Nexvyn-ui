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
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'

const NM = {
  itemH: 44,
  itemGap: 2,
  itemRx: 4,
  itemPadX: 12,
  inset: 4,
  navW: 220,
} as const

const ITEM_Y = [0, NM.itemH + NM.itemGap, 2 * (NM.itemH + NM.itemGap), 3 * (NM.itemH + NM.itemGap)]
const NAV_H = ITEM_Y[3] + NM.itemH

const ITEM_LABELS = ['Overview', 'Install', 'Theming', 'Components'] as const

const BP = {
  itemH: 20,
  itemGap: 2,
  itemRx: 4,
  itemPadX: 8,
  navW: 160,
} as const
const BP_ITEM_Y = [0, BP.itemH + BP.itemGap, 2 * (BP.itemH + BP.itemGap), 3 * (BP.itemH + BP.itemGap)]
const BP_NAV_H = BP_ITEM_Y[3] + BP.itemH
const BP_X = 30

const BP_Y = 20

export function NavMenuBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      {ITEM_LABELS.map((label, i) => (
        <g key={label}>
          {i === 0 && (
            <rect
              x={BP_X}
              y={BP_Y + BP_ITEM_Y[i]}
              width={BP.navW}
              height={BP.itemH}
              rx={BP.itemRx}
              fill="currentColor"
              fillOpacity={0.12}
              className={BP_HIDE_ON_MORPH}
            />
          )}
          <rect
            x={BP_X}
            y={BP_Y + BP_ITEM_Y[i]}
            width={BP.navW}
            height={BP.itemH}
            rx={BP.itemRx}
            strokeWidth={theme.wireframe.strokeWidth * 0.5}
            strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
            className={BP_FILL_PANEL}
          />
          <text
            x={BP_X + BP.itemPadX}
            y={BP_Y + BP_ITEM_Y[i] + BP.itemH / 2 + 3.5}
            fontSize={10}
            fontWeight={i === 0 ? 500 : 400}
            fontFamily="var(--font-sans)"
            className={BP_TEXT_SOFT}
          >
            {label}
          </text>
          {(i === 1 || i === 3) && (
            <circle
              cx={BP_X + BP.navW - 14}
              cy={BP_Y + BP_ITEM_Y[i] + BP.itemH / 2}
              r={2}
              fill="currentColor"
              opacity={i === 1 ? 0.7 : 0.4}
              className={BP_HIDE_ON_MORPH}
            />
          )}
        </g>
      ))}
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={BP.navW} h={BP_NAV_H} />
        <DimH x1={BP_X} x2={BP_X + BP.navW} y={BP_Y - 12} label={`${BP.navW}`} />
        <DimV x={BP_X - 12} y1={BP_Y} y2={BP_Y + BP_NAV_H} label={`${BP_NAV_H}`} />
        
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line x1={BP_X} y1={BP_Y + 8} x2={BP_X + NM.inset} y2={BP_Y + 8} />
          <line
            x1={BP_X + BP.navW - NM.inset}
            y1={BP_Y + 8}
            x2={BP_X + BP.navW}
            y2={BP_Y + 8}
          />
        </g>
        <DimLabel x={BP_X + NM.inset / 2} y={BP_Y + 8 - 3} anchor="middle">
          {`${NM.inset}`}
        </DimLabel>
        <DimLabel x={BP_X + BP.navW - NM.inset / 2} y={BP_Y + 8 - 3} anchor="middle">
          {`${NM.inset}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const TX = 60
const TY = 20

function NavShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('nav')
  return (
    <g
      onMouseEnter={() => setHovered('nav')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={0}
        width={NM.navW}
        height={NAV_H}
        rx={6}
        stroke="currentColor"
        strokeWidth={blueprintTheme.wireframe.strokeWidth}
        strokeDasharray="3 3"
        fill="none"
        className={spotlight.className}
        style={spotlight.style}
      />
      
      <g className="pointer-events-none">
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={blueprintTheme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={blueprintTheme.guide.structOpacity}
        >
          <line x1={0} y1={16} x2={NM.inset} y2={16} />
          <line x1={NM.navW - NM.inset} y1={16} x2={NM.navW} y2={16} />
        </g>
        <DimLabel x={NM.inset / 2} y={16 - 4} anchor="middle">
          {`${NM.inset}`}
        </DimLabel>
        <DimLabel x={NM.navW - NM.inset / 2} y={16 - 4} anchor="middle">
          {`${NM.inset}`}
        </DimLabel>
      </g>
    </g>
  )
}

function ActiveHighlightShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('active')
  return (
    <g
      onMouseEnter={() => setHovered('active')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={NM.inset}
        y={ITEM_Y[0]}
        width={NM.navW - NM.inset * 2}
        height={NM.itemH}
        rx={NM.itemRx}
        fill="currentColor"
        fillOpacity={0.14}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function HoverHighlightShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('hover')
  return (
    <g
      onMouseEnter={() => setHovered('hover')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={NM.inset}
        y={ITEM_Y[1]}
        width={NM.navW - NM.inset * 2}
        height={NM.itemH}
        rx={NM.itemRx}
        fill="currentColor"
        fillOpacity={0.07}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ItemShape({
  y,
  label,
  id,
  weight,
  dot,
}: {
  y: number
  label: string
  id: string
  weight?: number
  dot?: 'accent' | 'subtle'
}) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight(id)
  const midY = y + NM.itemH / 2
  const labelX = NM.itemPadX
  return (
    <g
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={0} y={y} width={NM.navW} height={NM.itemH} fill="transparent" />
      <text
        x={labelX}
        y={midY + 4}
        fontSize={13}
        fontWeight={weight ?? 400}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        {label}
      </text>
      {dot && (
        <circle
          cx={labelX + label.length * 6.2 + 14}
          cy={midY}
          r={3}
          fill="currentColor"
          fillOpacity={dot === 'accent' ? 0.9 : 0.5}
          className={spotlight.className}
        />
      )}
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
      <Selection x={0} y={0} w={NM.navW} h={NAV_H} />
      <DimH x1={0} x2={NM.navW} y={-14} label={`${NM.navW}`} />
      <DimV x={-12} y1={0} y2={NAV_H} label={`${NAV_H}`} labelXOffset={-6} />
    </g>
  )
}

function OverlayLines() {
  const navMidX = TX + NM.navW / 2
  const navTop = TY
  const itemRight = TX + NM.navW
  const activeMidY = TY + ITEM_Y[0] + NM.itemH / 2
  const hoverMidY = TY + ITEM_Y[1] + NM.itemH / 2
  const itemMidY = TY + ITEM_Y[2] + NM.itemH / 2
  const dotX = TX + NM.itemPadX + 'Install'.length * 6.2 + 14
  const dotY = TY + ITEM_Y[1] + NM.itemH / 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="nav" x1={navMidX} y1={navTop} x2={navMidX} y2={navTop - 12} />
      <OverlayLine id="active" x1={itemRight - NM.inset} y1={activeMidY} x2={itemRight + 26} y2={activeMidY} />
      <OverlayLine id="hover" x1={itemRight - NM.inset} y1={hoverMidY} x2={itemRight + 26} y2={hoverMidY} />
      <OverlayLine id="item" x1={itemRight} y1={itemMidY} x2={itemRight + 26} y2={itemMidY} />
      <OverlayLine id="dot" x1={dotX} y1={dotY} x2={dotX + 20} y2={dotY + 22} />
    </g>
  )
}

function Tags() {
  const navMidX = TX + NM.navW / 2
  const navTop = TY
  const itemRight = TX + NM.navW
  const activeMidY = TY + ITEM_Y[0] + NM.itemH / 2
  const hoverMidY = TY + ITEM_Y[1] + NM.itemH / 2
  const itemMidY = TY + ITEM_Y[2] + NM.itemH / 2
  const dotX = TX + NM.itemPadX + 'Install'.length * 6.2 + 14
  const dotY = TY + ITEM_Y[1] + NM.itemH / 2
  const tagX = itemRight + 26
  return (
    <>
      <foreignObject
        x={navMidX - 70}
        y={navTop - 12 - 24}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="nav" label="NavMenu" className="items-end justify-center" />
      </foreignObject>
      <foreignObject x={tagX} y={activeMidY - 12} width={130} height={24} className="pointer-events-none overflow-visible">
        <AnatomyTag part="active" label="Active Route" className="items-center justify-start" isAccent />
      </foreignObject>
      <foreignObject x={tagX} y={hoverMidY - 12} width={130} height={24} className="pointer-events-none overflow-visible">
        <AnatomyTag part="hover" label="Hover Highlight" className="items-center justify-start" />
      </foreignObject>
      <foreignObject x={tagX} y={itemMidY - 12} width={110} height={24} className="pointer-events-none overflow-visible">
        <AnatomyTag part="item" label="NavMenuItem" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={dotX + 20}
        y={dotY + 22 - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="dot" label="Status Dot" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function NavMenuAnatomy() {
  return (
    <AnatomyFrame viewBox="-20 -50 480 340" maxWidthClassName="max-w-[540px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <ActiveHighlightShape />
        <HoverHighlightShape />
        <ItemShape y={ITEM_Y[0]} label="Overview" id="item-1" weight={550} />
        <ItemShape y={ITEM_Y[1]} label="Install" id="item-2" weight={500} dot="accent" />
        <ItemShape y={ITEM_Y[2]} label="Theming" id="item" />
        <ItemShape y={ITEM_Y[3]} label="Components" id="item-4" dot="subtle" />
        <NavShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}