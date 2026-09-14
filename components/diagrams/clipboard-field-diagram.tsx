'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset -- licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  DraftSurface,
  DRAFT_FILL_PANEL,
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
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import { AnatomyCallout, AnatomyFrame, useSpotlight } from '@/components/diagrams/lib/anatomy-parts'

const FIELD = {
  w: 172,
  h: 38,
  r: 4,
  padX: 12,
  padY: 10,
  gap: 8,
  icon: 16,
  glyph: 14,
  font: 13,
} as const

const DIM_LANE = 20.4

const BP = {
  x: Math.round((220 - FIELD.w - DIM_LANE) / 2 + DIM_LANE),
  y: 43,
} as const

const MID_Y = BP.y + FIELD.h / 2
const BASELINE = MID_Y + FIELD.font * 0.35
const PROMPT_X = BP.x + FIELD.padX
const COMMAND_X = PROMPT_X + FIELD.font * 0.6 + FIELD.gap
const ICON_X = BP.x + FIELD.w - FIELD.padX - FIELD.icon
const ICON_Y = MID_Y - FIELD.icon / 2
const GLYPH_INSET = (FIELD.icon - FIELD.glyph) / 2
const COMMAND_CLIP_END = ICON_X - FIELD.gap

export function ClipboardFieldBlueprint() {
  const theme = draftTheme

  return (
    <DraftSurface>
      <defs>
        <clipPath id="bp-clipboard-command-clip">
          <rect x={COMMAND_X} y={BP.y} width={COMMAND_CLIP_END - COMMAND_X} height={FIELD.h} />
        </clipPath>
      </defs>
      <rect
        x={BP.x}
        y={BP.y}
        width={FIELD.w}
        height={FIELD.h}
        rx={FIELD.r}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />
      <text
        x={PROMPT_X}
        y={BASELINE}
        fontSize={FIELD.font}
        fontFamily="var(--font-mono)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-(--color-muted) opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        $
      </text>
      <text
        x={COMMAND_X}
        y={BASELINE}
        fontSize={FIELD.font}
        fontFamily="var(--font-mono)"
        clipPath="url(#bp-clipboard-command-clip)"
        style={beat(DRAFT_LABEL_ALT_BEAT)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-(--color-muted) opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        npx shadcn@latest add @nexvyn/badge
      </text>
      <g
        transform={`translate(${ICON_X + GLYPH_INSET} ${ICON_Y + GLYPH_INSET}) scale(${FIELD.glyph / 24})`}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={beat(DRAFT_BEAT.anatomy)}
        className="opacity-55 transition-opacity duration-(--motion-dur-fast) ease-(--motion-ease-out) group-hover:opacity-0 group-focus-visible:opacity-0 group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none"
      >
        <rect
          x={9}
          y={9}
          width={12}
          height={12}
          rx={2}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          className="ink-draw"
        />
        <path
          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          className="ink-draw"
        />
      </g>
      <path
        d="M20 6 9 17l-5-5"
        transform={`translate(${ICON_X + GLYPH_INSET} ${ICON_Y + GLYPH_INSET}) scale(${FIELD.glyph / 24})`}
        stroke="var(--color-fg)"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0 transition-opacity duration-(--motion-dur-fast) ease-(--motion-ease-out) group-hover:opacity-100 group-hover:delay-(--motion-dur-slow) group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-slow) motion-reduce:transition-none"
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP.x} y={BP.y} w={FIELD.w} h={FIELD.h} style={beat(DRAFT_BEAT.handle)} />
        <InsetGuide
          x={BP.x + FIELD.padX}
          y={BP.y + FIELD.padY}
          w={FIELD.w - FIELD.padX * 2}
          h={FIELD.h - FIELD.padY * 2}
          offset={0.8}
          boxX={BP.x}
          boxY={BP.y}
          boxW={FIELD.w}
          boxH={FIELD.h}
          boxRx={FIELD.r}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP.x}
          y={BP.y - 6}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          {`r${FIELD.r}`}
        </MeasureNote>
        <MeasureNote
          x={BP.x + FIELD.w / 2}
          y={BP.y - 6}
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {`${FIELD.padY}`}
        </MeasureNote>
        <MeasureNote
          x={BP.x + FIELD.w - FIELD.padX / 2}
          y={BP.y - 6}
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`${FIELD.padX}`}
        </MeasureNote>
        <MeasureNote
          x={BP.x + FIELD.padX / 2}
          y={BP.y + FIELD.h + 10}
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`${FIELD.padX}`}
        </MeasureNote>
        <MeasureNote
          x={BP.x + FIELD.w / 2}
          y={BP.y + FIELD.h + 10}
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`${FIELD.padY}`}
        </MeasureNote>
        <MeasureV
          x={BP.x - 8}
          y1={BP.y}
          y2={BP.y + FIELD.h}
          label={`${FIELD.h}`}
          labelXOffset={-4}
          className="note-stamp"
          style={beat(stampBeat(5))}
        />
        <MeasureH
          x1={BP.x}
          x2={BP.x + FIELD.w}
          y={BP.y + FIELD.h + 24}
          label="auto"
          className="note-stamp"
          style={beat(stampBeat(6))}
        />
      </g>
    </DraftSurface>
  )
}

