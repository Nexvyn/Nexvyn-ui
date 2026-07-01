'use client'

import { usePathname } from 'next/navigation'
import { activeComponent, cleanDefault, swatchProp } from '@/lib/components-registry'
import { usePreviewControl } from './preview-controls'
import { cn } from '@/lib/utils'

type ColorSwatchesProps = {
  className?: string
  showLabel?: boolean
}

export default function ColorSwatches({
  className = '',
  showLabel = false,
}: ColorSwatchesProps) {
  const pathname = usePathname()
  const prop = swatchProp(activeComponent(pathname))

  const options = prop?.options ?? []
  const [value, setValue] = usePreviewControl(
    prop?.name ?? '',
    cleanDefault(prop) ?? options[0] ?? '',
  )

  if (!prop?.optionColors || options.length === 0) return null

  return (
    <div className={cn('detail-elevated-pill flex items-center gap-2.5 rounded-2xl px-4 py-2.5', className)}>
      {showLabel && (
        <span className="mr-0.5 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
          {prop.name}
        </span>
      )}
      {options.map((option) => {
        const selected = value === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => setValue(option)}
            aria-label={`Set ${prop.name} to ${option}`}
            aria-pressed={selected}
            title={option}
            className="detail-swatch h-7 w-7 cursor-pointer rounded-xl shadow-sm"
            style={{ backgroundColor: prop.optionColors![option] }}
          />
        )
      })}
    </div>
  )
}
