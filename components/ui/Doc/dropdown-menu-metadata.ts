import type { ComponentItem } from '@/lib/components-registry'

export const dropdownMenuMetadata: ComponentItem = {
  id: 'dropdown-menu',
  name: 'Dropdown Menu',
  collection: 'menus',
  basic: true,
  previewType: 'default',
  description:
    'A popover action menu with a proximity-driven morphing highlight. The muted hover highlight springs between items as the pointer moves, giving the menu a fluid, alive feel.',
  registry: 'dropdown-menu',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click the trigger to open. Hover or use arrow keys to navigate items. The highlight morphs between items with spring physics.',
  props: [
    {
      name: 'open',
      type: 'boolean',
      description: 'Controlled open state.',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      description: 'Initial open state for uncontrolled usage. Defaults to false.',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the menu opens or closes.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional classes for the container.',
    },
  ],
  usage: `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
}
