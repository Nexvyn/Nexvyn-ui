"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Calendar Icon
 * Visual: Grid with 7 small squares and header line
 * Animation: Grid cells fill sequentially + header expands
 */
export function CalendarIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Calendar container */}
      <motion.rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.05 },
          active: { scale: 0.95 },
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Top bar (expands) */}
      <motion.line
        x1="3"
        y1="9"
        x2="21"
        y2="9"
        strokeWidth="1.5"
        variants={{
          idle: { pathLength: 1 },
          hover: { pathLength: 1.1, opacity: 1 },
          active: { pathLength: 0.9, opacity: 0.8 },
        }}
      />

      {/* Date squares (7 cells) */}
      <g>
        {[0, 1, 2, 3, 4, 5, 6].map((index) => (
          <motion.rect
            key={index}
            x={5 + (index % 4) * 4}
            y={11 + Math.floor(index / 4) * 4}
            width="2"
            height="2"
            rx="0.5"
            fill="currentColor"
            stroke="none"
            variants={{
              idle: { opacity: 0.3, scale: 0.8 },
              hover: { opacity: 1, scale: 1.2 },
              active: { opacity: 0.6, scale: 1 },
            }}
            transition={{
              duration: 0.2,
              delay: index * 0.04, // Wave effect
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          />
        ))}
      </g>
    </MotionIcon>
  )
}
