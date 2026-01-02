"use client"

import { useState, useCallback } from "react"

interface UseCopyToClipboardReturn {
  copyToClipboard: (text: string) => Promise<boolean>
  isCopied: boolean
  error: Error | null
}

export function useCopyToClipboard(timeout = 2000): UseCopyToClipboardReturn {
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        setError(new Error("Clipboard not supported"))
        return false
      }

      try {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)
        setError(null)

        setTimeout(() => {
          setIsCopied(false)
        }, timeout)

        return true
      } catch (err) {
        setIsCopied(false)
        setError(err instanceof Error ? err : new Error("Failed to copy"))
        return false
      }
    },
    [timeout]
  )

  return { copyToClipboard, isCopied, error }
}
