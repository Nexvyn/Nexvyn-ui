"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Checkbox Icon
 * Visual: Square with checkmark and fill
 * Animation: Box fills + checkmark draws + scale bounce
 */
export function CheckboxIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.press} {...props}>
      {/* Checkbox square */}
      <motion.rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="2"
        variants={{
          idle: { strokeWidth: 1.5 },
          hover: { strokeWidth: 2, scale: 1.05 },
          active: { strokeWidth: 1.5, scale: 0.95 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
      />

      {/* Fill layer */}
      <motion.rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="2"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { opacity: 0, scale: 0.8 },
          hover: { opacity: 0.1, scale: 1 },
          active: { opacity: 1, scale: 1 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.2 }}
      />

      {/* Checkmark path */}
      <motion.path
        d="M8 12 L11 15 L16 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: {
            pathLength: 0,
            opacity: 0,
            stroke: "currentColor",
          },
          hover: {
            pathLength: 1,
            opacity: 1,
            stroke: "currentColor",
            transition: { duration: 0.3, ease: "easeInOut" },
          },
          active: {
            pathLength: 1,
            opacity: 1,
            stroke: "var(--background)", // Invert color on active fill
          },
        }}
      />
    </MotionIcon>
  )
}
