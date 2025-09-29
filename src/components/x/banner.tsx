"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"

const bannerVariants = cva(
  "relative w-full border-l-4 p-4 shadow-sm",
  {
    variants: {
      status: {
        info: "border-l-muted-foreground bg-muted/30 text-foreground",
        success: "border-l-accent bg-accent/5 text-foreground",
        warning: "border-l-muted-foreground bg-muted/50 text-foreground",
        critical: "border-l-destructive bg-destructive/5 text-foreground",
      },
      tone: {
        default: "",
        withinPage: "rounded-lg border",
      },
    },
    defaultVariants: {
      status: "info",
      tone: "default",
    },
  }
)

export interface BannerAction {
  content: string
  onAction?: () => void
  url?: string
  external?: boolean
  disabled?: boolean
}

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title?: string
  action?: BannerAction
  secondaryAction?: BannerAction
  onDismiss?: () => void
  hideIcon?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

const statusIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  critical: AlertCircle,
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      status = "info",
      tone,
      title,
      action,
      secondaryAction,
      onDismiss,
      hideIcon = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const IconComponent = icon || (status ? statusIcons[status] : null)

    const handleActionClick = (bannerAction: BannerAction) => {
      if (bannerAction.url) {
        if (bannerAction.external) {
          window.open(bannerAction.url, "_blank", "noopener,noreferrer")
        } else {
          window.location.href = bannerAction.url
        }
      }
      bannerAction.onAction?.()
    }

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ status, tone }), className)}
        role="alert"
        {...props}
      >
        <div className="flex">
          {!hideIcon && (
            <div className="flex-shrink-0">
              <IconComponent className="h-5 w-5" />
            </div>
          )}

          <div className={cn("flex-1", !hideIcon && "ml-3")}>
            <div className="space-y-2">
              {title && (
                <h3 className="text-sm font-medium">{title}</h3>
              )}

              {children && (
                <div className="text-sm">{children}</div>
              )}

              {(action || secondaryAction) && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {action && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={action.disabled}
                      onClick={() => handleActionClick(action)}
                      className="bg-transparent border-current hover:bg-current/10"
                    >
                      {action.content}
                      {action.external && (
                        <svg
                          className="ml-1 h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </Button>
                  )}

                  {secondaryAction && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={secondaryAction.disabled}
                      onClick={() => handleActionClick(secondaryAction)}
                      className="text-current hover:bg-current/10"
                    >
                      {secondaryAction.content}
                      {secondaryAction.external && (
                        <svg
                          className="ml-1 h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {onDismiss && (
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="h-8 w-8 p-0 text-current hover:bg-current/10"
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Banner.displayName = "Banner"

export { Banner, bannerVariants }