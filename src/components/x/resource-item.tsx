"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"

const resourceItemVariants = cva(
  "flex items-center gap-3 p-4 rounded-lg border transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-muted/50",
        selected: "bg-accent/10 border-accent",
        pressed: "bg-muted",
      },
      persistActions: {
        true: "",
        false: "[&_.resource-actions]:opacity-0 [&_.resource-actions]:group-hover:opacity-100",
      },
    },
    defaultVariants: {
      variant: "default",
      persistActions: false,
    },
  }
)

export interface ResourceItemAction {
  content: string
  icon?: React.ComponentType<{ className?: string }>
  onAction?: () => void
  destructive?: boolean
  disabled?: boolean
}

export interface ResourceItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof resourceItemVariants> {
  id?: string
  media?: React.ReactNode
  accessibilityLabel?: string
  name?: React.ReactNode
  shortcutActions?: ResourceItemAction[]
  persistActions?: boolean
  selectable?: boolean
  selected?: boolean
  onSelectionChange?: (selected: boolean) => void
  url?: string
  external?: boolean
  verticalAlignment?: "leading" | "center" | "trailing" | "fill"
}

const ResourceItem = React.forwardRef<HTMLDivElement, ResourceItemProps>(
  (
    {
      className,
      variant,
      persistActions = false,
      id,
      media,
      accessibilityLabel,
      name,
      shortcutActions = [],
      selectable = false,
      selected = false,
      onSelectionChange,
      url,
      external = false,
      verticalAlignment = "center",
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (url) {
        if (external) {
          window.open(url, "_blank", "noopener,noreferrer")
        } else {
          window.location.href = url
        }
      }
      onClick?.(event)
    }

    const handleSelectionChange = (checked: boolean | "indeterminate") => {
      onSelectionChange?.(checked === true)
    }

    const alignmentClass = {
      leading: "items-start",
      center: "items-center",
      trailing: "items-end",
      fill: "items-stretch",
    }[verticalAlignment]

    const isClickable = Boolean(url || onClick)
    const currentVariant = selected ? "selected" : variant

    return (
      <div
        ref={ref}
        className={cn(
          "group",
          resourceItemVariants({ variant: currentVariant, persistActions }),
          alignmentClass,
          isClickable && "cursor-pointer",
          className
        )}
        onClick={handleClick}
        role={isClickable ? "button" : undefined}
        aria-label={accessibilityLabel}
        tabIndex={isClickable ? 0 : undefined}
        {...props}
      >
        {selectable && (
          <Checkbox
            checked={selected}
            onCheckedChange={handleSelectionChange}
            aria-label={`Select ${name || "item"}`}
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {media && (
          <div className="flex-shrink-0">
            {media}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {name && (
            <div className="text-sm font-medium leading-6 truncate">
              {name}
            </div>
          )}
          {children && (
            <div className="text-sm text-muted-foreground mt-1">
              {children}
            </div>
          )}
        </div>

        {shortcutActions.length > 0 && (
          <div className={cn("resource-actions flex items-center gap-1", {
            "transition-opacity": !persistActions,
          })}>
            {shortcutActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant={action.destructive ? "destructive" : "ghost"}
                  size="sm"
                  disabled={action.disabled}
                  onClick={(e) => {
                    e.stopPropagation()
                    action.onAction?.()
                  }}
                  className="h-8 w-8 p-0"
                >
                  {Icon ? (
                    <Icon className="h-4 w-4" />
                  ) : (
                    <span className="text-xs">{action.content}</span>
                  )}
                </Button>
              )
            })}
          </div>
        )}

        {external && url && (
          <svg
            className="h-4 w-4 flex-shrink-0 opacity-60"
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
      </div>
    )
  }
)

ResourceItem.displayName = "ResourceItem"

export { ResourceItem, resourceItemVariants }