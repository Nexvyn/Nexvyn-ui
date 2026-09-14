'use client'

import { SidebarProvider } from '@/components/detail/sidebar-provider'
import { ComponentSearchProvider } from '@/components/detail/component-search'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ComponentSearchProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ComponentSearchProvider>
  )
}
