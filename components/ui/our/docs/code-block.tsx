"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/docs/copy-button"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const preRef = React.useRef<HTMLPreElement>(null)
  const [codeContent, setCodeContent] = React.useState("")
  const [lines, setLines] = React.useState<string[]>([])

  React.useEffect(() => {
    if (preRef.current) {
      // Get the text content for copy button
      const text = preRef.current.textContent || ""
      setCodeContent(text)

      // Get all code lines from the pre element
      const codeElement = preRef.current.querySelector("code")
      if (codeElement) {
        // Count lines by looking at the HTML structure or text content
        const lineCount = text.split("\n").length
        setLines(Array.from({ length: lineCount }, (_, i) => String(i + 1)))
      }
    }
  }, [children])

  return (
    <div className="border-border bg-code relative mt-6 max-w-full min-w-0 overflow-hidden rounded-lg border p-0 md:-mx-4">
      <CopyButton value={codeContent} className="absolute top-2.5 right-2.5 z-10" />
      <div className="flex">
        {/* Line numbers column */}
        {lines.length > 0 && (
          <div className="text-muted-foreground/50 flex-shrink-0 py-3.5 pr-4 pl-4 text-right font-mono text-sm leading-relaxed select-none">
            {lines.map((num) => (
              <div key={num}>{num}</div>
            ))}
          </div>
        )}
        {/* Code content */}
        <pre
          ref={preRef}
          className={cn(
            "no-scrollbar flex-1 overflow-x-auto bg-transparent py-3.5 pr-4 font-mono text-sm leading-relaxed",
            !lines.length && "pl-4",
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}
