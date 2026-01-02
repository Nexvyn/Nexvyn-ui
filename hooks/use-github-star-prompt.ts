"use client"

import { useState, useCallback, useEffect } from "react"

const STORAGE_KEY = "github-star-prompt"
const DISMISS_KEY = "github-star-prompt-dismissed"
const PAGE_VIEW_THRESHOLD = 5

interface UseGitHubStarPromptReturn {
  shouldShow: boolean
  dismiss: () => void
  dismissForever: () => void
  isToastActive: boolean
  setToastActive: (active: boolean) => void
}

export function useGitHubStarPrompt(): UseGitHubStarPromptReturn {
  const [shouldShow, setShouldShow] = useState(false)
  const [isToastActive, setToastActive] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const isDismissedForever = localStorage.getItem(DISMISS_KEY) === "true"
    if (isDismissedForever) {
      setShouldShow(false)
      return
    }

    const pageViews = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10)
    const newPageViews = pageViews + 1
    localStorage.setItem(STORAGE_KEY, newPageViews.toString())

    if (newPageViews >= PAGE_VIEW_THRESHOLD) {
      setShouldShow(true)
    }
  }, [])

  const dismiss = useCallback(() => {
    setShouldShow(false)
    setToastActive(false)
    localStorage.setItem(STORAGE_KEY, "0")
  }, [])

  const dismissForever = useCallback(() => {
    setShouldShow(false)
    setToastActive(false)
    localStorage.setItem(DISMISS_KEY, "true")
  }, [])

  return {
    shouldShow,
    dismiss,
    dismissForever,
    isToastActive,
    setToastActive,
  }
}
