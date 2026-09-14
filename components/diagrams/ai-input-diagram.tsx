'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_FILL_SOLID,
  DRAFT_FILL_MUTED,
  DRAFT_INK_MORPH,
  squircleRectPath,
  DRAFT_SCAFFOLD_FADE,
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

const CONTAINER_W = 360
const CONTAINER_RX = 4

const TEXTAREA_PAD_X = 14
const TEXTAREA_PAD_TOP = 12
const TEXTAREA_PAD_BOTTOM = 4
const TEXTAREA_LINE = 20
const TEXTAREA_H = TEXTAREA_PAD_TOP + TEXTAREA_LINE + TEXTAREA_PAD_BOTTOM

const ROW_PAD_X = 10
const ROW_PAD_TOP = 4
const ROW_PAD_BOTTOM = 10
const ROW_ITEM = 32
const ROW_GAP = 6
const END_GAP = 4
const ROW_Y = TEXTAREA_H
const ROW_CY = ROW_Y + ROW_PAD_TOP + ROW_ITEM / 2
const CONTAINER_H = ROW_Y + ROW_PAD_TOP + ROW_ITEM + ROW_PAD_BOTTOM

const CONTAINER = { x: 0, y: 0, w: CONTAINER_W, h: CONTAINER_H, rx: CONTAINER_RX }
const TEXTAREA = {
  x: TEXTAREA_PAD_X,
  y: TEXTAREA_PAD_TOP,
  w: CONTAINER_W - TEXTAREA_PAD_X * 2,
  h: TEXTAREA_LINE,
}
const PLUS = { cx: ROW_PAD_X + ROW_ITEM / 2, cy: ROW_CY, r: ROW_ITEM / 2 }
const AGENT = { x: PLUS.cx + PLUS.r + ROW_GAP, y: ROW_CY - 16, w: 88, h: 32 }
const SEND = { cx: CONTAINER_W - ROW_PAD_X - ROW_ITEM / 2, cy: ROW_CY, r: ROW_ITEM / 2 }
const MIC = { cx: SEND.cx - ROW_ITEM - END_GAP, cy: ROW_CY, r: ROW_ITEM / 2 }
const SETTINGS_W = 100
const SETTINGS = {
  x: MIC.cx - MIC.r - ROW_GAP - SETTINGS_W,
  y: ROW_CY - 14,
  w: SETTINGS_W,
  h: 28,
}

const LEFT_LANE = -24
const TOP_TAG_END = -24
const BOTTOM_TAG_END = CONTAINER_H + 24

function ContainerShape() {
  const { hovered, setHovered } = useAnatomy()
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
        fillOpacity={hovered === 'container' ? 0.1 : 0.04}
        stroke="currentColor"
        strokeWidth={hovered === 'container' ? 1.5 : 1}
        className={`squircle-corners ${spotlight.className}`}
        style={spotlight.style}
      />
    </g>
  )
}

function TextareaShape() {
  const { hovered, setHovered } = useAnatomy()
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
        fill="currentColor"
        fillOpacity={hovered === 'textarea' ? 0.08 : 0}
      />
      <text
        x={TEXTAREA.x}
        y={TEXTAREA.y + 15}
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
  const { hovered, setHovered } = useAnatomy()
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
        fillOpacity={hovered === 'plus-menu' ? 0.14 : 0.06}
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
        className={spotlight.className}
      />
    </g>
  )
}

function AgentMenuShape() {
  const { hovered, setHovered } = useAnatomy()
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
        fillOpacity={hovered === 'agent-menu' ? 0.14 : 0.06}
        stroke="currentColor"
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={AGENT.x + 12}
        y={AGENT.y + AGENT.h / 2 + 5}
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        Claude
      </text>
      <path
        d={`M${AGENT.x + AGENT.w - 24} ${AGENT.y + 14.5}l3 3l3 -3`}
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={spotlight.className}
      />
    </g>
  )
}

function SettingsDropdownShape() {
  const { hovered, setHovered } = useAnatomy()
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
        fill="currentColor"
        fillOpacity={hovered === 'settings-dropdown' ? 0.1 : 0}
        stroke="currentColor"
        strokeDasharray="3 2"
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={SETTINGS.x + 8}
        y={SETTINGS.y + SETTINGS.h / 2 + 5}
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        Fast High
      </text>
      <path
        d={`M${SETTINGS.x + SETTINGS.w - 19} ${SETTINGS.y + 12.5}l3 3l3 -3`}
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={spotlight.className}
      />
    </g>
  )
}

