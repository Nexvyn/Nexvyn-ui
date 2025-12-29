"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Menu/Hamburger Icon
 * Visual: Three horizontal lines
 * Animation: Transforms to X (close icon) with spring
 */
export function MenuIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Top line */}
      <motion.line
        x1="4"
        y1="8"
        x2="20"
        y2="8"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          idle: { rotate: 0, y: 0 },
          hover: { rotate: 45, y: 4 },
          active: { rotate: 45, y: 4 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Middle line */}
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          idle: { opacity: 1, scale: 1 },
          hover: { opacity: 0, scale: 0 },
          active: { opacity: 0, scale: 0 },
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Bottom line */}
      <motion.line
        x1="4"
        y1="16"
        x2="20"
        y2="16"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          idle: { rotate: 0, y: 0 },
          hover: { rotate: -45, y: -4 },
          active: { rotate: -45, y: -4 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </MotionIcon>
  )
}
