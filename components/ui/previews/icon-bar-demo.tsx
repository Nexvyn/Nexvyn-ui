'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { IconBarAnatomy } from '@/components/diagrams/icon-bar-diagram'
import { IconBarPreview } from './icon-bar-preview'

export function IconBarDemo() {
  const [view] = usePreviewControl('icon-bar-view', 'preview')

  return view === 'anatomy' ? <IconBarAnatomy /> : <IconBarPreview />
}
