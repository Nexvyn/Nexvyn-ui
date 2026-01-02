"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface BarsScaleLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Bars Scale Loader
 * CSS-animated SVG loader icon
 */
export function BarsScaleLoader({
  size = 24,
  className,
  ...props
}: BarsScaleLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Bars Scale loading indicator"
      {...props}
    >
      <style>
        {`.spinner_jCIR{animation:spinner_B8Vq .9s linear infinite;animation-delay:-.9s}.spinner_upm8{animation-delay:-.8s}.spinner_2eL5{animation-delay:-.7s}.spinner_Rp9l{animation-delay:-.6s}.spinner_dy3W{animation-delay:-.5s}@keyframes spinner_B8Vq{0%,66.66%{animation-timing-function:cubic-bezier(0.36,.61,.3,.98);y:6px;height:12px}33.33%{animation-timing-function:cubic-bezier(0.36,.61,.3,.98);y:1px;height:22px}}`}
      </style>
      <rect className="spinner_jCIR" x="1" y="6" width="2.8" height="12"/>
        <rect className="spinner_jCIR spinner_upm8" x="5.8" y="6" width="2.8" height="12"/>
        <rect className="spinner_jCIR spinner_2eL5" x="10.6" y="6" width="2.8" height="12"/>
        <rect className="spinner_jCIR spinner_Rp9l" x="15.4" y="6" width="2.8" height="12"/>
        <rect className="spinner_jCIR spinner_dy3W" x="20.2" y="6" width="2.8" height="12"/>
    </svg>
  );
}
