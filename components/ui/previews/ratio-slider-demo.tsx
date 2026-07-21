'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { RatioSliderBreakdown } from '@/components/diagrams/ratio-slider-diagram'
import { RatioSliderPreview } from './ratio-slider-preview'

export function RatioSliderDemo() {
  const [view] = usePreviewControl('ratio-slider-view', 'preview')

  return view === 'anatomy' ? <RatioSliderBreakdown /> : <RatioSliderPreview />
}
