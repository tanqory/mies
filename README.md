# @tanqory/mies

A comprehensive UI component library built with React, TypeScript, and Tailwind CSS, following the Tanqory Design System guidelines.

## Features

- 🎨 **Consistent Design System** - Black, White & Tanqory Yellow (#E1FF00) palette
- 📱 **110+ React Components** - Core UI + Extended Components + Pre-built Blocks
- 🎯 **TypeScript Support** - Full type safety and intellisense
- 🌙 **Dark/Light Mode** - Built-in theme switching
- 🎪 **Tailwind CSS** - Complete utility classes included
- 📦 **Tree Shakeable** - Import only what you need
- ♿ **Accessible** - WAI-ARIA compliant components
- 🎭 **LucideIcons** - 1000+ icons via namespace export
- 📊 **ReCharts Integration** - Built-in chart components
- ⚛️ **React.js & Next.js** - Full support for both frameworks
- 🧩 **Component Blocks** - Pre-built complex patterns for rapid development
- 🚀 **Three Import Levels** - Individual, collections, or entire categories

## Installation

```bash
npm install @tanqory/mies
# or
yarn add @tanqory/mies
```

## Quick Start

### 1. Import Styles (All-in-One)

The library includes everything you need - design tokens, component styles, and Tailwind utilities:

```tsx
import '@tanqory/mies/styles.css'
```

### 2. Use Components

```tsx
import { Button, Card, Badge, LucideIcons } from '@tanqory/mies'
import { CalloutCard, TopBar } from '@tanqory/mies/x'

function App() {
  return (
    <div>
      <TopBar
        logo={{ source: "/logo.png", alt: "Brand" }}
        userMenu={{
          name: "John Doe",
          actions: [{ items: [{ content: "Profile", onAction: () => {} }] }]
        }}
      />

      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Hello Tanqory!</h1>
        <div className="flex gap-2">
          <Button>
            <LucideIcons.Plus className="h-4 w-4 mr-2" />
            Primary Button
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Badge variant="success">Active</Badge>
        </div>
      </Card>

      <CalloutCard
        title="Upgrade to Pro"
        illustration="/upgrade.svg"
        primaryAction={{ content: "Upgrade Now", onAction: () => {} }}
      >
        Unlock advanced features and get priority support.
      </CalloutCard>
    </div>
  )
}
```

### 3. Setup Theme Provider

```tsx
import { ThemeProvider } from '@tanqory/mies'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tanqory-ui-theme">
      <YourApp />
    </ThemeProvider>
  )
}
```

## Framework Setup

### React.js

```tsx
// src/main.tsx or src/index.tsx
import '@tanqory/mies/styles.css'
import { Button, Card, ThemeProvider } from '@tanqory/mies'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Card className="p-6 m-4">
          <Button>Hello Tanqory!</Button>
        </Card>
      </div>
    </ThemeProvider>
  )
}
```

### Next.js (App Router)

```tsx
// app/globals.css
@import '@tanqory/mies/styles.css';

// app/layout.tsx
import { ThemeProvider } from '@tanqory/mies'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          storageKey="tanqory-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import '@tanqory/mies/styles.css'
import { ThemeProvider } from '@tanqory/mies'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

## Tailwind CSS Setup (Optional)

If you want to extend our design system, add our preset to your `tailwind.config.js`:

```js
const tanqoryPreset = require('@tanqory/mies/tailwind-preset')

export default {
  presets: [tanqoryPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tanqory/mies/**/*.{js,ts,jsx,tsx}'
  ]
}
```

## What's Included

### ✅ Complete CSS Bundle
- **Design Tokens**: CSS variables for colors, typography, spacing
- **Component Styles**: Pre-styled components ready to use
- **Tailwind Utilities**: All utility classes (no separate Tailwind setup needed)
- **Dark/Light Mode**: Automatic theme switching
- **Typography Scale**: Responsive text sizing
- **Custom Components**: Range inputs, animations

### ✅ Available Components (110+)

The library provides three levels of components for different use cases:

#### Core UI Components (48)
Basic building blocks for your application interface.

#### Form Components
- `Button` - Primary, secondary, outline, ghost variants
- `Input` - Text inputs with validation states
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Boolean input
- `RadioGroup` - Single choice from multiple options
- `Switch` - Toggle input
- `Slider` - Range input
- `Form` - Form validation with react-hook-form

#### Layout Components
- `Card` - Content containers
- `Separator` - Visual dividers
- `Aspect Ratio` - Maintain aspect ratios
- `Resizable` - Resizable panels
- `Sidebar` - Navigation sidebar
- `Sheet` - Slide-out panels

#### Navigation Components
- `NavigationMenu` - Complex navigation
- `Menubar` - Menu bar navigation
- `Breadcrumb` - Breadcrumb navigation
- `Tabs` - Tab navigation
- `Pagination` - Page navigation

#### Data Display
- `Badge` - Status indicators
- `Avatar` - User profiles
- `Table` - Data tables
- `ReCharts` - Data visualization components (Area, Bar, Line, Pie, Radar charts)
- `Progress` - Progress indicators
- `Skeleton` - Loading placeholders

#### Feedback Components
- `Alert` - Alert messages
- `Sonner` - Toast notifications
- `Tooltip` - Helpful hints
- `Popover` - Floating content
- `Dialog` - Modal dialogs
- `AlertDialog` - Confirmation dialogs
- `Drawer` - Mobile-first modals

#### Interactive Components
- `Command` - Command palette
- `Calendar` - Date picker
- `Carousel` - Content carousel
- `Collapsible` - Expandable content
- `Accordion` - FAQ-style content
- `Toggle` - Toggle buttons
- `DropdownMenu` - Context menus
- `ContextMenu` - Right-click menus
- `HoverCard` - Hover-triggered content

#### Mies X Extended Components (13)

Access advanced components via `@tanqory/mies/x`:

##### Enhanced Input Components
- `Chips` - Tag input with add/remove functionality
- `RangeEnhanced` - Advanced range slider with progress visualization
- `AutocompleteEnhanced` - Search with filtering and custom options

##### Dashboard & Layout Components
- `CalloutCard` - Call-to-action cards with illustrations
- `EmptyState` - Empty state screens with actions and illustrations
- `Page` - Layout structure with headers, actions, breadcrumbs, pagination
- `TopBar` - App navigation with search, notifications, user menu
- `IndexFilters` - Advanced table filtering with search, filters, sorting, tabs

##### Interactive Components
- `Notification` - Toast-style notifications with auto-dismiss
- `PopupEnhanced` - Enhanced popover with advanced features
- `CounterAnimation` - Animated number counters with easing
- `DragDrop` - Sortable lists with drag & drop functionality
- `DropZone` - File upload with drag & drop support

#### Component Blocks (50+)
Pre-built complex components for rapid development. Import from main library.

##### 🎬 Animation Blocks
```tsx
import { AnimationBlocks } from '@tanqory/mies'
// or individual imports:
import { CountUpCard, TextReveal, AnimateCountUp } from '@tanqory/mies'
```

- `CountUpCard` - Animated statistics cards with trend indicators
- `TextReveal` - Smooth text reveal animations with staggered timing
- `ScrollToTop` - Scroll-to-top with threshold detection
- `AnimateCountUp` - Number counter animations with easing
- `AnimateText` - Typewriter text effects
- `BackToTopButton` - Back to top with smooth scrolling
- `MotionContainer` - Container with entrance animations

##### 🖼️ Media Blocks
```tsx
import { MediaBlocks } from '@tanqory/mies'
// or individual imports:
import { ImageGallery, MediaCarousel } from '@tanqory/mies'
```

- `ImageGallery` - Photo gallery with lightbox modal
- `MediaCarousel` - Multi-media slider with navigation
- `FileUploader` - File upload with drag & drop support
- `ImageCarousel` - Image-specific carousel component
- `TestimonialCarousel` - Customer testimonials slider
- `ProductCarousel` - Product showcase carousel

##### 📊 Data Visualization Blocks
```tsx
import { DataVizBlocks } from '@tanqory/mies'
// or individual imports:
import { StatsCards, ChartWidget, AnalyticsChart } from '@tanqory/mies'
```

- `StatsCards` - Statistics card grids with animations
- `ChartWidget` - Chart container with controls
- `AnalyticsChart` - Analytics-specific chart layouts
- `DashboardCharts` - Dashboard chart collections
- `DataTableAdvanced` - Enhanced data tables with advanced features

##### 🧭 Navigation Blocks
```tsx
import { NavigationBlocks } from '@tanqory/mies'
// or individual imports:
import { BlockBreadcrumbs, BreadcrumbNav } from '@tanqory/mies'
```

- `Breadcrumbs` - Basic breadcrumb navigation
- `BreadcrumbNav` - Enhanced breadcrumb with icons
- `MegaMenu` - Complex dropdown navigation menus
- `Sidebar` - Collapsible navigation sidebar

##### 📝 Form Blocks
```tsx
import { FormBlocks } from '@tanqory/mies'
// or individual imports:
import { ContactForm, LoginForm, SearchBar } from '@tanqory/mies'
```

- `ContactForm` - Ready-to-use contact forms
- `LoginForm` - Authentication form layouts
- `SearchBar` - Advanced search input with filters
- `CountrySelect` - Country selection dropdown
- `MultiStepForm` - Multi-step form wizard
- `ProgressStepper` - Form progress indicators

##### 🏗️ Layout Blocks
```tsx
import { LayoutBlocks } from '@tanqory/mies'
// or individual imports:
import { HeroSection, FeatureGrid, Footer } from '@tanqory/mies'
```

- `HeroSection` - Landing page hero sections
- `FeatureGrid` - Feature showcase grids
- `Footer` - Website footer layouts

##### 💬 Dialog Blocks
```tsx
import { DialogBlocks } from '@tanqory/mies'
// or individual imports:
import { BlockConfirmDialog, useToast, toast } from '@tanqory/mies'
```

- `ConfirmDialog` - Confirmation modal dialogs
- `ToastProvider` - Toast notification provider
- `useToast` - Toast notification hook
- `toast` - Toast notification function

##### 🛠️ Utility Blocks
```tsx
import { UtilityBlocks } from '@tanqory/mies'
// or individual imports:
import { ColorPicker, LoadingSpinner, EmptyState } from '@tanqory/mies'
```

- `ColorPicker` - Color selection tools
- `LoadingSpinner` - Loading state indicators
- `EmptyState` - Empty state screen layouts

## Design System

### Colors
- **Primary**: Black (#000000) - buttons, text, borders
- **Background**: White (#FFFFFF) - backgrounds, contrast text
- **Accent**: Tanqory Yellow (#E1FF00) - active/success states only

### Usage Guidelines
- Use **Black** for primary actions, text, and borders
- Use **White** for backgrounds and contrast text
- Use **Tanqory Yellow** only for active states and success indicators
- Maintain high contrast between elements
- Support both light and dark modes

## TypeScript Support

All components include comprehensive TypeScript definitions:

```tsx
import { ButtonProps, CardProps } from '@tanqory/mies'

interface CustomButtonProps extends ButtonProps {
  customProp?: string
}

const MyButton: React.FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <Button {...props} />
}
```

## Advanced Usage

### Mies X Extended Components

Access advanced dashboard and interactive components:

```tsx
import { Button, Card } from '@tanqory/mies'
import {
  TopBar,
  Page,
  IndexFilters,
  CalloutCard,
  EmptyState,
  DropZone
} from '@tanqory/mies/x'

