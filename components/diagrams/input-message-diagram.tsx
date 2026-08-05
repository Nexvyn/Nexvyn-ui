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
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'

const IM = {
  pad: 8,
  rowGap: 4,
  textareaH: 22,
  leftSize: 24,
  sendSize: 32,
  r: 10,
} as const

const IM_W = 180
const IM_BOTTOM_H = IM.sendSize
const IM_H = IM.pad * 2 + IM.textareaH + IM.rowGap + IM_BOTTOM_H

const ARROW_PATH = 'M0 5.3V-5.3M-4.7 -0.7L0 -5.3L4.7 -0.7'

const ICON_MORPH =
  'stroke-current group-hover:stroke-background group-focus-visible:stroke-background transition-[stroke] duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) motion-reduce:transition-none'

const BP_X = (220 - IM_W) / 2
const BP_Y = (140 - IM_H) / 2

export function InputMessageBlueprint() {
  const theme = blueprintTheme
  const leftX = BP_X + IM.pad
  const bottomY = BP_Y + IM.pad + IM.textareaH + IM.rowGap
  const leftY = bottomY + (IM_BOTTOM_H - IM.leftSize) / 2
  const sendX = BP_X + IM_W - IM.pad - IM.sendSize
  const sendCx = sendX + IM.sendSize / 2
  const sendCy = bottomY + IM.sendSize / 2

  return (
    <Blueprint>
      <rect
        x={BP_X}
        y={BP_Y}
        width={IM_W}
        height={IM_H}
        rx={IM.r}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />
      <text
        x={leftX}
        y={BP_Y + IM.pad + IM.textareaH / 2 + 2.5}
        fontSize={7}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Ask me anything…
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <rect
          x={leftX}
          y={leftY}
          width={IM.leftSize}
          height={IM.leftSize}
          rx={6}
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        />
      </g>
      <g transform={`translate(${sendCx}, ${sendCy})`}>
        <circle
          r={IM.sendSize / 2}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          className={BP_FILL_SOLID}
        />
        <path
          d={ARROW_PATH}
          fill="none"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={ICON_MORPH}
        />
      </g>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={IM_W} h={IM_H} />
        <DimH x1={BP_X} x2={BP_X + IM_W} y={BP_Y - 14} label={`${IM_W}`} />
        <DimV x={BP_X - 12} y1={BP_Y} y2={BP_Y + IM_H} label={`${IM_H}`} />
        <PadGuide
          x={BP_X + IM.pad}
          y={BP_Y + IM.pad}
          w={IM_W - IM.pad * 2}
          h={IM_H - IM.pad * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={IM_W}
          boxH={IM_H}
          boxRx={IM.r}
          clipOffset={0.8}
        />
        <DimLabel x={BP_X + IM.pad} y={BP_Y + IM_H - 2} anchor="start">
          {`${IM.pad}`}
        </DimLabel>
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line x1={leftX + 4} y1={BP_Y + IM.pad + IM.textareaH} x2={leftX + 4} y2={bottomY} />
        </g>
        <DimLabel x={leftX + 8} y={BP_Y + IM.pad + IM.textareaH + IM.rowGap / 2 + 2.5}>
          {`${IM.rowGap}`}
        </DimLabel>
        <DimLabel x={sendCx} y={BP_Y + IM_H + 12} anchor="middle">
          {`r${IM.sendSize / 2}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const CX = 40
const CY = 50

const CONTAINER = { x: CX, y: CY, w: IM_W, h: IM_H, rx: IM.r }
const TEXTAREA = {
  x: CX + IM.pad,
  y: CY + IM.pad,
  w: IM_W - IM.pad * 2,
  h: IM.textareaH,
}
const BOTTOM_Y = CY + IM.pad + IM.textareaH + IM.rowGap
const LEFT_SLOT = {
  x: CX + IM.pad,
  y: BOTTOM_Y + (IM_BOTTOM_H - IM.leftSize) / 2,
  w: IM.leftSize,
  h: IM.leftSize,
}
const SEND = {
  x: CX + IM_W - IM.pad - IM.sendSize,
  y: BOTTOM_Y,
  w: IM.sendSize,
  h: IM.sendSize,
}

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
        fillOpacity={0.06}
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
        y={TEXTAREA.y + TEXTAREA.h / 2 + 3}
        fontSize={9}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        Ask me anything…
      </text>
    </g>
  )
}

function LeftSlotShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('left-slot', { isInteraction: true })
  return (
    <g
      onMouseEnter={() => setHovered('left-slot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={LEFT_SLOT.x}
        y={LEFT_SLOT.y}
        width={LEFT_SLOT.w}
        height={LEFT_SLOT.h}
        rx={6}
        fill="none"
        stroke="currentColor"
        strokeDasharray="2 2"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function SendShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('send')
  const cx = SEND.x + SEND.w / 2
  const cy = SEND.y + SEND.h / 2
  return (
    <g
      onMouseEnter={() => setHovered('send')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={SEND.w / 2}
        fill="currentColor"
        fillOpacity={0.9}
        className={spotlight.className}
        style={spotlight.style}
      />
      <path
        d={`M${cx} ${cy + 6}V${cy - 6}M${cx - 5.3} ${cy - 0.7}L${cx} ${cy - 6}L${cx + 5.3} ${cy - 0.7}`}
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth={1.6}
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
      <Selection x={CONTAINER.x} y={CONTAINER.y} w={CONTAINER.w} h={CONTAINER.h} />
      <PadGuide
        x={TEXTAREA.x}
        y={TEXTAREA.y}
        w={CONTAINER.w - IM.pad * 2}
        h={CONTAINER.h - IM.pad * 2}
        offset={0.8}
        boxX={CONTAINER.x}
        boxY={CONTAINER.y}
        boxW={CONTAINER.w}
        boxH={CONTAINER.h}
        boxRx={CONTAINER.rx}
        clipOffset={0.8}
      />
      <DimLabel x={CONTAINER.x + IM.pad} y={CONTAINER.y + CONTAINER.h - 2} anchor="start">
        {`${IM.pad}`}
      </DimLabel>
      <DimLabel
        x={CONTAINER.x + CONTAINER.w - 30}
        y={CONTAINER.y + CONTAINER.h + 14}
        anchor="start"
      >
        {`r${CONTAINER.rx}`}
      </DimLabel>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line x1={TEXTAREA.x + 4} y1={TEXTAREA.y + TEXTAREA.h} x2={TEXTAREA.x + 4} y2={BOTTOM_Y} />
      </g>
      <DimLabel x={TEXTAREA.x + 10} y={TEXTAREA.y + TEXTAREA.h + IM.rowGap / 2 + 2.5}>
        {`${IM.rowGap}`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  const containerMidX = CONTAINER.x + CONTAINER.w / 2
  const textareaMidY = TEXTAREA.y + TEXTAREA.h / 2
  const leftSlotMidX = LEFT_SLOT.x + LEFT_SLOT.w / 2
  const leftSlotBottom = LEFT_SLOT.y + LEFT_SLOT.h
  const sendMidX = SEND.x + SEND.w / 2
  const sendBottom = SEND.y + SEND.h
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="container"
        x1={containerMidX}
        y1={CONTAINER.y}
        x2={containerMidX}
        y2={CONTAINER.y - 30}
      />
      <OverlayLine
        id="textarea"
        x1={TEXTAREA.x}
        y1={textareaMidY}
        x2={TEXTAREA.x - 38}
        y2={textareaMidY}
      />
      <OverlayLine
        id="left-slot"
        x1={leftSlotMidX}
        y1={leftSlotBottom}
        x2={leftSlotMidX}
        y2={leftSlotBottom + 30}
      />
      <OverlayLine id="send" x1={sendMidX} y1={sendBottom} x2={sendMidX} y2={sendBottom + 30} />
    </g>
  )
}

function Tags() {
  const containerMidX = CONTAINER.x + CONTAINER.w / 2
  const textareaMidY = TEXTAREA.y + TEXTAREA.h / 2
  const leftSlotMidX = LEFT_SLOT.x + LEFT_SLOT.w / 2
  const leftSlotBottom = LEFT_SLOT.y + LEFT_SLOT.h
  const sendMidX = SEND.x + SEND.w / 2
  const sendBottom = SEND.y + SEND.h
  return (
    <>
      <foreignObject
        x={containerMidX - 50}
        y={CONTAINER.y - 30 - 24}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Container"
          className="items-end justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={TEXTAREA.x - 38 - 90}
        y={textareaMidY - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="textarea" label="Textarea" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={leftSlotMidX - 70}
        y={leftSlotBottom + 30}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="left-slot"
          label="Left slot (attach)"
          className="items-start justify-center"
        />
      </foreignObject>
      <foreignObject
        x={sendMidX - 60}
        y={sendBottom + 30}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="send"
          label="Send button"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
    </>
  )
}

export function InputMessageAnatomy() {
  return (
    <AnatomyFrame viewBox="-96 -30 368 216" maxWidthClassName="max-w-[480px]">
      <ContainerShape />
      <TextareaShape />
      <LeftSlotShape />
      <SendShape />
      <AnnotationsLayer />
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}
