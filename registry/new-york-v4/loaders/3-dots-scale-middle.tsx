"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader3DotsScaleMiddleProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 3 Dots Scale Middle Loader
 * CSS-animated SVG loader icon
 */
export function Loader3DotsScaleMiddle({
  size = 24,
  className,
  ...props
}: Loader3DotsScaleMiddleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="3 Dots Scale Middle loading indicator"
      {...props}
    >
      <style>
        {`.spinner_I8Q1{animation:spinner_qhi1 .75s linear infinite}.spinner_vrS7{animation-delay:-.375s}@keyframes spinner_qhi1{0%,100%{r:1.5px}50%{r:3px}}`}
      </style>
      <circle className="spinner_I8Q1" cx="4" cy="12" r="1.5"/>
        <circle className="spinner_I8Q1 spinner_vrS7" cx="12" cy="12" r="3"/>
        <circle className="spinner_I8Q1" cx="20" cy="12" r="1.5"/>
    </svg>
  );
}
