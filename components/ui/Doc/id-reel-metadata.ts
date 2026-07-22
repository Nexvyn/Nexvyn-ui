import type { ComponentItem } from '@/lib/components-registry'

export const idReelMetadata: ComponentItem = {
  id: 'id-reel',
  name: 'Id Reel',
  collection: 'effects',
  previewType: 'default',
  isNew: true,
  description:
    'An id pill with an odometer run-up on its digits, middle-truncation for long values, and an optional GitHub-style pull-request status badge.',
  registry: 'id-reel',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Numeric ids roll in digit-by-digit on mount or when runKey changes. Long ids middle-truncate to fit the max width. Click the status badge to cycle it, click copy to copy the full id.',
  props: [
    { name: 'value', type: 'string', description: 'The id value, e.g. "#1042" or a text slug.' },
    { name: 'runKey', type: 'number', description: 'Increment to replay the odometer run-up.' },
    {
      name: 'status',
      type: "'open' | 'draft' | 'merged' | 'closed'",
      description: 'Shows a GitHub pull-request state badge.',
    },
    { name: 'onStatusClick', type: '() => void', description: 'Makes the status badge a button.' },
    {
      name: 'width',
      type: "'max' | 'fixed'",
      description: '"max" hugs the value up to maxWidth; "fixed" always fills it.',
    },
    { name: 'maxWidth', type: 'string', description: 'The cap width before middle-truncation.' },
    { name: 'copyable', type: 'boolean', description: 'Shows the copy-to-clipboard button.' },
  ],
  usage: `<IdReel value="#1042" status="open" onStatusClick={cycleStatus} />`,
}
