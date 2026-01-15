"use client"

import { ComponentPreview } from "@/components/docs/manual-component-preview"
import { Button } from "@/components/ui/core/button"

export default function ExampleUsage() {
  return (
    <div className="docs-content">
      <h1>Component Preview Example</h1>

      <h2>Button Component</h2>
      <p>A simple button component with different variants.</p>

      <ComponentPreview
        preview={
          <div className="flex gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        }
        code={`import { Button } from "@/components/ui/core/button";

export default function Example() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}`}
      />
    </div>
  )
}
