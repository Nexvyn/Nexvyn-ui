'use client'

import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'

export type TableProps = HTMLAttributes<HTMLTableElement>

export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table ref={ref} className={cn('w-full text-[13px] border-collapse', className)} {...props} />
  </div>
))
Table.displayName = 'Table'

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn(className)} {...props} />,
)
TableHeader.displayName = 'TableHeader'

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn(className)} {...props} />,
)
TableBody.displayName = 'TableBody'

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  isBodyRow?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ isBodyRow, className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'group/row border-b border-border/60 transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
        isBodyRow && 'hover:bg-muted',
        className,
      )}
      {...props}
    />
  ),
)
TableRow.displayName = 'TableRow'

export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      scope="col"
      className={cn('px-3 py-2 text-start font-semibold text-foreground', className)}
      {...props}
    />
  ),
)
TableHead.displayName = 'TableHead'

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'px-3 py-2 text-start text-muted-foreground transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none group-hover/row:text-foreground',
        className,
      )}
      {...props}
    />
  ),
)
TableCell.displayName = 'TableCell'

export function TablePreview() {
  return (
    <div
      className="w-full h-full min-h-50 rounded-lg overflow-hidden flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
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
