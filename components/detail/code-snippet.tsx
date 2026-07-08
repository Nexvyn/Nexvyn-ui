'use client'

import React, { useSyncExternalStore } from 'react'
import { Highlight, PrismTheme } from 'prism-react-renderer'
import themes from './prism-theme.json'
import { cn } from '@/lib/utils'

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  const onStorage = (e: StorageEvent) => {
    if (e.key === 'theme') callback()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    observer.disconnect()
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerSnapshot() {
  return 'light' as const
}

interface CodeSnippetProps {
  code: string
  language?: string
  className?: string
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = 'typescript',
  className,
}) => {
  const themeName = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const isDark = themeName === 'dark'
  const theme = (isDark ? themes.dark : themes.light) as PrismTheme

  if (!code) return null

  return (
    <div className={cn('py-2', className)}>
      <Highlight theme={theme} code={code.trim()} language={language}>
        {({ className: prismClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(prismClass, 'text-[13px] overflow-x-auto font-mono font-medium no-scrollbar')}
            style={{ ...style, backgroundColor: 'transparent' }}
          >
            {tokens.map((line, i) => (
              <div
                key={`line-${i + 1}`}
                {...getLineProps({ line })}
                className="flex items-center hover:bg-(--color-surface-2)/40 py-px px-4"
              >
                <span className="mr-4 select-none text-(--color-muted) text-right text-[10px] items-center flex w-6 justify-end">
                  {i + 1}
                </span>
                <span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
