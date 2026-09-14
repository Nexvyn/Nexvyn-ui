'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { TabsSubtlePreview } from './tabs-subtle-preview'

const TabsSubtleAnatomy = dynamic(() =>
  import('@/components/diagrams/tabs-subtle-diagram').then((mod) => mod.TabsSubtleAnatomy),
)

export function TabsSubtleDemo() {
  const [view] = usePreviewControl('tabs-subtle-view', 'preview')

  return view === 'anatomy' ? <TabsSubtleAnatomy /> : <TabsSubtlePreview />
}
