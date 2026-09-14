'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { SwitchPreview } from './switch-preview'

const SwitchAnatomy = dynamic(() =>
  import('@/components/diagrams/switch-diagram').then((mod) => mod.SwitchAnatomy),
)

export function SwitchDemo() {
  const [view] = usePreviewControl('switch-view', 'preview')

  return view === 'anatomy' ? <SwitchAnatomy /> : <SwitchPreview />
}
