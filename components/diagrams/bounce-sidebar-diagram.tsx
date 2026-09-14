'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

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
  stampBeat,
  squircleRectPath,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const LABELS = ['Dashboard', 'Projects', 'Team'] as const
const BP = {
  x: 56,
  y: 22,
  w: 120,
  ps: 24,
  itemPad: 4,
  rowH: 32,
  gap: 4,
  rx: 4,
  dot: 6,
  dotInset: 8,
  font: 14,
  dotMs: 450,
} as const

const BP_TOTAL_H = LABELS.length * BP.rowH + (LABELS.length - 1) * BP.gap
const BP_ITEM_X = BP.x + BP.ps
const BP_ITEM_W = BP.w - BP.ps
const BP_DOT_CX = BP.x + BP.dotInset + BP.dot / 2
const BP_TRAVEL = BP.rowH + BP.gap
const BP_PEAK_X = -Math.min(0.6, 20 / BP_TRAVEL) * BP_TRAVEL
const BP_RIGHT = BP.x + BP.w
const BP_GUIDE_ROW = 2

function bpRowY(i: number) {
  return BP.y + i * (BP.rowH + BP.gap)
}

const BP_ROW_OUTLINE = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-transparent group-focus-visible:stroke-transparent`
const BP_TEXT_WAS_ACTIVE = `${DRAFT_INK_MORPH} fill-current opacity-60 group-hover:opacity-55 group-focus-visible:opacity-55`
const BP_TEXT_BECOMES_ACTIVE = `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`
const BP_TEXT_IDLE = `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:opacity-55 group-focus-visible:opacity-55`

function bpTextClass(i: number) {
  if (i === 0) return BP_TEXT_WAS_ACTIVE
  if (i === 1) return BP_TEXT_BECOMES_ACTIVE
  return BP_TEXT_IDLE
}

export function BounceSidebarWireframe() {
  const theme = draftTheme

  return (
    <DraftSurface>
      <style>{`
        @keyframes bp-bs-arc {
          0% { transform: translateX(0); }
          40% { transform: translateX(${BP_PEAK_X}px); }
          100% { transform: translateX(0); }
        }
        .blueprint .bp-bs-drop {
          transition: transform ${BP.dotMs}ms var(--motion-ease-out);
        }
        .group:hover .blueprint .bp-bs-drop,
        .group:focus-visible .blueprint .bp-bs-drop {
          transform: translateY(${BP_TRAVEL}px);
          transition-delay: var(--motion-dur-base);
        }
        .group:hover .blueprint .bp-bs-arc,
        .group:focus-visible .blueprint .bp-bs-arc {
          animation: bp-bs-arc ${BP.dotMs}ms var(--motion-ease-out) var(--motion-dur-base) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .blueprint .bp-bs-drop {
            transition: none;
          }
          .group:hover .blueprint .bp-bs-arc,
          .group:focus-visible .blueprint .bp-bs-arc {
            animation: none;
          }
        }
      `}</style>
      {LABELS.map((label, i) => {
        const y = bpRowY(i)
        return (
          <g key={label}>
            <path
              d={squircleRectPath(BP_ITEM_X, y, BP_ITEM_W, BP.rowH, BP.rx)}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={theme.wireframe.strokeOpacity}
              style={beat(`${i * 60}ms`)}
              className={`ink-draw ${BP_ROW_OUTLINE}`}
            />
            <text
              x={BP_ITEM_X + BP.itemPad}
              y={y + BP.rowH / 2 + BP.font * 0.35}
              fontSize={BP.font}
              fontFamily="var(--font-sans)"
              style={beat(`${400 + i * 60}ms`)}
              className={`fade-note ${bpTextClass(i)}`}
            >
              {label}
            </text>
          </g>
        )
      })}
      <g className="bp-bs-drop">
        <g className="bp-bs-arc">
          <circle
            cx={BP_DOT_CX}
            cy={bpRowY(0) + BP.rowH / 2}
            r={BP.dot / 2}
            fill="var(--bp-accent, var(--color-accent))"
            style={beat(DRAFT_BEAT.hatch)}
            className="fade-note"
          />
        </g>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP.x} y={BP.y} w={BP.w} h={BP_TOTAL_H} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP.x}
          x2={BP_RIGHT}
          y={BP.y - 8}
          label={`${BP.w}`}
          labelYOffset={-2}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <InsetGuide
          x={BP_ITEM_X + BP.itemPad}
          y={bpRowY(BP_GUIDE_ROW) + BP.itemPad}
          w={BP_ITEM_W - BP.itemPad * 2}
          h={BP.rowH - BP.itemPad * 2}
          offset={0.8}
          boxX={BP_ITEM_X}
          boxY={bpRowY(BP_GUIDE_ROW)}
          boxW={BP_ITEM_W}
          boxH={BP.rowH}
          boxRx={BP.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP_RIGHT + 15}
          y={bpRowY(BP_GUIDE_ROW) + BP.rowH / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {`${BP.itemPad}`}
        </MeasureNote>
        <MeasureV
          x={BP.x - 14}
          y1={BP.y}
          y2={BP.y + BP_TOTAL_H}
          label={`${BP_TOTAL_H}`}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP_ITEM_X}
            y1={bpRowY(0) + BP.rowH}
            x2={BP_RIGHT + 16}
            y2={bpRowY(0) + BP.rowH}
          />
          <line x1={BP_ITEM_X} y1={bpRowY(1)} x2={BP_RIGHT + 16} y2={bpRowY(1)} />
        </g>
        <MeasureV
          x={BP_RIGHT + 10}
          y1={bpRowY(0)}
          y2={bpRowY(0) + BP.rowH}
          label={`${BP.rowH}`}
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureV
          x={BP_RIGHT + 10}
          y1={bpRowY(0) + BP.rowH}
          y2={bpRowY(1)}
          label={`${BP.gap}`}
          labelXOffset={10}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        />
        <MeasureH
          x1={BP.x}
          x2={BP_ITEM_X}
          y={bpRowY(2) + BP.rowH / 2}
          label={`${BP.ps}`}
          className="note-stamp"
          style={beat(stampBeat(5))}
        />
        <MeasureNote
          x={BP.x + 2}
          y={bpRowY(2) + BP.rowH / 2 + 13}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(6))}
        >
          {`dot ${BP.dot}`}
        </MeasureNote>
        <MeasureNote
          x={BP.x}
          y={BP.y + BP_TOTAL_H + 10}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(7))}
        >
          spring overshoot
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN_ITEMS = ['Home', 'About', 'Services'] as const
const AN = {
  textInset: 12,
  fontSize: 12,
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
        x={AN.listX + AN.padL + AN.textInset}
        y={y + AN.itemH / 2 + 4}
        fontSize={AN.fontSize}
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
    <AnatomyFrame
      viewBox="-24 -40 324 223"
      ariaLabel="Bounce Sidebar anatomy: container, item, active, dot"
    >
      <ContainerShape />
      {AN_ITEMS.map((label, i) => (
        <ItemShape key={label} index={i} label={label} />
      ))}
      <ActiveShape />
      <DotShape />
      <AnnotationsLayer />
      <AnatomyCallout
        part="container"
        label="Nav.List"
        anchor={[160, 100]}
        side="end"
        distance={50}
        measure="flex column · gap 4 · ps 24"
        caption="Root ul element, vertical nav container"
      />
      <AnatomyCallout
        part="item-0"
        label="Nav.Item"
        anchor={[AN.listX + AN.listW - AN.padV, itemY(0) + AN.itemH / 2]}
        side="end"
        distance={28}
        measure="rounded-md · p 4 · text-base"
        caption="Individual nav item button with click and hover states"
      />
      <AnatomyCallout
        part="active"
        label="Active"
        anchor={[AN.listX + AN.listW - AN.padV, itemY(1) + AN.itemH / 2]}
        side="end"
        distance={28}
        isAccent
        measure="active item · rounded-md"
        caption="Marks the current item with spring animation on change"
      />
      <AnatomyCallout
        part="dot"
        label="Bounce Dot"
        anchor={[AN.listX + 10, itemY(1) + AN.itemH / 2 - AN.dotR]}
        side="top"
        distance={67}
        isAccent
        measure="dot · rounded-full"
        caption="Bounces to active item with spring and audio feedback"
      />
    </AnatomyFrame>
  )
}
