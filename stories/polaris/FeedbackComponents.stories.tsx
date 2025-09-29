import type { Meta, StoryObj } from '@storybook/react'
import {
  Banner,
  ExceptionList,
  InlineError,
  FooterHelp,
  FooterHelpLink,
} from '../../src/x'
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'

const meta: Meta = {
  title: 'Polaris/Feedback',
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj

export const BannerExample: Story = {
  name: 'Banner',
  render: () => (
    <div className="space-y-4">
      <Banner
        status="success"
        title="Order shipped successfully"
        action={{
          content: 'View tracking',
          onAction: () => console.log('View tracking'),
        }}
        onDismiss={() => console.log('Dismissed')}
      >
        Your order #1234 has been shipped and is on its way to you.
      </Banner>

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
        Your payment method will expire soon. Please update your billing information.
      </Banner>

      <Banner
        status="critical"
        title="Service disruption"
        action={{
          content: 'Contact support',
          onAction: () => console.log('Contact support'),
        }}
      >
        We're experiencing technical difficulties. Some features may be temporarily unavailable.
      </Banner>
    </div>
  ),
}

export const ExceptionListExample: Story = {
  name: 'Exception List',
  render: () => (
    <div className="space-y-6 max-w-lg">
      <div>
        <h3 className="text-lg font-semibold mb-3">Validation Errors</h3>
        <ExceptionList
          items={[
            {
              icon: XCircle,
              description: 'Product title is required and cannot be empty',
              status: 'critical',
            },
            {
              icon: AlertTriangle,
              description: 'Product description should be at least 10 characters long',
              status: 'warning',
            },
            {
              icon: Info,
              description: 'Consider adding product tags to improve discoverability',
              status: 'info',
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Import Results</h3>
        <ExceptionList
          items={[
            {
              icon: CheckCircle,
              description: '45 products imported successfully',
              status: 'success',
            },
            {
              icon: AlertTriangle,
              description: '3 products had missing SKUs and were skipped',
              status: 'warning',
            },
            {
              icon: XCircle,
              description: '2 products failed due to invalid pricing',
              status: 'critical',
            },
          ]}
        />
      </div>
    </div>
  ),
}

export const InlineErrorExample: Story = {
  name: 'Inline Error',
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Email address</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-destructive/50 rounded-md focus:outline-none focus:ring-2 focus:ring-destructive"
          defaultValue="invalid-email"
        />
        <InlineError message="Please enter a valid email address" fieldID="email" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-destructive/50 rounded-md focus:outline-none focus:ring-2 focus:ring-destructive"
          defaultValue="123"
        />
        <InlineError
          message="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
          fieldID="password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone number</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border border-destructive/50 rounded-md focus:outline-none focus:ring-2 focus:ring-destructive"
          defaultValue="123abc"
        />
        <InlineError message="Please enter a valid phone number" fieldID="phone" />
      </div>
    </div>
  ),
}

export const FooterHelpExample: Story = {
  name: 'Footer Help',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Basic Footer Help</h3>
        <FooterHelp>
          Need help getting started? Visit our{' '}
          <FooterHelpLink url="https://help.shopify.com">
            help center
          </FooterHelpLink>{' '}
          for tutorials and guides.
        </FooterHelp>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Multiple Links</h3>
        <FooterHelp>
          Learn more about{' '}
          <FooterHelpLink url="/docs/products">
            product management
          </FooterHelpLink>
          , check our{' '}
          <FooterHelpLink url="/docs/billing">
            billing documentation
          </FooterHelpLink>
          , or{' '}
          <FooterHelpLink url="/contact">
            contact support
          </FooterHelpLink>{' '}
          for personalized assistance.
        </FooterHelp>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">External Resources</h3>
        <FooterHelp>
          Looking for developer resources? Check out the{' '}
          <FooterHelpLink url="https://shopify.dev" external>
            Shopify Developer Documentation
          </FooterHelpLink>{' '}
          or join our{' '}
          <FooterHelpLink url="https://community.shopify.com" external>
            community forums
          </FooterHelpLink>
          .
        </FooterHelp>
      </div>
    </div>
  ),
}