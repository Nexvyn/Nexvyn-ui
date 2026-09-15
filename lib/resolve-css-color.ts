'use client'

/** Resolves a CSS variable to an [r, g, b] 0-255 triple via the browser. Null during SSR or on failure. */
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
