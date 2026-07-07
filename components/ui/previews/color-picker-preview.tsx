'use client'

import { useState } from 'react'
import { BlossomPicker } from '@/components/ui/color-picker-standalone'

export function ColorPickerPreview() {
  const [showArc, setShowArc] = useState(true)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-6">
      <div className="flex flex-1 items-center justify-center">
        <BlossomPicker
          key={showArc ? 'arc' : 'petals'}
          variant={showArc ? 'blossom-arc' : 'blossom'}
          initialExpanded
          coreSize={48}
          petalSize={48}
          circularBarWidth={14}
          sliderWidth={14}
          sliderOffset={38}
          sliderPosition="right"
          adaptivePositioning={false}
        />
      </div>

      
    </div>
  )
}
