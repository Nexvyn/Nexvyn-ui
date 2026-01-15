import type { MDXComponents } from "mdx/types"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, Tab } from "fumadocs-ui/components/tabs"
import { Step, Steps } from "fumadocs-ui/components/steps"

import { CardStackAnimateWrapper } from "@/components/ui/our/common/cards-wrapper"
import { PreviewWrapper } from "@/components/ui/our/common/preview-wrapper"
import { ParallaxWrapper } from "@/components/ui/our/common/parallax-wrapper"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/core/alert"
import { Button } from "@/components/ui/core/button"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion"
import { Callout } from "@/components/docs/callout"
import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { CodeCollapsibleWrapper } from "@/components/docs/code-collapsible-wrapper"
import { CodeTabs } from "@/components/docs/code-tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { ComponentPreviewEnhanced } from "@/components/docs/ComponentPreviewEnhanced"
import { ComponentPreviewTabs } from "@/components/docs/component-preview-tabs"
import { ComponentSource } from "@/components/docs/component-source"
import { ComponentWrapper } from "@/components/docs/component-wrapper"
import { ComponentsList } from "@/components/docs/components-list"
import { CopyButton } from "@/components/docs/copy-button"
import { TypeTable } from "@/components/docs/type-table"
import { CodeBlock } from "@/components/ui/our/common/code-block"

function LinkedCard({
  className,
  children,
  href,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "bg-card hover:bg-muted/50 flex w-full flex-col items-center rounded-xl border p-6 text-center shadow transition-colors sm:p-10",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export const mdxComponents: MDXComponents = {
  h1: ({ className, children, ...props }) => (
    <h1
      className={cn("mt-2 scroll-m-28 font-sans text-3xl font-bold tracking-tight", className)}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }) => (
    <h2
      className={cn(
        "mt-12 scroll-m-28 border-b pb-2.5 font-sans text-2xl font-medium tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }) => (
    <h3
      className={cn("mt-8 scroll-m-28 font-sans text-xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ className, children, ...props }) => (
    <h4 className={cn("mt-8 scroll-m-28 text-lg font-medium tracking-tight", className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ className, children, ...props }) => (
    <h5 className={cn("mt-8 scroll-m-28 text-lg font-medium tracking-tight", className)} {...props}>
      {children}
    </h5>
  ),
  h6: ({ className, children, ...props }) => (
    <h6
      className={cn("mt-8 scroll-m-28 text-base font-medium tracking-tight", className)}
      {...props}
    >
      {children}
    </h6>
  ),
  p: ({ className, children, ...props }) => (
    <p
      className={cn("text-muted-foreground leading-relaxed [&:not(:first-child)]:mt-4", className)}
      {...props}
    >
      {children}
    </p>
  ),
  strong: ({ className, children, ...props }) => (
    <strong className={cn("font-medium", className)} {...props}>
      {children}
    </strong>
  ),

  a: ({ href, className, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className={cn("font-medium underline underline-offset-4", className)}
          {...props}
        >
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      >
        {children}
      </a>
    )
  },

  ul: ({ className, children, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props}>
      {children}
    </ul>
  ),
  ol: ({ className, children, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ className, children, ...props }) => (
    <li className={cn("text-muted-foreground mt-2", className)} {...props}>
      {children}
    </li>
  ),

  blockquote: ({ className, children, ...props }) => (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props}>
      {children}
    </blockquote>
  ),

  table: ({ className, children, ...props }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cn(
          "border-border w-full border-separate border-spacing-0 rounded-lg border text-sm",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  tr: ({ className, children, ...props }) => (
    <tr className={cn("even:bg-muted/25 m-0", className)} {...props}>
      {children}
    </tr>
  ),
  th: ({ className, children, ...props }) => (
    <th
      className={cn(
        "bg-code border-border border-r border-b px-4 py-3 text-left font-semibold first:rounded-tl-lg last:rounded-tr-lg last:border-r-0",
        className
      )}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ className, children, ...props }) => (
    <td
      className={cn(
        "border-border border-r border-b px-4 py-3 text-left last:border-r-0 [tr:last-child>&]:border-b-0 [tr:last-child>&:first-child]:rounded-bl-lg [tr:last-child>&:last-child]:rounded-br-lg",
        className
      )}
      {...props}
    >
      {children}
    </td>
  ),

  code: ({ className, children, ...props }) => {
    const isInline = !className?.includes("language-")

    if (isInline && typeof children === "string") {
      return (
        <code
          className={cn(
            "bg-secondary text-foreground border-border/50 relative rounded border px-[0.3rem] py-[0.1rem] font-mono text-[0.8rem]",
            className
          )}
          {...props}
        >
          {children}
        </code>
      )
    }

    return (
      <code className={cn("font-mono", className)} {...props}>
        {children}
      </code>
    )
  },

  pre: ({ className, children, ...props }) => {
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === "string") return node
      if (typeof node === "number") return String(node)
      if (!node) return ""
      if (Array.isArray(node)) return node.map(getTextContent).join("")
      if (React.isValidElement(node)) {
        const element = node as React.ReactElement<{
          children?: React.ReactNode
        }>
        return getTextContent(element.props.children)
      }
      return ""
    }
    const codeContent = getTextContent(children)

    return (
      <div className="group relative mt-6 md:-mx-4">
        <CopyButton
          value={codeContent}
          className="absolute top-3 right-3 z-20 opacity-0 transition-opacity group-hover:opacity-100"
        />
        <pre
          className={cn(
            "border-border/50 overflow-x-auto rounded-lg border px-4 py-4 font-mono text-sm",
            "[&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0",
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    )
  },

  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,

  Image,

  Steps,
  Step,

  Tabs,
  Tab,

  Alert,
  AlertTitle,
  AlertDescription,

  Button,

  LinkedCard,

  Callout,
  CodeBlockCommand,
  CodeCollapsibleWrapper,
  CodeTabs,
  ComponentPreview,
  ComponentPreviewEnhanced,
  ComponentPreviewTabs,
  ComponentSource,
  ComponentWrapper,
  ComponentsList,
  CopyButton,
  TypeTable,
  CodeBlock,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,

  CardStackAnimate: CardStackAnimateWrapper,
  Preview: PreviewWrapper,
  Parallax: ParallaxWrapper,
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,

    Preview: PreviewWrapper,
    CardStackAnimate: CardStackAnimateWrapper,
    Parallax: ParallaxWrapper,
    ...components,
  }
}
