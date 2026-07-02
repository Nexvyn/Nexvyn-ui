'use client'

import { SidebarProvider } from '@/components/detail/sidebar-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>
}
