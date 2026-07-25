'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { TabsSubtleAnatomy } from '@/components/diagrams/tabs-subtle-diagram'
import { TabsSubtlePreview } from './tabs-subtle-preview'

export function TabsSubtleDemo() {
  const [view] = usePreviewControl('tabs-subtle-view', 'preview')

  return view === 'anatomy' ? <TabsSubtleAnatomy /> : <TabsSubtlePreview />
}
