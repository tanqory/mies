"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const descriptionListVariants = cva("", {
  variants: {
    variant: {
      default: "space-y-4",
      compact: "space-y-2",
      inline: "space-y-1",
    },
    spacing: {
      tight: "space-y-1",
      loose: "space-y-6",
      extraLoose: "space-y-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface DescriptionListItem {
  term: React.ReactNode
  description: React.ReactNode
}

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement>,
    VariantProps<typeof descriptionListVariants> {
  items: DescriptionListItem[]
  as?: "dl" | "div"
}

const DescriptionList = React.forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(
  (
    {
      className,
      variant,
      spacing,
      items,
      as = "dl",
      ...props
    },
    ref
  ) => {
    const Component = as

    const spacingClass = spacing
      ? descriptionListVariants({ spacing })
      : descriptionListVariants({ variant })

    return (
      <Component
        ref={ref}
        className={cn(spacingClass, className)}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              variant === "inline"
                ? "flex gap-2 items-start"
                : "space-y-1"
            )}
          >
            <dt
              className={cn(
                "text-sm font-medium leading-6",
                variant === "inline" && "flex-shrink-0 min-w-0 w-1/3"
              )}
            >
              {item.term}
            </dt>
            <dd
              className={cn(
                "text-sm text-muted-foreground leading-6",
                variant === "inline" && "flex-1 min-w-0"
              )}
            >
              {item.description}
            </dd>
          </div>
        ))}
      </Component>
    )
  }
)

DescriptionList.displayName = "DescriptionList"

export { DescriptionList, descriptionListVariants }