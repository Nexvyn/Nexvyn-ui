"use client"

import * as React from "react"

/**
 * DataFast analytics client stub
 * This is a placeholder for DataFast analytics integration
 */

export function useDataFast() {
  const track = React.useCallback((eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window !== "undefined" && window.datafast) {
      window.datafast(eventName, properties)
    }
  }, [])

  return { track }
}

declare global {
  interface Window {
    datafast?: (eventName: string, properties?: Record<string, unknown>) => void
  }
}
