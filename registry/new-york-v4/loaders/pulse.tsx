"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface PulseLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Pulse Loader
 * CSS-animated SVG loader icon
 */
export function PulseLoader({
  size = 24,
  className,
  ...props
}: PulseLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Pulse loading indicator"
      {...props}
    >
      <style>
        {`.spinner_7NYg{animation:spinner_0KQs 1.2s cubic-bezier(0.52,.6,.25,.99) infinite}@keyframes spinner_0KQs{0%{r:0;opacity:1}100%{r:11px;opacity:0}}`}
      </style>
      <circle className="spinner_7NYg" cx="12" cy="12" r="0"/>
    </svg>
  );
}
