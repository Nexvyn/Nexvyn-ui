"use client"

import React, { useState } from "react"
import { ButtonGroup } from "./ButtonGroup"
import { CodeBlock } from "./CodeBlock"

interface DemoOption {
  name: string
  value: string
  snippet: string
  action?: () => void
}

interface InteractiveDemoProps {
  title: string
  description?: string
  options: DemoOption[]
  defaultValue?: string
}

export function InteractiveDemo({
  title,
  description,
  options,
  defaultValue,
}: InteractiveDemoProps) {
  const [active, setActive] = useState(defaultValue || options[0]?.value)

  const activeOption = options.find((opt) => opt.value === active) || options[0]

  const handleSelect = (value: string) => {
    const option = options.find((opt) => opt.value === value)
    if (option) {
      setActive(value)
      option.action?.()
    }
  }

  return (
    <div className="docs-content">
      <h2>{title}</h2>
      {description && <p>{description}</p>}

      <ButtonGroup
        options={options.map((opt) => ({ name: opt.name, value: opt.value }))}
        active={active}
        onSelect={handleSelect}
      />

      <CodeBlock>{activeOption.snippet}</CodeBlock>
    </div>
  )
}
