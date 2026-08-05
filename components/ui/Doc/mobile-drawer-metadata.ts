import type { ComponentItem } from '@/lib/components-registry'

export const mobileDrawerMetadata: ComponentItem = {
  id: 'mobile-drawer',
  name: 'Mobile Drawer',
  collection: 'overlays',
  previewType: 'default',
  description:
    'A bottom-sheet drawer with swipe-to-dismiss, focus trap, scroll lock, and grab handle. The canonical mobile overlay.',
  registry: 'mobile-drawer',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Open to slide up from bottom. Swipe down, tap overlay, or press Escape to close. Focus is trapped inside.',
  props: [
    { name: 'open', type: 'boolean', description: 'Controlled open state.', required: true },
    {
      name: 'onClose',
      type: '() => void',
      description: 'Called when drawer should close.',
      required: true,
    },
    {
      name: 'dismissible',
      type: 'boolean',
      description: 'Enable swipe/overlay dismiss. Defaults to true.',
    },
  ],
  usage: `<MobileDrawer open={open} onClose={() => setOpen(false)} aria-label="Filters">
  <MobileDrawerTitle>Filters</MobileDrawerTitle>
  {/* content */}
</MobileDrawer>`,
}
