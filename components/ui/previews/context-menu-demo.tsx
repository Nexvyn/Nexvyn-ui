'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { ContextMenuPreview } from './context-menu-preview'

const ContextMenuAnatomy = dynamic(() =>
  import('@/components/diagrams/context-menu-diagram').then((mod) => mod.ContextMenuAnatomy),
)

export function ContextMenuDemo() {
  const [view] = usePreviewControl('context-menu-view', 'preview')

  return view === 'anatomy' ? <ContextMenuAnatomy /> : <ContextMenuPreview />
}
