'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  DraftSurface,
  DRAFT_FILL_PANEL,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureV,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BREAD = {
  items: ['Home', 'Docs', 'Breadcrumbs'] as const,
  itemH: 20,
  sepW: 10,
  gap: 4,
  rx: 2,
} as const

function breadItemW(label: string) {
  return label.length * 6.5 + 9
}

const BREAD_TOTAL_W = BREAD.items.reduce(
  (sum, label, i) =>
    sum + breadItemW(label) + (i < BREAD.items.length - 1 ? BREAD.gap + BREAD.sepW + BREAD.gap : 0),
  0,
)

const BP = {
  x: (220 - BREAD_TOTAL_W) / 2,
  y: (140 - BREAD.itemH) / 2,
} as const

function itemX(i: number) {
  let x = BP.x
  for (let j = 0; j < i; j++) {
    x += breadItemW(BREAD.items[j]) + BREAD.gap + BREAD.sepW + BREAD.gap
  }
  return x
}

export function BreadcrumbsBlueprint() {
  const theme = draftTheme
  const lastIdx = BREAD.items.length - 1
  const lastLabel = BREAD.items[lastIdx]
  const lastTextW = breadItemW(lastLabel) - 10
  const lastCx = itemX(lastIdx) + breadItemW(lastLabel) / 2
  return (
    <DraftSurface>
      {BREAD.items.map((label, i) => {
        const w = breadItemW(label)
        const inkAt = i === 0 ? DRAFT_BEAT.outline : i === 1 ? '260ms' : '320ms'
        return (
          <g key={i}>
            <rect
              x={itemX(i)}
              y={BP.y}
              width={w}
              height={BREAD.itemH}
              rx={BREAD.rx}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={theme.wireframe.strokeOpacity}
              style={beat(inkAt)}
              className={`ink-draw ${i < BREAD.items.length - 1 ? DRAFT_FILL_PANEL : ''}`}
            />
            <text
              x={itemX(i) + w / 2}
              y={BP.y + BREAD.itemH / 2 + 5}
              fontSize={12}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              style={beat(`${400 + i * 70}ms`)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            >
              {label}
            </text>
            {i < BREAD.items.length - 1 &&
              (() => {
                const cx = itemX(i) + w + BREAD.gap + BREAD.sepW / 2
                const cy = BP.y + BREAD.itemH / 2 + 1
                return (
                  <path
                    d={`M${cx - 1.5} ${cy - 3.5}l3 3.5-3 3.5`}
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={theme.wireframe.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={theme.wireframe.strokeOpacity}
                    style={beat(`${260 + i * 60}ms`)}
                    className={`ink-draw ${DRAFT_SCAFFOLD_FADE}`}
                  />
                )
              })()}
          </g>
        )
      })}
      <line
        x1={lastCx - lastTextW / 2}
        y1={BP.y + BREAD.itemH + 3}
        x2={lastCx + lastTextW / 2}
        y2={BP.y + BREAD.itemH + 3}
        stroke="var(--color-accent)"
        strokeWidth={1}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        className="transition-[stroke-dashoffset] duration-(--motion-dur-slow) ease-(--motion-ease-out) group-hover:[stroke-dashoffset:0] group-hover:delay-(--motion-dur-base) group-focus-visible:[stroke-dashoffset:0] group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none"
      />
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP.x}
          y={BP.y - 2}
          w={itemX(2) + breadItemW(BREAD.items[2]) - BP.x}
          h={BREAD.itemH + 4}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={BP.x}
          x2={itemX(2) + breadItemW(BREAD.items[2])}
          y={BP.y - 12}
          label={`${itemX(2) + breadItemW(BREAD.items[2]) - BP.x}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP.x - 12}
          y1={BP.y}
          y2={BP.y + BREAD.itemH}
          label={`${BREAD.itemH}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
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
        fontWeight={500}
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

function AnatomyLines() {
  const linkX = anItemX(0) + AN.items[0].w / 2
  const sepX = anItemX(0) + AN.items[0].w + AN.gap + AN.sepW / 2
  const currentX = anItemX(2) + AN.items[2].w / 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="link" x1={linkX} y1={AN.y} x2={linkX} y2={AN.y - 8} />
      <OverlayLine
        id="separator"
        x1={sepX}
        y1={AN.y + AN.itemH}
        x2={sepX}
        y2={AN.y + AN.itemH + 8}
      />
      <OverlayLine id="current" x1={currentX} y1={AN.y} x2={currentX} y2={AN.y - 8} />
    </g>
  )
}

function AnatomyTags() {
  const linkX = anItemX(0) + AN.items[0].w / 2
  const sepX = anItemX(0) + AN.items[0].w + AN.gap + AN.sepW / 2
  const currentX = anItemX(2) + AN.items[2].w / 2
  return (
    <>
      <foreignObject
        x={linkX - 35}
        y={AN.y - 32}
        width={70}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="link" label="Link" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={sepX - 50}
        y={AN.y + AN.itemH + 8}
        width={100}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="separator" label="Separator" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={currentX - 55}
        y={AN.y - 32}
        width={110}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag
          part="current"
          label="Current page"
          isAccent
          className="items-end justify-center"
        />
      </foreignObject>
    </>
  )
}

export function BreadcrumbsAnatomy() {
  return (
    <AnatomyFrame viewBox="0 8 320 130" maxWidthClassName="max-w-sm">
      <AnatomyLink i={0} />
      <AnatomySeparator i={0} />
      <AnatomyLink i={1} />
      <AnatomySeparator i={1} />
      <AnatomyCurrent />
      <AnatomyBackground />
      <AnatomyLines />
      <AnatomyTags />
    </AnatomyFrame>
  )
}
