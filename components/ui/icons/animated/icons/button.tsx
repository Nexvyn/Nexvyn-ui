"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Button Icon
 * Visual: Rounded rectangle with pointer cursor + shadow depth
 * Animation: 3D press with shadow and scale
 */
export function ButtonIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.press} {...props}>
      {/* Shadow layer for depth */}
      <motion.rect
        x="4.5"
        y="8.5"
        width="16"
        height="8"
        rx="2"
        fill="currentColor"
        opacity="0.1"
        stroke="none"
        variants={{
          idle: { y: 9, scaleY: 0.3 },
          hover: { y: 9.5, scaleY: 0.4 },
          active: { y: 9, scaleY: 0.2 },
        }}
        style={{ originY: 0 }}
      />

      {/* Button rectangle */}
      <motion.rect
        x="4"
        y="8"
        width="16"
        height="8"
        rx="2"
        variants={{
          idle: { scale: 1, y: 0 },
          hover: { scale: 1.05, y: -0.5 },
          active: { scale: 0.98, y: 0.5 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />

      {/* Cursor pointer icon inside */}
      <motion.g
        variants={{
          idle: { opacity: 0.6 },
          hover: { opacity: 1 },
          active: { opacity: 0.8 },
        }}
      >
        <path d="M10 12 L14 12" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 10 L12 14" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
    </MotionIcon>
  )
}
