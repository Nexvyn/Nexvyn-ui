'use client'

import { Input } from '@/components/ui/input'

export function InputPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-72 space-y-4">
        <Input label="Email" placeholder="you@example.com" />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          error="Password is required"
        />
        <Input
          label="Search"
          size="sm"
          placeholder="Search…"
          startAdornment={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3.5 3.5" />
            </svg>
          }
          endAdornment={
            <kbd className="rounded border border-(--color-border) px-1 py-0.5 text-[10px] text-(--color-muted)">
              ⌘K
            </kbd>
          }
        />
        <Input label="Disabled" placeholder="Cannot edit" disabled />
      </div>
    </div>
  )
}
