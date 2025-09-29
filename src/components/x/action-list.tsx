"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const actionListVariants = cva(
  "flex flex-col bg-popover text-popover-foreground rounded-md border shadow-md",
  {
    variants: {
      variant: {
        default: "",
        menu: "py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ActionListAction {
  id?: string
  content: string
  helpText?: string
  icon?: React.ComponentType<{ className?: string }>
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  disabled?: boolean
  destructive?: boolean
  active?: boolean
  external?: boolean
  url?: string
  onAction?: () => void
}

export interface ActionListSection {
  title?: string
  items: ActionListAction[]
}

export interface ActionListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof actionListVariants> {
  sections?: ActionListSection[]
  items?: ActionListAction[]
  actionRole?: "menuitem" | "option" | "button"
}

const ActionList = React.forwardRef<HTMLDivElement, ActionListProps>(
  (
    {
      className,
      variant,
      sections,
      items,
      actionRole = "menuitem",
      ...props
    },
    ref
  ) => {
    const allSections = sections || (items ? [{ items }] : [])

    const renderAction = (action: ActionListAction, index: number) => {
      const {
        content,
        helpText,
        icon: Icon,
        suffix,
        prefix,
        disabled = false,
        destructive = false,
        active = false,
        external = false,
        url,
        onAction,
      } = action

      const handleClick = () => {
        if (disabled) return
        if (url && external) {
          window.open(url, "_blank", "noopener,noreferrer")
        } else if (url) {
          window.location.href = url
        }
        onAction?.()
      }

      return (
        <Button
          key={action.id || index}
          variant="ghost"
          className={cn(
            "w-full justify-start h-auto p-2 text-left font-normal",
            destructive && "text-destructive hover:text-destructive",
            active && "bg-accent text-accent-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
          onClick={handleClick}
          role={actionRole}
        >
          <div className="flex items-center gap-2 w-full">
            {prefix}
            {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="truncate">{content}</div>
              {helpText && (
                <div className="text-xs text-muted-foreground mt-1">
                  {helpText}
                </div>
              )}
            </div>
            {suffix}
            {external && (
              <svg
                className="h-3 w-3 flex-shrink-0 opacity-60"
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
        </Button>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(actionListVariants({ variant }), className)}
        {...props}
      >
        {allSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {section.title}
              </div>
            )}
            <div className={variant === "menu" ? "px-1" : "p-1"}>
              {section.items.map((action, actionIndex) =>
                renderAction(action, actionIndex)
              )}
            </div>
            {sectionIndex < allSections.length - 1 && (
              <Separator className="my-1" />
            )}
          </div>
        ))}
      </div>
    )
  }
)

ActionList.displayName = "ActionList"

export { ActionList, actionListVariants }