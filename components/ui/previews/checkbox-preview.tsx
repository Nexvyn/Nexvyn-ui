'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

export function CheckboxPreview() {
  const [checked, setChecked] = useState(false)
  const [todoChecked, setTodoChecked] = useState(false)
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="space-y-3">
        <Checkbox checked={checked} onCheckedChange={setChecked} label="Accept terms" />
        <Checkbox indeterminate label="Indeterminate" />
        <Checkbox checked disabled label="Disabled" />
        <Checkbox
          checked={todoChecked}
          onCheckedChange={setTodoChecked}
          label="Buy groceries"
          strikeThrough
        />
      </div>
    </div>
  )
}
