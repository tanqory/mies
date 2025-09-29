import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '../src/components/ui/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An image element with a fallback for representing the user.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default avatar with an image and fallback.',
      },
    },
  },
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://broken-link.jpg" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar showing fallback when image fails to load.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Default" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars in different sizes.',
      },
    },
  },
};

export const CustomFallbacks: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="bg-red-500 text-white">
        <AvatarImage src="https://broken-link.jpg" alt="User 1" />
        <AvatarFallback className="bg-red-500 text-white">JD</AvatarFallback>
      </Avatar>
      <Avatar className="bg-blue-500 text-white">
        <AvatarImage src="https://broken-link.jpg" alt="User 2" />
        <AvatarFallback className="bg-blue-500 text-white">AS</AvatarFallback>
      </Avatar>
      <Avatar className="bg-green-500 text-white">
        <AvatarImage src="https://broken-link.jpg" alt="User 3" />
        <AvatarFallback className="bg-green-500 text-white">MR</AvatarFallback>
      </Avatar>
      <Avatar className="bg-purple-500 text-white">
        <AvatarImage src="https://broken-link.jpg" alt="User 4" />
        <AvatarFallback className="bg-purple-500 text-white">KT</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars with custom colored fallbacks.',
      },
    },
  },
};

export const UserProfiles: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">John Doe</div>
          <div className="text-xs text-muted-foreground">john@example.com</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612c593?w=100&h=100&fit=crop&crop=face" alt="Sarah Wilson" />
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">Sarah Wilson</div>
          <div className="text-xs text-muted-foreground">sarah@example.com</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://broken-link.jpg" alt="Mike Chen" />
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">Mike Chen</div>
          <div className="text-xs text-muted-foreground">mike@example.com</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars used in user profile listings.',
      },
    },
  },
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Team Members (Overlapping)</h4>
        <div className="flex -space-x-2">
          <Avatar className="border-2 border-background">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612c593?w=100&h=100&fit=crop&crop=face" alt="User 2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="User 3" />
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background bg-muted">
            <AvatarFallback>+2</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Contributors (Spaced)</h4>
        <div className="flex gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Contributor 1" />
            <AvatarFallback className="text-xs">C1</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612c593?w=100&h=100&fit=crop&crop=face" alt="Contributor 2" />
            <AvatarFallback className="text-xs">C2</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://broken-link.jpg" alt="Contributor 3" />
            <AvatarFallback className="text-xs">C3</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://broken-link.jpg" alt="Contributor 4" />
            <AvatarFallback className="text-xs">C4</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Groups of avatars in different layouts.',
      },
    },
  },
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Online User" />
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
      </div>

      <div className="relative">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612c593?w=100&h=100&fit=crop&crop=face" alt="Away User" />
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500 border-2 border-background"></div>
      </div>

      <div className="relative">
        <Avatar>
          <AvatarImage src="https://broken-link.jpg" alt="Offline User" />
          <AvatarFallback>OF</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-400 border-2 border-background"></div>
      </div>

      <div className="relative">
        <Avatar>
          <AvatarImage src="https://broken-link.jpg" alt="Do Not Disturb" />
          <AvatarFallback>DN</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-background"></div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars with status indicators.',
      },
    },
  },
};

export const IconFallbacks: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://broken-link.jpg" alt="User" />
        <AvatarFallback>👤</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://broken-link.jpg" alt="Admin" />
        <AvatarFallback>👑</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://broken-link.jpg" alt="Bot" />
        <AvatarFallback>🤖</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://broken-link.jpg" alt="Team" />
        <AvatarFallback>👥</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars with emoji and icon fallbacks.',
      },
    },
  },
};