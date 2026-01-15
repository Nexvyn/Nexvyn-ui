import { useState, useEffect } from "react"

export type OS = "macos" | "windows" | "linux" | "undetermined"

export function useOs() {
    const [os, setOs] = useState<OS>("undetermined")

    useEffect(() => {
        if (typeof window === "undefined") return

        const userAgent = window.navigator.userAgent.toLowerCase()

        // Check for Mac first
        if (userAgent.includes("mac")) {
            setOs("macos")
        } else if (userAgent.includes("win")) {
            setOs("windows")
        } else if (userAgent.includes("linux")) {
            setOs("linux")
        } else {
            setOs("undetermined")
        }
    }, [])

    return {
        os,
        isMac: os === "macos",
        isWindows: os === "windows",
        isLinux: os === "linux",
    }
}
