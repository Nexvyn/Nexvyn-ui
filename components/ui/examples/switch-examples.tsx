'use client'

import { useState } from 'react'
import { Switch } from '../switch'
import type { ComponentExample } from '@/components/detail/examples-types'

function OffExample() {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onCheckedChange={setChecked} />
}

function OnExample() {
  const [checked, setChecked] = useState(true)
  return <Switch checked={checked} onCheckedChange={setChecked} />
}

function DisabledOffExample() {
  return <Switch checked={false} disabled />
}

function DisabledOnExample() {
  return <Switch checked={true} disabled />
}

function WithLabelExample() {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onCheckedChange={setChecked} label="Notifications" />
}

function WithLabelRtlExample() {
  const [checked, setChecked] = useState(true)
  return (
    <div dir="rtl">
      <Switch checked={checked} onCheckedChange={setChecked} label="الإشعارات" labelSide="left" />
    </div>
  )
}

export const examples: ComponentExample[] = [
  {
    id: 'off',
    title: 'Off',
    group: 'Basic',
    code: '<Switch checked={checked} onCheckedChange={setChecked} />',
    render: () => <OffExample />,
  },
  {
    id: 'on',
    title: 'On',
    group: 'Basic',
    code: '<Switch checked={checked} onCheckedChange={setChecked} />',
    render: () => <OnExample />,
  },
  {
    id: 'disabled-off',
    title: 'Disabled off',
    group: 'States',
    code: '<Switch checked={false} disabled />',
    render: () => <DisabledOffExample />,
  },
  {
    id: 'disabled-on',
    title: 'Disabled on',
    group: 'States',
    code: '<Switch checked={true} disabled />',
    render: () => <DisabledOnExample />,
  },
  {
    id: 'with-label',
    title: 'With label',
    group: 'Labels',
    code: '<Switch checked={checked} onCheckedChange={setChecked} label="Notifications" />',
    render: () => <WithLabelExample />,
  },
  {
    id: 'rtl-label',
    title: 'RTL with label',
    group: 'Labels',
    code: `<div dir="rtl">
  <Switch checked={checked} onCheckedChange={setChecked} label="الإشعارات" labelSide="left" />
</div>`,
    render: () => <WithLabelRtlExample />,
  },
]
