'use client'

import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type SidebarContextValue = {
  showSidebar: boolean
  setShowSidebar: (open: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = useCallback(() => {
    setShowSidebar((open) => !open)
  }, [])

  useEffect(() => {
    setShowSidebar(false)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [toggleSidebar])

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
