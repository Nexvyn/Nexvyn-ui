"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Chart Icon
 * Visual: Three ascending bars with axes + fill effect
 * Animation: Bars grow from bottom with spring physics
 */
export function ChartIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Y-axis */}
      <line x1="4" y1="20" x2="4" y2="4" strokeWidth="1.5" />

      {/* X-axis */}
      <line x1="4" y1="20" x2="20" y2="20" strokeWidth="1.5" />

      {/* Bar 1 (shortest) - with fill */}
      <motion.rect
        x="7"
        y="14"
        width="3"
        height="6"
        rx="0.5"
        fill="currentColor"
        fillOpacity="0.15"
        variants={{
          idle: { scaleY: 1 },
          hover: { scaleY: 1.25 },
          active: { scaleY: 1.15 },
        }}
        style={{ originY: 1, originX: 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0 }}
      />

      <motion.rect
        x="7"
        y="14"
        width="3"
        height="6"
        rx="0.5"
        fill="none"
        variants={{
          idle: { scaleY: 1 },
          hover: { scaleY: 1.25 },
          active: { scaleY: 1.15 },
        }}
        style={{ originY: 1, originX: 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0 }}
      />

      {/* Bar 2 (medium) - with fill */}
      <motion.rect
        x="12"
        y="10"
        width="3"
        height="10"
        rx="0.5"
        fill="currentColor"
        fillOpacity="0.15"
        variants={{
          idle: { scaleY: 1 },
          hover: { scaleY: 1.25 },
          active: { scaleY: 1.15 },
        }}
        style={{ originY: 1, originX: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.04,
        }}
      />

      <motion.rect
        x="12"
        y="10"
        width="3"
        height="10"
        rx="0.5"
        fill="none"
        variants={{
          idle: { scaleY: 1 },
          hover: { scaleY: 1.25 },
          active: { scaleY: 1.15 },
        }}
        style={{ originY: 1, originX: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.04,
        }}
      />

      {/* Bar 3 (tallest) - with fill */}
      <motion.rect
        x="17"
        y="7"
        width="3"
        height="13"
        rx="0.5"
        fill="currentColor"
        fillOpacity="0.15"
        variants={{
          idle: { scaleY: 1 },
          hover: { scaleY: 1.25 },
          active: { scaleY: 1.15 },
        }}
        style={{ originY: 1, originX: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.08,
        }}
      />

      <motion.rect
        x="17"
        y="7"
        width="3"
        height="13"
        rx="0.5"
        fill="none"
        variants={{
          idle: { scaleY: 1 },
          hover: { scaleY: 1.25 },
          active: { scaleY: 1.15 },
        }}
        style={{ originY: 1, originX: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.08,
        }}
      />
    </MotionIcon>
  )
}
