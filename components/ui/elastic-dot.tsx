"use client"

import React, { useRef, useEffect, useCallback } from "react"
import { motion, useSpring, useMotionValue } from "motion/react"
import { cn } from "@/lib/utils"

interface ElasticDotProps {
  activeId: string
  className?: string
}

const ElasticDot: React.FC<ElasticDotProps> = ({ activeId, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeItemRef = useRef<HTMLButtonElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scaleX = useSpring(1, { stiffness: 350, damping: 30 })
  const scaleY = useSpring(1, { stiffness: 350, damping: 30 })
  const opacity = useSpring(0, { stiffness: 300, damping: 25 })

  const updatePosition = useCallback(() => {
    if (!containerRef.current || !activeItemRef.current) {
      opacity.set(0)
      return
    }

    const container = containerRef.current.getBoundingClientRect()
    const item = activeItemRef.current.getBoundingClientRect()

    const targetX = item.left - container.left + item.width / 2
    const targetY = item.top - container.top + item.height / 2

    x.set(targetX)
    y.set(targetY)
    scaleX.set(item.width / 12)
    scaleY.set(1)
    opacity.set(1)
  }, [x, y, scaleX, scaleY, opacity])

  useEffect(() => {
    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [activeId, updatePosition])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          x,
          y,
          scaleX,
          scaleY,
          opacity,
          width: 12,
          height: 12,
          backgroundColor: "var(--color-accent)",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  )
}

export { ElasticDot }
