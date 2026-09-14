'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  DraftSurface,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureV,
  MeasureNote,
  GripFrame,
  beat,
  DRAFT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BREAD = {
  items: ['Home', 'Docs', 'Breadcrumbs'] as const,
  textW: { Home: 36, Docs: 32, Breadcrumbs: 86 },
  font: 14,
  lineH: 20,
  sep: 12,
  sepNudge: 1,
  focusRx: 4,
} as const

function breadTextW(label: (typeof BREAD.items)[number]) {
  return BREAD.textW[label]
}

const BREAD_TOTAL_W = BREAD.items.reduce(
  (sum, label, i) => sum + breadTextW(label) + (i < BREAD.items.length - 1 ? BREAD.sep : 0),
  0,
)

const BP = {
  x: (220 - BREAD_TOTAL_W) / 2,
  y: (140 - BREAD.lineH) / 2,
} as const
const BP_BASELINE = BP.y + BREAD.lineH / 2 + BREAD.font * 0.35
const BP_FOCUS_I = 1

function itemX(i: number) {
  let x = BP.x
  for (let j = 0; j < i; j++) x += breadTextW(BREAD.items[j]) + BREAD.sep
  return x
}

function sepX(i: number) {
  return itemX(i) + breadTextW(BREAD.items[i])
}

const BP_LINK_TEXT = `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:fill-(--color-muted) group-focus-visible:fill-(--color-muted) group-hover:opacity-100 group-focus-visible:opacity-100`
const BP_SEP_INK = `${DRAFT_INK_MORPH} stroke-current opacity-50 group-hover:stroke-(--color-subtle) group-focus-visible:stroke-(--color-subtle) group-hover:opacity-100 group-focus-visible:opacity-100`
const BP_FOCUS_RING = `${DRAFT_INK_MORPH} opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`

