'use client'

import { createContext, useCallback, useContext, useRef, type ReactNode } from 'react'

type WaveApi = { splash: (clientX: number, clientY: number, strength?: number) => void }

const PageWaveContext = createContext<WaveApi>({ splash: () => {} })

export function usePageWave() {
  return useContext(PageWaveContext)
}

const DURATION = 3.4
const MAP_W = 220 // small map keeps the per-frame cost at 60fps
const PEAK_SCALE = 55

// Three wave layers: speed (px/s in element space), wavelength (px), relative amplitude
const LAYERS = [
  { speed: 820, wavelength: 340, amp: 1.0 },
  { speed: 610, wavelength: 220, amp: 0.55 },
  { speed: 450, wavelength: 150, amp: 0.3 },
]

export function PageWaveProvider({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const feImageRef = useRef<SVGFEImageElement>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement>(null)
  const rafRef = useRef(0)
  const activeRef = useRef(false)
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const splash = useCallback((clientX: number, clientY: number, strength = 1) => {
    const content = contentRef.current
    const feImage = feImageRef.current
    const disp = dispRef.current
    if (!content || !feImage || !disp || activeRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    activeRef.current = true

    window.dispatchEvent(new CustomEvent('nexvyn:splash', { detail: { x: clientX, y: clientY } }))

    const rect = content.getBoundingClientRect()
    const elemW = rect.width
    const elemH = rect.height
    const cx = clientX - rect.left
    const cy = clientY - rect.top

    const mapW = MAP_W
    const mapH = Math.max(32, Math.round((elemH / elemW) * MAP_W))
    if (!mapCanvasRef.current) mapCanvasRef.current = document.createElement('canvas')
    const canvas = mapCanvasRef.current
    canvas.width = mapW
    canvas.height = mapH
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) {
      activeRef.current = false
      return
    }
    const img = ctx.createImageData(mapW, mapH)
    const data = img.data
    const sx = elemW / mapW // element px per map px
    const sy = elemH / mapH

    content.style.filter = 'url(#page-water-wave)'
    content.style.willChange = 'filter'

    // primitiveUnits is userSpaceOnUse, so the map covers the element in px
    feImage.setAttribute('x', '0')
    feImage.setAttribute('y', '0')
    feImage.setAttribute('width', String(elemW))
    feImage.setAttribute('height', String(elemH))

    const falloff = Math.max(elemW, 900) * 0.9

    const t0 = performance.now()
    const tick = (nowMs: number) => {
      const t = (nowMs - t0) / 1000
      const p = Math.min(t / DURATION, 1)
      const settle = Math.pow(1 - p, 1.6)

      let px = 0
      for (let my = 0; my < mapH; my++) {
        const ey = my * sy - cy
        for (let mx = 0; mx < mapW; mx++) {
          const ex = mx * sx - cx
          const dist = Math.sqrt(ex * ex + ey * ey) + 0.0001

          let h = 0
          for (let L = 0; L < 3; L++) {
            const layer = LAYERS[L]
            const front = layer.speed * t
            const d = dist - front
            // only a band around/behind the wavefront oscillates (real ring)
            if (d < 60 && d > -layer.wavelength * 2.2) {
              const band = Math.exp(-(d * d) / (2 * layer.wavelength * layer.wavelength))
              h += layer.amp * band * Math.sin((d / layer.wavelength) * Math.PI * 2)
            }
          }
          h *= Math.exp(-dist / falloff) * settle

          const dirX = ex / dist
          const dirY = ey / dist
          data[px] = 128 + Math.max(-127, Math.min(127, dirX * h * 127)) // R = x-shift
          data[px + 1] = 128 + Math.max(-127, Math.min(127, dirY * h * 127)) // G = y-shift
          data[px + 2] = 128
          data[px + 3] = 255
          px += 4
        }
      }
      ctx.putImageData(img, 0, 0)
      feImage.setAttribute('href', canvas.toDataURL())
      disp.setAttribute('scale', String(PEAK_SCALE * strength))

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        disp.setAttribute('scale', '0')
        content.style.filter = ''
        content.style.willChange = ''
        activeRef.current = false
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  return (
    <PageWaveContext.Provider value={{ splash }}>
      <svg aria-hidden width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter
            id="page-water-wave"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
          >
            <feImage ref={feImageRef} preserveAspectRatio="none" result="map" />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="map"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div ref={contentRef}>{children}</div>
    </PageWaveContext.Provider>
  )
}
