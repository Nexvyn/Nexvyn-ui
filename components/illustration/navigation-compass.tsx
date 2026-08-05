'use client'

import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useId, useRef, useState, type RefObject } from 'react'
import { cn } from '@/lib/utils'

export interface CompassNavLink {
  /** Degrees (0 = top, clockwise) where the link sits on the dial. */
  angle: number
  label: string
  href: string
}

export interface NavigationCompassProps {
  links: CompassNavLink[]
  /** Angle (degrees, 0 = top, CW) of the active-zone pointer. */
  activeZoneAngle: number
  /** Half-width of the active-zone cone in degrees. */
  activeZoneThreshold?: number
  /**
   * Rotation of the fixed spike pointer in degrees. Arms are snapped to
   * 45/135/225/315 before this offset, so the default of 30 aims them at
   * 75/165/255/345. Set `activeZoneAngle` to match whichever arm should point
   * at the highlighted link.
   */
  roseRotation?: number
  tickCount?: number
  /** SVG viewBox size in px (square). The component itself is always fluid. */
  size?: number
  /** Renders the active-zone cone and a live rotation readout. */
  showDetails?: boolean
  /** Accessible name for the navigation landmark. */
  label?: string
  className?: string
}

function toAngleRad(angleDeg: number): number {
  return ((angleDeg - 90) * Math.PI) / 180
}

interface Point {
  x: number
  y: number
}

function polarToCartesian(center: number, radius: number, angleDeg: number): Point {
  const rad = toAngleRad(angleDeg)
  return { x: center + Math.cos(rad) * radius, y: center + Math.sin(rad) * radius }
}

function angularDistance(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360
  return diff > 180 ? 360 - diff : diff
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

/** 0-1 proximity of a dial angle to the active zone; 0 outside the threshold. */
function calcProximityProgress(
  dialAngle: number,
  totalRotation: number,
  activeZoneAngle: number,
  threshold: number,
): number {
  const absolute = (dialAngle + totalRotation) % 360
  const normalized = absolute >= 0 ? absolute : absolute + 360
  const dist = angularDistance(normalized, activeZoneAngle)
  if (dist >= threshold) return 0
  return smoothstep(1 - dist / threshold)
}

/** Source artwork geometry: the dial circle at the centre of the 358x351 rose SVG. */
const ROSE_SRC = { cx: 175.421, cy: 180.077, r: 93.327 } as const
/**
 * Shrinks the centre disc relative to the source artwork. The arms anchor to
 * this same radius, so they follow it in and keep meeting the circle's edge.
 */
const DIAL_R = ROSE_SRC.r * 0.6
/**
 * Arms start at the dial edge (r=93.3) and run ~126 units out, so this scales
 * the pair to reach r=198 — inside the r=230 guide ring, clear of the labels.
 */
const ROSE_SCALE = 0.9

/**
 * One spike arm, drawn in the source artwork's own 129x130 space. It is instanced
 * four times at exact 45deg steps rather than using the four baked-in arms, whose
 * hand-drawn bearings (44.2/130.4/226.0/318.7) miss the diagonal link marks.
 */
const SPIKE_FILLS = [
  'M0.499548 92.9137C27.3142 82.6937 63.9363 57.6958 110.366 17.9201L21.7657 107.614C15.6859 102.901 9.59766 96.8914 0.499548 92.9137Z',
  'M110.509 18.0609C71.3409 65.0046 46.8222 101.949 36.9522 128.895C34.0939 121.069 27.9954 113.762 21.909 107.754L110.509 18.0609Z',
] as const

const SPIKE_CONTOUR =
  'M110.366 17.9201C63.9363 57.6958 27.3142 82.6937 0.499548 92.9137C17.4057 101.593 30.8783 113.604 36.8096 128.754C46.6795 101.808 71.1983 64.8638 110.366 17.9201ZM110.366 17.9201L21.7657 107.614'

/** The arm's dial-contact vertex, and the rotation that aims its tip at 0deg. */
const SPIKE_INNER = { x: 21.7657, y: 107.614 } as const
const SPIKE_AIM_CORRECTION = -44.65

/** Bearings the four arms are snapped to. */
const SPIKE_BEARINGS = [45, 135, 225, 315] as const

// Low stiffness + high damping so the dial lags behind scroll like a physical wheel.
const SCROLL_SPRING = { stiffness: 60, damping: 25, restDelta: 0.001 } as const
// Higher mass gives the dial rotational inertia; damping prevents overshoot on release.
const PAN_SPRING = { stiffness: 180, damping: 28, mass: 1.4 } as const
const LINK_SPRING = { stiffness: 400, damping: 30, mass: 0.6 } as const

interface CompassRotation {
  totalRotation: MotionValue<number>
  onPan: (
    containerRef: RefObject<HTMLDivElement | null>,
    info: { point: Point; delta: Point },
  ) => void
  onPanEnd: () => void
}

function useCompassRotation(): CompassRotation {
  const manualOffset = useMotionValue(0)
  const springOffset = useSpring(manualOffset, PAN_SPRING)

  const { scrollY } = useScroll()
  const scrollRotation = useTransform(scrollY, (v) => -15 + v * 0.05)
  const smoothScrollRotation = useSpring(scrollRotation, SCROLL_SPRING)

  const totalRotation = useTransform(() => smoothScrollRotation.get() + springOffset.get())

  function onPan(
    containerRef: RefObject<HTMLDivElement | null>,
    info: { point: Point; delta: Point },
  ) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Page coordinates keep the math correct regardless of scroll position.
    const cx = rect.left + window.scrollX + rect.width / 2
    const cy = rect.top + window.scrollY + rect.height / 2

    const prevX = info.point.x - info.delta.x
    const prevY = info.point.y - info.delta.y

    const angle1 = Math.atan2(prevY - cy, prevX - cx)
    const angle2 = Math.atan2(info.point.y - cy, info.point.x - cx)

    // Wrap the delta to avoid a jump at the boundary.
    let deltaAngle = angle2 - angle1
    if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI
    if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI

    manualOffset.set(manualOffset.get() + deltaAngle * (180 / Math.PI))
  }

  function onPanEnd() {
    const velocity = springOffset.getVelocity()
    if (Math.abs(velocity) > 10) {
      manualOffset.set(manualOffset.get() + velocity * 0.4)
    }
  }

  return { totalRotation, onPan, onPanEnd }
}

