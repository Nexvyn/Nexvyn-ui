import type { ComponentItem } from '@/lib/components-registry'
import {
  sidebarBaseProps,
  sidebarOpenProps,
  sidebarSelectionProps,
  sidebarShared,
} from '@/components/blocks/sidebar/meta/shared'

export const sidebarWorkspaceMetadata: ComponentItem = {
  ...sidebarShared,
  id: 'sidebar-workspace',
  name: 'Workspace',
  parent: 'sidebar',
  href: '/blocks/sidebar/workspace',
  registry: 'sidebar-workspace',
  description:
    'A sectioned workspace sidebar: a workspace select and a new page button on top, main links, titled groups of pages, and settings pinned to the bottom. A button in the page header slides it away and the page follows its edge.',
  props: [
    {
      name: 'workspaces',
      type: '{ value: string; label: string }[]',
      description: 'Options in the native workspace select.',
    },
    { name: 'workspace', type: 'string', description: 'Controlled workspace value.' },
    {
      name: 'defaultWorkspace',
      type: 'string',
      description: 'Initial workspace when uncontrolled.',
    },
    {
      name: 'onWorkspaceChange',
      type: '(value: string) => void',
      description: 'Called when a workspace is picked.',
    },
    {
      name: 'primary',
      type: '{ id: string; label: string; href: string; icon?: ReactNode }[]',
      description: 'Links at the top of the sidebar.',
    },
    {
      name: 'groups',
      type: '{ id: string; label?: string; items: SidebarItem[] }[]',
      description: 'Titled lists under the main links, such as recent and favorite pages.',
    },
    {
      name: 'secondary',
      type: 'SidebarItem[]',
      description: 'Links pinned to the bottom edge.',
    },
    ...sidebarSelectionProps,
    ...sidebarOpenProps('whether the sidebar is shown from the medium breakpoint', 'true'),
    {
      name: 'onNewPage',
      type: '() => void',
      description: 'Called when the new page button is pressed.',
    },
    {
      name: 'workspaceLabel, newPageLabel, showLabel, hideLabel',
      type: 'string',
      description: 'Hidden label of the select and accessible names of the buttons.',
    },
    ...sidebarBaseProps,
  ],
  usage: `<SidebarWorkspace
  workspace={workspace}
  onWorkspaceChange={setWorkspace}
  value={pageId}
  onValueChange={setPageId}
  onNewPage={createPage}
>
  <Editor />
</SidebarWorkspace>`,
}
