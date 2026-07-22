import type { ComponentItem } from '@/lib/components-registry'

export const tabsSubtleMetadata: ComponentItem = {
  id: 'tabs-subtle',
  name: 'Tabs Subtle',
  collection: 'navigation',
  previewType: 'default',
  basic: true,
  description:
    'A pill-style tab list where the selected indicator springs between tabs, built on the WAI-ARIA tabs pattern with full roving-focus keyboard support.',
  registry: 'tabs-subtle',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click a tab or use Arrow/Home/End keys while a tab is focused to move the selection. The indicator springs to the new tab.',
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled selected tab value.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: 'Initial selected tab for uncontrolled usage.',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called with the new value when the selection changes.',
    },
    {
      name: 'idPrefix',
      type: 'string',
      description: 'Prefix used to build stable ids for ARIA wiring across SSR/CSR.',
    },
  ],
  usage: `import { TabsSubtle, TabsSubtleItem, TabsSubtlePanel } from "@/components/ui/tabs-subtle"

export function Demo() {
  return (
    <>
      <TabsSubtle defaultValue="overview">
        <TabsSubtleItem value="overview" label="Overview" />
        <TabsSubtleItem value="activity" label="Activity" />
        <TabsSubtleItem value="settings" label="Settings" />
      </TabsSubtle>
      <TabsSubtlePanel value="overview">Overview content</TabsSubtlePanel>
      <TabsSubtlePanel value="activity">Activity content</TabsSubtlePanel>
      <TabsSubtlePanel value="settings">Settings content</TabsSubtlePanel>
    </>
  )
}`,
}
