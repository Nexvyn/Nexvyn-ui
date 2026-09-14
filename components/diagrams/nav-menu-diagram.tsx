'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import type { CSSProperties } from 'react'
import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureH,
  MeasureNote,
  MeasureV,
  GripFrame,
  InsetGuide,
  squircleRectPath,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const NM = {
  itemH: 44,
  itemGap: 2,
  itemRx: 4,
  itemPadX: 12,
  inset: 4,
  navW: 192,
} as const

const ITEM_Y = [0, NM.itemH + NM.itemGap, 2 * (NM.itemH + NM.itemGap), 3 * (NM.itemH + NM.itemGap)]
const NAV_H = ITEM_Y[3] + NM.itemH

const ITEM_LABELS = ['Overview', 'Install', 'Theming', 'Components'] as const

const S = 0.6
const BP_ITEM_H = NM.itemH * S
const BP_PITCH = (NM.itemH + NM.itemGap) * S
const BP_NAV_W = NM.navW * S
const BP_NAV_H = NAV_H * S
const BP_RX = NM.itemRx * S
const BP_PAD_X = NM.itemPadX * S
const BP_PAD_Y = 8 * S
const BP_INSET = NM.inset * S
const BP_LABEL_SIZE = 14 * S
const BP_DOT_R = 3 * S
const BP_DOT_GAP = 10 * S
const BP_X = 55
const BP_Y = 25
const BP_ITEM_Y = ITEM_LABELS.map((_, i) => BP_Y + i * BP_PITCH)
const BP_ACTIVE_ROW = 1
const BP_DOTS: Partial<Record<number, string>> = {
  1: 'var(--bp-accent, var(--color-accent))',
  3: 'var(--color-subtle)',
}

