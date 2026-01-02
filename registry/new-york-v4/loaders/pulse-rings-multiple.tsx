"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface PulseRingsMultipleLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Pulse Rings Multiple Loader
 * CSS-animated SVG loader icon
 */
export function PulseRingsMultipleLoader({
  size = 24,
  className,
  ...props
}: PulseRingsMultipleLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Pulse Rings Multiple loading indicator"
      {...props}
    >
      <style>.spinner_Uvk8{animation:spinner_otJF 1.6s cubic-bezier(.52,.6,.25,.99) infinite}.spinner_ypeD{animation-delay:.2s}.spinner_y0Rj{animation-delay:.4s}@keyframes spinner_otJF{0%{transform:translate(12px,12px) scale(0);opacity:1}75%,100%{transform:translate(0,0) scale(1);opacity:0}}</style><path className="spinner_Uvk8" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"/><path className="spinner_Uvk8 spinner_ypeD" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"/><path className="spinner_Uvk8 spinner_y0Rj" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"/>
    </svg>
  );
}
