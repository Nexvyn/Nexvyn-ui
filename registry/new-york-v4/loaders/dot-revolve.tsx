"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface DotRevolveLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Dot Revolve Loader
 * CSS-animated SVG loader icon
 */
export function DotRevolveLoader({
  size = 24,
  className,
  ...props
}: DotRevolveLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Dot Revolve loading indicator"
      {...props}
    >
      <style>.spinner_7WDj{transform-origin:center;animation:spinner_PBVY .75s linear infinite}@keyframes spinner_PBVY{100%{transform:rotate(360deg)}}</style><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><circle className="spinner_7WDj" cx="12" cy="2.5" r="1.5"/>
    </svg>
  );
}
