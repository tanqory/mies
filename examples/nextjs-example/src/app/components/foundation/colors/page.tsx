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

const ColorPalette = ({ title, colors }: { title: string; colors: { name: string; class: string; hex: string; description?: string }[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="space-y-2">
            <div
              className={`h-20 w-full rounded-lg border ${color.class}`}
              style={{ backgroundColor: color.hex }}
            />
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{color.name}</span>
                <Badge variant="outline" className="text-xs">
                  {color.hex}
                </Badge>
              </div>
              <code className="text-xs text-muted-foreground block">
                {color.class}
              </code>
              {color.description && (
                <p className="text-xs text-muted-foreground">
                  {color.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function ColorsPage() {
  const primaryColors = [
    { name: 'Primary', class: 'bg-primary', hex: 'hsl(222.2 84% 4.9%)', description: 'Main brand color for primary actions' },
    { name: 'Primary Foreground', class: 'bg-primary-foreground', hex: 'hsl(210 40% 98%)', description: 'Text on primary background' },
  ];

  const secondaryColors = [
    { name: 'Secondary', class: 'bg-secondary', hex: 'hsl(210 40% 96%)', description: 'Secondary background color' },
    { name: 'Secondary Foreground', class: 'bg-secondary-foreground', hex: 'hsl(222.2 84% 4.9%)', description: 'Text on secondary background' },
  ];

  const accentColors = [
    { name: 'Accent', class: 'bg-accent', hex: 'hsl(210 40% 96%)', description: 'Accent background for highlights' },
    { name: 'Accent Foreground', class: 'bg-accent-foreground', hex: 'hsl(222.2 84% 4.9%)', description: 'Text on accent background' },
  ];

  const neutralColors = [
    { name: 'Background', class: 'bg-background', hex: 'hsl(0 0% 100%)', description: 'Main page background' },
    { name: 'Foreground', class: 'bg-foreground', hex: 'hsl(222.2 84% 4.9%)', description: 'Main text color' },
    { name: 'Muted', class: 'bg-muted', hex: 'hsl(210 40% 96%)', description: 'Muted backgrounds' },
    { name: 'Muted Foreground', class: 'bg-muted-foreground', hex: 'hsl(215.4 16.3% 46.9%)', description: 'Muted text color' },
    { name: 'Card', class: 'bg-card', hex: 'hsl(0 0% 100%)', description: 'Card backgrounds' },
    { name: 'Card Foreground', class: 'bg-card-foreground', hex: 'hsl(222.2 84% 4.9%)', description: 'Text on cards' },
    { name: 'Popover', class: 'bg-popover', hex: 'hsl(0 0% 100%)', description: 'Popover backgrounds' },
    { name: 'Popover Foreground', class: 'bg-popover-foreground', hex: 'hsl(222.2 84% 4.9%)', description: 'Text in popovers' },
  ];

  const borderColors = [
    { name: 'Border', class: 'border-border bg-border', hex: 'hsl(214.3 31.8% 91.4%)', description: 'Default border color' },
    { name: 'Input', class: 'border-input bg-input', hex: 'hsl(214.3 31.8% 91.4%)', description: 'Input field borders' },
    { name: 'Ring', class: 'ring-ring bg-ring', hex: 'hsl(222.2 84% 4.9%)', description: 'Focus ring color' },
  ];

  const statusColors = [
    { name: 'Destructive', class: 'bg-destructive', hex: 'hsl(0 84.2% 60.2%)', description: 'Error and destructive actions' },
    { name: 'Destructive Foreground', class: 'bg-destructive-foreground', hex: 'hsl(210 40% 98%)', description: 'Text on destructive background' },
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Colors</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive color system built on CSS custom properties and Tailwind CSS,
              providing consistent theming and dark mode support.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              CSS Variables
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Dark Mode Ready
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Tailwind Integration
            </Badge>
          </div>
        </div>

        {/* Color System Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Color System Overview</h2>
              <p className="text-muted-foreground">
                Our color system is built on CSS custom properties (CSS variables) that automatically
                adapt to light and dark themes. Each color has semantic meaning and specific use cases
                to ensure consistency across your application.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24+</div>
                  <div className="text-sm text-muted-foreground">Semantic Colors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-sm text-muted-foreground">Theme Modes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">WCAG</div>
                  <div className="text-sm text-muted-foreground">AA Compliant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">HSL</div>
                  <div className="text-sm text-muted-foreground">Color Format</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palettes */}
        <div className="space-y-8">
          <ColorPalette title="Primary Colors" colors={primaryColors} />
          <ColorPalette title="Secondary Colors" colors={secondaryColors} />
          <ColorPalette title="Accent Colors" colors={accentColors} />
          <ColorPalette title="Neutral Colors" colors={neutralColors} />
          <ColorPalette title="Border Colors" colors={borderColors} />
          <ColorPalette title="Status Colors" colors={statusColors} />
        </div>

        <Separator />

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Usage Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">CSS Custom Properties</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}`}</code></pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tailwind Classes</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`<div className="bg-primary text-primary-foreground">
  Primary button
</div>

<div className="bg-secondary text-secondary-foreground">
  Secondary content
</div>

<div className="border border-border bg-card">
  Card with border
</div>`}</code></pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Component Integration</h3>
              <div className="space-y-2">
                <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                  Primary background with appropriate foreground text
                </div>
                <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
                  Secondary background with appropriate foreground text
                </div>
                <div className="p-4 bg-muted text-muted-foreground rounded-lg">
                  Muted background with muted foreground text
                </div>
                <div className="p-4 border border-border bg-card text-card-foreground rounded-lg">
                  Card background with border and appropriate text color
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-600">✅ Do</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use semantic color names (primary, secondary, etc.)</li>
                  <li>• Always pair background and foreground colors</li>
                  <li>• Test in both light and dark modes</li>
                  <li>• Use muted colors for secondary information</li>
                  <li>• Follow WCAG accessibility guidelines</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use hard-coded hex colors in components</li>
                  <li>• Mix semantic and non-semantic color usage</li>
                  <li>• Override CSS variables without testing themes</li>
                  <li>• Use colors that don't meet contrast requirements</li>
                  <li>• Create one-off custom colors without purpose</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}