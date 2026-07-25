'use client'

import { MorphNav } from '@/components/ui/morph-nav'

export function MorphNavPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <MorphNav
        items={[
          { id: 'dash', label: 'Dashboard', href: '/dash' },
          {
            id: 'auto',
            label: 'Automations',
            children: [{ id: 'wf', label: 'Workflows', href: '/wf' }],
          },
          { id: 'settings', label: 'Settings', href: '/settings' },
        ]}
        placement="bottom-end"
      />
    </div>
  )
}
