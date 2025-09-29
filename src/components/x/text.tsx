import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../ui/utils"

const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        headingXs: "text-sm font-semibold",
        headingSm: "text-base font-semibold",
        headingMd: "text-lg font-semibold",
        headingLg: "text-xl font-semibold",
        headingXl: "text-2xl font-semibold",
        heading2xl: "text-3xl font-semibold",
        heading3xl: "text-4xl font-semibold",
        bodyXs: "text-xs",
        bodySm: "text-sm",
        bodyMd: "text-base",
        bodyLg: "text-lg",
      },
      tone: {
        inherit: "text-inherit",
        subdued: "text-muted-foreground",
        critical: "text-destructive",
        warning: "text-yellow-600 dark:text-yellow-400",
        success: "text-green-600 dark:text-green-400",
        primary: "text-primary",
        info: "text-blue-600 dark:text-blue-400",
      },
      alignment: {
        start: "text-left",
        center: "text-center",
        end: "text-right",
        justify: "text-justify",
      },
      fontWeight: {
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      textDecorationLine: {
        none: "no-underline",
        underline: "underline",
        lineThrough: "line-through",
      },
    },
    defaultVariants: {
      variant: "bodyMd",
      tone: "inherit",
      alignment: "start",
      fontWeight: "regular",
      textDecorationLine: "none",
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  truncate?: boolean
  visuallyHidden?: boolean
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({
    className,
    variant,
    tone,
    alignment,
    fontWeight,
    textDecorationLine,
    children,
    as,
    truncate,
    visuallyHidden,
    ...props
  }, ref) => {
    // Determine the HTML element based on variant or as prop
    let Component: keyof JSX.IntrinsicElements = as || "span"

    if (!as) {
      if (variant?.startsWith("heading")) {
        Component = "h2"
      } else if (variant?.startsWith("body")) {
        Component = "p"
      }
    }

    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          textVariants({
            variant,
            tone,
            alignment,
            fontWeight,
            textDecorationLine,
          }),
          truncate && "truncate",
          visuallyHidden && "sr-only",
          className
        ),
        ...props,
      },
      children
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }