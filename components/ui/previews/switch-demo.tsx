'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { SwitchAnatomy } from '@/components/diagrams/switch-diagram'
import { SwitchPreview } from './switch-preview'

export function SwitchDemo() {
  const [view] = usePreviewControl('switch-view', 'preview')

  return view === 'anatomy' ? <SwitchAnatomy /> : <SwitchPreview />
}
