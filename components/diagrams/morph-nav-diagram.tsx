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
  DRAFT_FILL_PANEL,
  DRAFT_FILL_SOLID,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const MN = {
  triggerSize: 44,
  triggerIcon: 16,
  panelGap: 8,
  panelW: 192,
  panelBorder: 1,
  panelPad: 6,
  panelRadius: 4,
  itemH: 44,
  itemPadX: 12,
  itemRx: 4,
  chevronSize: 14,
} as const

const S = 0.6
const BP_TRIGGER = MN.triggerSize * S
const BP_PANEL_W = MN.panelW * S
const BP_PANEL_INSET = (MN.panelBorder + MN.panelPad) * S
const BP_ITEM_H = MN.itemH * S
const BP_PANEL_H = BP_PANEL_INSET * 2 + BP_ITEM_H * 3
const BP_PANEL_RX = MN.panelRadius * S
const BP_PANEL_RIGHT = 170
const BP_PANEL_X = BP_PANEL_RIGHT - BP_PANEL_W
const BP_TRIGGER_Y = 7
const BP_TRIGGER_CX = BP_PANEL_RIGHT - BP_TRIGGER / 2
const BP_TRIGGER_CY = BP_TRIGGER_Y + BP_TRIGGER / 2
const BP_PANEL_Y = BP_TRIGGER_Y + BP_TRIGGER + MN.panelGap * S
const BP_ITEM_X = BP_PANEL_X + BP_PANEL_INSET
const BP_ITEM_W = BP_PANEL_W - BP_PANEL_INSET * 2
const BP_ITEM_Y = [0, 1, 2].map((i) => BP_PANEL_Y + BP_PANEL_INSET + i * BP_ITEM_H)
const BP_LABEL_SIZE = 14 * S
const BP_CHEVRON = MN.chevronSize * S
const BP_CHEVRON_X = BP_ITEM_X + BP_ITEM_W - MN.itemPadX * S - BP_CHEVRON
const BP_WIDTH_DIM_Y = BP_PANEL_Y + BP_PANEL_H + 6
const BP_ITEM_LABELS = ['Dashboard', 'Automations', 'Settings'] as const
const BP_HAMBURGER_Y = [5, 8, 11].map((y) => BP_TRIGGER_CY + (y - 8) * S)
const BP_HAMBURGER_X1 = BP_TRIGGER_CX + (4 - 8) * S
const BP_HAMBURGER_X2 = BP_TRIGGER_CX + (14 - 8) * S

function HamburgerLines({ className }: { className: string }) {
  return (
    <g strokeWidth={1.5 * S} strokeLinecap="round" className={className}>
      {BP_HAMBURGER_Y.map((y) => (
        <line key={y} x1={BP_HAMBURGER_X1} y1={y} x2={BP_HAMBURGER_X2} y2={y} />
      ))}
    </g>
  )
}

