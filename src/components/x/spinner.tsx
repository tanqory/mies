import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../ui/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-current border-r-transparent",
  {
    variants: {
      size: {
        small: "h-4 w-4 border-2",
        medium: "h-6 w-6 border-2",
        large: "h-8 w-8 border-[3px]",
        extraLarge: "h-12 w-12 border-4",
      },
      color: {
        inherit: "text-inherit",
        subdued: "text-muted-foreground",
        critical: "text-destructive",
        warning: "text-yellow-600 dark:text-yellow-400",
        success: "text-green-600 dark:text-green-400",
        primary: "text-primary",
        info: "text-blue-600 dark:text-blue-400",
        white: "text-white",
      },
    },
    defaultVariants: {
      size: "medium",
      color: "inherit",
    },
  }
)

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  accessibilityLabel?: string
  hasFocusableParent?: boolean
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({
    className,
    size,
    color,
    accessibilityLabel = "Loading",
    hasFocusableParent,
    ...props
  }, ref) => {
    const focusableProps = hasFocusableParent
      ? { "aria-hidden": true }
      : {
          role: "status",
          "aria-label": accessibilityLabel,
          tabIndex: 0,
        }

    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, color, className }))}
        {...focusableProps}
        {...props}
      >
        {!hasFocusableParent && (
          <span className="sr-only">{accessibilityLabel}</span>
        )}
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }