"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface GooeyBalls2LoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Gooey Balls 2 Loader
 * CSS-animated SVG loader icon
 */
export function GooeyBalls2Loader({
  size = 24,
  className,
  ...props
}: GooeyBalls2LoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Gooey Balls 2 loading indicator"
      {...props}
    >
      <style>
        {`.spinner_8XMC{animation:spinner_0zVw 2s infinite}.spinner_WWWR{animation:spinner_Aojx 2s infinite}.spinner_LvYV{transform-origin:center;animation:spinner_xygp .75s linear infinite}@keyframes spinner_0zVw{0%{animation-timing-function:cubic-bezier(0.36,.62,.43,.99);cx:5px}50%{animation-timing-function:cubic-bezier(0.79,0,.58,.57);cx:8px}}@keyframes spinner_Aojx{0%{animation-timing-function:cubic-bezier(0.36,.62,.43,.99);cx:19px}50%{animation-timing-function:cubic-bezier(0.79,0,.58,.57);cx:16px}}@keyframes spinner_xygp{100%{transform:rotate(360deg)}}`}
      </style>
      <defs>
        <filter id="spinner-gF01">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="y"/>
        <feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z"/>
        <feBlend in="SourceGraphic" in2="z"/>
        </filter>
        </defs>
        <g className="spinner_LvYV" filter="url(#spinner-gF01)">
        <circle className="spinner_8XMC" cx="5" cy="12" r="4"/>
        <circle className="spinner_WWWR" cx="19" cy="12" r="4"/>
        </g>
    </svg>
  );
}
