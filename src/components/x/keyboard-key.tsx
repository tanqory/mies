"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const keyboardKeyVariants = cva(
  "inline-flex items-center justify-center rounded border border-border bg-background font-mono text-xs font-medium text-foreground shadow-sm",
  {
    variants: {
      size: {
        small: "min-w-[1.25rem] h-5 px-1",
        medium: "min-w-[1.5rem] h-6 px-1.5",
        large: "min-w-[2rem] h-8 px-2",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

export interface KeyboardKeyProps
  extends React.HTMLAttributes<HTMLKBDElement>,
    VariantProps<typeof keyboardKeyVariants> {
  children: React.ReactNode
}

const KeyboardKey = React.forwardRef<HTMLElement, KeyboardKeyProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(keyboardKeyVariants({ size }), className)}
        {...props}
      >
        {children}
      </kbd>
    )
  }
)

KeyboardKey.displayName = "KeyboardKey"

// Key combination component for displaying multiple keys
export interface KeyCombinationProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: string[]
  separator?: string
  size?: "small" | "medium" | "large"
}

const KeyCombination = React.forwardRef<HTMLSpanElement, KeyCombinationProps>(
  ({ className, keys, separator = "+", size = "medium", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {keys.map((key, index) => (
          <React.Fragment key={index}>
            <KeyboardKey size={size}>{key}</KeyboardKey>
            {index < keys.length - 1 && (
              <span className="text-xs text-muted-foreground">{separator}</span>
            )}
          </React.Fragment>
        ))}
      </span>
    )
  }
)

KeyCombination.displayName = "KeyCombination"

export { KeyboardKey, KeyCombination, keyboardKeyVariants }