'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { ScrollIndicatorBreakdown } from '@/components/diagrams/scroll-indicator-diagram'
import { ScrollIndicatorPreview } from './scroll-indicator-preview'

export function ScrollIndicatorDemo() {
  const [view] = usePreviewControl('scroll-indicator-view', 'preview')

  return view === 'anatomy' ? <ScrollIndicatorBreakdown /> : <ScrollIndicatorPreview />
}
