"use client"

import * as React from "react"

type Config = {
  packageManager: "pnpm" | "npm" | "yarn" | "bun"
  installationType: "cli" | "manual"
}

const defaultConfig: Config = {
  packageManager: "pnpm",
  installationType: "cli",
}

const ConfigContext = React.createContext<{
  config: Config
  setConfig: (config: Config) => void
}>({
  config: defaultConfig,
  setConfig: () => {},
})

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = React.useState<Config>(() => {
    if (typeof window === "undefined") {
      return defaultConfig
    }

    try {
      const stored = localStorage.getItem("config")
      if (stored) {
        return { ...defaultConfig, ...JSON.parse(stored) }
      }
    } catch {
      // Ignore storage errors
    }

    return defaultConfig
  })

  const setConfig = React.useCallback((newConfig: Config) => {
    setConfigState(newConfig)
    try {
      localStorage.setItem("config", JSON.stringify(newConfig))
    } catch {
      // Ignore storage errors
    }
  }, [])

  return <ConfigContext.Provider value={{ config, setConfig }}>{children}</ConfigContext.Provider>
}

export function useConfig(): [Config, (config: Config) => void] {
  const context = React.useContext(ConfigContext)
  return [context.config, context.setConfig]
}