function AdminDashboard() {
  return (
    <div>
      <TopBar
        logo={{ source: "/logo.png", alt: "Admin Panel" }}
        searchField={<TopBar.SearchField placeholder="Search anything..." />}
        userMenu={{
          name: "Admin User",
          detail: "admin@company.com",
          actions: [
            {
              items: [
                { content: "Profile", onAction: () => {} },
                { content: "Settings", onAction: () => {} },
                { content: "Sign out", onAction: () => {} }
              ]
            }
          ]
        }}
        notifications={{ count: 3, onAction: () => {} }}
      />

      <Page
        title="Users Management"
        subtitle="Manage user accounts and permissions"
        primaryAction={{ content: "Add User", onAction: () => {} }}
        secondaryActions={[
          { content: "Export", onAction: () => {} },
          { content: "Import", onAction: () => {} }
        ]}
      >
        <IndexFilters
          tabs={[
            { id: "all", content: "All Users", badge: "150" },
            { id: "active", content: "Active", badge: "120" },
            { id: "inactive", content: "Inactive", badge: "30" }
          ]}
          filters={[
            {
              key: "role",
              label: "Role",
              type: "select",
              options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" }
              ]
            }
          ]}
          sortOptions={[
            { label: "Name A-Z", value: "name-asc" },
            { label: "Name Z-A", value: "name-desc" },
            { label: "Date created", value: "created-desc" }
          ]}
        />

        <EmptyState
          heading="No users found"
          image="/empty-users.svg"
          action={{ content: "Add first user", onAction: () => {} }}
        >
          Get started by adding your first user to the system.
        </EmptyState>
      </Page>
    </div>
  )
}
```

### Icons and Charts

Access 1000+ Lucide icons and chart components:

```tsx
import { Button, LucideIcons, AreaChart } from '@tanqory/mies'
import { CounterAnimation, Chips } from '@tanqory/mies/x'

