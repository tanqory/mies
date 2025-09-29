'use client';

import React from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Alert,
  AlertDescription,
  AlertTitle,
  Progress,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../components/navigation';

// Core UI Components (48)
const coreComponents = [
  {
    name: 'Core Components',
    description: 'Basic UI building blocks - buttons, inputs, cards, tables',
    href: '/components',
    icon: LucideIcons.Grid3X3,
    color: 'bg-primary',
    stats: '48 Components'
  },
  {
    name: 'Dashboard',
    description: 'Complete dashboard layouts with analytics and data visualization',
    href: '/dashboard',
    icon: LucideIcons.LayoutDashboard,
    color: 'bg-accent',
    stats: '4 Dashboard Types'
  },
];

// Extended Components (13 - Mies X)
const extendedComponents = [
  {
    name: 'Mies X Extended',
    description: 'Advanced dashboard components via @tanqory/mies/x',
    href: '/components/mies-x',
    icon: LucideIcons.Zap,
    color: 'bg-violet-600',
    stats: '13 Extended Components'
  },
];

// Component Blocks (50+)
const componentBlocks = [
  {
    name: 'Animation Blocks',
    description: 'Count-up animations, text reveals, and motion containers',
    href: '/animation',
    icon: LucideIcons.TrendingUp,
    color: 'bg-blue-600',
    stats: '7 Animation Types'
  },
  {
    name: 'Media Blocks',
    description: 'Image galleries, carousels with autoplay and thumbnails',
    href: '/carousel',
    icon: LucideIcons.Images,
    color: 'bg-green-600',
    stats: '6 Media Types'
  },
  {
    name: 'DataViz Blocks',
    description: 'Charts, tables, and data visualization components',
    href: '/charts',
    icon: LucideIcons.BarChart,
    color: 'bg-purple-600',
    stats: '6 Chart Types'
  },
  {
    name: 'Form Blocks',
    description: 'Multi-step forms, wizards with validation and progress',
    href: '/form-wizard',
    icon: LucideIcons.FileText,
    color: 'bg-indigo-600',
    stats: '8 Form Types'
  },
  {
    name: 'Layout Blocks',
    description: 'Hero sections, feature grids, and footer layouts',
    href: '/layout',
    icon: LucideIcons.Layout,
    color: 'bg-pink-600',
    stats: '3 Layout Types'
  },
  {
    name: 'Navigation Blocks',
    description: 'Navigation menus, breadcrumbs, and sidebar components',
    href: '/navigation',
    icon: LucideIcons.Navigation,
    color: 'bg-teal-600',
    stats: '4 Navigation Types'
  },
  {
    name: 'Upload Blocks',
    description: 'File upload with drag & drop and progress tracking',
    href: '/upload',
    icon: LucideIcons.Upload,
    color: 'bg-orange-600',
    stats: '3 Upload Types'
  },
  {
    name: 'DND Blocks',
    description: 'Drag & drop: sortable lists, kanban boards, drop zones',
    href: '/dnd',
    icon: LucideIcons.Move,
    color: 'bg-red-600',
    stats: '4 DND Patterns'
  },
  {
    name: 'Multi-Language',
    description: 'Internationalization with language switching support',
    href: '/multi-language',
    icon: LucideIcons.Globe,
    color: 'bg-emerald-600',
    stats: '7 i18n Features'
  },
  {
    name: 'Utility Blocks',
    description: 'Color pickers, loading states, and empty state screens',
    href: '/utilities',
    icon: LucideIcons.Settings,
    color: 'bg-slate-600',
    stats: '5 Utility Types'
  },
];

const allFeatures = [...coreComponents, ...extendedComponents, ...componentBlocks];

const stats = [
  { name: 'Core Components', value: '48', description: 'Basic UI building blocks' },
  { name: 'Extended Components', value: '13', description: 'Mies X advanced components' },
  { name: 'Component Blocks', value: '50+', description: 'Pre-built complex patterns' },
  { name: 'Total Coverage', value: '110+', description: 'Complete component library' },
];

export default function Home() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-3 py-1">
              Next.js 15 • App Router • TypeScript
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              @tanqory/mies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive React component library with 110+ components including Core UI,
              Extended Components (Mies X), and pre-built Component Blocks for rapid development.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/components">
                <LucideIcons.Rocket className="mr-2 h-4 w-4" />
                Explore Components
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/tanqory/mies" target="_blank">
                <LucideIcons.Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>

        {/* Alert */}
        <Alert>
          <LucideIcons.Info className="h-4 w-4" />
          <AlertTitle>Welcome to @tanqory/mies!</AlertTitle>
          <AlertDescription>
            Explore our comprehensive component library with real-world examples and interactive demos.
          </AlertDescription>
        </Alert>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="font-medium">{stat.name}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Component Categories */}
        <div className="space-y-12">
          {/* Core Components */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Core Components</h2>
              <p className="text-muted-foreground">
                Essential UI building blocks built on Radix UI primitives
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreComponents.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link key={feature.name} href={feature.href}>
                    <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${feature.color} text-primary-foreground group-hover:scale-110 transition-transform`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {feature.name}
                            </CardTitle>
                            <Badge variant="secondary" className="mt-2">
                              {feature.stats}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Extended Components */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Extended Components (Mies X)</h2>
              <p className="text-muted-foreground">
                Advanced dashboard components via <code className="bg-muted px-2 py-1 rounded">@tanqory/mies/x</code>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
              {extendedComponents.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link key={feature.name} href={feature.href}>
                    <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${feature.color} text-white group-hover:scale-110 transition-transform`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {feature.name}
                            </CardTitle>
                            <Badge variant="outline" className="mt-2">
                              {feature.stats}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Component Blocks */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Component Blocks</h2>
              <p className="text-muted-foreground">
                Pre-built complex patterns for rapid application development
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {componentBlocks.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.name} href={feature.href}>
                  <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${feature.color} text-white group-hover:scale-110 transition-transform`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {feature.name}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {feature.stats}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            <CardDescription>
              Choose your preferred framework and start building amazing applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-dashed">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                    <LucideIcons.Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Installation</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Install via npm or yarn
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    npm install @tanqory/mies
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                    <LucideIcons.Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Usage</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Import and use components
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm text-left">
                    import &#123; Button &#125; from &apos;@tanqory/mies&apos;
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/components">
                    Browse All Components
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://storybook.tanqory.com" target="_blank">
                    View Storybook
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Built with Next.js 15, TypeScript, and Tailwind CSS
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}