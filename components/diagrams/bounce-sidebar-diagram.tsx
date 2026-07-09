'use client'

import {
  type BlueprintTheme,
  Blueprint,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
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

const BP_UNIT = { x: 70, y: 22, w: 80, h: 96 } as const
const BP_ROW_YS = [38, 70, 102] as const
const BP_LINE = { x: 84, w: 54, h: 6, rx: 3 } as const
const BP_DOT = { cx: 73, r: 3 } as const

export function BounceSidebarWireframe() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      {BP_ROW_YS.map((cy, i) => (
        <rect
          key={cy}
          x={BP_LINE.x}
          y={cy - BP_LINE.h / 2}
          width={BP_LINE.w - i * 10}
          height={BP_LINE.h}
          rx={BP_LINE.rx}
          fill="currentColor"
          opacity={i === 0 ? theme.wireframe.strokeOpacity : theme.guide.structOpacity}
          className={`${BP_MORPH} ${i === 0 ? 'group-hover:opacity-100' : 'group-hover:opacity-40'}`}
        />
      ))}
      <circle
        cx={BP_DOT.cx}
        cy={BP_ROW_YS[0]}
        r={BP_DOT.r}
        fill="var(--bp-accent, var(--color-accent))"
        className="transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-y-8 group-focus-visible:translate-y-8 motion-reduce:transition-none"
      />
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_UNIT.x} y={BP_UNIT.y} w={BP_UNIT.w} h={BP_UNIT.h} />
        <DimH x1={BP_UNIT.x} x2={BP_UNIT.x + BP_UNIT.w} y={BP_UNIT.y - 10} label={`${BP_UNIT.w}`} />
        <DimLabel x={BP_UNIT.x + BP_UNIT.w + 8} y={BP_ROW_YS[0] + 3} anchor="start">
          {`dot ${BP_DOT.r * 2}`}
        </DimLabel>
        <DimLabel x={BP_UNIT.x} y={BP_UNIT.y + BP_UNIT.h + 14} anchor="start">
          spring overshoot
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_ITEMS = ['Home', 'About', 'Services'] as const

function ContainerShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')

  return (
    <rect
      x={10}
      y={10}
      width={120}
      height={140}
      rx={8}
      stroke="currentColor"
      strokeWidth={hovered === 'container' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'container' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'container' ? 0.03 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ItemShape({ theme, index, label }: { theme: BlueprintTheme; index: number; label: string }) {
  const { hovered, setHovered } = useAnatomy()
  const partId = `item-${index}`
  const spotlight = useSpotlight(partId)
  const isActive = index === 1

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={18}
        y={20 + index * 32}
        width={104}
        height={28}
        rx={6}
        stroke="currentColor"
        strokeWidth={hovered === partId ? 1 : theme.wireframe.strokeWidth}
        fill={hovered === partId ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === partId ? 0.08 : isActive ? 0.05 : 0}
        className={spotlight.className}
      />
      <text
        x={38}
        y={38 + index * 32}
        fontSize={11}
        fontFamily="var(--font-sans)"
        className={`fill-current ${isActive ? 'opacity-100' : 'opacity-50'} ${spotlight.className}`}
      >
        {label}
      </text>
    </g>
  )
}

function DotShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot')

  return (
    <g
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={24} y={28} width={10} height={10} fill="transparent" />
      <circle
        cx={29}
        cy={33}
        r={3}
        stroke="currentColor"
        strokeWidth={hovered === 'dot' ? 1 : 0.75}
        fill="currentColor"
        fillOpacity={hovered === 'dot' ? 0.8 : 0.5}
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
      <Selection x={10} y={10} w={120} h={140} />
      <DimH x1={10} x2={130} y={5} label="120" />
      <DimV x={145} y1={10} y2={150} label="140" labelXOffset={5} labelAnchor="start" />
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="container" x1={150} y1={170} x2={150} y2={190} />
      <OverlayLine id="dot" x1={109} y1={53} x2={80} y2={53} />
      <OverlayLine id="item-1" x1={202} y1={86} x2={225} y2={86} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={100}
        y={190}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Sidebar.Container"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={-20}
        y={43}
        width={95}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="dot" label="Bounce Dot" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={225}
        y={76}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item-1" label="Nav Item" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function BounceSidebarBreakdown() {
  return (
    <AnatomyFrame viewBox="-30 15 365 205" maxWidthClassName="max-w-lg">
      <g transform="translate(80, 20)">
        <ContainerShape theme={blueprintTheme} />
        {AN_ITEMS.map((label, index) => (
          <ItemShape key={label} theme={blueprintTheme} index={index} label={label} />
        ))}
        <DotShape />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}
