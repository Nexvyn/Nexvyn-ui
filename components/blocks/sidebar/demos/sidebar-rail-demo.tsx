'use client'

import { SidebarRail } from '@/components/blocks/sidebar/sidebar-rail'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function SidebarRailDemo() {
  return <PagePrototype address="acme.app/dashboard" page={<SidebarRail />} />
}
