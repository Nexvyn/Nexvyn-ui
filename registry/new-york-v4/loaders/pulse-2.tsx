"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Pulse2LoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Pulse 2 Loader
 * CSS-animated SVG loader icon
 */
export function Pulse2Loader({
  size = 24,
  className,
  ...props
}: Pulse2LoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Pulse 2 loading indicator"
      {...props}
    >
      <style>.spinner_ZCsl{animation:spinner_qV4G 1.2s cubic-bezier(0.52,.6,.25,.99) infinite}.spinner_gaIW{animation-delay:.6s}@keyframes spinner_qV4G{0%{r:0;opacity:1}100%{r:11px;opacity:0}}</style><circle className="spinner_ZCsl" cx="12" cy="12" r="0"/><circle className="spinner_ZCsl spinner_gaIW" cx="12" cy="12" r="0"/>
    </svg>
  );
}
