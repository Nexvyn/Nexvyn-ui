"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader270RingWithBgProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 270 Ring With Bg Loader
 * CSS-animated SVG loader icon
 */
export function Loader270RingWithBg({
  size = 24,
  className,
  ...props
}: Loader270RingWithBgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="270 Ring With Bg loading indicator"
      {...props}
    >
      <style>
        {`.spinner_5nOS{transform-origin:center;animation:spinner_sEAn .75s infinite linear}@keyframes spinner_sEAn{100%{transform:rotate(360deg)}}`}
      </style>
      <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
        <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" className="spinner_5nOS"/>
    </svg>
  );
}
