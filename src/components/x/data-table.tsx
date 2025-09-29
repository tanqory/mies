import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../ui/utils"
import { ChevronUp, ChevronDown } from "lucide-react"

const dataTableVariants = cva(
  "w-full border-collapse",
  {
    variants: {
      variant: {
        default: "border border-border",
        minimal: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface DataTableColumn {
  id: string
  title: string
  sortable?: boolean
  width?: string | number
  align?: "left" | "center" | "right"
}

export interface DataTableRow {
  id: string
  cells: React.ReactNode[]
  disabled?: boolean
  onClick?: () => void
}

export interface DataTableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof dataTableVariants> {
  columns: DataTableColumn[]
  rows: DataTableRow[]
  sortable?: boolean
  sortColumnIndex?: number
  sortDirection?: "ascending" | "descending"
  onSort?: (columnIndex: number, direction: "ascending" | "descending") => void
  loading?: boolean
  emptyState?: React.ReactNode
  footerContent?: React.ReactNode
  stickyHeader?: boolean
}

const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  ({
    className,
    variant,
    columns,
    rows,
    sortable,
    sortColumnIndex,
    sortDirection,
    onSort,
    loading,
    emptyState,
    footerContent,
    stickyHeader,
    ...props
  }, ref) => {
    const handleSort = (columnIndex: number) => {
      if (!sortable || !columns[columnIndex].sortable || !onSort) return

      const newDirection =
        sortColumnIndex === columnIndex && sortDirection === "ascending"
          ? "descending"
          : "ascending"

      onSort(columnIndex, newDirection)
    }

    const getSortIcon = (columnIndex: number) => {
      if (sortColumnIndex !== columnIndex) return null

      return sortDirection === "ascending" ? (
        <ChevronUp className="ml-1 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-1 h-4 w-4" />
      )
    }

    return (
      <div className="relative overflow-auto">
        <table
          ref={ref}
          className={cn(dataTableVariants({ variant, className }))}
          {...props}
        >
          <thead
            className={cn(
              "bg-muted/50",
              stickyHeader && "sticky top-0 z-10"
            )}
          >
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.id}
                  className={cn(
                    "px-4 py-3 text-left text-sm font-medium text-muted-foreground border-b border-border",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    sortable && column.sortable && "cursor-pointer hover:bg-muted/80"
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(index)}
                >
                  <div className="flex items-center">
                    {column.title}
                    {sortable && column.sortable && getSortIcon(index)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center">
                  {emptyState || (
                    <div className="text-muted-foreground">No data available</div>
                  )}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-border transition-colors",
                    row.onClick && "cursor-pointer hover:bg-muted/50",
                    row.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={row.disabled ? undefined : row.onClick}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-4 py-3 text-sm",
                        columns[cellIndex]?.align === "center" && "text-center",
                        columns[cellIndex]?.align === "right" && "text-right"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          {footerContent && (
            <tfoot>
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-3 border-t border-border bg-muted/50"
                >
                  {footerContent}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    )
  }
)
DataTable.displayName = "DataTable"

export { DataTable, dataTableVariants }