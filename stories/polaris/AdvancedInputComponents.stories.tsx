import type { Meta, StoryObj } from '@storybook/react'
import {
  ChoiceList,
  ColorPicker,
  Combobox,
  Filters,
} from '../../src/x'
import { useState } from 'react'

const meta: Meta = {
  title: 'Polaris/Advanced Input',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const ChoiceListExample: Story = {
  name: 'Choice List',
  render: () => {
    const [singleSelected, setSingleSelected] = useState<string[]>(['standard'])
    const [multipleSelected, setMultipleSelected] = useState<string[]>(['email', 'push'])

    return (
      <div className="space-y-8 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Single Selection</h3>
          <ChoiceList
            title="Shipping method"
            choices={[
              {
                label: 'Standard shipping (5-7 days)',
                value: 'standard',
                helpText: 'Free shipping on orders over $50'
              },
              {
                label: 'Express shipping (2-3 days)',
                value: 'express',
                helpText: '$10.00 additional charge'
              },
              {
                label: 'Overnight shipping',
                value: 'overnight',
                helpText: '$25.00 additional charge'
              },
            ]}
            selected={singleSelected}
            onChange={setSingleSelected}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Multiple Selection</h3>
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

        <div>
          <h3 className="text-lg font-semibold mb-4">With Error State</h3>
          <ChoiceList
            title="Payment method"
            error="Please select a payment method"
            choices={[
              { label: 'Credit card', value: 'credit' },
              { label: 'PayPal', value: 'paypal' },
              { label: 'Bank transfer', value: 'bank' },
            ]}
            selected={[]}
            onChange={() => {}}
          />
        </div>
      </div>
    )
  },
}

export const ColorPickerExample: Story = {
  name: 'Color Picker',
  render: () => {
    const [color, setColor] = useState('#FF6B6B')
    const [allowAlpha, setAllowAlpha] = useState(false)

    return (
      <div className="space-y-8 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Color Picker</h3>
          <ColorPicker
            onChange={setColor}
            color={color}
            allowAlpha={allowAlpha}
          />
          <p className="mt-2 text-sm text-muted-foreground">
            Selected color: {color}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={allowAlpha}
              onChange={(e) => setAllowAlpha(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Allow alpha/transparency</span>
          </label>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Color Picker with Presets</h3>
          <ColorPicker
            onChange={setColor}
            color={color}
            allowAlpha={allowAlpha}
            presets={[
              '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
              '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
            ]}
          />
        </div>
      </div>
    )
  },
}

export const ComboboxExample: Story = {
  name: 'Combobox',
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['react'])
    const [inputValue, setInputValue] = useState('')

    const tags = [
      'react', 'typescript', 'javascript', 'nextjs', 'vue', 'angular',
      'svelte', 'tailwind', 'css', 'html', 'nodejs', 'express'
    ]

    const filteredTags = tags.filter(tag =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(tag)
    )

    return (
      <div className="space-y-8 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Multi-select Tags</h3>
          <Combobox
            activator={
              <div className="min-h-[38px] px-3 py-1 border rounded-md bg-background flex flex-wrap gap-1 items-center">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded"
                  >
                    {tag}
                    <button
                      onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                      className="ml-1 hover:bg-primary-foreground/20 rounded"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={selectedTags.length === 0 ? "Search tags..." : ""}
                  className="flex-1 min-w-[100px] outline-none bg-transparent"
                />
              </div>
            }
            options={filteredTags.map(tag => ({
              value: tag,
              label: tag,
            }))}
            onSelect={(value) => {
              setSelectedTags(prev => [...prev, value])
              setInputValue('')
            }}
            allowMultiple
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Single Select with Search</h3>
          <Combobox
            activator={
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search frameworks..."
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
            }
            options={[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue.js' },
              { value: 'angular', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'nextjs', label: 'Next.js' },
            ].filter(option =>
              option.label.toLowerCase().includes(inputValue.toLowerCase())
            )}
            onSelect={(value) => {
              setInputValue(value)
            }}
          />
        </div>
      </div>
    )
  },
}

export const FiltersExample: Story = {
  name: 'Filters',
  render: () => {
    const [queryValue, setQueryValue] = useState('')
    const [filters, setFilters] = useState([
      {
        key: 'status',
        label: 'Status',
        filter: (
          <select className="px-3 py-1 border rounded">
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        ),
        shortcut: true,
      },
      {
        key: 'category',
        label: 'Category',
        filter: (
          <select className="px-3 py-1 border rounded">
            <option value="">All categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        ),
        shortcut: true,
      },
      {
        key: 'price',
        label: 'Price Range',
        filter: (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-20 px-2 py-1 border rounded"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        ),
      },
      {
        key: 'date',
        label: 'Date Created',
        filter: (
          <input
            type="date"
            className="px-3 py-1 border rounded"
          />
        ),
      },
    ])

    return (
      <div className="max-w-4xl">
        <h3 className="text-lg font-semibold mb-4">Product Filters</h3>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={[
            { key: 'status', label: 'Status: Active', onRemove: () => {} },
            { key: 'category', label: 'Category: Electronics', onRemove: () => {} },
          ]}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
          onClearAll={() => {
            setQueryValue('')
            console.log('Clear all filters')
          }}
          searchFieldPlaceholder="Search products..."
        />

        <div className="mt-6 p-4 border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Active filters and search query will be used to filter your product list.
            Current search: "{queryValue}"
          </p>
        </div>
      </div>
    )
  },
}