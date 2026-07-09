'use client'

import {
  Blueprint,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
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

const BP_CX = 110
const BP_CY = 70
const BP_CORE_R = 20
const BP_PETAL_R = 14
const BP_FAN = 38
const BP_PETALS = [
  { cx: BP_CX, cy: BP_CY - BP_FAN },
  { cx: BP_CX + BP_FAN, cy: BP_CY },
  { cx: BP_CX, cy: BP_CY + BP_FAN },
  { cx: BP_CX - BP_FAN, cy: BP_CY },
] as const

export function ColorPickerWireframe() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <g className={BP_HIDE_ON_MORPH}>
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.dimOpacity}
        >
          {BP_PETALS.map((p, i) => (
            <line key={i} x1={BP_CX} y1={BP_CY} x2={p.cx} y2={p.cy} />
          ))}
        </g>
        {BP_PETALS.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={BP_PETAL_R}
            fill="none"
            stroke="currentColor"
            strokeWidth={theme.guide.strokeWidth}
            strokeDasharray="3 3"
            opacity={theme.guide.structOpacity}
          />
        ))}
      </g>
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_CORE_R}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_CX - BP_CORE_R} y={BP_CY - BP_CORE_R} w={BP_CORE_R * 2} h={BP_CORE_R * 2} />
        <DimH
          x1={BP_CX - BP_CORE_R}
          x2={BP_CX + BP_CORE_R}
          y={BP_CY + BP_FAN + BP_PETAL_R + 12}
          label={`core ${BP_CORE_R * 2}`}
        />
        <DimLabel x={BP_CX + BP_FAN + BP_PETAL_R + 6} y={BP_CY + 3} anchor="start">
          {`petal ${BP_PETAL_R * 2}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

function CoreButtonShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('core')

  return (
    <g
      onMouseEnter={() => setHovered('core')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <circle
        cx={120}
        cy={120}
        r={24}
        stroke="currentColor"
        strokeWidth={hovered === 'core' ? 2 : 1}
        fill="currentColor"
        fillOpacity={hovered === 'core' ? 0.3 : 0.15}
        className={spotlight.className}
      />
      <circle
        cx={120}
        cy={120}
        r={8}
        fill="currentColor"
        fillOpacity={hovered === 'core' ? 0.8 : 0.5}
        className={spotlight.className}
      />
    </g>
  )
}

function OuterPetalsShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('outer-petals')

  const petalCount = 8
  const radius = 65

  return (
    <g
      onMouseEnter={() => setHovered('outer-petals')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount
        const rad = (angle * Math.PI) / 180
        const x = 120 + Math.cos(rad) * radius
        const y = 120 + Math.sin(rad) * radius
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={12}
            stroke="currentColor"
            strokeWidth={hovered === 'outer-petals' ? 1.5 : 0.75}
            fill="currentColor"
            fillOpacity={hovered === 'outer-petals' ? 0.25 : 0.12}
            className={spotlight.className}
          />
        )
      })}
    </g>
  )
}

function InnerPetalsShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('inner-petals')

  const petalCount = 8
  const radius = 42

  return (
    <g
      onMouseEnter={() => setHovered('inner-petals')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount + 22.5
        const rad = (angle * Math.PI) / 180
        const x = 120 + Math.cos(rad) * radius
        const y = 120 + Math.sin(rad) * radius
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={8}
            stroke="currentColor"
            strokeWidth={hovered === 'inner-petals' ? 1.5 : 0.75}
            fill="currentColor"
            fillOpacity={hovered === 'inner-petals' ? 0.2 : 0.08}
            className={spotlight.className}
          />
        )
      })}
    </g>
  )
}

function ArcSliderShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('arc-slider')

  return (
    <g
      onMouseEnter={() => setHovered('arc-slider')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <circle
        cx={120}
        cy={120}
        r={90}
        stroke="currentColor"
        strokeWidth={hovered === 'arc-slider' ? 3 : 2}
        strokeDasharray={hovered === 'arc-slider' ? 'none' : '4 2'}
        fill="transparent"
        className={spotlight.className}
      />
      <circle
        cx={120}
        cy={30}
        r={6}
        fill="currentColor"
        fillOpacity={hovered === 'arc-slider' ? 0.8 : 0.5}
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
      <Selection x={30} y={30} w={180} h={180} />
      <DimH x1={30} x2={210} y={20} label="180" />
      <DimV x={225} y1={30} y2={210} label="180" labelXOffset={5} labelAnchor="start" />
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="core" x1={180} y1={184} x2={180} y2={258} />
      <OverlayLine id="outer-petals" x1={180} y1={95} x2={180} y2={55} />
      <OverlayLine id="inner-petals" x1={141} y1={144} x2={80} y2={144} />
      <OverlayLine id="arc-slider" x1={180} y1={70} x2={300} y2={70} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={130}
        y={263}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="core" label="Core Button" className="items-start justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={130}
        y={35}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="outer-petals" label="Outer Petals" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={-20}
        y={134}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="inner-petals" label="Inner Petals" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={300}
        y={60}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="arc-slider" label="Arc Slider" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function ColorPickerBreakdown() {
  return (
    <AnatomyFrame viewBox="-30 25 440 268" maxWidthClassName="max-w-lg">
      <g transform="translate(60, 40)">
        <OuterPetalsShape />
        <InnerPetalsShape />
        <ArcSliderShape />
        <CoreButtonShape />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}
