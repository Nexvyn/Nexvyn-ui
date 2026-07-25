'use client'

import { NavMenu, NavMenuItem } from '@/components/ui/nav-menu'

export function NavMenuPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-2 sm:p-6">
      <div className="w-48">
        <NavMenu activeSlug="/docs/install" aria-label="Docs">
          <NavMenuItem href="/docs" label="Overview" />
          <NavMenuItem href="/docs/" label="Install" isNew />
          <NavMenuItem href="/docs/" label="Theming" />
          <NavMenuItem href="/components/nav-menu" label="Components" isUpdated />
        </NavMenu>
      </div>
    </div>
  )
}
