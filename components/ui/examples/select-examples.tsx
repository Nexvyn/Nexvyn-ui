'use client'

import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../select'
import type { ComponentExample } from '@/components/detail/examples-types'

function DefaultExample() {
  const [value, setValue] = useState('small')
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Choose size" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="small">Small</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="large">Large</SelectItem>
      </SelectContent>
    </Select>
  )
}

function PlaceholderExample() {
  const [value, setValue] = useState('')
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  )
}

function DisabledExample() {
  return (
    <Select defaultValue="small" disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="small">Small</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="large">Large</SelectItem>
      </SelectContent>
    </Select>
  )
}

function ManyOptionsExample() {
  const [value, setValue] = useState('option1')
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Choose" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 12 }).map((_, i) => (
          <SelectItem key={i} value={`option${i + 1}`}>
            Option {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function ErrorExample() {
  const [value, setValue] = useState('')
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-48 border-destructive focus-visible:ring-destructive">
        <SelectValue placeholder="Required field" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const examples: ComponentExample[] = [
  {
    id: 'default',
    title: 'Default',
    group: 'Basic',
    code: `<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose size" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="small">Small</SelectItem>
    <SelectItem value="medium">Medium</SelectItem>
    <SelectItem value="large">Large</SelectItem>
  </SelectContent>
</Select>`,
    render: () => <DefaultExample />,
  },
  {
    id: 'placeholder',
    title: 'With placeholder',
    group: 'Basic',
    code: `<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`,
    render: () => <PlaceholderExample />,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    group: 'States',
    code: `<Select defaultValue="small" disabled>
  <SelectTrigger>
    <SelectValue placeholder="Disabled" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="small">Small</SelectItem>
    <SelectItem value="medium">Medium</SelectItem>
    <SelectItem value="large">Large</SelectItem>
  </SelectContent>
</Select>`,
    render: () => <DisabledExample />,
  },
  {
    id: 'many-options',
    title: 'Many options',
    group: 'Advanced',
    code: `<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose" />
  </SelectTrigger>
  <SelectContent>
    {Array.from({ length: 12 }).map((_, i) => (
      <SelectItem key={i} value={\`option\${i + 1}\`}>
        Option {i + 1}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`,
    render: () => <ManyOptionsExample />,
  },
  {
    id: 'error',
    title: 'Error state',
    group: 'States',
    code: `<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="border-destructive">
    <SelectValue placeholder="Required field" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`,
    render: () => <ErrorExample />,
  },
]
