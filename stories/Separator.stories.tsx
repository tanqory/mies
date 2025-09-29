import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../src/components/ui/separator';
import { Button } from '../src/components/ui/button';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Visually or semantically separates content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-xs">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default separator with both horizontal and vertical orientations.',
      },
    },
  },
};

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Section 1</h3>
        <p className="text-sm text-muted-foreground">
          This is the first section of content.
        </p>
      </div>
      <Separator />
      <div className="text-center">
        <h3 className="text-lg font-semibold">Section 2</h3>
        <p className="text-sm text-muted-foreground">
          This is the second section of content.
        </p>
      </div>
      <Separator />
      <div className="text-center">
        <h3 className="text-lg font-semibold">Section 3</h3>
        <p className="text-sm text-muted-foreground">
          This is the third section of content.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal separators dividing content sections.',
      },
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-32 items-center justify-center space-x-4">
      <div className="text-center">
        <h4 className="text-sm font-semibold">Column 1</h4>
        <p className="text-xs text-muted-foreground">Content here</p>
      </div>
      <Separator orientation="vertical" />
      <div className="text-center">
        <h4 className="text-sm font-semibold">Column 2</h4>
        <p className="text-xs text-muted-foreground">Content here</p>
      </div>
      <Separator orientation="vertical" />
      <div className="text-center">
        <h4 className="text-sm font-semibold">Column 3</h4>
        <p className="text-xs text-muted-foreground">Content here</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical separators dividing columns of content.',
      },
    },
  },
};

export const InNavigation: Story = {
  render: () => (
    <nav className="flex items-center space-x-4 text-sm">
      <a href="#" className="hover:text-primary">Home</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="hover:text-primary">About</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="hover:text-primary">Services</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="hover:text-primary">Contact</a>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators used in navigation menus.',
      },
    },
  },
};

export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center space-x-2 p-2 border rounded-md">
      <Button variant="outline" size="sm">Bold</Button>
      <Button variant="outline" size="sm">Italic</Button>
      <Button variant="outline" size="sm">Underline</Button>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="outline" size="sm">Left</Button>
      <Button variant="outline" size="sm">Center</Button>
      <Button variant="outline" size="sm">Right</Button>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="outline" size="sm">Link</Button>
      <Button variant="outline" size="sm">Image</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators used to group related toolbar actions.',
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <div className="border rounded-lg p-6 w-full max-w-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">User Profile</h3>
        <p className="text-sm text-muted-foreground">John Doe</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Email:</span>
          <span className="text-sm text-muted-foreground">john@example.com</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Role:</span>
          <span className="text-sm text-muted-foreground">Administrator</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Status:</span>
          <span className="text-sm text-green-600">Active</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-center space-x-2">
        <Button size="sm">Edit</Button>
        <Button variant="outline" size="sm">Delete</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators used within cards to organize content.',
      },
    },
  },
};

export const BreadcrumbStyle: Story = {
  render: () => (
    <div className="flex items-center space-x-2 text-sm">
      <span>Home</span>
      <Separator orientation="vertical" className="h-4 rotate-12" />
      <span>Products</span>
      <Separator orientation="vertical" className="h-4 rotate-12" />
      <span>Electronics</span>
      <Separator orientation="vertical" className="h-4 rotate-12" />
      <span className="font-semibold">Laptops</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Styled separators for breadcrumb navigation.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Separator</h4>
        <div className="text-center py-2">Content above</div>
        <Separator />
        <div className="text-center py-2">Content below</div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Thick Separator</h4>
        <div className="text-center py-2">Content above</div>
        <Separator className="h-0.5" />
        <div className="text-center py-2">Content below</div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Colored Separator</h4>
        <div className="text-center py-2">Content above</div>
        <Separator className="bg-blue-200" />
        <div className="text-center py-2">Content below</div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Dashed Separator</h4>
        <div className="text-center py-2">Content above</div>
        <Separator className="border-dashed border-t border-border bg-transparent h-0" />
        <div className="text-center py-2">Content below</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various custom styling options for separators.',
      },
    },
  },
};