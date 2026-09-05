'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  DraftSurface,
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
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const LABELS = ['Dashboard', 'Projects', 'Team'] as const
const BP = { x: 58, y: 18, w: 104, rowH: 32, gap: 4, indent: 24, dot: 6 } as const

export function BounceSidebarWireframe() {
  const theme = draftTheme
  const totalH = LABELS.length * BP.rowH + (LABELS.length - 1) * BP.gap
  const rowY = (i: number) => BP.y + i * (BP.rowH + BP.gap)

  return (
    <DraftSurface>
      {LABELS.map((label, i) => {
        const y = rowY(i)
        const active = i === 0
        return (
          <g key={label}>
            <rect
              x={BP.x + BP.indent}
              y={y}
              width={BP.w - BP.indent}
              height={BP.rowH}
              rx={6}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={theme.wireframe.strokeOpacity}
              style={beat(i === 0 ? DRAFT_BEAT.outline : `${200 + i * 60}ms`)}
              className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current ${
                active
                  ? 'group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)'
                  : 'group-hover:opacity-50 group-focus-visible:opacity-50'
              }`}
            />
            <text
              x={BP.x + BP.indent + 4}
              y={y + BP.rowH / 2 + 6}
              fontSize={16}
              fontFamily="var(--font-sans)"
              style={beat(`${400 + i * 60}ms`)}
              className={`fade-note ${DRAFT_INK_MORPH} fill-current ${
                active
                  ? 'opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100'
                  : 'opacity-40 group-hover:opacity-70 group-focus-visible:opacity-70'
              }`}
            >
              {label}
            </text>
          </g>
        )
      })}
      <circle
        cx={BP.x + 11}
        cy={rowY(0) + BP.rowH / 2}
        r={BP.dot / 2}
        fill="var(--bp-accent, var(--color-accent))"
        style={beat(DRAFT_BEAT.hatch)}
        className={`fade-note transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-y-[36px] group-hover:delay-(--motion-dur-base) group-focus-visible:translate-y-[36px] group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none`}
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP.x} y={BP.y} w={BP.w} h={totalH} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP.x}
          x2={BP.x + BP.w}
          y={BP.y - 10}
          label={`${BP.w}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <InsetGuide
          x={BP.x + BP.indent + 4}
          y={rowY(0) + 4}
          w={44}
          h={24}
          offset={0.8}
          boxX={BP.x + BP.indent}
          boxY={rowY(0)}
          boxW={BP.w - BP.indent}
          boxH={BP.rowH}
          boxRx={6}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP.x + BP.indent - 4}
          y={rowY(0) + BP.rowH / 2 + 2}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          4
        </MeasureNote>
        <MeasureV
          x={BP.x - 12}
          y1={BP.y}
          y2={BP.y + totalH}
          label={`${totalH}`}
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          opacity={theme.guide.structOpacity}
        >
          <line x1={BP.x} y1={rowY(0) + BP.rowH} x2={BP.x + BP.w + 16} y2={rowY(0) + BP.rowH} />
          <line x1={BP.x} y1={rowY(1)} x2={BP.x + BP.w + 16} y2={rowY(1)} />
        </g>
        <MeasureV
          x={BP.x + BP.w + 10}
          y1={rowY(0) + BP.rowH}
          y2={rowY(1)}
          label={`${BP.gap}`}
          labelXOffset={10}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureNote
          x={BP.x + BP.w + 24}
          y={rowY(0) + BP.rowH / 2 + 3}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`dot ${BP.dot}`}
        </MeasureNote>
        <MeasureNote
          x={BP.x}
          y={BP.y + totalH + 14}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(5))}
        >
          spring overshoot
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN_ITEMS = ['Home', 'About', 'Services'] as const
const AN = {
  listX: 24,
  listY: 16,
  listW: 136,
  padL: 24,
  padV: 8,
  itemH: 32,
  itemGap: 4,
  itemRx: 6,
  dotR: 3,
} as const
const AN_LIST_H = AN_ITEMS.length * AN.itemH + (AN_ITEMS.length - 1) * AN.itemGap

function itemY(i: number) {
  return AN.listY + i * (AN.itemH + AN.itemGap)
}

function ContainerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')
  return (
    <rect
      x={AN.listX}
      y={AN.listY}
      width={AN.listW}
      height={AN_LIST_H}
      stroke="currentColor"
      strokeWidth={hovered === 'container' ? 2 : 1.25}
      fill={hovered === 'container' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'container' ? 0.03 : 0}
      strokeDasharray="3 3"
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ItemShape({ index, label }: { index: number; label: string }) {
  const { hovered, setHovered } = useAnatomy()
  const partId = `item-${index}`
  const spotlight = useSpotlight(partId, { isInteraction: true })
  const y = itemY(index)
  const active = index === 1

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.listX + AN.padL}
        y={y}
        width={AN.listW - AN.padL}
        height={AN.itemH}
        rx={AN.itemRx}
        stroke="currentColor"
        strokeWidth={hovered === partId ? 1.5 : 1}
        fill={active || hovered === partId ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === partId ? 0.08 : active ? 0.05 : 0}
        className={spotlight.className}
      />
      <text
        x={AN.listX + AN.padL + 4}
        y={y + AN.itemH / 2 + 6}
        fontSize={16}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        {label}
      </text>
    </g>
  )
}

function ActiveShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('active', { isInteraction: true })
  const y = itemY(1)

  return (
    <g
      onMouseEnter={() => setHovered('active')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.listX + AN.padL}
        y={y}
        width={AN.listW - AN.padL}
        height={AN.itemH}
        rx={AN.itemRx}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={hovered === 'active' ? 2 : 1.25}
        fill="var(--bp-accent, var(--color-accent))"
        fillOpacity={hovered === 'active' ? 0.15 : 0.08}
        strokeDasharray={hovered === 'active' ? 'none' : '4 3'}
        className={spotlight.className}
      />
    </g>
  )
}

function DotShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot', { isInteraction: true })
  const dotCY = itemY(1) + AN.itemH / 2

  return (
    <circle
      cx={AN.listX + 11}
      cy={dotCY}
      r={AN.dotR}
      fill="var(--bp-accent, var(--color-accent))"
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const isOthersHovered = hovered !== null

  return (
    <g
      style={{ pointerEvents: 'none', filter: isOthersHovered ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={AN.listX} y={AN.listY} w={AN.listW} h={AN_LIST_H} />
      <MeasureH x1={AN.listX} x2={AN.listX + AN.listW} y={AN.listY - 10} label={`${AN.listW}`} />
      <MeasureV
        x={AN.listX - 12}
        y1={AN.listY}
        y2={AN.listY + AN_LIST_H}
        label={`${AN_LIST_H}`}
        labelXOffset={-6}
      />

      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line
          x1={AN.listX + AN.padL}
          y1={AN.listY + 6}
          x2={AN.listX + AN.padL}
          y2={AN.listY + AN_LIST_H - 6}
        />
      </g>
      <MeasureNote x={AN.listX + AN.padL / 2} y={AN.listY + AN_LIST_H / 2 + 2} anchor="middle">
        {`${AN.padL}`}
      </MeasureNote>

      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        opacity={draftTheme.guide.structOpacity}
      >
        <line
          x1={AN.listX + AN.padL}
          y1={itemY(0) + AN.itemH}
          x2={AN.listX + AN.listW + 16}
          y2={itemY(0) + AN.itemH}
        />
        <line x1={AN.listX + AN.padL} y1={itemY(1)} x2={AN.listX + AN.listW + 16} y2={itemY(1)} />
      </g>
      <MeasureV
        x={AN.listX + AN.listW + 10}
        y1={itemY(0) + AN.itemH}
        y2={itemY(1)}
        label={`${AN.itemGap}`}
        labelXOffset={10}
        labelAnchor="start"
      />
    </g>
  )
}

export function BounceSidebarBreakdown() {
  return (
    <AnatomyFrame viewBox="-24 -40 324 223" maxWidthClassName="max-w-[389px]">
      <ContainerShape />
      {AN_ITEMS.map((label, i) => (
        <ItemShape key={label} index={i} label={label} />
      ))}
      <ActiveShape />
      <DotShape />
      <AnnotationsLayer />
      <OverlayLine id="container" x1={160} y1={100} x2={210} y2={100} />
      <OverlayLine
        id="item-0"
        x1={AN.listX + AN.listW - AN.padV}
        y1={itemY(0) + AN.itemH / 2}
        x2={180}
        y2={itemY(0) + AN.itemH / 2}
      />
      <OverlayLine
        id="active"
        x1={AN.listX + AN.listW - AN.padV}
        y1={itemY(1) + AN.itemH / 2}
        x2={AN.listX + AN.listW - AN.padV + 28}
        y2={itemY(1) + AN.itemH / 2}
      />
      <OverlayLine
        id="dot"
        x1={AN.listX + 10}
        y1={itemY(1) + AN.itemH / 2 - AN.dotR}
        x2={AN.listX + 10}
        y2={-2}
      />
      <foreignObject
        x={210}
        y={88}
        width={80}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="container" label="Nav.List" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={180}
        y={itemY(0) + AN.itemH / 2 - 12}
        width={80}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="item-0" label="Nav.Item" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={AN.listX + AN.listW - AN.padV + 32}
        y={itemY(1) + AN.itemH / 2 - 12}
        width={72}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="active" label="Active" isAccent className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={-14}
        y={-26}
        width={96}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="dot" label="Bounce Dot" isAccent className="items-end justify-center" />
      </foreignObject>
    </AnatomyFrame>
  )
}
