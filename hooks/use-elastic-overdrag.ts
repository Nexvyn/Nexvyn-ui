'use client'

import { animate, useMotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { springs } from '@/lib/motion-tokens'

export interface UseElasticOverdragOptions {
  disabled?: boolean
  reduceMotion?: boolean
  deadZone?: number
  maxStretch?: number
  range?: number
}

export interface UseElasticOverdragResult {
  dragging: boolean
  scaleX: ReturnType<typeof useMotionValue<number>>
  transformOrigin: ReturnType<typeof useMotionValue<string>>
  onPointerDown: (event: React.PointerEvent<HTMLElement>) => void
}

export function useElasticOverdrag(
  options: UseElasticOverdragOptions = {},
): UseElasticOverdragResult {
  const {
    disabled = false,
    reduceMotion = false,
    deadZone = 4,
    maxStretch = 8,
    range = 120,
  } = options

  const [dragging, setDragging] = useState(false)
  const scaleX = useMotionValue(1)
  const transformOrigin = useMotionValue('0% 50%')
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => () => cleanupRef.current?.(), [])

  function springHome() {
    if (scaleX.get() !== 1) {
      animate(scaleX, 1, {
        ...springs.settle,
        velocity: scaleX.getVelocity(),
      })
    }
  }

  function onPointerDown(event: React.PointerEvent<HTMLElement>) {
    if (disabled) return
    cleanupRef.current?.()
    setDragging(true)
    const rect = event.currentTarget.getBoundingClientRect()
    let outside = false
    const move = (ev: PointerEvent) => {
      let past = 0
      if (ev.clientX < rect.left) past = ev.clientX - rect.left
      else if (ev.clientX > rect.right) past = ev.clientX - rect.right
      if (past === 0) {
        if (outside) {
          outside = false
          springHome()
        }
        return
      }
      if (!outside) {
        outside = true
        transformOrigin.set(past > 0 ? '0% 50%' : '100% 50%')
      }
      scaleX.stop()
      const over = Math.max(0, Math.abs(past) - deadZone)
      const stretchPx = maxStretch * (1 - Math.exp(-over / range))
      scaleX.set(1 + stretchPx / rect.width)
    }
    function removeListeners() {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
      cleanupRef.current = null
    }
    function end() {
      removeListeners()
      setDragging(false)
      springHome()
    }
    if (!reduceMotion) window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
    cleanupRef.current = removeListeners
  }

  return { dragging, scaleX, transformOrigin, onPointerDown }
}
