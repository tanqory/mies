import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';

function MapDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Map</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Map component examples following the next-ts implementation patterns.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Map Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Demonstration of Map functionality and features.
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
  title: 'Blocks/Map',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Map component following next-ts implementation patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <MapDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Map component demonstration',
      },
    },
  },
};
