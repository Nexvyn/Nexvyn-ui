'use client'

import { Sidebar } from '@/components/detail/sidebar'
import { SidebarProvider } from '@/components/detail/sidebar-provider'
import DetailSidebarShell from '@/components/detail/detail-sidebar-shell'
import '@/components/detail/detail-layout.css'

export default function ComponentLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <div
        className="h-dvh overflow-hidden p-2 font-sans"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
      >
        <DetailSidebarShell>{children}</DetailSidebarShell>
      </div>
    </SidebarProvider>
  )
}
