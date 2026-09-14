'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useState } from 'react'
import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_FILL_SOLID,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  draftTheme,
  beat,
  MeasureH,
  MeasureV,
  InsetGuide,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BOX = { size: 20, r: 4 } as const
const ROW = { labelGap: 12, labelFont: 16, labelLine: 20, labelW: 90, h: 44 } as const
const BP_LABEL = 'Buy groceries'
const BP_LABEL_W = 100
const BP_ROW_W = BOX.size + ROW.labelGap + BP_LABEL_W
const BP_ROW = { x: (220 - BP_ROW_W) / 2, y: (140 - ROW.h) / 2 } as const
const BP_TOUCH = 44

const BP_LABEL_INK = `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:fill-(--color-muted) group-focus-visible:fill-(--color-muted) group-hover:opacity-100 group-focus-visible:opacity-100`
const BP_STRIKE =
  'origin-left scale-x-0 transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-out) group-hover:scale-x-100 group-hover:delay-(--motion-dur-base) group-focus-visible:scale-x-100 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none'

export function CheckboxBlueprint() {
  const [on, setOn] = useState(false)
  const theme = draftTheme
  const bx = BP_ROW.x
  const by = BP_ROW.y
  const labelX = bx + BOX.size + ROW.labelGap
  const labelMidY = by + ROW.labelLine / 2

  return (
    <div className="relative inline-block">
      <DraftSurface>
        <defs>
          <pattern
            id="bp-hatch-checkbox"
            width="4"
            height="4"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="4"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity="0.35"
            />
          </pattern>
        </defs>
        <rect
          x={bx}
          y={by}
          width={BOX.size}
          height={BOX.size}
          rx={BOX.r}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          style={beat(DRAFT_BEAT.outline)}
          className={`ink-draw ${
            on ? `${DRAFT_INK_MORPH} fill-(--color-fg) stroke-transparent` : DRAFT_FILL_SOLID
          }`}
        />
        <rect
          x={bx}
          y={by}
          width={BOX.size}
          height={BOX.size}
          rx={BOX.r}
          fill="url(#bp-hatch-checkbox)"
          style={beat(DRAFT_BEAT.hatch)}
          className={`fade-note ${on ? 'opacity-0' : DRAFT_SCAFFOLD_FADE}`}
        />
        <path
          d={`M${bx + 4.375} ${by + 10.625}L${bx + 8.75} ${by + 15}L${bx + 15.625} ${by + 6.875}`}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={on ? 0 : 1}
          stroke="var(--color-bg)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={beat(DRAFT_DETAIL_BEAT.a)}
          className={`fade-note transition-[stroke-dashoffset] duration-(--motion-dur-slow) ease-(--motion-ease-out) group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] motion-reduce:transition-none`}
        />
        <text
          x={labelX}
          y={labelMidY + ROW.labelFont * 0.35}
          fontSize={ROW.labelFont}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${BP_LABEL_INK} ${on ? 'fill-(--color-muted) opacity-100' : ''}`}
        >
          {BP_LABEL}
        </text>
        <rect
          x={labelX}
          y={labelMidY - 0.5}
          width={BP_LABEL_W}
          height={1}
          style={{ transformBox: 'fill-box' }}
          className={`fill-(--color-muted) ${BP_STRIKE} ${on ? 'scale-x-100' : ''}`}
        />
        <g className={DRAFT_SCAFFOLD_FADE}>
          <InsetGuide
            x={bx}
            y={by}
            w={BP_ROW_W}
            h={ROW.h}
            offset={0.8}
            className="dash-march"
            style={beat(DRAFT_BEAT.guide)}
          />
          <MeasureH
            x1={bx}
            x2={bx + BOX.size}
            y={by - 12}
            label={`${BOX.size}`}
            className="note-stamp"
            style={beat(stampBeat(0))}
          />
          <MeasureH
            x1={bx + BOX.size}
            x2={labelX}
            y={by + BOX.size + 8}
            label={`${ROW.labelGap}`}
            labelYOffset={10}
            className="note-stamp"
            style={beat(stampBeat(1))}
          />
          <MeasureV
            x={bx - 10}
            y1={by}
            y2={by + ROW.h}
            label={`${ROW.h}`}
            className="note-stamp"
            style={beat(stampBeat(2))}
          />
        </g>
      </DraftSurface>
      <button
        type="button"
        aria-pressed={on}
        aria-label="Toggle checkbox"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setOn((value) => !value)
        }}
        className="pointer-events-auto absolute cursor-pointer rounded-md outline-none transition-shadow duration-(--motion-dur-fast) focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
        style={{
          left: bx + BOX.size / 2 - BP_TOUCH / 2,
          top: by + BOX.size / 2 - BP_TOUCH / 2,
          width: BP_TOUCH,
          height: BP_TOUCH,
        }}
      />
    </div>
  )
}

const AN = { x: 130, y: 67 } as const
const AN_MID_Y = AN.y + BOX.size / 2

function BoxShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('box')

  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={BOX.size}
      height={BOX.size}
      rx={BOX.r}
      stroke="currentColor"
      strokeWidth={hovered === 'box' ? 2 : draftTheme.wireframe.strokeWidth}
      fill={hovered === 'box' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'box' ? 0.15 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('box')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function GlyphShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('glyph')

  return (
    <g
      onMouseEnter={() => setHovered('glyph')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN.x + 2} y={AN.y + 2} width={16} height={16} fill="transparent" />
      <path
        d={`M${AN.x + 4} ${AN_MID_Y}L${AN.x + 7.5} ${AN_MID_Y + 3}L${AN.x + 14} ${AN_MID_Y - 4}`}
        stroke="currentColor"
        strokeWidth={hovered === 'glyph' ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={spotlight.className}
      />
    </g>
  )
}

function LabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')

  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x + BOX.size + ROW.labelGap - 4}
        y={AN.y}
        width={ROW.labelW}
        height={BOX.size}
        fill="transparent"
      />
      <text
        x={AN.x + BOX.size + ROW.labelGap}
        y={AN_MID_Y + 4}
        fontSize={ROW.labelFont}
        fontWeight={400}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Accept terms
      </text>
    </g>
  )
}

function HiddenInputShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('hidden-input')

  return (
    <g
      onMouseEnter={() => setHovered('hidden-input')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x - 4}
        y={AN.y + BOX.size + 8}
        width={28}
        height={12}
        rx={2}
        stroke="currentColor"
        strokeWidth={hovered === 'hidden-input' ? 1.5 : 0.75}
        strokeDasharray="2 2"
        fill={hovered === 'hidden-input' ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === 'hidden-input' ? 0.08 : 0}
        className={spotlight.className}
      />
      <text
        x={AN.x + 10}
        y={AN.y + BOX.size + 17}
        fontSize={7}
        fontFamily="var(--font-mono)"
        textAnchor="middle"
        className={`fill-current ${spotlight.className}`}
        opacity={0.6}
      >
        input
      </text>
    </g>
  )
}

function TouchTargetShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('touch-target')

  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={BOX.size + ROW.labelGap + ROW.labelW}
      height={ROW.h}
      rx={4}
      stroke="currentColor"
      strokeWidth={hovered === 'touch-target' ? 1.5 : draftTheme.guide.strokeWidth}
      strokeDasharray="4 3"
      fill={hovered === 'touch-target' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'touch-target' ? 0.04 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('touch-target')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

export function CheckboxAnatomy() {
  return (
    <AnatomyFrame
      viewBox="-14 4 440 156"
      ariaLabel="Checkbox anatomy: box, glyph, label, hidden input, touch target"
    >
      <TouchTargetShape />
      <BoxShape />
      <GlyphShape />
      <LabelShape />
      <HiddenInputShape />
      <AnatomyCallout
        part="box"
        label="Checkbox.Box"
        anchor={[AN.x, AN_MID_Y]}
        side="start"
        distance={40}
        measure="size-5 · 20 × 20 · rounded-md"
        caption="The toggle; fills with the foreground color when checked"
      />
      <AnatomyCallout
        part="glyph"
        label="Check Glyph"
        anchor={[AN.x + BOX.size / 2, AN.y]}
        side="top"
        distance={30}
        isAccent
        measure="svg check · draws in on toggle"
        caption="Check or dash mark that animates in"
      />
      <AnatomyCallout
        part="label"
        label="Label Text"
        anchor={[AN.x + BOX.size + ROW.labelGap + ROW.labelW - 22, AN.y]}
        side="top"
        distance={30}
        measure="text-base · gap 12 from box"
        caption="Optional label; clicking it toggles the box"
      />
      <AnatomyCallout
        part="hidden-input"
        label="Hidden Input"
        anchor={[AN.x + BOX.size / 2, AN.y + BOX.size + 20]}
        side="bottom"
        distance={24}
        measure="native input · opacity 0"
        caption="Keeps the value in native forms"
      />
      <AnatomyCallout
        part="touch-target"
        label="Touch Target 44px"
        anchor={[AN.x + BOX.size + ROW.labelGap + ROW.labelW, AN_MID_Y]}
        side="end"
        distance={30}
        isAccent
        measure="min-h-11 · 44 tall"
        caption="Full row touch target from box to label"
      />
    </AnatomyFrame>
  )
}
