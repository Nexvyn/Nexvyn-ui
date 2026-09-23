'use client'

import { SidebarWorkspace } from '@/components/blocks/sidebar/sidebar-workspace'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function SidebarWorkspaceDemo() {
  return <PagePrototype address="acme.app/dashboard" page={<SidebarWorkspace />} />
}
