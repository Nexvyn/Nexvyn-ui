'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { BadgeAnatomy } from '@/components/diagrams/badge-diagram'
import { BadgePreview } from './badge-preview'

export function BadgeDemo() {
  const [view] = usePreviewControl('badge-view', 'preview')

  return view === 'anatomy' ? <BadgeAnatomy /> : <BadgePreview />
}
