"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Tabs Icon
 * Visual: Three tab headers
 * Animation: Active tab highlights sequentially
 */
export function TabsIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Tab container */}
      <rect x="3" y="10" width="18" height="10" rx="1.5" opacity="0.3" />

      {/* Tab headers */}
      <motion.rect
        x="3"
        y="6"
        width="5"
        height="4"
        rx="1"
        variants={{
          idle: { opacity: 0.5 },
          hover: { opacity: 1 },
          active: { opacity: 0.8 },
        }}
        transition={{ delay: 0 }}
      />

      <motion.rect
        x="9.5"
        y="6"
        width="5"
        height="4"
        rx="1"
        variants={{
          idle: { opacity: 0.3 },
          hover: { opacity: 1 },
          active: { opacity: 0.6 },
        }}
        transition={{ delay: 0.1 }}
      />

      <motion.rect
        x="16"
        y="6"
        width="5"
        height="4"
        rx="1"
        variants={{
          idle: { opacity: 0.3 },
          hover: { opacity: 1 },
          active: { opacity: 0.6 },
        }}
        transition={{ delay: 0.2 }}
      />

      {/* Active indicator */}
      <motion.line
        x1="3"
        y1="10"
        x2="8"
        y2="10"
        strokeWidth="2"
        variants={{
          idle: { x2: 8 },
          hover: { x2: 14.5 },
          active: { x2: 21 },
        }}
        transition={{ duration: 0.3 }}
      />
    </MotionIcon>
  )
}
