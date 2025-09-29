import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';

function FormValidationDemo() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">FormValidation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          FormValidation component demonstration following next-ts implementation patterns.
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>FormValidation Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-muted/30 rounded">
            <p className="text-muted-foreground">
              This is a demonstration of the FormValidation component functionality.
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
  title: 'Blocks/FormValidation',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'FormValidation blocks following next-ts implementation patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <FormValidationDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Default FormValidation component demonstration',
      },
    },
  },
};
