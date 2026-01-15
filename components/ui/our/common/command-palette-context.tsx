"use client"

import * as React from "react"

interface CommandPaletteContextType {
    open: boolean
    setOpen: (open: boolean) => void
    page: "main" | "feedback"
    setPage: (page: "main" | "feedback") => void
}

const CommandPaletteContext = React.createContext<CommandPaletteContextType | undefined>(undefined)

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState<"main" | "feedback">("main")

    return (
        <CommandPaletteContext.Provider value={{ open, setOpen, page, setPage }}>
            {children}
        </CommandPaletteContext.Provider>
    )
}

export function useCommandPalette() {
    const context = React.useContext(CommandPaletteContext)
    if (context === undefined) {
        throw new Error("useCommandPalette must be used within a CommandPaletteProvider")
    }
    return context
}
