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

const ShadowExample = ({
  name,
  className,
  description,
  cssValue
}: {
  name: string;
  className: string;
  description: string;
  cssValue: string;
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <Badge variant="outline" className="text-xs">{className}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="p-8 bg-muted/20 rounded-lg flex justify-center">
      <div className={`bg-white w-32 h-24 rounded-lg ${className} flex items-center justify-center`}>
        <span className="text-sm font-medium text-gray-600">{name}</span>
      </div>
    </div>
    <div className="bg-muted p-3 rounded text-xs font-mono text-muted-foreground">
      {cssValue}
    </div>
  </div>
);

export default function ShadowsPage() {
  const shadowExamples = [
    {
      name: "No Shadow",
      className: "shadow-none",
      description: "No shadow effect",
      cssValue: "box-shadow: none;"
    },
    {
      name: "Small Shadow",
      className: "shadow-sm",
      description: "Subtle shadow for slight elevation",
      cssValue: "box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);"
    },
    {
      name: "Default Shadow",
      className: "shadow",
      description: "Standard shadow for components",
      cssValue: "box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);"
    },
    {
      name: "Medium Shadow",
      className: "shadow-md",
      description: "Medium elevation for cards and modals",
      cssValue: "box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"
    },
    {
      name: "Large Shadow",
      className: "shadow-lg",
      description: "Strong elevation for floating elements",
      cssValue: "box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);"
    },
    {
      name: "Extra Large Shadow",
      className: "shadow-xl",
      description: "High elevation for overlays",
      cssValue: "box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);"
    },
    {
      name: "2XL Shadow",
      className: "shadow-2xl",
      description: "Maximum elevation for prominent elements",
      cssValue: "box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);"
    }
  ];

  const innerShadowExamples = [
    {
      name: "Inner Shadow",
      className: "shadow-inner",
      description: "Inward shadow for pressed or inset effects",
      cssValue: "box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);"
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Shadows</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive shadow system for creating depth and visual hierarchy,
              providing consistent elevation levels and visual feedback for interactive elements.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              8 Shadow Levels
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Consistent Scale
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              CSS Based
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Dark Mode Ready
            </Badge>
          </div>
        </div>

        {/* Shadow System Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Shadow System Overview</h2>
              <p className="text-muted-foreground">
                Our shadow system creates visual hierarchy and depth using carefully crafted
                box-shadow values. Each shadow level corresponds to different elevation states,
                from subtle depth hints to prominent floating effects.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Shadow Levels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">RGB</div>
                  <div className="text-sm text-muted-foreground">Color Format</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0.1</div>
                  <div className="text-sm text-muted-foreground">Base Opacity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Blur</div>
                  <div className="text-sm text-muted-foreground">Based System</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shadow Examples */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Drop Shadows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {shadowExamples.map((shadow, index) => (
                <ShadowExample key={index} {...shadow} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Inner Shadows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {innerShadowExamples.map((shadow, index) => (
                <ShadowExample key={index} {...shadow} />
              ))}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Shadow Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Shadow Usage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Elevation Hierarchy</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-muted border rounded shadow-none"></div>
                    <span className="text-sm"><strong>No Shadow:</strong> Flat elements, dividers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white border rounded shadow-sm"></div>
                    <span className="text-sm"><strong>Small:</strong> Input fields, small buttons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white border rounded shadow"></div>
                    <span className="text-sm"><strong>Default:</strong> Cards, containers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white border rounded shadow-md"></div>
                    <span className="text-sm"><strong>Medium:</strong> Elevated cards, dropdowns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white border rounded shadow-lg"></div>
                    <span className="text-sm"><strong>Large:</strong> Floating panels, sidebars</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white border rounded shadow-xl"></div>
                    <span className="text-sm"><strong>Extra Large:</strong> Modals, overlays</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white border rounded shadow-2xl"></div>
                    <span className="text-sm"><strong>2XL:</strong> High-priority notifications</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interactive States</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border shadow transition-shadow hover:shadow-md">
                    <strong>Hover Effect:</strong> Increase shadow on hover
                    <div className="text-sm text-muted-foreground mt-1">
                      shadow → shadow-md
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border shadow-inner">
                    <strong>Pressed State:</strong> Use inner shadow
                    <div className="text-sm text-muted-foreground mt-1">
                      shadow-inner for active buttons
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border shadow-lg">
                    <strong>Focus State:</strong> Elevated appearance
                    <div className="text-sm text-muted-foreground mt-1">
                      shadow-lg for focused elements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Component Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cards with Different Elevations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Low Elevation</h4>
                    <p className="text-sm text-muted-foreground">
                      Subtle shadow for minimal depth (shadow-sm)
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Medium Elevation</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard elevation for most cards (shadow-md)
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">High Elevation</h4>
                    <p className="text-sm text-muted-foreground">
                      Prominent floating effect (shadow-lg)
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Interactive Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border shadow hover:shadow-md transition-shadow cursor-pointer">
                  <h4 className="font-semibold mb-2">Hover to Elevate</h4>
                  <p className="text-sm text-muted-foreground">
                    Shadow increases on hover for interactive feedback
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg border shadow-inner">
                  <h4 className="font-semibold mb-2">Pressed State</h4>
                  <p className="text-sm text-muted-foreground">
                    Inner shadow suggests the element is pressed
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Code Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Shadow Usage</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`<!-- Static shadows -->
<div className="shadow-sm">Small shadow</div>
<div className="shadow">Default shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>

<!-- Interactive shadows -->
<button className="shadow hover:shadow-md transition-shadow">
  Hover me
</button>

<!-- Inner shadow for pressed state -->
<button className="shadow-inner">
  Pressed button
</button>`}</code></pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Card Components</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`// Card with elevation
<Card className="shadow-md hover:shadow-lg transition-shadow">
  <CardContent>
    Card content with medium shadow
  </CardContent>
</Card>

// Modal with high elevation
<Dialog>
  <DialogContent className="shadow-2xl">
    Modal content with maximum shadow
  </DialogContent>
</Dialog>`}</code></pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Responsive Shadows</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`<!-- Different shadows at different breakpoints -->
<div className="shadow-sm md:shadow-md lg:shadow-lg">
  Responsive shadow that increases with screen size
</div>

<!-- Hide shadow on mobile -->
<div className="shadow-none md:shadow-md">
  No shadow on mobile, medium shadow on desktop
</div>`}</code></pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Shadow Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-600">✅ Do</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use consistent shadow levels throughout your app</li>
                  <li>• Increase shadow on hover for interactive elements</li>
                  <li>• Use inner shadows for pressed/active states</li>
                  <li>• Consider dark mode when designing with shadows</li>
                  <li>• Test shadow visibility on different backgrounds</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Overuse high-elevation shadows</li>
                  <li>• Mix custom shadows with system shadows</li>
                  <li>• Use shadows on transparent backgrounds</li>
                  <li>• Apply shadows to text elements</li>
                  <li>• Create too many elevation levels</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}