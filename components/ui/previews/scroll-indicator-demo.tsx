'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { ScrollIndicatorPreview } from './scroll-indicator-preview'

const ScrollIndicatorBreakdown = dynamic(() =>
  import('@/components/diagrams/scroll-indicator-diagram').then(
    (mod) => mod.ScrollIndicatorBreakdown,
  ),
)

export function ScrollIndicatorDemo() {
  const [view] = usePreviewControl('scroll-indicator-view', 'preview')

  return view === 'anatomy' ? <ScrollIndicatorBreakdown /> : <ScrollIndicatorPreview />
}
