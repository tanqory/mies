"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"

const calloutCardVariants = cva(
  "relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        success: "border-accent/20 bg-accent/5",
        warning: "border-muted bg-muted/50",
        destructive: "border-destructive/20 bg-destructive/5",
        info: "border-muted bg-muted/30",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CalloutCardAction {
  content: string
  onAction?: () => void
  url?: string
  external?: boolean
  loading?: boolean
  disabled?: boolean
}

export interface CalloutCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof calloutCardVariants> {
  title: React.ReactNode
  children?: React.ReactNode
  illustration?: string | React.ReactNode
  primaryAction?: CalloutCardAction
  secondaryAction?: CalloutCardAction
  onDismiss?: () => void
  dismissible?: boolean
}

const CalloutCard = React.forwardRef<HTMLDivElement, CalloutCardProps>(
  (
    {
      className,
      variant,
      size,
      title,
      children,
      illustration,
      primaryAction,
      secondaryAction,
      onDismiss,
      dismissible = false,
      ...props
    },
    ref
  ) => {
    const renderAction = (action: CalloutCardAction, variant: "default" | "outline" = "default") => {
      if (action.url) {
        return (
          <Button
            variant={variant}
            asChild
            disabled={action.disabled}
            className="min-w-[100px]"
          >
            <a
              href={action.url}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
            >
              {action.content}
            </a>
          </Button>
        )
      }

      return (
        <Button
          variant={variant}
          onClick={action.onAction}
          disabled={action.disabled || action.loading}
          className="min-w-[100px]"
        >
          {action.loading ? "Loading..." : action.content}
        </Button>
      )
    }

    const illustrationElement = React.useMemo(() => {
      if (!illustration) return null

      if (typeof illustration === "string") {
        return (
          <div className="flex-shrink-0">
            <img
              src={illustration}
              alt=""
              className="h-24 w-24 object-contain"
            />
          </div>
        )
      }

      return (
        <div className="flex-shrink-0 flex items-center justify-center h-24 w-24">
          {illustration}
        </div>
      )
    }, [illustration])

    return (
      <div
        ref={ref}
        className={cn(calloutCardVariants({ variant, size }), className)}
        {...props}
      >
        {/* Dismiss Button */}
        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute top-4 right-4 rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="flex items-start gap-6">
          {/* Illustration */}
          {illustrationElement}

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Title */}
            <div className={cn(dismissible && onDismiss && "pr-8")}>
              <h3 className="text-lg font-semibold leading-tight">
                {title}
              </h3>
            </div>

            {/* Description */}
            {children && (
              <div className="text-sm text-muted-foreground">
                {children}
              </div>
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-3">
                {primaryAction && renderAction(primaryAction, "default")}
                {secondaryAction && renderAction(secondaryAction, "outline")}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

CalloutCard.displayName = "CalloutCard"

export { CalloutCard, calloutCardVariants }