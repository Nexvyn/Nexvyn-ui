'use client'

import { ActionButton } from '@/components/ui/action-button'

export function ActionButtonPreview() {
  const simulateAction = async (signal: AbortSignal) => {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, 1500)
      signal.addEventListener('abort', () => {
        clearTimeout(timer)
        reject(new DOMException('Aborted', 'AbortError'))
      })
    })
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 p-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ActionButton
          onAction={simulateAction}
          idleLabel="Save Changes"
          pendingLabel="Saving…"
          successLabel="Saved"
          minPendingMs={600}
          announcements={{
            pending: 'Saving changes…',
            success: 'Changes saved',
            error: 'Save failed',
          }}
        />
        <ActionButton
          variant="outline"
          onAction={async () => {
            await new Promise((_, rej) => setTimeout(() => rej(new Error('oops')), 1200))
          }}
          idleLabel="Submit Form"
          pendingLabel="Submitting…"
          errorLabel="Retry"
          minPendingMs={400}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <ActionButton variant="ghost" onAction={simulateAction} idleLabel="Ghost Action" />
        <ActionButton size="sm" onAction={simulateAction} idleLabel="Small" />
        <ActionButton size="lg" onAction={simulateAction} idleLabel="Large" />
      </div>

      <p className="text-xs text-(--color-muted)">Click to trigger async state machine</p>
    </div>
  )
}
