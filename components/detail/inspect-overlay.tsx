'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useInspectElement, type InspectData, type GapInfo } from '@/hooks/use-inspect-element'
import { springs } from '@/lib/motion-tokens'

const BLUE = 'var(--color-inspect)'
const GREEN = 'color-mix(in oklab, var(--color-success) 35%, transparent)'
const GREEN_LINE = 'color-mix(in oklab, var(--color-success) 90%, transparent)'
const CONTENT_FILL = 'color-mix(in oklab, var(--color-inspect-content) 20%, transparent)'
const BAND = 'color-mix(in oklab, var(--color-inspect) 16%, transparent)'
const CROSSHAIR = 'color-mix(in oklab, var(--color-inspect) 55%, transparent)'
const GREEN_LABEL = 'var(--color-inspect-label)'

const TICK_INTERVAL = 8
const LABEL_INTERVAL = 32
const TOP_RULER_HEIGHT = 22
const LEFT_RULER_WIDTH = 30

function ContentFill({ data }: { data: InspectData }) {
  return (
    <div
      data-inspect-ui
      style={{
        position: 'absolute',
        left: data.contentBox.x,
        top: data.contentBox.y,
        width: data.contentBox.width,
        height: data.contentBox.height,
        backgroundColor: CONTENT_FILL,
        pointerEvents: 'none',
      }}
    />
  )
}

function PaddingStrips({ data }: { data: InspectData }) {
  const { rect, padding } = data
  const strips: {
    x: number
    y: number
    w: number
    h: number
    value: number
    side: 'top' | 'right' | 'bottom' | 'left'
  }[] = []

  if (padding.top > 0) {
    strips.push({
      x: rect.x,
      y: rect.y,
      w: rect.width,
      h: padding.top,
      value: Math.round(padding.top),
      side: 'top',
    })
  }
  if (padding.bottom > 0) {
    strips.push({
      x: rect.x,
      y: rect.y + rect.height - padding.bottom,
      w: rect.width,
      h: padding.bottom,
      value: Math.round(padding.bottom),
      side: 'bottom',
    })
  }
  if (padding.left > 0) {
    strips.push({
      x: rect.x,
      y: rect.y + padding.top,
      w: padding.left,
      h: rect.height - padding.top - padding.bottom,
      value: Math.round(padding.left),
      side: 'left',
    })
  }
  if (padding.right > 0) {
    strips.push({
      x: rect.x + rect.width - padding.right,
      y: rect.y + padding.top,
      w: padding.right,
      h: rect.height - padding.top - padding.bottom,
      value: Math.round(padding.right),
      side: 'right',
    })
  }

  return (
    <>
      {strips.map((s, i) => {
        const isHorizontal = s.side === 'top' || s.side === 'bottom'
        const fitsInside = isHorizontal ? s.h > 12 : s.w > 18

        let labelStyle: React.CSSProperties
        if (fitsInside) {
          labelStyle = {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        } else {
          labelStyle = {
            position: 'absolute',
          }
          if (s.side === 'top') {
            labelStyle.top = -12
            labelStyle.left = '50%'
            labelStyle.transform = 'translateX(-50%)'
          } else if (s.side === 'bottom') {
            labelStyle.bottom = -12
            labelStyle.left = '50%'
            labelStyle.transform = 'translateX(-50%)'
          } else if (s.side === 'left') {
            labelStyle.left = -14
            labelStyle.top = '50%'
            labelStyle.transform = 'translateY(-50%)'
          } else {
            labelStyle.right = -14
            labelStyle.top = '50%'
            labelStyle.transform = 'translateY(-50%)'
          }
        }

        return (
          <div
            key={i}
            data-inspect-ui
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              width: s.w,
              height: s.h,
              backgroundColor: GREEN,
              pointerEvents: 'none',
            }}
          >
            <div data-inspect-ui style={{ ...labelStyle, pointerEvents: 'none' }}>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: 'ui-monospace, monospace',
                  color: fitsInside ? GREEN_LABEL : BLUE,
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
            </div>
          </div>
        )
      })}
    </>
  )
}

