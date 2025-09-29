"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const boxVariants = cva("", {
  variants: {
    padding: {
      none: "p-0",
      "025": "p-1",
      "05": "p-2",
      "1": "p-4",
      "15": "p-6",
      "2": "p-8",
      "3": "p-12",
      "4": "p-16",
      "5": "p-20",
      "6": "p-24",
    },
    paddingInlineStart: {
      none: "ps-0",
      "025": "ps-1",
      "05": "ps-2",
      "1": "ps-4",
      "15": "ps-6",
      "2": "ps-8",
      "3": "ps-12",
      "4": "ps-16",
      "5": "ps-20",
      "6": "ps-24",
    },
    paddingInlineEnd: {
      none: "pe-0",
      "025": "pe-1",
      "05": "pe-2",
      "1": "pe-4",
      "15": "pe-6",
      "2": "pe-8",
      "3": "pe-12",
      "4": "pe-16",
      "5": "pe-20",
      "6": "pe-24",
    },
    paddingBlockStart: {
      none: "pt-0",
      "025": "pt-1",
      "05": "pt-2",
      "1": "pt-4",
      "15": "pt-6",
      "2": "pt-8",
      "3": "pt-12",
      "4": "pt-16",
      "5": "pt-20",
      "6": "pt-24",
    },
    paddingBlockEnd: {
      none: "pb-0",
      "025": "pb-1",
      "05": "pb-2",
      "1": "pb-4",
      "15": "pb-6",
      "2": "pb-8",
      "3": "pb-12",
      "4": "pb-16",
      "5": "pb-20",
      "6": "pb-24",
    },
    background: {
      surface: "bg-background",
      "surface-neutral": "bg-muted",
      "surface-subdued": "bg-muted/50",
      "surface-disabled": "bg-muted/30",
      "surface-selected": "bg-accent/10",
      "surface-hovered": "bg-muted/80",
      "surface-pressed": "bg-muted",
      transparent: "bg-transparent",
    },
    borderColor: {
      none: "border-transparent",
      border: "border-border",
      "border-subdued": "border-border/50",
      focus: "border-ring",
      success: "border-green-500",
      warning: "border-yellow-500",
      critical: "border-destructive",
    },
    borderWidth: {
      none: "border-0",
      "025": "border",
      "05": "border-2",
      "1": "border-4",
    },
    borderRadius: {
      none: "rounded-none",
      "05": "rounded-sm",
      "1": "rounded",
      "15": "rounded-md",
      "2": "rounded-lg",
      "3": "rounded-xl",
      "4": "rounded-2xl",
      "5": "rounded-3xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      base: "shadow",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
    position: {
      static: "static",
      relative: "relative",
      absolute: "absolute",
      fixed: "fixed",
      sticky: "sticky",
    },
    overflow: {
      visible: "overflow-visible",
      hidden: "overflow-hidden",
      scroll: "overflow-scroll",
      auto: "overflow-auto",
    },
    width: {
      auto: "w-auto",
      full: "w-full",
      "fit-content": "w-fit",
      "max-content": "w-max",
      "min-content": "w-min",
    },
    minWidth: {
      none: "min-w-0",
      full: "min-w-full",
      fit: "min-w-fit",
      max: "min-w-max",
      min: "min-w-min",
    },
    maxWidth: {
      none: "max-w-none",
      full: "max-w-full",
      fit: "max-w-fit",
      prose: "max-w-prose",
      screen: "max-w-screen-xl",
    },
    height: {
      auto: "h-auto",
      full: "h-full",
      screen: "h-screen",
      "fit-content": "h-fit",
      "max-content": "h-max",
      "min-content": "h-min",
    },
    minHeight: {
      none: "min-h-0",
      full: "min-h-full",
      screen: "min-h-screen",
      fit: "min-h-fit",
    },
    opacity: {
      none: "opacity-0",
      "25": "opacity-25",
      "50": "opacity-50",
      "75": "opacity-75",
      full: "opacity-100",
    },
  },
  defaultVariants: {
    background: "transparent",
    borderColor: "none",
    borderWidth: "none",
    borderRadius: "none",
    position: "static",
    overflow: "visible",
    width: "auto",
    height: "auto",
    opacity: "full",
  },
})

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  as?: React.ElementType
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      as = "div",
      padding,
      paddingInlineStart,
      paddingInlineEnd,
      paddingBlockStart,
      paddingBlockEnd,
      background,
      borderColor,
      borderWidth,
      borderRadius,
      shadow,
      position,
      overflow,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      opacity,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as

    return (
      <Component
        className={cn(
          boxVariants({
            padding,
            paddingInlineStart,
            paddingInlineEnd,
            paddingBlockStart,
            paddingBlockEnd,
            background,
            borderColor,
            borderWidth,
            borderRadius,
            shadow,
            position,
            overflow,
            width,
            minWidth,
            maxWidth,
            height,
            minHeight,
            opacity,
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

Box.displayName = "Box"

export { Box, boxVariants }