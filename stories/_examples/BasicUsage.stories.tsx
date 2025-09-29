import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../src/components/ui/tabs';
import { Badge } from '../../src/components/ui/badge';

const meta: Meta = {
  title: 'Examples/Basic Usage',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Copy-paste ready examples of how to use @tanqory/mies components in your React/Next.js project.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ButtonExample: Story = {
  render: () => <Button>Click me</Button>,
  parameters: {
    docs: {
      description: {
        story: 'Basic button usage',
      },
      source: {
        code: `import { Button } from '@tanqory/mies';

export default function MyComponent() {
  return (
    <Button>Click me</Button>
  );
}`,
      },
    },
  },
};

export const InputExample: Story = {
  render: () => <Input placeholder="Enter your email" type="email" />,
  parameters: {
    docs: {
      description: {
        story: 'Email input field',
      },
      source: {
        code: `import { Input } from '@tanqory/mies';

export default function MyComponent() {
  return (
    <Input placeholder="Enter your email" type="email" />
  );
}`,
      },
    },
  },
};

export const CardExample: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content.</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple card with header and content',
      },
      source: {
        code: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@tanqory/mies';

export default function MyComponent() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content.</p>
      </CardContent>
    </Card>
  );
}`,
      },
    },
  },
};

export const TabsExample: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-80">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p>Content for tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Content for tab 2</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic tabs component',
      },
      source: {
        code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tanqory/mies';

export default function MyComponent() {
  return (
    <Tabs defaultValue="tab1" className="w-80">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p>Content for tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Content for tab 2</p>
      </TabsContent>
    </Tabs>
  );
}`,
      },
    },
  },
};

export const BadgeExample: Story = {
  render: () => (
    <div className="flex gap-2">
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
        story: 'Different badge variants',
      },
      source: {
        code: `import { Badge } from '@tanqory/mies';

export default function MyComponent() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  );
}`,
      },
    },
  },
};