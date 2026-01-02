"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Data Table Icon
 * Visual: Grid with 3 rows and 3 columns, header highlighted
 * Animation: Row by row highlight sweep
 */
export function DataTableIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Table container */}
      <rect x="3" y="4" width="18" height="16" rx="1.5" />

      {/* Header row separator */}
      <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1.5" />

      {/* Vertical separators */}
      <line x1="9" y1="4" x2="9" y2="20" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="4" x2="15" y2="20" strokeWidth="1" opacity="0.5" />

      {/* Horizontal row separators */}
      <line x1="3" y1="13.5" x2="21" y2="13.5" strokeWidth="1" opacity="0.5" />
      <line x1="3" y1="16.5" x2="21" y2="16.5" strokeWidth="1" opacity="0.5" />

      {/* Row highlights (animated) */}
      {[0, 1, 2].map((index) => (
        <motion.rect
          key={index}
          x="3.5"
          y={9.5 + index * 3.5}
          width="17"
          height="3"
          rx="0.5"
          fill="currentColor"
          stroke="none"
          variants={{
            idle: { opacity: 0 },
            hover: { opacity: 0.15 },
            active: { opacity: 0.1 },
          }}
          transition={{
            duration: 0.15,
            delay: index * 0.05,
          }}
        />
      ))}
    </MotionIcon>
  )
}
