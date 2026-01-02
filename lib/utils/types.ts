import React from "react"

/**
 * Shared TypeScript types and interfaces
 */

/**
 * Common size prop type
 */
export type Size = "sm" | "md" | "lg"

/**
 * Common variant prop type
 */
export type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive"

/**
 * Base component props with className and children
 */
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

/**
 * Component with ref forwarding
 */
export type ComponentWithRef<T, P = {}> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>

/**
 * Polymorphic component props
 */
export type PolymorphicComponentProps<T extends React.ElementType, Props = {}> = {
  as?: T
} & Props &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props>

/**
 * Utility type for making specific props optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Utility type for making specific props required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>
