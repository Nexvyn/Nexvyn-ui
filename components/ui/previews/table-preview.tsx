'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TablePreview() {
  return (
    <div className="flex items-center justify-center p-6">
      <Table className="max-w-md">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            ['Ada Lovelace', 'Engineer', 'Active'],
            ['Alan Turing', 'Researcher', 'Active'],
            ['Grace Hopper', 'Admiral', 'Retired'],
          ].map((row) => (
            <TableRow key={row[0]} isBodyRow>
              {row.map((cell) => (
                <TableCell key={cell}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
