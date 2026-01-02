"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Pulse3LoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Pulse 3 Loader
 * CSS-animated SVG loader icon
 */
export function Pulse3Loader({
  size = 24,
  className,
  ...props
}: Pulse3LoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Pulse 3 loading indicator"
      {...props}
    >
      <style>
        {`.spinner_VpEe{animation:spinner_vXu6 1.2s cubic-bezier(0.52,.6,.25,.99) infinite}.spinner_eahp{animation-delay:.4s}.spinner_f7Y2{animation-delay:.8s}@keyframes spinner_vXu6{0%{r:0;opacity:1}100%{r:11px;opacity:0}}`}
      </style>
      <circle className="spinner_VpEe" cx="12" cy="12" r="0"/>
        <circle className="spinner_VpEe spinner_eahp" cx="12" cy="12" r="0"/>
        <circle className="spinner_VpEe spinner_f7Y2" cx="12" cy="12" r="0"/>
    </svg>
  );
}
