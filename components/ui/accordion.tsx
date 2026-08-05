'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface AccordionContextValue {
  type: 'single' | 'multiple'
  collapsible: boolean
  expandedValues: string[]
  toggle: (value: string) => void
  reducedMotion: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordionCtx(componentName: string) {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error(`${componentName} must be used within <Accordion>`)
  return ctx
}

interface AccordionItemContextValue {
  value: string
  isExpanded: boolean
  disabled: boolean
  triggerId: string
  contentId: string
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

function useAccordionItemCtx(componentName: string) {
  const ctx = useContext(AccordionItemContext)
  if (!ctx) throw new Error(`${componentName} must be used within <AccordionItem>`)
  return ctx
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  type: 'single' | 'multiple'
  collapsible?: boolean
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  children?: ReactNode
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type,
      collapsible = false,
      value: valueProp,
      defaultValue,
      onValueChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const reducedMotion = useReducedMotion() ?? false

    const normalizeValue = useCallback((v: string | string[] | undefined): string[] => {
      if (v === undefined) return []
      if (Array.isArray(v)) return v
      return v ? [v] : []
    }, [])

    const [internal, setInternal] = useState<string[]>(() => normalizeValue(defaultValue))
    const expandedValues = isControlled ? normalizeValue(valueProp) : internal

    const toggle = useCallback(
      (itemValue: string) => {
        const isExpanded = expandedValues.includes(itemValue)

        let next: string[]

        if (type === 'single') {
          if (isExpanded) {
            next = collapsible ? [] : expandedValues
          } else {
            next = [itemValue]
          }
        } else {
          if (isExpanded) {
            next = expandedValues.filter((v) => v !== itemValue)
          } else {
            next = [...expandedValues, itemValue]
          }
        }

        if (!isControlled) setInternal(next)

        if (onValueChange) {
          onValueChange(type === 'single' ? (next[0] ?? '') : next)
        }
      },
      [type, collapsible, expandedValues, isControlled, onValueChange],
    )

    const ctxValue = useMemo<AccordionContextValue>(
      () => ({ type, collapsible, expandedValues, toggle, reducedMotion }),
      [type, collapsible, expandedValues, toggle, reducedMotion],
    )

    return (
      <AccordionContext.Provider value={ctxValue}>
        <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)

Accordion.displayName = 'Accordion'

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
  value: string
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { expandedValues } = useAccordionCtx('AccordionItem')
    const isExpanded = expandedValues.includes(value)
    const uid = useId()
    const triggerId = `accordion-trigger-${uid}`
    const contentId = `accordion-content-${uid}`

    const itemCtx = useMemo<AccordionItemContextValue>(
      () => ({ value, isExpanded, disabled, triggerId, contentId }),
      [value, isExpanded, disabled, triggerId, contentId],
    )

    return (
      <AccordionItemContext.Provider value={itemCtx}>
        <div
          ref={ref}
          data-state={isExpanded ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
          className={cn(
            'rounded-lg squircle-corners border border-(--color-border) bg-(--color-card) overflow-hidden',
            disabled && 'opacity-50 pointer-events-none',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  },
)

AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  className?: string
  children?: ReactNode
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, headingLevel = 3, ...props }, ref) => {
    const { toggle } = useAccordionCtx('AccordionTrigger')
    const { value, isExpanded, disabled, triggerId, contentId } =
      useAccordionItemCtx('AccordionTrigger')

    const Heading = `h${headingLevel}` as const

    return (
      <Heading className="m-0 flex">
        <button
          ref={ref}
          type="button"
          id={triggerId}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          disabled={disabled}
          onClick={() => toggle(value)}
          className={cn(
            'flex flex-1 items-center justify-between gap-2 px-4 py-3 text-start font-medium text-(--color-fg) outline-none',
            'transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-in-out)',
            'hover:bg-(--color-muted)/50',
            'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-inset',
            'motion-reduce:transition-none',
            className,
          )}
          {...props}
        >
          <span className="flex-1">{children}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn(
              'shrink-0 text-(--color-fg)/60',
              'transition-transform duration-(--motion-dur-base) ease-(--motion-ease-in-out)',
              'motion-reduce:transition-none motion-reduce:transform-none',
              isExpanded && 'rotate-180',
            )}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </Heading>
    )
  },
)

AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { reducedMotion } = useAccordionCtx('AccordionContent')
    const { isExpanded, triggerId, contentId } = useAccordionItemCtx('AccordionContent')

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isExpanded && reducedMotion}
        className={cn(
          'grid',
          'transition-[grid-template-rows] duration-(--motion-dur-base) ease-(--motion-ease-in-out)',
          'motion-reduce:transition-none',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div
          className={cn(
            'overflow-hidden',
            'transition-[opacity,transform] duration-(--motion-dur-base) ease-(--motion-ease-in-out)',
            'motion-reduce:transition-none motion-reduce:transform-none',
            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1',
          )}
        >
          <div className={cn('px-4 pb-3 pt-0 text-sm text-(--color-fg)/80', className)} {...props}>
            {children}
          </div>
        </div>
      </div>
    )
  },
)

AccordionContent.displayName = 'AccordionContent'

export function AccordionPreview() {
  return (
    <div className="flex w-full max-w-md items-center justify-center p-6">
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern with proper aria-expanded, aria-controls,
            and role=&quot;region&quot; attributes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses a grid-rows transition with a subtle y-settle for a polished unfold effect.
            Respects prefers-reduced-motion.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I use it controlled?</AccordionTrigger>
          <AccordionContent>
            Yes. Pass value and onValueChange for full controlled state, or use defaultValue for
            uncontrolled.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