function Dashboard() {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
  ]

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <CounterAnimation end={1234} prefix="$" suffix="K" />
          <p className="text-sm text-muted-foreground">Revenue</p>
        </Card>
      </div>

      <Chips
        chips={[{ id: '1', label: 'React', value: 'react' }]}
        placeholder="Add technologies..."
        onChipsChange={(chips) => console.log(chips)}
      />

      <AreaChart
        width={400}
        height={300}
        data={data}
        className="mt-4"
      />
    </div>
  )
}
```

### Component Blocks Usage

Build complex UIs rapidly with pre-built blocks:

```tsx
import '@tanqory/mies/styles.css'
import {
  ThemeProvider,
  AnimationBlocks,
  LayoutBlocks,
  MediaBlocks,
  DataVizBlocks,
  FormBlocks
} from '@tanqory/mies'

function LandingPage() {
  const galleryImages = [
    { src: "/portfolio/1.jpg", alt: "Project 1" },
    { src: "/portfolio/2.jpg", alt: "Project 2" },
    { src: "/portfolio/3.jpg", alt: "Project 3" }
  ]

  const statsData = [
    { title: "Projects Completed", value: 150, suffix: "+", trend: "up", change: "+12%" },
    { title: "Happy Clients", value: 98, suffix: "%", trend: "up", change: "+5%" },
    { title: "Years Experience", value: 8, suffix: "+", trend: "stable", change: "" }
  ]

  return (
    <ThemeProvider defaultTheme="light">
      {/* Hero Section */}
      <LayoutBlocks.HeroSection
        title="Build Amazing Applications"
        subtitle="Professional web solutions with modern technology"
        backgroundImage="/hero-background.jpg"
        actions={[
          { content: "Get Started", primary: true, onAction: () => {} },
          { content: "View Portfolio", onAction: () => {} }
        ]}
      />

      {/* Animated Statistics */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <AnimationBlocks.TextReveal
            text="Our Achievements"
            delay={0}
            className="text-3xl font-bold text-center mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <AnimationBlocks.CountUpCard
                key={index}
                title={stat.title}
                value={stat.value}
                suffix={stat.suffix}
                trend={stat.trend}
                change={stat.change}
                className="text-center"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Work</h2>
          <MediaBlocks.ImageGallery
            images={galleryImages}
            columns={{ base: 1, md: 2, lg: 3 }}
            lightbox={true}
          />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimationBlocks.TextReveal
            text="Get In Touch"
            delay={0}
            className="text-3xl font-bold text-center mb-8"
          />

          <FormBlocks.ContactForm
            onSubmit={(data) => console.log('Contact form:', data)}
            showMessage={true}
            className="space-y-6"
          />
        </div>
      </section>

      {/* Footer */}
      <LayoutBlocks.Footer
        company={{
          name: "Your Company",
          description: "Building the future of web applications"
        }}
        links={[
          {
            title: "Company",
            links: [
              { label: "About", href: "/about" },
              { label: "Careers", href: "/careers" }
            ]
          },
          {
            title: "Support",
            links: [
              { label: "Help Center", href: "/help" },
              { label: "Contact", href: "/contact" }
            ]
          }
        ]}
        social={[
          { platform: "twitter", href: "#" },
          { platform: "github", href: "#" }
        ]}
      />

      {/* Back to Top */}
      <AnimationBlocks.BackToTopButton threshold={300} />
    </ThemeProvider>
  )
}
```

### Block Collections for Organized Imports

```tsx
// Import entire block collections
import { AnimationBlocks, MediaBlocks } from '@tanqory/mies'

function Dashboard() {
  return (
    <div>
      {/* Using Animation Block Collection */}
      <AnimationBlocks.CountUpCard
        title="Total Revenue"
        value={125000}
        prefix="$"
      />

      <AnimationBlocks.MotionContainer>
        <h2>Animated Section</h2>
        <p>This content will animate in smoothly</p>
      </AnimationBlocks.MotionContainer>

      {/* Using Media Block Collection */}
      <MediaBlocks.TestimonialCarousel
        testimonials={[
          {
            quote: "Amazing product and great support!",
            author: "John Doe",
            company: "Tech Corp",
            avatar: "/avatar1.jpg"
          }
        ]}
      />
    </div>
  )
}
```

### Mix and Match: Blocks + Core Components + Mies X

```tsx
import { Button, Card, Badge, LucideIcons } from '@tanqory/mies'
import { TopBar, CalloutCard } from '@tanqory/mies/x'
import { AnimationBlocks, DataVizBlocks } from '@tanqory/mies'

function ComprehensiveApp() {
  return (
    <div>
      {/* Mies X Extended Component */}
      <TopBar
        logo={{ source: "/logo.png", alt: "App" }}
        userMenu={{ name: "User", actions: [] }}
      />

      {/* Layout with Core Components + Blocks */}
      <div className="p-6">
        <Card className="mb-6">
          {/* Animation Block */}
          <AnimationBlocks.CountUpCard
            title="Active Users"
            value={1234}
            suffix="+"
          />
        </Card>

        {/* Core Components */}
        <div className="flex gap-4 mb-6">
          <Button>
            <LucideIcons.Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
          <Badge variant="success">Online</Badge>
        </div>

        {/* Data Visualization Block */}
        <DataVizBlocks.ChartWidget
          title="User Growth"
          type="area"
          data={chartData}
        />

        {/* Mies X Extended Component */}
        <CalloutCard
          title="Upgrade to Pro"
          primaryAction={{ content: "Upgrade", onAction: () => {} }}
        >
          Get advanced analytics and priority support
        </CalloutCard>
      </div>
    </div>
  )
}
```

### Theme Customization

```tsx
import { ThemeProvider, useTheme } from '@tanqory/mies'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <LucideIcons.Sun className="h-4 w-4 dark:hidden" />
      <LucideIcons.Moon className="h-4 w-4 hidden dark:block" />
    </Button>
  )
}
```

### Custom Styling

All components accept `className` for additional customization:

```tsx
<Button className="bg-gradient-to-r from-primary to-accent">
  Gradient Button
