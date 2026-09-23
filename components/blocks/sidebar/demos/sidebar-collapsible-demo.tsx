'use client'

import { SidebarCollapsible } from '@/components/blocks/sidebar/sidebar-collapsible'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function SidebarCollapsibleDemo() {
  return <PagePrototype address="acme.app/dashboard" page={<SidebarCollapsible />} />
}
