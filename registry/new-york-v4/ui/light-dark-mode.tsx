"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/core/button"
import { SunIcon } from "@/components/ui/our/common/sun"
import { MoonIcon } from "@/components/ui/our/common/moon"

export function LightDarkMode() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="btn-3d"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <SunIcon
        size={20}
        className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <MoonIcon
        size={20}
        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
    </Button>
  )
}
