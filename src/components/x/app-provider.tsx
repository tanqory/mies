"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

export interface AppProviderFeatures {
  i18n?: {
    locale?: string
    fallbackLocale?: string
    translations?: Record<string, Record<string, string>>
  }
  theme?: {
    colorScheme?: "light" | "dark" | "system"
    storageKey?: string
  }
  toast?: {
    position?: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right"
    duration?: number
  }
  mediaQuery?: {
    breakpoints?: {
      mobile?: number
      tablet?: number
      desktop?: number
    }
  }
}

export interface AppProviderProps {
  children: React.ReactNode
  features?: AppProviderFeatures
  onError?: (error: Error) => void
}

// Context for app-wide configuration
const AppContext = React.createContext<{
  features: AppProviderFeatures
  onError?: (error: Error) => void
} | null>(null)

// Hook to access app context
export const useApp = () => {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

// I18n Context
const I18nContext = React.createContext<{
  locale: string
  t: (key: string, params?: Record<string, string>) => string
  setLocale: (locale: string) => void
} | null>(null)

export const useI18n = () => {
  const context = React.useContext(I18nContext)
  if (!context) {
    return {
      locale: "en",
      t: (key: string) => key,
      setLocale: () => {},
    }
  }
  return context
}

// Media Query Context
const MediaQueryContext = React.createContext<{
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  breakpoints: {
    mobile: number
    tablet: number
    desktop: number
  }
} | null>(null)

export const useMediaQuery = () => {
  const context = React.useContext(MediaQueryContext)
  if (!context) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      breakpoints: { mobile: 640, tablet: 768, desktop: 1024 },
    }
  }
  return context
}

// I18n Provider Component
const I18nProvider: React.FC<{
  children: React.ReactNode
  config?: AppProviderFeatures["i18n"]
}> = ({ children, config }) => {
  const [locale, setLocale] = React.useState(config?.locale || "en")

  const t = React.useCallback(
    (key: string, params?: Record<string, string>) => {
      const translations = config?.translations?.[locale] || {}
      let translation = translations[key] || key

      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          translation = translation.replace(`{{${param}}}`, value)
        })
      }

      return translation
    },
    [locale, config?.translations]
  )

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

// Media Query Provider Component
const MediaQueryProvider: React.FC<{
  children: React.ReactNode
  config?: AppProviderFeatures["mediaQuery"]
}> = ({ children, config }) => {
  const breakpoints = {
    mobile: config?.breakpoints?.mobile || 640,
    tablet: config?.breakpoints?.tablet || 768,
    desktop: config?.breakpoints?.desktop || 1024,
  }

  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  )

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = windowWidth < breakpoints.tablet
  const isTablet = windowWidth >= breakpoints.tablet && windowWidth < breakpoints.desktop
  const isDesktop = windowWidth >= breakpoints.desktop

  return (
    <MediaQueryContext.Provider
      value={{ isMobile, isTablet, isDesktop, breakpoints }}
    >
      {children}
    </MediaQueryContext.Provider>
  )
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError?: (error: Error) => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
            <p className="text-muted-foreground">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Main App Provider Component
const AppProvider: React.FC<AppProviderProps> = ({
  children,
  features = {},
  onError,
}) => {
  return (
    <ErrorBoundary onError={onError}>
      <AppContext.Provider value={{ features, onError }}>
        <ThemeProvider
          defaultTheme={(features.theme?.colorScheme as any) || "system"}
          storageKey={features.theme?.storageKey || "tanqory-ui-theme"}
        >
          <I18nProvider config={features.i18n}>
            <MediaQueryProvider config={features.mediaQuery}>
              {children}
            </MediaQueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </AppContext.Provider>
    </ErrorBoundary>
  )
}

AppProvider.displayName = "AppProvider"

export { AppProvider }