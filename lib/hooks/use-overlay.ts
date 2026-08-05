'use client'

import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return

    const container = ref.current
    if (!container) return

    const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (focusable.length) {
      focusable[0].focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const els = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (!els.length) return

      const first = els[0]
      const last = els[els.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, ref])
}

let scrollLockCount = 0
let originalOverflow = ''

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    if (scrollLockCount === 0) {
      originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    scrollLockCount++

    return () => {
      scrollLockCount--
      if (scrollLockCount === 0) {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [active])
}

export function useRestoreFocus(active: boolean, overrideRef?: RefObject<HTMLElement | null>) {
  const savedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (active) {
      savedRef.current = document.activeElement as HTMLElement | null
    } else {
      const target = overrideRef?.current ?? savedRef.current
      if (target && typeof target.focus === 'function') {
        target.focus()
      }
      savedRef.current = null
    }
  }, [active, overrideRef])
}

export interface UseDismissOptions {
  escape?: boolean
  outsidePointer?: boolean
  onDismiss: () => void
}

export function useDismiss(ref: RefObject<HTMLElement | null>, options: UseDismissOptions) {
  const { escape = true, outsidePointer = true, onDismiss } = options
  const onDismissRef = useRef(onDismiss)
  useEffect(() => {
    onDismissRef.current = onDismiss
  })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onDismissRef.current()
      }
    }

    const handlePointerDown = (e: PointerEvent) => {
      const container = ref.current
      if (!container) return
      if (!container.contains(e.target as Node)) {
        onDismissRef.current()
      }
    }

    if (escape) {
      document.addEventListener('keydown', handleKeyDown)
    }

    if (outsidePointer) {
      timer = setTimeout(() => {
        document.addEventListener('pointerdown', handlePointerDown)
      }, 0)
    }

    return () => {
      if (escape) {
        document.removeEventListener('keydown', handleKeyDown)
      }
      if (outsidePointer) {
        if (timer !== undefined) clearTimeout(timer)
        document.removeEventListener('pointerdown', handlePointerDown)
      }
    }
  }, [escape, outsidePointer, ref])
}
