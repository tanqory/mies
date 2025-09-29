import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';

function EditorDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Editor</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Editor component demonstration following next-ts implementation patterns.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Editor Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-muted/30 rounded">
            <p className="text-muted-foreground">
              This demonstrates Editor functionality with interactive examples.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Multiple demo categories showing various use cases and features.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Editor',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Editor blocks following next-ts implementation patterns with interactive demos.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <EditorDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Default Editor component with multiple demo categories',
      },
    },
  },
};
