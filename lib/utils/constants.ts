/**
 * Shared constants used across the UI library
 */

/**
 * Component size variants
 */
export const COMPONENT_SIZES = ["sm", "md", "lg"] as const
export type ComponentSize = (typeof COMPONENT_SIZES)[number]

/**
 * Color variants
 */
export const COLOR_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
] as const
export type ColorVariant = (typeof COLOR_VARIANTS)[number]

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

/**
 * Z-index layers
 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const
