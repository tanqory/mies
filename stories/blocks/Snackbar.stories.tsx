import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';

function SnackbarDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Snackbar</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Snackbar component examples following the next-ts implementation patterns.
        </p>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Snackbar Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Demonstration of Snackbar functionality and features.
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
  title: 'Blocks/Snackbar',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Snackbar component following next-ts implementation patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <SnackbarDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Snackbar component demonstration',
      },
    },
  },
};
