import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type PaginationState,
  type Row,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  EyeOff,
  Search,
  Settings,
} from "lucide-react";

import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Checkbox } from "./checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Badge } from "./badge";

const dataGridVariants = cva("space-y-4", {
  variants: {
    density: {
      compact: "[&_table]:text-xs [&_td]:py-1 [&_th]:py-1",
      standard: "[&_table]:text-sm [&_td]:py-2 [&_th]:py-2",
      comfortable: "[&_table]:text-base [&_td]:py-3 [&_th]:py-3",
    },
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    density: "standard",
    size: "default",
  },
});

export interface DataGridColumn<TData> {
  id?: string;
  accessorKey?: keyof TData | string;
  header: string | React.ComponentType<any>;
  cell?: React.ComponentType<any>;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
}

export interface DataGridProps<TData>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataGridVariants> {
  data: TData[];
  columns: DataGridColumn<TData>[];
  // Selection
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  // Sorting
  enableSorting?: boolean;
  initialSorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  // Filtering
  enableFiltering?: boolean;
  enableGlobalFilter?: boolean;
  globalFilterPlaceholder?: string;
  // Pagination
  enablePagination?: boolean;
  pageSize?: number;
  pageSizes?: number[];
  // Loading & Empty states
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  // Toolbar
  enableToolbar?: boolean;
  toolbarActions?: React.ReactNode;
  // Column visibility
  enableColumnVisibility?: boolean;
  // Row actions
  onRowClick?: (row: Row<TData>) => void;
  onRowDoubleClick?: (row: Row<TData>) => void;
  // Styling
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
}

function DataGrid<TData>({
  className,
  density,
  size,
  data,
  columns,
  enableRowSelection = false,
  onRowSelectionChange,
  enableSorting = true,
  initialSorting = [],
  onSortingChange,
  enableFiltering = false,
  enableGlobalFilter = true,
  globalFilterPlaceholder = "Search all columns...",
  enablePagination = true,
  pageSize = 10,
  pageSizes = [5, 10, 20, 50, 100],
  loading = false,
  loadingText = "Loading...",
  emptyText = "No data available",
  enableToolbar = true,
  toolbarActions,
  enableColumnVisibility = true,
  onRowClick,
  onRowDoubleClick,
  striped = false,
  bordered = true,
  hoverable = true,
  ...props
}: DataGridProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  // Create table columns with selection support
  const tableColumns = React.useMemo(() => {
    let cols = [...columns];

    // Add selection column if enabled
    if (enableRowSelection) {
      cols = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
          size: 50,
        } as DataGridColumn<TData>,
        ...cols,
      ];
    }

    return cols.map((col) => ({
      id: col.id,
      accessorKey: col.accessorKey,
      enableSorting: col.sortable !== false && enableSorting,
      header:
        typeof col.header === "string" && col.sortable !== false && enableSorting
          ? ({ column }: any) => (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="h-auto p-0 font-semibold hover:bg-transparent"
              >
                {col.header as string}
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            )
          : col.header,
      cell: col.cell,
      size: col.width,
      minSize: col.minWidth,
      maxSize: col.maxWidth,
    } as ColumnDef<TData>));
  }, [columns, enableRowSelection, enableSorting]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      onSortingChange?.(newSorting);
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination: enablePagination ? pagination : undefined,
    },
  });

  // Handle row selection change
  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map((row: any) => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, onRowSelectionChange, table]);

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className={cn(dataGridVariants({ density, size }), className)} {...props}>
      {/* Toolbar */}
      {enableToolbar && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Global filter */}
            {enableGlobalFilter && (
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={globalFilterPlaceholder}
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-8 max-w-sm"
                />
              </div>
            )}

            {/* Selection info */}
            {enableRowSelection && selectedCount > 0 && (
              <Badge variant="secondary">{selectedCount} selected</Badge>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {toolbarActions}

            {/* Column visibility */}
            {enableColumnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Columns
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      const isVisible = column.getIsVisible();
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          checked={isVisible}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          <div className="flex items-center space-x-2">
                            {isVisible ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                            <span>
                              {typeof column.columnDef.header === "string"
                                ? column.columnDef.header
                                : column.id}
                            </span>
                          </div>
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10">
                  {loadingText}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    hoverable && "hover:bg-muted/50 cursor-pointer",
                    striped && index % 2 === 0 && "bg-muted/25",
                    row.getIsSelected() && "bg-muted"
                  )}
                  onClick={() => onRowClick?.(row)}
                  onDoubleClick={() => onRowDoubleClick?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10">
                  {emptyText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizes.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { DataGrid, dataGridVariants };