import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { RotateCcw, Plus, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip } from './tooltip'

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

function getThemeSnapshot() {
  return typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const DEFAULT_COLORS = {
  bg: '#ffffff',
  fg: '#0a0a0a',
  accent: '#7AA7C7',
  radius: '45px',
}

const BG_PRESETS = ['#ffffff', '#0a0a0a', '#171717', '#fafafa', '#f5f5f5', '#f3f4f6', '#fdf2f8']
const FG_PRESETS = ['#0a0a0a', '#ffffff', '#737373', '#3b82f6', '#ec4899', '#e11d48', '#16a34a']
const AC_PRESETS = ['#7AA7C7', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#7c3aed', '#ef4444']

function isDarkColor(hex: string) {
  const c = hex.replace('#', '')
  if (c.length !== 6) return false
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luma < 128
}

function getContrastAccentColor(hex: string, isDark: boolean) {
  const c = hex.replace('#', '')
  if (c.length !== 6) return isDark ? '#9bc3e2' : '#3c6e91'
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  
  if (isDark) {
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    if (luma < 120) {
      const factor = 1.4
      const newR = Math.min(255, Math.round(r * factor + 30))
      const newG = Math.min(255, Math.round(g * factor + 30))
      const newB = Math.min(255, Math.round(b * factor + 30))
      const toHex = (n: number) => n.toString(16).padStart(2, '0')
      return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
    }
    return hex
  } else {
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    if (luma > 130) {
      const factor = 0.6
      const newR = Math.round(r * factor)
      const newG = Math.round(g * factor)
      const newB = Math.round(b * factor)
      const toHex = (n: number) => n.toString(16).padStart(2, '0')
      return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
    }
    return hex
  }
}

export default function ComponentColorBar() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => 'light')
  const [bg, setBg] = useState<string | null>(null)
  const [fg, setFg] = useState<string | null>(null)
  const [accent, setAccent] = useState<string | null>(null)
  const [radius, setRadius] = useState<string | null>(null)

  const [activeMenu, setActiveMenu] = useState<'bg' | 'fg' | 'ac' | 'round' | null>(null)

  useEffect(() => {
    const isDark = theme === 'dark'
    const defaultBg = isDark ? '#0a0a0a' : '#ffffff'
    const defaultFg = isDark ? '#fafafa' : '#0a0a0a'

    setBg((current) => {
      if (current === defaultBg) return null
      const prevDefaultBg = isDark ? '#ffffff' : '#0a0a0a'
      if (current === prevDefaultBg) return null
      return current
    })

    setFg((current) => {
      if (current === defaultFg) return null
      const prevDefaultFg = isDark ? '#0a0a0a' : '#fafafa'
      if (current === prevDefaultFg) return null
      return current
    })
  }, [theme])

  useEffect(() => {
    const isDark = theme === 'dark'
    const defaultBg = isDark ? '#0a0a0a' : '#ffffff'
    const defaultFg = isDark ? '#fafafa' : '#0a0a0a'

    const activeBg = bg ?? defaultBg
    const activeFg = fg ?? defaultFg

    const cards = document.querySelectorAll('.detail-preview-card')
    cards.forEach((card) => {
      const element = card as HTMLElement
      if (bg === null && fg === null) {
        element.style.removeProperty('--preview-bg')
        element.style.removeProperty('--preview-fg')
        element.style.removeProperty('--preview-border')
        element.style.removeProperty('--preview-border-strong')
      } else {
        element.style.setProperty('--preview-bg', activeBg)
        element.style.setProperty('--preview-fg', activeFg)

        const dark = isDarkColor(activeBg)
        element.style.setProperty('--preview-border', dark ? '#262626' : '#e5e5e5')
        element.style.setProperty('--preview-border-strong', dark ? '#404040' : '#d4d4d4')
      }
    })
  }, [bg, fg, theme])

  useEffect(() => {
    const activeAccent = accent ?? '#7AA7C7'
    const isDark = theme === 'dark'
    const accentText = getContrastAccentColor(activeAccent, isDark)

    if (accent === null || accent === '#7AA7C7') {
      document.documentElement.style.removeProperty('--preview-accent')
      document.documentElement.style.removeProperty('--preview-accent-text')
    } else {
      document.documentElement.style.setProperty('--preview-accent', accent)
      document.documentElement.style.setProperty('--preview-accent-text', accentText)
    }
  }, [accent, theme])

  useEffect(() => {
    const cards = document.querySelectorAll('.detail-preview-card')
    cards.forEach((card) => {
      ;(card as HTMLElement).style.borderRadius = radius ?? '45px'
    })
  }, [radius])

  useEffect(() => {
    return () => {
      const cards = document.querySelectorAll('.detail-preview-card')
      cards.forEach((card) => {
        const element = card as HTMLElement
        element.style.removeProperty('--preview-bg')
        element.style.removeProperty('--preview-fg')
        element.style.removeProperty('--preview-border')
        element.style.removeProperty('--preview-border-strong')
      })
      document.documentElement.style.removeProperty('--preview-accent')
      document.documentElement.style.removeProperty('--preview-accent-text')
    }
  }, [])

  const handleReset = () => {
    setBg(null)
    setFg(null)
    setAccent(null)
    setRadius(null)
    setActiveMenu(null)
  }

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeMenu) return

    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [activeMenu])

  const bgCustomRef = useRef<HTMLInputElement>(null)
  const fgCustomRef = useRef<HTMLInputElement>(null)
  const acCustomRef = useRef<HTMLInputElement>(null)

  const toggleMenu = (menu: 'bg' | 'fg' | 'ac' | 'round') => {
    setActiveMenu((prev) => (prev === menu ? null : menu))
  }

  const activeBg = bg ?? (theme === 'dark' ? '#0a0a0a' : '#ffffff')
  const activeFg = fg ?? (theme === 'dark' ? '#fafafa' : '#0a0a0a')
  const activeAccent = accent ?? '#7AA7C7'
  const activeRadius = radius ?? '45px'

  const handleBgSelect = (color: string) => {
    const isDark = theme === 'dark'
    const defaultBg = isDark ? '#0a0a0a' : '#ffffff'
    if (color === defaultBg) {
      setBg(null)
    } else {
      setBg(color)
    }
  }

  const handleFgSelect = (color: string) => {
    const isDark = theme === 'dark'
    const defaultFg = isDark ? '#fafafa' : '#0a0a0a'
    if (color === defaultFg) {
      setFg(null)
    } else {
      setFg(color)
    }
  }

  const handleAccentSelect = (color: string) => {
    if (color === '#7AA7C7') {
      setAccent(null)
    } else {
      setAccent(color)
    }
  }

  return (
    <div ref={containerRef} className="detail-elevated-pill flex flex-col items-center gap-0.5 rounded-2xl p-1 bg-(--color-surface) select-none shadow-none">
      
      <div className="relative">
        <Tooltip content="Background Color (BG)" side="left">
          <button
            type="button"
            onClick={() => toggleMenu('bg')}
            className={`h-8 w-8 cursor-pointer rounded-xl border-0 transition-[transform] duration-150 active:scale-95 flex items-center justify-center ${
              activeMenu === 'bg' ? 'ring-2 ring-(--color-accent) ring-offset-1 ring-offset-(--color-bg)' : ''
            }`}
            style={{ backgroundColor: activeBg }}
          />
        </Tooltip>

        <AnimatePresence>
          {activeMenu === 'bg' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 8 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-11 top-0 flex items-center gap-1 p-1.5 rounded-xl border border-(--color-border) bg-(--color-surface) z-50 origin-right"
            >
              {BG_PRESETS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleBgSelect(color)}
                  className={`h-6.5 w-6.5 rounded-md border border-(--color-border-strong) cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
                    activeBg === color ? 'ring-2 ring-(--color-accent) ring-offset-1 ring-offset-(--color-bg)' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <button
                type="button"
                onClick={() => bgCustomRef.current?.click()}
                className="h-6.5 w-6.5 rounded-md border border-(--color-border-strong) bg-(--color-surface-2) text-(--color-fg) cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                title="Custom Color"
              >
                <Plus className="h-3.5 w-3.5" />
                <input
                  ref={bgCustomRef}
                  type="color"
                  value={activeBg}
                  onChange={(e) => handleBgSelect(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <Tooltip content="Text Color (FG)" side="left">
          <button
            type="button"
            onClick={() => toggleMenu('fg')}
            className={`h-8 w-8 cursor-pointer rounded-xl border-0 transition-[transform] duration-150 active:scale-95 flex items-center justify-center ${
              activeMenu === 'fg' ? 'ring-2 ring-(--color-accent) ring-offset-1 ring-offset-(--color-bg)' : ''
            }`}
            style={{ backgroundColor: activeFg }}
          />
        </Tooltip>

        <AnimatePresence>
          {activeMenu === 'fg' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 8 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-11 top-0 flex items-center gap-1 p-1.5 rounded-xl border border-(--color-border) bg-(--color-surface) z-50 origin-right"
            >
              {FG_PRESETS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleFgSelect(color)}
                  className={`h-6.5 w-6.5 rounded-md border border-(--color-border-strong) cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
                    activeFg === color ? 'ring-2 ring-(--color-accent) ring-offset-1 ring-offset-(--color-bg)' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <button
                type="button"
                onClick={() => fgCustomRef.current?.click()}
                className="h-6.5 w-6.5 rounded-md border border-(--color-border-strong) bg-(--color-surface-2) text-(--color-fg) cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                title="Custom Color"
              >
                <Plus className="h-3.5 w-3.5" />
                <input
                  ref={fgCustomRef}
                  type="color"
                  value={activeFg}
                  onChange={(e) => handleFgSelect(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <Tooltip content="Accent Color (AC)" side="left">
          <button
            type="button"
            onClick={() => toggleMenu('ac')}
            className={`h-8 w-8 cursor-pointer rounded-xl border-0 transition-[transform] duration-150 active:scale-95 flex items-center justify-center ${
              activeMenu === 'ac' ? 'ring-2 ring-(--color-accent) ring-offset-1 ring-offset-(--color-bg)' : ''
            }`}
            style={{ backgroundColor: activeAccent }}
          />
        </Tooltip>

        <AnimatePresence>
          {activeMenu === 'ac' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 8 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-11 top-0 flex items-center gap-1 p-1.5 rounded-xl border border-(--color-border) bg-(--color-surface) z-50 origin-right"
            >
              {AC_PRESETS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleAccentSelect(color)}
                  className={`h-6.5 w-6.5 rounded-md border border-(--color-border-strong) cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
                    activeAccent === color ? 'ring-2 ring-(--color-accent) ring-offset-1 ring-offset-(--color-bg)' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <button
                type="button"
                onClick={() => acCustomRef.current?.click()}
                className="h-6.5 w-6.5 rounded-md border border-(--color-border-strong) bg-(--color-surface-2) text-(--color-fg) cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                title="Custom Color"
              >
                <Plus className="h-3.5 w-3.5" />
                <input
                  ref={acCustomRef}
                  type="color"
                  value={activeAccent}
                  onChange={(e) => handleAccentSelect(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <Tooltip content="Card Corner Radius (Round)" side="left">
          <button
            type="button"
            onClick={() => toggleMenu('round')}
            className={`h-8 w-8 cursor-pointer rounded-xl flex items-center justify-center transition-[transform] duration-150 bg-transparent hover:bg-(--color-surface-2) text-(--color-muted) active:scale-95 ${
              activeMenu === 'round' ? 'bg-(--color-surface-2)' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" className="h-4.5 w-4.5">
              <path
                d="M84 428V224C84 132.3 158.3 58 250 58H430"
                stroke="currentColor"
                strokeWidth="52"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Tooltip>

        <AnimatePresence>
          {activeMenu === 'round' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 8 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-11 top-0 flex flex-col gap-1 p-1.5 rounded-xl border border-(--color-border) bg-(--color-surface) w-32 z-50 origin-right"
            >
              <button
                type="button"
                onClick={() => setRadius('0px')}
                className="flex items-center justify-between w-full px-2 py-1 rounded-lg text-[11px] font-medium cursor-pointer hover:bg-(--color-surface-2) text-(--color-fg) transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-none border border-(--color-fg)/50 flex items-center justify-center shrink-0" />
                  <span>Sharp</span>
                </div>
                {activeRadius === '0px' && <Check className="h-3 w-3 text-(--color-accent)" />}
              </button>

              <button
                type="button"
                onClick={() => setRadius('16px')}
                className="flex items-center justify-between w-full px-2 py-1 rounded-lg text-[11px] font-medium cursor-pointer hover:bg-(--color-surface-2) text-(--color-fg) transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm border border-(--color-fg)/50 flex items-center justify-center shrink-0" />
                  <span>Rounded</span>
                </div>
                {activeRadius === '16px' && <Check className="h-3 w-3 text-(--color-accent)" />}
              </button>

              <button
                type="button"
                onClick={() => setRadius(null)}
                className="flex items-center justify-between w-full px-2 py-1 rounded-lg text-[11px] font-medium cursor-pointer hover:bg-(--color-surface-2) text-(--color-fg) transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-(--color-fg)/50 flex items-center justify-center shrink-0" />
                  <span>Pill</span>
                </div>
                {activeRadius === '45px' && <Check className="h-3 w-3 text-(--color-accent)" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Tooltip content="Reset All Customizations" side="left">
        <button
          type="button"
          onClick={handleReset}
          className="h-8 w-8 cursor-pointer rounded-xl flex items-center justify-center transition-[transform] duration-150 bg-transparent hover:bg-(--color-surface-2) text-(--color-muted) active:scale-95"
        >
          <RotateCcw className="h-4.5 w-4.5" />
        </button>
      </Tooltip>

    </div>
  )
}