</Button>

<Card className="border-2 border-accent/20 shadow-lg">
  <CardContent>Custom styled card</CardContent>
</Card>
```

## Key Features

### 🔋 Batteries Included
- **No additional setup required** - Just import and use
- **Complete Tailwind CSS** - All utilities included in bundle
- **Dark/Light themes** - Automatic switching
- **TypeScript ready** - Full type safety
- **110+ Components** - Core UI + Extended Components + Pre-built Blocks

### 🎨 Consistent Design
- **Tanqory brand colors** - Black, White, Yellow palette
- **Accessible components** - ARIA compliant
- **Responsive design** - Mobile-first approach
- **Professional typography** - Consistent text scales

### ⚡ Performance Optimized
- **Tree shakeable** - Import only what you use
- **Small bundle size** - Optimized for production
- **Fast rendering** - Built on Radix UI primitives
- **Flexible imports** - Individual components, collections, or entire categories
- **Pre-built blocks** - Complex patterns ready to use without custom code

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Development

```bash
# Clone the repository
git clone https://github.com/tanqory/mies

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run Storybook for component documentation
npm run storybook
```

## Quick Reference

### Component Hierarchy
```
@tanqory/mies
├── Core UI Components (48) - Basic building blocks
├── Mies X Extended (/x) (13) - Advanced dashboard components
└── Component Blocks (50+) - Pre-built complex patterns
    ├── AnimationBlocks - Counters, reveals, motion
    ├── MediaBlocks - Gallery, carousels, uploads
    ├── DataVizBlocks - Charts, tables, stats
    ├── NavigationBlocks - Breadcrumbs, menus, sidebar
    ├── FormBlocks - Forms, wizards, inputs
    ├── LayoutBlocks - Hero, features, footer
    ├── DialogBlocks - Modals, toasts, confirmations
    └── UtilityBlocks - Colors, loading, empty states
```

### Import Patterns
```tsx
// Option 1: Individual components
import { Button, Card, CountUpCard } from '@tanqory/mies'

// Option 2: Block collections
import { AnimationBlocks, MediaBlocks } from '@tanqory/mies'

// Option 3: Extended components
import { TopBar, CalloutCard } from '@tanqory/mies/x'

// Option 4: Mixed approach (recommended)
import { Button, AnimationBlocks } from '@tanqory/mies'
import { TopBar } from '@tanqory/mies/x'
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Tanqory](https://github.com/tanqory)