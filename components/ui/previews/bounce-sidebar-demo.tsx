'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { BounceSidebarBreakdown } from '@/components/diagrams/bounce-sidebar-diagram'
import { BounceSidebarPreview } from './bounce-sidebar-preview'

export function BounceSidebarDemo() {
  const [view] = usePreviewControl('bounce-sidebar-view', 'preview')

  return view === 'anatomy' ? <BounceSidebarBreakdown /> : <BounceSidebarPreview />
}
