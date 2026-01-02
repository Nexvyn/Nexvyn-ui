"use client"

import { IconCard } from "./icon-card"

interface IconItem {
  name: string
  component: React.ComponentType<{ size?: number; isActive?: boolean }>
}

interface IconGridProps {
  icons: IconItem[]
  onSelectIcon: (name: string) => void
}

export function IconGrid({ icons, onSelectIcon }: IconGridProps) {
  if (icons.length === 0) {
    return (
      <div className="bg-card flex flex-col items-center justify-center rounded-xl py-24 text-center">
        <div className="mb-4 text-4xl">🔍</div>
        <p className="text-muted-foreground">No icons found</p>
        <p className="text-muted-foreground/70 mt-1 text-sm">Try a different search term</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {icons.map((icon) => (
        <IconCard
          key={icon.name}
          name={icon.name}
          icon={icon.component}
          onClick={() => onSelectIcon(icon.name)}
        />
      ))}
    </div>
  )
}
