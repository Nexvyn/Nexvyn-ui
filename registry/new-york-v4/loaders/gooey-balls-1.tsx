"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface GooeyBalls1LoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Gooey Balls 1 Loader
 * CSS-animated SVG loader icon
 */
export function GooeyBalls1Loader({
  size = 24,
  className,
  ...props
}: GooeyBalls1LoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Gooey Balls 1 loading indicator"
      {...props}
    >
      <style>.spinner_mHwL{animation:spinner_OeFQ .75s cubic-bezier(0.56,.52,.17,.98) infinite}.spinner_ote2{animation:spinner_ZEPt .75s cubic-bezier(0.56,.52,.17,.98) infinite}@keyframes spinner_OeFQ{0%{cx:4px;r:3px}50%{cx:9px;r:8px}}@keyframes spinner_ZEPt{0%{cx:15px;r:8px}50%{cx:20px;r:3px}}</style><defs><filter id="spinner-gF00"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="y"/><feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z"/><feBlend in="SourceGraphic" in2="z"/></filter></defs><g filter="url(#spinner-gF00)"><circle className="spinner_mHwL" cx="4" cy="12" r="3"/><circle className="spinner_ote2" cx="15" cy="12" r="8"/></g>
    </svg>
  );
}
