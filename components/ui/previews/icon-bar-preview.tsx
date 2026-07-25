'use client'

import { useState } from 'react'
import { IconBar, IconBarItem } from '@/components/ui/icon-bar'

export function IconBarPreview() {
  const [value, setValue] = useState<string | null>('pen')
  return (
    <div className="flex h-full w-full items-center justify-center p-2 sm:p-6">
      <IconBar value={value} onValueChange={setValue} aria-label="Tools">
        <IconBarItem
          value="pen"
          label="Pen"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          }
        />
        <IconBarItem
          value="eraser"
          label="Eraser"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
              <path d="M22 21H7" />
              <path d="m5 11 9 9" />
            </svg>
          }
        />
        <IconBarItem
          value="fill"
          label="Fill"
          disabled
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
              <path d="m5 2 5 5" />
              <path d="M2 13h15" />
              <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.8 2-4 .3 1.2 2 2.4 2 4Z" />
            </svg>
          }
        />
      </IconBar>
    </div>
  )
}
