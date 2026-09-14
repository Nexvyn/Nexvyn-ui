'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { BadgePreview } from './badge-preview'

const BadgeAnatomy = dynamic(() =>
  import('@/components/diagrams/badge-diagram').then((mod) => mod.BadgeAnatomy),
)

export function BadgeDemo() {
  const [view] = usePreviewControl('badge-view', 'preview')

  return view === 'anatomy' ? <BadgeAnatomy /> : <BadgePreview />
}
