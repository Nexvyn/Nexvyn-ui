'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { IdReelAnatomy } from '@/components/diagrams/id-reel-diagram'
import { IdReelPreview } from './id-reel-preview'

export function IdReelDemo() {
  const [view] = usePreviewControl('id-reel-view', 'preview')

  return view === 'anatomy' ? <IdReelAnatomy /> : <IdReelPreview />
}
