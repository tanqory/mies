"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { ResourceItem, ResourceItemProps } from "./resource-item"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { EmptyState } from "./empty-state"

const resourceListVariants = cva("space-y-2", {
  variants: {
    variant: {
      default: "",
      flush: "space-y-0 [&>*:not(:last-child)]:border-b [&>*]:rounded-none [&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ResourceListItem extends Omit<ResourceItemProps, "selectable" | "selected" | "onSelectionChange"> {
  id: string
}

export interface ResourceListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof resourceListVariants> {
  items: ResourceListItem[]
  selectable?: boolean
  selectedItems?: string[]
  onSelectionChange?: (selectedItems: string[]) => void
  promotedBulkActions?: Array<{
    content: string
    onAction: (selectedItems: string[]) => void
    disabled?: boolean
  }>
  bulkActions?: Array<{
    content: string
    onAction: (selectedItems: string[]) => void
    disabled?: boolean
  }>
  emptyState?: React.ReactNode
  loading?: boolean
  showHeader?: boolean
  alternateTool?: React.ReactNode
  totalItemsCount?: number
}

const ResourceList = React.forwardRef<HTMLDivElement, ResourceListProps>(
  (
    {
      className,
      variant,
      items,
      selectable = false,
      selectedItems = [],
      onSelectionChange,
      promotedBulkActions = [],
      bulkActions = [],
      emptyState,
      loading = false,
      showHeader = false,
      alternateTool,
      totalItemsCount,
      ...props
    },
    ref
  ) => {
    const allSelected = selectable && selectedItems.length === items.length && items.length > 0
    const someSelected = selectable && selectedItems.length > 0 && selectedItems.length < items.length
    const indeterminate = someSelected

    const handleSelectAll = (checked: boolean | "indeterminate") => {
      if (!onSelectionChange) return

      if (checked === true) {
        onSelectionChange(items.map(item => item.id))
      } else {
        onSelectionChange([])
      }
    }

    const handleItemSelectionChange = (itemId: string, selected: boolean) => {
      if (!onSelectionChange) return

      if (selected) {
        onSelectionChange([...selectedItems, itemId])
      } else {
        onSelectionChange(selectedItems.filter(id => id !== itemId))
      }
    }

    const hasActions = promotedBulkActions.length > 0 || bulkActions.length > 0
    const showBulkActions = selectable && selectedItems.length > 0 && hasActions

    if (loading) {
      return (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-lg border">
              <div className="h-10 w-10 bg-muted rounded animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (items.length === 0) {
      return (
        <div ref={ref} className={className} {...props}>
          {emptyState || (
            <EmptyState
              heading="No items found"
              image="/empty-state.svg"
            >
              There are no items to display.
            </EmptyState>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={className} {...props}>
        {(showHeader || showBulkActions) && (
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center gap-3">
              {selectable && (
                <Checkbox
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = indeterminate
                  }}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all items"
                />
              )}

              {showBulkActions && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedItems.length} selected
                  </span>

                  {promotedBulkActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      disabled={action.disabled}
                      onClick={() => action.onAction(selectedItems)}
                    >
                      {action.content}
                    </Button>
                  ))}

                  {bulkActions.length > 0 && (
                    <details className="relative">
                      <summary className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 cursor-pointer">
                        More actions
                      </summary>
                      <div className="absolute top-full left-0 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50">
                        {bulkActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            disabled={action.disabled}
                            onClick={() => action.onAction(selectedItems)}
                          >
                            {action.content}
                          </Button>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              )}
            </div>

            {alternateTool && <div>{alternateTool}</div>}
          </div>
        )}

        <div className={cn(resourceListVariants({ variant }))}>
          {items.map((item) => (
            <ResourceItem
              key={item.id}
              {...item}
              selectable={selectable}
              selected={selectedItems.includes(item.id)}
              onSelectionChange={(selected) =>
                handleItemSelectionChange(item.id, selected)
              }
            />
          ))}
        </div>

        {totalItemsCount && totalItemsCount > items.length && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Showing {items.length} of {totalItemsCount} items
            </p>
          </div>
        )}
      </div>
    )
  }
)

ResourceList.displayName = "ResourceList"

export { ResourceList, resourceListVariants }