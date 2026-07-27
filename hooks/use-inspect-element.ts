'use client'

import { useEffect, useRef, useState, useCallback, type RefObject } from 'react'

export interface BoxSides {
  top: number
  right: number
  bottom: number
  left: number
}

export interface GapInfo {
  x: number
  y: number
  width: number
  height: number
  value: number
  direction: 'horizontal' | 'vertical'
}

export interface FontMetrics {
  fontSize: string
  lineHeight: string
  fontFamily: string
  fontWeight: string
  letterSpacing: string
  color: string
  variableAxes: Record<string, number>
}

export interface InspectData {
  rect: { x: number; y: number; width: number; height: number }
  contentBox: { x: number; y: number; width: number; height: number }
  padding: BoxSides
  margin: BoxSides
  display: string
  flexDirection: string | null
  gaps: GapInfo[]
  anchorName: string
  tagName: string
  fontMetrics: FontMetrics | null
  element: HTMLElement
}

function parsePx(value: string): number {
  return parseFloat(value) || 0
}

function hasDirectTextContent(el: HTMLElement): boolean {
  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      return true
    }
  }
  return false
}

function parseVariationSettings(value: string): Record<string, number> {
  const axes: Record<string, number> = {}
  if (!value || value === 'normal') return axes
  const pairs = value.split(',')
  for (const pair of pairs) {
    const match = pair.trim().match(/["'](\w+)["']\s+([\d.]+)/)
    if (match) {
      axes[match[1]] = parseFloat(match[2])
    }
  }
  return axes
}

function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return rgb
  const r = parseInt(match[1]).toString(16).padStart(2, '0')
  const g = parseInt(match[2]).toString(16).padStart(2, '0')
  const b = parseInt(match[3]).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

function computeGaps(el: HTMLElement, cs: CSSStyleDeclaration, frameRect: DOMRect): GapInfo[] {
  const display = cs.display
  if (!display.includes('flex') && !display.includes('grid')) return []

  const children = Array.from(el.children) as HTMLElement[]
  if (children.length < 2) return []

  const gaps: GapInfo[] = []
  const direction = cs.flexDirection || 'row'
  const isVertical = direction === 'column' || direction === 'column-reverse'

  for (let i = 0; i < children.length - 1; i++) {
    const a = children[i].getBoundingClientRect()
    const b = children[i + 1].getBoundingClientRect()

    if (isVertical) {
      const gapValue = b.top - a.bottom
      if (gapValue > 0) {
        gaps.push({
          x: a.left - frameRect.left,
          y: a.bottom - frameRect.top,
          width: Math.max(a.width, b.width),
          height: gapValue,
          value: Math.round(gapValue),
          direction: 'vertical',
        })
      }
    } else {
      const gapValue = b.left - a.right
      if (gapValue > 0) {
        gaps.push({
          x: a.right - frameRect.left,
          y: a.top - frameRect.top,
          width: gapValue,
          height: Math.max(a.height, b.height),
          value: Math.round(gapValue),
          direction: 'horizontal',
        })
      }
    }
  }

  return gaps
}

export function useInspectElement(
  frameRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  active: boolean,
): InspectData | null {
  const [data, setData] = useState<InspectData | null>(null)
  const rafRef = useRef<number>(0)
  const lastElementRef = useRef<HTMLElement | null>(null)

  const compute = useCallback(
    (clientX: number, clientY: number) => {
      const frame = frameRef.current
      const content = contentRef.current
      if (!frame || !content) return

      const frameRect = frame.getBoundingClientRect()

      const elements = document.elementsFromPoint(clientX, clientY)
      let target: HTMLElement | null = null

      for (const el of elements) {
        if (!(el instanceof HTMLElement)) continue
        if (el.closest('[data-inspect-ui]')) continue
        if (el === content) continue
        if (content.contains(el)) {
          target = el
          break
        }
      }

      if (!target) {
        if (lastElementRef.current !== null) {
          lastElementRef.current = null
          setData(null)
        }
        return
      }

      if (target === lastElementRef.current) return
      lastElementRef.current = target

      const elRect = target.getBoundingClientRect()
      const cs = getComputedStyle(target)

      const padding: BoxSides = {
        top: parsePx(cs.paddingTop),
        right: parsePx(cs.paddingRight),
        bottom: parsePx(cs.paddingBottom),
        left: parsePx(cs.paddingLeft),
      }

      const margin: BoxSides = {
        top: parsePx(cs.marginTop),
        right: parsePx(cs.marginRight),
        bottom: parsePx(cs.marginBottom),
        left: parsePx(cs.marginLeft),
      }

      const rect = {
        x: elRect.left - frameRect.left,
        y: elRect.top - frameRect.top,
        width: elRect.width,
        height: elRect.height,
      }

      const contentBox = {
        x: rect.x + padding.left,
        y: rect.y + padding.top,
        width: rect.width - padding.left - padding.right,
        height: rect.height - padding.top - padding.bottom,
      }

      const display = cs.display
      const flexDirection = display.includes('flex') ? cs.flexDirection || 'row' : null

      let gaps = computeGaps(target, cs, frameRect)
      if (gaps.length === 0 && target.parentElement && content.contains(target.parentElement)) {
        const parentCs = getComputedStyle(target.parentElement)
        gaps = computeGaps(target.parentElement, parentCs, frameRect)
      }

      const anchorName = target.getAttribute('data-slot') || target.tagName.toLowerCase()

      let fontMetrics: FontMetrics | null = null
      if (hasDirectTextContent(target)) {
        const variableAxes = parseVariationSettings(cs.fontVariationSettings)
        fontMetrics = {
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          fontFamily: cs.fontFamily.split(',')[0].trim().replace(/['"]/g, ''),
          fontWeight: variableAxes['wght'] ? `wght ${variableAxes['wght']}` : cs.fontWeight,
          letterSpacing: cs.letterSpacing === 'normal' ? '0' : cs.letterSpacing,
          color: rgbToHex(cs.color),
          variableAxes,
        }
      }

      setData({
        rect,
        contentBox,
        padding,
        margin,
        display,
        flexDirection,
        gaps,
        anchorName,
        tagName: target.tagName.toLowerCase(),
        fontMetrics,
        element: target,
      })
    },
    [frameRef, contentRef],
  )

  useEffect(() => {
    if (!active) {
      lastElementRef.current = null
      return
    }

    const frame = frameRef.current
    if (!frame) return

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        compute(e.clientX, e.clientY)
      })
    }

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafRef.current)
      lastElementRef.current = null
      setData(null)
    }

    frame.addEventListener('mousemove', handleMouseMove)
    frame.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      frame.removeEventListener('mousemove', handleMouseMove)
      frame.removeEventListener('mouseleave', handleMouseLeave)
      lastElementRef.current = null
      setData(null)
    }
  }, [active, compute, frameRef])

  return active ? data : null
}
