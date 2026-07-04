'use client'

import { ColorPicker } from '@/components/ui/color-picker-standalone'

export function ColorPickerPreview() {
  return (
    <div className="flex items-center justify-center p-6">
      <ColorPicker
        initialExpanded
        coreSize={48}
        petalSize={48}
        circularBarWidth={14}
        sliderWidth={14}
        sliderOffset={38}
      />
    </div>
  )
}
