'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  AspectRatio,
  Separator,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

// Grid Layout Component
function GridLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">12-Column Grid</h4>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 bg-muted rounded p-4 text-center">col-span-12</div>
          <div className="col-span-6 bg-muted rounded p-4 text-center">col-span-6</div>
          <div className="col-span-6 bg-muted rounded p-4 text-center">col-span-6</div>
          <div className="col-span-4 bg-muted rounded p-4 text-center">col-span-4</div>
          <div className="col-span-4 bg-muted rounded p-4 text-center">col-span-4</div>
          <div className="col-span-4 bg-muted rounded p-4 text-center">col-span-4</div>
          <div className="col-span-3 bg-muted rounded p-4 text-center">col-span-3</div>
          <div className="col-span-3 bg-muted rounded p-4 text-center">col-span-3</div>
          <div className="col-span-3 bg-muted rounded p-4 text-center">col-span-3</div>
          <div className="col-span-3 bg-muted rounded p-4 text-center">col-span-3</div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Responsive Grid</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="bg-muted rounded p-4 text-center">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Flexbox Layout Component
function FlexboxLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Flex Direction</h4>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="bg-muted rounded p-4 flex-1 text-center">flex-1</div>
            <div className="bg-muted rounded p-4 flex-1 text-center">flex-1</div>
            <div className="bg-muted rounded p-4 flex-1 text-center">flex-1</div>
          </div>
          <div className="flex flex-col gap-4 h-32">
            <div className="bg-muted rounded p-4 flex-1 text-center">flex-1</div>
            <div className="bg-muted rounded p-4 flex-1 text-center">flex-1</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Justify Content</h4>
        <div className="space-y-4">
          <div className="flex justify-start gap-4 bg-muted/30 rounded p-4">
            <div className="bg-muted rounded p-2">Start</div>
            <div className="bg-muted rounded p-2">Items</div>
          </div>
          <div className="flex justify-center gap-4 bg-muted/30 rounded p-4">
            <div className="bg-muted rounded p-2">Center</div>
            <div className="bg-muted rounded p-2">Items</div>
          </div>
          <div className="flex justify-between gap-4 bg-muted/30 rounded p-4">
            <div className="bg-muted rounded p-2">Between</div>
            <div className="bg-muted rounded p-2">Items</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Container Layout Component
function ContainerLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Container Sizes</h4>
        <div className="space-y-4">
          <div className="max-w-sm mx-auto bg-muted rounded p-4 text-center">
            max-w-sm (24rem)
          </div>
          <div className="max-w-md mx-auto bg-muted rounded p-4 text-center">
            max-w-md (28rem)
          </div>
          <div className="max-w-lg mx-auto bg-muted rounded p-4 text-center">
            max-w-lg (32rem)
          </div>
          <div className="max-w-xl mx-auto bg-muted rounded p-4 text-center">
            max-w-xl (36rem)
          </div>
          <div className="max-w-2xl mx-auto bg-muted rounded p-4 text-center">
            max-w-2xl (42rem)
          </div>
        </div>
      </div>
    </div>
  );
}

