'use client'

import { useEffect, useState } from 'react'
import { resolveCssColor } from '@/lib/resolve-css-color'

/** Resolved RGB of a CSS variable, re-resolved on theme change (never read during render). */
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
