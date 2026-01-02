"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface PulseRings2LoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Pulse Rings 2 Loader
 * CSS-animated SVG loader icon
 */
export function PulseRings2Loader({
  size = 24,
  className,
  ...props
}: PulseRings2LoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Pulse Rings 2 loading indicator"
      {...props}
    >
      <style>
        {`.spinner_ngNb{animation:spinner_ZRWK 1.2s cubic-bezier(0.52,.6,.25,.99) infinite}.spinner_6TBP{animation-delay:.6s}@keyframes spinner_ZRWK{0%{transform:translate(12px,12px) scale(0);opacity:1}100%{transform:translate(0,0) scale(1);opacity:0}}`}
      </style>
      <path className="spinner_ngNb" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"/>
        <path className="spinner_ngNb spinner_6TBP" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"/>
    </svg>
  );
}
