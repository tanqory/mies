import type { Meta, StoryObj } from '@storybook/react'
import {
  ActionList,
  DescriptionList,
  List,
  ListItem,
  Listbox,
  OptionList,
  ResourceItem,
  ResourceList
} from '../../src/x'
import { User, FileText, Calendar, Mail, Star, Trash2, Edit, Download, Rocket, Palette, Smartphone } from 'lucide-react'
import { useState } from 'react'

const meta: Meta = {
  title: 'Polaris/Lists',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const ListExample: Story = {
  name: 'List',
  render: () => (
    <div className="space-y-8 max-w-md">
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

      <div>
        <h3 className="text-lg font-semibold mb-3">Custom List</h3>
        <List variant="none">
          <ListItem>✅ Feature complete</ListItem>
          <ListItem><Rocket className="inline h-4 w-4 mr-2" />High performance</ListItem>
          <ListItem><Palette className="inline h-4 w-4 mr-2" />Beautiful design</ListItem>
          <ListItem><Smartphone className="inline h-4 w-4 mr-2" />Mobile responsive</ListItem>
        </List>
      </div>
    </div>
  ),
}

export const DescriptionListExample: Story = {
  name: 'Description List',
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default Layout</h3>
        <DescriptionList
          items={[
            { term: 'Full name', description: 'John Smith' },
            { term: 'Email', description: 'john.smith@example.com' },
            { term: 'Phone', description: '+1 (555) 123-4567' },
            { term: 'Address', description: '123 Main St, Anytown, ST 12345' },
            { term: 'Member since', description: 'January 2024' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Inline Layout</h3>
        <DescriptionList
          variant="inline"
          items={[
            { term: 'Status', description: <span className="text-green-600 font-medium">Active</span> },
            { term: 'Plan', description: <span className="text-blue-600 font-medium">Pro</span> },
            { term: 'Billing', description: 'Monthly' },
            { term: 'Next payment', description: 'Feb 15, 2024' },
          ]}
        />
      </div>
    </div>
  ),
}

export const ListboxExample: Story = {
  name: 'Listbox',
  render: () => {
    const [selected, setSelected] = useState('option2')

    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4', disabled: true },
      { value: 'option5', label: 'Option 5' },
    ]

    return (
      <div className="max-w-xs">
        <h3 className="text-lg font-semibold mb-3">Select an option:</h3>
        <Listbox
          options={options}
          value={selected}
          onSelectionChange={setSelected}
          accessibilityLabel="Choose an option"
        />
        <p className="mt-3 text-sm text-muted-foreground">
          Selected: {options.find(opt => opt.value === selected)?.label}
        </p>
      </div>
    )
  },
}

export const OptionListExample: Story = {
  name: 'Option List',
  render: () => {
    const [selected, setSelected] = useState<string[]>(['option1', 'option3'])

    return (
      <div className="max-w-md">
        <h3 className="text-lg font-semibold mb-3">Multiple Selection</h3>
        <OptionList
          sections={[
            {
              title: 'Features',
              options: [
                {
                  value: 'option1',
                  label: 'Advanced Analytics',
                  helpText: 'Get detailed insights about your data',
                  media: <Calendar className="h-5 w-5" />
                },
                {
                  value: 'option2',
                  label: 'Email Integration',
                  helpText: 'Connect with popular email services',
                  media: <Mail className="h-5 w-5" />
                },
                {
                  value: 'option3',
                  label: 'Premium Support',
                  helpText: '24/7 priority customer support',
                  media: <Star className="h-5 w-5" />
                },
              ],
            },
          ]}
          selected={selected}
          allowMultiple
          onChange={setSelected}
        />
        <p className="mt-3 text-sm text-muted-foreground">
          Selected: {selected.length} option(s)
        </p>
      </div>
    )
  },
}

export const ResourceItemExample: Story = {
  name: 'Resource Item',
  render: () => (
    <div className="space-y-4 max-w-lg">
      <ResourceItem
        id="user1"
        name="John Smith"
        media={<User className="h-10 w-10 p-2 bg-muted rounded-full" />}
        shortcutActions={[
          { content: 'Edit', icon: Edit, onAction: () => console.log('Edit') },
          { content: 'Delete', icon: Trash2, destructive: true, onAction: () => console.log('Delete') },
        ]}
        url="/users/john-smith"
      >
        <p className="text-sm text-muted-foreground">
          john@example.com • Customer since 2024
        </p>
        <p className="text-sm text-muted-foreground">
          Last order: $299.99 • 3 orders total
        </p>
      </ResourceItem>

      <ResourceItem
        id="document1"
        name="Annual Report 2024"
        media={<FileText className="h-10 w-10 p-2 bg-muted rounded-full" />}
        shortcutActions={[
          { content: 'Download', icon: Download, onAction: () => console.log('Download') },
          { content: 'Delete', icon: Trash2, destructive: true, onAction: () => console.log('Delete') },
        ]}
      >
        <p className="text-sm text-muted-foreground">
          PDF • 2.4 MB • Modified 2 days ago
        </p>
      </ResourceItem>
    </div>
  ),
}

export const ResourceListExample: Story = {
  name: 'Resource List',
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['1'])

    const items = [
      {
        id: '1',
        name: 'John Smith',
        media: <User className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-full" />,
        children: (
          <>
            <p className="text-sm text-muted-foreground">john@example.com</p>
            <p className="text-sm text-muted-foreground">Customer since 2024 • 5 orders</p>
          </>
        ),
        shortcutActions: [
          { content: 'Edit', icon: Edit, onAction: () => console.log('Edit John') },
          { content: 'Delete', icon: Trash2, destructive: true, onAction: () => console.log('Delete John') },
        ],
      },
      {
        id: '2',
        name: 'Jane Doe',
        media: <User className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-full" />,
        children: (
          <>
            <p className="text-sm text-muted-foreground">jane@example.com</p>
            <p className="text-sm text-muted-foreground">Customer since 2023 • 12 orders</p>
          </>
        ),
        shortcutActions: [
          { content: 'Edit', icon: Edit, onAction: () => console.log('Edit Jane') },
          { content: 'Delete', icon: Trash2, destructive: true, onAction: () => console.log('Delete Jane') },
        ],
      },
      {
        id: '3',
        name: 'Bob Wilson',
        media: <User className="h-10 w-10 p-2 bg-purple-100 text-purple-600 rounded-full" />,
        children: (
          <>
            <p className="text-sm text-muted-foreground">bob@example.com</p>
            <p className="text-sm text-muted-foreground">Customer since 2022 • 8 orders</p>
          </>
        ),
        shortcutActions: [
          { content: 'Edit', icon: Edit, onAction: () => console.log('Edit Bob') },
          { content: 'Delete', icon: Trash2, destructive: true, onAction: () => console.log('Delete Bob') },
        ],
      },
    ]

    return (
      <div className="max-w-2xl">
        <ResourceList
          items={items}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={[
            { content: 'Export selected', onAction: (ids) => console.log('Export', ids) },
            { content: 'Email selected', onAction: (ids) => console.log('Email', ids) },
          ]}
          bulkActions={[
            { content: 'Add to group', onAction: (ids) => console.log('Add to group', ids) },
            { content: 'Archive', onAction: (ids) => console.log('Archive', ids) },
            { content: 'Delete', onAction: (ids) => console.log('Delete', ids), destructive: true },
          ]}
          showHeader
          totalItemsCount={3}
        />
      </div>
    )
  },
}