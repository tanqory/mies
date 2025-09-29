"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

const mediaCardVariants = cva("overflow-hidden", {
  variants: {
    size: {
      small: "max-w-sm",
      medium: "max-w-md",
      large: "max-w-lg",
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

export interface MediaCardAction {
  content: string
  onAction?: () => void
  disabled?: boolean
  destructive?: boolean
  url?: string
  external?: boolean
}

export interface MediaCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mediaCardVariants> {
  title: string
  primaryAction?: MediaCardAction
  secondaryAction?: MediaCardAction
  description?: string
  popoverActions?: MediaCardAction[]
  portrait?: boolean
  size?: "small" | "medium" | "large"
  children?: React.ReactNode
}

const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  (
    {
      className,
      size,
      title,
      primaryAction,
      secondaryAction,
      description,
      popoverActions = [],
      portrait = false,
      children,
      ...props
    },
    ref
  ) => {
    const handleActionClick = (action: MediaCardAction) => {
      if (action.url) {
        if (action.external) {
          window.open(action.url, "_blank", "noopener,noreferrer")
        } else {
          window.location.href = action.url
        }
      }
      action.onAction?.()
    }

    return (
      <Card
        ref={ref}
        className={cn(mediaCardVariants({ size }), className)}
        {...props}
      >
        {children && (
          <div className={cn(
            "relative overflow-hidden",
            portrait ? "aspect-[3/4]" : "aspect-video"
          )}>
            {children}
          </div>
        )}

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold leading-none tracking-tight">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {description}
                </p>
              )}
            </div>

            {(primaryAction || secondaryAction || popoverActions.length > 0) && (
              <div className="flex items-center gap-2">
                {primaryAction && (
                  <Button
                    variant={primaryAction.destructive ? "destructive" : "default"}
                    size="sm"
                    disabled={primaryAction.disabled}
                    onClick={() => handleActionClick(primaryAction)}
                  >
                    {primaryAction.content}
                    {primaryAction.external && (
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
                    variant="outline"
                    size="sm"
                    disabled={secondaryAction.disabled}
                    onClick={() => handleActionClick(secondaryAction)}
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

                {popoverActions.length > 0 && (
                  <details className="relative">
                    <summary className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 cursor-pointer">
                      •••
                    </summary>
                    <div className="absolute top-full right-0 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50">
                      {popoverActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          disabled={action.disabled}
                          onClick={() => handleActionClick(action)}
                        >
                          {action.content}
                          {action.external && (
                            <svg
                              className="ml-auto h-3 w-3"
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
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)

MediaCard.displayName = "MediaCard"

export { MediaCard, mediaCardVariants }