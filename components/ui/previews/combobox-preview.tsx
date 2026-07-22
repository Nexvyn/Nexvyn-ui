'use client'

import { useState } from 'react'
import { Combobox, ComboboxInput, ComboboxContent } from '@/components/ui/combobox'

export function ComboboxPreview() {
  const [value, setValue] = useState('')
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-64">
        <Combobox
          value={value}
          onValueChange={setValue}
          options={[
            { value: 'ist', label: 'Istanbul', description: 'Türkiye' },
            { value: 'ber', label: 'Berlin' },
            { value: 'par', label: 'Paris', description: 'France' },
            { value: 'tok', label: 'Tokyo', description: 'Japan' },
          ]}
          placeholder="Search city…"
          name="city"
        >
          <ComboboxInput />
          <ComboboxContent />
        </Combobox>
      </div>
    </div>
  )
}
