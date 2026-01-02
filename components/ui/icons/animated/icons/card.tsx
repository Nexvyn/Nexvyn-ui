"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Card Icon
 * Visual: Rounded rectangle with folded corner + shadow
 * Animation: Corner fold lifts + shadow shifts + subtle tilt
 */
export function CardIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.popRotate} {...props}>
      {/* Shadow layer */}
      <motion.rect
        x="4.5"
        y="6.5"
        width="16"
        height="12"
        rx="2"
        fill="currentColor"
        opacity="0.08"
        stroke="none"
        variants={{
          idle: { x: 4.5, y: 6.5 },
          hover: { x: 4.8, y: 6.8 },
          active: { x: 4.6, y: 6.6 },
        }}
      />

      {/* Main card body */}
      <motion.rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.02 },
          active: { scale: 1.01 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
      />

      {/* Folded corner shadow */}
      <motion.path
        d="M17 6 L20 6 L20 9 L17 6 Z"
        fill="currentColor"
        opacity="0.1"
        stroke="none"
        variants={{
          idle: { scale: 1, originX: 1, originY: 0 },
          hover: { scale: 1.15, originX: 1, originY: 0 },
          active: { scale: 1.08, originX: 1, originY: 0 },
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Folded corner */}
      <motion.path
        d="M16 6 L20 6 L20 10 L16 6 Z"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { scale: 1, rotate: 0, originX: 1, originY: 0 },
          hover: { scale: 1.25, rotate: 5, originX: 1, originY: 0 },
          active: { scale: 1.15, rotate: 3, originX: 1, originY: 0 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      />

      {/* Inner content lines */}
      <motion.g
        variants={{
          idle: { opacity: 0.4 },
          hover: { opacity: 0.6 },
          active: { opacity: 0.5 },
        }}
      >
        <line x1="7" y1="10" x2="13" y2="10" strokeWidth="1" />
        <line x1="7" y1="13" x2="17" y2="13" strokeWidth="1" />
        <line x1="7" y1="15" x2="14" y2="15" strokeWidth="0.5" opacity="0.7" />
      </motion.g>
    </MotionIcon>
  )
}
