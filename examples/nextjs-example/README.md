# @tanqory/mies - Next.js 15 Example

A comprehensive showcase of the `@tanqory/mies` component library in a production-ready Next.js 15 application with App Router.

## 🚀 Features

- ✅ **Next.js 15 App Router** - Latest routing architecture with Turbopack
- ✅ **TypeScript** - Full type safety and IntelliSense
- ✅ **@tanqory/mies Components** - 48+ modern UI components
- ✅ **Dark/Light Theme** - Seamless theme switching with persistence
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Interactive Examples** - Real component interactions and demos
- ✅ **SSR Compatible** - Server-side rendering without hydration issues
- ✅ **Production Ready** - Optimized build and deployment ready

## 🏃‍♂️ Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open your browser:**
```bash
open http://localhost:3000
```

4. **Build for production:**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and @tanqory/mies import
│   ├── layout.tsx       # Root layout with metadata and providers
│   ├── providers.tsx    # Client-side ThemeProvider wrapper
│   └── page.tsx         # Component showcase page
└── ...
```

## 🎯 Components Showcased

### 🔘 Form Elements
- **Buttons** - Primary, Secondary, Outline, Ghost, Destructive variants
- **Input Fields** - Text inputs with validation states
- **Textareas** - Multi-line text input with auto-resize
- **Checkboxes** - Single and multi-select options
- **Switches** - Toggle controls for settings
- **Form Controls** - Complete form interaction examples

### 📊 Data Display
- **Badges** - Status indicators with multiple variants
- **Avatars** - User profile images with fallbacks
- **Progress Bars** - Loading and completion indicators
- **Skeletons** - Loading state placeholders
- **Cards** - Content containers with headers and actions

### 🧭 Navigation & Layout
- **Tabs** - Content organization with multiple sections
- **Dashboard Cards** - Interactive data visualization
- **Responsive Grid** - Adaptive layout system

### 🎨 Theming & Styling
- **Dark/Light Toggle** - Seamless theme switching
- **Theme Persistence** - Remembers user preference
- **SSR-Safe Hydration** - No flash of wrong theme
- **Smooth Transitions** - Animated theme changes

## 🔧 Key Implementation Details

### SSR-Safe Theme Provider
```tsx
// app/providers.tsx
'use client';
import { ThemeProvider } from '@tanqory/mies';

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="tanqory-nextjs-theme"
    >
      {children}
    </ThemeProvider>
  );
}
```

### Hydration-Safe Theme Toggle
```tsx
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button disabled>Loading...</Button>;
  }

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙' : '🌞'} Toggle Theme
    </Button>
  );
}
```

### Component Usage
```tsx
import {
  Button,
  Card,
  Badge,
  Input,
  useTheme
} from '@tanqory/mies';

export default function MyPage() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Button variant="primary">Get Started</Button>
        <Badge variant="success">Online</Badge>
        <Input placeholder="Enter your name" />
      </div>
    </Card>
  );
}
```

## 🛠 Technologies

- **Next.js 15** - React framework with App Router & Turbopack
- **React 18** - Latest React with concurrent features
- **TypeScript 5** - Enhanced type safety and developer experience
- **@tanqory/mies** - Modern UI component library
- **Tailwind CSS 3** - Utility-first CSS framework
- **next-themes** - Theme management with SSR support

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
Create a `.env.local` file for custom configuration:
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [@tanqory/mies Docs](https://github.com/tanqory/mies) - Component library documentation
- [Deployment Guide](https://nextjs.org/docs/deployment) - Deploy your Next.js app
- [TypeScript Guide](https://nextjs.org/docs/basic-features/typescript) - TypeScript in Next.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using @tanqory/mies component library**

Ready for production • Optimized for performance • Accessible by design
