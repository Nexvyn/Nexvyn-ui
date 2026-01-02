"use client"

import { Search, X } from "lucide-react"

interface IconsSearchProps {
  value: string
  onChange: (value: string) => void
}

export function IconsSearch({ value, onChange }: IconsSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search icons..."
        className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary/50 h-9 w-full rounded-lg border pr-9 pl-9 text-sm transition-all focus:ring-1 focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
