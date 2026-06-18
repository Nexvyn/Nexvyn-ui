'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MoreVertical } from 'lucide-react'

const PRESETS = {
  primary: [
    { name: 'Black', value: '#000000' },
    { name: 'Slate', value: '#334155' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Rose', value: '#e11d48' },
  ],
  secondary: [
    { name: 'White', value: '#ffffff' },
    { name: 'Gray', value: '#f3f4f6' },
    { name: 'Sky', value: '#e0f2fe' },
    { name: 'Violet', value: '#ede9fe' },
    { name: 'Pink', value: '#fce7f3' },
  ],
  accent: [
    { name: 'Default', value: '#7AA7C7' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Pink', value: '#ec4899' },
  ],
}

export default function ThemeColorPicker() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-md text-(--color-muted) hover:text-(--color-fg) transition-colors"
        aria-label="Theme colors"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-(--color-border) bg-(--color-bg) p-3 shadow-lg"
          >
            {Object.entries(PRESETS).map(([role, colors]) => (
              <div key={role} className="mb-3 last:mb-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-(--color-muted) mb-1.5">{role}</p>
                <div className="flex gap-1.5">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className="h-6 w-6 rounded-full border border-(--color-border) transition-transform hover:scale-110"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
