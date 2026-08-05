'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function RadioGroupPreview() {
  const [value, setValue] = useState('comfortable')
  return (
    <div className="flex items-center justify-center p-6">
      <RadioGroup value={value} onValueChange={setValue} name="spacing">
        <RadioGroupItem value="compact">Compact</RadioGroupItem>
        <RadioGroupItem value="comfortable">Comfortable</RadioGroupItem>
        <RadioGroupItem value="spacious">Spacious</RadioGroupItem>
        <RadioGroupItem value="relaxed">Relaxed</RadioGroupItem>
      </RadioGroup>
    </div>
  )
}
