import type { ComponentItem } from '@/lib/components-registry'

export const adaptiveActionsMetadata: ComponentItem = {
  id: 'adaptive-actions',
  name: 'Adaptive Actions',
  collection: 'menus',
  previewType: 'default',
  isNew: true,
  description:
    'A responsive action toolbar that measures its available inline size with ResizeObserver and smoothly moves overflowed items into an accessible dropdown menu. Priority and pinned flags ensure critical actions always remain visible. Items animate with opacity/transform when crossing the visible↔overflow boundary — no width animation.',
  registry: 'adaptive-actions',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Arrow keys rove focus across visible toolbar items and the overflow trigger (RTL-aware). Home/End jump to the ends. Enter/Space invoke an action or open the overflow menu. Inside the overflow menu, ArrowUp/Down navigates items, Escape returns focus to the trigger. Pinned items never overflow; higher-priority items overflow last. The overflow trigger shows a localized "More actions" label for screen readers.',
  props: [
    {
      name: 'actions',
      type: 'ActionItem[]',
      description:
        'Array of action items. Each has id, label, optional icon, disabled, destructive, priority (higher = overflows last), pinned (never overflows), and onSelect callback.',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: "aria-label for the toolbar region. Defaults to 'Actions'.",
    },
    {
      name: 'moreLabel',
      type: 'string',
      description: "Localized label for the overflow trigger button. Defaults to 'More actions'.",
    },
    {
      name: 'renderMoreTrigger',
      type: '(count: number) => ReactNode',
      description: 'Render a custom overflow trigger. Receives the count of hidden items.',
    },
    {
      name: 'maxVisible',
      type: 'number',
      description:
        'Maximum visible items before overflow — independent of inline measurement. Optional.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Merged onto the root toolbar element via cn().',
    },
  ],
  usage: `import { AdaptiveActions, type ActionItem } from "@/components/ui/adaptive-actions"

const actions: ActionItem[] = [
  { id: "edit", label: "Edit", priority: 3, pinned: true, icon: <EditIcon />, onSelect: () => {} },
  { id: "duplicate", label: "Duplicate", priority: 2, icon: <CopyIcon />, onSelect: () => {} },
  { id: "share", label: "Share", priority: 1, icon: <ShareIcon />, onSelect: () => {} },
  { id: "delete", label: "Delete", destructive: true, icon: <TrashIcon />, onSelect: () => {} },
]

export function Demo() {
  return <AdaptiveActions actions={actions} label="Document actions" moreLabel="More" />
}`,
}
