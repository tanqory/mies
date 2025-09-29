import { DataGrid, DataGridProps } from '../../components/ui/data-grid';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../components/ui/utils';

export interface DataTableProps<T = any> extends Omit<DataGridProps<T>, 'data' | 'columns'> {
  title?: string;
  description?: string;
  data: T[];
  columns: DataGridProps<T>['columns'];
  className?: string;
  showHeader?: boolean;
}

export function DataTable<T = any>({
  title,
  description,
  data,
  columns,
  className,
  showHeader = true,
  ...props
}: DataTableProps<T>) {
  return (
    <Card className={cn('w-full', className)}>
      {showHeader && (title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
      )}
      <CardContent className={cn(!showHeader && 'pt-6')}>
        <DataGrid
          data={data}
          columns={columns}
          {...props}
        />
      </CardContent>
    </Card>
  );
}

