import type { Meta, StoryObj } from '@storybook/react'
import { Chips } from '../../src/components/x/chips'
import { useState } from 'react'

const meta: Meta<typeof Chips> = {
  title: 'Mies X/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tag input component with add/remove functionality based on Polaris Core.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    allowDuplicates: {
      control: 'boolean',
    },
    maxChips: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story with controlled state
export const Default: Story = {
  render: (args) => {
    const [chips, setChips] = useState([
      { id: '1', label: 'React', value: 'react' },
      { id: '2', label: 'TypeScript', value: 'typescript' },
    ])

    return (
      <div className="w-80">
        <Chips
          {...args}
          chips={chips}
          onChipsChange={setChips}
          placeholder="Add a tag..."
        />
      </div>
    )
  },
}

export const Empty: Story = {
  render: (args) => {
    const [chips, setChips] = useState([])

    return (
      <div className="w-80">
        <Chips
          {...args}
          chips={chips}
          onChipsChange={setChips}
          placeholder="Start typing to add tags..."
        />
      </div>
    )
  },
}

export const WithMaxLimit: Story = {
  render: (args) => {
    const [chips, setChips] = useState([
      { id: '1', label: 'React', value: 'react' },
      { id: '2', label: 'Vue', value: 'vue' },
    ])

    return (
      <div className="w-80">
        <Chips
          {...args}
          chips={chips}
          onChipsChange={setChips}
          maxChips={3}
          placeholder="Max 3 tags allowed"
        />
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'Default', value: 'default' },
      { id: '2', label: 'Variant', value: 'variant' },
    ])

    return (
      <div className="space-y-4 w-80">
        <div>
          <label className="text-sm font-medium mb-2 block">Default</label>
          <Chips
            chips={chips}
            onChipsChange={setChips}
            variant="default"
            placeholder="Default variant"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Secondary</label>
          <Chips
            chips={chips}
            onChipsChange={setChips}
            variant="secondary"
            placeholder="Secondary variant"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Outline</label>
          <Chips
            chips={chips}
            onChipsChange={setChips}
            variant="outline"
            placeholder="Outline variant"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Destructive</label>
          <Chips
            chips={chips}
            onChipsChange={setChips}
            variant="destructive"
            placeholder="Destructive variant"
          />
        </div>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'Sample', value: 'sample' },
      { id: '2', label: 'Tag', value: 'tag' },
    ])

    return (
      <div className="space-y-4 w-80">
        <div>
          <label className="text-sm font-medium mb-2 block">Small</label>
          <Chips
            chips={chips}
            onChipsChange={setChips}
            size="sm"
            placeholder="Small size"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Default</label>
          <Chips
            chips={chips}
            onChipsChange={setChips}
            size="default"
            placeholder="Default size"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Large</label>
          <Chips
            chips={chips}
            onChipsChange={setChips}
            size="lg"
            placeholder="Large size"
          />
        </div>
      </div>
    )
  },
}

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => {
    const chips = [
      { id: '1', label: 'Read Only', value: 'readonly' },
      { id: '2', label: 'Cannot Edit', value: 'noedit' },
      { id: '3', label: 'View Only', value: 'viewonly' },
    ]

    return (
      <div className="w-80">
        <Chips
          {...args}
          chips={chips}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [chips, setChips] = useState([
      { id: '1', label: 'Disabled', value: 'disabled' },
      { id: '2', label: 'State', value: 'state' },
    ])

    return (
      <div className="w-80">
        <Chips
          {...args}
          chips={chips}
          onChipsChange={setChips}
          placeholder="Disabled input"
        />
      </div>
    )
  },
}