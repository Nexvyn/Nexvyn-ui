"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React from "react"

interface AaveSidebarItemProps {
  icon: React.ComponentType<{
    size?: number
    isActive?: boolean
    className?: string
  }>
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Aave Sidebar Item Wrapper
 * Replicates the specific visual style active interaction of Aave V4 docs.
 *
 * Features:
 * - Active State: Purple background (rounded square) with white icon
 * - Hover State: Text and icon turn black (fast transition)
 * - Idle State: Text and icon are muted grey
 */
export function AaveSidebarItem({
  icon: Icon,
  label,
  isActive = false,
  onClick,
  className,
}: AaveSidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 transition-all duration-150 ease-out",
        "h-20 w-20", // Fixed square size like Aave's main nav
        isActive
          ? "bg-[#6B46C1]/10" // Subtle background for active container if needed, main active is icon bg
          : "hover:bg-transparent",
        className
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-[6px] transition-colors duration-150 ease-out",
          isActive
            ? "bg-[#8A63D2] text-white" // Aave Purple background, White Icon
            : "bg-transparent text-[#8F8E8E] group-hover:text-[#201D1D]" // Grey -> Black on hover
        )}
      >
        <Icon size={20} isActive={isActive} className="transition-colors duration-150" />
      </div>

      <span
        className={cn(
          "text-center text-[11px] leading-tight font-medium transition-colors duration-150 ease-out",
          isActive
            ? "text-[#6B46C1]" // Active text color
            : "text-[#8F8E8E] group-hover:text-[#201D1D]" // Grey -> Black on hover
        )}
      >
        {label}
      </span>
    </button>
  )
}

interface AaveSubItemProps {
  label: string
  isActive?: boolean
  onClick?: () => void
}

export function AaveSubItem({ label, isActive, onClick }: AaveSubItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full border-l px-4 py-2 text-left text-sm transition-colors duration-150 active:border-l-2",
        isActive
          ? "border-[#2B71FF] font-medium text-[#2B71FF]" // Aave Blue
          : "border-transparent text-[#8F8E8E] hover:text-[#201D1D]"
      )}
    >
      {label}
    </button>
  )
}
