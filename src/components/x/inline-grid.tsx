"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inlineGridVariants = cva("inline-grid", {
  variants: {
    columns: {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
      "5": "grid-cols-5",
      "6": "grid-cols-6",
      "7": "grid-cols-7",
      "8": "grid-cols-8",
      "9": "grid-cols-9",
      "10": "grid-cols-10",
      "11": "grid-cols-11",
      "12": "grid-cols-12",
      none: "grid-cols-none",
      subgrid: "grid-cols-subgrid",
    },
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
    alignItems: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justifyItems: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
  },
  defaultVariants: {
    columns: "1",
    gap: "1",
    alignItems: "stretch",
    justifyItems: "stretch",
  },
})

export interface InlineGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineGridVariants> {
  as?: React.ElementType
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "none" | "subgrid"
  areas?: string[]
}

const InlineGrid = React.forwardRef<HTMLDivElement, InlineGridProps>(
  (
    {
      className,
      as = "div",
      columns,
      rows,
      gap,
      alignItems,
      justifyItems,
      areas,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const Component = as

    const rowsClass = rows
      ? {
          "1": "grid-rows-1",
          "2": "grid-rows-2",
          "3": "grid-rows-3",
          "4": "grid-rows-4",
          "5": "grid-rows-5",
          "6": "grid-rows-6",
          none: "grid-rows-none",
          subgrid: "grid-rows-subgrid",
        }[rows]
      : ""

    const gridAreas = areas
      ? {
          gridTemplateAreas: areas.map((area) => `"${area}"`).join(" "),
        }
      : {}

    return (
      <Component
        className={cn(
          inlineGridVariants({
            columns,
            gap,
            alignItems,
            justifyItems,
          }),
          rowsClass,
          className
        )}
        style={{
          ...gridAreas,
          ...style,
        }}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

InlineGrid.displayName = "InlineGrid"

export { InlineGrid, inlineGridVariants }