'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { RatioSliderPreview } from './ratio-slider-preview'

const RatioSliderBreakdown = dynamic(() =>
  import('@/components/diagrams/ratio-slider-diagram').then((mod) => mod.RatioSliderBreakdown),
)

export function RatioSliderDemo() {
  const [view] = usePreviewControl('ratio-slider-view', 'preview')

  return view === 'anatomy' ? <RatioSliderBreakdown /> : <RatioSliderPreview />
}
