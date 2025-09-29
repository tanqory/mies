import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/components/ui/switch';
import { Label } from '../src/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A control that allows the user to toggle between checked and not checked.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The controlled state of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default switch component.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch with an associated label.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="switch-off" checked={false} />
        <Label htmlFor="switch-off">Off</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="switch-on" checked={true} />
        <Label htmlFor="switch-on">On</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="switch-disabled-off" disabled checked={false} />
        <Label htmlFor="switch-disabled-off">Disabled Off</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="switch-disabled-on" disabled checked={true} />
        <Label htmlFor="switch-disabled-on">Disabled On</Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states of the switch component.',
      },
    },
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notifications" className="text-base">
              Push Notifications
            </Label>
            <div className="text-sm text-muted-foreground">
              Receive notifications on your device
            </div>
          </div>
          <Switch id="push-notifications" />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications" className="text-base">
              Email Notifications
            </Label>
            <div className="text-sm text-muted-foreground">
              Receive notifications via email
            </div>
          </div>
          <Switch id="email-notifications" checked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sms-notifications" className="text-base">
              SMS Notifications
            </Label>
            <div className="text-sm text-muted-foreground">
              Receive notifications via SMS
            </div>
          </div>
          <Switch id="sms-notifications" />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="marketing" className="text-base">
              Marketing Communications
            </Label>
            <div className="text-sm text-muted-foreground">
              Receive marketing emails and updates
            </div>
          </div>
          <Switch id="marketing" />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switches used in a settings panel with descriptions.',
      },
    },
  },
};

export const PrivacySettings: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Profile Visibility</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="public-profile" className="text-sm">
                Public Profile
              </Label>
              <Switch id="public-profile" checked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-email" className="text-sm">
                Show Email Address
              </Label>
              <Switch id="show-email" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-phone" className="text-sm">
                Show Phone Number
              </Label>
              <Switch id="show-phone" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-activity" className="text-sm">
                Show Activity Status
              </Label>
              <Switch id="show-activity" checked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-last-seen" className="text-sm">
                Show Last Seen
              </Label>
              <Switch id="show-last-seen" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Data Collection</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics" className="text-sm">
                Analytics & Performance
              </Label>
              <Switch id="analytics" checked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="personalization" className="text-sm">
                Personalization
              </Label>
              <Switch id="personalization" checked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex privacy settings with grouped switches.',
      },
    },
  },
};

export const FeatureToggles: Story = {
  render: () => (
    <div className="space-y-6 w-[350px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Beta Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-dashboard" className="text-sm font-medium">
                New Dashboard
              </Label>
              <div className="text-xs text-muted-foreground">
                Try our redesigned dashboard
              </div>
            </div>
            <Switch id="new-dashboard" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-assistant" className="text-sm font-medium">
                AI Assistant
              </Label>
              <div className="text-xs text-muted-foreground">
                Enable AI-powered suggestions
              </div>
            </div>
            <Switch id="ai-assistant" checked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode-beta" className="text-sm font-medium">
                Enhanced Dark Mode
              </Label>
              <div className="text-xs text-muted-foreground">
                Improved dark theme experience
              </div>
            </div>
            <Switch id="dark-mode-beta" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="text-sm">
              High Contrast Mode
            </Label>
            <Switch id="high-contrast" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="large-text" className="text-sm">
              Large Text
            </Label>
            <Switch id="large-text" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="reduce-motion" className="text-sm">
              Reduce Motion
            </Label>
            <Switch id="reduce-motion" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="screen-reader" className="text-sm">
              Screen Reader Support
            </Label>
            <Switch id="screen-reader" checked />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Feature toggles and accessibility settings using switches.',
      },
    },
  },
};