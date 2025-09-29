"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const blockStackVariants = cva("flex flex-col", {
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
    inlineAlign: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      "space-around": "justify-around",
      "space-between": "justify-between",
      "space-evenly": "justify-evenly",
    },
  },
  defaultVariants: {
    gap: "1",
    align: "stretch",
    inlineAlign: "start",
  },
})

export interface BlockStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof blockStackVariants> {
  as?: React.ElementType
  reverseOrder?: boolean
}

const BlockStack = React.forwardRef<HTMLDivElement, BlockStackProps>(
  (
    {
      className,
      as = "div",
      gap,
      align,
      inlineAlign,
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
          blockStackVariants({
            gap,
            align,
            inlineAlign,
          }),
          reverseOrder && "flex-col-reverse",
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

BlockStack.displayName = "BlockStack"

export { BlockStack, blockStackVariants }