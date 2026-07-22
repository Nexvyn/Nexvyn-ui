'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { MobileDrawerAnatomy } from '@/components/diagrams/mobile-drawer-diagram'
import { MobileDrawerPreview } from './mobile-drawer-preview'

export function MobileDrawerDemo() {
  const [view] = usePreviewControl('mobile-drawer-view', 'preview')

  return view === 'anatomy' ? <MobileDrawerAnatomy /> : <MobileDrawerPreview />
}
