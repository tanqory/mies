# @tanqory/mies - React.js 19 Example

A comprehensive showcase of the `@tanqory/mies` component library in a production-ready React.js 19 application with Create React App.

## 🚀 Features

- ✅ **React 19** - Latest React with cutting-edge features
- ✅ **Create React App 5** - Zero-configuration development setup
- ✅ **TypeScript** - Full type safety and IntelliSense
- ✅ **@tanqory/mies Components** - 110+ modern UI components
- ✅ **Dark/Light Theme** - Seamless theme switching with persistence
- ✅ **Responsive Design** - Mobile-first approach with CSS-in-JS
- ✅ **Interactive Examples** - Real component interactions and demos
- ✅ **Hot Reload** - Instant development feedback
- ✅ **Production Ready** - Optimized build and deployment ready
- ✅ **Comprehensive Coverage** - Core Components, Extended Components (Mies X), Component Blocks
- ✅ **Foundation Elements** - Colors, Typography, Icons, Grid System, Shadows

## 🏃‍♂️ Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm start
```

3. **Open your browser:**
```bash
open http://localhost:3000
```

4. **Build for production:**
```bash
npm run build
```

5. **Test your application:**
```bash
npm test
```

## 📜 Available Scripts

- **`npm start`** - Start development server with hot reload
- **`npm test`** - Launch test runner in interactive watch mode
- **`npm run build`** - Build optimized production bundle
- **`npm run eject`** - Eject from CRA (⚠️ one-way operation)

## 📁 Project Structure

```
src/
├── App.tsx                     # Main application with routing
├── index.tsx                   # React application entry point
├── index.css                   # Global styles and CSS variables
├── components/
│   └── Navigation.tsx          # Navigation layout component
├── pages/
│   ├── HomePage.tsx           # Homepage with component showcase
│   ├── ComponentsPage.tsx     # Core components demonstrations
│   └── FoundationPage.tsx     # Design system foundations
└── types/                     # TypeScript type definitions
```

## 🎯 Component Library Coverage

### 🏠 **Core Components (48)**
- **Buttons** - All variants (primary, secondary, outline, ghost, destructive)
- **Form Elements** - Input, Textarea, Select, Checkbox, Switch, Radio Group
- **Data Display** - Badge, Avatar, Table, Progress, Skeleton
- **Layout** - Card, Separator, Accordion, Tabs
- **Feedback** - Alert, Dialog, Progress indicators
- **Navigation** - Responsive sidebar with grouped categories

### ⚡ **Extended Components (Mies X - 13)**
- **TopBar** - Application header with logo, search, notifications
- **Page Layout** - Complete page wrapper with actions and breadcrumbs
- **Enhanced Inputs** - Chips, Range, Autocomplete with filtering
- **Advanced UI** - CalloutCard, EmptyState, DropZone, DragDrop
- **Filters** - IndexFilters with search, tabs, and sort options
- **Notifications** - Toast-style notifications with auto-dismiss

### 🧱 **Component Blocks (50+)**
- **Animation Blocks** - Count-up animations, text reveals, motion containers
- **Media Blocks** - Image galleries, carousels with autoplay and thumbnails
- **DataViz Blocks** - Charts, tables, and data visualization components
- **Form Blocks** - Multi-step forms, wizards with validation and progress
- **Layout Blocks** - Hero sections, feature grids, and footer layouts
- **Navigation Blocks** - Navigation menus, breadcrumbs, and sidebar components
- **Upload Blocks** - File upload with drag & drop and progress tracking
- **DND Blocks** - Drag & drop: sortable lists, kanban boards, drop zones
- **Multi-Language** - Internationalization with language switching support
- **Utility Blocks** - Color pickers, loading states, and empty state screens

### 🎨 **Foundation Elements**
- **Colors** - 3-color palette (Black, White, Tanqory Yellow)
- **Typography** - 12 text styles with responsive sizing
- **Icons** - 1000+ Lucide React icons via LucideIcons namespace
- **Grid System** - 12-column responsive grid with consistent spacing
- **Shadows** - 6-level elevation system for depth and hierarchy

## 🔧 Key Implementation Details

### Theme Provider Setup
```tsx
// App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from '@tanqory/mies';
import { PageLayout } from './components/Navigation';
import HomePage from './pages/HomePage';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="tanqory-react-theme"
    >
      <PageLayout currentPath={currentPath} onNavigate={handleNavigate}>
        <HomePage onNavigate={handleNavigate} />
      </PageLayout>
    </ThemeProvider>
  );
}
```

### Theme Toggle Component
```tsx
// components/Navigation.tsx
import { useTheme, Button, LucideIcons } from '@tanqory/mies';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

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
```

### Component Usage Examples
```tsx
import {
  Button,
  Card,
  Badge,
  Input,
  Checkbox,
  Switch,
  Progress
} from '@tanqory/mies';

function MyComponent() {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your email"
        />
        <Checkbox
          checked={checked}
          onCheckedChange={(c) => setChecked(c === true)}
        >
          Accept terms and conditions
        </Checkbox>
        <Button variant="primary" disabled={!checked}>
          Sign Up
        </Button>
        <Badge variant="success">Available</Badge>
        <Progress value={75} />
      </div>
    </Card>
  );
}
```

## 🛠 Technologies

- **React 19** - Latest React with cutting-edge features
- **Create React App 5** - Modern build tooling and configuration
- **TypeScript 4** - Enhanced type safety and IntelliSense
- **@tanqory/mies** - Modern component library with 110+ components
- **CSS Variables** - Theme system with CSS custom properties
- **Lucide React Icons** - 1000+ icons via LucideIcons namespace
- **Jest & Testing Library** - Comprehensive testing setup
- **ESLint & Prettier** - Code quality and formatting

## 🚀 Deployment

### Netlify (Recommended for React)
```bash
npm run build
# Drag and drop build/ folder to Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

### Static Hosting
```bash
npm run build
# Upload build/ folder to any static hosting service
```

### Docker
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in CI mode
npm test -- --ci --watchAll=false
```

## 🔍 Development Tips

### Hot Reload Issues
If hot reload stops working, try:
```bash
rm -rf node_modules/.cache
npm start
```

### Build Analysis
Analyze your bundle size:
```bash
npm install -g source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### Environment Variables
Create `.env` file for configuration:
```bash
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_VERSION=$npm_package_version
```

## 📚 Learn More

- [React Documentation](https://reactjs.org/docs) - Learn React concepts
- [Create React App Docs](https://create-react-app.dev/) - CRA features and config
- [@tanqory/mies Docs](https://github.com/tanqory/mies) - Component library guide
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript reference

## 🐛 Troubleshooting

### Common Issues

**TypeScript errors after updating:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails with memory errors:**
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**CSS not loading properly:**
- Ensure CSS variables are properly defined in `src/index.css`
- Check that component library styles are loading correctly
- Verify theme variables are set for both light and dark modes

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using @tanqory/mies component library**

Production-ready • Fully responsive • Accessible by design
