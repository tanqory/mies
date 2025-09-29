import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from '../src/components/ui/alert';
import { AlertTriangle, CheckCircle, Info, XCircle, Terminal, Lightbulb } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a callout for user attention. Used to communicate important information or status updates.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive'],
      description: 'The visual variant of the alert',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default alert with an icon, title, and description.',
      },
    },
  },
};

export const Destructive: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again to continue.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Destructive alert for error messages and critical information.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is a general information alert. Use it for neutral updates.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This is a destructive alert. Use it for errors and warnings.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different alert variants for various types of messages.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Alert>
        <AlertTitle>System Update</AlertTitle>
        <AlertDescription>
          A new system update is available. The update will be automatically
          installed during your next scheduled maintenance window.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Action Required</AlertTitle>
        <AlertDescription>
          Your payment method needs to be updated to continue your subscription.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts without icons for a cleaner appearance.',
      },
    },
  },
};

export const OnlyDescription: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertDescription>
          Unable to connect to server. Please check your internet connection.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple alerts with just a description and icon.',
      },
    },
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Payment Successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed successfully. A receipt has been sent to your email address.
        </AlertDescription>
      </Alert>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Scheduled Maintenance</AlertTitle>
        <AlertDescription>
          Our services will be temporarily unavailable on Sunday, March 15th from 2:00 AM to 4:00 AM EST for scheduled maintenance.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Storage Almost Full</AlertTitle>
        <AlertDescription>
          You've used 95% of your storage space. Consider upgrading your plan or removing some files to avoid service interruption.
        </AlertDescription>
      </Alert>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Pro Tip</AlertTitle>
        <AlertDescription>
          You can use keyboard shortcuts to navigate faster. Press Ctrl+K to open the command palette.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world alert examples for common use cases.',
      },
    },
  },
};

export const LongContent: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Privacy Policy Update</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            We've updated our privacy policy to better protect your data and comply with new regulations.
            The changes include:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-2">
            <li>Enhanced data encryption protocols</li>
            <li>Improved user consent management</li>
            <li>Clearer data retention policies</li>
            <li>New data portability options</li>
          </ul>
          <p>
            These changes will take effect on March 1st, 2024. Please review the full policy
            in your account settings.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with longer content including lists and multiple paragraphs.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>New Feature Available</AlertTitle>
        <AlertDescription>
          <p className="mb-3">
            Try our new AI-powered search feature to find content faster.
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Try Now
            </button>
            <button className="px-3 py-1 text-xs border border-input bg-background hover:bg-accent rounded">
              Maybe Later
            </button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with interactive elements like buttons.',
      },
    },
  },
};