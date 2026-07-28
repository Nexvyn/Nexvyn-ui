'use client'

import { Button } from '@/components/ui/button'

export function ButtonPreview() {
  return (
    <div className="flex w-full flex-col items-center gap-8 p-8">
      {/* Variant showcase */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      {/* Size showcase */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* States */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button destructive>Destructive</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  )
}
