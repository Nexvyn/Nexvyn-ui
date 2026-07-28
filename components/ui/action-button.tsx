'use client'

import * as React from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'

export type ActionButtonState = 'idle' | 'pending' | 'success' | 'error'

export interface ActionButtonProps extends Omit<
  ButtonProps,
  'loading' | 'loadingLabel' | 'loadingIndicator' | 'onClick'
> {
  /**
   * Controlled state. If provided, the component becomes fully controlled
   * and ignores the result of `onAction`.
   */
  state?: ActionButtonState
  /**
   * Default state for uncontrolled mode.
   */
  defaultState?: ActionButtonState
  /**
   * A callback that returns a promise. The component tracks the promise lifecycle
   * (idle → pending → success/error → idle). Receives an AbortSignal.
   */
  onAction?: (signal: AbortSignal) => Promise<void>
  /**
   * Callback fired whenever internal state changes (uncontrolled mode).
   */
  onStateChange?: (state: ActionButtonState) => void
  /**
   * Minimum time (ms) to show the pending state. Prevents flicker for fast operations.
   * Defaults to 0 (no minimum). Opt-in only.
   */
  minPendingMs?: number
  /**
   * Time (ms) before resetting from success/error back to idle.
   * Defaults to 2000ms. Set to 0 to disable auto-reset.
   */
  resetDelayMs?: number
  /** Label content shown in idle state. */
  idleLabel?: React.ReactNode
  /** Label content shown in pending state. */
  pendingLabel?: React.ReactNode
  /** Label content shown in success state. */
  successLabel?: React.ReactNode
  /** Label content shown in error state. */
  errorLabel?: React.ReactNode
  /** Icon shown in idle state. */
  idleIcon?: React.ReactNode
  /** Icon shown in pending state. Defaults to a spinner. */
  pendingIcon?: React.ReactNode
  /** Icon shown in success state. Defaults to a checkmark. */
  successIcon?: React.ReactNode
  /** Icon shown in error state. Defaults to an × glyph. */
  errorIcon?: React.ReactNode
  /**
   * Full control over rendering each state. Overrides individual label/icon props.
   * The returned node is rendered inside the button.
   */
  renderState?: (state: ActionButtonState) => React.ReactNode
  /**
   * Accessible live-region announcement per state.
   * Provide either a static string or a function.
   */
  announcements?: Partial<Record<ActionButtonState, string>>
  /** onClick passthrough — fires only in idle state. Does not track async. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function DefaultSpinnerIcon() {
  return (
    <svg
      className="size-4 animate-spin motion-reduce:animate-none"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-75"
      />
    </svg>
  )
}

function DefaultCheckIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DefaultErrorIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M6 18L18 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StateLayer({
  active,
  children,
  reducedMotion,
  animateEnabled,
}: {
  active: boolean
  children: React.ReactNode
  reducedMotion: boolean
  animateEnabled: boolean
}) {
  return (
    <span
      aria-hidden={!active}
      className={cn(
        'absolute inset-0 flex items-center justify-center gap-2',
        reducedMotion || !animateEnabled
          ? active
            ? 'opacity-100'
            : 'opacity-0'
          : [
              'transition-[opacity,transform,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out)',
              active
                ? 'scale-100 opacity-100 blur-0'
                : 'pointer-events-none scale-95 opacity-0 blur-[1px]',
            ],
        !animateEnabled && !active && 'pointer-events-none',
        'motion-reduce:transition-none motion-reduce:transform-none motion-reduce:filter-none',
      )}
    >
      {children}
    </span>
  )
}

function useControlledActionState(
  controlledState: ActionButtonState | undefined,
  defaultState: ActionButtonState | undefined,
  onStateChange: ((s: ActionButtonState) => void) | undefined,
): [ActionButtonState, (s: ActionButtonState) => void] {
  const [internalState, setInternalState] = React.useState<ActionButtonState>(
    defaultState ?? 'idle',
  )

  const isControlled = controlledState !== undefined
  const currentState = isControlled ? controlledState : internalState

  const setState = React.useCallback(
    (next: ActionButtonState) => {
      if (!isControlled) {
        setInternalState(next)
      }
      onStateChange?.(next)
    },
    [isControlled, onStateChange],
  )

  return [currentState, setState]
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      state: controlledState,
      defaultState,
      onAction,
      onStateChange,
      minPendingMs = 0,
      resetDelayMs = 2000,
      idleLabel,
      pendingLabel,
      successLabel,
      errorLabel,
      idleIcon,
      pendingIcon,
      successIcon,
      errorIcon,
      renderState,
      announcements,
      onClick,
      asChild,
      disabled,
      className,
      children,
      ...buttonProps
    },
    forwardedRef,
  ) => {
    if (process.env.NODE_ENV !== 'production' && asChild) {
      console.warn(
        '[ActionButton] asChild is not supported — ActionButton manages its own internal' +
          ' DOM layers for state crossfade. Ignoring asChild prop.',
      )
    }

    const prefersReducedMotion = useReducedMotion() ?? false
    const [currentState, setState] = useControlledActionState(
      controlledState,
      defaultState,
      onStateChange,
    )
    const [animateEnabled, setAnimateEnabled] = React.useState(false)

    React.useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount reveal gate, not a sync loop: transitions must not run on the very first paint (avoids an initial-mount opacity flash), so this only needs to flip true once after hydration.
      setAnimateEnabled(true)
    }, [])

    const abortControllerRef = React.useRef<AbortController | null>(null)
    const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const minPendingTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const pendingStartRef = React.useRef<number>(0)
    const isMountedRef = React.useRef(true)
    const isRunningRef = React.useRef(false)

    React.useEffect(() => {
      isMountedRef.current = true
      return () => {
        isMountedRef.current = false
      }
    }, [])

    React.useEffect(() => {
      return () => {
        if (resetTimerRef.current !== null) {
          clearTimeout(resetTimerRef.current)
          resetTimerRef.current = null
        }
        if (minPendingTimerRef.current !== null) {
          clearTimeout(minPendingTimerRef.current)
          minPendingTimerRef.current = null
        }
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
          abortControllerRef.current = null
        }
      }
    }, [])

    const scheduleReset = React.useCallback(() => {
      if (resetDelayMs <= 0) return
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current)
      }
      resetTimerRef.current = setTimeout(() => {
        resetTimerRef.current = null
        if (!isMountedRef.current) return
        setState('idle')
      }, resetDelayMs)
    }, [resetDelayMs, setState])

    const transitionToTerminal = React.useCallback(
      (terminal: 'success' | 'error') => {
        const elapsed = Date.now() - pendingStartRef.current
        const remaining = Math.max(0, minPendingMs - elapsed)

        const applyTerminal = () => {
          if (!isMountedRef.current) return
          isRunningRef.current = false
          setState(terminal)
          scheduleReset()
        }

        if (remaining > 0) {
          minPendingTimerRef.current = setTimeout(() => {
            minPendingTimerRef.current = null
            applyTerminal()
          }, remaining)
        } else {
          applyTerminal()
        }
      },
      [minPendingMs, setState, scheduleReset],
    )

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (currentState !== 'idle') return

        onClick?.(event)

        if (!onAction || isRunningRef.current) return

        isRunningRef.current = true

        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }

        const controller = new AbortController()
        abortControllerRef.current = controller

        if (resetTimerRef.current !== null) {
          clearTimeout(resetTimerRef.current)
          resetTimerRef.current = null
        }

        pendingStartRef.current = Date.now()
        setState('pending')

        onAction(controller.signal).then(
          () => {
            if (controller.signal.aborted) return
            transitionToTerminal('success')
          },
          (err: unknown) => {
            if (controller.signal.aborted) return
            // Don't treat AbortError as a real error
            if (err instanceof DOMException && err.name === 'AbortError') return
            transitionToTerminal('error')
          },
        )
      },
      [currentState, onClick, onAction, setState, transitionToTerminal],
    )

    const isDisabled = disabled || currentState === 'pending'

    const resolveIdleContent = () => {
      if (renderState) return renderState('idle')
      return (
        <>
          {idleIcon}
          {idleLabel ?? children}
        </>
      )
    }

    const resolvePendingContent = () => {
      if (renderState) return renderState('pending')
      return (
        <>
          {pendingIcon ?? <DefaultSpinnerIcon />}
          {pendingLabel ?? idleLabel ?? children}
        </>
      )
    }

    const resolveSuccessContent = () => {
      if (renderState) return renderState('success')
      return (
        <>
          {successIcon ?? <DefaultCheckIcon />}
          {successLabel ?? 'Done'}
        </>
      )
    }

    const resolveErrorContent = () => {
      if (renderState) return renderState('error')
      return (
        <>
          {errorIcon ?? <DefaultErrorIcon />}
          {errorLabel ?? 'Failed'}
        </>
      )
    }

    const ariaLabel =
      announcements?.[currentState] ?? (buttonProps['aria-label'] as string | undefined)

    return (
      <>
        <Button
          ref={forwardedRef}
          {...buttonProps}
          className={cn('relative overflow-hidden', className)}
          disabled={isDisabled}
          aria-disabled={isDisabled || undefined}
          aria-busy={currentState === 'pending' || undefined}
          aria-label={ariaLabel}
          data-state={currentState}
          onClick={handleClick}
          asChild={false}
        >
          {/* Invisible sizing layer — grid-stacks all states so the widest determines width */}
          <span className="invisible grid [&>*]:col-start-1 [&>*]:row-start-1" aria-hidden="true">
            <span className="inline-flex items-center gap-2">{resolveIdleContent()}</span>
            <span className="inline-flex items-center gap-2">{resolvePendingContent()}</span>
            <span className="inline-flex items-center gap-2">{resolveSuccessContent()}</span>
            <span className="inline-flex items-center gap-2">{resolveErrorContent()}</span>
          </span>
          <StateLayer
            active={currentState === 'idle'}
            reducedMotion={prefersReducedMotion}
            animateEnabled={animateEnabled}
          >
            {resolveIdleContent()}
          </StateLayer>
          <StateLayer
            active={currentState === 'pending'}
            reducedMotion={prefersReducedMotion}
            animateEnabled={animateEnabled}
          >
            {resolvePendingContent()}
          </StateLayer>
          <StateLayer
            active={currentState === 'success'}
            reducedMotion={prefersReducedMotion}
            animateEnabled={animateEnabled}
          >
            {resolveSuccessContent()}
          </StateLayer>
          <StateLayer
            active={currentState === 'error'}
            reducedMotion={prefersReducedMotion}
            animateEnabled={animateEnabled}
          >
            {resolveErrorContent()}
          </StateLayer>
        </Button>
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {announcements?.[currentState] ?? ''}
        </span>
      </>
    )
  },
)

