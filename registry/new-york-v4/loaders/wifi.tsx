"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface WifiLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Wifi Loader
 * CSS-animated SVG loader icon
 */
export function WifiLoader({
  size = 24,
  className,
  ...props
}: WifiLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Wifi loading indicator"
      {...props}
    >
      <style>
        {`.spinner_iMlZ{animation:spinner_BN13 1.451s step-end infinite}.spinner_bpzn{animation:spinner_gk1y 1.451s step-end infinite}.spinner_SwOY{animation:spinner_a9rS 1.451s step-end infinite}@keyframes spinner_BN13{0%,86.22%,100%{opacity:0}8.61%,86.15%{opacity:1}}@keyframes spinner_gk1y{0%,8.61%,86.22%,100%{opacity:0}25.84%,86.15%{opacity:1}}@keyframes spinner_a9rS{0%,25.84%,86.22%,100%{opacity:0}43.07%,86.15%{opacity:1}}`}
      </style>
      <path className="spinner_iMlZ" d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21" opacity="0"/>
        <path className="spinner_iMlZ spinner_bpzn" d="M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" opacity="0"/>
        <path className="spinner_iMlZ spinner_SwOY" d="M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3" opacity="0"/>
    </svg>
  );
}
