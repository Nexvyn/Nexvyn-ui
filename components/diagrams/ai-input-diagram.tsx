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
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_FILL_PANEL,
  DRAFT_FILL_SOLID,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/parts'

const CONTAINER_X = 20
const CONTAINER_Y = 20
const CONTAINER_RX = 6

const TEXTAREA_PAD_X = 14
const TEXTAREA_PAD_TOP = 12
const TEXTAREA_H = 24
const TEXTAREA_Y = CONTAINER_Y + TEXTAREA_PAD_TOP

const ROW_GAP_TOP = 4
const ROW_Y = TEXTAREA_Y + TEXTAREA_H + ROW_GAP_TOP
const ROW_PAD_X = 10
const ROW_ITEM = 32
const ROW_PAD_BOTTOM = 10
const ROW_H = ROW_GAP_TOP + ROW_ITEM + ROW_PAD_BOTTOM
const GAP = 6

const PLUS_R = ROW_ITEM / 2
const PLUS_CX = CONTAINER_X + ROW_PAD_X + PLUS_R
const PLUS_CY = ROW_Y + ROW_GAP_TOP + ROW_ITEM / 2

const AGENT_W = 72
const AGENT_H = 32
const AGENT_X = PLUS_CX + PLUS_R + GAP
const AGENT_Y = PLUS_CY - AGENT_H / 2

const SEND_R = ROW_ITEM / 2
const MIC_R = 16
const SETTINGS_W = 84
const SETTINGS_H = 28

const CONTAINER_W =
  AGENT_X +
  AGENT_W +
  GAP * 2 +
  SETTINGS_W +
  GAP +
  MIC_R * 2 +
  GAP +
  SEND_R * 2 +
  ROW_PAD_X -
  CONTAINER_X

const CONTAINER_H = ROW_Y + ROW_H - CONTAINER_Y

const SEND_CX = CONTAINER_X + CONTAINER_W - ROW_PAD_X - SEND_R
const SEND_CY = PLUS_CY

const MIC_CX = SEND_CX - SEND_R - GAP - MIC_R
const MIC_CY = PLUS_CY

const SETTINGS_X = MIC_CX - MIC_R - GAP - SETTINGS_W
const SETTINGS_Y = PLUS_CY - SETTINGS_H / 2

const CONTAINER_FAR_X = CONTAINER_X + CONTAINER_W
const CONTAINER_FAR_Y = CONTAINER_Y + CONTAINER_H

const CONTAINER = {
  x: CONTAINER_X,
  y: CONTAINER_Y,
  w: CONTAINER_W,
  h: CONTAINER_H,
  rx: CONTAINER_RX,
}
const TEXTAREA = { x: CONTAINER_X + TEXTAREA_PAD_X, y: TEXTAREA_Y, w: 200, h: TEXTAREA_H }
const PLUS = { cx: PLUS_CX, cy: PLUS_CY, r: PLUS_R }
const AGENT = { x: AGENT_X, y: AGENT_Y, w: AGENT_W, h: AGENT_H }
const SETTINGS = { x: SETTINGS_X, y: SETTINGS_Y, w: SETTINGS_W, h: SETTINGS_H }
const MIC = { cx: MIC_CX, cy: MIC_CY, r: MIC_R }
const SEND = { cx: SEND_CX, cy: SEND_CY, r: SEND_R }

const TOP_TAG_Y = CONTAINER_Y - 34 - 24
const BOTTOM_TAG_Y = CONTAINER_FAR_Y + 34
const CONTAINER_TAG_Y = BOTTOM_TAG_Y + 34
const TEXTAREA_TAG_X = CONTAINER_X - 46 - 90

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
        x={CONTAINER.x}
        y={CONTAINER.y}
        width={CONTAINER.w}
        height={CONTAINER.h}
        rx={CONTAINER.rx}
        fill="currentColor"
        fillOpacity={0.05}
        stroke="currentColor"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function TextareaShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('textarea')
  return (
    <g
      onMouseEnter={() => setHovered('textarea')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={TEXTAREA.x}
        y={TEXTAREA.y}
        width={TEXTAREA.w}
        height={TEXTAREA.h}
        fill="transparent"
      />
      <text
        x={TEXTAREA.x}
        y={TEXTAREA.y + TEXTAREA.h / 2 + 5}
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        Ask anything…
      </text>
    </g>
  )
}

function PlusMenuShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('plus-menu')
  return (
    <g
      onMouseEnter={() => setHovered('plus-menu')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={PLUS.cx}
        cy={PLUS.cy}
        r={PLUS.r}
        fill="currentColor"
        fillOpacity={0.08}
        stroke="currentColor"
        className={spotlight.className}
        style={spotlight.style}
      />
      <path
        d={`M${PLUS.cx} ${PLUS.cy - 6}V${PLUS.cy + 6}M${PLUS.cx - 6} ${PLUS.cy}H${PLUS.cx + 6}`}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  )
}

function AgentMenuShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('agent-menu')
  return (
    <g
      onMouseEnter={() => setHovered('agent-menu')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={AGENT.x}
        y={AGENT.y}
        width={AGENT.w}
        height={AGENT.h}
        rx={AGENT.h / 2}
        fill="currentColor"
        fillOpacity={0.06}
        stroke="currentColor"
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={AGENT.x + AGENT.w / 2}
        y={AGENT.y + AGENT.h / 2 + 5}
        fontSize={14}
        textAnchor="middle"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        Claude
      </text>
    </g>
  )
}

function SettingsDropdownShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('settings-dropdown')
  return (
    <g
      onMouseEnter={() => setHovered('settings-dropdown')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={SETTINGS.x}
        y={SETTINGS.y}
        width={SETTINGS.w}
        height={SETTINGS.h}
        rx={SETTINGS.h / 2}
        fill="none"
        stroke="currentColor"
        strokeDasharray="3 2"
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={SETTINGS.x + SETTINGS.w / 2}
        y={SETTINGS.y + SETTINGS.h / 2 + 5}
        fontSize={14}
        textAnchor="middle"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        Fast High ⌄
      </text>
    </g>
  )
}

function MicShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('mic', { isInteraction: true })
  return (
    <g
      onMouseEnter={() => setHovered('mic')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={MIC.cx}
        cy={MIC.cy}
        r={MIC.r}
        fill="none"
        stroke="currentColor"
        strokeDasharray="2 2"
        className={spotlight.className}
        style={spotlight.style}
      />
      <rect x={MIC.cx - 2.5} y={MIC.cy - 6} width={5} height={8} rx={2.5} fill="currentColor" />
      <path
        d={`M${MIC.cx - 5} ${MIC.cy} a5 5 0 0 0 10 0`}
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
      />
    </g>
  )
}

function SendShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('send')
  return (
    <g
      onMouseEnter={() => setHovered('send')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={SEND.cx}
        cy={SEND.cy}
        r={SEND.r}
        fill="currentColor"
        fillOpacity={0.9}
        className={spotlight.className}
        style={spotlight.style}
      />
      <path
        d={`M${SEND.cx} ${SEND.cy + 5}V${SEND.cy - 5}M${SEND.cx - 4.5} ${SEND.cy - 0.5}L${SEND.cx} ${SEND.cy - 5}L${SEND.cx + 4.5} ${SEND.cy - 0.5}`}
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
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
      <GripFrame x={CONTAINER.x} y={CONTAINER.y} w={CONTAINER.w} h={CONTAINER.h} />
      <InsetGuide
        x={TEXTAREA.x}
        y={TEXTAREA.y}
        w={CONTAINER.w - TEXTAREA_PAD_X * 2}
        h={TEXTAREA.h}
        offset={0.8}
        boxX={CONTAINER.x}
        boxY={CONTAINER.y}
        boxW={CONTAINER.w}
        boxH={CONTAINER.h}
        boxRx={CONTAINER.rx}
        clipOffset={0.8}
      />
      <MeasureNote
        x={CONTAINER.x + TEXTAREA_PAD_X}
        y={CONTAINER.y + CONTAINER.h - 2}
        anchor="start"
      >
        {`${TEXTAREA_PAD_X}`}
      </MeasureNote>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={PLUS.cx + PLUS.r} y1={PLUS.cy} x2={AGENT.x} y2={AGENT.y + AGENT.h / 2} />
      </g>
      <MeasureNote x={PLUS.cx + PLUS.r + GAP / 2} y={PLUS.cy - PLUS.r - 4} anchor="middle">
        {`${GAP}`}
      </MeasureNote>
    </g>
  )
}

