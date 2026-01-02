"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface EclipseHalfLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Eclipse Half Loader
 * CSS-animated SVG loader icon
 */
export function EclipseHalfLoader({
  size = 24,
  className,
  ...props
}: EclipseHalfLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Eclipse Half loading indicator"
      {...props}
    >
      <style>.spinner_Pcrv{transform-origin:center;animation:spinner_xeMo .6s linear infinite}@keyframes spinner_xeMo{100%{transform:rotate(360deg)}}</style><path className="spinner_Pcrv" d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"/>
    </svg>
  );
}
