import type { Meta, StoryObj } from '@storybook/react'
import { RangeEnhanced } from '../../src/components/x/range-enhanced'
import { useState } from 'react'

const meta: Meta<typeof RangeEnhanced> = {
  title: 'Mies X/RangeEnhanced',
  component: RangeEnhanced,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enhanced range slider with progress visualization based on Polaris Core.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
    },
    showProgress: {
      control: 'boolean',
    },
    showValue: {
      control: 'boolean',
    },
    showMinMax: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState([50])

    return (
      <div className="w-80">
        <RangeEnhanced
          {...args}
          value={value}
          onValueChange={setValue}
          label="Volume"
          min={0}
          max={100}
          step={1}
        />
      </div>
    )
  },
}

export const WithAllFeatures: Story = {
  render: (args) => {
    const [value, setValue] = useState([25])

    return (
      <div className="w-80">
        <RangeEnhanced
          {...args}
          value={value}
          onValueChange={setValue}
          label="Progress"
          description="Drag to adjust the value"
          showProgress={true}
          showValue={true}
          showMinMax={true}
          min={0}
          max={100}
          step={5}
          formatValue={(val) => `${val}%`}
        />
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState([50])

    return (
      <div className="space-y-8 w-80">
        <RangeEnhanced
          value={value}
          onValueChange={setValue}
          size="xs"
          label="Extra Small"
          showValue
        />

        <RangeEnhanced
          value={value}
          onValueChange={setValue}
          size="sm"
          label="Small"
          showValue
        />

        <RangeEnhanced
          value={value}
          onValueChange={setValue}
          size="default"
          label="Default"
          showValue
        />

        <RangeEnhanced
          value={value}
          onValueChange={setValue}
          size="lg"
          label="Large"
          showValue
        />

        <RangeEnhanced
          value={value}
          onValueChange={setValue}
          size="xl"
          label="Extra Large"
          showValue
        />
      </div>
    )
  },
}

export const CustomColors: Story = {
  render: (args) => {
    const [value, setValue] = useState([30])

    return (
      <div className="space-y-6 w-80">
        <RangeEnhanced
          {...args}
          value={value}
          onValueChange={setValue}
          label="Red Theme"
          showProgress
          showValue
          progressColor="#ef4444"
          thumbColor="#dc2626"
        />

        <RangeEnhanced
          {...args}
          value={value}
          onValueChange={setValue}
          label="Green Theme"
          showProgress
          showValue
          progressColor="#22c55e"
          thumbColor="#16a34a"
        />

        <RangeEnhanced
          {...args}
          value={value}
          onValueChange={setValue}
          label="Purple Theme"
          showProgress
          showValue
          progressColor="#a855f7"
          thumbColor="#9333ea"
        />
      </div>
    )
  },
}

export const PriceRange: Story = {
  render: (args) => {
    const [value, setValue] = useState([250])

    return (
      <div className="w-80">
        <RangeEnhanced
          {...args}
          value={value}
          onValueChange={setValue}
          label="Price Range"
          description="Select your budget"
          min={0}
          max={1000}
          step={10}
          showProgress
          showValue
          showMinMax
          formatValue={(val) => `$${val}`}
        />
      </div>
    )
  },
}

export const VolumeControl: Story = {
  render: (args) => {
    const [value, setValue] = useState([75])

    return (
      <div className="w-60">
        <RangeEnhanced
          {...args}
          value={value}
          onValueChange={setValue}
          label="🔊 Volume"
          min={0}
          max={100}
          step={1}
          showProgress
          showValue
          formatValue={(val) => `${val}%`}
          size="lg"
        />
      </div>
    )
  },
}

export const WithoutProgress: Story = {
  render: (args) => {
    const [value, setValue] = useState([40])

    return (
      <div className="w-80">
        <RangeEnhanced
          {...args}
          value={value}
          onValueChange={setValue}
          label="No Progress Bar"
          showProgress={false}
          showValue
          showMinMax
          min={0}
          max={100}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: (args) => {
    return (
      <div className="w-80">
        <RangeEnhanced
          {...args}
          value={[60]}
          label="Disabled Range"
          showProgress
          showValue
          showMinMax
          disabled
          min={0}
          max={100}
        />
      </div>
    )
  },
}