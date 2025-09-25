'use client';

import { ThemeProvider } from '@tanqory/mies';

export function Providers({ children }: { children: React.ReactNode }) {
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