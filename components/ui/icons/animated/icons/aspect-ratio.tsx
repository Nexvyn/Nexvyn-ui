"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Aspect Ratio Icon
 * Visual: Rectangle with corner brackets
 * Animation: Corner brackets expand outward
 */
export function AspectRatioIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Main rectangle */}
      <rect x="5" y="7" width="14" height="10" rx="1" />

      {/* Top-left bracket */}
      <motion.g
        variants={{
          idle: { scale: 1, originX: 0, originY: 0 },
          hover: { scale: 1.15, originX: 0, originY: 0 },
          active: { scale: 1.1, originX: 0, originY: 0 },
        }}
        transition={{ duration: 0.2 }}
      >
        <path d="M5 7 L3 7 L3 9" strokeWidth="2" />
      </motion.g>

      {/* Top-right bracket */}
      <motion.g
        variants={{
          idle: { scale: 1, originX: 1, originY: 0 },
          hover: { scale: 1.15, originX: 1, originY: 0 },
          active: { scale: 1.1, originX: 1, originY: 0 },
        }}
        transition={{ duration: 0.2 }}
      >
        <path d="M19 7 L21 7 L21 9" strokeWidth="2" />
      </motion.g>

      {/* Bottom-left bracket */}
      <motion.g
        variants={{
          idle: { scale: 1, originX: 0, originY: 1 },
          hover: { scale: 1.15, originX: 0, originY: 1 },
          active: { scale: 1.1, originX: 0, originY: 1 },
        }}
        transition={{ duration: 0.2 }}
      >
        <path d="M5 17 L3 17 L3 15" strokeWidth="2" />
      </motion.g>

      {/* Bottom-right bracket */}
      <motion.g
        variants={{
          idle: { scale: 1, originX: 1, originY: 1 },
          hover: { scale: 1.15, originX: 1, originY: 1 },
          active: { scale: 1.1, originX: 1, originY: 1 },
        }}
        transition={{ duration: 0.2 }}
      >
        <path d="M19 17 L21 17 L21 15" strokeWidth="2" />
      </motion.g>
    </MotionIcon>
  )
}
