import type { ComponentItem } from '@/lib/components-registry'

export const elasticDotMetadata: ComponentItem = {
  id: 'elastic-dot',
  name: 'Elastic Dot',
  collection: 'effects',
  previewType: 'default',
  description: 'An elastic dot indicator that stretches and snaps fluidly to highlight the active item in sidebar navigation.',
  registry: 'elastic-dot',
  dependencies: [{ name: 'motion' }],
  interaction: 'Click on different items to see the dot stretch and snap to each position.',
  props: [
    {
      name: 'activeId',
      type: 'string',
      description: 'The ID of the currently active item.',
      required: true,
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  usage: `import { ElasticDot } from "@/components/ui/elastic-dot"

export function Demo() {
  return (
    <div className="relative">
      <ElasticDot activeId="home" />
      <nav>
        <button id="home">Home</button>
        <button id="about">About</button>
      </nav>
    </div>
  )
}`,
}
