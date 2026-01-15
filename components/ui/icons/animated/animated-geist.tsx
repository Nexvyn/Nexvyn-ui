"use client"

import { motion, useReducedMotion } from "motion/react"
import { iconVariants } from "@/components/ui/icons/animated/icon-variants"
import { cn } from "@/lib/utils"
import type { ComponentType } from "react"

/**
 * Props for Geist icons from @geist-ui/icons
 */
interface GeistIconProps {
  size?: number
  color?: string
  strokeWidth?: number
}

/**
 * Available animation variants
 */
export type AnimationVariant =
  | "popRotate"
  | "bounce"
  | "pulse"
  | "press"
  | "slideRight"
  | "scaleUp"
  | "rotate180"
  | "none"

/**
 * Props for AnimatedGeistIcon
 */
export interface AnimatedGeistIconProps {
  /** The Geist icon component to animate */
  icon: ComponentType<GeistIconProps>
  /** Icon size */
  size?: number
  /** Icon color */
  color?: string
  /** Stroke width */
  strokeWidth?: number
  /** Whether the icon is in active state */
  isActive?: boolean
  /** Animation variant to use */
  variant?: AnimationVariant
  /** Additional CSS classes */
  className?: string
}

/**
 * Animated wrapper for any Geist UI icon
 *
 * Takes any icon from @geist-ui/icons and adds smooth animations
 * with hover, active states, and reduced motion support.
 *
 * @example
 * ```tsx
 * import { Download, Github, Check } from '@geist-ui/icons'
 * import { AnimatedGeistIcon } from '@/components/ui/icons/animated-geist'
 *
 * // With popRotate animation
 * <AnimatedGeistIcon icon={Download} variant="popRotate" />
 *
 * // With bounce animation
 * <AnimatedGeistIcon icon={Check} variant="bounce" isActive={true} />
 *
 * // With custom size and color
 * <AnimatedGeistIcon
 *   icon={Github}
 *   size={24}
 *   color="#0070f3"
 *   variant="scaleUp"
 * />
 * ```
 */
export function AnimatedGeistIcon({
  icon: Icon,
  size = 20,
  color,
  strokeWidth = 1.5,
  isActive = false,
  variant = "scaleUp",
  className,
}: AnimatedGeistIconProps) {
  const shouldReduceMotion = useReducedMotion()

  // Use no animation variant if user prefers reduced motion
  const effectiveVariants = shouldReduceMotion ? iconVariants.none : iconVariants[variant]

  return (
    <motion.div
      initial="idle"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      animate={isActive ? "active" : "idle"}
      variants={effectiveVariants}
      className={cn(
        "inline-flex flex-shrink-0 items-center justify-center",
        "will-change-transform",
        className
      )}
      // Accessibility
      role="img"
      aria-hidden="true"
    >
      <Icon size={size} color={color} strokeWidth={strokeWidth} />
    </motion.div>
  )
}

/**
 * Create an animated version of a Geist icon with preset configuration
 *
 * @example
 * ```tsx
 * import { Download } from '@geist-ui/icons'
 * import { createAnimatedIcon } from '@/components/ui/icons/animated-geist'
 *
 * export const AnimatedDownload = createAnimatedIcon(Download, {
 *   variant: 'bounce',
 *   size: 20
 * })
 *
 * // Use it
 * <AnimatedDownload isActive={downloading} />
 * ```
 */
export function createAnimatedIcon(
  icon: ComponentType<GeistIconProps>,
  defaultProps: Partial<AnimatedGeistIconProps> = {}
) {
  return function AnimatedIcon(props: Partial<AnimatedGeistIconProps>) {
    return <AnimatedGeistIcon icon={icon} {...defaultProps} {...props} />
  }
}
