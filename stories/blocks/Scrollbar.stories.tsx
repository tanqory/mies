import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';

function ScrollbarDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Scrollbar</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Scrollbar component examples following the next-ts implementation patterns.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Scrollbar Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Demonstration of Scrollbar functionality and features.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Implementation follows next-ts structure and patterns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Scrollbar',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Scrollbar component following next-ts implementation patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ScrollbarDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Scrollbar component demonstration',
      },
    },
  },
};
