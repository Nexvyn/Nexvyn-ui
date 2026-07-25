'use client'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'

export function BreadcrumbsPreview() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Components', href: '/components' },
            { label: 'Breadcrumbs' },
          ]}
        />
      </div>
    </div>
  )
}