export function MorphNavBlueprint() {
  const theme = draftTheme
  const iconFade =
    'transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none'

  return (
    <DraftSurface>
      <circle
        cx={BP_TRIGGER_CX}
        cy={BP_TRIGGER_CY}
        r={BP_TRIGGER / 2}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_SOLID}`}
      />
      <HamburgerLines
        className={`stroke-(--color-bg) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 ${iconFade}`}
      />
      <HamburgerLines
        className={`stroke-current opacity-70 group-hover:opacity-0 group-focus-visible:opacity-0 ${iconFade}`}
      />

      <rect
        x={BP_PANEL_X}
        y={BP_PANEL_Y}
        width={BP_PANEL_W}
        height={BP_PANEL_H}
        rx={BP_PANEL_RX}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />

      <g
        style={{ '--mn-travel': `${BP_ITEM_H}px` } as CSSProperties}
        className="transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-y-(--mn-travel) group-hover:delay-(--motion-dur-base) group-focus-visible:translate-y-(--mn-travel) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <rect
          x={BP_ITEM_X}
          y={BP_ITEM_Y[0]}
          width={BP_ITEM_W}
          height={BP_ITEM_H}
          rx={MN.itemRx * S}
          fill="currentColor"
          className={`${DRAFT_INK_MORPH} opacity-0 group-hover:opacity-10 group-focus-visible:opacity-10`}
        />
      </g>

      {BP_ITEM_LABELS.map((label, i) => {
        const y = BP_ITEM_Y[i]
        return (
          <g key={label}>
            <rect
              x={BP_ITEM_X}
              y={y}
              width={BP_ITEM_W}
              height={BP_ITEM_H}
              rx={MN.itemRx * S}
              fill="currentColor"
              fillOpacity={0.06}
              className={DRAFT_SCAFFOLD_FADE}
            />
            <text
              x={BP_ITEM_X + MN.itemPadX * S}
              y={y + BP_ITEM_H / 2 + BP_LABEL_SIZE * 0.35}
              fontSize={BP_LABEL_SIZE}
              fontFamily="var(--font-sans)"
              style={beat(DRAFT_LABEL_BEAT)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            >
              {label}
            </text>
            {i === 1 && (
              <path
                d={`M ${BP_CHEVRON_X + (6 / 16) * BP_CHEVRON} ${y + BP_ITEM_H / 2 - BP_CHEVRON / 4} l ${BP_CHEVRON / 4} ${BP_CHEVRON / 4} l ${-BP_CHEVRON / 4} ${BP_CHEVRON / 4}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5 * S}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${DRAFT_INK_MORPH} opacity-35 group-hover:opacity-60 group-focus-visible:opacity-60`}
              />
            )}
          </g>
        )
      })}

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_PANEL_X}
          y={BP_PANEL_Y}
          w={BP_PANEL_W}
          h={BP_PANEL_H}
          className="note-stamp"
          style={beat(DRAFT_BEAT.handle)}
        />
        <InsetGuide
          x={BP_ITEM_X}
          y={BP_ITEM_Y[0]}
          w={BP_ITEM_W}
          h={BP_ITEM_H * 3}
          offset={0.8}
          boxX={BP_PANEL_X}
          boxY={BP_PANEL_Y}
          boxW={BP_PANEL_W}
          boxH={BP_PANEL_H}
          boxRx={BP_PANEL_RX}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP_PANEL_RIGHT + 5}
          y={BP_ITEM_Y[0] + BP_ITEM_H / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {`pad ${MN.panelPad}`}
        </MeasureNote>
        <MeasureNote
          x={BP_TRIGGER_CX - BP_TRIGGER / 2 - 6}
          y={BP_TRIGGER_CY + 2.5}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`r${MN.triggerSize / 2}`}
        </MeasureNote>
        <MeasureH
          x1={BP_PANEL_X}
          x2={BP_PANEL_RIGHT}
          y={BP_WIDTH_DIM_Y}
          label=""
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureNote
          x={BP_PANEL_RIGHT + 5}
          y={BP_WIDTH_DIM_Y + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          {`${MN.panelW}`}
        </MeasureNote>
        <MeasureV
          x={BP_PANEL_X - 12}
          y1={BP_PANEL_Y}
          y2={BP_PANEL_Y + BP_PANEL_H}
          label={`${PANEL_H}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureV
          x={BP_PANEL_RIGHT + 12}
          y1={BP_TRIGGER_Y}
          y2={BP_TRIGGER_Y + BP_TRIGGER}
          label={`${MN.triggerSize}`}
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
      </g>
    </DraftSurface>
  )
}

