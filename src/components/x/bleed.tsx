"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const bleedVariants = cva("", {
  variants: {
    marginInlineStart: {
      none: "ms-0",
      "025": "-ms-1",
      "05": "-ms-2",
      "1": "-ms-4",
      "15": "-ms-6",
      "2": "-ms-8",
      "3": "-ms-12",
      "4": "-ms-16",
      "5": "-ms-20",
      "6": "-ms-24",
    },
    marginInlineEnd: {
      none: "me-0",
      "025": "-me-1",
      "05": "-me-2",
      "1": "-me-4",
      "15": "-me-6",
      "2": "-me-8",
      "3": "-me-12",
      "4": "-me-16",
      "5": "-me-20",
      "6": "-me-24",
    },
    marginBlockStart: {
      none: "mt-0",
      "025": "-mt-1",
      "05": "-mt-2",
      "1": "-mt-4",
      "15": "-mt-6",
      "2": "-mt-8",
      "3": "-mt-12",
      "4": "-mt-16",
      "5": "-mt-20",
      "6": "-mt-24",
    },
    marginBlockEnd: {
      none: "mb-0",
      "025": "-mb-1",
      "05": "-mb-2",
      "1": "-mb-4",
      "15": "-mb-6",
      "2": "-mb-8",
      "3": "-mb-12",
      "4": "-mb-16",
      "5": "-mb-20",
      "6": "-mb-24",
    },
  },
  defaultVariants: {
    marginInlineStart: "none",
    marginInlineEnd: "none",
    marginBlockStart: "none",
    marginBlockEnd: "none",
  },
})

export interface BleedProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bleedVariants> {
  as?: React.ElementType
}

const Bleed = React.forwardRef<HTMLDivElement, BleedProps>(
  (
    {
      className,
      as = "div",
      marginInlineStart,
      marginInlineEnd,
      marginBlockStart,
      marginBlockEnd,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as

    return (
      <Component
        className={cn(
          bleedVariants({
            marginInlineStart,
            marginInlineEnd,
            marginBlockStart,
            marginBlockEnd,
          }),
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

Bleed.displayName = "Bleed"

export { Bleed, bleedVariants }