/** Static concentric guide rings. Rotating these would be invisible, so they stay put. */
function CompassRose({ center }: { center: number }) {
  const filterId = useId()

  return (
    <g>
      <defs>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={center * 2}
          height={center * 2}
        >
          <feOffset dx="0" dy="6" />
          <feGaussianBlur stdDeviation="12" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.25" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>

      <circle cx={center} cy={center} r="254" fill="var(--color-bg)" filter={`url(#${filterId})`} />
      <circle
        cx={center}
        cy={center}
        r="250"
        className="fill-none stroke-(--color-fg)/20"
        strokeWidth="1"
      />
      <circle
        cx={center}
        cy={center}
        r="242"
        className="fill-none stroke-(--color-fg)/20"
        strokeWidth="2"
      />
      <circle
        cx={center}
        cy={center}
        r="230"
        className="fill-none stroke-(--color-fg)/10"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </g>
  )
}

/**
 * The spike artwork, drawn in its own coordinate space and centred on the dial.
 * Lives inside the rotating group so the spikes track the dial's rotation.
 */
function CompassSpikes({
  center,
  roseRotation,
  prefersReducedMotion,
}: {
  center: number
  roseRotation: number
  prefersReducedMotion: boolean
}) {
  return (
    <motion.g
      initial={prefersReducedMotion ? false : { rotate: -360 }}
      animate={{ rotate: 0 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${center}px ${center}px`, transformBox: 'view-box' }}
    >
      <g transform={`translate(${center}, ${center}) scale(${ROSE_SCALE}) rotate(${roseRotation})`}>
        {SPIKE_BEARINGS.map((bearing) => (
          <g key={bearing} transform={`rotate(${bearing})`}>
            {/*
              Aim the arm's tip at 0deg, then drop its narrow inner vertex onto
              the dial edge so the arm starts exactly where the circle ends.
            */}
            <g
              transform={`translate(0, ${-DIAL_R}) rotate(${SPIKE_AIM_CORRECTION}) translate(${-SPIKE_INNER.x}, ${-SPIKE_INNER.y})`}
            >
              {SPIKE_FILLS.map((d, i) => (
                <path
                  key={`fill-${i}`}
                  d={d}
                  className="fill-(--color-fg)/8 stroke-(--color-fg)/30"
                  strokeWidth="1"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path
                d={SPIKE_CONTOUR}
                fill="none"
                className="stroke-(--color-fg)/35"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4.26 4.26"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
        ))}

        {/*
          Drawn last so its solid fill sits on top of the arms, matching the
          source artwork where the arms meet the dial rather than crossing it.
        */}
        <circle
          cx={0}
          cy={0}
          r={DIAL_R}
          className="fill-(--color-bg) stroke-(--color-fg)/25"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </motion.g>
  )
}

interface CompassTickProps {
  index: number
  center: number
  outerRadius: number
  tickMajorRadius: number
  tickMediumRadius: number
  tickMinorRadius: number
  tickCount: number
  totalRotation: MotionValue<number>
  activeZoneAngle: number
  activeZoneThreshold: number
  prefersReducedMotion: boolean
}

function CompassTick({
  index,
  center,
  outerRadius,
  tickMajorRadius,
  tickMediumRadius,
  tickMinorRadius,
  tickCount,
  totalRotation,
  activeZoneAngle,
  activeZoneThreshold,
  prefersReducedMotion,
}: CompassTickProps) {
  const angleDeg = (index * 360) / tickCount
  const angleRad = toAngleRad(angleDeg)

  const isMajor = angleDeg % 15 === 0
  const isMedium = !isMajor && angleDeg % 5 === 0
  const baseRadius = isMajor ? tickMajorRadius : isMedium ? tickMediumRadius : tickMinorRadius

  const innerRadius = useTransform(totalRotation, (rotation) => {
    if (prefersReducedMotion) return baseRadius
    const progress = calcProximityProgress(angleDeg, rotation, activeZoneAngle, activeZoneThreshold)
    return baseRadius - progress * 25
  })

  const x1 = useTransform(innerRadius, (r) => center + Math.cos(angleRad) * r)
  const y1 = useTransform(innerRadius, (r) => center + Math.sin(angleRad) * r)
  const { x: x2, y: y2 } = polarToCartesian(center, outerRadius, angleDeg)

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={cn(isMajor ? 'stroke-(--color-fg)/40' : 'stroke-(--color-fg)/20')}
      strokeWidth={isMajor ? 1.5 : 1}
    />
  )
}

interface CompassLinkItemProps {
  link: CompassNavLink
  center: number
  textRadius: number
  totalRotation: MotionValue<number>
  activeZoneAngle: number
  activeZoneThreshold: number
  prefersReducedMotion: boolean
}

function CompassLinkItem({
  link,
  center,
  textRadius,
  totalRotation,
  activeZoneAngle,
  activeZoneThreshold,
  prefersReducedMotion,
}: CompassLinkItemProps) {
  const { x: textX, y: textY } = polarToCartesian(center, textRadius, link.angle)
  const { x: hitX1, y: hitY1 } = polarToCartesian(center, 200, link.angle)
  const { x: hitX2, y: hitY2 } = polarToCartesian(center, 450, link.angle)

  const [isNear, setIsNear] = useState(false)

  useMotionValueEvent(totalRotation, 'change', (latest) => {
    const nextIsNear =
      calcProximityProgress(link.angle, latest, activeZoneAngle, activeZoneThreshold) > 0
    if (nextIsNear !== isNear) setIsNear(nextIsNear)
  })

  const rawProgress = useTransform(totalRotation, (latest) =>
    calcProximityProgress(link.angle, latest, activeZoneAngle, activeZoneThreshold),
  )
  const springProgress = useSpring(rawProgress, LINK_SPRING)
  const scale = useTransform(springProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.2])
  // Counter-rotate so labels stay upright as the dial spins.
  const counterRotation = useTransform(totalRotation, (r) => -r)

  return (
    <Link
      href={link.href}
      className="transition-transform duration-(--motion-dur-fast) active:scale-[0.96] motion-reduce:transition-none"
    >
      {/* Wide invisible hit target along the link's arm for easier tap/click. */}
      <line
        x1={hitX1}
        y1={hitY1}
        x2={hitX2}
        y2={hitY2}
        stroke="transparent"
        strokeWidth="40"
        className="cursor-pointer"
      />
      <g transform={`translate(${textX}, ${textY})`}>
        <motion.g style={{ scale, rotate: counterRotation }}>
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            className={cn(
              'pointer-events-auto cursor-pointer transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
              isNear
                ? 'fill-(--color-accent)'
                : 'fill-(--color-fg)/50 font-medium hover:fill-(--color-fg)/80',
            )}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '16px' }}
          >
            {link.label}
          </text>
        </motion.g>
      </g>
    </Link>
  )
}

function CompassDegreeLabels({
  center,
  numberRadius,
  links,
}: {
  center: number
  numberRadius: number
  links: CompassNavLink[]
}) {
  return (
    <>
      {Array.from({ length: 24 }, (_, i) => {
        const angle = i * 15
        const isCoveredByLink = links.some((l) => Math.abs(l.angle - angle) < 10)
        if (isCoveredByLink) return null

        const { x, y } = polarToCartesian(center, numberRadius, angle)
        return (
          <g key={`num-${angle}`} transform={`translate(${x}, ${y})`}>
            <g style={{ transform: `rotate(${angle}deg)` }}>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-(--color-fg)/40 text-xs tabular-nums"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {angle}
              </text>
            </g>
          </g>
        )
      })}
    </>
  )
}

function ActiveZoneOverlay({
  center,
  outerRadius,
  activeZoneAngle,
  activeZoneThreshold,
}: {
  center: number
  outerRadius: number
  activeZoneAngle: number
  activeZoneThreshold: number
}) {
  const startPt = polarToCartesian(center, outerRadius, activeZoneAngle - activeZoneThreshold)
  const endPt = polarToCartesian(center, outerRadius, activeZoneAngle + activeZoneThreshold)
  const pointerPt = polarToCartesian(center, outerRadius, activeZoneAngle)

  return (
    <g className="pointer-events-none">
      <path
        d={`M ${center} ${center} L ${startPt.x} ${startPt.y} A ${outerRadius} ${outerRadius} 0 0 1 ${endPt.x} ${endPt.y} Z`}
        className="fill-(--color-accent)/10"
      />
      <line
        x1={center}
        y1={center}
        x2={pointerPt.x}
        y2={pointerPt.y}
        className="stroke-(--color-accent)/50"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle
        cx={center}
        cy={center}
        r={outerRadius}
        className="fill-none stroke-(--color-accent)/30"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </g>
  )
}

function CompassReadout({
  totalRotation,
  activeZoneAngle,
  activeZoneThreshold,
  links,
}: {
  totalRotation: MotionValue<number>
  activeZoneAngle: number
  activeZoneThreshold: number
  links: CompassNavLink[]
}) {
  const [info, setInfo] = useState({ rot: 0, link: 'None' })

  useMotionValueEvent(totalRotation, 'change', (latest) => {
    const abs = latest % 360
    const normalized = abs >= 0 ? abs : abs + 360
    const activeLink = links.find(
      (l) => calcProximityProgress(l.angle, normalized, activeZoneAngle, activeZoneThreshold) > 0,
    )
    setInfo({ rot: Math.round(normalized), link: activeLink?.label ?? 'None' })
  })

  return (
    <div className="pointer-events-none absolute start-4 top-0 z-10 flex flex-col gap-2 rounded-xl border border-(--color-border) bg-(--color-bg)/80 p-4 font-mono text-sm backdrop-blur-md">
      <div className="mb-1 border-b border-(--color-border) pb-2 font-semibold text-(--color-fg)">
        Compass
      </div>
      <div className="flex justify-between gap-6">
        <span className="text-(--color-muted-foreground)">Rotation</span>
        <span className="font-medium text-(--color-fg) tabular-nums">{info.rot}&deg;</span>
      </div>
      <div className="flex justify-between gap-6">
        <span className="text-(--color-muted-foreground)">Active zone</span>
        <span className="font-medium text-(--color-fg) tabular-nums">
          {activeZoneAngle}&deg; &plusmn;{activeZoneThreshold}&deg;
        </span>
      </div>
      <div className="flex justify-between gap-6">
        <span className="text-(--color-muted-foreground)">Active link</span>
        <span
          className={cn(
            'font-medium',
            info.link !== 'None' ? 'text-(--color-accent)' : 'text-(--color-muted-foreground)',
          )}
        >
          {info.link}
        </span>
      </div>
    </div>
  )
}

export function NavigationCompass({
  links,
  activeZoneAngle,
  activeZoneThreshold = 15,
  roseRotation = 30,
  tickCount = 180,
  size = 756,
  showDetails = false,
  label = 'Navigation compass',
  className,
}: NavigationCompassProps) {
  const center = size / 2

  // Radii stay proportional to `size` so the dial scales at any dimension.
  const outerRadius = Math.round(size * 0.4233)
  const tickMajorRadius = Math.round(size * 0.3836)
  const tickMediumRadius = Math.round(size * 0.3968)
  const tickMinorRadius = Math.round(size * 0.4101)
  const textRadius = Math.round(size * 0.4762)
  const numberRadius = Math.round(size * 0.4497)

  const containerRef = useRef<HTMLDivElement>(null)
  const { totalRotation, onPan, onPanEnd } = useCompassRotation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-auto relative touch-none select-none', className)}
    >
      {showDetails && (
        <CompassReadout
          totalRotation={totalRotation}
          activeZoneAngle={activeZoneAngle}
          activeZoneThreshold={activeZoneThreshold}
          links={links}
        />
      )}

      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        style={{ overflow: 'visible', touchAction: 'none' }}
        aria-label={label}
        role="navigation"
        onPan={(_e, info) => onPan(containerRef, info)}
        onPanEnd={onPanEnd}
      >
        <CompassRose center={center} />

        {/* Fixed pointer: stays put while the dial turns beneath it. */}
        <CompassSpikes
          center={center}
          roseRotation={roseRotation}
          prefersReducedMotion={!!prefersReducedMotion}
        />

        {showDetails && (
          <ActiveZoneOverlay
            center={center}
            outerRadius={outerRadius}
            activeZoneAngle={activeZoneAngle}
            activeZoneThreshold={activeZoneThreshold}
          />
        )}

        <motion.g
          style={{
            transformOrigin: '50% 50%',
            transformBox: 'view-box',
            rotate: prefersReducedMotion ? 0 : totalRotation,
          }}
        >
          <circle
            cx={center}
            cy={center}
            r={outerRadius}
            fill="none"
            className="stroke-(--color-fg)/20"
            strokeWidth="1"
            strokeDasharray="6 3"
          />

          {Array.from({ length: tickCount }, (_, i) => (
            <CompassTick
              key={i}
              index={i}
              center={center}
              outerRadius={outerRadius}
              tickMajorRadius={tickMajorRadius}
              tickMediumRadius={tickMediumRadius}
              tickMinorRadius={tickMinorRadius}
              tickCount={tickCount}
              totalRotation={totalRotation}
              activeZoneAngle={activeZoneAngle}
              activeZoneThreshold={activeZoneThreshold}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}

          {links.map((link, index) => (
            <CompassLinkItem
              key={`${link.href}-${index}`}
              link={link}
              center={center}
              textRadius={textRadius}
              totalRotation={totalRotation}
              activeZoneAngle={activeZoneAngle}
              activeZoneThreshold={activeZoneThreshold}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}

          <CompassDegreeLabels center={center} numberRadius={numberRadius} links={links} />
        </motion.g>
      </motion.svg>
    </div>
  )
}