const BORDERLESS_ROW = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-transparent group-focus-visible:stroke-transparent`

const BP_TEXT_W: Record<string, number> = { Install: 23, Components: 51 }

function bpDotCx(label: string) {
  return BP_X + BP_PAD_X + (BP_TEXT_W[label] ?? 0) + BP_DOT_GAP + BP_DOT_R
}

export function NavMenuBlueprint() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <g
        style={{ '--nm-travel': `${BP_PITCH * BP_ACTIVE_ROW}px` } as CSSProperties}
        className="transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-y-(--nm-travel) group-hover:delay-(--motion-dur-base) group-focus-visible:translate-y-(--nm-travel) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <rect
          x={BP_X + BP_INSET}
          y={BP_ITEM_Y[0]}
          width={BP_NAV_W - BP_INSET * 2}
          height={BP_ITEM_H}
          rx={BP_RX}
          fill="var(--bp-accent, var(--color-accent))"
          className={`${DRAFT_INK_MORPH} opacity-0 group-hover:opacity-12 group-focus-visible:opacity-12`}
        />
      </g>
      {ITEM_LABELS.map((label, i) => {
        const y = BP_ITEM_Y[i]
        const dot = BP_DOTS[i]
        return (
          <g key={label}>
            <rect
              x={BP_X}
              y={y}
              width={BP_NAV_W}
              height={BP_ITEM_H}
              rx={BP_RX}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              style={beat(i === 0 ? DRAFT_BEAT.outline : `${i * 60}ms`)}
              strokeWidth={theme.wireframe.strokeWidth * 0.5}
              strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
              className={`ink-draw ${BORDERLESS_ROW}`}
            />
            <text
              x={BP_X + BP_PAD_X}
              y={y + BP_ITEM_H / 2 + BP_LABEL_SIZE * 0.35}
              fontSize={BP_LABEL_SIZE}
              fontFamily="var(--font-sans)"
              style={beat(DRAFT_LABEL_BEAT)}
              className={
                i === BP_ACTIVE_ROW
                  ? `fade-note ${DRAFT_TEXT_SOFT}`
                  : `fade-note ${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:opacity-60 group-focus-visible:opacity-60`
              }
            >
              {label}
            </text>
            {dot && (
              <circle
                cx={bpDotCx(label)}
                cy={y + BP_ITEM_H / 2}
                r={BP_DOT_R}
                fill={dot}
                style={beat(DRAFT_LABEL_ALT_BEAT)}
                className="fade-note"
              />
            )}
          </g>
        )
      })}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_X}
          y={BP_Y}
          w={BP_NAV_W}
          h={BP_NAV_H}
          className="note-stamp"
          style={beat(DRAFT_BEAT.handle)}
        />
        <InsetGuide
          x={BP_X + BP_PAD_X}
          y={BP_ITEM_Y[0] + BP_PAD_Y}
          w={BP_NAV_W - BP_PAD_X * 2}
          h={BP_ITEM_H - BP_PAD_Y * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_ITEM_Y[0]}
          boxW={BP_NAV_W}
          boxH={BP_ITEM_H}
          boxRx={BP_RX}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_NAV_W}
          y={BP_Y - 10}
          label={`${NM.navW}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BP_Y + BP_NAV_H}
          label={`${NAV_H}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureV
          x={BP_X + BP_NAV_W + 12}
          y1={BP_ITEM_Y[0]}
          y2={BP_ITEM_Y[0] + BP_ITEM_H}
          label={`${NM.itemH}`}
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureV
          x={BP_X + BP_NAV_W + 12}
          y1={BP_ITEM_Y[0] + BP_ITEM_H}
          y2={BP_ITEM_Y[1]}
          label={`gap ${NM.itemGap}`}
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureNote
          x={BP_X + BP_NAV_W + 17}
          y={BP_ITEM_Y[1] + BP_ITEM_H / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`pad ${NM.inset}`}
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP_NAV_W + 17}
          y={BP_ITEM_Y[2] + BP_ITEM_H / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(5))}
        >
          {`r${NM.itemRx}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const HIGHLIGHT_W = NM.navW - NM.inset * 2
const DOT_R = 3
const DOT_GAP = 10
const TEXT_W: Record<string, number> = { Install: 38, Components: 84 }

function dotCx(label: string) {
  return NM.itemPadX + (TEXT_W[label] ?? 0) + DOT_GAP + DOT_R
}

function NavShape() {
  const { hovered, setHovered } = useAnatomy()
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
        rx={NM.itemRx}
        stroke="currentColor"
        strokeWidth={hovered === 'nav' ? 1.5 : draftTheme.wireframe.strokeWidth}
        strokeDasharray="3 3"
        fill="none"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function HighlightShape({
  id,
  index,
  isAccent,
}: {
  id: string
  index: number
  isAccent?: boolean
}) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(id)
  const engaged = hovered === id
  return (
    <g
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <path
        d={squircleRectPath(NM.inset, ITEM_Y[index], HIGHLIGHT_W, NM.itemH, NM.itemRx)}
        fill={isAccent ? 'var(--bp-accent, var(--color-accent))' : 'currentColor'}
        fillOpacity={isAccent ? (engaged ? 0.22 : 0.12) : engaged ? 0.16 : 0.08}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ItemShape({ index, label, id }: { index: number; label: string; id: string }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(id)
  return (
    <g
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={ITEM_Y[index]}
        width={NM.navW}
        height={NM.itemH}
        rx={NM.itemRx}
        stroke="currentColor"
        strokeWidth={0.75}
        strokeOpacity={hovered === id ? 0.6 : 0}
        fill="transparent"
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={NM.itemPadX}
        y={ITEM_Y[index] + NM.itemH / 2 + 5}
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        {label}
      </text>
    </g>
  )
}

function DotShape({
  index,
  label,
  isAccent,
}: {
  index: number
  label: string
  isAccent?: boolean
}) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot')
  const cy = ITEM_Y[index] + NM.itemH / 2
  return (
    <g
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={dotCx(label)}
        cy={cy}
        r={DOT_R + 3}
        fill="currentColor"
        fillOpacity={hovered === 'dot' ? 0.12 : 0}
        className={spotlight.className}
        style={spotlight.style}
      />
      <circle
        cx={dotCx(label)}
        cy={cy}
        r={DOT_R}
        fill={isAccent ? 'var(--bp-accent, var(--color-accent))' : 'currentColor'}
        fillOpacity={isAccent ? 1 : 0.45}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <MeasureV x={-12} y1={0} y2={NAV_H} label={`${NAV_H}`} labelXOffset={-6} />
    </g>
  )
}

function Callouts() {
  const columnX = NM.navW + 24
  const highlightEnd = NM.inset + HIGHLIGHT_W
  const mid = (i: number) => ITEM_Y[i] + NM.itemH / 2
  const dotBottom = mid(3) + DOT_R
  return (
    <>
      <AnatomyCallout
        part="nav"
        label="NavMenu"
        anchor={[NM.navW / 2, 0]}
        side="top"
        distance={16}
        measure={`${NM.navW}px wide, gap-0.5 (${NM.itemGap}px)`}
        caption="Vertical nav list; arrow keys move focus between links"
      />
      <AnatomyCallout
        part="hover"
        label="Hover highlight"
        anchor={[highlightEnd, mid(0)]}
        side="end"
        distance={columnX - highlightEnd}
        measure={`${HIGHLIGHT_W} × ${NM.itemH}px, mx-1, fg/8`}
        caption="Proximity highlight that follows the pointer or focus"
      />
      <AnatomyCallout
        part="active"
        label="Active route"
        anchor={[highlightEnd, mid(1)]}
        side="end"
        distance={columnX - highlightEnd}
        isAccent
        measure={`${HIGHLIGHT_W} × ${NM.itemH}px, inset-x-1, accent/12`}
        caption="Springs to the item whose href matches activeSlug"
      />
      <AnatomyCallout
        part="item"
        label="NavMenuItem"
        anchor={[NM.navW, mid(2)]}
        side="end"
        distance={columnX - NM.navW}
        measure={`${NM.navW} × ${NM.itemH}px, px-3, text-sm`}
        caption="Link with a weight-shift label and optional icon"
      />
      <AnatomyCallout
        part="dot"
        label="Status dot"
        anchor={[dotCx(ITEM_LABELS[3]), dotBottom]}
        side="bottom"
        distance={NAV_H + 14 - dotBottom}
        measure={`${DOT_R * 2}px, gap-2.5 (${DOT_GAP}px)`}
        caption="Accent dot for isNew, subtle dot for isUpdated"
      />
    </>
  )
}

export function NavMenuAnatomy() {
  return (
    <AnatomyFrame viewBox="-44 -52 382 284" ariaLabel="Nav menu anatomy">
      <NavShape />
      {ITEM_LABELS.map((label, i) => (
        <ItemShape key={label} index={i} label={label} id="item" />
      ))}
      <HighlightShape id="hover" index={0} />
      <HighlightShape id="active" index={1} isAccent />
      <DotShape index={1} label={ITEM_LABELS[1]} isAccent />
      <DotShape index={3} label={ITEM_LABELS[3]} />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}
