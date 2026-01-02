"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface BarsScaleFadeLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Bars Scale Fade Loader
 * CSS-animated SVG loader icon
 */
export function BarsScaleFadeLoader({
  size = 24,
  className,
  ...props
}: BarsScaleFadeLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Bars Scale Fade loading indicator"
      {...props}
    >
      <style>.spinner_hzlK{animation:spinner_vc4H .8s linear infinite;animation-delay:-.8s}.spinner_koGT{animation-delay:-.65s}.spinner_YF1u{animation-delay:-.5s}@keyframes spinner_vc4H{0%{y:1px;height:22px}93.75%{y:5px;height:14px;opacity:.2}}</style><rect className="spinner_hzlK" x="1" y="1" width="6" height="22"/><rect className="spinner_hzlK spinner_koGT" x="9" y="1" width="6" height="22"/><rect className="spinner_hzlK spinner_YF1u" x="17" y="1" width="6" height="22"/>
    </svg>
  );
}
