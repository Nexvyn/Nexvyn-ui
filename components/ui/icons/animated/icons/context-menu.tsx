"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Context Menu Icon
 * Visual: Three horizontal lines (menu) with right-pointing arrow
 * Animation: Lines shift right, arrow appears
 */
export function ContextMenuIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.slideRight} {...props}>
      {/* Menu lines */}
      <motion.g
        variants={{
          idle: { x: 0 },
          hover: { x: 2 },
          active: { x: 1 },
        }}
        transition={{ duration: 0.2 }}
      >
        <line x1="4" y1="8" x2="14" y2="8" strokeWidth="1.5" />
        <line x1="4" y1="12" x2="14" y2="12" strokeWidth="1.5" />
        <line x1="4" y1="16" x2="14" y2="16" strokeWidth="1.5" />
      </motion.g>

      {/* Right arrow (appears on hover) */}
      <motion.path
        d="M16 10 L19 12 L16 14"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { opacity: 0, x: -3 },
          hover: { opacity: 1, x: 0 },
          active: { opacity: 0.8, x: 0 },
        }}
        transition={{ duration: 0.2 }}
      />
    </MotionIcon>
  )
}
