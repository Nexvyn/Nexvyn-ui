'use client'

import { useState } from 'react'
import {
  AiInput,
  AiInputAgentMenu,
  AiInputPlusMenu,
  AiInputSettingsDropdown,
  type AiInputEffortLevel,
} from '@/components/ui/ai-input'

export function AiInputPreview() {
  const [value, setValue] = useState('')
  const [webSearch, setWebSearch] = useState(false)
  const [agent, setAgent] = useState('claude')
  const [settings, setSettings] = useState<Record<string, string>>({
    model: 'fast',
    effort: 'medium',
  })

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <AiInput
          value={value}
          onValueChange={setValue}
          onSubmit={() => setValue('')}
          placeholder="Ask anything..."
          showMessages
          onMicClick={() => {}}
          startSlot={
            <AiInputPlusMenu
              items={[
                { type: 'action', value: 'attach', label: 'Attach file' },
                { type: 'action', value: 'photo', label: 'Add photo' },
                { type: 'separator', value: 'sep-1' },
                {
                  type: 'toggle',
                  value: 'web-search',
                  label: 'Web search',
                  checked: webSearch,
                  onCheckedChange: setWebSearch,
                },
                { type: 'separator', value: 'sep-2' },
                {
                  type: 'submenu',
                  value: 'connect',
                  label: 'Connect apps',
                  items: [
                    { type: 'action', value: 'drive', label: 'Google Drive' },
                    { type: 'action', value: 'notion', label: 'Notion' },
                    { type: 'action', value: 'github', label: 'GitHub' },
                  ],
                },
              ]}
            />
          }
          endSlot={
            <>
              <AiInputAgentMenu
                options={[
                  { value: 'claude', label: 'Claude' },
                  { value: 'assistant', label: 'Assistant' },
                ]}
                value={agent}
                onValueChange={setAgent}
              />
              <AiInputSettingsDropdown
                className="ms-auto"
                groups={[
                  {
                    id: 'model',
                    label: 'Model',
                    display: 'featured',
                    options: [
                      { value: 'fast', label: 'Fast', description: 'Quick, everyday answers' },
                      {
                        value: 'thinking',
                        label: 'Thinking',
                        description: 'Slower, more thorough',
                      },
                    ],
                  },
                  {
                    id: 'effort',
                    label: 'Effort',
                    display: 'submenu',
                    options: [
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                    ],
                  },
                ]}
                values={settings}
                onValueChange={(groupId, val) =>
                  setSettings((prev) => ({ ...prev, [groupId]: val }))
                }
                effortLevel={settings.effort as AiInputEffortLevel}
              />
            </>
          }
        />
      </div>
    </div>
  )
}
