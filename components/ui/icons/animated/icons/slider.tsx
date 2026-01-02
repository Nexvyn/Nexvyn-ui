"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Slider Icon
 * Visual: Horizontal track with handle
 * Animation: Handle slides along track
 */
export function SliderIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Track */}
      <line x1="6" y1="12" x2="18" y2="12" strokeWidth="2" opacity="0.3" />

      {/* Filled track */}
      <motion.line
        x1="6"
        y1="12"
        x2="10"
        y2="12"
        strokeWidth="2"
        variants={{
          idle: { x2: 10 },
          hover: { x2: 18 },
          active: { x2: 14 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Handle */}
      <motion.circle
        cx="10"
        cy="12"
        r="2.5"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { x: 0, scale: 1 },
          hover: { x: 8, scale: 1.2 },
          active: { x: 4, scale: 1.1 },
        }}
        transition={{ duration: 0.3 }}
      />
    </MotionIcon>
  )
}
