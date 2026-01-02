"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface PulseMultipleLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Pulse Multiple Loader
 * CSS-animated SVG loader icon
 */
export function PulseMultipleLoader({
  size = 24,
  className,
  ...props
}: PulseMultipleLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Pulse Multiple loading indicator"
      {...props}
    >
      <style>.spinner_98HH{animation:spinner_mnRT 1.6s cubic-bezier(0.52,.6,.25,.99) infinite}.spinner_roCJ{animation-delay:.2s}.spinner_q4Oo{animation-delay:.4s}@keyframes spinner_mnRT{0%{r:0;opacity:1}75%,100%{r:11px;opacity:0}}</style><circle className="spinner_98HH" cx="12" cy="12" r="0"/><circle className="spinner_98HH spinner_roCJ" cx="12" cy="12" r="0"/><circle className="spinner_98HH spinner_q4Oo" cx="12" cy="12" r="0"/>
    </svg>
  );
}
