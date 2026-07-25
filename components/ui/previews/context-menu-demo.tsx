'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { ContextMenuAnatomy } from '@/components/diagrams/context-menu-diagram'
import { ContextMenuPreview } from './context-menu-preview'

export function ContextMenuDemo() {
  const [view] = usePreviewControl('context-menu-view', 'preview')

  return view === 'anatomy' ? <ContextMenuAnatomy /> : <ContextMenuPreview />
}
