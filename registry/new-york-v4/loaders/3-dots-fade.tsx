"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader3DotsFadeProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 3 Dots Fade Loader
 * CSS-animated SVG loader icon
 */
export function Loader3DotsFade({
  size = 24,
  className,
  ...props
}: Loader3DotsFadeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="3 Dots Fade loading indicator"
      {...props}
    >
      <style>
        {`.spinner_S1WN{animation:spinner_MGfb .8s linear infinite;animation-delay:-.8s}.spinner_Km9P{animation-delay:-.65s}.spinner_JApP{animation-delay:-.5s}@keyframes spinner_MGfb{93.75%,100%{opacity:.2}}`}
      </style>
      <circle className="spinner_S1WN" cx="4" cy="12" r="3"/>
        <circle className="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3"/>
        <circle className="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3"/>
    </svg>
  );
}
