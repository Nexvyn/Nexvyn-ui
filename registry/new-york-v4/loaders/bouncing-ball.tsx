"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface BouncingBallLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Bouncing Ball Loader
 * CSS-animated SVG loader icon
 */
export function BouncingBallLoader({
  size = 24,
  className,
  ...props
}: BouncingBallLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Bouncing Ball loading indicator"
      {...props}
    >
      <style>
        {`.spinner_rXNP{animation:spinner_YeBj .8s infinite}@keyframes spinner_YeBj{0%{animation-timing-function:cubic-bezier(0.33,0,.66,.33);cy:5px}46.875%{cy:20px;rx:4px;ry:4px}50%{animation-timing-function:cubic-bezier(0.33,.66,.66,1);cy:20.5px;rx:4.8px;ry:3px}53.125%{rx:4px;ry:4px}100%{cy:5px}}`}
      </style>
      <ellipse className="spinner_rXNP" cx="12" cy="5" rx="4" ry="4"/>
    </svg>
  );
}
