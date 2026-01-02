"use client"

import { Input } from "@/components/ui/core/input"

export default function InputDemo() {
  return (
    <div className="flex w-[300px] flex-col gap-4">
      <Input type="text" placeholder="Default input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="text" placeholder="Disabled input" disabled />
    </div>
  )
}
