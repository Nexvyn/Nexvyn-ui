'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { BreadcrumbsPreview } from './breadcrumbs-preview'

const BreadcrumbsAnatomy = dynamic(() =>
  import('@/components/diagrams/breadcrumbs-diagram').then((mod) => mod.BreadcrumbsAnatomy),
)

export function BreadcrumbsDemo() {
  const [view] = usePreviewControl('breadcrumbs-view', 'preview')

  return view === 'anatomy' ? <BreadcrumbsAnatomy /> : <BreadcrumbsPreview />
}
