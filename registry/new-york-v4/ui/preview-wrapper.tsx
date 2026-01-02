"use client"

import dynamic from "next/dynamic"
import type { PreviewProps } from "@/components/ui/our/common/Preview"

const Preview = dynamic(
  () => import("@/components/ui/our/common/Preview").then((mod) => mod.Preview),
  { ssr: false }
)

export function PreviewWrapper(props: PreviewProps) {
  return <Preview {...props} />
}
