'use client'

import { ContextMenu } from '@/components/ui/context-menu'

export function ContextMenuPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <ContextMenu
        items={[
          { label: 'Copy', shortcut: '⌘C' },
          { label: 'Rename', separatorAfter: true },
          { label: 'Delete', destructive: true },
        ]}
      >
        <div className="flex h-32 w-48 items-center justify-center rounded-lg squircle-corners border border-(--color-border) bg-(--color-bg) text-sm text-(--color-muted)">
          Right-click me
        </div>
      </ContextMenu>
    </div>
  )
}
