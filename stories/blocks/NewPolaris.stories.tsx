import type { Meta, StoryObj } from '@storybook/react'
import {
  ActionList,
  DescriptionList,
  List,
  Listbox,
  OptionList,
  ResourceItem,
  ResourceList,
  Banner,
  ExceptionList,
  ChoiceList,
  ColorPicker,
  Combobox,
  Filters,
  InlineError,
  Box,
  BlockStack,
  InlineStack,
  Grid,
  GridItem,
  AccountConnection,
  MediaCard,
  KeyboardKey,
  KeyCombination,
  Thumbnail,
  VideoThumbnail,
  FooterHelp,
  FooterHelpLink,
  AppProvider,
  Scrollable,
  IndexTable,
} from '../../src/x'
import { User, FileText, Calendar, Mail, Star, Trash2, Edit, Download } from 'lucide-react'
import { useState } from 'react'

const meta: Meta = {
  title: 'Blocks/New Polaris Components',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

// Action List Story
export const ActionListDemo: Story = {
  name: 'Action List',
  render: () => (
    <div className="max-w-md">
      <ActionList
        sections={[
          {
            title: 'File actions',
            items: [
              {
                content: 'Edit file',
                icon: Edit,
                onAction: () => console.log('Edit'),
              },
              {
                content: 'Download',
                icon: Download,
                onAction: () => console.log('Download'),
              },
              {
                content: 'Delete file',
                icon: Trash2,
                destructive: true,
                onAction: () => console.log('Delete'),
              },
            ],
          },
          {
            title: 'Navigation',
            items: [
              {
                content: 'Go to folder',
                url: '/folder',
                onAction: () => console.log('Navigate'),
              },
              {
                content: 'External link',
                url: 'https://example.com',
                external: true,
              },
            ],
          },
        ]}
      />
    </div>
  ),
}

// List Component Story
export const ListDemo: Story = {
  name: 'List Component',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Bullet List</h3>
        <List
          variant="bullet"
          items={[
            { content: 'React components library' },
            { content: 'TypeScript support' },
            { content: 'Tailwind CSS styling' },
            { content: 'Accessible by default' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Numbered List</h3>
        <List
          variant="number"
          items={[
            { content: 'Install the package' },
            { content: 'Import components' },
            { content: 'Add to your app' },
            { content: 'Customize as needed' },
          ]}
        />
      </div>
    </div>
  ),
}

// Description List Story
export const DescriptionListDemo: Story = {
  name: 'Description List',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default Layout</h3>
        <DescriptionList
          items={[
            { term: 'Full name', description: 'John Smith' },
            { term: 'Email', description: 'john.smith@example.com' },
            { term: 'Phone', description: '+1 (555) 123-4567' },
            { term: 'Address', description: '123 Main St, Anytown, ST 12345' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Inline Layout</h3>
        <DescriptionList
          variant="inline"
          items={[
            { term: 'Status', description: 'Active' },
            { term: 'Plan', description: 'Pro' },
            { term: 'Joined', description: 'January 2024' },
          ]}
        />
      </div>
    </div>
  ),
}

// Banner Story
export const BannerDemo: Story = {
  name: 'Banner',
  render: () => (
    <div className="space-y-4">
      <Banner
        status="info"
        title="New features available"
        action={{
          content: 'Learn more',
          onAction: () => console.log('Learn more'),
        }}
        onDismiss={() => console.log('Dismissed')}
      >
        Check out the latest updates to improve your workflow.
      </Banner>

      <Banner
        status="warning"
        title="Action required"
        action={{
          content: 'Update settings',
          onAction: () => console.log('Update'),
        }}
      >
        Your payment method will expire soon.
      </Banner>

      <Banner
        status="critical"
        title="Service disruption"
      >
        We're experiencing technical difficulties. Please try again later.
      </Banner>
    </div>
  ),
}

// Layout Components Story
export const LayoutDemo: Story = {
  name: 'Layout Components',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Box Component</h3>
        <Box
          padding="2"
          background="surface-neutral"
          borderRadius="2"
          borderWidth="025"
          borderColor="border"
        >
          <p>This is content inside a Box component with padding, background, and border.</p>
        </Box>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Stack Components</h3>
        <BlockStack gap="2">
          <Box padding="1" background="surface-neutral" borderRadius="1">Block Stack Item 1</Box>
          <Box padding="1" background="surface-neutral" borderRadius="1">Block Stack Item 2</Box>
          <Box padding="1" background="surface-neutral" borderRadius="1">Block Stack Item 3</Box>
        </BlockStack>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Grid Component</h3>
        <Grid columns="3" gap="2">
          <GridItem>
            <Box padding="2" background="surface-neutral" borderRadius="1">Grid Item 1</Box>
          </GridItem>
          <GridItem>
            <Box padding="2" background="surface-neutral" borderRadius="1">Grid Item 2</Box>
          </GridItem>
          <GridItem>
            <Box padding="2" background="surface-neutral" borderRadius="1">Grid Item 3</Box>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
}

// Choice List Story
export const ChoiceListDemo: Story = {
  name: 'Choice List',
  render: () => {
    const [singleSelected, setSingleSelected] = useState<string[]>(['option1'])
    const [multipleSelected, setMultipleSelected] = useState<string[]>(['option1', 'option3'])

    return (
      <div className="space-y-8 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-3">Single Selection</h3>
          <ChoiceList
            title="Shipping method"
            choices={[
              { label: 'Standard shipping (5-7 days)', value: 'standard', helpText: 'Free shipping' },
              { label: 'Express shipping (2-3 days)', value: 'express', helpText: '$10.00' },
              { label: 'Overnight shipping', value: 'overnight', helpText: '$25.00' },
            ]}
            selected={singleSelected}
            onChange={setSingleSelected}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Multiple Selection</h3>
          <ChoiceList
            title="Notification preferences"
            allowMultiple
            choices={[
              { label: 'Email notifications', value: 'email' },
              { label: 'SMS notifications', value: 'sms' },
              { label: 'Push notifications', value: 'push' },
              { label: 'Marketing emails', value: 'marketing' },
            ]}
            selected={multipleSelected}
            onChange={setMultipleSelected}
          />
        </div>
      </div>
    )
  },
}

// Keyboard Key Story
export const KeyboardKeyDemo: Story = {
  name: 'Keyboard Key',
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-3">Individual Keys</h3>
        <div className="flex items-center gap-2">
          <KeyboardKey>⌘</KeyboardKey>
          <KeyboardKey>Ctrl</KeyboardKey>
          <KeyboardKey>Alt</KeyboardKey>
          <KeyboardKey>Shift</KeyboardKey>
          <KeyboardKey>Esc</KeyboardKey>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Key Combinations</h3>
        <div className="space-y-2">
          <div>Save: <KeyCombination keys={['⌘', 'S']} /></div>
          <div>Copy: <KeyCombination keys={['Ctrl', 'C']} /></div>
          <div>Select All: <KeyCombination keys={['⌘', 'A']} /></div>
          <div>Undo: <KeyCombination keys={['⌘', 'Z']} /></div>
        </div>
      </div>
    </div>
  ),
}

// Resource List Story
export const ResourceListDemo: Story = {
  name: 'Resource List',
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const items = [
      {
        id: '1',
        name: 'John Smith',
        media: <User className="h-8 w-8" />,
        children: 'john@example.com • Customer since 2024',
        shortcutActions: [
          { content: 'Edit', icon: Edit, onAction: () => console.log('Edit') },
          { content: 'Delete', icon: Trash2, destructive: true, onAction: () => console.log('Delete') },
        ],
      },
      {
        id: '2',
        name: 'Jane Doe',
        media: <User className="h-8 w-8" />,
        children: 'jane@example.com • Customer since 2023',
        shortcutActions: [
          { content: 'Edit', icon: Edit, onAction: () => console.log('Edit') },
          { content: 'Delete', icon: Trash2, destructive: true, onAction: () => console.log('Delete') },
        ],
      },
    ]

    return (
      <ResourceList
        items={items}
        selectable
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={[
          { content: 'Export', onAction: (ids) => console.log('Export', ids) },
          { content: 'Delete', onAction: (ids) => console.log('Delete', ids), destructive: true },
        ]}
      />
    )
  },
}

// Index Table Story
export const IndexTableDemo: Story = {
  name: 'Index Table',
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([])

    const columns = [
      { id: 'name', title: 'Name', sortable: true },
      { id: 'email', title: 'Email', sortable: true },
      { id: 'status', title: 'Status' },
      { id: 'date', title: 'Created', sortable: true },
    ]

    const rows = [
      {
        id: '1',
        cells: [
          'John Smith',
          'john@example.com',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>,
          'Jan 15, 2024',
        ],
      },
      {
        id: '2',
        cells: [
          'Jane Doe',
          'jane@example.com',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>,
          'Jan 10, 2024',
        ],
      },
    ]

    return (
      <IndexTable
        columns={columns}
        rows={rows}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        promotedBulkActions={[
          { content: 'Export selected', onAction: (ids) => console.log('Export', ids) },
        ]}
        bulkActions={[
          { content: 'Delete selected', onAction: (ids) => console.log('Delete', ids), destructive: true },
        ]}
        sortable
        onSort={(column, direction) => console.log('Sort', column, direction)}
      />
    )
  },
}