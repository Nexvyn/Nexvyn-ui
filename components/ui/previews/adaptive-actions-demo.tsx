'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { AdaptiveActionsAnatomy } from '@/components/diagrams/adaptive-actions-diagram'
import { AdaptiveActionsPreview } from './adaptive-actions-preview'

export function AdaptiveActionsDemo() {
  const [view] = usePreviewControl('adaptive-actions-view', 'preview')

  return view === 'anatomy' ? <AdaptiveActionsAnatomy /> : <AdaptiveActionsPreview />
}
