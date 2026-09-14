'use client'

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import { cn } from '@/lib/utils'
import { useDimensions } from '@/hooks/use-debounced-dimensions'

interface PixelElement extends HTMLDivElement {
  __animatePixel?: () => void
}

interface PixelTrailProps {
  pixelSize: number
  fadeDuration?: number
  delay?: number
  className?: string
  pixelClassName?: string
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)
  const trailId = useId()
  const pendingRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef(0)
  const visibleRef = useRef(true)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!visibleRef.current || !containerRef.current) return
      if (rafRef.current) {
        pendingRef.current = { x: e.clientX, y: e.clientY }
        return
      }
      const paint = (clientX: number, clientY: number) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.floor((clientX - rect.left) / pixelSize)
        const y = Math.floor((clientY - rect.top) / pixelSize)
        const pixelElement = document.getElementById(
          `${trailId}-pixel-${x}-${y}`,
        ) as PixelElement | null
        pixelElement?.__animatePixel?.()
      }
      paint(e.clientX, e.clientY)
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const pending = pendingRef.current
        pendingRef.current = null
        if (pending) paint(pending.x, pending.y)
      })
    },
    [pixelSize, trailId],
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      pendingRef.current = null
    }
  }, [handleMouseMove])

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.2
      },
      { threshold: [0, 0.2] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize],
  )
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize],
  )

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  className?: string
}

const PixelDot: React.FC<PixelDotProps> = React.memo(
  ({ id, size, fadeDuration, delay, className }) => {
    const controls = useAnimationControls()

    const animatePixel = useCallback(() => {
      controls.start({
        opacity: [1, 0],
        transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
      })
    }, [controls, fadeDuration, delay])

    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          ;(node as PixelElement).__animatePixel = animatePixel
        }
      },
      [animatePixel],
    )

    return (
      <motion.div
        id={id}
        ref={ref}
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        initial={{ opacity: 0 }}
        animate={controls}
        exit={{ opacity: 0 }}
      />
    )
  },
)

PixelDot.displayName = 'PixelDot'
export { PixelTrail }
