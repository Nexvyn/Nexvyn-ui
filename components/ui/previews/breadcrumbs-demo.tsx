'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { BreadcrumbsAnatomy } from '@/components/diagrams/breadcrumbs-diagram'
import { BreadcrumbsPreview } from './breadcrumbs-preview'

export function BreadcrumbsDemo() {
  const [view] = usePreviewControl('breadcrumbs-view', 'preview')

  return view === 'anatomy' ? <BreadcrumbsAnatomy /> : <BreadcrumbsPreview />
}