ActionButton.displayName = 'ActionButton'

export function ActionButtonPreview() {
  const [demoState, setDemoState] = React.useState<ActionButtonState>('idle')

  const simulateAction = React.useCallback(async (signal: AbortSignal) => {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, 1500)
      signal.addEventListener('abort', () => {
        clearTimeout(timer)
        reject(new DOMException('Aborted', 'AbortError'))
      })
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ActionButton
          onAction={simulateAction}
          idleLabel="Save"
          pendingLabel="Saving…"
          successLabel="Saved"
          errorLabel="Error"
          minPendingMs={600}
          announcements={{
            pending: 'Saving…',
            success: 'Saved successfully',
            error: 'Save failed',
          }}
        />
        <ActionButton
          variant="outline"
          onAction={async () => {
            await new Promise((_, rej) => setTimeout(() => rej(new Error('fail')), 1200))
          }}
          idleLabel="Submit"
          pendingLabel="Submitting…"
          errorLabel="Retry"
          minPendingMs={400}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {(['idle', 'pending', 'success', 'error'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setDemoState(s)}
            className={cn(
              'rounded-md border px-2 py-1 text-xs capitalize',
              demoState === s
                ? 'border-(--color-accent) text-(--color-accent)'
                : 'border-(--color-border) text-(--color-muted)',
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <ActionButton state={demoState} idleLabel="Controlled" variant="outline" />
    </div>
  )
}
