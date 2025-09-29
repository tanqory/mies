import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/ui/input';
import { Label } from '../src/components/ui/label';
import { Button } from '../src/components/ui/button';
import { Eye, EyeOff, Search, User, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component for forms with various types and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel'],
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Text input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="123" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input id="search" type="search" placeholder="Search..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types for various use cases.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Label>Default</Label>
        <Input placeholder="Default state" />
      </div>
      <div className="space-y-2">
        <Label>Focused</Label>
        <Input placeholder="Click to focus" autoFocus />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Input placeholder="Disabled input" disabled />
      </div>
      <div className="space-y-2">
        <Label>With Value</Label>
        <Input defaultValue="This input has a value" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states of the input component.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Label>Search with Icon</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Username</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Username" className="pl-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="email" placeholder="Email" className="pl-10" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input components with icons for better visual communication.',
      },
    },
  },
};

export const PasswordToggle: Story = {
  render: function PasswordToggleInput() {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="password-toggle">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password-toggle"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Password input with toggle visibility functionality.',
      },
    },
  },
};

export const Controlled: Story = {
  render: function ControlledInput() {
    const [value, setValue] = useState('');

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="controlled">Controlled Input</Label>
          <Input
            id="controlled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Current value: "{value}"
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled input component with state management.',
      },
    },
  },
};

export const Validation: Story = {
  render: function ValidationInput() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        setError('Email is required');
      } else if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }
    };

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="validation-email">Email Validation</Label>
        <Input
          id="validation-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (e.target.value) validateEmail(e.target.value);
          }}
          onBlur={() => validateEmail(email)}
          placeholder="Enter your email"
          className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with validation and error states.',
      },
    },
  },
};