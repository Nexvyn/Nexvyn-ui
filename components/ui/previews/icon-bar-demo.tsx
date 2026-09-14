'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { IconBarPreview } from './icon-bar-preview'

const IconBarAnatomy = dynamic(() =>
  import('@/components/diagrams/icon-bar-diagram').then((mod) => mod.IconBarAnatomy),
)

export function IconBarDemo() {
  const [view] = usePreviewControl('icon-bar-view', 'preview')

  return view === 'anatomy' ? <IconBarAnatomy /> : <IconBarPreview />
}
