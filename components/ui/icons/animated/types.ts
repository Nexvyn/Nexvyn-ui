import { ComponentProps } from "react"
import { Variants } from "framer-motion"

export interface BaseIconProps extends Omit<ComponentProps<"svg">, "ref"> {
  /**
   * Icon size in pixels
   * @default 20
   */
  size?: number

  /**
   * Whether this icon represents the currently active/selected item
   * @default false
   */
  isActive?: boolean

  /**
   * Stroke width for the icon
   * @default 1.5
   */
  strokeWidth?: number

  /**
   * Additional CSS classes
   */
  className?: string
}

export interface MotionIconProps extends BaseIconProps {
  /**
   * Framer Motion animation variants
   */
  variants?: Variants

  /**
   * Children SVG elements
   */
  children: React.ReactNode
}

export type IconComponent = (props: BaseIconProps) => React.JSX.Element
