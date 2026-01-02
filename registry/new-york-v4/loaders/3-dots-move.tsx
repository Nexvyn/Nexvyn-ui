"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface Loader3DotsMoveProps extends Omit<ComponentProps<"svg">, "ref"> {
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
 * 3 Dots Move Loader
 * CSS-animated SVG loader icon
 */
export function Loader3DotsMove({
  size = 24,
  className,
  ...props
}: Loader3DotsMoveProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="3 Dots Move loading indicator"
      {...props}
    >
      <style>.spinner_nOfF{animation:spinner_qtyZ 2s cubic-bezier(0.36,.6,.31,1) infinite}.spinner_fVhf{animation-delay:-.5s}.spinner_piVe{animation-delay:-1s}.spinner_MSNs{animation-delay:-1.5s}@keyframes spinner_qtyZ{0%{r:0}25%{r:3px;cx:4px}50%{r:3px;cx:12px}75%{r:3px;cx:20px}100%{r:0;cx:20px}}</style><circle className="spinner_nOfF" cx="4" cy="12" r="3"/><circle className="spinner_nOfF spinner_fVhf" cx="4" cy="12" r="3"/><circle className="spinner_nOfF spinner_piVe" cx="4" cy="12" r="3"/><circle className="spinner_nOfF spinner_MSNs" cx="4" cy="12" r="3"/>
    </svg>
  );
}