function GapStrips({ gaps }: { gaps: GapInfo[] }) {
  return (
    <>
      {gaps.map((g, i) => (
        <div
          key={i}
          data-inspect-ui
          style={{
            position: 'absolute',
            left: g.x,
            top: g.y,
            width: g.width,
            height: g.height,
            backgroundColor: GREEN,
            border: `1px dashed ${GREEN_LINE}`,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontFamily: 'ui-monospace, monospace',
              color: GREEN_LABEL,
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {g.value}
          </span>
        </div>
      ))}
    </>
  )
}

function Crosshairs({
  data,
  frameWidth,
  frameHeight,
}: {
  data: InspectData
  frameWidth: number
  frameHeight: number
}) {
  const { rect } = data
  return (
    <>
      <div
        data-inspect-ui
        style={{
          position: 'absolute',
          left: rect.x,
          top: 0,
          width: 1,
          height: frameHeight,
          backgroundColor: CROSSHAIR,
          pointerEvents: 'none',
        }}
      />
      <div
        data-inspect-ui
        style={{
          position: 'absolute',
          left: rect.x + rect.width,
          top: 0,
          width: 1,
          height: frameHeight,
          backgroundColor: CROSSHAIR,
          pointerEvents: 'none',
        }}
      />
      <div
        data-inspect-ui
        style={{
          position: 'absolute',
          left: 0,
          top: rect.y,
          width: frameWidth,
          height: 1,
          backgroundColor: CROSSHAIR,
          pointerEvents: 'none',
        }}
      />
      <div
        data-inspect-ui
        style={{
          position: 'absolute',
          left: 0,
          top: rect.y + rect.height,
          width: frameWidth,
          height: 1,
          backgroundColor: CROSSHAIR,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

function HorizontalRuler({
  frameWidth,
  contentOriginX,
  contentWidth,
  highlightX,
  highlightW,
  reducedMotion,
}: {
  frameWidth: number
  contentOriginX: number
  contentWidth: number
  contentOriginY: number
  highlightX: number | null
  highlightW: number | null
  reducedMotion: boolean
}) {
  const totalWidth = frameWidth
  const tickCount = Math.ceil(totalWidth / TICK_INTERVAL)

  return (
    <motion.div
      data-inspect-ui
      initial={reducedMotion ? false : { opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
      transition={springs.moderate}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: totalWidth,
        height: TOP_RULER_HEIGHT,
        pointerEvents: 'none',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'transparent',
      }}
    >
      {highlightX !== null && highlightW !== null && (
        <div
          style={{
            position: 'absolute',
            left: highlightX,
            top: 0,
            width: highlightW,
            height: TOP_RULER_HEIGHT,
            backgroundColor: BAND,
          }}
        />
      )}
      <svg
        width={totalWidth}
        height={TOP_RULER_HEIGHT}
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        {Array.from({ length: tickCount }, (_, i) => {
          const frameX = i * TICK_INTERVAL
          const value = Math.round(frameX - contentOriginX)
          const isLabel = value >= 0 && value % LABEL_INTERVAL === 0 && value > 0
          const insideBounds = frameX >= contentOriginX && frameX <= contentOriginX + contentWidth
          const opacity = insideBounds ? 1 : 0.16
          const tickH = isLabel ? 8 : value % 32 === 0 && value >= 0 ? 5 : 3

          return (
            <g key={i} opacity={opacity}>
              <line x1={frameX} y1={0} x2={frameX} y2={tickH} stroke={BLUE} strokeWidth={1} />
              {isLabel && (
                <text
                  x={frameX}
                  y={TOP_RULER_HEIGHT - 3}
                  fill={BLUE}
                  fontSize={9}
                  fontFamily="ui-monospace, monospace"
                  fontWeight={500}
                  textAnchor="middle"
                >
                  {value}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}

function VerticalRuler({
  frameHeight,
  contentOriginY,
  contentHeight,
  highlightY,
  highlightH,
  reducedMotion,
}: {
  frameHeight: number
  contentOriginX: number
  contentOriginY: number
  contentHeight: number
  highlightY: number | null
  highlightH: number | null
  reducedMotion: boolean
}) {
  const totalHeight = frameHeight
  const tickCount = Math.ceil(totalHeight / TICK_INTERVAL)

  return (
    <motion.div
      data-inspect-ui
      initial={reducedMotion ? false : { opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -4 }}
      transition={springs.moderate}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: LEFT_RULER_WIDTH,
        height: totalHeight,
        pointerEvents: 'none',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'transparent',
      }}
    >
      {highlightY !== null && highlightH !== null && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: highlightY,
            width: LEFT_RULER_WIDTH,
            height: highlightH,
            backgroundColor: BAND,
          }}
        />
      )}
      <svg
        width={LEFT_RULER_WIDTH}
        height={totalHeight}
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        {Array.from({ length: tickCount }, (_, i) => {
          const frameY = i * TICK_INTERVAL
          const value = Math.round(frameY - contentOriginY)
          const isLabel = value >= 0 && value % LABEL_INTERVAL === 0 && value > 0
          const insideBounds = frameY >= contentOriginY && frameY <= contentOriginY + contentHeight
          const opacity = insideBounds ? 1 : 0.16
          const tickW = isLabel ? 8 : value % 32 === 0 && value >= 0 ? 5 : 3

          return (
            <g key={i} opacity={opacity}>
              <line x1={0} y1={frameY} x2={tickW} y2={frameY} stroke={BLUE} strokeWidth={1} />
              {isLabel && (
                <text
                  x={LEFT_RULER_WIDTH - 3}
                  y={frameY}
                  fill={BLUE}
                  fontSize={9}
                  fontFamily="ui-monospace, monospace"
                  fontWeight={500}
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {value}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}

interface InspectOverlayProps {
  frameRef: RefObject<HTMLElement | null>
  contentRef: RefObject<HTMLElement | null>
}

export function InspectOverlay({ frameRef, contentRef }: InspectOverlayProps) {
  const data = useInspectElement(frameRef, contentRef, true)
  const reducedMotion = useReducedMotion() ?? false
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 })
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const observerRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    const frame = frameRef.current
    const content = contentRef.current
    if (!frame || !content) return

    const measure = () => {
      const frameRect = frame.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      setFrameSize({ width: frameRect.width, height: frameRect.height })
      setContentOffset({
        x: contentRect.left - frameRect.left,
        y: contentRect.top - frameRect.top,
        width: contentRect.width,
        height: contentRect.height,
      })
    }

    measure()

    observerRef.current = new ResizeObserver(measure)
    observerRef.current.observe(frame)
    observerRef.current.observe(content)

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [frameRef, contentRef])

  return (
    <motion.div
      data-inspect-ui
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
      transition={reducedMotion ? { duration: 0 } : springs.moderate}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 30,
        pointerEvents: 'none',
        borderRadius: 'inherit',
        overflow: 'hidden',
      }}
    >
      <div
        data-inspect-ui
        style={{
          position: 'absolute',
          left: contentOffset.x,
          top: contentOffset.y,
          width: contentOffset.width,
          height: contentOffset.height,
          pointerEvents: 'auto',
          cursor: 'crosshair',
        }}
      />

      <HorizontalRuler
        frameWidth={frameSize.width}
        contentOriginX={contentOffset.x}
        contentWidth={contentOffset.width}
        contentOriginY={contentOffset.y}
        highlightX={data ? data.rect.x : null}
        highlightW={data ? data.rect.width : null}
        reducedMotion={reducedMotion}
      />

      <VerticalRuler
        frameHeight={frameSize.height}
        contentOriginX={contentOffset.x}
        contentOriginY={contentOffset.y}
        contentHeight={contentOffset.height}
        highlightY={data ? data.rect.y : null}
        highlightH={data ? data.rect.height : null}
        reducedMotion={reducedMotion}
      />

      <AnimatePresence>
        {data && (
          <motion.div
            key="overlays"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            <Crosshairs data={data} frameWidth={frameSize.width} frameHeight={frameSize.height} />
            <ContentFill data={data} />
            <PaddingStrips data={data} />
            {data.gaps.length > 0 && <GapStrips gaps={data.gaps} />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
