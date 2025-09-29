"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"

const accountConnectionVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        connected: "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50",
        disconnected: "border-destructive/20 bg-destructive/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AccountConnectionAction {
  content: string
  onAction?: () => void
  disabled?: boolean
  destructive?: boolean
  loading?: boolean
}

export interface AccountConnectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accountConnectionVariants> {
  accountName?: string
  title: string
  details?: React.ReactNode
  termsOfService?: React.ReactNode
  avatar?: {
    source?: string
    initials?: string
  }
  connected?: boolean
  action?: AccountConnectionAction
  secondaryAction?: AccountConnectionAction
}

const AccountConnection = React.forwardRef<HTMLDivElement, AccountConnectionProps>(
  (
    {
      className,
      variant,
      accountName,
      title,
      details,
      termsOfService,
      avatar,
      connected = false,
      action,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    const currentVariant = connected ? "connected" : variant || "default"

    return (
      <div
        ref={ref}
        className={cn(accountConnectionVariants({ variant: currentVariant }), className)}
        {...props}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            {avatar && (
              <Avatar className="h-12 w-12">
                <AvatarImage src={avatar.source} alt={accountName || title} />
                <AvatarFallback>
                  {avatar.initials || accountName?.slice(0, 2).toUpperCase() || title.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  {title}
                </h3>
                {connected && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Connected
                  </Badge>
                )}
              </div>

              {accountName && (
                <p className="text-sm text-muted-foreground mb-2">
                  Account: {accountName}
                </p>
              )}

              {details && (
                <div className="text-sm text-muted-foreground mb-4">
                  {details}
                </div>
              )}

              <div className="flex items-center gap-2">
                {action && (
                  <Button
                    variant={action.destructive ? "destructive" : connected ? "outline" : "default"}
                    disabled={action.disabled || action.loading}
                    onClick={action.onAction}
                  >
                    {action.loading && (
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}
                    {action.content}
                  </Button>
                )}

                {secondaryAction && (
                  <Button
                    variant="ghost"
                    disabled={secondaryAction.disabled || secondaryAction.loading}
                    onClick={secondaryAction.onAction}
                  >
                    {secondaryAction.loading && (
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}
                    {secondaryAction.content}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {termsOfService && (
            <>
              <Separator className="my-4" />
              <div className="text-xs text-muted-foreground">
                {termsOfService}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
)

AccountConnection.displayName = "AccountConnection"

export { AccountConnection, accountConnectionVariants }