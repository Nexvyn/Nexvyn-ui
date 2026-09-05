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
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const FIELD = { x: 80, y: 100, w: 280, h: 44, rx: 8 } as const
const PAD_X = 14
const ICON_SIZE = 16

function ContainerShape() {
  const spotlight = useSpotlight('container')
  return (
    <rect
      x={FIELD.x}
      y={FIELD.y}
      width={FIELD.w}
      height={FIELD.h}
      rx={FIELD.rx}
      fill="transparent"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeOpacity={0.5}
      className={spotlight.className}
      style={spotlight.style}
    />
  )
}

function BorderShape() {
  const spotlight = useSpotlight('border')
  return (
    <rect
      x={FIELD.x}
      y={FIELD.y}
      width={FIELD.w}
      height={FIELD.h}
      rx={FIELD.rx}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={spotlight.className}
      style={spotlight.style}
    />
  )
}

function FocusRingShape() {
  const spotlight = useSpotlight('focus-ring')
  return (
    <rect
      x={FIELD.x - 3}
      y={FIELD.y - 3}
      width={FIELD.w + 6}
      height={FIELD.h + 6}
      rx={FIELD.rx + 3}
      fill="none"
      stroke="var(--bp-accent, var(--color-accent))"
      strokeWidth={2}
      strokeDasharray="4 3"
      className={spotlight.className}
      style={spotlight.style}
    />
  )
}

function StartAdornmentShape() {
  const spotlight = useSpotlight('start-adornment')
  const cx = FIELD.x + PAD_X + ICON_SIZE / 2
  const cy = FIELD.y + FIELD.h / 2
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className={spotlight.className}
      style={spotlight.style}
    >
      <circle cx={cx - 1.5} cy={cy - 1.5} r={4.5} />
      <line x1={cx + 1.5} y1={cy + 1.5} x2={cx + 5} y2={cy + 5} />
    </g>
  )
}

function EndAdornmentShape() {
  const spotlight = useSpotlight('end-adornment')
  const x = FIELD.x + FIELD.w - PAD_X - 24
  const cy = FIELD.y + FIELD.h / 2
  return (
    <g className={spotlight.className} style={spotlight.style}>
      <rect
        x={x}
        y={cy - 8}
        width={22}
        height={16}
        rx={3}
        stroke="currentColor"
        strokeWidth={1}
        fill="transparent"
      />
      <text
        x={x + 11}
        y={cy + 3.5}
        textAnchor="middle"
        fontSize={8}
        fontFamily="var(--font-sans)"
        className="fill-current opacity-60"
      >
        ⌘K
      </text>
    </g>
  )
}

function NativeInputShape() {
  const spotlight = useSpotlight('native-input')
  const x = FIELD.x + PAD_X + ICON_SIZE + 10
  const cy = FIELD.y + FIELD.h / 2
  return (
    <text
      x={x}
      y={cy + 4}
      fontSize={13}
      fontFamily="var(--font-sans)"
      className={`fill-(--color-muted) ${spotlight.className}`}
      style={spotlight.style}
    >
      you@example.com
    </text>
  )
}

function LinesLayer() {
  const { hovered } = useAnatomy()
  const midY = FIELD.y + FIELD.h / 2
  const iconCx = FIELD.x + PAD_X + ICON_SIZE / 2
  const endX = FIELD.x + FIELD.w - PAD_X - 12
  const lineStrokeWidth = hovered ? 1.25 : 1

  return (
    <g strokeWidth={lineStrokeWidth}>
      <OverlayLine
        id="container"
        x1={FIELD.x + FIELD.w}
        y1={midY + 14}
        x2={FIELD.x + FIELD.w + 30}
        y2={midY + 14}
      />
      <OverlayLine
        id="native-input"
        x1={FIELD.x + FIELD.w / 2}
        y1={FIELD.y}
        x2={FIELD.x + FIELD.w / 2}
        y2={FIELD.y - 30}
      />
      <OverlayLine
        id="start-adornment"
        x1={iconCx}
        y1={FIELD.y + FIELD.h}
        x2={iconCx}
        y2={FIELD.y + FIELD.h + 30}
      />
      <OverlayLine
        id="end-adornment"
        x1={endX}
        y1={FIELD.y + FIELD.h}
        x2={endX}
        y2={FIELD.y + FIELD.h + 30}
      />
      <OverlayLine id="focus-ring" x1={FIELD.x} y1={midY - 10} x2={FIELD.x - 30} y2={midY - 10} />
      <OverlayLine id="border" x1={FIELD.x} y1={midY + 10} x2={FIELD.x - 30} y2={midY + 10} />
    </g>
  )
}

