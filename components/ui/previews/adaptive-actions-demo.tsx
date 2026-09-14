'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { AdaptiveActionsPreview } from './adaptive-actions-preview'

const AdaptiveActionsAnatomy = dynamic(() =>
  import('@/components/diagrams/adaptive-actions-diagram').then(
    (mod) => mod.AdaptiveActionsAnatomy,
  ),
)

export function AdaptiveActionsDemo() {
  const [view] = usePreviewControl('adaptive-actions-view', 'preview')

  return view === 'anatomy' ? <AdaptiveActionsAnatomy /> : <AdaptiveActionsPreview />
}