function OverlayLines() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="container"
        x1={CONTAINER.x + CONTAINER.w / 2}
        y1={CONTAINER_TAG_Y}
        x2={CONTAINER.x + CONTAINER.w / 2}
        y2={CONTAINER_FAR_Y}
      />
      <OverlayLine
        id="textarea"
        x1={TEXTAREA_TAG_X + 90}
        y1={TEXTAREA.y + TEXTAREA.h / 2}
        x2={TEXTAREA.x}
        y2={TEXTAREA.y + TEXTAREA.h / 2}
      />
      <OverlayLine
        id="plus-menu"
        x1={PLUS.cx}
        y1={BOTTOM_TAG_Y}
        x2={PLUS.cx}
        y2={PLUS.cy + PLUS.r}
      />
      <OverlayLine
        id="agent-menu"
        x1={AGENT.x + AGENT.w / 2}
        y1={TOP_TAG_Y + 24}
        x2={AGENT.x + AGENT.w / 2}
        y2={AGENT.y}
      />
      <OverlayLine
        id="settings-dropdown"
        x1={SETTINGS.x + SETTINGS.w / 2}
        y1={BOTTOM_TAG_Y}
        x2={SETTINGS.x + SETTINGS.w / 2}
        y2={SETTINGS.y + SETTINGS.h}
      />
      <OverlayLine id="mic" x1={MIC.cx} y1={TOP_TAG_Y + 24} x2={MIC.cx} y2={MIC.cy - MIC.r} />
      <OverlayLine id="send" x1={SEND.cx} y1={BOTTOM_TAG_Y} x2={SEND.cx} y2={SEND.cy + SEND.r} />
    </g>
  )
}

