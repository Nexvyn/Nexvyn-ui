'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'
import { COMPONENTS } from '@/lib/components-registry'
import { ComponentDemo } from '@/app/components/[component]/page'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import '@/components/detail/detail-layout.css'

export default function PreviewPage() {
  const params = useParams()
  const componentId = typeof params.component === 'string' ? params.component : ''
  const component = COMPONENTS.find((item) => item.id === componentId)

  const [stars, setStars] = useState('1')

  useEffect(() => {
    fetch('https://api.github.com/repos/Nexvyn/Nexvyn-ui')
      .then((res) => res.json())
      .then((json) => {
        if (json && typeof json.stargazers_count === 'number') {
          const formattedCount =
            json.stargazers_count >= 1000
              ? json.stargazers_count % 1000 === 0
                ? `${Math.floor(json.stargazers_count / 1000)}k`
                : `${(json.stargazers_count / 1000).toFixed(1)}k`
              : json.stargazers_count.toLocaleString()
          setStars(formattedCount.replace('.0k', 'k'))
        }
      })
      .catch(() => {})
  }, [])

  if (!component) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-(--color-bg) text-(--color-muted)">
        Component not found
      </div>
    )
  }

  return (
    <div
      className="detail-page h-screen overflow-hidden p-2 font-sans"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <div className="relative h-full">
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
          <Link
            href={`/components/${component.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-(--color-muted) hover:text-(--color-fg) transition-colors rounded-md px-2 py-1 -ml-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-semibold tracking-tight no-underline hover:opacity-80 transition-opacity"
            style={{ color: 'var(--color-accent)' }}
          >
            Nexvyn/Ui (...)
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Nexvyn/Nexvyn-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star on GitHub"
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-xs font-medium text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface) transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) border border-(--color-border)"
            >
              <Star className="h-3.5 w-3.5 fill-current text-(--color-accent)" />
              <span>{stars}</span>
            </a>
            <ThemeToggle
              showShortcut={false}
              className="h-8 w-8 p-0 flex items-center justify-center rounded-md"
            />
          </div>
        </header>

        <div className="detail-preview-card relative z-0 h-full rounded-[45px] p-4 flex items-center justify-center">
          <ComponentDemo id={component.id} />
        </div>
      </div>
    </div>
  )
}
