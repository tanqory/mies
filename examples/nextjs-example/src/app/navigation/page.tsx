'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

// Navigation Menu Component
function NavigationMenu() {
  const [activeItem, setActiveItem] = React.useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', icon: LucideIcons.Home },
    { id: 'products', label: 'Products', icon: LucideIcons.Package },
    { id: 'services', label: 'Services', icon: LucideIcons.Settings },
    { id: 'about', label: 'About', icon: LucideIcons.Info },
    { id: 'contact', label: 'Contact', icon: LucideIcons.Mail },
  ];

  return (
    <nav className="bg-muted rounded-lg p-2">
      <ul className="flex gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Button
                variant={activeItem === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveItem(item.id)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Vertical Navigation Component
function VerticalNavigation() {
  const [activeItem, setActiveItem] = React.useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LucideIcons.LayoutDashboard, badge: null },
    { id: 'analytics', label: 'Analytics', icon: LucideIcons.BarChart, badge: 'Pro' },
    { id: 'users', label: 'Users', icon: LucideIcons.Users, badge: '12' },
    { id: 'settings', label: 'Settings', icon: LucideIcons.Settings, badge: null },
    { id: 'help', label: 'Help & Support', icon: LucideIcons.HelpCircle, badge: null },
  ];

  return (
    <div className="w-64 bg-muted rounded-lg p-4">
      <div className="space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveItem(item.id)}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// Dropdown Menu Component
function DropdownMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  const dropdownItems = [
    { label: 'Profile', icon: LucideIcons.User },
    { label: 'Settings', icon: LucideIcons.Settings },
    { label: 'Billing', icon: LucideIcons.CreditCard },
    { label: 'Logout', icon: LucideIcons.LogOut },
  ];

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <LucideIcons.User className="h-4 w-4" />
        Account
        <LucideIcons.ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-10">
          <div className="p-1">
            {dropdownItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Tab Navigation Component
function TabNavigation() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Overview Content</h3>
          <p className="text-muted-foreground">
            This is the overview tab content. Here you would show key metrics and dashboard information.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Analytics Content</h3>
          <p className="text-muted-foreground">
            Analytics and detailed metrics would be displayed in this section.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="reports" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Reports Content</h3>
          <p className="text-muted-foreground">
            Generate and view reports in this section.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Settings Content</h3>
          <p className="text-muted-foreground">
            Configure your preferences and settings here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default function NavigationPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Navigation</h1>
            <p className="text-muted-foreground text-lg">
              Navigation components including menus, breadcrumbs, tabs, and navigation patterns
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">6 Components</Badge>
            <Badge variant="outline">Interactive</Badge>
            <Badge variant="outline">Responsive</Badge>
          </div>
        </div>

        {/* Breadcrumbs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.MapPin className="h-5 w-5" />
              Breadcrumbs
            </CardTitle>
            <CardDescription>
              Show navigation hierarchy and current page location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Basic Breadcrumb</h4>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Navigation</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div>
                <h4 className="font-medium mb-2">Complex Breadcrumb</h4>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">
                        <LucideIcons.Home className="h-4 w-4" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Smartphones</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horizontal Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Menu className="h-5 w-5" />
              Horizontal Navigation
            </CardTitle>
            <CardDescription>
              Top navigation bars and horizontal menu layouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NavigationMenu />
          </CardContent>
        </Card>

        {/* Vertical Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Sidebar className="h-5 w-5" />
              Vertical Navigation
            </CardTitle>
            <CardDescription>
              Sidebar navigation with icons and badges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VerticalNavigation />
          </CardContent>
        </Card>

        {/* Dropdown Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.ChevronDown className="h-5 w-5" />
              Dropdown Navigation
            </CardTitle>
            <CardDescription>
              Dropdown menus for account actions and contextual navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownMenuDemo />
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.LayoutGrid className="h-5 w-5" />
              Tab Navigation
            </CardTitle>
            <CardDescription>
              Tab-based navigation for organizing content sections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabNavigation />
          </CardContent>
        </Card>

        {/* Navigation Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Layers className="h-5 w-5" />
              Navigation Patterns
            </CardTitle>
            <CardDescription>
              Common navigation patterns and best practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.Layout, title: 'App Shell', description: 'Header + Sidebar layout pattern' },
                { icon: LucideIcons.Menu, title: 'Hamburger Menu', description: 'Mobile-first navigation toggle' },
                { icon: LucideIcons.Zap, title: 'Quick Actions', description: 'Floating action buttons and shortcuts' },
                { icon: LucideIcons.Search, title: 'Command Palette', description: 'Keyboard-driven navigation' },
                { icon: LucideIcons.ArrowLeft, title: 'Back Navigation', description: 'Breadcrumb and back button patterns' },
                { icon: LucideIcons.MoreHorizontal, title: 'Context Menus', description: 'Right-click and contextual actions' },
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