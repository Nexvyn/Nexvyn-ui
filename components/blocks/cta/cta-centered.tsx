'use client'

import { forwardRef, type ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { Cta, CtaAction, CtaActionIcon, type CtaProps } from '@/components/blocks/cta/cta'

export interface CtaCenteredProps extends Omit<CtaProps, 'title' | 'actions'> {
  title?: ReactNode
  primaryLabel?: string
  primaryHref?: string
  primaryIcon?: ReactNode
  secondaryLabel?: string
  secondaryHref?: string
}

export const CtaCentered = forwardRef<HTMLElement, CtaCenteredProps>(
  (
    {
      title = 'Start building with Nexvyn UI',
      description = 'Accessible, typed components you copy into your project and own. Install one, shape it with your tokens, ship it today.',
      primaryLabel = 'Browse components',
      primaryHref = '#',
      primaryIcon = <HugeiconsIcon icon={ArrowRight02Icon} size={16} strokeWidth={1.5} />,
      secondaryLabel = 'Set up MCP',
      secondaryHref = '#',
      ...props
    },
    ref,
  ) => (
    <Cta
      ref={ref}
      title={title}
      description={description}
      actions={
        <>
          {primaryLabel && (
            <CtaAction href={primaryHref}>
              {primaryLabel}
              {primaryIcon && <CtaActionIcon>{primaryIcon}</CtaActionIcon>}
            </CtaAction>
          )}
          {secondaryLabel && (
            <CtaAction href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </CtaAction>
          )}
        </>
      }
      {...props}
    />
  ),
)
CtaCentered.displayName = 'CtaCentered'