// Card Layout Component
function CardLayout() {
  const cards = [
    { title: 'Analytics', value: '2,345', icon: LucideIcons.BarChart, color: 'text-blue-600' },
    { title: 'Revenue', value: '$12,345', icon: LucideIcons.DollarSign, color: 'text-green-600' },
    { title: 'Users', value: '1,234', icon: LucideIcons.Users, color: 'text-purple-600' },
    { title: 'Orders', value: '567', icon: LucideIcons.ShoppingCart, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Stats Cards</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <p className="text-2xl font-bold">{card.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${card.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Feature Cards</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Fast Performance', description: 'Optimized for speed and efficiency', icon: LucideIcons.Zap },
            { title: 'Secure by Default', description: 'Built with security best practices', icon: LucideIcons.Shield },
            { title: 'Easy to Use', description: 'Intuitive interface and great UX', icon: LucideIcons.Heart },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Aspect Ratio Layout Component
function AspectRatioLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Common Aspect Ratios</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">16:9 (Video)</p>
            <AspectRatio ratio={16 / 9}>
              <div className="bg-muted rounded flex items-center justify-center">
                <LucideIcons.Play className="h-8 w-8 text-muted-foreground" />
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">4:3 (Classic)</p>
            <AspectRatio ratio={4 / 3}>
              <div className="bg-muted rounded flex items-center justify-center">
                <LucideIcons.Image className="h-8 w-8 text-muted-foreground" />
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">1:1 (Square)</p>
            <AspectRatio ratio={1}>
              <div className="bg-muted rounded flex items-center justify-center">
                <LucideIcons.Square className="h-8 w-8 text-muted-foreground" />
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Layout Component
function SidebarLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">App Shell Layout</h4>
        <div className="border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-muted p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded"></div>
                <span className="font-medium">App Name</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted-foreground/20 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-muted/50 p-4">
              <div className="space-y-2">
                {['Dashboard', 'Analytics', 'Users', 'Settings'].map((item, index) => (
                  <div key={index} className="p-2 bg-background rounded text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LayoutPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Layout</h1>
            <p className="text-muted-foreground text-lg">
              Layout components and patterns for organizing page structure and content
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">6 Layout Types</Badge>
            <Badge variant="outline">Responsive</Badge>
            <Badge variant="outline">Flexible</Badge>
          </div>
        </div>

        {/* Grid Systems */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Grid3X3 className="h-5 w-5" />
              Grid Systems
            </CardTitle>
            <CardDescription>
              CSS Grid layouts for organizing content in rows and columns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GridLayout />
          </CardContent>
        </Card>

        {/* Flexbox Layouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.AlignJustify className="h-5 w-5" />
              Flexbox Layouts
            </CardTitle>
            <CardDescription>
              Flexible box layouts for one-dimensional arrangements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FlexboxLayout />
          </CardContent>
        </Card>

        {/* Container Layouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Box className="h-5 w-5" />
              Container Layouts
            </CardTitle>
            <CardDescription>
              Fixed-width containers for consistent content alignment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContainerLayout />
          </CardContent>
        </Card>

        {/* Card Layouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.CreditCard className="h-5 w-5" />
              Card Layouts
            </CardTitle>
            <CardDescription>
              Card-based layouts for displaying grouped information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardLayout />
          </CardContent>
        </Card>

        {/* Aspect Ratio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Maximize className="h-5 w-5" />
              Aspect Ratio
            </CardTitle>
            <CardDescription>
              Maintain consistent aspect ratios for media and content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatioLayout />
          </CardContent>
        </Card>

        {/* App Shell Layout */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Layout className="h-5 w-5" />
              App Shell Layout
            </CardTitle>
            <CardDescription>
              Complete application layout with header, sidebar, and main content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SidebarLayout />
          </CardContent>
        </Card>

        {/* Layout Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Layers className="h-5 w-5" />
              Layout Patterns
            </CardTitle>
            <CardDescription>
              Common layout patterns and responsive design principles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.Smartphone, title: 'Mobile First', description: 'Design for mobile devices first, then scale up' },
                { icon: LucideIcons.Monitor, title: 'Desktop Layout', description: 'Wide screen layouts with multiple columns' },
                { icon: LucideIcons.Tablet, title: 'Tablet Responsive', description: 'Medium screen adaptations and touch interfaces' },
                { icon: LucideIcons.Layers, title: 'Stack Layout', description: 'Vertical stacking for simple content flow' },
                { icon: LucideIcons.Columns, title: 'Multi-Column', description: 'Side-by-side content arrangement' },
                { icon: LucideIcons.LayoutGrid, title: 'Masonry Grid', description: 'Pinterest-style grid with varied heights' },
              ].map((pattern, index) => {
                const Icon = pattern.icon;
                return (
                  <div key={index} className="text-center space-y-3 p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">{pattern.title}</h4>
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}