import React, { useState } from 'react';
import { ThemeProvider, LucideIcons } from '@tanqory/mies';
import { PageLayout } from './components/Navigation';
import HomePage from './pages/HomePage';
import ComponentsPage from './pages/ComponentsPage';
import FoundationPage from './pages/FoundationPage';

// Simple routing component
interface Route {
  path: string;
  component: React.ComponentType<any>;
  title: string;
}

const routes: Route[] = [
  { path: '/', component: HomePage, title: 'Home' },
  { path: '/components', component: ComponentsPage, title: 'Components' },
  { path: '/foundation', component: FoundationPage, title: 'Foundation' },
  { path: '/mies-x', component: () => <PlaceholderPage title="Mies X Extended Components" description="Advanced dashboard components for complex applications" />, title: 'Mies X' },
  { path: '/animation', component: () => <PlaceholderPage title="Animation Blocks" description="Count-up animations, text reveals, and motion containers" />, title: 'Animation' },
  { path: '/carousel', component: () => <PlaceholderPage title="Media Blocks" description="Image galleries, carousels with autoplay and thumbnails" />, title: 'Media' },
  { path: '/charts', component: () => <PlaceholderPage title="DataViz Blocks" description="Charts, tables, and data visualization components" />, title: 'Charts' },
  { path: '/form-wizard', component: () => <PlaceholderPage title="Form Blocks" description="Multi-step forms, wizards with validation and progress" />, title: 'Forms' },
  { path: '/layout', component: () => <PlaceholderPage title="Layout Blocks" description="Hero sections, feature grids, and footer layouts" />, title: 'Layout' },
  { path: '/navigation', component: () => <PlaceholderPage title="Navigation Blocks" description="Navigation menus, breadcrumbs, and sidebar components" />, title: 'Navigation' },
  { path: '/upload', component: () => <PlaceholderPage title="Upload Blocks" description="File upload with drag & drop and progress tracking" />, title: 'Upload' },
  { path: '/dnd', component: () => <PlaceholderPage title="DND Blocks" description="Drag & drop: sortable lists, kanban boards, drop zones" />, title: 'DND' },
  { path: '/multi-language', component: () => <PlaceholderPage title="Multi-Language" description="Internationalization with language switching support" />, title: 'i18n' },
  { path: '/utilities', component: () => <PlaceholderPage title="Utility Blocks" description="Color pickers, loading states, and empty state screens" />, title: 'Utilities' },
  { path: '/dashboard', component: () => <PlaceholderPage title="Dashboard Demo" description="Complete dashboard examples with real-world use cases" />, title: 'Dashboard' },
  { path: '/forms', component: () => <PlaceholderPage title="Form Examples" description="Comprehensive form examples and patterns" />, title: 'Form Examples' },
];

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-xl text-muted-foreground">{description}</p>
        <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
              <LucideIcons.Construction className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Coming Soon</h3>
              <p className="text-muted-foreground">
                This section is under development. Check back soon for comprehensive examples and documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    // In a real app, you'd use React Router or similar
    window.history.pushState({}, '', path);
  };

  // Find current route
  const currentRoute = routes.find(route => route.path === currentPath) || routes[0];
  const CurrentComponent = currentRoute.component;

  // Handle browser back/forward
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Set initial path from URL
  React.useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="tanqory-react-theme"
    >
      <PageLayout currentPath={currentPath} onNavigate={handleNavigate}>
        <CurrentComponent onNavigate={handleNavigate} />
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;