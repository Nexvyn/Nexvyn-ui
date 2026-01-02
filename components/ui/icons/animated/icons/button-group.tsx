"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Button Group Icon
 * Visual: Three rounded rectangles grouped horizontally
 * Animation: Middle button scales while others compress
 */
export function ButtonGroupIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Left button */}
      <motion.rect
        x="3"
        y="9"
        width="5"
        height="6"
        rx="1.5"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 0.95, x: -1 },
          active: { scale: 0.97, x: -0.5 },
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Middle button (highlighted on hover) */}
      <motion.rect
        x="9.5"
        y="9"
        width="5"
        height="6"
        rx="1.5"
        variants={{
          idle: { scale: 1, strokeWidth: 1.5 },
          hover: { scale: 1.1, strokeWidth: 2 },
          active: { scale: 1.05, strokeWidth: 1.75 },
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Right button */}
      <motion.rect
        x="16"
        y="9"
        width="5"
        height="6"
        rx="1.5"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 0.95, x: 1 },
          active: { scale: 0.97, x: 0.5 },
        }}
        transition={{ duration: 0.2 }}
      />
    </MotionIcon>
  )
}
