'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'

export function SwitchPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex items-center justify-center p-6">
      <div className="space-y-3">
        <Switch checked={checked} onCheckedChange={setChecked} label="Notifications" />
        <Switch defaultChecked label="Dark mode" />
        <Switch checked disabled label="Disabled" />
      </div>
    </div>
  )
}
