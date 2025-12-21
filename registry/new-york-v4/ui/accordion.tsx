// Accordion UI wrapper using Radix primitives
import {
  Accordion as RadixAccordion,
  AccordionItem as RadixAccordionItem,
  AccordionTrigger as RadixAccordionTrigger,
  AccordionContent as RadixAccordionContent,
} from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils"

// Simple styling – adjust Tailwind classes as needed for your design system
export const Accordion = ({
  collapsible = false,
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadixAccordion>) => (
  <RadixAccordion
    type={collapsible ? "single" : "multiple"}
    collapsible={collapsible}
    className={cn("space-y-2", className)}
    {...props}
  >
    {children}
  </RadixAccordion>
)

export const AccordionItem = ({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadixAccordionItem>) => (
  <RadixAccordionItem value={value} className={cn("rounded-lg border", className)} {...props}>
    {children}
  </RadixAccordionItem>
)

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadixAccordionTrigger>) => (
  <RadixAccordionTrigger
    className={cn(
      "flex w-full items-center justify-between px-4 py-4 text-left font-medium",
      "bg-muted hover:bg-muted/80 rounded-t-lg",
      className
    )}
    {...props}
  >
    {children}
    {/* Chevron icon – you can replace with your own */}
    <svg className="h-4 w-4 shrink-0 transition-transform duration-200" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  </RadixAccordionTrigger>
)

export const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadixAccordionContent>) => (
  <RadixAccordionContent
    className={cn(
      "px-4 pt-0 pb-4",
      "data-[state=closed]:animate-accordion-up",
      "data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    {children}
  </RadixAccordionContent>
)