const AN = {
  x: 120,
  y: 52,
  w: 280,
  h: 38,
  r: 4,
  padX: 12,
  gap: 8,
  promptW: 8,
  icon: 16,
  font: 13,
} as const

const AN_MID_Y = AN.y + AN.h / 2
const AN_BASELINE = AN_MID_Y + AN.font * 0.35
const AN_TEXT_TOP = AN_BASELINE - AN.font * 0.72
const AN_PROMPT_X = AN.x + AN.padX
const AN_COMMAND_X = AN_PROMPT_X + AN.promptW + AN.gap
const AN_COMMAND_W = 23 * AN.font * 0.6
const AN_ICON_X = AN.x + AN.w - AN.padX - AN.icon
const AN_ICON_Y = AN_MID_Y - AN.icon / 2

function FieldShape() {
  const spotlight = useSpotlight('field')
  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={AN.w}
      height={AN.h}
      rx={AN.r}
      className={`fill-(--color-surface-2) stroke-(--color-border) ${spotlight.className}`}
      style={spotlight.style}
      strokeWidth={1}
    />
  )
}

function PromptShape() {
  const spotlight = useSpotlight('prompt')
  return (
    <text
      x={AN_PROMPT_X}
      y={AN_BASELINE}
      fontSize={AN.font}
      fontFamily="var(--font-mono)"
      className={`fill-(--color-muted) ${spotlight.className}`}
      style={spotlight.style}
    >
      $
    </text>
  )
}

function CommandShape() {
  const spotlight = useSpotlight('command')
  return (
    <text
      x={AN_COMMAND_X}
      y={AN_BASELINE}
      fontSize={AN.font}
      fontFamily="var(--font-mono)"
      className={`fill-(--color-muted) ${spotlight.className}`}
      style={spotlight.style}
    >
      npx shadcn@latest add …
    </text>
  )
}

function IconShape() {
  const spotlight = useSpotlight('icon')
  return (
    <g
      className={spotlight.className}
      style={spotlight.style}
      transform={`translate(${AN_ICON_X + 1} ${AN_ICON_Y + 1}) scale(${14 / 24})`}
      stroke="currentColor"
      strokeWidth={1.75}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={9} y={9} width={12} height={12} rx={2} />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </g>
  )
}

function CalloutsLayer() {
  return (
    <>
      <AnatomyCallout
        part="prompt"
        label="Prompt"
        anchor={[AN_PROMPT_X + AN.promptW / 2, AN_TEXT_TOP]}
        side="top"
        distance={24}
        measure="13px mono · text-muted"
        caption="Leading glyph from the prompt prop, $ by default."
      />
      <AnatomyCallout
        part="command"
        label="Command"
        anchor={[AN_COMMAND_X + AN_COMMAND_W / 2, AN_TEXT_TOP]}
        side="top"
        distance={24}
        measure="13px mono · truncates"
        caption="The value prop, written to the clipboard on click."
      />
      <AnatomyCallout
        part="icon"
        label="Icon"
        anchor={[AN_ICON_X + AN.icon / 2, AN_ICON_Y + AN.icon]}
        side="bottom"
        distance={24}
        measure="16 × 16 · 14px glyph"
        caption="Copy icon that crossfades to a check. hideIcon removes it."
      />
      <AnatomyCallout
        part="field"
        label="ClipboardField"
        anchor={[AN.x + AN.w, AN_MID_Y]}
        side="end"
        distance={24}
        isAccent
        measure="auto × 38 · rounded-md"
        caption="Button root, px-3 py-2.5. Click or Enter copies, resets after 2s."
      />
    </>
  )
}

export function ClipboardFieldAnatomy() {
  return (
    <AnatomyFrame viewBox="95 6 445 133" ariaLabel="Clipboard field anatomy">
      <FieldShape />
      <PromptShape />
      <CommandShape />
      <IconShape />
      <CalloutsLayer />
    </AnatomyFrame>
  )
}