const PANEL_INSET = MN.panelBorder + MN.panelPad
const PANEL_H = PANEL_INSET * 2 + MN.itemH * 3
const PANEL_X = 0
const PANEL_Y = MN.triggerSize + MN.panelGap
const TRIGGER_CX = PANEL_X + MN.panelW - MN.triggerSize / 2
const TRIGGER_CY = MN.triggerSize / 2
const ITEM_X = PANEL_X + PANEL_INSET
const ITEM_W = MN.panelW - PANEL_INSET * 2
const ITEM_Y = [0, 1, 2].map((i) => PANEL_Y + PANEL_INSET + i * MN.itemH)
const ITEM_MID = ITEM_Y.map((y) => y + MN.itemH / 2)
const CHEVRON_X = ITEM_X + ITEM_W - MN.itemPadX - MN.chevronSize
const CHEVRON_CX = CHEVRON_X + MN.chevronSize / 2
const CHEVRON_HALF = (MN.chevronSize / 16) * 4

function TriggerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')
  const half = MN.triggerIcon / 2 - 3
  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={TRIGGER_CX}
        cy={TRIGGER_CY}
        r={MN.triggerSize / 2}
        fill="currentColor"
        fillOpacity={hovered === 'trigger' ? 1 : 0.85}
        className={spotlight.className}
        style={spotlight.style}
      />
      <g stroke="var(--color-bg)" strokeWidth={1.5} strokeLinecap="round" className="opacity-90">
        {[-3, 0, 3].map((dy) => (
          <line
            key={dy}
            x1={TRIGGER_CX - half}
            y1={TRIGGER_CY + dy}
            x2={TRIGGER_CX + half}
            y2={TRIGGER_CY + dy}
          />
        ))}
      </g>
    </g>
  )
}

function PanelShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')
  return (
    <g
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={PANEL_X + 0.5}
        y={PANEL_Y + 0.5}
        width={MN.panelW - 1}
        height={PANEL_H - 1}
        rx={MN.panelRadius}
        stroke="currentColor"
        strokeWidth={hovered === 'panel' ? 1.75 : 1}
        fill="transparent"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ItemShape({
  index,
  label,
  id,
  hasChildren,
}: {
  index: number
  label: string
  id: string
  hasChildren?: boolean
}) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(id)
  const y = ITEM_Y[index]
  return (
    <g>
      <g
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
        className="cursor-pointer"
        style={{ pointerEvents: 'all' }}
      >
        <rect
          x={ITEM_X}
          y={y}
          width={ITEM_W}
          height={MN.itemH}
          rx={MN.itemRx}
          fill="currentColor"
          fillOpacity={hovered === id ? 0.1 : 0}
          className={spotlight.className}
          style={spotlight.style}
        />
        <text
          x={ITEM_X + MN.itemPadX}
          y={ITEM_MID[index] + 5}
          fontSize={14}
          fontFamily="var(--font-sans)"
          className={`fill-current ${spotlight.className}`}
          style={spotlight.style}
        >
          {label}
        </text>
      </g>
      {hasChildren && <ChevronGlyph midY={ITEM_MID[index]} />}
    </g>
  )
}

