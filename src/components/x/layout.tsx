"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const layoutVariants = cva("min-h-screen", {
  variants: {
    variant: {
      default: "flex flex-col",
      sidebar: "flex",
      fullscreen: "flex flex-col h-screen",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface LayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  as?: React.ElementType
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, as = "div", variant, children, ...props }, ref) => {
    const Component = as

    return (
      <Component
        className={cn(layoutVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Layout.displayName = "Layout"

// Layout Section component for major layout areas
const layoutSectionVariants = cva("", {
  variants: {
    variant: {
      header: "bg-background border-b",
      main: "flex-1",
      sidebar: "w-64 bg-muted/30 border-r",
      footer: "bg-background border-t",
      content: "flex-1 p-6",
    },
    oneHalf: {
      true: "flex-1",
      false: "",
    },
    secondary: {
      true: "w-80",
      false: "",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    oneHalf: false,
    secondary: false,
    fullWidth: false,
  },
})

export interface LayoutSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutSectionVariants> {
  as?: React.ElementType
}

const LayoutSection = React.forwardRef<HTMLDivElement, LayoutSectionProps>(
  (
    {
      className,
      as = "div",
      variant,
      oneHalf,
      secondary,
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as

    return (
      <Component
        className={cn(
          layoutSectionVariants({
            variant,
            oneHalf,
            secondary,
            fullWidth,
          }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

LayoutSection.displayName = "LayoutSection"

// Layout Annotated Section for forms and settings pages
export interface LayoutAnnotatedSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  as?: React.ElementType
}

const LayoutAnnotatedSection = React.forwardRef<
  HTMLDivElement,
  LayoutAnnotatedSectionProps
>(
  (
    { className, as = "div", title, description, children, ...props },
    ref
  ) => {
    const Component = as

    return (
      <Component
        className={cn("grid gap-6 md:grid-cols-3", className)}
        ref={ref}
        {...props}
      >
        <div className="space-y-2">
          {title && (
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="md:col-span-2">{children}</div>
      </Component>
    )
  }
)

LayoutAnnotatedSection.displayName = "LayoutAnnotatedSection"

export {
  Layout,
  LayoutSection,
  LayoutAnnotatedSection,
  layoutVariants,
  layoutSectionVariants,
}