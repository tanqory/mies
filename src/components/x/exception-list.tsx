"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"
import { AlertCircle, AlertTriangle, XCircle } from "lucide-react"

const exceptionListVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        critical: "border-destructive/20 bg-destructive/5",
        warning: "border-muted bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ExceptionListItem {
  icon?: React.ComponentType<{ className?: string }>
  description: React.ReactNode
  field?: string[]
  helpText?: React.ReactNode
  truncate?: boolean
}

export interface ExceptionListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exceptionListVariants> {
  items: ExceptionListItem[]
  accessibilityLabel?: string
}

const ExceptionList = React.forwardRef<HTMLDivElement, ExceptionListProps>(
  (
    {
      className,
      variant,
      items,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const getDefaultIcon = () => {
      switch (variant) {
        case "critical":
          return XCircle
        case "warning":
          return AlertTriangle
        default:
          return AlertCircle
      }
    }

    const DefaultIcon = getDefaultIcon()

    return (
      <div
        ref={ref}
        className={cn(exceptionListVariants({ variant }), className)}
        role="alert"
        aria-label={accessibilityLabel}
        {...props}
      >
        <div className="p-4">
          <ul className="space-y-3">
            {items.map((item, index) => {
              const IconComponent = item.icon || DefaultIcon

              return (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <IconComponent className={cn(
                      "h-4 w-4",
                      variant === "critical" && "text-destructive",
                      variant === "warning" && "text-muted-foreground",
                      !variant && "text-muted-foreground"
                    )} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className={cn(
                      "text-sm leading-6",
                      item.truncate && "truncate"
                    )}>
                      {item.description}
                    </div>

                    {item.field && item.field.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Field{item.field.length > 1 ? 's' : ''}: {item.field.join(', ')}
                      </div>
                    )}

                    {item.helpText && (
                      <div className="text-xs text-muted-foreground">
                        {item.helpText}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
)

ExceptionList.displayName = "ExceptionList"

export { ExceptionList, exceptionListVariants }