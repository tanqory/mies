import type { Meta, StoryObj } from '@storybook/react'
import { PopupEnhanced } from '../../src/components/x/popup-enhanced'
import { Button } from '../../src/components/ui/button'
import { Input } from '../../src/components/ui/input'
import { Label } from '../../src/components/ui/label'

const meta: Meta<typeof PopupEnhanced> = {
  title: 'Mies X/PopupEnhanced',
  component: PopupEnhanced,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enhanced popup component with advanced features based on Polaris Core.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PopupEnhanced
      trigger={<Button>Open Popup</Button>}
      title="Default Popup"
      description="This is a basic popup with title and content."
    >
      <p>This is the popup content. You can put any components here.</p>
    </PopupEnhanced>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <PopupEnhanced
        trigger={<Button variant="outline">Default</Button>}
        variant="default"
        title="Default Variant"
      >
        <p>Default popup styling.</p>
      </PopupEnhanced>

      <PopupEnhanced
        trigger={<Button variant="outline">Minimal</Button>}
        variant="minimal"
        title="Minimal Variant"
      >
        <p>Minimal popup without border.</p>
      </PopupEnhanced>

      <PopupEnhanced
        trigger={<Button variant="outline">Bordered</Button>}
        variant="bordered"
        title="Bordered Variant"
      >
        <p>Popup with prominent border.</p>
      </PopupEnhanced>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <PopupEnhanced
        trigger={<Button size="sm">Small</Button>}
        size="sm"
        title="Small Popup"
      >
        <p>This is a small popup.</p>
      </PopupEnhanced>

      <PopupEnhanced
        trigger={<Button>Default</Button>}
        size="default"
        title="Default Popup"
      >
        <p>This is a default sized popup.</p>
      </PopupEnhanced>

      <PopupEnhanced
        trigger={<Button size="lg">Large</Button>}
        size="lg"
        title="Large Popup"
      >
        <p>This is a large popup with more space for content.</p>
      </PopupEnhanced>
    </div>
  ),
}

export const WithForm: Story = {
  render: () => (
    <PopupEnhanced
      trigger={<Button>Edit Profile</Button>}
      title="Edit Profile"
      description="Update your profile information"
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </PopupEnhanced>
  ),
}

export const NotClosable: Story = {
  render: () => (
    <PopupEnhanced
      trigger={<Button>Open Modal</Button>}
      title="Important Notice"
      closable={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <div className="space-y-4">
        <p>This popup cannot be closed by clicking outside or pressing escape.</p>
        <Button className="w-full">I Understand</Button>
      </div>
    </PopupEnhanced>
  ),
}

export const WithArrow: Story = {
  render: () => (
    <PopupEnhanced
      trigger={<Button>Popup with Arrow</Button>}
      title="Popup with Arrow"
      arrow={true}
    >
      <p>This popup has an arrow pointing to the trigger.</p>
    </PopupEnhanced>
  ),
}

export const Positioning: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <PopupEnhanced
        trigger={<Button>Top</Button>}
        title="Top Position"
        side="top"
      >
        <p>Popup positioned above the trigger.</p>
      </PopupEnhanced>

      <PopupEnhanced
        trigger={<Button>Bottom</Button>}
        title="Bottom Position"
        side="bottom"
      >
        <p>Popup positioned below the trigger.</p>
      </PopupEnhanced>

      <PopupEnhanced
        trigger={<Button>Left</Button>}
        title="Left Position"
        side="left"
      >
        <p>Popup positioned to the left of the trigger.</p>
      </PopupEnhanced>

      <PopupEnhanced
        trigger={<Button>Right</Button>}
        title="Right Position"
        side="right"
      >
        <p>Popup positioned to the right of the trigger.</p>
      </PopupEnhanced>
    </div>
  ),
}