'use client'

import { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export function SelectPreview() {
  const [value, setValue] = useState('')
  return (
    <div className="flex h-full w-full items-center justify-center p-2 sm:p-6">
      <div className="w-48 space-y-3">
        <Select value={value} onValueChange={setValue} name="size">
          <SelectTrigger>
            <SelectValue placeholder="Choose size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
        <p className="rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-xs text-(--color-muted)">
          Selected: {value || 'none'}
        </p>
      </div>
    </div>
  )
}
