"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader3DotsBounceProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 3 Dots Bounce Loader
 * CSS-animated SVG loader icon
 */
export function Loader3DotsBounce({
  size = 24,
  className,
  ...props
}: Loader3DotsBounceProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="3 Dots Bounce loading indicator"
      {...props}
    >
      <style>
        {`.spinner_qM83{animation:spinner_8HQG 1.05s infinite}.spinner_oXPr{animation-delay:.1s}.spinner_ZTLf{animation-delay:.2s}@keyframes spinner_8HQG{0%,57.14%{animation-timing-function:cubic-bezier(0.33,.66,.66,1);transform:translate(0)}28.57%{animation-timing-function:cubic-bezier(0.33,0,.66,.33);transform:translateY(-6px)}100%{transform:translate(0)}}`}
      </style>
      <circle className="spinner_qM83" cx="4" cy="12" r="3"/>
        <circle className="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3"/>
        <circle className="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3"/>
    </svg>
  );
}
