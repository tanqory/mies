"use client"

import * as React from "react"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const pageVariants = cva(
  "w-full",
  {
    variants: {
      width: {
        default: "max-w-7xl mx-auto",
        full: "w-full",
        narrow: "max-w-4xl mx-auto",
      },
      spacing: {
        default: "px-4 sm:px-6 lg:px-8",
        none: "",
        sm: "px-2 sm:px-4",
        lg: "px-6 sm:px-8 lg:px-12",
      },
    },
    defaultVariants: {
      width: "default",
      spacing: "default",
    },
  }
)

export interface PageAction {
  content: string
  onAction?: () => void
  url?: string
  external?: boolean
  loading?: boolean
  disabled?: boolean
  destructive?: boolean
  primary?: boolean
  icon?: React.ReactNode
}

export interface PageActionGroup {
  title: string
  actions: PageAction[]
}

export interface BreadcrumbAction {
  content: string
  onAction?: () => void
  url?: string
  external?: boolean
}

export interface PaginationProps {
  hasPrevious?: boolean
  hasNext?: boolean
  onPrevious?: () => void
  onNext?: () => void
  previousLabel?: string
  nextLabel?: string
}

export interface PageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageVariants> {
  title?: string
  subtitle?: string
  titleMetadata?: React.ReactNode
  titleHidden?: boolean
  fullWidth?: boolean
  narrowWidth?: boolean
  primaryAction?: PageAction
  secondaryActions?: PageAction[]
  actionGroups?: PageActionGroup[]
  backAction?: BreadcrumbAction
  pagination?: PaginationProps
  children?: React.ReactNode
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  (
    {
      className,
      width: widthProp,
      spacing,
      title,
      subtitle,
      titleMetadata,
      titleHidden = false,
      fullWidth = false,
      narrowWidth = false,
      primaryAction,
      secondaryActions = [],
      actionGroups = [],
      backAction,
      pagination,
      children,
      ...props
    },
    ref
  ) => {
    const width = fullWidth ? "full" : narrowWidth ? "narrow" : widthProp

    const renderAction = (action: PageAction) => {
      const buttonProps = {
        variant: action.primary ? "default" : action.destructive ? "destructive" : "outline",
        disabled: action.disabled || action.loading,
        className: "gap-2",
      } as const

      if (action.url) {
        return (
          <Button {...buttonProps} asChild>
            <a
              href={action.url}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
            >
              {action.icon}
              {action.loading ? "Loading..." : action.content}
            </a>
          </Button>
        )
      }

      return (
        <Button {...buttonProps} onClick={action.onAction}>
          {action.icon}
          {action.loading ? "Loading..." : action.content}
        </Button>
      )
    }

    const hasHeaderContent =
      title ||
      subtitle ||
      primaryAction ||
      secondaryActions.length > 0 ||
      actionGroups.length > 0 ||
      backAction ||
      pagination

    const breadcrumbMarkup = backAction && (
      <div className="mb-4">
        {backAction.url ? (
          <Button variant="ghost" size="sm" asChild className="gap-2 px-0 text-muted-foreground hover:text-foreground">
            <a
              href={backAction.url}
              target={backAction.external ? "_blank" : undefined}
              rel={backAction.external ? "noopener noreferrer" : undefined}
            >
              <ArrowLeft className="h-4 w-4" />
              {backAction.content}
            </a>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={backAction.onAction}
            className="gap-2 px-0 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {backAction.content}
          </Button>
        )}
      </div>
    )

    const paginationMarkup = pagination && (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={pagination.onPrevious}
          disabled={!pagination.hasPrevious}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          {pagination.previousLabel || "Previous"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={pagination.onNext}
          disabled={!pagination.hasNext}
          className="gap-1"
        >
          {pagination.nextLabel || "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )

    const actionGroupsMarkup = actionGroups.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {actionGroups.map((group, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {group.title}
                <ChevronLeft className="h-4 w-4 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {group.actions.map((action, actionIndex) => (
                <DropdownMenuItem
                  key={actionIndex}
                  onClick={action.onAction}
                  disabled={action.disabled || action.loading}
                  className={cn(
                    "gap-2",
                    action.destructive && "text-destructive focus:text-destructive"
                  )}
                >
                  {action.icon}
                  {action.loading ? "Loading..." : action.content}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    )

    const headerMarkup = hasHeaderContent && (
      <div className="space-y-6 pb-6">
        {breadcrumbMarkup}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Title Section */}
          <div className="space-y-1">
            {title && (
              <div className="flex items-center gap-3">
                <h1 className={cn(
                  "text-2xl font-bold tracking-tight",
                  titleHidden && "sr-only"
                )}>
                  {title}
                </h1>
                {titleMetadata && (
                  <div className="flex items-center gap-2">
                    {titleMetadata}
                  </div>
                )}
              </div>
            )}
            {subtitle && (
              <p className="text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          {/* Actions Section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {paginationMarkup}

            <div className="flex flex-wrap gap-2">
              {actionGroupsMarkup}

              {secondaryActions.map((action, index) => (
                <div key={index}>
                  {renderAction(action)}
                </div>
              ))}

              {primaryAction && renderAction(primaryAction)}
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div
        ref={ref}
        className={cn(pageVariants({ width, spacing }), className)}
        {...props}
      >
        {headerMarkup}
        <div className={cn(!hasHeaderContent && "py-6")}>
          {children}
        </div>
      </div>
    )
  }
)

Page.displayName = "Page"

export { Page, pageVariants }