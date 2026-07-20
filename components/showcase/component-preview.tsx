'use client'

import type { ComponentItem } from '@/lib/components-registry'
import { blueprintPreviews } from '@/components/showcase/preview-map'

export function ComponentPreview({ item }: { item: ComponentItem }) {
  const Drawing = blueprintPreviews[`${item.id}-blueprint`]
  if (!Drawing) return null
  return <Drawing />
}
