import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';

function MegaMenuDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">MegaMenu</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          MegaMenu component examples following the next-ts implementation patterns.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>MegaMenu Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Demonstration of MegaMenu functionality and features.
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
  title: 'Blocks/MegaMenu',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'MegaMenu component following next-ts implementation patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <MegaMenuDemo />,
  parameters: {
    docs: {
      description: {
        story: 'MegaMenu component demonstration',
      },
    },
  },
};
