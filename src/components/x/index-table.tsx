"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

const indexTableVariants = cva("", {
  variants: {
    variant: {
      default: "",
      condensed: "[&_td]:py-2 [&_th]:py-2",
      spacious: "[&_td]:py-4 [&_th]:py-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface IndexTableColumn {
  id: string
  title: string
  sortable?: boolean
  hidden?: boolean
  width?: string | number
  align?: "left" | "center" | "right"
}

export interface IndexTableAction {
  content: string
  onAction: (selectedIds: string[]) => void
  disabled?: boolean
  destructive?: boolean
}

export interface IndexTableRow {
  id: string
  cells: React.ReactNode[]
  disabled?: boolean
  subdued?: boolean
  url?: string
  onClick?: () => void
}

export interface IndexTableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indexTableVariants> {
  columns: IndexTableColumn[]
  rows: IndexTableRow[]
  selectable?: boolean
  selectedRows?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  promotedBulkActions?: IndexTableAction[]
  bulkActions?: IndexTableAction[]
  sortable?: boolean
  sortColumn?: string
  sortDirection?: "asc" | "desc"
  onSort?: (columnId: string, direction: "asc" | "desc") => void
  loading?: boolean
  emptyState?: React.ReactNode
  hasMoreItems?: boolean
  onLoadMore?: () => void
}

const IndexTable = React.forwardRef<HTMLDivElement, IndexTableProps>(
  (
    {
      className,
      variant,
      columns,
      rows,
      selectable = false,
      selectedRows = [],
      onSelectionChange,
      promotedBulkActions = [],
      bulkActions = [],
      sortable = false,
      sortColumn,
      sortDirection,
      onSort,
      loading = false,
      emptyState,
      hasMoreItems = false,
      onLoadMore,
      ...props
    },
    ref
  ) => {
    const visibleColumns = columns.filter(col => !col.hidden)
    const allSelected = selectable && selectedRows.length === rows.length && rows.length > 0
    const someSelected = selectable && selectedRows.length > 0 && selectedRows.length < rows.length
    const indeterminate = someSelected

    const handleSelectAll = (checked: boolean | "indeterminate") => {
      if (!onSelectionChange) return

      if (checked === true) {
        onSelectionChange(rows.map(row => row.id))
      } else {
        onSelectionChange([])
      }
    }

    const handleRowSelection = (rowId: string, selected: boolean) => {
      if (!onSelectionChange) return

      if (selected) {
        onSelectionChange([...selectedRows, rowId])
      } else {
        onSelectionChange(selectedRows.filter(id => id !== rowId))
      }
    }

    const handleSort = (columnId: string) => {
      if (!onSort) return

      let direction: "asc" | "desc" = "asc"
      if (sortColumn === columnId && sortDirection === "asc") {
        direction = "desc"
      }
      onSort(columnId, direction)
    }

    const handleRowClick = (row: IndexTableRow) => {
      if (row.disabled) return

      if (row.url) {
        window.location.href = row.url
      } else if (row.onClick) {
        row.onClick()
      }
    }

    const isRowSelected = (rowId: string) => selectedRows.includes(rowId)

    if (loading) {
      return (
        <div ref={ref} className={className} {...props}>
          <Table className={indexTableVariants({ variant })}>
            <TableHeader>
              <TableRow>
                {selectable && <TableHead className="w-12" />}
                {visibleColumns.map((column) => (
                  <TableHead key={column.id} style={{ width: column.width }}>
                    <div className="h-4 bg-muted rounded animate-pulse" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {selectable && (
                    <TableCell>
                      <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                    </TableCell>
                  )}
                  {visibleColumns.map((column) => (
                    <TableCell key={column.id}>
                      <div className="h-4 bg-muted rounded animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }

    if (rows.length === 0 && emptyState) {
      return (
        <div ref={ref} className={className} {...props}>
          {emptyState}
        </div>
      )
    }

    return (
      <div ref={ref} className={className} {...props}>
        {(promotedBulkActions.length > 0 || bulkActions.length > 0) && selectedRows.length > 0 && (
          <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-t-lg border">
            <span className="text-sm text-muted-foreground">
              {selectedRows.length} selected
            </span>
            {promotedBulkActions.map((action, index) => (
              <Button
                key={index}
                variant={action.destructive ? "destructive" : "outline"}
                size="sm"
                disabled={action.disabled}
                onClick={() => action.onAction(selectedRows)}
              >
                {action.content}
              </Button>
            ))}
            {bulkActions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    More actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {bulkActions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      disabled={action.disabled}
                      onClick={() => action.onAction(selectedRows)}
                      className={action.destructive ? "text-destructive" : ""}
                    >
                      {action.content}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}

        <Table className={indexTableVariants({ variant })}>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = indeterminate
                    }}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </TableHead>
              )}
              {visibleColumns.map((column) => (
                <TableHead
                  key={column.id}
                  style={{ width: column.width }}
                  className={cn(
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right"
                  )}
                >
                  {sortable && column.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium"
                      onClick={() => handleSort(column.id)}
                    >
                      {column.title}
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  ) : (
                    column.title
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  row.disabled && "opacity-50 cursor-not-allowed",
                  row.subdued && "opacity-75",
                  (row.url || row.onClick) && !row.disabled && "cursor-pointer hover:bg-muted/50",
                  isRowSelected(row.id) && "bg-accent/50"
                )}
                onClick={() => handleRowClick(row)}
              >
                {selectable && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isRowSelected(row.id)}
                      disabled={row.disabled}
                      onCheckedChange={(checked) =>
                        handleRowSelection(row.id, checked === true)
                      }
                      aria-label={`Select row ${row.id}`}
                    />
                  </TableCell>
                )}
                {row.cells.map((cell, cellIndex) => {
                  const column = visibleColumns[cellIndex]
                  return (
                    <TableCell
                      key={cellIndex}
                      className={cn(
                        column?.align === "center" && "text-center",
                        column?.align === "right" && "text-right"
                      )}
                    >
                      {cell}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {hasMoreItems && onLoadMore && (
          <div className="text-center p-4 border-t">
            <Button variant="outline" onClick={onLoadMore}>
              Load more
            </Button>
          </div>
        )}
      </div>
    )
  }
)

IndexTable.displayName = "IndexTable"

export { IndexTable, indexTableVariants }