function Tags() {
  return (
    <>
      <foreignObject
        x={CONTAINER.x + CONTAINER.w / 2 - 40}
        y={CONTAINER_TAG_Y}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Container"
          isAccent
          className="items-start justify-center"
        />
      </foreignObject>
      <foreignObject
        x={TEXTAREA_TAG_X}
        y={TEXTAREA.y + TEXTAREA.h / 2 - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="textarea" label="Textarea" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={PLUS.cx - 35}
        y={BOTTOM_TAG_Y}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="plus-menu" label="Plus menu" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={AGENT.x + AGENT.w / 2 - 45}
        y={TOP_TAG_Y}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="agent-menu" label="Agent menu" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={SETTINGS.x + SETTINGS.w / 2 - 45}
        y={BOTTOM_TAG_Y}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="settings-dropdown"
          label="Settings dropdown"
          isAccent
          className="items-start justify-center"
        />
      </foreignObject>
      <foreignObject
        x={MIC.cx - 30}
        y={TOP_TAG_Y}
        width={60}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="mic" label="Mic" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={SEND.cx - 35}
        y={BOTTOM_TAG_Y}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="send" label="Send" isAccent className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function AiInputAnatomy() {
  return (
    <AnatomyFrame
      viewBox={`${TEXTAREA_TAG_X - 10} ${TOP_TAG_Y - 4} ${CONTAINER_FAR_X + 20 - (TEXTAREA_TAG_X - 10)} ${CONTAINER_TAG_Y + 24 - (TOP_TAG_Y - 4)}`}
      maxWidthClassName="max-w-xl"
    >
      <ContainerShape />
      <TextareaShape />
      <PlusMenuShape />
      <AgentMenuShape />
      <SettingsDropdownShape />
      <MicShape />
      <SendShape />
      <AnnotationsLayer />
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

const BP_C = {
  w: 210,
  y: 29,
  rx: 6,
  padX: 10,
  padTop: 12,
  taH: 24,
  rowGapTop: 4,
  rowPadX: 10,
  rowItem: 32,
  rowPadBottom: 10,
  gap: 6,
} as const

const BP_X = (220 - BP_C.w) / 2
const BP_TA_Y = BP_C.y + BP_C.padTop
const BP_ROW_Y = BP_TA_Y + BP_C.taH + BP_C.rowGapTop
const BP_H = BP_ROW_Y + BP_C.rowItem + BP_C.rowPadBottom - BP_C.y

const BP_PLUS_R = BP_C.rowItem / 2
const BP_PLUS_CX = BP_X + BP_C.rowPadX + BP_PLUS_R
const BP_PLUS_CY = BP_ROW_Y + BP_C.rowGapTop + BP_PLUS_R

const BP_SEND_R = BP_C.rowItem / 2
const BP_SEND_CX = BP_X + BP_C.w - BP_C.rowPadX - BP_SEND_R
const BP_SEND_CY = BP_PLUS_CY

const BP_MIC_R = 16
const BP_MIC_CX = BP_SEND_CX - BP_SEND_R - BP_C.gap - BP_MIC_R
const BP_MIC_CY = BP_PLUS_CY

const BP_SETTINGS_W = 64
const BP_SETTINGS_H = 28
const BP_SETTINGS_X = BP_MIC_CX - BP_MIC_R - BP_C.gap - BP_SETTINGS_W
const BP_SETTINGS_Y = BP_PLUS_CY - BP_SETTINGS_H / 2

export function AiInputBlueprint() {
  const theme = draftTheme

  return (
    <DraftSurface>
      <rect
        x={BP_X}
        y={BP_C.y}
        width={BP_C.w}
        height={BP_H}
        rx={BP_C.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_PANEL} supports-[corner-shape:squircle]:corner-squircle`}
      />

      <rect
        x={BP_X + BP_C.padX}
        y={BP_TA_Y + 10}
        width={56}
        height={4}
        rx={2}
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      />

      <circle
        cx={BP_PLUS_CX}
        cy={BP_PLUS_CY}
        r={BP_PLUS_R}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_TEXT_SOFT} fill-transparent stroke-current`}
      />
      <path
        d={`M${BP_PLUS_CX} ${BP_PLUS_CY - 6} V${BP_PLUS_CY + 6} M${BP_PLUS_CX - 6} ${BP_PLUS_CY} H${BP_PLUS_CX + 6}`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={1.25}
        strokeLinecap="round"
        fill="none"
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_TEXT_SOFT} stroke-current`}
      />

      <rect
        x={BP_SETTINGS_X}
        y={BP_SETTINGS_Y}
        width={BP_SETTINGS_W}
        height={BP_SETTINGS_H}
        rx={BP_SETTINGS_H / 2}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_TEXT_SOFT} fill-transparent stroke-current`}
      />

      <rect
        x={BP_MIC_CX - 2.25}
        y={BP_MIC_CY - 5}
        width={4.5}
        height={8}
        rx={2.25}
        style={beat(DRAFT_BEAT.hatch)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      />
      <path
        d={`M${BP_MIC_CX - 4.5} ${BP_MIC_CY} a4.5 4.5 0 0 0 9 0`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={1}
        fill="none"
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_TEXT_SOFT} stroke-current`}
      />

      <circle
        cx={BP_SEND_CX}
        cy={BP_SEND_CY}
        r={BP_SEND_R}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_SOLID} supports-[corner-shape:squircle]:corner-squircle`}
      />
      <path
        d={`M${BP_SEND_CX} ${BP_SEND_CY + 5.5} V${BP_SEND_CY - 4.5} M${BP_SEND_CX - 4.5} ${BP_SEND_CY - 0.5} L${BP_SEND_CX} ${BP_SEND_CY - 5} L${BP_SEND_CX + 4.5} ${BP_SEND_CY - 0.5}`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_TEXT_SOFT} stroke-current group-hover:stroke-(--color-bg) group-focus-visible:stroke-(--color-bg)`}
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={BP_X + BP_C.padX}
          y={BP_TA_Y}
          w={BP_C.w - BP_C.padX * 2}
          h={BP_C.taH}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_C.y}
          boxW={BP_C.w}
          boxH={BP_H}
          boxRx={BP_C.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <InsetGuide
          x={BP_X + BP_C.rowPadX}
          y={BP_ROW_Y}
          w={BP_C.w - BP_C.rowPadX * 2}
          h={BP_C.rowItem + BP_C.rowPadBottom}
          offset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_C.w}
          y={BP_C.y - 10}
          label={`${BP_C.w}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 10}
          y1={BP_C.y}
          y2={BP_C.y + BP_H}
          label={`${BP_H}`}
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={(BP_PLUS_CX + BP_SETTINGS_X) / 2}
          y={BP_C.y + BP_H + 10}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`gap ${BP_C.gap}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
