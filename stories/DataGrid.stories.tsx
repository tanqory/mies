import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid, DataGridColumn } from '../src/components/ui/data-grid';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../src/components/ui/dropdown-menu';

const meta: Meta<typeof DataGrid> = {
  title: 'Components/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful data grid component built on TanStack Table with features like sorting, filtering, pagination, and row selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    enableRowSelection: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    enableSorting: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    enableFiltering: {
      control: 'boolean',
      description: 'Enable column filtering',
    },
    enablePagination: {
      control: 'boolean',
      description: 'Enable pagination',
    },
    density: {
      control: { type: 'select' },
      options: ['compact', 'standard', 'comfortable'],
      description: 'Row density',
    },
    striped: {
      control: 'boolean',
      description: 'Enable striped rows',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable row hover effects',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  joinDate: string;
}

const sampleData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-03-15',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-03-14',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    role: 'Manager',
    status: 'inactive',
    lastLogin: '2024-02-28',
    joinDate: '2022-11-10',
  },
  {
    id: '4',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'User',
    status: 'pending',
    lastLogin: '2024-03-10',
    joinDate: '2024-03-01',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-03-16',
    joinDate: '2023-06-15',
  },
  {
    id: '6',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-03-16',
    joinDate: '2023-03-20',
  },
  {
    id: '7',
    name: 'Eva Garcia',
    email: 'eva.garcia@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-03-15',
    joinDate: '2023-08-10',
  },
  {
    id: '8',
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-20',
    joinDate: '2022-12-05',
  },
];

const basicColumns: DataGridColumn<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }: any) => {
      const status = getValue() as string;
      const variant =
        status === 'active' ? 'success' :
        status === 'inactive' ? 'destructive' : 'secondary';

      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
];

const advancedColumns: DataGridColumn<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue, row }: any) => (
      <div className="font-medium">
        {getValue()}
        <div className="text-sm text-muted-foreground">
          ID: {row.original.id}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }: any) => (
      <Badge variant="outline">{getValue()}</Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }: any) => {
      const status = getValue() as string;
      const variant =
        status === 'active' ? 'success' :
        status === 'inactive' ? 'destructive' : 'secondary';

      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ getValue }: any) => (
      <div className="text-sm">
        {new Date(getValue()).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    cell: ({ getValue }: any) => (
      <div className="text-sm">
        {new Date(getValue()).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
  },
};

export const WithRowSelection: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    enableRowSelection: true,
  },
};

export const WithSorting: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    enableSorting: true,
  },
};

export const WithFiltering: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    enableFiltering: true,
    enableGlobalFilter: true,
  },
};

export const WithPagination: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    enablePagination: true,
    pageSize: 5,
  },
};

export const AllFeatures: Story = {
  args: {
    data: sampleData,
    columns: advancedColumns,
    enableRowSelection: true,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    pageSize: 5,
    striped: true,
    hoverable: true,
  },
};

export const Densities: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Compact</h3>
        <DataGrid
          data={sampleData.slice(0, 3)}
          columns={basicColumns}
          density="compact"
          enablePagination={false}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Standard (Default)</h3>
        <DataGrid
          data={sampleData.slice(0, 3)}
          columns={basicColumns}
          density="standard"
          enablePagination={false}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Comfortable</h3>
        <DataGrid
          data={sampleData.slice(0, 3)}
          columns={basicColumns}
          density="comfortable"
          enablePagination={false}
        />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: true,
    loadingText: 'Loading users...',
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyText: 'No users found. Try adjusting your search criteria.',
  },
};

export const WithToolbarActions: Story = {
  render: function DataGridWithActions() {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);

    return (
      <DataGrid
        data={sampleData}
        columns={advancedColumns}
        enableRowSelection
        enableSorting
        enableFiltering
        enablePagination
        pageSize={5}
        onRowSelectionChange={setSelectedRows}
        toolbarActions={
          <div className="flex gap-2">
            <Button size="sm" disabled={selectedRows.length === 0}>
              Export ({selectedRows.length})
            </Button>
            <Button size="sm" variant="outline">
              Add User
            </Button>
          </div>
        }
      />
    );
  },
};

export const Interactive: Story = {
  render: function InteractiveDataGrid() {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [data, setData] = useState(sampleData);

    const handleRowClick = (row: any) => {
      console.log('Row clicked:', row.original);
    };

    const handleRowDoubleClick = (row: any) => {
      console.log('Row double-clicked:', row.original);
      alert(`Double-clicked on ${row.original.name}`);
    };

    const deleteSelected = () => {
      const selectedIds = selectedRows.map(row => row.id);
      setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedRows([]);
    };

    return (
      <div className="space-y-4">
        <DataGrid
          data={data}
          columns={advancedColumns}
          enableRowSelection
          enableSorting
          enableFiltering
          enablePagination
          pageSize={5}
          striped
          hoverable
          onRowSelectionChange={setSelectedRows}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleRowDoubleClick}
          toolbarActions={
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="destructive"
                disabled={selectedRows.length === 0}
                onClick={deleteSelected}
              >
                Delete Selected ({selectedRows.length})
              </Button>
              <Button size="sm" variant="outline">
                Add User
              </Button>
            </div>
          }
        />

        {selectedRows.length > 0 && (
          <div className="text-sm text-muted-foreground p-4 bg-muted rounded">
            <p className="font-medium">Selected Users:</p>
            <ul className="mt-2 space-y-1">
              {selectedRows.map(user => (
                <li key={user.id} className="flex items-center gap-2">
                  <span>{user.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {user.role}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

// Sales data example
interface Sale {
  id: string;
  date: string;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

const salesData: Sale[] = [
  {
    id: 'S001',
    date: '2024-03-15',
    customer: 'Acme Corp',
    product: 'Widget A',
    quantity: 10,
    unitPrice: 25.99,
    total: 259.90,
    status: 'completed',
  },
  {
    id: 'S002',
    date: '2024-03-14',
    customer: 'Tech Solutions',
    product: 'Widget B',
    quantity: 5,
    unitPrice: 49.99,
    total: 249.95,
    status: 'pending',
  },
  {
    id: 'S003',
    date: '2024-03-13',
    customer: 'Global Industries',
    product: 'Widget C',
    quantity: 20,
    unitPrice: 15.50,
    total: 310.00,
    status: 'completed',
  },
  {
    id: 'S004',
    date: '2024-03-12',
    customer: 'StartupXYZ',
    product: 'Widget A',
    quantity: 3,
    unitPrice: 25.99,
    total: 77.97,
    status: 'cancelled',
  },
];

const salesColumns: DataGridColumn<Sale>[] = [
  {
    accessorKey: 'id',
    header: 'Order ID',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }: any) => new Date(getValue()).toLocaleDateString(),
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'quantity',
    header: 'Qty',
    cell: ({ getValue }: any) => (
      <div className="text-center font-mono">{getValue()}</div>
    ),
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ getValue }: any) => (
      <div className="text-right font-mono">
        ${getValue().toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ getValue }: any) => (
      <div className="text-right font-mono font-semibold">
        ${getValue().toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }: any) => {
      const status = getValue() as string;
      const variant =
        status === 'completed' ? 'success' :
        status === 'cancelled' ? 'destructive' : 'secondary';

      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
];

export const SalesReport: Story = {
  render: () => (
    <DataGrid
      data={salesData}
      columns={salesColumns}
      enableSorting
      enableFiltering
      enableRowSelection
      striped
      toolbarActions={
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Export CSV
          </Button>
          <Button size="sm">
            New Order
          </Button>
        </div>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'A sales report example showing financial data with proper formatting.',
      },
    },
  },
};