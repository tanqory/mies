import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../src/components/ui/label';
import { Input } from '../src/components/ui/input';
import { Textarea } from '../src/components/ui/textarea';
import { Checkbox } from '../src/components/ui/checkbox';
import { Switch } from '../src/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../src/components/ui/radio-group';
import { Asterisk, HelpCircle } from 'lucide-react';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A caption or title for a form control that enhances accessibility by providing a clear relationship between the label and the form field.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'The id of the form element this label is associated with',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic label associated with an input field.',
      },
    },
  },
};

export const Required: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="required-email" className="flex items-center gap-1">
          Email
          <Asterisk className="h-3 w-3 text-destructive" />
        </Label>
        <Input type="email" id="required-email" placeholder="Enter your email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="required-name">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input id="required-name" placeholder="Enter your full name" required />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels indicating required fields with asterisks.',
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-base font-medium">
          Username
        </Label>
        <Input id="username" placeholder="johndoe" />
        <p className="text-sm text-muted-foreground">
          This will be your unique identifier on the platform.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-base font-medium">
          Bio
        </Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself..."
          rows={3}
        />
        <p className="text-sm text-muted-foreground">
          Brief description for your profile. Maximum 160 characters.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels with descriptive text for better user guidance.',
      },
    },
  },
};

export const WithHelperIcon: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2">
          Password
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters with uppercase, lowercase, and numbers.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="api-key" className="flex items-center gap-2">
          API Key
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
        </Label>
        <Input
          id="api-key"
          placeholder="sk-..."
          type="password"
        />
        <p className="text-xs text-muted-foreground">
          You can find this in your account settings under API section.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels with helper icons for additional context.',
      },
    },
  },
};

export const FormControls: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="checkbox-terms" className="text-base font-medium">
          Agreement
        </Label>
        <div className="flex items-center space-x-2">
          <Checkbox id="checkbox-terms" />
          <Label
            htmlFor="checkbox-terms"
            className="text-sm font-normal cursor-pointer"
          >
            I agree to the terms and conditions
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-medium">
          Notification Preferences
        </Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-sm font-normal">
              Email notifications
            </Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="text-sm font-normal">
              Push notifications
            </Label>
            <Switch id="push-notifications" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">
          Account Type
        </Label>
        <RadioGroup defaultValue="personal">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="personal" id="personal" />
            <Label htmlFor="personal" className="text-sm font-normal cursor-pointer">
              Personal
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business" className="text-sm font-normal cursor-pointer">
              Business
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enterprise" id="enterprise" />
            <Label htmlFor="enterprise" className="text-sm font-normal cursor-pointer">
              Enterprise
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels used with various form controls like checkboxes, switches, and radio buttons.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="small-input" className="text-xs font-medium">
          Small Label (text-xs)
        </Label>
        <Input id="small-input" placeholder="Small input" className="h-8 text-xs" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="default-input" className="text-sm font-medium">
          Default Label (text-sm)
        </Label>
        <Input id="default-input" placeholder="Default input" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="large-input" className="text-base font-medium">
          Large Label (text-base)
        </Label>
        <Input id="large-input" placeholder="Large input" className="h-11" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="xl-input" className="text-lg font-medium">
          Extra Large Label (text-lg)
        </Label>
        <Input id="xl-input" placeholder="Extra large input" className="h-12 text-base" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels in different sizes to match form control sizing.',
      },
    },
  },
};

export const ContactForm: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="text-muted-foreground">We'd love to hear from you</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input id="first-name" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input id="last-name" placeholder="Doe" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email-contact">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            type="email"
            id="email-contact"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">
            Company
          </Label>
          <Input id="company" placeholder="Acme Inc." />
          <p className="text-xs text-muted-foreground">Optional</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="How can we help you?"
            rows={4}
            required
          />
          <p className="text-xs text-muted-foreground">
            Please provide as much detail as possible
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="newsletter" />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="newsletter"
              className="text-sm font-normal cursor-pointer"
            >
              Subscribe to our newsletter
            </Label>
            <p className="text-xs text-muted-foreground">
              Get updates about new features and releases
            </p>
          </div>
        </div>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete contact form showcasing various label patterns and form fields.',
      },
    },
  },
};