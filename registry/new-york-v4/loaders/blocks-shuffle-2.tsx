"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface BlocksShuffle2LoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Blocks Shuffle 2 Loader
 * CSS-animated SVG loader icon
 */
export function BlocksShuffle2Loader({
  size = 24,
  className,
  ...props
}: BlocksShuffle2LoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Blocks Shuffle 2 loading indicator"
      {...props}
    >
      <style>
        {`.spinner_9Mto{animation:spinner_5GqJ 1.6s linear infinite;animation-delay:-1.6s}.spinner_bb12{animation-delay:-1s}@keyframes spinner_5GqJ{12.5%{x:13px;y:1px}25%{x:13px;y:1px}37.5%{x:13px;y:13px}50%{x:13px;y:13px}62.5%{x:1px;y:13px}75%{x:1px;y:13px}87.5%{x:1px;y:1px}}`}
      </style>
      <rect className="spinner_9Mto" x="1" y="1" rx="1" width="10" height="10"/>
        <rect className="spinner_9Mto spinner_bb12" x="1" y="1" rx="1" width="10" height="10"/>
    </svg>
  );
}
