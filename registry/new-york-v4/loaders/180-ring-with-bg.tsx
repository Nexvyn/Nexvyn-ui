"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader180RingWithBgProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 180 Ring With Bg Loader
 * CSS-animated SVG loader icon
 */
export function Loader180RingWithBg({
  size = 24,
  className,
  ...props
}: Loader180RingWithBgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="180 Ring With Bg loading indicator"
      {...props}
    >
      <style>
        {`.spinner_z9k8{transform-origin:center;animation:spinner_StKS .75s infinite linear}@keyframes spinner_StKS{100%{transform:rotate(360deg)}}`}
      </style>
      <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
        <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" className="spinner_z9k8"/>
    </svg>
  );
}
