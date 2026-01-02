"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function UsageSection() {
  const [copied, setCopied] = useState(false)

  const codeExample = `import { 
  ButtonIcon, 
  ChartIcon, 
  SettingsIcon 
} from '@/components/ui/icons/animated';

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'actions', label: 'Actions', icon: ButtonIcon },
  ];

  return (
    <nav className="flex flex-col gap-1 p-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={\`flex items-center gap-3 px-3 py-2 rounded-lg 
              \${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}\`}
          >
            <Icon size={20} isActive={isActive} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}`

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-16 space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <p className="text-muted-foreground mx-auto max-w-md text-sm">
          Import the icons and use the{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-xs">isActive</code> prop to trigger
          animations
        </p>
      </div>

      <div className="relative mx-auto max-w-2xl">
        <div className="border-border relative overflow-hidden rounded-xl border">
          {/* Header */}
          <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2">
            <span className="text-muted-foreground text-xs font-medium">sidebar.tsx</span>
            <button
              onClick={copyCode}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Code - consistent dark style */}
          <pre className="overflow-x-auto bg-[hsl(220,13%,8%)] p-4 font-mono text-sm text-[hsl(220,14%,90%)]">
            <code>{codeExample}</code>
          </pre>
        </div>
      </div>

      {/* API Reference */}
      <div className="mx-auto mt-8 max-w-2xl">
        <h3 className="mb-4 text-center text-lg font-medium">Props</h3>
        <div className="border-border overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-border border-b">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="text-muted-foreground px-4 py-3">number</td>
                <td className="text-muted-foreground px-4 py-3">20</td>
                <td className="text-muted-foreground px-4 py-3">Icon size in pixels</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">isActive</td>
                <td className="text-muted-foreground px-4 py-3">boolean</td>
                <td className="text-muted-foreground px-4 py-3">false</td>
                <td className="text-muted-foreground px-4 py-3">Triggers active animation state</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
