"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader8DotsRotateProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 8 Dots Rotate Loader
 * CSS-animated SVG loader icon
 */
export function Loader8DotsRotate({
  size = 24,
  className,
  ...props
}: Loader8DotsRotateProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="8 Dots Rotate loading indicator"
      {...props}
    >
      <style>
        {`.spinner_GuJz{transform-origin:center;animation:spinner_STY6 1.5s linear infinite}@keyframes spinner_STY6{100%{transform:rotate(360deg)}}`}
      </style>
      <g className="spinner_GuJz">
        <circle cx="3" cy="12" r="2"/>
        <circle cx="21" cy="12" r="2"/>
        <circle cx="12" cy="21" r="2"/>
        <circle cx="12" cy="3" r="2"/>
        <circle cx="5.64" cy="5.64" r="2"/>
        <circle cx="18.36" cy="18.36" r="2"/>
        <circle cx="5.64" cy="18.36" r="2"/>
        <circle cx="18.36" cy="5.64" r="2"/>
        </g>
    </svg>
  );
}
