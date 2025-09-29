import type { Meta, StoryObj } from '@storybook/react'
import { Notification, NotificationProvider, useNotification } from '../../src/components/x/notification'
import { Button } from '../../src/components/ui/button'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

const meta: Meta<typeof Notification> = {
  title: 'Mies X/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A notification system with toast-style messages based on Polaris Core.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'notice', 'warning', 'success', 'destructive'],
    },
    theme: {
      control: 'select',
      options: ['default', 'light', 'dark'],
    },
    animation: {
      control: 'select',
      options: ['fadeIn', 'fadeOut', 'slideIn', 'slideOut'],
    },
    closable: {
      control: 'boolean',
    },
    autoClose: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Notification Title',
    description: 'This is a default notification message.',
    closable: true,
    showIcon: true,
  },
  render: (args) => (
    <div className="w-96">
      <Notification {...args} />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Notification
        variant="default"
        title="Default Notification"
        description="This is a default notification message."
      />

      <Notification
        variant="notice"
        title="Notice"
        description="This is an informational message."
      />

      <Notification
        variant="warning"
        title="Warning"
        description="This is a warning message that requires attention."
      />

      <Notification
        variant="success"
        title="Success"
        description="Your action has been completed successfully."
      />

      <Notification
        variant="destructive"
        title="Error"
        description="Something went wrong. Please try again."
      />
    </div>
  ),
}

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Notification
        variant="notice"
        title="Update Available"
        description="A new version of the application is available."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Later
            </Button>
            <Button size="sm">
              Update Now
            </Button>
          </div>
        }
      />

      <Notification
        variant="warning"
        title="Storage Almost Full"
        description="You're running out of storage space."
        action={
          <Button variant="outline" size="sm">
            Manage Storage
          </Button>
        }
      />
    </div>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Notification
        title="Custom Info Icon"
        description="Using a custom info icon."
        icon={<Info className="h-4 w-4 text-muted-foreground" />}
      />

      <Notification
        title="Custom Success Icon"
        description="Using a custom success icon."
        icon={<CheckCircle className="h-4 w-4 text-accent" />}
      />

      <Notification
        title="Custom Warning Icon"
        description="Using a custom warning icon."
        icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
      />

      <Notification
        title="Custom Error Icon"
        description="Using a custom error icon."
        icon={<AlertCircle className="h-4 w-4 text-destructive" />}
      />
    </div>
  ),
}

export const WithoutIcons: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Notification
        variant="success"
        title="Success Without Icon"
        description="This notification doesn't show an icon."
        showIcon={false}
      />

      <Notification
        variant="warning"
        title="Warning Without Icon"
        description="Clean notification without visual clutter."
        showIcon={false}
      />
    </div>
  ),
}

export const NotClosable: Story = {
  render: () => (
    <div className="w-96">
      <Notification
        variant="notice"
        title="Important System Message"
        description="This notification cannot be dismissed by the user."
        closable={false}
      />
    </div>
  ),
}

// Provider Example Component
const NotificationExample = () => {
  const { addNotification } = useNotification()

  const showNotification = (variant: any) => {
    addNotification({
      variant,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`,
      description: `This is a ${variant} notification from the provider.`,
      autoClose: true,
      autoCloseDelay: 4000,
    })
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-4">Notification Provider Demo</h3>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => showNotification('default')}>
          Default Toast
        </Button>
        <Button onClick={() => showNotification('notice')}>
          Notice Toast
        </Button>
        <Button onClick={() => showNotification('warning')}>
          Warning Toast
        </Button>
        <Button onClick={() => showNotification('success')}>
          Success Toast
        </Button>
        <Button onClick={() => showNotification('destructive')}>
          Error Toast
        </Button>
      </div>
    </div>
  )
}

export const WithProvider: Story = {
  render: () => (
    <NotificationProvider position="top-right" maxNotifications={3}>
      <NotificationExample />
    </NotificationProvider>
  ),
}

export const AutoClose: Story = {
  args: {
    variant: 'success',
    title: 'Auto Close Notification',
    description: 'This notification will automatically close after 3 seconds.',
    autoClose: true,
    autoCloseDelay: 3000,
  },
  render: (args) => (
    <div className="w-96">
      <Notification {...args} />
    </div>
  ),
}