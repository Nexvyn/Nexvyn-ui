'use client'

import dynamic from 'next/dynamic'
import type { ComponentItem } from '@/lib/components-registry'
import { blueprintPreviews } from '@/components/showcase/preview-map'
import { BlueprintReveal } from '@/components/showcase/blueprint-reveal'

const Badge = dynamic(() => import('@/components/ui/badge').then((m) => m.Badge), { ssr: false })

const BounceSidebar = dynamic(
  () => import('@/components/ui/bounce-sidebar').then((m) => m.BounceSidebar),
  { ssr: false },
)

const ColorPicker = dynamic(
  () => import('@/components/ui/color-picker-standalone').then((m) => m.ColorPicker),
  { ssr: false },
)

const GooDropdown = dynamic(
  () => import('@/components/ui/goo-dropdown').then((m) => m.GooDropdown),
  { ssr: false },
)

const PasswordInput = dynamic(
  () => import('@/components/ui/password-input').then((m) => m.PasswordInput),
  { ssr: false },
)

const RatioSlider = dynamic(
  () => import('@/components/ui/ratio-slider').then((m) => m.RatioSlider),
  { ssr: false },
)

function LivePreview({ item }: { item: ComponentItem }) {
  switch (item.id) {
    case 'badge':
      return <Badge>Early Access</Badge>
    case 'bounce-sidebar':
      return (
        <BounceSidebar
          items={['Dashboard', 'Analytics', 'Projects', 'Team', 'Messages']}
          defaultValue={0}
          className="w-20"
        />
      )
    case 'color-picker':
      return <ColorPicker coreSize={40} petalSize={28} />
    case 'goo-dropdown':
      return <GooDropdown width={100} gap={10} itemHeight={24} />
    case 'password-input':
      return <PasswordInput placeholder="Password" containerClassName="w-40" />
    case 'ratio-slider':
      return <RatioSlider className="w-64" />
    case 'table-of-contents':
      return (
        <div className="w-30 space-y-1.5">
          {['Introduction', 'Getting Started', 'API Reference'].map((label, i) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-[10px]"
              style={{
                backgroundColor: i === 0 ? 'var(--color-accent)' : 'transparent',
                color: i === 0 ? 'var(--color-bg)' : 'var(--color-muted)',
              }}
            >
              <div
                className="size-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: i === 0 ? 'var(--color-bg)' : 'var(--color-border)',
                }}
              />
              {label}
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

const LIVE_PREVIEW_IDS = [
  'badge',
  'bounce-sidebar',
  'color-picker',
  'goo-dropdown',
  'password-input',
  'ratio-slider',
  'table-of-contents',
]

export function ComponentPreview({ item }: { item: ComponentItem }) {
  const blueprintId = `${item.id}-blueprint`
  const Drawing = blueprintPreviews[blueprintId]

  if (Drawing) {
    return (
      <BlueprintReveal id={blueprintId}>
        <Drawing />
      </BlueprintReveal>
    )
  }

  if (LIVE_PREVIEW_IDS.includes(item.id)) {
    return <LivePreview item={item} />
  }

  return null
}
