"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader3DotsRotateProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 3 Dots Rotate Loader
 * CSS-animated SVG loader icon
 */
export function Loader3DotsRotate({
  size = 24,
  className,
  ...props
}: Loader3DotsRotateProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="3 Dots Rotate loading indicator"
      {...props}
    >
      <style>.spinner_HIK5{transform-origin:center;animation:spinner_XVY9 1s cubic-bezier(0.36,.6,.31,1) infinite}@keyframes spinner_XVY9{50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}</style><circle cx="12" cy="12" r="3"/><g className="spinner_HIK5"><circle cx="4" cy="12" r="3"/><circle cx="20" cy="12" r="3"/></g>
    </svg>
  );
}
