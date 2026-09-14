'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { BounceSidebarPreview } from './bounce-sidebar-preview'

const BounceSidebarBreakdown = dynamic(() =>
  import('@/components/diagrams/bounce-sidebar-diagram').then((mod) => mod.BounceSidebarBreakdown),
)

export function BounceSidebarDemo() {
  const [view] = usePreviewControl('bounce-sidebar-view', 'preview')

  return view === 'anatomy' ? <BounceSidebarBreakdown /> : <BounceSidebarPreview />
}
