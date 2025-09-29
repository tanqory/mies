'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
} from '@tanqory/mies';
import { PageLayout } from '../../../../components/navigation';
import { Palette, Zap, Smartphone } from 'lucide-react';

export default function SelectPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Select</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The Select component from @tanqory/mies library.
              This page demonstrates the usage and features of the Select component.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              @tanqory/mies
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              React Component
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              TypeScript
            </Badge>
          </div>
        </div>

        {/* Component Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Component Overview</h2>
              <p className="text-muted-foreground">
                The Select component is part of the @tanqory/mies component library.
                It provides a modern, accessible, and customizable implementation that follows
                design system best practices.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary"><Palette className="h-4 w-4" /></div>
                  <div className="text-sm text-muted-foreground">Customizable</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">♿</div>
                  <div className="text-sm text-muted-foreground">Accessible</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary"><Smartphone className="h-6 w-6" /></div>
                  <div className="text-sm text-muted-foreground">Responsive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary"><Zap className="h-4 w-4" /></div>
                  <div className="text-sm text-muted-foreground">Performance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Usage</h3>
              <div className="border rounded-lg p-4 bg-muted/20">
                <p className="text-center text-muted-foreground">
                  Select component examples will be shown here.
                  This page demonstrates the component structure and can be customized
                  with specific examples for the Select component.
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`// Basic usage
import { Select } from '@tanqory/mies';

function Example() {
  return <Select />;
}`}</code></pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* API Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">API Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select</h3>
              <p className="text-muted-foreground">
                Detailed API documentation for the Select component will be available here.
                This includes props, methods, and usage patterns.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Usage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-600">✅ Do</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Follow component design patterns</li>
                  <li>• Use appropriate props for customization</li>
                  <li>• Test across different screen sizes</li>
                  <li>• Follow accessibility guidelines</li>
                  <li>• Use consistent styling with other components</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Override internal component styles</li>
                  <li>• Use deprecated props or methods</li>
                  <li>• Ignore responsive design considerations</li>
                  <li>• Bypass accessibility features</li>
                  <li>• Use inappropriate component variants</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}