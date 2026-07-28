import type { ComponentItem } from '@/lib/components-registry'

export const actionButtonMetadata: ComponentItem = {
  id: 'action-button',
  name: 'Action Button',
  collection: 'primitives',
  previewType: 'default',
  isNew: true,
  basic: false,
  description:
    'An async-aware button with an idle → pending → success/error state machine. Composes over Button, adding promise tracking, abort support, minimum-pending opt-in, auto-reset, layered crossfade transitions, and live screen-reader announcements.',
  registry: 'action-button',
  dependencies: [
    { name: 'motion' },
    { name: '@radix-ui/react-slot' },
    { name: 'class-variance-authority' },
  ],
  interaction:
    'Click triggers the async onAction callback. State transitions crossfade with opacity + scale(0.95) + 1px blur — one morph moment. Focus is never moved. Width is stabilized by an invisible sizing layer. Pending state disables interaction and announces via live region. Success/error auto-reset to idle after a configurable delay.',
  props: [
    {
      name: 'state',
      type: '"idle" | "pending" | "success" | "error"',
      description: 'Controlled state. Overrides internal state machine.',
    },
    {
      name: 'defaultState',
      type: '"idle" | "pending" | "success" | "error"',
      description: 'Default state for uncontrolled mode. Defaults to "idle".',
    },
    {
      name: 'onAction',
      type: '(signal: AbortSignal) => Promise<void>',
      description:
        'Async callback triggered on click. The component tracks the returned promise and transitions through pending → success/error automatically.',
    },
    {
      name: 'onStateChange',
      type: '(state: ActionButtonState) => void',
      description: 'Called whenever the internal state changes.',
    },
    {
      name: 'minPendingMs',
      type: 'number',
      description:
        'Minimum milliseconds to display pending state. Prevents flicker for fast operations. Defaults to 0 (no minimum).',
    },
    {
      name: 'resetDelayMs',
      type: 'number',
      description:
        'Milliseconds before resetting from success/error to idle. Defaults to 2000. Set to 0 to disable.',
    },
    {
      name: 'idleLabel',
      type: 'ReactNode',
      description: 'Content shown in idle state.',
    },
    {
      name: 'pendingLabel',
      type: 'ReactNode',
      description: 'Content shown in pending state.',
    },
    {
      name: 'successLabel',
      type: 'ReactNode',
      description: 'Content shown in success state. Defaults to "Done".',
    },
    {
      name: 'errorLabel',
      type: 'ReactNode',
      description: 'Content shown in error state. Defaults to "Failed".',
    },
    {
      name: 'renderState',
      type: '(state: ActionButtonState) => ReactNode',
      description:
        'Full render control. Overrides individual label/icon props. Receives the current state.',
    },
    {
      name: 'announcements',
      type: 'Partial<Record<ActionButtonState, string>>',
      description: 'Per-state strings announced via aria-live region for screen readers.',
    },
    {
      name: 'variant',
      type: '"solid" | "outline" | "ghost" | "link"',
      description: 'Visual style inherited from Button. Defaults to "solid".',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      description: 'Button size inherited from Button. Defaults to "md".',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables the button. Also disabled automatically while pending.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes merged via cn().',
    },
  ],
  usage: `import { ActionButton } from "@/components/ui/action-button"

export function Demo() {
  return (
    <ActionButton
      onAction={async (signal) => {
        const res = await fetch("/api/save", { signal, method: "POST" })
        if (!res.ok) throw new Error("Save failed")
      }}
      idleLabel="Save"
      pendingLabel="Saving…"
      successLabel="Saved"
      errorLabel="Retry"
      minPendingMs={600}
      resetDelayMs={2000}
      announcements={{
        pending: "Saving…",
        success: "Saved successfully",
        error: "Save failed, click to retry",
      }}
    />
  )
}`,
}
