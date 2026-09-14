import type { ReactNode } from 'react'

export interface ComponentExample {
  id: string
  title: string
  group: string
  code: string
  render: () => ReactNode
  span?: 1 | 2
}
