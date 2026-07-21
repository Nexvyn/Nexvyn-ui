'use client'

import {
  Blueprint,
  BP_FILL_MUTED,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
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

const BP_TRACK = { x: 20, y: 52, w: 180, h: 36, rx: 8 } as const
const BP_FILL_W = 117
const BP_BAR = { w: 4, h: 24 } as const

export function FaderBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <rect
        x={BP_TRACK.x}
        y={BP_TRACK.y}
        width={BP_TRACK.w}
        height={BP_TRACK.h}
        rx={BP_TRACK.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_FILL_MUTED} stroke-current`}
      />
      <rect
        x={BP_TRACK.x}
        y={BP_TRACK.y}
        width={BP_FILL_W}
        height={BP_TRACK.h}
        rx={BP_TRACK.rx}
        fill="currentColor"
        opacity={0.15}
      />
      <rect
        x={BP_TRACK.x + BP_FILL_W - BP_BAR.w / 2}
        y={BP_TRACK.y + (BP_TRACK.h - BP_BAR.h) / 2}
        width={BP_BAR.w}
        height={BP_BAR.h}
        rx={2}
        fill="var(--bp-accent, var(--color-accent))"
      />
      <text
        x={BP_TRACK.x + 12}
        y={BP_TRACK.y + BP_TRACK.h / 2}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${BP_TEXT_SOFT}`}
      >
        Volume
      </text>
      <text
        x={BP_TRACK.x + BP_TRACK.w - 12}
        y={BP_TRACK.y + BP_TRACK.h / 2}
        dominantBaseline="central"
        textAnchor="end"
        fontSize={12}
        fontFamily="var(--font-sans)"
        className={`fill-current ${BP_TEXT_SOFT}`}
      >
        65%
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_TRACK.x} y={BP_TRACK.y} w={BP_TRACK.w} h={BP_TRACK.h} />
        <DimH
          x1={BP_TRACK.x}
          x2={BP_TRACK.x + BP_TRACK.w}
          y={BP_TRACK.y - 10}
          label={`${BP_TRACK.w}`}
        />
        <DimV
          x={BP_TRACK.x - 12}
          y1={BP_TRACK.y}
          y2={BP_TRACK.y + BP_TRACK.h}
          label={`${BP_TRACK.h}`}
          labelXOffset={-6}
        />
      </g>
    </Blueprint>
  )
}

const AN_TRACK = { x: 10, y: 36, w: 280, h: 40, rx: 8 } as const
const AN_FILL_W = 182
const AN_BAR = { w: 4, h: 20 } as const
const AN_BAR_X = AN_TRACK.x + AN_FILL_W - AN_BAR.w / 2

function ControlShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('control')

  return (
    <rect
      x={AN_TRACK.x}
      y={AN_TRACK.y}
      width={AN_TRACK.w}
      height={AN_TRACK.h}
      rx={AN_TRACK.rx}
      stroke="currentColor"
      strokeWidth={hovered === 'control' ? 2 : blueprintTheme.wireframe.strokeWidth}
      fill={hovered === 'control' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'control' ? 0.05 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('control')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function FillShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('fill')

  return (
    <rect
      x={AN_TRACK.x}
      y={AN_TRACK.y}
      width={AN_FILL_W}
      height={AN_TRACK.h}
      rx={AN_TRACK.rx}
      stroke="none"
      fill="currentColor"
      fillOpacity={hovered === 'fill' ? 0.3 : 0.18}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('fill')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function BarShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('bar')

  return (
    <g
      onMouseEnter={() => setHovered('bar')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN_BAR_X - 8} y={AN_TRACK.y} width={20} height={AN_TRACK.h} fill="transparent" />
      <rect
        x={AN_BAR_X}
        y={AN_TRACK.y + (AN_TRACK.h - AN_BAR.h) / 2}
        width={AN_BAR.w}
        height={AN_BAR.h}
        rx={2}
        fill="var(--bp-accent, var(--color-accent))"
        opacity={hovered === 'bar' ? 1 : 0.85}
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
      <rect x={AN_TRACK.x + 4} y={AN_TRACK.y + 8} width={90} height={24} fill="transparent" />
      <text
        x={AN_TRACK.x + 14}
        y={AN_TRACK.y + AN_TRACK.h / 2}
        dominantBaseline="central"
        fontSize={13}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Volume
      </text>
    </g>
  )
}

function ValueShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('value')

  return (
    <g
      onMouseEnter={() => setHovered('value')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_TRACK.x + AN_TRACK.w - 90}
        y={AN_TRACK.y + 8}
        width={80}
        height={24}
        fill="transparent"
      />
      <text
        x={AN_TRACK.x + AN_TRACK.w - 14}
        y={AN_TRACK.y + AN_TRACK.h / 2}
        dominantBaseline="central"
        textAnchor="end"
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current tabular-nums ${spotlight.className}`}
      >
        65%
      </text>
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
      <Selection x={AN_TRACK.x} y={AN_TRACK.y} w={AN_TRACK.w} h={AN_TRACK.h} />
      <DimH
        x1={AN_TRACK.x}
        x2={AN_TRACK.x + AN_TRACK.w}
        y={AN_TRACK.y - 10}
        label={`${AN_TRACK.w}`}
      />
      <DimV
        x={AN_TRACK.x + AN_TRACK.w + 15}
        y1={AN_TRACK.y}
        y2={AN_TRACK.y + AN_TRACK.h}
        label={`${AN_TRACK.h}`}
        labelXOffset={5}
        labelAnchor="start"
      />
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="control" x1={210} y1={106} x2={210} y2={135} />
      <OverlayLine id="fill" x1={90} y1={66} x2={90} y2={30} />
      <OverlayLine id="bar" x1={252} y1={76} x2={320} y2={30} />
      <OverlayLine id="label" x1={84} y1={90} x2={10} y2={90} />
      <OverlayLine id="value" x1={340} y1={90} x2={360} y2={90} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={155}
        y={135}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="control" label="Slider.Control" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={40}
        y={10}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="fill" label="Fill" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={270}
        y={10}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="bar" label="Grab Bar" className="items-end justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={-80}
        y={76}
        width={90}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Label" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={360}
        y={76}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="value" label="Value" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function FaderAnatomy() {
  return (
    <AnatomyFrame viewBox="-90 0 560 165" maxWidthClassName="max-w-xl">
      <g transform="translate(60, 30)">
        <ControlShape />
        <FillShape />
        <BarShape />
        <LabelShape />
        <ValueShape />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}
