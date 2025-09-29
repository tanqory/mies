"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const listVariants = cva("", {
  variants: {
    variant: {
      bullet: "list-disc list-inside space-y-1",
      number: "list-decimal list-inside space-y-1",
      none: "space-y-1",
    },
    spacing: {
      tight: "space-y-0.5",
      loose: "space-y-2",
      extraLoose: "space-y-3",
    },
  },
  defaultVariants: {
    variant: "bullet",
  },
})

export interface ListItemType {
  id?: string
  content: React.ReactNode
}

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
  items?: ListItemType[]
  children?: React.ReactNode
  as?: "ul" | "ol" | "div"
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      variant,
      spacing,
      items,
      children,
      as,
      ...props
    },
    ref
  ) => {
    // Auto-determine component type based on variant
    const defaultComponent = variant === "number" ? "ol" : "ul"
    const Component = as || (variant === "none" ? "div" : defaultComponent)

    const spacingClass = spacing
      ? listVariants({ spacing })
      : listVariants({ variant })

    const content = children || (
      items?.map((item, index) => (
        <li key={item.id || index} className="text-sm">
          {item.content}
        </li>
      ))
    )

    return (
      <Component
        ref={ref}
        className={cn(spacingClass, className)}
        {...props}
      >
        {content}
      </Component>
    )
  }
)

List.displayName = "List"

// List Item component for more control
export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  as?: "li" | "div"
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, as = "li", children, ...props }, ref) => {
    const Component = as

    return (
      <Component
        ref={ref}
        className={cn("text-sm", className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

ListItem.displayName = "ListItem"

export { List, ListItem, listVariants }