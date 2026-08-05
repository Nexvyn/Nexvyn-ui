'use client'

import {
  Blueprint,
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const FIELD = {
  w: 188,
  h: 40,
  r: 10,
  padX: 12,
  padY: 10,
  gap: 8,
  icon: 14,
  font: 13,
} as const

const BP = {
  x: (220 - FIELD.w) / 2,
  y: (140 - FIELD.h) / 2,
} as const

export function ClipboardFieldBlueprint() {
  const theme = blueprintTheme
  const midY = BP.y + FIELD.h / 2
  const promptX = BP.x + FIELD.padX
  const commandX = promptX + 9 + FIELD.gap
  const iconX = BP.x + FIELD.w - FIELD.padX - FIELD.icon
  const iconY = midY - FIELD.icon / 2
  const commandClipRight = iconX - 8

  return (
    <Blueprint>
      <defs>
        <clipPath id="bp-clipboard-command-clip">
          <rect x={commandX} y={BP.y} width={commandClipRight - commandX} height={FIELD.h} />
        </clipPath>
      </defs>
      <rect
        x={BP.x}
        y={BP.y}
        width={FIELD.w}
        height={FIELD.h}
        rx={FIELD.r}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />
      <text
        x={promptX}
        y={midY + 4}
        fontSize={FIELD.font}
        fontFamily="var(--font-mono)"
        className={`${BP_MORPH} fill-(--color-muted) opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        $
      </text>
      <text
        x={commandX}
        y={midY + 4}
        fontSize={FIELD.font}
        fontFamily="var(--font-mono)"
        clipPath="url(#bp-clipboard-command-clip)"
        className={`${BP_MORPH} fill-(--color-muted) opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        npx shadcn@latest add …
      </text>
      <g
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={`${BP_MORPH} opacity-55 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:stroke-(--color-fg) group-focus-visible:stroke-(--color-fg)`}
      >
        <rect x={iconX + 3.5} y={iconY + 3.5} width={8} height={8} rx={1.4} />
        <path
          d={`M${iconX + 1.5} ${iconY + 9.5} V${iconY + 2.5} a1.5 1.5 0 0 1 1.5-1.5 H${iconX + 9.5}`}
        />
      </g>

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP.x} y={BP.y} w={FIELD.w} h={FIELD.h} />
        <PadGuide
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
        />
        <DimLabel x={BP.x + FIELD.padX / 2} y={midY + 2} anchor="middle">
          12
        </DimLabel>
        <DimLabel x={BP.x + FIELD.w - FIELD.padX / 2} y={BP.y - 6} anchor="middle">
          12
        </DimLabel>
        <DimLabel x={BP.x + FIELD.w / 2} y={BP.y + 7} anchor="middle">
          10
        </DimLabel>
        <DimLabel x={BP.x + FIELD.w / 2} y={BP.y + FIELD.h - 3} anchor="middle">
          10
        </DimLabel>
        <DimH x1={BP.x} x2={BP.x + FIELD.w} y={BP.y + FIELD.h + 16} label={`${FIELD.w}`} />
        <DimV x={BP.x - 14} y1={BP.y} y2={BP.y + FIELD.h} label={`${FIELD.h}`} labelXOffset={-6} />
        <DimLabel x={BP.x} y={BP.y - 6} anchor="start">
          {`r${FIELD.r}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN = {
  x: 120,
  y: 52,
  w: 280,
  h: 40,
  r: 12,
  padX: 12,
  promptW: 12,
  icon: 14,
} as const

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
      x={AN.x + AN.padX}
      y={AN.y + 25}
      fontSize={13}
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
      x={AN.x + AN.padX + AN.promptW + 8}
      y={AN.y + 25}
      fontSize={13}
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
  const x = AN.x + AN.w - AN.padX - AN.icon
  const y = AN.y + (AN.h - AN.icon) / 2
  return (
    <g
      className={spotlight.className}
      style={spotlight.style}
      stroke="currentColor"
      strokeWidth={1.4}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x={x + 3.5}
        y={y + 3.5}
        width={8}
        height={8}
        rx={1.4}
        className="stroke-muted-foreground"
      />
      <path
        d={`M${x + 1.5} ${y + 9.5} V${y + 2.5} a1.5 1.5 0 0 1 1.5-1.5 H${x + 9.5}`}
        className="stroke-muted-foreground"
      />
    </g>
  )
}

function LinesLayer() {
  return (
    <>
      <OverlayLine
        id="prompt"
        x1={AN.x + AN.padX + 4}
        y1={AN.y + 25 - 13 * 0.72}
        x2={AN.x + AN.padX + 4}
        y2={AN.y - 22}
      />
      <OverlayLine
        id="command"
        x1={AN.x + AN.w / 2}
        y1={AN.y + 25 - 13 * 0.72}
        x2={AN.x + AN.w / 2}
        y2={AN.y - 22}
      />
      <OverlayLine
        id="icon"
        x1={AN.x + AN.w - AN.padX - AN.icon / 2}
        y1={AN.y + (AN.h - AN.icon) / 2 + AN.icon}
        x2={AN.x + AN.w - AN.padX - AN.icon / 2}
        y2={AN.y + AN.h + 22}
      />
      <OverlayLine
        id="field"
        x1={AN.x + AN.w}
        y1={AN.y + AN.h / 2}
        x2={AN.x + AN.w + 28}
        y2={AN.y + AN.h / 2}
      />
    </>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={AN.x + AN.padX - 30}
        y={AN.y - 44}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="prompt" label="Prompt" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={AN.x + AN.w / 2 - 44}
        y={AN.y - 44}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="command" label="Command" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={AN.x + AN.w - AN.padX - AN.icon / 2 - 28}
        y={AN.y + AN.h + 22}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="icon" label="Icon" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={AN.x + AN.w + 24}
        y={AN.y + AN.h / 2 - 12}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="field"
          label="ClipboardField"
          className="items-center justify-start"
          isAccent
        />
      </foreignObject>
    </>
  )
}

export function ClipboardFieldAnatomy() {
  return (
    <AnatomyFrame viewBox="-42 -8 604 160" maxWidthClassName="max-w-[725px]">
      <FieldShape />
      <PromptShape />
      <CommandShape />
      <IconShape />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}
