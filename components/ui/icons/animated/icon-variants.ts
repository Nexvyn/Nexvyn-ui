import { Variants } from "framer-motion"

/**
 * Easing functions for icon animations
 * All timings are optimized for 18-24px icon sizes
 */
export const iconEasing = {
  /** Default easing for most hover states - cubic bezier */
  default: [0.25, 0.1, 0.25, 1] as const,

  /** Fast, decisive easing for active/pressed states */
  active: [0.4, 0, 0.2, 1] as const,

  /** Smooth exit animation */
  exit: [0.4, 0, 1, 1] as const,

  /** Spring physics for organic motion */
  spring: { type: "spring" as const, stiffness: 300, damping: 20 },
} as const

/**
 * Shared animation variants for icon components
 * Each variant defines idle, hover, and active states
 */
export const iconVariants = {
  /**
   * Scale with subtle rotation
   * Best for: Dialogs, Buttons, Cards
   */
  popRotate: {
    idle: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2, ease: iconEasing.default },
    },
    active: {
      scale: 1.05,
      rotate: 0,
      transition: { duration: 0.15, ease: iconEasing.active },
    },
  } satisfies Variants,

  /**
   * Vertical bounce effect
   * Best for: Alerts, Notifications, Badges
   */
  bounce: {
    idle: { y: 0 },
    hover: {
      y: -2,
      transition: { duration: 0.15, ease: iconEasing.default },
    },
    active: {
      y: 0,
      transition: { duration: 0.1, ease: iconEasing.exit },
    },
  } satisfies Variants,

  /**
   * Pulse animation with scale and opacity
   * Best for: Active states, Command palette
   */
  pulse: {
    idle: { scale: 1, opacity: 1 },
    hover: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.3, ease: iconEasing.default },
    },
    active: {
      scale: 1,
      opacity: [1, 0.9, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  } satisfies Variants,

  /**
   * Depth press effect (3D button press)
   * Best for: Buttons, Checkboxes, Interactive elements
   */
  press: {
    idle: { y: 0, scale: 1 },
    hover: {
      y: 0,
      scale: 1.05,
      transition: { duration: 0.2, ease: iconEasing.default },
    },
    active: {
      y: 1,
      scale: 0.98,
      transition: { duration: 0.1, ease: iconEasing.active },
    },
  } satisfies Variants,

  /**
   * Horizontal slide motion
   * Best for: Navigation, Breadcrumbs, Context menus
   */
  slideRight: {
    idle: { x: 0 },
    hover: {
      x: 2,
      transition: { duration: 0.2, ease: iconEasing.default },
    },
    active: {
      x: 0,
      transition: { duration: 0.15, ease: iconEasing.exit },
    },
  } satisfies Variants,

  /**
   * Gentle scale up
   * Best for: Avatars, Images, Media components
   */
  scaleUp: {
    idle: { scale: 1 },
    hover: {
      scale: 1.15,
      transition: { duration: 0.2, ease: iconEasing.default },
    },
    active: {
      scale: 1.1,
      transition: { duration: 0.15, ease: iconEasing.active },
    },
  } satisfies Variants,

  /**
   * Rotation effect
   * Best for: Collapsible, Accordions, Dropdowns
   */
  rotate180: {
    idle: { rotate: 0 },
    hover: {
      rotate: 180,
      transition: { duration: 0.3, ease: iconEasing.default },
    },
    active: {
      rotate: 180,
      transition: { duration: 0.25, ease: iconEasing.active },
    },
  } satisfies Variants,

  /**
   * No animation (instant transition)
   * Used when prefers-reduced-motion is enabled
   */
  none: {
    idle: {},
    hover: {},
    active: {},
  } satisfies Variants,
} as const

/**
 * Animation configuration constants
 */
export const ANIMATION_CONFIG = {
  /** Base duration for most animations */
  baseDuration: 0.15,

  /** Hover state duration */
  hoverDuration: 0.2,

  /** Active/pressed state duration */
  activeDuration: 0.1,

  /** Default stroke width */
  defaultStrokeWidth: 1.5,

  /** Active stroke width */
  activeStrokeWidth: 2,

  /** Minimum scale factor */
  minScale: 0.9,

  /** Maximum scale factor */
  maxScale: 1.15,

  /** Maximum rotation in degrees */
  maxRotation: 15,

  /** Maximum translation in pixels */
  maxTranslate: 3,
} as const
