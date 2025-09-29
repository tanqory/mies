import type { Meta, StoryObj } from '@storybook/react'
import {
  ButtonGroup,
  Divider,
  Tag,
  Icon,
  Spinner,
  Text,
  DataTable,
  Link,
} from '../../src/x'
import { Button } from '../../src'
import { Save, Edit, Trash2, Download, Star, Heart, User } from 'lucide-react'
import { useState } from 'react'

const meta: Meta = {
  title: 'Polaris/Final Components',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const ButtonGroupExample: Story = {
  name: 'Button Group',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default Spacing</h3>
        <ButtonGroup>
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Segmented Group</h3>
        <ButtonGroup variant="segmented">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
          <Button variant="outline">Year</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Loose Spacing</h3>
        <ButtonGroup spacing="loose">
          <Button>Primary</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="ghost">Tertiary</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}

export const DividerExample: Story = {
  name: 'Divider',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Horizontal Dividers</h3>
        <div>
          <p>Content above divider</p>
          <Divider spacing="tight" />
          <p>Content below divider</p>
          <Divider spacing="loose" />
          <p>Content with loose spacing</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Vertical Divider</h3>
        <div className="flex items-center h-12">
          <span>Left content</span>
          <Divider orientation="vertical" className="mx-4" />
          <span>Right content</span>
        </div>
      </div>
    </div>
  ),
}

export const TagExample: Story = {
  name: 'Tag',
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind'])

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Tag Variants</h3>
          <div className="flex flex-wrap gap-2">
            <Tag variant="default">Default</Tag>
            <Tag variant="primary">Primary</Tag>
            <Tag variant="secondary">Secondary</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="destructive">Critical</Tag>
            <Tag variant="info">Info</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Tag Sizes</h3>
          <div className="flex items-center gap-2">
            <Tag size="small">Small</Tag>
            <Tag size="medium">Medium</Tag>
            <Tag size="large">Large</Tag>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Removable Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag
                key={tag}
                variant="primary"
                onRemove={() => setTags(prev => prev.filter(t => t !== tag))}
              >
                {tag}
              </Tag>
            ))}
          </div>
          <button
            onClick={() => setTags(['React', 'TypeScript', 'Tailwind'])}
            className="mt-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Reset tags
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Clickable Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Tag url="/react" variant="secondary">React</Tag>
            <Tag url="/typescript" variant="secondary">TypeScript</Tag>
            <Tag url="/nextjs" variant="secondary">Next.js</Tag>
          </div>
        </div>
      </div>
    )
  },
}

export const IconExample: Story = {
  name: 'Icon',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Icon Sizes</h3>
        <div className="flex items-center gap-4">
          <Icon source="Star" size="extraSmall" />
          <Icon source="Star" size="small" />
          <Icon source="Star" size="medium" />
          <Icon source="Star" size="large" />
          <Icon source="Star" size="extraLarge" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Icon Tones</h3>
        <div className="flex items-center gap-4">
          <Icon source="Heart" tone="inherit" />
          <Icon source="Heart" tone="subdued" />
          <Icon source="Heart" tone="critical" />
          <Icon source="Heart" tone="warning" />
          <Icon source="Heart" tone="success" />
          <Icon source="Heart" tone="primary" />
          <Icon source="Heart" tone="info" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Using Custom Components</h3>
        <div className="flex items-center gap-4">
          <Icon source={User} size="medium" tone="primary" />
          <Icon source={Download} size="medium" tone="success" />
          <Icon source={Trash2} size="medium" tone="critical" />
        </div>
      </div>
    </div>
  ),
}

export const SpinnerExample: Story = {
  name: 'Spinner',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Spinner Sizes</h3>
        <div className="flex items-center gap-4">
          <Spinner size="small" />
          <Spinner size="medium" />
          <Spinner size="large" />
          <Spinner size="extraLarge" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Spinner Colors</h3>
        <div className="flex items-center gap-4">
          <Spinner color="inherit" />
          <Spinner color="primary" />
          <Spinner color="success" />
          <Spinner color="warning" />
          <Spinner color="critical" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">In Button Context</h3>
        <div className="flex gap-4">
          <Button disabled>
            <Spinner size="small" color="white" hasFocusableParent />
            <span className="ml-2">Loading...</span>
          </Button>
          <Button variant="outline" disabled>
            <Spinner size="small" hasFocusableParent />
            <span className="ml-2">Processing...</span>
          </Button>
        </div>
      </div>
    </div>
  ),
}

