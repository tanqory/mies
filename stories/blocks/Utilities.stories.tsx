import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';

function UtilitiesDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Utilities</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Utilities component examples following the next-ts implementation patterns.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Utilities Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Demonstration of Utilities functionality and features.
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
  title: 'Blocks/Utilities',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Utilities component following next-ts implementation patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <UtilitiesDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Utilities component demonstration',
      },
    },
  },
};
