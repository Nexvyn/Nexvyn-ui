import type { ComponentItem } from '@/lib/components-registry'

export const tableMetadata: ComponentItem = {
  id: 'table',
  name: 'Table',
  collection: 'inputs',
  previewType: 'default',
  basic: true,
  description:
    'A composable data table with semantic markup and a per-row hover highlight that dims into the active row.',
  registry: 'table',
  dependencies: [],
  interaction:
    'Hover a row to highlight it; cell text sharpens to full contrast on the active row.',
  props: [
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes on the <table> element.',
    },
  ],
  usage: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Demo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow isBodyRow>
          <TableCell>Ada Lovelace</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`,
}
