# @tanqory/mies - React.js 18 Example

A comprehensive showcase of the `@tanqory/mies` component library in a production-ready React.js 18 application with Create React App.

## 🚀 Features

- ✅ **React 18** - Latest React with concurrent features
- ✅ **Create React App 5** - Zero-configuration development setup
- ✅ **TypeScript** - Full type safety and IntelliSense
- ✅ **@tanqory/mies Components** - 48+ modern UI components
- ✅ **Dark/Light Theme** - Seamless theme switching with persistence
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Interactive Examples** - Real component interactions and demos
- ✅ **Hot Reload** - Instant development feedback
- ✅ **Production Ready** - Optimized build and deployment ready

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
├── App.tsx             # Main application component
├── index.tsx           # React application entry point
├── index.css           # Global styles and @tanqory/mies import
├── tanqory-mies.css    # Component library styles (CRA compatible)
└── ...
```

## 🎯 Components Showcased

### 🔘 Form Elements
- **Buttons** - All variants with size options and states
- **Input Fields** - Text inputs with proper form handling
- **Textareas** - Multi-line text input with validation
- **Checkboxes** - Single and multi-select with proper state management
- **Switches** - Toggle controls for settings and preferences
- **Form Validation** - Real-time validation feedback

### 📊 Data Display
- **Badges** - Status indicators with semantic colors
- **Avatars** - User profile images with intelligent fallbacks
- **Progress Bars** - Loading states and completion tracking
- **Skeletons** - Loading placeholders for better UX
- **Cards** - Flexible content containers with headers

### 🧭 Navigation & Layout
- **Tabs** - Content organization with keyboard navigation
- **Dashboard Layout** - Professional dashboard interface
- **Responsive Grid** - CSS Grid and Flexbox layouts

### 🎨 Theming & Styling
- **Theme Toggle** - Instant dark/light mode switching
- **Theme Persistence** - LocalStorage-based preference saving
- **Smooth Transitions** - CSS transitions for theme changes
- **Custom Properties** - CSS custom properties for theming

## 🔧 Key Implementation Details

### Theme Provider Setup
```tsx
// App.tsx
import { ThemeProvider } from '@tanqory/mies';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="tanqory-react-theme"
    >
      <ComponentShowcase />
    </ThemeProvider>
  );
}
```

### Theme Toggle Component
```tsx
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button disabled>Loading...</Button>;
  }

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙' : '🌞'} Toggle Theme ({theme})
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

- **React 18** - Latest React with concurrent rendering
- **Create React App 5** - Modern build tooling and configuration
- **TypeScript 4** - Enhanced type safety and IntelliSense
- **@tanqory/mies** - Modern component library with Tailwind CSS
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
- Check that `@import '@tanqory/mies/styles.css';` is in `src/index.css`
- Ensure the CSS file path is correct for your setup

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
