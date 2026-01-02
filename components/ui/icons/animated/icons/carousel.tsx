"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Carousel Icon
 * Visual: Three overlapping rectangles with nav dots
 * Animation: Rectangles slide horizontally in sequence
 */
export function CarouselIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Back panel */}
      <motion.rect
        x="8"
        y="6"
        width="12"
        height="9"
        rx="1.5"
        opacity="0.3"
        variants={{
          idle: { x: 0, opacity: 0.3 },
          hover: { x: -2, opacity: 0.5 },
          active: { x: -1, opacity: 0.4 },
        }}
        transition={{ duration: 0.2, delay: 0 }}
      />

      {/* Middle panel */}
      <motion.rect
        x="6"
        y="7"
        width="12"
        height="9"
        rx="1.5"
        opacity="0.6"
        variants={{
          idle: { x: 0, opacity: 0.6 },
          hover: { x: 0, opacity: 0.8 },
          active: { x: 0, opacity: 0.7 },
        }}
        transition={{ duration: 0.2, delay: 0.05 }}
      />

      {/* Front panel (highlighted) */}
      <motion.rect
        x="4"
        y="8"
        width="12"
        height="9"
        rx="1.5"
        variants={{
          idle: { x: 0, strokeWidth: 1.5 },
          hover: { x: 2, strokeWidth: 2 },
          active: { x: 1, strokeWidth: 1.75 },
        }}
        transition={{ duration: 0.2, delay: 0.1 }}
      />

      {/* Navigation dots */}
      <g>
        <circle cx="8" cy="20" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="12" cy="20" r="1" fill="currentColor" opacity="1" />
        <circle cx="16" cy="20" r="1" fill="currentColor" opacity="0.4" />
      </g>
    </MotionIcon>
  )
}
