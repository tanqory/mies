import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';

// Animation categories matching next-ts implementation
function InViewDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">In View</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <div className="h-24 bg-primary/10 rounded flex items-center justify-center">
              Fade In
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <div className="h-24 bg-secondary/10 rounded flex items-center justify-center">
              Slide Up
            </div>
          </CardContent>
        </Card>
        <Card className="animate-zoom-in">
          <CardContent className="p-6">
            <div className="h-24 bg-accent/10 rounded flex items-center justify-center">
              Zoom In
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ScrollDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Scroll</h3>
      <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-4">
        {Array.from({ length: 10 }, (_, i) => (
          <Card key={i} className="animate-slide-in-left">
            <CardContent className="p-4">
              <p>Scroll animation item {i + 1}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DialogDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dialog</h3>
      <Button onClick={() => setIsOpen(!isOpen)}>
        Toggle Dialog Animation
      </Button>
      {isOpen && (
        <Card className="animate-scale-in border-primary">
          <CardHeader>
            <CardTitle>Animated Dialog</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This dialog appears with scale animation</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function BackgroundDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Background</h3>
      <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg animate-gradient-x flex items-center justify-center">
        <Badge variant="secondary">Animated Background</Badge>
      </div>
    </div>
  );
}

function OtherDemo() {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Other</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary animate-pulse">
              {counter}
            </div>
            <p className="text-sm text-muted-foreground">Counter</p>
          </CardContent>
        </Card>
        <Card className="animate-bounce">
          <CardContent className="p-6 text-center">
            <div className="w-8 h-8 bg-primary rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Bounce</p>
          </CardContent>
        </Card>
        <Card className="animate-spin">
          <CardContent className="p-6 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Spin</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Animate',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Animation components with various effects and triggers, matching the next-ts implementation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const InView: Story = {
  render: () => <InViewDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Animations triggered when elements come into view',
      },
    },
  },
};

export const Scroll: Story = {
  render: () => <ScrollDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Scroll-based animations for content',
      },
    },
  },
};

export const Dialog: Story = {
  render: () => <DialogDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Dialog and modal animations',
      },
    },
  },
};

export const Background: Story = {
  render: () => <BackgroundDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Background and gradient animations',
      },
    },
  },
};

export const Other: Story = {
  render: () => <OtherDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Other animation effects including counters and loading states',
      },
    },
  },
};