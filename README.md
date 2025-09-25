# @tanqory/mies

A comprehensive UI component library built with React, TypeScript, and Tailwind CSS, following the Tanqory Design System guidelines.

## Features

- 🎨 **Consistent Design System** - Black, White & Tanqory Yellow (#E1FF00) palette
- 📱 **48+ React Components** - Built on Radix UI primitives
- 🎯 **TypeScript Support** - Full type safety and intellisense
- 🌙 **Dark/Light Mode** - Built-in theme switching
- 🎪 **Tailwind CSS** - Complete utility classes included
- 📦 **Tree Shakeable** - Import only what you need
- ♿ **Accessible** - WAI-ARIA compliant components
- 🎭 **LucideIcons** - 1000+ icons via namespace export
- 📊 **ReCharts Integration** - Built-in chart components
- ⚛️ **React.js & Next.js** - Full support for both frameworks

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

function App() {
  return (
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

### ✅ Available Components (48+)

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

### Icons and Charts

Access 1000+ Lucide icons and chart components:

```tsx
import { Button, LucideIcons, AreaChart } from '@tanqory/mies'

function Dashboard() {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
  ]

  return (
    <div>
      <Button>
        <LucideIcons.Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>

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

### 🎨 Consistent Design
- **Tanqory brand colors** - Black, White, Yellow palette
- **Accessible components** - ARIA compliant
- **Responsive design** - Mobile-first approach
- **Professional typography** - Consistent text scales

### ⚡ Performance Optimized
- **Tree shakeable** - Import only what you use
- **Small bundle size** - Optimized for production
- **Fast rendering** - Built on Radix UI primitives

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
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Tanqory](https://github.com/tanqory)