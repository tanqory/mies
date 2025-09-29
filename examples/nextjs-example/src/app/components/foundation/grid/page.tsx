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

const GridExample = ({
  title,
  description,
  children,
  code
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="border rounded-lg p-4 bg-muted/20">
      {children}
    </div>
    <div className="bg-muted p-4 rounded-lg">
      <pre className="text-sm overflow-x-auto"><code>{code}</code></pre>
    </div>
  </div>
);

const GridItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-primary/10 border border-primary/20 rounded p-4 text-center text-sm font-medium ${className}`}>
    {children}
  </div>
);

export default function GridPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Grid System</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible CSS Grid and Flexbox layout system built with Tailwind CSS utilities,
              providing responsive and adaptive layouts for modern web applications.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              CSS Grid
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Flexbox
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Responsive
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              12 Column System
            </Badge>
          </div>
        </div>

        {/* Grid System Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Layout System Overview</h2>
              <p className="text-muted-foreground">
                Our layout system combines the power of CSS Grid and Flexbox through Tailwind CSS utilities.
                It provides both structured grid layouts and flexible arrangements with responsive breakpoints
                for optimal viewing across all device sizes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Column Grid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Breakpoints</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Gap</div>
                  <div className="text-sm text-muted-foreground">System</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Auto</div>
                  <div className="text-sm text-muted-foreground">Responsive</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Grid Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Basic Grid Layouts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <GridExample
              title="Equal Columns"
              description="Simple grid with equal-width columns"
              code={`<div className="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>`}
            >
              <div className="grid grid-cols-3 gap-4">
                <GridItem>Column 1</GridItem>
                <GridItem>Column 2</GridItem>
                <GridItem>Column 3</GridItem>
              </div>
            </GridExample>

            <GridExample
              title="Responsive Grid"
              description="Grid that adapts to different screen sizes"
              code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <GridItem>Item 1</GridItem>
                <GridItem>Item 2</GridItem>
                <GridItem>Item 3</GridItem>
                <GridItem>Item 4</GridItem>
              </div>
            </GridExample>

            <GridExample
              title="Grid with Spanning"
              description="Items that span multiple columns or rows"
              code={`<div className="grid grid-cols-4 gap-4">
  <div className="col-span-2">Spans 2 columns</div>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div className="col-span-3">Spans 3 columns</div>
</div>`}
            >
              <div className="grid grid-cols-4 gap-4">
                <GridItem className="col-span-2">Spans 2 columns</GridItem>
                <GridItem>Item 1</GridItem>
                <GridItem>Item 2</GridItem>
                <GridItem>Item 3</GridItem>
                <GridItem className="col-span-3">Spans 3 columns</GridItem>
              </div>
            </GridExample>
          </CardContent>
        </Card>

        {/* Flexbox Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Flexbox Layouts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <GridExample
              title="Horizontal Flex"
              description="Items arranged horizontally with space between"
              code={`<div className="flex justify-between items-center gap-4">
  <div>Start</div>
  <div>Center</div>
  <div>End</div>
</div>`}
            >
              <div className="flex justify-between items-center gap-4">
                <GridItem>Start</GridItem>
                <GridItem>Center</GridItem>
                <GridItem>End</GridItem>
              </div>
            </GridExample>

            <GridExample
              title="Flex Wrap"
              description="Flexible layout that wraps to new lines"
              code={`<div className="flex flex-wrap gap-4">
  <div className="flex-1 min-w-[200px]">Flexible 1</div>
  <div className="flex-1 min-w-[200px]">Flexible 2</div>
  <div className="flex-1 min-w-[200px]">Flexible 3</div>
</div>`}
            >
              <div className="flex flex-wrap gap-4">
                <GridItem className="flex-1 min-w-[200px]">Flexible 1</GridItem>
                <GridItem className="flex-1 min-w-[200px]">Flexible 2</GridItem>
                <GridItem className="flex-1 min-w-[200px]">Flexible 3</GridItem>
              </div>
            </GridExample>

            <GridExample
              title="Vertical Stack"
              description="Vertical arrangement with spacing"
              code={`<div className="flex flex-col space-y-4">
  <div>First Item</div>
  <div>Second Item</div>
  <div>Third Item</div>
</div>`}
            >
              <div className="flex flex-col space-y-4">
                <GridItem>First Item</GridItem>
                <GridItem>Second Item</GridItem>
                <GridItem>Third Item</GridItem>
              </div>
            </GridExample>
          </CardContent>
        </Card>

        {/* Spacing System */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Spacing System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Consistent spacing scale using Tailwind CSS gap and space utilities.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Gap Spacing</h3>
                <div className="space-y-4">
                  {[1, 2, 4, 6, 8].map(gap => (
                    <div key={gap} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">gap-{gap}</code>
                        <span className="text-sm text-muted-foreground">{gap * 4}px</span>
                      </div>
                      <div className={`grid grid-cols-3 gap-${gap}`}>
                        <div className="bg-primary/20 border border-primary/30 rounded p-2 text-center text-xs">Item</div>
                        <div className="bg-primary/20 border border-primary/30 rounded p-2 text-center text-xs">Item</div>
                        <div className="bg-primary/20 border border-primary/30 rounded p-2 text-center text-xs">Item</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Breakpoint System */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Responsive Breakpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our responsive system uses Tailwind CSS breakpoints for consistent behavior across devices.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Breakpoint</th>
                      <th className="text-left p-3">Prefix</th>
                      <th className="text-left p-3">Min Width</th>
                      <th className="text-left p-3">Example Usage</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-3 font-medium">Mobile</td>
                      <td className="p-3"><code>default</code></td>
                      <td className="p-3">0px</td>
                      <td className="p-3"><code>grid-cols-1</code></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Small</td>
                      <td className="p-3"><code>sm:</code></td>
                      <td className="p-3">640px</td>
                      <td className="p-3"><code>sm:grid-cols-2</code></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Medium</td>
                      <td className="p-3"><code>md:</code></td>
                      <td className="p-3">768px</td>
                      <td className="p-3"><code>md:grid-cols-3</code></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Large</td>
                      <td className="p-3"><code>lg:</code></td>
                      <td className="p-3">1024px</td>
                      <td className="p-3"><code>lg:grid-cols-4</code></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Extra Large</td>
                      <td className="p-3"><code>xl:</code></td>
                      <td className="p-3">1280px</td>
                      <td className="p-3"><code>xl:grid-cols-5</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Common Layout Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <GridExample
              title="Card Grid"
              description="Responsive card layout with consistent spacing"
              code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card><CardContent className="p-4">Card 1</CardContent></Card>
                <Card><CardContent className="p-4">Card 2</CardContent></Card>
                <Card><CardContent className="p-4">Card 3</CardContent></Card>
              </div>
            </GridExample>

            <GridExample
              title="Sidebar Layout"
              description="Two-column layout with sidebar and main content"
              code={`<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  <aside className="lg:col-span-1">Sidebar</aside>
  <main className="lg:col-span-3">Main Content</main>
</div>`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[200px]">
                <aside className="lg:col-span-1">
                  <GridItem className="h-full">Sidebar</GridItem>
                </aside>
                <main className="lg:col-span-3">
                  <GridItem className="h-full">Main Content</GridItem>
                </main>
              </div>
            </GridExample>

            <GridExample
              title="Hero Section"
              description="Centered content with max width container"
              code={`<div className="container mx-auto px-4">
  <div className="max-w-4xl mx-auto text-center">
    <h1>Hero Title</h1>
    <p>Hero description</p>
  </div>
</div>`}
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                  <GridItem>Hero Title</GridItem>
                  <GridItem>Hero Description</GridItem>
                </div>
              </div>
            </GridExample>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Layout Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-600">✅ Do</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use consistent spacing throughout your layout</li>
                  <li>• Design mobile-first with responsive breakpoints</li>
                  <li>• Use grid for structured layouts, flex for components</li>
                  <li>• Test layouts across different screen sizes</li>
                  <li>• Use container classes for max-width constraints</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Mix different spacing scales inconsistently</li>
                  <li>• Create overly complex nested grid structures</li>
                  <li>• Ignore mobile layouts when designing</li>
                  <li>• Use fixed widths when flexible layouts work better</li>
                  <li>• Forget to test with variable content lengths</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}