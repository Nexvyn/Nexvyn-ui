'use client'

import type { ComponentProp } from '@/lib/components-registry'

type PropsTableProps = {
  props: ComponentProp[]
}

export default function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="flex flex-col">
      <div className="detail-props-header">
        <div className="w-24 shrink-0">Prop</div>
        <div className="w-36 shrink-0">Type</div>
        <div className="flex-1">Description</div>
      </div>

      {props.map((prop) => (
        <div key={prop.name} className="detail-props-row">
          <div className="w-24 shrink-0">
            <code className="detail-code-inline">
              {prop.name}
              {prop.required && <span style={{ color: 'var(--color-error)' }}>*</span>}
            </code>
          </div>

          <div className="flex w-36 shrink-0 flex-col gap-1 pt-0.5">
            {(prop.options ?? [prop.type]).map((value) => (
              <span key={value} className="detail-props-type wrap-break-word">
                {value}
              </span>
            ))}
          </div>

          <div className="flex-1 pt-0.5">
            <p className="detail-props-desc">{prop.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
