import type { Meta, StoryObj } from '@storybook/react'
import {
  AppProvider,
  Scrollable,
  IndexTable,
} from '../../src/x'
import { useState } from 'react'

const meta: Meta = {
  title: 'Polaris/Utilities & Tables',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const AppProviderExample: Story = {
  name: 'App Provider',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Theme Provider Context</h3>
        <AppProvider
          i18n={{
            Polaris: {
              Common: {
                checkbox: 'checkbox',
                undo: 'Undo',
                cancel: 'Cancel',
                clear: 'Clear',
                close: 'Close',
                submit: 'Submit',
                more: 'More',
              },
            },
          }}
          theme={{ colorScheme: 'light' }}
          features={{ newDesignLanguage: true }}
        >
          <div className="p-4 border rounded-lg bg-background">
            <p className="text-foreground">
              This content is wrapped in an AppProvider which provides theming,
              internationalization, and feature flags to all child components.
            </p>
            <div className="mt-4 p-3 bg-muted rounded">
              <h4 className="font-medium mb-2">Available Context:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Theme system (light/dark modes)</li>
                <li>• Internationalization (i18n)</li>
                <li>• Feature flags</li>
                <li>• Media query context</li>
              </ul>
            </div>
          </div>
        </AppProvider>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Feature Flags Example</h3>
        <AppProvider
          features={{
            newDesignLanguage: true,
            polarisSummerEditions2023: false,
            polarisWinterEditions2023: true,
          }}
        >
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">
              Feature flags control the availability of experimental features
              and design updates across your application.
            </p>
          </div>
        </AppProvider>
      </div>
    </div>
  ),
}

export const ScrollableExample: Story = {
  name: 'Scrollable',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Vertical Scrolling</h3>
        <Scrollable style={{ height: '200px' }} shadow>
          <div className="p-4 space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="p-3 border rounded bg-muted/50">
                <h4 className="font-medium">Item {i + 1}</h4>
                <p className="text-sm text-muted-foreground">
                  This is a scrollable item with some content. The container
                  has a fixed height and will show scroll indicators when needed.
                </p>
              </div>
            ))}
          </div>
        </Scrollable>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Horizontal Scrolling</h3>
        <Scrollable horizontal style={{ width: '400px' }} shadow>
          <div className="flex gap-4 p-4" style={{ width: '800px' }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex-shrink-0 w-32 p-3 border rounded bg-muted/50">
                <h4 className="font-medium text-sm">Card {i + 1}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Horizontal scroll content
                </p>
              </div>
            ))}
          </div>
        </Scrollable>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Both Directions</h3>
        <Scrollable style={{ height: '200px', width: '400px' }} shadow>
          <div style={{ width: '600px', height: '400px' }} className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="p-3 border rounded bg-muted/50">
                  <h4 className="font-medium text-sm">Item {i + 1}</h4>
                  <p className="text-xs text-muted-foreground">Content</p>
                </div>
              ))}
            </div>
          </div>
        </Scrollable>
      </div>
    </div>
  ),
}

export const IndexTableExample: Story = {
  name: 'Index Table',
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>(['1'])
    const [sortColumn, setSortColumn] = useState<string>('name')
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending')

    const columns = [
      { id: 'name', title: 'Customer', sortable: true },
      { id: 'email', title: 'Email', sortable: true },
      { id: 'orders', title: 'Orders', sortable: true },
      { id: 'amount', title: 'Amount Spent', sortable: true },
      { id: 'status', title: 'Status' },
      { id: 'date', title: 'Date Joined', sortable: true },
    ]

    const rows = [
      {
        id: '1',
        cells: [
          'John Smith',
          'john@example.com',
          '12',
          '$1,234.56',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>,
          'Jan 15, 2024',
        ],
      },
      {
        id: '2',
        cells: [
          'Jane Doe',
          'jane@example.com',
          '8',
          '$892.34',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>,
          'Feb 3, 2024',
        ],
      },
      {
        id: '3',
        cells: [
          'Bob Wilson',
          'bob@example.com',
          '23',
          '$2,456.78',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>,
          'Dec 8, 2023',
        ],
      },
      {
        id: '4',
        cells: [
          'Alice Johnson',
          'alice@example.com',
          '5',
          '$567.89',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactive
          </span>,
          'Mar 12, 2024',
        ],
      },
      {
        id: '5',
        cells: [
          'Charlie Brown',
          'charlie@example.com',
          '15',
          '$1,678.90',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>,
          'Jan 28, 2024',
        ],
      },
    ]

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Data Table</h3>
          <IndexTable
            columns={columns}
            rows={rows}
            selectable
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            promotedBulkActions={[
              {
                content: 'Export selected',
                onAction: (ids) => console.log('Export customers:', ids),
              },
              {
                content: 'Email selected',
                onAction: (ids) => console.log('Email customers:', ids),
              },
            ]}
            bulkActions={[
              {
                content: 'Add to segment',
                onAction: (ids) => console.log('Add to segment:', ids),
              },
              {
                content: 'Change status',
                onAction: (ids) => console.log('Change status:', ids),
              },
              {
                content: 'Archive customers',
                onAction: (ids) => console.log('Archive:', ids),
              },
              {
                content: 'Delete customers',
                onAction: (ids) => console.log('Delete:', ids),
                destructive: true,
              },
            ]}
            sortable
            sortColumnIndex={columns.findIndex(col => col.id === sortColumn)}
            sortDirection={sortDirection}
            onSort={(columnIndex, direction) => {
              setSortColumn(columns[columnIndex].id)
              setSortDirection(direction)
              console.log('Sort by:', columns[columnIndex].title, direction)
            }}
          />
        </div>

        <div className="p-4 border rounded-lg bg-muted/50">
          <h4 className="font-medium mb-2">Table Features</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Row selection with bulk actions</li>
            <li>• Sortable columns</li>
            <li>• Promoted and dropdown bulk actions</li>
            <li>• Loading and empty states</li>
            <li>• Responsive design</li>
            <li>• Keyboard navigation support</li>
          </ul>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Selected rows: {selectedRows.length}</p>
          <p>Sort: {columns.find(col => col.id === sortColumn)?.title} ({sortDirection})</p>
        </div>
      </div>
    )
  },
}