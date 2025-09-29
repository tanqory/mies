import React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Checkbox } from '../../components/ui/checkbox';
import { cn } from '../../components/ui/utils';

export interface DataTableColumn {
  id: string;
  header: string;
  accessorKey?: string;
  cell?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

export interface DataTableProps {
  title?: string;
  data: any[];
  columns: DataTableColumn[];
  searchable?: boolean;
  searchPlaceholder?: string;
  exportable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: any) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  onExport?: (format: 'csv' | 'excel' | 'json') => void;
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
  actions?: React.ReactNode;
}

export function DataTable({
  title,
  data,
  columns,
  searchable = true,
  searchPlaceholder = 'ค้นหาข้อมูล...',
  exportable = false,
  selectable = false,
  pagination = true,
  pageSize = 10,
  onRowClick,
  onSelectionChange,
  onExport,
  className,
  loading = false,
  emptyMessage = 'ไม่พบข้อมูล',
  actions,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((row) =>
      columns.some((column) => {
        const value = column.accessorKey ? row[column.accessorKey] : '';
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return filteredData;

    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSelectionChange = (newSelection: any[]) => {
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleExport = (format: 'csv' | 'excel' | 'json') => {
    if (onExport) {
      onExport(format);
    } else {
      // Default export logic
      const exportData = selectedRows.length > 0 ? selectedRows : filteredData;

      if (format === 'json') {
        const jsonData = JSON.stringify(exportData, null, 2);
        downloadFile(jsonData, 'data.json', 'application/json');
      } else if (format === 'csv') {
        const csvData = convertToCSV(exportData);
        downloadFile(csvData, 'data.csv', 'text/csv');
      }
    }
  };

  const convertToCSV = (data: any[]) => {
    if (!data.length) return '';

    const headers = columns.map(col => col.header).join(',');
    const rows = data.map(row =>
      columns.map(col => {
        const value = col.accessorKey ? row[col.accessorKey] : '';
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    );

    return [headers, ...rows].join('\n');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderPagination = () => {
    if (!pagination || totalPages <= 1) return null;

    const pages = [];
    const showPages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          แสดง {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredData.length)} จาก {filteredData.length} รายการ
          {selectedRows.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              เลือก {selectedRows.length} รายการ
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </Button>
          {pages}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className={cn('w-full', className)}>
      {(title || searchable || exportable || actions) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              {title && <CardTitle>{title}</CardTitle>}
            </div>
            <div className="flex items-center space-x-2">
              {searchable && (
                <div className="relative">
                  <Input
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-6 w-6 p-0"
                      onClick={() => setSearchTerm('')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  )}
                </div>
              )}

              {exportable && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      ส่งออก
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                      ส่งออกเป็น CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('json')}>
                      ส่งออกเป็น JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {actions}
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {selectable && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRows([...paginatedData]);
                            handleSelectionChange([...paginatedData]);
                          } else {
                            setSelectedRows([]);
                            handleSelectionChange([]);
                          }
                        }}
                      />
                    </TableHead>
                  )}
                  {columns.map((column) => (
                    <TableHead key={column.id} className={cn(
                      column.width && `w-[${column.width}px]`,
                      column.minWidth && `min-w-[${column.minWidth}px]`,
                      column.maxWidth && `max-w-[${column.maxWidth}px]`
                    )}>
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className={cn(
                      onRowClick && 'cursor-pointer hover:bg-muted/50',
                      selectedRows.includes(row) && 'bg-muted'
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(row)}
                          onCheckedChange={(checked) => {
                            let newSelection: any[];
                            if (checked) {
                              newSelection = [...selectedRows, row];
                            } else {
                              newSelection = selectedRows.filter(r => r !== row);
                            }
                            setSelectedRows(newSelection);
                            handleSelectionChange(newSelection);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = column.accessorKey ? row[column.accessorKey] : '';
                      return (
                        <TableCell key={column.id}>
                          {column.cell ? column.cell(value, row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {renderPagination()}
      </CardContent>
    </Card>
  );
}