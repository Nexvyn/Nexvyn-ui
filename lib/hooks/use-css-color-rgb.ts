'use client'

import { useEffect, useState } from 'react'
import { resolveCssColor } from '@/lib/resolve-css-color'

/**
 * Subscribes to a CSS custom property's resolved RGB value, re-resolving
 * whenever the document's theme class changes rather than reading it once
 * or during render — the `.dark` class is applied pre-hydration and can
 * change at any time via the theme toggle, so a one-shot read would go
 * stale (see AGENTS.md's "never read the theme during render" rule, which
 * applies equally to any CSS variable whose value is theme-scoped).
 */
export function useCssColorRgb(
  varName: string,
  fallback: [number, number, number],
): [number, number, number] {
  const [rgb, setRgb] = useState<[number, number, number]>(fallback)

  useEffect(() => {
    const resolve = () => {
      const next = resolveCssColor(varName)
      if (next) setRgb(next)
    }
    resolve()

    const observer = new MutationObserver(resolve)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [varName])

  return rgb
}
