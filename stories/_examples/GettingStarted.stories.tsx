import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/ui/button';

const meta: Meta = {
  title: 'Examples/Getting Started',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete guide on how to install and setup @tanqory/mies in your project.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Installation: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Installation</h2>
        <p className="text-muted-foreground mb-6">
          Get started with @tanqory/mies by installing it via npm or yarn.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Install with npm:</h3>
          <code className="text-sm">npm install @tanqory/mies</code>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Install with yarn:</h3>
          <code className="text-sm">yarn add @tanqory/mies</code>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Install with pnpm:</h3>
          <code className="text-sm">pnpm add @tanqory/mies</code>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'How to install @tanqory/mies in your project',
      },
      source: {
        code: `# Install @tanqory/mies
npm install @tanqory/mies

# or with yarn
yarn add @tanqory/mies

# or with pnpm
pnpm add @tanqory/mies`,
      },
    },
  },
};

export const Setup: Story = {
  render: () => <Button>Example Button</Button>,
  parameters: {
    docs: {
      description: {
        story: 'Setup CSS and configuration for your project',
      },
      source: {
        code: `// 1. Import the CSS in your main CSS file or _app.tsx (Next.js)
import '@tanqory/mies/styles.css';

// 2. Add the Tailwind preset to your tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tanqory/mies/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  presets: [require('@tanqory/mies/tailwind-preset')],
  plugins: [],
}

// 3. Start using components
import { Button } from '@tanqory/mies';

export default function MyApp() {
  return (
    <div>
      <Button>Hello World</Button>
    </div>
  );
}`,
      },
    },
  },
};

export const NextJSSetup: Story = {
  render: () => <Button>Next.js Setup</Button>,
  parameters: {
    docs: {
      description: {
        story: 'Complete Next.js setup guide',
      },
      source: {
        code: `// pages/_app.tsx or app/layout.tsx (App Router)
import '@tanqory/mies/styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tanqory/mies/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  presets: [require('@tanqory/mies/tailwind-preset')],
  plugins: [],
}

// Usage in a page
import { Button, Card, CardContent, CardHeader, CardTitle } from '@tanqory/mies';

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to @tanqory/mies</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Start building beautiful UIs with our component library.</p>
          <Button className="mt-4">Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}`,
      },
    },
  },
};

export const TypeScriptSetup: Story = {
  render: () => <Button>TypeScript Ready</Button>,
  parameters: {
    docs: {
      description: {
        story: 'TypeScript configuration and usage',
      },
      source: {
        code: `// @tanqory/mies comes with built-in TypeScript support
// No additional configuration needed!

// tsconfig.json (recommended settings)
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}

// Usage with full type safety
import { Button, ButtonProps } from '@tanqory/mies';
import { ComponentProps } from 'react';

interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

export function MyButton({ customProp, ...props }: MyButtonProps) {
  return <Button {...props}>Custom Button</Button>;
}`,
      },
    },
  },
};