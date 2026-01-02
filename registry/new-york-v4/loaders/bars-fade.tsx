"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface BarsFadeLoaderProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * Bars Fade Loader
 * CSS-animated SVG loader icon
 */
export function BarsFadeLoader({
  size = 24,
  className,
  ...props
}: BarsFadeLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="Bars Fade loading indicator"
      {...props}
    >
      <style>.spinner_GmWz{animation:spinner_Ctle .8s linear infinite;animation-delay:-.8s}.spinner_NuDr{animation-delay:-.65s}.spinner_OlQ0{animation-delay:-.5s}@keyframes spinner_Ctle{93.75%,100%{opacity:.2}}</style><rect className="spinner_GmWz" x="1" y="4" width="6" height="14"/><rect className="spinner_GmWz spinner_NuDr" x="9" y="4" width="6" height="14"/><rect className="spinner_GmWz spinner_OlQ0" x="17" y="4" width="6" height="14"/>
    </svg>
  );
}
