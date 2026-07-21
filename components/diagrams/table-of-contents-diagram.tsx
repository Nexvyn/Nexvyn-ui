'use client'

import {
  type BlueprintTheme,
  Blueprint,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  BP_TEXT_ON_PANEL,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/showcase/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/showcase/anatomy-parts'

const BP_TRIGGER = { x: 20, y: 94, w: 180, h: 36, rx: 8 } as const
const BP_PANEL = { x: 20, y: 10, w: 180, h: 74, rx: 8 } as const
const BP_RING = { cx: 162, cy: 112, r: 6 } as const

export function TableOfContentsWireframe() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <g className={BP_HIDE_ON_MORPH}>
        <rect
          x={BP_PANEL.x}
          y={BP_PANEL.y}
          width={BP_PANEL.w}
          height={BP_PANEL.h}
          rx={BP_PANEL.rx}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
        />
        <g fill="currentColor" opacity={theme.guide.structOpacity}>
          <rect x={28} y={22} width={156} height={18} rx={4} fillOpacity={0.5} />
          <rect x={28} y={44} width={156} height={18} rx={4} fillOpacity={0.3} />
        </g>
      </g>
      <rect
        x={BP_TRIGGER.x}
        y={BP_TRIGGER.y}
        width={BP_TRIGGER.w}
        height={BP_TRIGGER.h}
        rx={BP_TRIGGER.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        stroke="currentColor"
        fill="none"
        className={BP_MORPH}
      />
      <text
        x={BP_TRIGGER.x + 12}
        y={BP_TRIGGER.y + 22}
        fontSize={11}
        fontWeight={600}
        fontFamily="var(--font-sans)"
        strokeWidth={theme.wireframe.textStrokeWidth}
        strokeOpacity={theme.wireframe.textOpacity}
        className={BP_TEXT_ON_PANEL}
      >
        Getting Started
      </text>
      <line
        x1={145}
        y1={BP_TRIGGER.y + 8}
        x2={145}
        y2={BP_TRIGGER.y + 28}
        stroke="currentColor"
        strokeWidth={theme.guide.strokeWidth}
        opacity={theme.guide.dimOpacity}
      />
      <circle
        cx={BP_RING.cx}
        cy={BP_RING.cy}
        r={BP_RING.r}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.2}
      />
      <circle
        cx={BP_RING.cx}
        cy={BP_RING.cy}
        r={BP_RING.r}
        fill="none"
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.5}
        strokeDasharray={`${BP_RING.r * 2 * Math.PI * 0.6} ${BP_RING.r * 2 * Math.PI}`}
        strokeLinecap="round"
      />
      <path
        d={`M${178} ${BP_RING.cy - 3} L${182} ${BP_RING.cy + 1} L${186} ${BP_RING.cy - 3}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={theme.wireframe.strokeOpacity}
      />
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_TRIGGER.x} y={BP_TRIGGER.y} w={BP_TRIGGER.w} h={BP_TRIGGER.h} />
        <DimH
          x1={BP_TRIGGER.x}
          x2={BP_TRIGGER.x + BP_TRIGGER.w}
          y={BP_TRIGGER.y + BP_TRIGGER.h + 14}
          label={`${BP_TRIGGER.w}`}
        />
        <DimLabel x={BP_TRIGGER.x} y={BP_TRIGGER.y - 4} anchor="start">
          rounded-md
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_ITEMS = [
  { label: 'Introduction', isActive: false },
  { label: 'Getting Started', isActive: true },
  { label: 'API Reference', isActive: false },
] as const

function PanelShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')

  return (
    <rect
      x={10}
      y={10}
      width={220}
      height={140}
      rx={10}
      stroke="currentColor"
      strokeWidth={hovered === 'panel' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'panel' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'panel' ? 0.03 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ItemShape({
  index,
  label,
  isActive,
}: {
  index: number
  label: string
  isActive: boolean
}) {
  const { hovered, setHovered } = useAnatomy()
  const partId = `item-${index}`
  const spotlight = useSpotlight(partId)

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={18}
        y={20 + index * 38}
        width={204}
        height={32}
        rx={6}
        fill="currentColor"
        fillOpacity={hovered === partId ? 0.1 : isActive ? 0.08 : 0}
        className={spotlight.className}
      />
      <text
        x={30}
        y={40 + index * 38}
        fontSize={11}
        fontWeight={isActive ? 600 : 400}
        fontFamily="var(--font-sans)"
        className={`fill-current ${isActive ? 'opacity-100' : 'opacity-55'} ${spotlight.className}`}
      >
        {label}
      </text>
    </g>
  )
}

function TriggerShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  return (
    <rect
      x={10}
      y={170}
      width={220}
      height={48}
      rx={10}
      stroke="currentColor"
      strokeWidth={hovered === 'trigger' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'trigger' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'trigger' ? 0.05 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function TitleShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('title')

  return (
    <g
      onMouseEnter={() => setHovered('title')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={14} y={186} width={140} height={24} fill="transparent" />
      <text
        x={24}
        y={198}
        fontSize={12}
        fontWeight={600}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Getting Started
      </text>
    </g>
  )
}

function ProgressShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('progress')

  return (
    <g
      onMouseEnter={() => setHovered('progress')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={176} y={182} width={24} height={24} fill="transparent" />
      <circle
        cx={188}
        cy={194}
        r={8}
        fill="none"
        stroke="currentColor"
        strokeWidth={hovered === 'progress' ? 2 : 1.5}
        opacity={0.2}
      />
      <circle
        cx={188}
        cy={194}
        r={8}
        fill="none"
        stroke="currentColor"
        strokeWidth={hovered === 'progress' ? 2 : 1.5}
        strokeDasharray={`${8 * 2 * Math.PI * 0.6} ${8 * 2 * Math.PI}`}
        strokeLinecap="round"
        className={spotlight.className}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const isOthersHovered = hovered !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: isOthersHovered ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-all duration-200 ease-out ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={10} y={170} w={220} h={48} />
      <DimH x1={10} x2={230} y={160} label="220" />
      <DimV x={245} y1={170} y2={218} label="48" labelXOffset={5} labelAnchor="start" />
      <DimLabel x={10} y={166} anchor="start">
        rounded-md
      </DimLabel>
    </g>
  )
}

function InteractionZone() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('interaction', { isInteraction: true })

  return (
    <rect
      x={158}
      y={172}
      width={44}
      height={44}
      rx={8}
      strokeWidth={1}
      strokeDasharray={hovered === 'interaction' ? 'none' : '2 2'}
      className={`cursor-pointer stroke-accent ${hovered === 'interaction' ? 'fill-accent' : 'fill-transparent'} ${spotlight.className}`}
      style={{
        pointerEvents: 'all',
        fillOpacity: hovered === 'interaction' ? 0.1 : 0,
        ...spotlight.style,
      }}
      onMouseEnter={() => setHovered('interaction')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="panel" x1={70} y1={100} x2={20} y2={100} />
      <OverlayLine id="item-1" x1={290} y1={104} x2={340} y2={104} />
      <OverlayLine id="title" x1={84} y1={238} x2={84} y2={250} />
      <OverlayLine id="progress" x1={248} y1={238} x2={248} y2={275} />
      <OverlayLine id="trigger" x1={180} y1={238} x2={180} y2={300} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={-80}
        y={90}
        width={90}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="panel"
          label="TableOfContents.Panel"
          className="items-center justify-end"
        />
      </foreignObject>
      <foreignObject
        x={340}
        y={94}
        width={130}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="item-1"
          label="TableOfContents.Item"
          className="items-center justify-start"
        />
      </foreignObject>
      <foreignObject
        x={34}
        y={250}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="title" label="Active Title" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={198}
        y={275}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="progress" label="Progress Ring" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={130}
        y={300}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="trigger"
          label="TableOfContents.Trigger"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
    </>
  )
}

export function TableOfContentsBreakdown() {
  return (
    <AnatomyFrame viewBox="-90 20 570 310" maxWidthClassName="max-w-2xl">
      <g transform="translate(60, 20)">
        <PanelShape theme={blueprintTheme} />
        {AN_ITEMS.map((item, index) => (
          <ItemShape key={item.label} index={index} label={item.label} isActive={item.isActive} />
        ))}
        <TriggerShape theme={blueprintTheme} />
        <TitleShape />
        <ProgressShape />
        <InteractionZone />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}
