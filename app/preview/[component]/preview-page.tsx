'use client'

import { useParams } from 'next/navigation'
import { COMPONENTS } from '@/lib/components-registry'
import { ComponentDemo } from '@/app/components/[component]/component-page'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import '@/components/detail/detail-layout.css'

export default function PreviewPage() {
  const params = useParams()
  const componentId = typeof params.component === 'string' ? params.component : ''
  const component = COMPONENTS.find((item) => item.id === componentId)

  if (!component) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-(--color-bg) text-(--color-muted)">
        Component not found
      </div>
    )
  }

  return (
    <div
      className="detail-page h-dvh overflow-hidden p-1 sm:p-2 font-sans"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <div className="relative h-full">
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle
              showShortcut={false}
              className="h-8 w-8 p-0 flex items-center justify-center rounded-md"
            />
          </div>
        </header>

        <div className="detail-preview-card relative z-0 h-full rounded-3xl sm:rounded-[45px] p-2 sm:p-4 flex items-center justify-center">
          <ComponentDemo id={component.id} />
        </div>
      </div>
    </div>
  )
}
