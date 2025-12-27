"use client"

import { useState } from "react"
import { Button } from "@/components/ui/core/button"
import { Copy, Check } from "lucide-react"

interface CopyPageButtonProps {
  content: string
  className?: string
}

export function CopyPageButton({ content, className }: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Button variant="ghost" size="sm" className={className} onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="mr-1.5 size-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="mr-1.5 size-3.5" />
          Copy Page
        </>
      )}
    </Button>
  )
}
