"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Accordion Icon
 * Visual: Stacked panels with expand indicators
 * Animation: Middle panel expands with chevron rotation
 */
export function AccordionIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Panel 1 */}
      <rect x="4" y="5" width="16" height="3" rx="1" opacity="0.5" />

      {/* Panel 2 (expandable) */}
      <motion.rect
        x="4"
        y="9"
        width="16"
        height="3"
        rx="1"
        variants={{
          idle: { scaleY: 1, originY: 0 },
          hover: { scaleY: 2, originY: 0 },
          active: { scaleY: 1.5, originY: 0 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Chevron on panel 2 */}
      <motion.path
        d="M10 10 L12 11 L14 10"
        strokeWidth="1"
        variants={{
          idle: { rotate: 0, opacity: 0.7 },
          hover: { rotate: 180, opacity: 1 },
          active: { rotate: 180, opacity: 0.9 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Panel 3 */}
      <motion.rect
        x="4"
        y="13"
        width="16"
        height="3"
        rx="1"
        opacity="0.5"
        variants={{
          idle: { y: 13 },
          hover: { y: 16 },
          active: { y: 14.5 },
        }}
      />
    </MotionIcon>
  )
}