function ChevronGlyph({ midY }: { midY: number }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('chevron')
  return (
    <g
      onMouseEnter={() => setHovered('chevron')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={CHEVRON_X}
        y={midY - MN.chevronSize / 2}
        width={MN.chevronSize}
        height={MN.chevronSize}
        rx={2}
        fill="currentColor"
        fillOpacity={hovered === 'chevron' ? 0.12 : 0}
        className={spotlight.className}
        style={spotlight.style}
      />
      <path
        d={`M ${CHEVRON_CX - CHEVRON_HALF / 2} ${midY - CHEVRON_HALF} l ${CHEVRON_HALF} ${CHEVRON_HALF} l ${-CHEVRON_HALF} ${CHEVRON_HALF}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
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
      <GripFrame x={PANEL_X} y={PANEL_Y} w={MN.panelW} h={PANEL_H} />
      <GripFrame
        x={TRIGGER_CX - MN.triggerSize / 2}
        y={TRIGGER_CY - MN.triggerSize / 2}
        w={MN.triggerSize}
        h={MN.triggerSize}
      />
      <MeasureH
        x1={PANEL_X}
        x2={PANEL_X + MN.panelW}
        y={PANEL_Y + PANEL_H + 8}
        label={`${MN.panelW}`}
        labelYOffset={10}
      />
      <MeasureV x={PANEL_X - 12} y1={PANEL_Y} y2={PANEL_Y + PANEL_H} label={`${PANEL_H}`} />
      <MeasureNote x={PANEL_X + PANEL_INSET / 2} y={PANEL_Y + PANEL_INSET + 10} anchor="middle">
        {`${MN.panelPad}`}
      </MeasureNote>
      <MeasureV
        x={TRIGGER_CX - MN.triggerSize / 2 - 8}
        y1={MN.triggerSize}
        y2={PANEL_Y}
        label={`${MN.panelGap}`}
      />
      <InsetGuide
        x={ITEM_X}
        y={PANEL_Y + PANEL_INSET}
        w={ITEM_W}
        h={PANEL_H - PANEL_INSET * 2}
        offset={0.8}
        boxX={PANEL_X}
        boxY={PANEL_Y}
        boxW={MN.panelW}
        boxH={PANEL_H}
        boxRx={MN.panelRadius}
        clipOffset={0.8}
      />
    </g>
  )
}

function Callouts() {
  const endX = ITEM_X + ITEM_W
  const columnX = PANEL_X + MN.panelW + 24
  return (
    <>
      <AnatomyCallout
        part="trigger"
        label="Trigger"
        anchor={[PANEL_X + MN.panelW, TRIGGER_CY]}
        side="end"
        distance={columnX - PANEL_X - MN.panelW}
        isAccent
        measure={`${MN.triggerSize}px circle, icon ${MN.triggerIcon}px`}
        caption="Toggles the panel; icon morphs hamburger, minus, back arrow"
      />
      <AnatomyCallout
        part="panel"
        label="Panel"
        anchor={[PANEL_X + 60, PANEL_Y]}
        side="top"
        distance={20}
        measure={`${MN.panelW} × ${PANEL_H}px, p-1.5 (6px), 1px border`}
        caption="Portaled menu placed 8px from the trigger, default bottom-end"
      />
      <AnatomyCallout
        part="item-1"
        label="MorphNavItem"
        anchor={[endX, ITEM_MID[0]]}
        side="end"
        distance={columnX - endX}
        measure={`${ITEM_W} × ${MN.itemH}px, px-3, text-sm`}
        caption="Link item; selecting it navigates and closes the panel"
      />
      <AnatomyCallout
        part="item-2"
        label="Parent item"
        anchor={[endX, ITEM_MID[1]]}
        side="end"
        distance={columnX - endX}
        measure={`${ITEM_W} × ${MN.itemH}px, has children`}
        caption="Item with children; slides the panel into its sub-view"
      />
      <AnatomyCallout
        part="item-3"
        label="MorphNavItem"
        anchor={[endX, ITEM_MID[2]]}
        side="end"
        distance={columnX - endX}
        measure={`${ITEM_W} × ${MN.itemH}px, px-3, text-sm`}
        caption="Link item; selecting it navigates and closes the panel"
      />
      <AnatomyCallout
        part="chevron"
        label="Submenu chevron"
        anchor={[CHEVRON_CX, ITEM_MID[1] + MN.chevronSize / 2]}
        side="bottom"
        distance={PANEL_Y + PANEL_H + 14 - ITEM_MID[1] - MN.chevronSize / 2}
        measure={`${MN.chevronSize}px, muted`}
        caption="Marks an item that opens a sub-menu"
      />
    </>
  )
}

export function MorphNavAnatomy() {
  return (
    <AnatomyFrame viewBox="-44 -14 364 262" ariaLabel="Morph nav anatomy">
      <PanelShape />
      <ItemShape index={0} label="Dashboard" id="item-1" />
      <ItemShape index={1} label="Automations" id="item-2" hasChildren />
      <ItemShape index={2} label="Settings" id="item-3" />
      <TriggerShape />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}