export function BreadcrumbsBlueprint() {
  const theme = draftTheme
  const lastIdx = BREAD.items.length - 1
  const focusX = itemX(BP_FOCUS_I)
  const focusW = breadTextW(BREAD.items[BP_FOCUS_I])
  return (
    <DraftSurface>
      <rect
        x={focusX - 2}
        y={BP.y - 2}
        width={focusW + 4}
        height={BREAD.lineH + 4}
        rx={BREAD.focusRx + 2}
        fill="none"
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={2}
        className={BP_FOCUS_RING}
      />
      {BREAD.items.map((label, i) => (
        <g key={label}>
          <text
            x={itemX(i)}
            y={BP_BASELINE}
            fontSize={BREAD.font}
            fontFamily="var(--font-sans)"
            style={beat(`${400 + i * 70}ms`)}
            className={`fade-note ${i === lastIdx ? DRAFT_TEXT_SOFT : BP_LINK_TEXT}`}
          >
            {label}
          </text>
          {i < lastIdx && (
            <path
              d={`M${sepX(i) + 4.5} ${BP.y + 4 + BREAD.sepNudge + 2.5}l3 3.5-3 3.5`}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              fill="none"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={beat(`${200 + i * 60}ms`)}
              className={`ink-draw ${BP_SEP_INK}`}
            />
          )}
        </g>
      ))}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP.x}
          y={BP.y}
          w={BREAD_TOTAL_W}
          h={BREAD.lineH}
          style={beat(DRAFT_BEAT.handle)}
        />
        <g
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.dimOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        >
          {BREAD.items.slice(0, lastIdx).map((label, i) => (
            <rect
              key={label}
              x={sepX(i)}
              y={BP.y + 4 + BREAD.sepNudge}
              width={BREAD.sep}
              height={BREAD.sep}
            />
          ))}
        </g>
        <MeasureH
          x1={BP.x}
          x2={BP.x + BREAD_TOTAL_W}
          y={BP.y - 12}
          label={`${BREAD_TOTAL_W}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureH
          x1={sepX(0)}
          x2={sepX(0) + BREAD.sep}
          y={BP.y + BREAD.lineH + 8}
          label={`${BREAD.sep}`}
          labelYOffset={10}
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureV
          x={BP.x - 8}
          y1={BP.y}
          y2={BP.y + BREAD.lineH}
          label={`${BREAD.lineH}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP.x + BREAD_TOTAL_W}
          y={BP.y + BREAD.lineH + 18}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`text ${BREAD.font} · gap 0`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN = {
  x: 40,
  y: 60,
  itemH: 20,
  gap: 6,
  sepW: 12,
  items: [
    { label: 'Home', w: 34 },
    { label: 'Components', w: 78 },
    { label: 'Breadcrumbs', w: 86 },
  ],
} as const

function anItemX(i: number) {
  let x = AN.x
  for (let j = 0; j < i; j++) {
    x += AN.items[j].w + AN.gap + AN.sepW + AN.gap
  }
  return x
}

function AnatomyLink({ i }: { i: number }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('link')
  const item = AN.items[i]
  const x = anItemX(i)
  const isHovered = hovered === 'link'
  return (
    <g
      onMouseEnter={() => setHovered('link')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', ...spotlight.style }}
    >
      <rect
        x={x}
        y={AN.y}
        width={item.w}
        height={AN.itemH}
        rx={2}
        fill="currentColor"
        fillOpacity={isHovered ? 0.08 : 0}
      />
      <text
        x={x + item.w / 2}
        y={AN.y + AN.itemH / 2 + 5}
        fontSize={14}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        className={`fill-current ${isHovered ? 'opacity-100' : 'opacity-70'}`}
      >
        {item.label}
      </text>
    </g>
  )
}

function AnatomySeparator({ i }: { i: number }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('separator')
  const item = AN.items[i]
  const x = anItemX(i) + item.w + AN.gap
  const isHovered = hovered === 'separator'
  const cx = x + AN.sepW / 2
  const cy = AN.y + AN.itemH / 2 + 1
  return (
    <g
      onMouseEnter={() => setHovered('separator')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', ...spotlight.style }}
    >
      <rect
        x={x}
        y={AN.y}
        width={AN.sepW}
        height={AN.itemH}
        fill="currentColor"
        fillOpacity={isHovered ? 0.08 : 0}
        rx={2}
      />
      <path
        d={`M${cx - 1.5} ${cy - 3.5}l3 3.5-3 3.5`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isHovered ? 'opacity-100' : 'opacity-60'}
      />
    </g>
  )
}

function AnatomyCurrent() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('current')
  const item = AN.items[2]
  const x = anItemX(2)
  const isHovered = hovered === 'current'
  return (
    <g
      onMouseEnter={() => setHovered('current')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', ...spotlight.style }}
    >
      <rect
        x={x}
        y={AN.y}
        width={item.w}
        height={AN.itemH}
        rx={2}
        fill="currentColor"
        fillOpacity={isHovered ? 0.08 : 0}
      />
      <text
        x={x + item.w / 2}
        y={AN.y + AN.itemH / 2 + 5}
        fontSize={14}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        className={`fill-current ${isHovered ? 'opacity-100' : 'opacity-90'}`}
      >
        {item.label}
      </text>
    </g>
  )
}

function AnatomyBackground() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  const last = AN.items.length - 1
  const rowW = anItemX(last) + AN.items[last].w - AN.x
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={AN.x} y={AN.y} w={rowW} h={AN.itemH} />
      <MeasureH x1={AN.x} x2={AN.x + rowW} y={AN.y - 14} label={`${rowW}`} />
      <MeasureV
        x={AN.x - 12}
        y1={AN.y}
        y2={AN.y + AN.itemH}
        label={`${AN.itemH}`}
        labelXOffset={-6}
      />
    </g>
  )
}

export function BreadcrumbsAnatomy() {
  const linkX = anItemX(0) + AN.items[0].w / 2
  const sepX = anItemX(0) + AN.items[0].w + AN.gap + AN.sepW / 2
  const currentX = anItemX(2) + AN.items[2].w / 2
  return (
    <AnatomyFrame viewBox="0 8 320 130" ariaLabel="Breadcrumbs anatomy: link, separator, current">
      <AnatomyLink i={0} />
      <AnatomySeparator i={0} />
      <AnatomyLink i={1} />
      <AnatomySeparator i={1} />
      <AnatomyCurrent />
      <AnatomyBackground />
      <AnatomyCallout
        part="link"
        label="Link"
        anchor={[linkX, AN.y]}
        side="top"
        distance={8}
        measure={`${AN.items[0].w} x ${AN.itemH}, r 2`}
        caption="Clickable link to a parent page in the trail"
      />
      <AnatomyCallout
        part="separator"
        label="Separator"
        anchor={[sepX, AN.y + AN.itemH]}
        side="bottom"
        distance={8}
        measure={`${AN.sepW} x ${AN.itemH}, r 2`}
        caption="Visual divider between breadcrumb items"
      />
      <AnatomyCallout
        part="current"
        label="Current page"
        anchor={[currentX, AN.y]}
        side="top"
        distance={8}
        isAccent
        measure={`${AN.items[2].w} x ${AN.itemH}, r 2`}
        caption="The current location, not clickable"
      />
    </AnatomyFrame>
  )
}
