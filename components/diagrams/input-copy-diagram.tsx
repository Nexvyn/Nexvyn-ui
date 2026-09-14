'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useId } from 'react'
import {
  DraftSurface,
  DRAFT_FILL_PANEL,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const COPY_PATH = 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'
const CHECK_PATH = 'M6 12L10 16L18 8'
const ICON_SCALE = 14 / 24

const BP_FIELD = { x: 28, y: 48, w: 164, h: 46, rx: 4 } as const
const BP_BORDER = 1
const BP_PAD_X = 2
const BP_INNER_X = BP_FIELD.x + BP_BORDER + BP_PAD_X
const BP_BTN = { w: 64, h: 44, padX: 8, rx: 4 } as const
const BP_BTN_X = BP_FIELD.x + BP_FIELD.w - BP_BORDER - BP_PAD_X - BP_BTN.w
const BP_BTN_Y = BP_FIELD.y + BP_BORDER
const BP_INPUT = { h: 36, padStart: 8, padEnd: 4, padY: 8 } as const
const BP_INPUT_W = BP_BTN_X - BP_INNER_X
const BP_MID_Y = BP_FIELD.y + BP_FIELD.h / 2
const BP_INPUT_Y = BP_MID_Y - BP_INPUT.h / 2
const BP_TEXT_SIZE = 13
const BP_TEXT_Y = BP_MID_Y + BP_TEXT_SIZE * 0.35
const BP_LABEL_GAP = 2
const BP_ICON = 14
const BP_ICON_GAP = 6
const BP_ICON_X = BP_BTN_X + BP_BTN.padX
const BP_ICON_Y = BP_MID_Y - BP_ICON / 2

function BpCopyGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${ICON_SCALE})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5 / ICON_SCALE}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={beat(DRAFT_BEAT.anatomy)}
      className="fade-note transition-opacity duration-(--motion-dur-fast) ease-(--motion-ease-out) opacity-70 group-hover:opacity-0 group-hover:delay-(--motion-dur-base) group-focus-visible:opacity-0 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none"
    >
      <rect x={9} y={9} width={12} height={12} rx={2} />
      <path d={COPY_PATH} />
    </g>
  )
}

function BpCheckGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${ICON_SCALE})`}
      fill="none"
      stroke="var(--bp-accent, var(--color-accent))"
      strokeWidth={2 / ICON_SCALE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-opacity duration-(--motion-dur-fast) ease-(--motion-ease-out) opacity-0 group-hover:opacity-100 group-hover:delay-(--motion-dur-base) group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none"
    >
      <path d={CHECK_PATH} />
    </g>
  )
}

export function InputCopyWireframe() {
  const theme = draftTheme
  const clipId = useId()

  return (
    <DraftSurface>
      <defs>
        <clipPath id={clipId}>
          <rect
            x={BP_INNER_X}
            y={BP_INPUT_Y}
            width={BP_INPUT_W - BP_INPUT.padEnd}
            height={BP_INPUT.h}
          />
        </clipPath>
      </defs>

      <text
        x={BP_FIELD.x}
        y={BP_FIELD.y - BP_LABEL_GAP - 5}
        fontSize={BP_TEXT_SIZE}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        API Key
      </text>

      <rect
        x={BP_FIELD.x}
        y={BP_FIELD.y}
        width={BP_FIELD.w}
        height={BP_FIELD.h}
        rx={BP_FIELD.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />

      <rect
        x={BP_BTN_X}
        y={BP_BTN_Y}
        width={BP_BTN.w}
        height={BP_BTN.h}
        rx={BP_BTN.rx}
        strokeWidth={theme.guide.strokeWidth}
        strokeDasharray="2 2"
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-40 group-hover:stroke-transparent group-focus-visible:stroke-transparent`}
      />

      <g clipPath={`url(#${clipId})`}>
        <text
          x={BP_INNER_X + BP_INPUT.padStart}
          y={BP_TEXT_Y}
          fontSize={BP_TEXT_SIZE}
          fontFamily="var(--font-mono)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${DRAFT_TEXT_SOFT}`}
        >
          sk-proj-a1b2c3d4e5f6
        </text>
      </g>

      <g
        style={{
          transformOrigin: `${BP_ICON_X + BP_ICON / 2}px ${BP_MID_Y}px`,
        }}
        className="transition-transform duration-(--motion-dur-base) ease-(--motion-ease-out) group-active:scale-[0.9] motion-reduce:transition-none motion-reduce:transform-none"
      >
        <BpCopyGlyph x={BP_ICON_X} y={BP_ICON_Y} />
        <BpCheckGlyph x={BP_ICON_X} y={BP_ICON_Y} />
      </g>

      <text
        x={BP_ICON_X + BP_ICON + BP_ICON_GAP}
        y={BP_TEXT_Y}
        fontSize={BP_TEXT_SIZE}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Copy
      </text>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_FIELD.x}
          y={BP_FIELD.y}
          w={BP_FIELD.w}
          h={BP_FIELD.h}
          style={beat(DRAFT_BEAT.handle)}
        />
        <InsetGuide
          x={BP_INNER_X + BP_INPUT.padStart}
          y={BP_INPUT_Y + BP_INPUT.padY}
          w={BP_INPUT_W - BP_INPUT.padStart - BP_INPUT.padEnd}
          h={BP_INPUT.h - BP_INPUT.padY * 2}
          offset={0.8}
          boxX={BP_INNER_X}
          boxY={BP_FIELD.y}
          boxW={BP_INPUT_W}
          boxH={BP_FIELD.h}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP_INNER_X + BP_INPUT.padStart / 2}
          y={BP_INPUT_Y + BP_INPUT.h - 1}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          {`${BP_INPUT.padStart}`}
        </MeasureNote>
        <MeasureNote
          x={BP_BTN_X - BP_INPUT.padEnd - 1}
          y={BP_INPUT_Y + BP_INPUT.h - 1}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {`${BP_INPUT.padEnd}`}
        </MeasureNote>
        <MeasureH
          x1={BP_FIELD.x}
          x2={BP_FIELD.x + BP_FIELD.w}
          y={BP_FIELD.y + BP_FIELD.h + 12}
          label="w-full"
          labelYOffset={9}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureV
          x={BP_FIELD.x - 12}
          y1={BP_FIELD.y}
          y2={BP_FIELD.y + BP_FIELD.h}
          label={`${BP_FIELD.h}`}
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureNote
          x={BP_FIELD.x + BP_FIELD.w}
          y={BP_FIELD.y - 6}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`r${BP_FIELD.rx}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const IC = {
  fieldW: 300,
  fieldH: 46,
  border: 1,
  padX: 2,
  rx: 4,
  labelSize: 13,
  labelGap: 2,
  inputH: 36,
  inputPadStart: 8,
  valueSize: 13,
  buttonW: 64,
  buttonH: 44,
  buttonPadX: 8,
  icon: 14,
  iconGap: 6,
} as const

const INNER_X = IC.border + IC.padX
const BUTTON_X = IC.fieldW - INNER_X - IC.buttonW
const BUTTON_Y = IC.border
const INPUT_Y = (IC.fieldH - IC.inputH) / 2
const INPUT_W = BUTTON_X - INNER_X
const MID_Y = IC.fieldH / 2
const LABEL_BASELINE = -IC.labelGap - 5
const LABEL_TOP = LABEL_BASELINE - IC.labelSize * 0.72
const LABEL_W = 48
const ICON_X = BUTTON_X + IC.buttonPadX
const ICON_Y = MID_Y - IC.icon / 2

function useHoverPart(id: string) {
  const { hovered, setHovered } = useAnatomy()
  return {
    isHovered: hovered === id,
    handlers: {
      onMouseEnter: () => setHovered(id),
      onMouseLeave: () => setHovered(null),
      style: { pointerEvents: 'all' as const },
      className: 'cursor-pointer',
    },
  }
}

function LabelShape() {
  const spotlight = useSpotlight('label')
  const { isHovered, handlers } = useHoverPart('label')
  return (
    <g {...handlers}>
      <rect
        x={-2}
        y={LABEL_TOP - 3}
        width={LABEL_W + 4}
        height={IC.labelSize + 4}
        rx={2}
        fill="currentColor"
        fillOpacity={isHovered ? 0.1 : 0}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={0}
        y={LABEL_BASELINE}
        fontSize={IC.labelSize}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        API Key
      </text>
    </g>
  )
}

function FieldShape() {
  const spotlight = useSpotlight('field')
  const { isHovered, handlers } = useHoverPart('field')
  return (
    <g {...handlers}>
      <rect
        x={0.5}
        y={0.5}
        width={IC.fieldW - 1}
        height={IC.fieldH - 1}
        rx={IC.rx}
        stroke="currentColor"
        strokeWidth={isHovered ? 1.75 : 1}
        fill="currentColor"
        fillOpacity={0.03}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ValueShape() {
  const spotlight = useSpotlight('value')
  const { isHovered, handlers } = useHoverPart('value')
  return (
    <g {...handlers}>
      <rect
        x={INNER_X}
        y={INPUT_Y}
        width={INPUT_W}
        height={IC.inputH}
        rx={2}
        stroke="currentColor"
        strokeWidth={0.75}
        strokeDasharray="2 2"
        fill="currentColor"
        fillOpacity={isHovered ? 0.1 : 0}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={INNER_X + IC.inputPadStart}
        y={MID_Y + 4.5}
        fontSize={IC.valueSize}
        fontFamily="var(--font-mono)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        sk-proj-a1b2c3d4e5f6
      </text>
    </g>
  )
}

function ButtonShape() {
  const spotlight = useSpotlight('button')
  const { isHovered, handlers } = useHoverPart('button')
  return (
    <g {...handlers}>
      <rect
        x={BUTTON_X}
        y={BUTTON_Y}
        width={IC.buttonW}
        height={IC.buttonH}
        rx={IC.rx}
        fill="currentColor"
        fillOpacity={isHovered ? 0.14 : 0.06}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={ICON_X + IC.icon + IC.iconGap}
        y={MID_Y + 4.5}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        Copy
      </text>
    </g>
  )
}

function IconShape() {
  const spotlight = useSpotlight('icon')
  const { isHovered, handlers } = useHoverPart('icon')
  return (
    <g {...handlers}>
      <rect
        x={ICON_X - 2}
        y={ICON_Y - 2}
        width={IC.icon + 4}
        height={IC.icon + 4}
        rx={2}
        fill="currentColor"
        fillOpacity={isHovered ? 0.12 : 0}
        className={spotlight.className}
        style={spotlight.style}
      />
      <g
        transform={`translate(${ICON_X}, ${ICON_Y}) scale(${ICON_SCALE})`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5 / ICON_SCALE}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={spotlight.className}
        style={spotlight.style}
      >
        <rect x={9} y={9} width={12} height={12} rx={2} />
        <path d={COPY_PATH} />
      </g>
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
      <MeasureV x={-12} y1={0} y2={IC.fieldH} label={`${IC.fieldH}`} labelXOffset={-6} />
    </g>
  )
}

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="label"
        label="Label"
        anchor={[LABEL_W / 2, LABEL_TOP]}
        side="top"
        distance={20}
        measure={`${IC.labelSize}px, gap ${IC.labelGap}px`}
        caption="Optional label above the field, linked with htmlFor"
      />
      <AnatomyCallout
        part="icon"
        label="Icon"
        anchor={[ICON_X + IC.icon / 2, ICON_Y]}
        side="top"
        distance={ICON_Y - LABEL_TOP + 20}
        isAccent
        measure={`${IC.icon}px, swaps to check`}
        caption="Copy icon morphs into an accent checkmark on success"
      />
      <AnatomyCallout
        part="field"
        label="Field"
        anchor={[IC.fieldW, MID_Y]}
        side="end"
        distance={24}
        measure={`${IC.fieldH}px tall, 1px border, px-0.5 (2px)`}
        caption="Bordered row; the border turns accent while the input has focus"
      />
      <AnatomyCallout
        part="value"
        label="Input"
        anchor={[INNER_X + 86, INPUT_Y + IC.inputH]}
        side="bottom"
        distance={IC.fieldH - INPUT_Y - IC.inputH + 24}
        measure={`font-mono ${IC.valueSize}px, py-2 ps-2`}
        caption="Read-only input; focusing it selects the whole value"
      />
      <AnatomyCallout
        part="button"
        label="Copy button"
        anchor={[BUTTON_X + IC.buttonW / 2, BUTTON_Y + IC.buttonH]}
        side="bottom"
        distance={IC.fieldH - BUTTON_Y - IC.buttonH + 24}
        measure={`${IC.buttonW} × ${IC.buttonH}px, min 44 × 44`}
        caption="Copies the value with click audio and announces Copied"
      />
    </>
  )
}

export function InputCopyAnatomy() {
  return (
    <AnatomyFrame viewBox="-40 -72 426 176" ariaLabel="Input copy anatomy">
      <LabelShape />
      <FieldShape />
      <ValueShape />
      <ButtonShape />
      <IconShape />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}
