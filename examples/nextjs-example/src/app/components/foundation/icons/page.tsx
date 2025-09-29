'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Input,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../../../components/navigation';

const IconExample = ({ name, IconComponent, size = 24 }: { name: string; IconComponent: React.ComponentType<any>; size?: number }) => (
  <div className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
    <IconComponent size={size} className="text-primary" />
    <span className="text-xs text-center font-mono">{name}</span>
  </div>
);

const IconGrid = ({ title, icons }: { title: string; icons: Array<{ name: string; component: React.ComponentType<any> }> }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {icons.map(({ name, component }) => (
          <IconExample key={name} name={name} IconComponent={component} />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const commonIcons = [
    { name: 'ArrowLeft', component: LucideIcons.ArrowLeft },
    { name: 'ArrowRight', component: LucideIcons.ArrowRight },
    { name: 'ArrowUp', component: LucideIcons.ArrowUp },
    { name: 'ArrowDown', component: LucideIcons.ArrowDown },
    { name: 'Check', component: LucideIcons.Check },
    { name: 'X', component: LucideIcons.X },
    { name: 'Plus', component: LucideIcons.Plus },
    { name: 'Minus', component: LucideIcons.Minus },
    { name: 'Search', component: LucideIcons.Search },
    { name: 'Filter', component: LucideIcons.Filter },
    { name: 'Settings', component: LucideIcons.Settings },
    { name: 'User', component: LucideIcons.User },
    { name: 'Home', component: LucideIcons.Home },
    { name: 'Heart', component: LucideIcons.Heart },
    { name: 'Star', component: LucideIcons.Star },
    { name: 'Bell', component: LucideIcons.Bell },
  ];

  const navigationIcons = [
    { name: 'ChevronLeft', component: LucideIcons.ChevronLeft },
    { name: 'ChevronRight', component: LucideIcons.ChevronRight },
    { name: 'ChevronUp', component: LucideIcons.ChevronUp },
    { name: 'ChevronDown', component: LucideIcons.ChevronDown },
    { name: 'Menu', component: LucideIcons.Menu },
    { name: 'MoreHorizontal', component: LucideIcons.MoreHorizontal },
    { name: 'MoreVertical', component: LucideIcons.MoreVertical },
    { name: 'Navigation', component: LucideIcons.Navigation },
  ];

  const actionIcons = [
    { name: 'Edit', component: LucideIcons.Edit },
    { name: 'Trash2', component: LucideIcons.Trash2 },
    { name: 'Copy', component: LucideIcons.Copy },
    { name: 'Download', component: LucideIcons.Download },
    { name: 'Upload', component: LucideIcons.Upload },
    { name: 'Share', component: LucideIcons.Share },
    { name: 'Save', component: LucideIcons.Save },
    { name: 'Refresh', component: LucideIcons.RefreshCw },
  ];

  const statusIcons = [
    { name: 'CheckCircle', component: LucideIcons.CheckCircle },
    { name: 'AlertCircle', component: LucideIcons.AlertCircle },
    { name: 'AlertTriangle', component: LucideIcons.AlertTriangle },
    { name: 'XCircle', component: LucideIcons.XCircle },
    { name: 'Info', component: LucideIcons.Info },
    { name: 'HelpCircle', component: LucideIcons.HelpCircle },
    { name: 'Loader2', component: LucideIcons.Loader2 },
    { name: 'Clock', component: LucideIcons.Clock },
  ];

  const mediaIcons = [
    { name: 'Play', component: LucideIcons.Play },
    { name: 'Pause', component: LucideIcons.Pause },
    { name: 'Square', component: LucideIcons.Square },
    { name: 'SkipBack', component: LucideIcons.SkipBack },
    { name: 'SkipForward', component: LucideIcons.SkipForward },
    { name: 'Volume2', component: LucideIcons.Volume2 },
    { name: 'VolumeX', component: LucideIcons.VolumeX },
    { name: 'Camera', component: LucideIcons.Camera },
  ];

  const fileIcons = [
    { name: 'File', component: LucideIcons.File },
    { name: 'FileText', component: LucideIcons.FileText },
    { name: 'Folder', component: LucideIcons.Folder },
    { name: 'Image', component: LucideIcons.Image },
    { name: 'FileCode', component: LucideIcons.FileCode },
    { name: 'FileArchive', component: LucideIcons.Archive },
    { name: 'Paperclip', component: LucideIcons.Paperclip },
    { name: 'Link', component: LucideIcons.Link },
  ];

  const allIcons = [
    ...commonIcons,
    ...navigationIcons,
    ...actionIcons,
    ...statusIcons,
    ...mediaIcons,
    ...fileIcons
  ];

  const filteredIcons = searchQuery
    ? allIcons.filter(icon =>
        icon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allIcons;

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Icons</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive icon library powered by Lucide Icons, providing 1000+ beautiful,
              consistent, and customizable SVG icons for modern web applications.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              1000+ Icons
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              SVG Based
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Customizable
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Tree Shakable
            </Badge>
          </div>
        </div>

        {/* Icons Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Lucide Icons Integration</h2>
              <p className="text-muted-foreground">
                Our icon system is built on Lucide Icons, a beautiful and consistent icon library.
                All icons are SVG-based, fully customizable, and optimized for performance with
                tree shaking support to include only the icons you use.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Available Icons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24px</div>
                  <div className="text-sm text-muted-foreground">Default Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2px</div>
                  <div className="text-sm text-muted-foreground">Stroke Width</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">SVG</div>
                  <div className="text-sm text-muted-foreground">Vector Format</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Icon Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative max-w-md mx-auto">
              <LucideIcons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Found {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Icon Categories */}
        {!searchQuery && (
          <div className="space-y-8">
            <IconGrid title="Common Icons" icons={commonIcons} />
            <IconGrid title="Navigation Icons" icons={navigationIcons} />
            <IconGrid title="Action Icons" icons={actionIcons} />
            <IconGrid title="Status Icons" icons={statusIcons} />
            <IconGrid title="Media Icons" icons={mediaIcons} />
            <IconGrid title="File Icons" icons={fileIcons} />
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {filteredIcons.map(({ name, component }) => (
                    <IconExample key={name} name={name} IconComponent={component} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <LucideIcons.Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No icons found</h3>
                  <p className="text-muted-foreground">
                    Try searching with different keywords.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Separator />

        {/* Icon Sizes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Icon Sizes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Icons can be sized using the size prop or CSS classes for consistent scaling.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Size Examples</h3>
              <div className="flex items-center gap-8 flex-wrap">
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Star size={16} className="text-primary" />
                  <span className="text-xs">16px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Star size={20} className="text-primary" />
                  <span className="text-xs">20px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Star size={24} className="text-primary" />
                  <span className="text-xs">24px (default)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Star size={32} className="text-primary" />
                  <span className="text-xs">32px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Star size={48} className="text-primary" />
                  <span className="text-xs">48px</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">CSS Class Sizes</h3>
              <div className="flex items-center gap-8 flex-wrap">
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Heart className="h-4 w-4 text-primary" />
                  <span className="text-xs">h-4 w-4</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Heart className="h-5 w-5 text-primary" />
                  <span className="text-xs">h-5 w-5</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Heart className="h-6 w-6 text-primary" />
                  <span className="text-xs">h-6 w-6</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Heart className="h-8 w-8 text-primary" />
                  <span className="text-xs">h-8 w-8</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LucideIcons.Heart className="h-12 w-12 text-primary" />
                  <span className="text-xs">h-12 w-12</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Usage Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Usage</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`import { LucideIcons } from '@tanqory/mies';

// Basic icon
<LucideIcons.Star />

// With size prop
<LucideIcons.Star size={32} />

// With CSS classes
<LucideIcons.Star className="h-6 w-6 text-primary" />

// With custom styling
<LucideIcons.Star
  className="h-8 w-8 text-blue-500 hover:text-blue-600"
/>`}</code></pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">In Components</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm"><code>{`// In buttons
<Button>
  <LucideIcons.Plus className="h-4 w-4 mr-2" />
  Add Item
</Button>

// In navigation
<nav>
  <a href="/">
    <LucideIcons.Home className="h-5 w-5" />
    Home
  </a>
</nav>

// In form fields
<div className="relative">
  <LucideIcons.Search className="absolute left-3 top-3 h-4 w-4" />
  <Input className="pl-10" placeholder="Search..." />
</div>`}</code></pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Icon Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-600">✅ Do</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use consistent icon sizes throughout your app</li>
                  <li>• Pair icons with text labels for clarity</li>
                  <li>• Use semantic color classes for icon states</li>
                  <li>• Choose icons that match your content context</li>
                  <li>• Test icon visibility in both light and dark modes</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Mix different icon styles in the same interface</li>
                  <li>• Use icons without proper accessibility labels</li>
                  <li>• Make icons too small to be easily clickable</li>
                  <li>• Use decorative icons for functional elements</li>
                  <li>• Override default stroke width unnecessarily</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}