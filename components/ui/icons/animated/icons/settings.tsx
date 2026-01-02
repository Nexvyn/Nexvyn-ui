"use client"

import { motion, Variants } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 0.6, ease: "easeOut" },
      opacity: { delay, duration: 0.01 },
    },
  }),
}

/**
 * Settings/Gear Icon (Lucide-Animated Style)
 * Animation: Line-drawing effect + smooth rotation on hover
 */
export function SettingsIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      <motion.g
        whileHover={{
          rotate: 180,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        }}
        style={{ originX: "50%", originY: "50%" }}
      >
        {/* Outer gear path */}
        <motion.path
          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          fill="none"
          initial="hidden"
          animate="visible"
          variants={draw}
          custom={0}
        />

        {/* Inner circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          initial="hidden"
          animate="visible"
          variants={draw}
          custom={0.4}
        />
      </motion.g>
    </MotionIcon>
  )
}
