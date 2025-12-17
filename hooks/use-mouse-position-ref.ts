import { useEffect, useRef, type RefObject } from "react"

/**
 * Custom hook that tracks mouse position relative to a container element
 * Returns a ref object containing the normalized mouse position (-1 to 1)
 * @param containerRef - Ref to the container element to track mouse position within
 */
export function useMousePositionRef(containerRef: RefObject<HTMLElement | null>) {
  const mousePositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalize to -1 to 1 range
      mousePositionRef.current = {
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [containerRef])

  return mousePositionRef
}
