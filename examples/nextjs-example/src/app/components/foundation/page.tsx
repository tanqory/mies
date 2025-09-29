'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../../components/navigation';

const foundationCategories = [
  {
    name: 'Colors',
    description: 'Tanqory design system color palette and usage guidelines',
    href: '/components/foundation/colors',
    icon: LucideIcons.Palette,
    color: 'bg-blue-600',
    stats: '3 Core Colors'
  },
  {
    name: 'Typography',
    description: 'Text styles, font weights, and responsive text sizing',
    href: '/components/foundation/typography',
    icon: LucideIcons.Type,
    color: 'bg-green-600',
    stats: '12 Text Styles'
  },
  {
    name: 'Grid System',
    description: 'Layout grid, spacing, and responsive breakpoints',
    href: '/components/foundation/grid',
    icon: LucideIcons.Grid3X3,
    color: 'bg-purple-600',
    stats: '12 Column Grid'
  },
  {
    name: 'Icons',
    description: 'Lucide React icon library with 1000+ icons',
    href: '/components/foundation/icons',
    icon: LucideIcons.Star,
    color: 'bg-yellow-600',
    stats: '1000+ Icons'
  },
  {
    name: 'Shadows',
    description: 'Elevation system with consistent shadow styles',
    href: '/components/foundation/shadows',
    icon: LucideIcons.Layers,
    color: 'bg-slate-600',
    stats: '6 Shadow Levels'
  },
];

// Color palette demo
const ColorDemo = () => {
  const colors = [
    { name: 'Primary (Black)', value: '#000000', class: 'bg-primary text-primary-foreground' },
    { name: 'Background (White)', value: '#FFFFFF', class: 'bg-background border text-foreground' },
    { name: 'Accent (Tanqory Yellow)', value: '#E1FF00', class: 'bg-accent text-accent-foreground' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {colors.map((color) => (
        <div key={color.name} className={`p-6 rounded-lg ${color.class}`}>
          <div className="space-y-2">
            <div className="font-semibold">{color.name}</div>
            <div className="text-sm opacity-90">{color.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Typography demo
const TypographyDemo = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Heading 1</h1>
        <h2 className="text-3xl font-bold">Heading 2</h2>
        <h3 className="text-2xl font-bold">Heading 3</h3>
        <h4 className="text-xl font-bold">Heading 4</h4>
        <h5 className="text-lg font-bold">Heading 5</h5>
        <h6 className="text-base font-bold">Heading 6</h6>
      </div>

      <div className="space-y-2">
        <p className="text-lg">Large text - Lorem ipsum dolor sit amet consectetur.</p>
        <p className="text-base">Base text - Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p className="text-sm">Small text - Lorem ipsum dolor sit amet consectetur.</p>
        <p className="text-xs">Extra small text - Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="space-y-2">
        <p className="font-light">Light weight text</p>
        <p className="font-normal">Normal weight text</p>
        <p className="font-medium">Medium weight text</p>
        <p className="font-semibold">Semibold weight text</p>
        <p className="font-bold">Bold weight text</p>
      </div>
    </div>
  );
};

// Icons showcase
const IconsDemo = () => {
  const iconList = [
    LucideIcons.Home, LucideIcons.User, LucideIcons.Settings, LucideIcons.Search,
    LucideIcons.Mail, LucideIcons.Phone, LucideIcons.Calendar, LucideIcons.FileText,
    LucideIcons.Download, LucideIcons.Upload, LucideIcons.Edit, LucideIcons.Trash,
    LucideIcons.Plus, LucideIcons.Minus, LucideIcons.Check, LucideIcons.X,
    LucideIcons.ChevronLeft, LucideIcons.ChevronRight, LucideIcons.ChevronUp, LucideIcons.ChevronDown,
    LucideIcons.Heart, LucideIcons.Star, LucideIcons.Bookmark, LucideIcons.Share,
  ];

  return (
    <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
      {iconList.map((Icon, index) => (
        <div key={index} className="flex items-center justify-center p-3 border rounded-lg hover:bg-muted transition-colors">
          <Icon className="h-5 w-5" />
        </div>
      ))}
    </div>
  );
};

// Shadows demo
const ShadowsDemo = () => {
  const shadows = [
    { name: 'None', class: 'shadow-none' },
    { name: 'Small', class: 'shadow-sm' },
    { name: 'Default', class: 'shadow' },
    { name: 'Medium', class: 'shadow-md' },
    { name: 'Large', class: 'shadow-lg' },
    { name: 'Extra Large', class: 'shadow-xl' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {shadows.map((shadow) => (
        <div key={shadow.name} className={`p-6 bg-background rounded-lg ${shadow.class}`}>
          <div className="text-center">
            <div className="font-medium">{shadow.name}</div>
            <div className="text-sm text-muted-foreground mt-1">{shadow.class}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function FoundationPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Foundation</h1>
              <p className="text-muted-foreground text-lg">
                Design system foundations - colors, typography, grid, and visual elements
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Tanqory Design System</Badge>
            <Badge variant="outline">3-Color Palette</Badge>
          </div>
        </div>

        {/* Foundation Categories */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Foundation Categories</h2>
            <p className="text-muted-foreground">
              Explore the building blocks of the Tanqory Design System
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundationCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href={category.href}>
                  <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.color} text-white group-hover:scale-110 transition-transform`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {category.name}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {category.stats}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Colors Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Palette className="h-5 w-5" />
              Color Palette
            </CardTitle>
            <CardDescription>
              Tanqory design system uses only 3 core colors for consistency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ColorDemo />
          </CardContent>
        </Card>

        {/* Typography Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Type className="h-5 w-5" />
              Typography Scale
            </CardTitle>
            <CardDescription>
              Responsive text sizing with consistent font weights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypographyDemo />
          </CardContent>
        </Card>

        {/* Icons Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Star className="h-5 w-5" />
              Icon Library
            </CardTitle>
            <CardDescription>
              1000+ Lucide React icons available via LucideIcons namespace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-3 rounded-lg font-mono text-sm">
              import &#123; LucideIcons &#125; from '@tanqory/mies'
            </div>
            <IconsDemo />
            <div className="text-center">
              <Button asChild variant="outline">
                <Link href="/components/foundation/icons">
                  View All Icons
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shadows Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Layers className="h-5 w-5" />
              Elevation System
            </CardTitle>
            <CardDescription>
              Consistent shadow levels for depth and hierarchy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShadowsDemo />
          </CardContent>
        </Card>

        {/* Grid System Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Grid3X3 className="h-5 w-5" />
              Grid System
            </CardTitle>
            <CardDescription>
              Responsive 12-column grid with consistent spacing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="bg-primary/10 p-2 text-center text-xs rounded">
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)</p>
              <p>• Spacing scale: 0.25rem increments (1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24...)</p>
              <p>• Container max-widths: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)</p>
            </div>
            <div className="text-center">
              <Button asChild variant="outline">
                <Link href="/components/foundation/grid">
                  View Grid Examples
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}