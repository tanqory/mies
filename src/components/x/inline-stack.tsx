"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inlineStackVariants = cva("flex", {
  variants: {
    gap: {
      none: "gap-0",
      "025": "gap-1",
      "05": "gap-2",
      "1": "gap-4",
      "15": "gap-6",
      "2": "gap-8",
      "3": "gap-12",
      "4": "gap-16",
      "5": "gap-20",
      "6": "gap-24",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    blockAlign: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      "space-around": "justify-around",
      "space-between": "justify-between",
      "space-evenly": "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    gap: "1",
    align: "center",
    blockAlign: "start",
    wrap: "nowrap",
  },
})

export interface InlineStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineStackVariants> {
  as?: React.ElementType
  reverseOrder?: boolean
}

const InlineStack = React.forwardRef<HTMLDivElement, InlineStackProps>(
  (
    {
      className,
      as = "div",
      gap,
      align,
      blockAlign,
      wrap,
      reverseOrder = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as

    return (
      <Component
        className={cn(
          inlineStackVariants({
            gap,
            align,
            blockAlign,
            wrap,
          }),
          reverseOrder && "flex-row-reverse",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

InlineStack.displayName = "InlineStack"

export { InlineStack, inlineStackVariants }