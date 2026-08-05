'use client'

import { useState } from 'react'
import { Checkbox, CheckboxField } from '@/components/ui/checkbox'

export function CheckboxPreview() {
  const [todoChecked, setTodoChecked] = useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-6 p-8">
      <CheckboxField label="Accept terms">
        <Checkbox name="terms" />
      </CheckboxField>

      <CheckboxField label="Receive updates">
        <Checkbox defaultChecked name="updates" />
      </CheckboxField>

      <CheckboxField label="Select all">
        <Checkbox checked="indeterminate" />
      </CheckboxField>

      <CheckboxField label="Disabled option">
        <Checkbox disabled defaultChecked />
      </CheckboxField>

      <CheckboxField label="Buy groceries" strikeThrough>
        <Checkbox checked={todoChecked} onCheckedChange={(next) => setTodoChecked(next === true)} />
      </CheckboxField>
    </div>
  )
}