export const TextExample: Story = {
  name: 'Text',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Heading Variants</h3>
        <div className="space-y-2">
          <Text variant="heading3xl">Heading 3XL</Text>
          <Text variant="heading2xl">Heading 2XL</Text>
          <Text variant="headingXl">Heading XL</Text>
          <Text variant="headingLg">Heading Large</Text>
          <Text variant="headingMd">Heading Medium</Text>
          <Text variant="headingSm">Heading Small</Text>
          <Text variant="headingXs">Heading XS</Text>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Body Variants</h3>
        <div className="space-y-2">
          <Text variant="bodyLg">Body Large - Lorem ipsum dolor sit amet consectetur.</Text>
          <Text variant="bodyMd">Body Medium - Lorem ipsum dolor sit amet consectetur.</Text>
          <Text variant="bodySm">Body Small - Lorem ipsum dolor sit amet consectetur.</Text>
          <Text variant="bodyXs">Body XS - Lorem ipsum dolor sit amet consectetur.</Text>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Text Tones</h3>
        <div className="space-y-2">
          <Text tone="inherit">Inherit tone</Text>
          <Text tone="subdued">Subdued tone</Text>
          <Text tone="critical">Critical tone</Text>
          <Text tone="warning">Warning tone</Text>
          <Text tone="success">Success tone</Text>
          <Text tone="primary">Primary tone</Text>
          <Text tone="info">Info tone</Text>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Text Decorations & Features</h3>
        <div className="space-y-2">
          <Text fontWeight="bold">Bold text</Text>
          <Text textDecorationLine="underline">Underlined text</Text>
          <Text textDecorationLine="lineThrough">Strikethrough text</Text>
          <Text truncate className="w-48">This is a very long text that will be truncated</Text>
          <Text visuallyHidden>This text is visually hidden for screen readers</Text>
        </div>
      </div>
    </div>
  ),
}

export const DataTableExample: Story = {
  name: 'Data Table',
  render: () => {
    const [sortColumn, setSortColumn] = useState(0)
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending')

    const columns = [
      { id: 'name', title: 'Product Name', sortable: true },
      { id: 'sku', title: 'SKU', sortable: true },
      { id: 'inventory', title: 'Inventory', sortable: true, align: 'right' as const },
      { id: 'price', title: 'Price', sortable: true, align: 'right' as const },
      { id: 'status', title: 'Status', align: 'center' as const },
    ]

    const rows = [
      {
        id: '1',
        cells: [
          'Wireless Headphones',
          'WH-001',
          '45',
          '$99.99',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>,
        ],
        onClick: () => console.log('Clicked row 1'),
      },
      {
        id: '2',
        cells: [
          'Bluetooth Speaker',
          'BS-002',
          '12',
          '$79.99',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Low Stock
          </span>,
        ],
        onClick: () => console.log('Clicked row 2'),
      },
      {
        id: '3',
        cells: [
          'USB Cable',
          'UC-003',
          '0',
          '$12.99',
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Out of Stock
          </span>,
        ],
        disabled: true,
      },
    ]

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Product Inventory</h3>
          <DataTable
            columns={columns}
            rows={rows}
            sortable
            sortColumnIndex={sortColumn}
            sortDirection={sortDirection}
            onSort={(columnIndex, direction) => {
              setSortColumn(columnIndex)
              setSortDirection(direction)
              console.log('Sort:', columns[columnIndex].title, direction)
            }}
            stickyHeader
            footerContent={
              <div className="text-sm text-muted-foreground">
                Showing 3 of 150 products
              </div>
            }
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Empty State</h3>
          <DataTable
            columns={columns}
            rows={[]}
            emptyState={
              <div className="py-8">
                <div className="text-center">
                  <h4 className="text-lg font-medium mb-2">No products found</h4>
                  <p className="text-muted-foreground">Add your first product to get started.</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    )
  },
}

export const LinkExample: Story = {
  name: 'Link',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Link Variants</h3>
        <div className="space-y-2">
          <div><Link href="/default">Default link</Link></div>
          <div><Link href="/plain" variant="plain">Plain link</Link></div>
          <div><Link href="/critical" variant="critical">Critical link</Link></div>
          <div><Link href="/monospace" variant="monospace">Monospace link</Link></div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Link Tones</h3>
        <div className="space-y-2">
          <div><Link href="/subdued" tone="subdued">Subdued link</Link></div>
          <div><Link href="/critical" tone="critical">Critical tone link</Link></div>
          <div><Link href="/primary" tone="primary">Primary tone link</Link></div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">External Links</h3>
        <div className="space-y-2">
          <div><Link href="https://example.com" external>External website</Link></div>
          <div><Link href="mailto:hello@example.com">Email link</Link></div>
          <div><Link url="https://github.com/tanqory/mies" external>GitHub Repository</Link></div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Link Options</h3>
        <div className="space-y-2">
          <div><Link href="/monochrome" monochrome>Monochrome link</Link></div>
          <div><Link href="/no-underline" removeUnderline>Link without underline</Link></div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Links in Context</h3>
        <Text variant="bodyMd">
          This is a paragraph with an <Link href="/inline">inline link</Link> and an{' '}
          <Link href="https://example.com" external>external link</Link>. You can also{' '}
          <Link href="/critical" tone="critical">highlight important links</Link> when needed.
        </Text>
      </div>
    </div>
  ),
}