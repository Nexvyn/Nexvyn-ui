"use client"

import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export interface BarsLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Bars Loader
 * CSS-animated SVG loader icon
 */
export function BarsLoader({ size = 24, className, ...props }: BarsLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Bars loading indicator"
      {...props}
    >
      <rect y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="60" width="15" height="140" rx="6">
        <animate
          attributeName="height"
          begin="0s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="90" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="120" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  )
}
