'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Button,
  Badge,
  useTheme,
  LucideIcons,
} from '@tanqory/mies';
// Simple cn utility function for className merging
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Navigation grouped by component types
const navigationGroups = [
  {
    name: 'Getting Started',
    items: [
      { name: 'Overview', href: '/', icon: LucideIcons.Home },
    ]
  },
  {
    name: 'Core Components (48)',
    items: [
      { name: 'UI Components', href: '/components', icon: LucideIcons.Grid3X3 },
      { name: 'Foundation', href: '/components/foundation', icon: LucideIcons.Palette },
    ]
  },
  {
    name: 'Extended Components (13)',
    items: [
      { name: 'Mies X', href: '/components/mies-x', icon: LucideIcons.Zap },
    ]
  },
  {
    name: 'Component Blocks (50+)',
    items: [
      { name: 'Animation Blocks', href: '/animation', icon: LucideIcons.TrendingUp },
      { name: 'Media Blocks', href: '/carousel', icon: LucideIcons.Images },
      { name: 'DataViz Blocks', href: '/charts', icon: LucideIcons.BarChart },
      { name: 'Form Blocks', href: '/form-wizard', icon: LucideIcons.FileText },
      { name: 'Layout Blocks', href: '/layout', icon: LucideIcons.Layout },
      { name: 'Navigation Blocks', href: '/navigation', icon: LucideIcons.Navigation },
      { name: 'Upload Blocks', href: '/upload', icon: LucideIcons.Upload },
      { name: 'DND Blocks', href: '/dnd', icon: LucideIcons.Move },
      { name: 'Multi-Language', href: '/multi-language', icon: LucideIcons.Globe },
      { name: 'Utility Blocks', href: '/utilities', icon: LucideIcons.Settings },
    ]
  },
  {
    name: 'Examples & Demos',
    items: [
      { name: 'Dashboard Demo', href: '/dashboard', icon: LucideIcons.LayoutDashboard },
      { name: 'Form Examples', href: '/forms', icon: LucideIcons.FileEdit },
    ]
  }
];

// Flatten for backwards compatibility
const navigationItems = navigationGroups.flatMap(group => group.items);

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <LucideIcons.Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <LucideIcons.Moon className="h-4 w-4" />
      ) : (
        <LucideIcons.Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function NavigationItem({ item, pathname, onClick }: {
  item: typeof navigationItems[0];
  pathname: string;
  onClick?: () => void;
}) {
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
        isActive && 'bg-muted text-foreground font-medium'
      )}
    >
      <Icon className="h-4 w-4" />
      {item.name}
      {isActive && (
        <Badge variant="secondary" className="ml-auto">
          Active
        </Badge>
      )}
    </Link>
  );
}

// Brand Header Component
function BrandHeader({ size = 'default' }: { size?: 'default' | 'small' }) {
  const isSmall = size === 'small';

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center justify-center rounded-lg bg-primary text-primary-foreground ${
        isSmall ? 'h-6 w-6' : 'h-8 w-8'
      }`}>
        <LucideIcons.Package className={isSmall ? 'h-3 w-3' : 'h-4 w-4'} />
      </div>
      <div>
        <h1 className={`font-bold ${isSmall ? 'text-sm' : 'text-sm'}`}>@tanqory/mies</h1>
        {!isSmall && (
          <p className="text-xs text-muted-foreground">Next.js Examples</p>
        )}
      </div>
    </div>
  );
}

// Navigation List Component
function NavigationList({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-2 py-4 space-y-6">
      {navigationGroups.map((group) => (
        <div key={group.name} className="space-y-2">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.name}
            </h3>
          </div>
          <div className="space-y-1">
            {group.items.map((item) => (
              <NavigationItem
                key={item.name}
                item={item}
                pathname={pathname}
                onClick={onItemClick}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

// Sidebar Footer Component
function SidebarFooter() {
  return (
    <div className="flex-shrink-0 flex border-t p-4">
      <div className="flex items-center justify-between w-full">
        <span className="text-xs text-muted-foreground">Next.js 15</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r bg-background">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <BrandHeader />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <NavigationList />
            <SidebarFooter />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 bg-background border-b">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <LucideIcons.Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <BrandHeader size="small" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 flex z-40">
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-background border-r">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LucideIcons.X className="h-6 w-6" />
                  <span className="sr-only">Close sidebar</span>
                </Button>
              </div>
              <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
                <BrandHeader />
              </div>
              <div className="flex-1 overflow-y-auto">
                <NavigationList onItemClick={() => setMobileMenuOpen(false)} />
              </div>
              <SidebarFooter />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="md:hidden h-16"></div>
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}