function MicShape() {
  const { hovered, setHovered } = useAnatomy()
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
        fill="currentColor"
        fillOpacity={hovered === 'mic' ? 0.1 : 0}
        stroke="currentColor"
        strokeDasharray="2 2"
        className={spotlight.className}
        style={spotlight.style}
      />
      <rect
        x={MIC.cx - 2.5}
        y={MIC.cy - 6}
        width={5}
        height={8}
        rx={2.5}
        fill="currentColor"
        className={spotlight.className}
      />
      <path
        d={`M${MIC.cx - 5} ${MIC.cy} a5 5 0 0 0 10 0`}
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        className={spotlight.className}
      />
    </g>
  )
}

function SendShape() {
  const { hovered, setHovered } = useAnatomy()
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
        fillOpacity={hovered === 'send' ? 1 : 0.85}
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
        className={spotlight.className}
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
        w={TEXTAREA.w}
        h={TEXTAREA.h}
        offset={0.8}
        boxX={CONTAINER.x}
        boxY={CONTAINER.y}
        boxW={CONTAINER.w}
        boxH={TEXTAREA_H}
        boxRx={CONTAINER.rx}
        clipOffset={0.8}
      />
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={PLUS.cx + PLUS.r} y1={PLUS.cy} x2={AGENT.x} y2={PLUS.cy} />
      </g>
      <MeasureNote x={PLUS.cx + PLUS.r + ROW_GAP / 2} y={ROW_Y + 2} anchor="middle">
        {`${ROW_GAP}`}
      </MeasureNote>
      <MeasureV
        x={CONTAINER.w + 14}
        y1={0}
        y2={CONTAINER_H}
        label={`${CONTAINER_H}`}
        labelXOffset={6}
        labelAnchor="start"
      />
    </g>
  )
}

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="container"
        label="Container"
        anchor={[CONTAINER_W / 2 + 20, 0]}
        side="top"
        distance={-TOP_TAG_END}
        isAccent
        measure={`w full · h ${CONTAINER_H} · r${CONTAINER_RX} · border 1`}
        caption="Composer shell. Its border turns accent while the field has focus."
      />
      <AnatomyCallout
        part="mic"
        label="Mic"
        anchor={[MIC.cx, MIC.cy - MIC.r]}
        side="top"
        distance={MIC.cy - MIC.r - TOP_TAG_END}
        measure={`${ROW_ITEM} × ${ROW_ITEM} · r${MIC.r} · icon 16`}
        caption="Voice input button, rendered when onMicClick is set."
      />
      <AnatomyCallout
        part="textarea"
        label="Textarea"
        anchor={[TEXTAREA.x, TEXTAREA.y + TEXTAREA.h / 2]}
        side="start"
        distance={TEXTAREA.x - LEFT_LANE}
        measure={`px ${TEXTAREA_PAD_X} · pt ${TEXTAREA_PAD_TOP} · pb ${TEXTAREA_PAD_BOTTOM} · text 14 · max h 160`}
        caption="Auto-grows with content. Enter sends, Shift+Enter adds a line."
      />
      <AnatomyCallout
        part="plus-menu"
        label="Plus menu"
        anchor={[PLUS.cx - PLUS.r, PLUS.cy]}
        side="start"
        distance={PLUS.cx - PLUS.r - LEFT_LANE}
        measure={`${ROW_ITEM} × ${ROW_ITEM} · r${PLUS.r} · icon 16`}
        caption="startSlot menu for attachments, toggles and submenus."
      />
      <AnatomyCallout
        part="agent-menu"
        label="Agent menu"
        anchor={[AGENT.x + AGENT.w / 2, AGENT.y + AGENT.h]}
        side="bottom"
        distance={BOTTOM_TAG_END - AGENT.y - AGENT.h}
        measure={`${AGENT.w} × ${AGENT.h} · px 12 · gap 6 · pill`}
        caption="Picks the agent the message is sent to."
      />
      <AnatomyCallout
        part="settings-dropdown"
        label="Settings"
        anchor={[SETTINGS.x + SETTINGS.w / 2, SETTINGS.y + SETTINGS.h]}
        side="bottom"
        distance={BOTTOM_TAG_END - SETTINGS.y - SETTINGS.h}
        isAccent
        measure={`${SETTINGS.w} × ${SETTINGS.h} · px 8 · gap 6 · pill`}
        caption="Groups options such as model and effort in one dropdown."
      />
      <AnatomyCallout
        part="send"
        label="Send"
        anchor={[SEND.cx, SEND.cy + SEND.r]}
        side="bottom"
        distance={BOTTOM_TAG_END - SEND.cy - SEND.r}
        isAccent
        measure={`${ROW_ITEM} × ${ROW_ITEM} · r${SEND.r} · fg fill`}
        caption="Launches upward on submit and crossfades to Stop while streaming."
      />
    </>
  )
}

