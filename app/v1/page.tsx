'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ComponentCard } from '@/components/showcase/component-card'
import { COMPONENTS } from '@/lib/components-registry'

export default function ComponentsPage() {
  return (
    <div
      className="min-h-screen w-full font-sans flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pb-16 pt-8">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight mb-2">
            Components
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            {COMPONENTS.length} components — click to preview
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPONENTS.map((item) => (
            <ComponentCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
