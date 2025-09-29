import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/ui/badge';
import { Check, X, AlertTriangle, Info, Star, Zap } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile badge component for displaying short labels, statuses, or categories.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline', 'success'],
      description: 'Badge visual variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the badge component.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <Check className="mr-1 h-3 w-3" />
        Completed
      </Badge>
      <Badge variant="destructive">
        <X className="mr-1 h-3 w-3" />
        Failed
      </Badge>
      <Badge variant="secondary">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Warning
      </Badge>
      <Badge variant="outline">
        <Info className="mr-1 h-3 w-3" />
        Info
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with icons for better visual communication.',
      },
    },
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Inactive</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge>Published</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status badges commonly used in applications.',
      },
    },
  },
};

export const CategoryBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">React</Badge>
      <Badge variant="outline">TypeScript</Badge>
      <Badge variant="outline">JavaScript</Badge>
      <Badge variant="outline">CSS</Badge>
      <Badge variant="outline">HTML</Badge>
      <Badge variant="outline">Node.js</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Category or tag badges for labeling content.',
      },
    },
  },
};

export const PriorityBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">High Priority</Badge>
      <Badge variant="secondary">Medium Priority</Badge>
      <Badge variant="outline">Low Priority</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Priority-based badges for task management.',
      },
    },
  },
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="relative inline-block">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
          3
        </Badge>
      </div>
      <div className="relative inline-block">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
          99+
        </Badge>
      </div>
      <div className="relative inline-block">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <Badge variant="success" className="absolute -top-1 -right-1 h-2 w-2 rounded-full p-0" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Notification badges positioned over other elements.',
      },
    },
  },
};

export const InteractiveBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="cursor-pointer hover:bg-primary/80 transition-colors">
        Clickable
      </Badge>
      <Badge variant="outline" className="cursor-pointer hover:bg-accent transition-colors">
        Interactive
      </Badge>
      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors">
        <Star className="mr-1 h-3 w-3" />
        Favorite
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges with hover effects.',
      },
    },
  },
};

export const SizesDemo: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="text-xs px-1.5 py-0.5">Small</Badge>
      <Badge>Default</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of badges by adjusting padding and font size.',
      },
    },
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-500 hover:bg-blue-600">Blue</Badge>
      <Badge className="bg-purple-500 hover:bg-purple-600">Purple</Badge>
      <Badge className="bg-pink-500 hover:bg-pink-600">Pink</Badge>
      <Badge className="bg-orange-500 hover:bg-orange-600">Orange</Badge>
      <Badge className="bg-teal-500 hover:bg-teal-600">Teal</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom colored badges using Tailwind color classes.',
      },
    },
  },
};

export const WithContent: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Project Alpha</h3>
        <Badge variant="success">
          <Zap className="mr-1 h-3 w-3" />
          Active
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Feature Request</h3>
        <Badge variant="secondary">Enhancement</Badge>
        <Badge variant="outline">v2.1</Badge>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Bug Report</h3>
        <Badge variant="destructive">Critical</Badge>
        <Badge variant="outline">Needs Review</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges used alongside content for additional context.',
      },
    },
  },
};