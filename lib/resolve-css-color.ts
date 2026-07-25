'use client'

/**
 * Resolves a CSS custom property (hex, oklch, rgb, whatever the current
 * theme defines) to an [r, g, b] 0-255 triple by letting the browser's own
 * color computation do the conversion, instead of hand-parsing color
 * syntax. Lets components do numeric color math (lerp/blend) while still
 * only ever referencing semantic tokens, never a literal value.
 *
 * Client-only — returns null during SSR or if resolution fails.
 */
export function resolveCssColor(varName: string): [number, number, number] | null {
  if (typeof document === 'undefined') return null

  const probe = document.createElement('span')
  probe.style.position = 'fixed'
  probe.style.pointerEvents = 'none'
  probe.style.opacity = '0'
  probe.style.color = `var(${varName})`
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  document.body.removeChild(probe)

  const match = resolved.match(/rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)/)
  if (!match) return null
  return [Number(match[1]), Number(match[2]), Number(match[3])]
}
