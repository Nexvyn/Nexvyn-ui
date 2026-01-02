"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Input Icon
 * Visual: Text input field with cursor
 * Animation: Cursor blinks + field highlight
 */
export function InputIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Input field */}
      <motion.rect
        x="4"
        y="9"
        width="16"
        height="6"
        rx="1.5"
        variants={{
          idle: { strokeWidth: 1.5 },
          hover: { strokeWidth: 2 },
          active: { strokeWidth: 1.75 },
        }}
      />

      {/* Text cursor (blinking) */}
      <motion.line
        x1="7"
        y1="11"
        x2="7"
        y2="13"
        strokeWidth="1.5"
        variants={{
          idle: { opacity: 0.5 },
          hover: { opacity: [0.5, 1, 0.5] },
          active: { opacity: [0.5, 1, 0.5] },
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Placeholder text lines */}
      <line x1="10" y1="11.5" x2="17" y2="11.5" strokeWidth="0.5" opacity="0.3" />
      <line x1="10" y1="12.5" x2="14" y2="12.5" strokeWidth="0.5" opacity="0.3" />
    </MotionIcon>
  )
}
