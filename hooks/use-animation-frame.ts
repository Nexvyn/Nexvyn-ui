import { useEffect, useRef } from "react"

/**
 * Custom hook that calls a callback function on every animation frame
 * @param callback - Function to call on each animation frame
 */
export function useAnimationFrame(callback: () => void) {
    const requestRef = useRef<number | undefined>(undefined)
    const callbackRef = useRef(callback)

    // Update callback ref on each render to always have the latest callback
    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        const animate = () => {
            callbackRef.current()
            requestRef.current = requestAnimationFrame(animate)
        }

        requestRef.current = requestAnimationFrame(animate)

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [])
}
