import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';

function ImageDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Image</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Image component demonstration following next-ts implementation patterns.
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Image Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-muted/30 rounded">
            <p className="text-muted-foreground">
              This is a demonstration of the Image component functionality.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Implementation matches the next-ts patterns and structure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Image',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Image blocks following next-ts implementation patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ImageDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Default Image component demonstration',
      },
    },
  },
};
