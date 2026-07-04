'use client'

import { RatioSlider } from '@/components/ui/ratio-slider'

export function RatioSliderPreview() {
  return (
    <div className="flex items-center justify-center p-6 w-full">
      <div className="w-full max-w-md">
        <RatioSlider />
      </div>
    </div>
  )
}
