"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface SearchRegistryContextType {
    query: string
    setQuery: (query: string | null) => void
}

const SearchRegistryContext = createContext<SearchRegistryContextType | undefined>(undefined)

export function SearchRegistryProvider({ children }: { children: ReactNode }) {
    const [query, setQueryState] = useState('')

    const setQuery = (newQuery: string | null) => {
        setQueryState(newQuery || '')
    }

    return (
        <SearchRegistryContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchRegistryContext.Provider>
    )
}

export function useSearchRegistry() {
    const context = useContext(SearchRegistryContext)
    if (!context) {
        throw new Error('useSearchRegistry must be used within SearchRegistryProvider')
    }
    return context
}
