'use client'

import { useState } from 'react'
import { RadioGroup, RadioItem } from '@/components/ui/radio-group'

export function RadioGroupPreview() {
  const [value, setValue] = useState('medium')
  return (
    <div className="flex items-center justify-center p-6">
      <RadioGroup value={value} onValueChange={setValue} name="size">
        <RadioItem value="small" label="Small" />
        <RadioItem value="medium" label="Medium" />
        <RadioItem value="large" label="Large" />
      </RadioGroup>
    </div>
  )
}
