"use client"

import React from "react"

interface ButtonGroupOption {
  name: string
  value: string
}

interface ButtonGroupProps {
  options: ButtonGroupOption[]
  active: string
  onSelect: (value: string) => void
  className?: string
}

export function ButtonGroup({ options, active, onSelect, className = "" }: ButtonGroupProps) {
  return (
    <div className={`docs-content ${className}`}>
      <div className="button-group">
        {options.map((option) => (
          <button
            key={option.value}
            className="sonner-button"
            data-active={active === option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  )
}