function TagsLayer() {
  const midY = FIELD.y + FIELD.h / 2
  const iconCx = FIELD.x + PAD_X + ICON_SIZE / 2
  const endX = FIELD.x + FIELD.w - PAD_X - 12

  return (
    <>
      <foreignObject
        x={FIELD.x + FIELD.w + 34}
        y={midY + 14 - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Container"
          className="items-center justify-start"
          isAccent
        />
      </foreignObject>

      <foreignObject
        x={FIELD.x + FIELD.w / 2 - 50}
        y={FIELD.y - 30 - 26}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="native-input" label="Native Input" className="items-end justify-center" />
      </foreignObject>

      <foreignObject
        x={iconCx - 55}
        y={FIELD.y + FIELD.h + 32}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="start-adornment"
          label="Start Adornment"
          className="items-start justify-center"
        />
      </foreignObject>

      <foreignObject
        x={endX - 50}
        y={FIELD.y + FIELD.h + 32}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="end-adornment"
          label="End Adornment"
          className="items-start justify-center"
        />
      </foreignObject>

      <foreignObject
        x={FIELD.x - 30 - 80}
        y={midY - 10 - 12}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="focus-ring"
          label="Focus Ring"
          className="items-center justify-end"
          isAccent
        />
      </foreignObject>

      <foreignObject
        x={FIELD.x - 30 - 60}
        y={midY + 10 - 12}
        width={60}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="border" label="Border" className="items-center justify-end" />
      </foreignObject>
    </>
  )
}

export function InputAnatomy() {
  return (
    <AnatomyFrame viewBox="-10 30 500 180" maxWidthClassName="max-w-xl">
      <FocusRingShape />
      <ContainerShape />
      <BorderShape />
      <StartAdornmentShape />
      <EndAdornmentShape />
      <NativeInputShape />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

const BP_FIELD = { x: 30, y: 44, w: 160, h: 44, rx: 6 } as const
const BP_PAD_X = 14
const BP_ICON = 14

const RING_CLASS =
  'transition-opacity duration-(--motion-dur-fast) ease-(--motion-ease-out) opacity-0 group-hover:opacity-70 group-hover:delay-(--motion-dur-base) group-focus-visible:opacity-70 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none'

const TYPE_BASE =
  'opacity-0 transition-opacity duration-700 delay-0 group-hover:opacity-100 group-hover:duration-0 group-focus-visible:opacity-100 group-focus-visible:duration-0 motion-reduce:transition-none'

const BP_TYPE_CHARS = [
  ['n', 'group-hover:delay-[650ms] group-focus-visible:delay-[650ms]'],
  ['e', 'group-hover:delay-[760ms] group-focus-visible:delay-[760ms]'],
  ['x', 'group-hover:delay-[870ms] group-focus-visible:delay-[870ms]'],
  ['v', 'group-hover:delay-[980ms] group-focus-visible:delay-[980ms]'],
  ['y', 'group-hover:delay-[1090ms] group-focus-visible:delay-[1090ms]'],
  ['n', 'group-hover:delay-[1200ms] group-focus-visible:delay-[1200ms]'],
  ['d', 'group-hover:delay-[1310ms] group-focus-visible:delay-[1310ms]'],
  ['e', 'group-hover:delay-[1420ms] group-focus-visible:delay-[1420ms]'],
  ['v', 'group-hover:delay-[1530ms] group-focus-visible:delay-[1530ms]'],
  ['@', 'group-hover:delay-[1850ms] group-focus-visible:delay-[1850ms]'],
  ['g', 'group-hover:delay-[1960ms] group-focus-visible:delay-[1960ms]'],
  ['m', 'group-hover:delay-[2070ms] group-focus-visible:delay-[2070ms]'],
  ['a', 'group-hover:delay-[2180ms] group-focus-visible:delay-[2180ms]'],
  ['i', 'group-hover:delay-[2290ms] group-focus-visible:delay-[2290ms]'],
  ['l', 'group-hover:delay-[2400ms] group-focus-visible:delay-[2400ms]'],
  ['.', 'group-hover:delay-[2510ms] group-focus-visible:delay-[2510ms]'],
  ['c', 'group-hover:delay-[2620ms] group-focus-visible:delay-[2620ms]'],
  ['o', 'group-hover:delay-[2730ms] group-focus-visible:delay-[2730ms]'],
  ['m', 'group-hover:delay-[2840ms] group-focus-visible:delay-[2840ms]'],
] as const

export function InputWireframe() {
  const theme = draftTheme
  const midY = BP_FIELD.y + BP_FIELD.h / 2
  const iconCx = BP_FIELD.x + BP_PAD_X + BP_ICON / 2
  const textX = BP_FIELD.x + BP_PAD_X + BP_ICON + 6

  return (
    <DraftSurface>
      <text
        x={BP_FIELD.x}
        y={BP_FIELD.y - 12}
        fontSize={11}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_DETAIL_BEAT.d)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Email
      </text>

      <rect
        x={BP_FIELD.x - 3}
        y={BP_FIELD.y - 3}
        width={BP_FIELD.w + 6}
        height={BP_FIELD.h + 6}
        rx={9}
        fill="none"
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.5}
        className={RING_CLASS}
      />

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

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${DRAFT_INK_MORPH} opacity-55 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <circle cx={iconCx - 1.5} cy={midY - 1.5} r={3.5} />
        <line x1={iconCx + 1.2} y1={midY + 1.2} x2={iconCx + 4} y2={midY + 4} />
      </g>

      <style>{`
        @keyframes bp-caret-jump {
          0%, 15.99% { transform: translateX(0); }
          16%, 19.99% { transform: translateX(5px); }
          20%, 23.99% { transform: translateX(10px); }
          24%, 27.99% { transform: translateX(14px); }
          28%, 31.99% { transform: translateX(19px); }
          32%, 35.99% { transform: translateX(23px); }
          36%, 38.99% { transform: translateX(28px); }
          39%, 43.99% { transform: translateX(33px); }
          44%, 47.99% { transform: translateX(38px); }
          48%, 58.99% { transform: translateX(43px); }
          59%, 62.99% { transform: translateX(51px); }
          63%, 66.99% { transform: translateX(56px); }
          67%, 70.99% { transform: translateX(63px); }
          71%, 74.99% { transform: translateX(68px); }
          75%, 78.99% { transform: translateX(70px); }
          79%, 82.99% { transform: translateX(72px); }
          83%, 85.99% { transform: translateX(75px); }
          86%, 89.99% { transform: translateX(79px); }
          90%, 93.99% { transform: translateX(84px); }
          94%, 100% { transform: translateX(91px); }
        }
        .group:hover .bp-caret,
        .group:focus-visible .bp-caret {
          animation: bp-caret-jump 2.8s var(--motion-dur-base) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover .bp-caret,
          .group:focus-visible .bp-caret {
            animation: none;
            transform: translateX(91px);
          }
        }
      `}</style>

      <text
        x={textX}
        y={midY + 3}
        fontSize={9}
        fontFamily="var(--font-sans)"
        className="fill-current stroke-transparent"
      >
        {BP_TYPE_CHARS.map(([char, delay]) => (
          <tspan key={delay} className={`${TYPE_BASE} ${delay}`}>
            {char}
          </tspan>
        ))}
      </text>

      <text
        x={textX}
        y={midY + 3}
        fontSize={9}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:opacity-0 group-focus-visible:opacity-0`}
      >
        you@example.com
      </text>

      <g className="bp-caret opacity-0 transition-opacity duration-0 group-hover:opacity-100 group-hover:delay-(--motion-dur-base) group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-base)">
        <line
          x1={textX + 0.75}
          y1={midY - 7}
          x2={textX + 0.75}
          y2={midY + 7}
          strokeWidth={1.25}
          strokeLinecap="round"
          className="stroke-current animate-pulse"
        />
      </g>

      <text
        x={BP_FIELD.x}
        y={102}
        fontSize={8}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_ALT_BEAT)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-(--color-error) opacity-45 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        Password is required
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
          x={BP_FIELD.x + BP_PAD_X}
          y={midY - BP_ICON / 2}
          w={BP_FIELD.w - BP_PAD_X * 2}
          h={BP_ICON}
          offset={0.8}
          boxX={BP_FIELD.x}
          boxY={BP_FIELD.y}
          boxW={BP_FIELD.w}
          boxH={BP_FIELD.h}
          boxRx={BP_FIELD.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP_FIELD.x + BP_PAD_X / 2}
          y={midY + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          14
        </MeasureNote>
        <MeasureNote
          x={BP_FIELD.x + BP_FIELD.w - BP_PAD_X / 2}
          y={midY + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          14
        </MeasureNote>
        <MeasureH
          x1={BP_FIELD.x}
          x2={BP_FIELD.x + BP_FIELD.w}
          y={114}
          label="160"
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureV
          x={BP_FIELD.x - 12}
          y1={BP_FIELD.y}
          y2={BP_FIELD.y + BP_FIELD.h}
          label="44"
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureNote
          x={BP_FIELD.x + BP_FIELD.w}
          y={BP_FIELD.y - 4}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          r6
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}
