'use client'

import { useSyncExternalStore } from 'react'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

function getSnapshot() {
  return window.innerWidth
}

function getServerSnapshot() {
  return 0
}

export function useScreenSize() {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return {
    width,
    lessThan: (bp: keyof typeof breakpoints) => width > 0 && width < breakpoints[bp],
    greaterThanOrEqual: (bp: keyof typeof breakpoints) => width >= breakpoints[bp],
  }
}
