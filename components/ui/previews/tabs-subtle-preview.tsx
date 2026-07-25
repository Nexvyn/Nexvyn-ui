'use client'

import { useState } from 'react'
import { TabsSubtle, TabsSubtleItem, TabsSubtlePanel } from '@/components/ui/tabs-subtle'

export function TabsSubtlePreview() {
  const [value, setValue] = useState('overview')

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <TabsSubtle value={value} onValueChange={setValue}>
        <TabsSubtleItem value="overview" label="Overview" />
        <TabsSubtleItem value="activity" label="Activity" />
        <TabsSubtleItem value="settings" label="Settings" />
        <TabsSubtlePanel value="overview" className="text-sm text-muted-foreground">
          Overview content
        </TabsSubtlePanel>
        <TabsSubtlePanel value="activity" className="text-sm text-muted-foreground">
          Activity content
        </TabsSubtlePanel>
        <TabsSubtlePanel value="settings" className="text-sm text-muted-foreground">
          Settings content
        </TabsSubtlePanel>
      </TabsSubtle>
    </div>
  )
}
