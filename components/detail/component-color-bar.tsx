'use client'

import { useState, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'

const THEME_COLORS = [
  { name: 'Primary', role: 'primary' as const, default: '#0a0a0a', variable: '--color-fg' },
  { name: 'Background', role: 'secondary' as const, default: '#ffffff', variable: '--color-bg' },
  { name: 'Accent', role: 'accent' as const, default: '#7AA7C7', variable: '--color-accent' },
]

const PRESETS: Record<string, string[]> = {
  primary: ['#0a0a0a', '#334155', '#2563eb', '#7c3aed', '#e11d48'],
  secondary: ['#ffffff', '#f3f4f6', '#e0f2fe', '#ede9fe', '#fce7f3'],
  accent: ['#7AA7C7', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
}

export default function ComponentColorBar() {
  const [colors, setColors] = useState(() => {
    const initial: Record<string, string> = {}
    THEME_COLORS.forEach((c) => { initial[c.role] = c.default })
    return initial
  })

  const handleColorChange = (role: string, value: string) => {
    setColors((prev) => ({ ...prev, [role]: value }))
  }

  const resetColors = () => {
    const reset: Record<string, string> = {}
    THEME_COLORS.forEach((c) => { reset[c.role] = c.default })
    setColors(reset)
  }

  return (
    <div className="flex items-center gap-3">
      {THEME_COLORS.map((color) => (
        <div key={color.role} className="flex items-center gap-1.5">
          <input
            type="color"
            value={colors[color.role]}
            onChange={(e) => handleColorChange(color.role, e.target.value)}
            className="h-6 w-6 cursor-pointer rounded-md border border-(--color-border) bg-transparent"
            title={color.name}
          />
          <div className="flex gap-0.5">
            {PRESETS[color.role].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleColorChange(color.role, preset)}
                className="h-4 w-4 rounded-full border border-(--color-border) transition-transform hover:scale-110"
                style={{ backgroundColor: preset }}
                title={preset}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={resetColors}
        className="ml-2 text-(--color-muted) hover:text-(--color-fg) transition-colors"
        title="Reset colors"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  )
}
