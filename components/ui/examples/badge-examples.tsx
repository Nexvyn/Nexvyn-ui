import { Badge } from '../badge'
import type { ComponentExample } from '@/components/detail/examples-types'

export const examples: ComponentExample[] = [
  {
    id: 'solid-sm',
    title: 'Solid sm',
    group: 'Solid',
    code: '<Badge size="sm">New</Badge>',
    render: () => <Badge size="sm">New</Badge>,
  },
  {
    id: 'solid-md',
    title: 'Solid md',
    group: 'Solid',
    code: '<Badge size="md">New</Badge>',
    render: () => <Badge size="md">New</Badge>,
  },
  {
    id: 'solid-lg',
    title: 'Solid lg',
    group: 'Solid',
    code: '<Badge size="lg">New</Badge>',
    render: () => <Badge size="lg">New</Badge>,
  },
  {
    id: 'muted-sm',
    title: 'Muted sm',
    group: 'Muted',
    code: '<Badge variant="muted" size="sm">Beta</Badge>',
    render: () => (
      <Badge variant="muted" size="sm">
        Beta
      </Badge>
    ),
  },
  {
    id: 'muted-md',
    title: 'Muted md',
    group: 'Muted',
    code: '<Badge variant="muted" size="md">Beta</Badge>',
    render: () => (
      <Badge variant="muted" size="md">
        Beta
      </Badge>
    ),
  },
  {
    id: 'muted-lg',
    title: 'Muted lg',
    group: 'Muted',
    code: '<Badge variant="muted" size="lg">Beta</Badge>',
    render: () => (
      <Badge variant="muted" size="lg">
        Beta
      </Badge>
    ),
  },
  {
    id: 'dot-sm',
    title: 'Dot sm',
    group: 'Dot',
    code: '<Badge variant="dot" size="sm">Live</Badge>',
    render: () => (
      <Badge variant="dot" size="sm">
        Live
      </Badge>
    ),
  },
  {
    id: 'dot-md',
    title: 'Dot md',
    group: 'Dot',
    code: '<Badge variant="dot" size="md">Live</Badge>',
    render: () => (
      <Badge variant="dot" size="md">
        Live
      </Badge>
    ),
  },
  {
    id: 'dot-lg',
    title: 'Dot lg',
    group: 'Dot',
    code: '<Badge variant="dot" size="lg">Live</Badge>',
    render: () => (
      <Badge variant="dot" size="lg">
        Live
      </Badge>
    ),
  },
  {
    id: 'dot-pulse-sm',
    title: 'Dot pulse sm',
    group: 'Dot',
    code: '<Badge variant="dot" size="sm" pulse>Live</Badge>',
    render: () => (
      <Badge variant="dot" size="sm" pulse>
        Live
      </Badge>
    ),
  },
  {
    id: 'dot-pulse-md',
    title: 'Dot pulse md',
    group: 'Dot',
    code: '<Badge variant="dot" size="md" pulse>Live</Badge>',
    render: () => (
      <Badge variant="dot" size="md" pulse>
        Live
      </Badge>
    ),
  },
  {
    id: 'dot-pulse-lg',
    title: 'Dot pulse lg',
    group: 'Dot',
    code: '<Badge variant="dot" size="lg" pulse>Live</Badge>',
    render: () => (
      <Badge variant="dot" size="lg" pulse>
        Live
      </Badge>
    ),
  },
  {
    id: 'solid-shimmer',
    title: 'Solid with shimmer',
    group: 'Effects',
    code: '<Badge variant="solid" shimmer>Shimmer</Badge>',
    render: () => (
      <Badge variant="solid" shimmer>
        Shimmer
      </Badge>
    ),
  },
  {
    id: 'dismissible',
    title: 'Dismissible',
    group: 'Interactive',
    code: '<Badge onDismiss={() => console.log("removed")}>Remove me</Badge>',
    render: () => <Badge onDismiss={() => {}}>Remove me</Badge>,
  },
]