export function AiInputAnatomy() {
  return (
    <AnatomyFrame
      viewBox="-110 -60 516 192"
      ariaLabel="AI input anatomy: container, textarea, plus menu, agent menu, settings, mic and send"
    >
      <ContainerShape />
      <TextareaShape />
      <PlusMenuShape />
      <AgentMenuShape />
      <SettingsDropdownShape />
      <MicShape />
      <SendShape />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}

const BP_S = 0.75
const BP_C = {
  w: 172,
  rx: 4 * BP_S,
  font: 14 * BP_S,
  taPadX: 14 * BP_S,
  taPadTop: 12 * BP_S,
  taLine: 20 * BP_S,
  taPadBottom: 4 * BP_S,
  rowPadX: 10 * BP_S,
  rowPadTop: 4 * BP_S,
  rowPadBottom: 10 * BP_S,
  rowItem: 32 * BP_S,
  rowGap: 6 * BP_S,
  endGap: 4 * BP_S,
  icon: 16 * BP_S,
  chevron: 14 * BP_S,
  pillPadX: 12 * BP_S,
  pillGap: 6 * BP_S,
} as const

const BP_AGENT_LABEL = 'Claude'
const BP_TA_H = BP_C.taPadTop + BP_C.taLine + BP_C.taPadBottom
const BP_H = BP_TA_H + BP_C.rowPadTop + BP_C.rowItem + BP_C.rowPadBottom
const BP_X = 24
const BP_Y = (140 - BP_H) / 2
const BP_ROW_Y = BP_Y + BP_TA_H + BP_C.rowPadTop
const BP_ROW_CY = BP_ROW_Y + BP_C.rowItem / 2
const BP_R = BP_C.rowItem / 2

const BP_PLUS_CX = BP_X + BP_C.rowPadX + BP_R
const BP_AGENT_X = BP_PLUS_CX + BP_R + BP_C.rowGap
const BP_AGENT_TEXT_W = BP_AGENT_LABEL.length * BP_C.font * 0.55
const BP_AGENT_W = BP_C.pillPadX * 2 + BP_AGENT_TEXT_W + BP_C.pillGap + BP_C.chevron
const BP_SEND_CX = BP_X + BP_C.w - BP_C.rowPadX - BP_R
const BP_MIC_CX = BP_SEND_CX - BP_C.rowItem - BP_C.endGap

const BP_CONTAINER = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-card) group-focus-visible:fill-(--color-card) group-hover:stroke-(--color-accent) group-focus-visible:stroke-(--color-accent)`
const BP_GHOST_ICON_BTN = `${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-35 group-hover:opacity-0 group-focus-visible:opacity-0`
const BP_GLYPH = `${DRAFT_INK_MORPH} fill-none stroke-current opacity-35 group-hover:opacity-60 group-focus-visible:opacity-60`
const BP_PLACEHOLDER = `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:opacity-50 group-focus-visible:opacity-50`

export function AiInputBlueprint() {
  const theme = draftTheme
  const u = BP_C.icon / 16
  const chevronX = BP_AGENT_X + BP_C.pillPadX + BP_AGENT_TEXT_W + BP_C.pillGap
  const chevronCx = chevronX + BP_C.chevron / 2

  return (
    <DraftSurface>
      <path
        d={squircleRectPath(BP_X, BP_Y, BP_C.w, BP_H, BP_C.rx)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${BP_CONTAINER}`}
      />

      <text
        x={BP_X + BP_C.taPadX}
        y={BP_Y + BP_C.taPadTop + BP_C.taLine / 2 + BP_C.font * 0.35}
        fontSize={BP_C.font}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${BP_PLACEHOLDER}`}
      >
        Ask anything...
      </text>

      <circle
        cx={BP_PLUS_CX}
        cy={BP_ROW_CY}
        r={BP_R}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${BP_GHOST_ICON_BTN}`}
      />
      <path
        d={`M${BP_PLUS_CX} ${BP_ROW_CY - 5 * u} V${BP_ROW_CY + 5 * u} M${BP_PLUS_CX - 5 * u} ${BP_ROW_CY} H${BP_PLUS_CX + 5 * u}`}
        strokeWidth={1.25}
        strokeLinecap="round"
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${BP_GLYPH}`}
      />

      <path
        d={squircleRectPath(BP_AGENT_X, BP_ROW_Y, BP_AGENT_W, BP_C.rowItem, BP_R)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_MUTED}`}
      />
      <text
        x={BP_AGENT_X + BP_C.pillPadX}
        y={BP_ROW_CY + BP_C.font * 0.35}
        fontSize={BP_C.font}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        {BP_AGENT_LABEL}
      </text>
      <path
        d={`M${chevronCx - 3 * u} ${BP_ROW_CY - 1.5 * u} L${chevronCx} ${BP_ROW_CY + 1.5 * u} L${chevronCx + 3 * u} ${BP_ROW_CY - 1.5 * u}`}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${BP_GLYPH}`}
      />

      <circle
        cx={BP_MIC_CX}
        cy={BP_ROW_CY}
        r={BP_R}
        strokeWidth={theme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${BP_GHOST_ICON_BTN}`}
      />
      <g style={beat(DRAFT_BEAT.hatch)} className="fade-note">
        <rect
          x={BP_MIC_CX - 2 * u}
          y={BP_ROW_CY - 6 * u}
          width={4 * u}
          height={8 * u}
          rx={2 * u}
          strokeWidth={1}
          className={BP_GLYPH}
        />
        <path
          d={`M${BP_MIC_CX - 4.5 * u} ${BP_ROW_CY} a${4.5 * u} ${4.5 * u} 0 0 0 ${9 * u} 0 M${BP_MIC_CX} ${BP_ROW_CY + 4.5 * u} V${BP_ROW_CY + 6.5 * u}`}
          strokeWidth={1}
          strokeLinecap="round"
          className={BP_GLYPH}
        />
      </g>

      <circle
        cx={BP_SEND_CX}
        cy={BP_ROW_CY}
        r={BP_R}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${DRAFT_FILL_SOLID}`}
      />
      <path
        d={`M${BP_SEND_CX} ${BP_ROW_CY + 5 * u} V${BP_ROW_CY - 5 * u} M${BP_SEND_CX - 4.5 * u} ${BP_ROW_CY - 0.5 * u} L${BP_SEND_CX} ${BP_ROW_CY - 5 * u} L${BP_SEND_CX + 4.5 * u} ${BP_ROW_CY - 0.5 * u}`}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-none stroke-current opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:stroke-(--color-bg) group-focus-visible:stroke-(--color-bg)`}
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={BP_X + BP_C.taPadX}
          y={BP_Y + BP_C.taPadTop}
          w={BP_C.w - BP_C.taPadX * 2}
          h={BP_C.taLine}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BP_C.w}
          boxH={BP_TA_H}
          boxRx={BP_C.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <InsetGuide
          x={BP_X + BP_C.rowPadX}
          y={BP_ROW_Y}
          w={BP_C.w - BP_C.rowPadX * 2}
          h={BP_C.rowItem}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y + BP_TA_H}
          boxW={BP_C.w}
          boxH={BP_H - BP_TA_H}
          boxRx={BP_C.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_C.w}
          y={BP_Y - 24}
          label={`${Math.round(BP_C.w / BP_S)}`}
          labelYOffset={-2}
          className="note-stamp"
          style={beat(stampBeat(5))}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_C.taPadX}
          y={BP_Y - 8}
          label="14"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X + BP_C.w + 8}
          y1={BP_Y}
          y2={BP_Y + BP_H}
          label="82"
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_C.rowPadX}
          y={BP_Y + BP_H + 10}
          label="10"
          labelYOffset={10}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureH
          x1={BP_PLUS_CX + BP_R}
          x2={BP_AGENT_X}
          y={BP_Y + BP_H + 10}
          label="6"
          labelYOffset={10}
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureH
          x1={BP_MIC_CX + BP_R}
          x2={BP_SEND_CX - BP_R}
          y={BP_Y + BP_H + 10}
          label="4"
          labelYOffset={10}
          className="note-stamp"
          style={beat(stampBeat(4))}
        />
      </g>
    </DraftSurface>
  )
}
