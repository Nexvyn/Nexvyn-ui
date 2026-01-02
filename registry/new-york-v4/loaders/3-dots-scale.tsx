"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader3DotsScaleProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 3 Dots Scale Loader
 * CSS-animated SVG loader icon
 */
export function Loader3DotsScale({
  size = 24,
  className,
  ...props
}: Loader3DotsScaleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="3 Dots Scale loading indicator"
      {...props}
    >
      <style>
        {`.spinner_b2T7{animation:spinner_xe7Q .8s linear infinite}.spinner_YRVV{animation-delay:-.65s}.spinner_c9oY{animation-delay:-.5s}@keyframes spinner_xe7Q{93.75%,100%{r:3px}46.875%{r:.2px}}`}
      </style>
      <circle className="spinner_b2T7" cx="4" cy="12" r="3"/>
        <circle className="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3"/>
        <circle className="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3"/>
    </svg>
  );
}
