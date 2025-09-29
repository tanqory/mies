import type { Meta, StoryObj } from '@storybook/react'
import { ActionList, AccountConnection } from '../../src/x'
import { User, FileText, Edit, Download, Trash2, Settings } from 'lucide-react'

const meta: Meta = {
  title: 'Polaris/Actions',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const ActionListExample: Story = {
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
                content: 'Go to settings',
                icon: Settings,
                onAction: () => console.log('Settings'),
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

export const AccountConnectionExample: Story = {
  name: 'Account Connection',
  render: () => (
    <div className="max-w-lg space-y-4">
      <AccountConnection
        title="Google Account"
        accountName="john.doe@gmail.com"
        avatar={{
          source: "https://via.placeholder.com/48",
          initials: "JD"
        }}
        connected={true}
        action={{
          content: "Disconnect",
          destructive: true,
          onAction: () => console.log('Disconnect'),
        }}
        details="Connected and syncing your data"
      />

      <AccountConnection
        title="Facebook Business"
        avatar={{
          initials: "FB"
        }}
        connected={false}
        action={{
          content: "Connect account",
          onAction: () => console.log('Connect'),
        }}
        details="Connect to sync your business data"
        termsOfService={
          <span>
            By connecting, you agree to the{' '}
            <a href="#" className="text-primary underline">Terms of Service</a>
          </span>
        }
      />
    </div>
  ),
}