"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const gridVariants = cva("grid", {
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
    areas: {
      none: "",
    },
  },
  defaultVariants: {
    columns: "1",
    gap: "1",
    areas: "none",
  },
})

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "none" | "subgrid"
  areas?: string[]
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      as = "div",
      columns,
      rows,
      gap,
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
          gridVariants({
            columns,
            gap,
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

Grid.displayName = "Grid"

// Grid Item component for individual grid cells
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  area?: string
  columnStart?: number
  columnEnd?: number
  columnSpan?: number
  rowStart?: number
  rowEnd?: number
  rowSpan?: number
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      className,
      as = "div",
      area,
      columnStart,
      columnEnd,
      columnSpan,
      rowStart,
      rowEnd,
      rowSpan,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const Component = as

    const gridStyles: React.CSSProperties = {}

    if (area) {
      gridStyles.gridArea = area
    }

    if (columnStart) {
      gridStyles.gridColumnStart = columnStart
    }

    if (columnEnd) {
      gridStyles.gridColumnEnd = columnEnd
    }

    if (columnSpan) {
      gridStyles.gridColumn = `span ${columnSpan} / span ${columnSpan}`
    }

    if (rowStart) {
      gridStyles.gridRowStart = rowStart
    }

    if (rowEnd) {
      gridStyles.gridRowEnd = rowEnd
    }

    if (rowSpan) {
      gridStyles.gridRow = `span ${rowSpan} / span ${rowSpan}`
    }

    return (
      <Component
        className={cn(className)}
        style={{
          ...gridStyles,
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

GridItem.displayName = "GridItem"

export { Grid, GridItem, gridVariants }