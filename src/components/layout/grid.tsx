'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12",
        none: "grid-cols-none",
      },
      rows: {
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        6: "grid-rows-6",
        none: "grid-rows-none",
      },
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        4: "gap-4",
        6: "gap-6",
        8: "gap-8",
      },
      flow: {
        row: "grid-flow-row",
        col: "grid-flow-col",
        "row-dense": "grid-flow-row-dense",
        "col-dense": "grid-flow-col-dense",
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 4,
    },
  }
);

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  component?: React.ElementType;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, rows, gap, flow, component = 'div', children, ...props }, ref) => {
    const Component = component;

    return (
      <Component
        className={cn(gridVariants({ cols, rows, gap, flow }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';

const gridItemVariants = cva(
  "",
  {
    variants: {
      colSpan: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        7: "col-span-7",
        8: "col-span-8",
        9: "col-span-9",
        10: "col-span-10",
        11: "col-span-11",
        12: "col-span-12",
        full: "col-span-full",
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-2",
        3: "row-span-3",
        4: "row-span-4",
        5: "row-span-5",
        6: "row-span-6",
        full: "row-span-full",
      },
      colStart: {
        1: "col-start-1",
        2: "col-start-2",
        3: "col-start-3",
        4: "col-start-4",
        5: "col-start-5",
        6: "col-start-6",
        7: "col-start-7",
        8: "col-start-8",
        9: "col-start-9",
        10: "col-start-10",
        11: "col-start-11",
        12: "col-start-12",
        13: "col-start-13",
        auto: "col-start-auto",
      },
      colEnd: {
        1: "col-end-1",
        2: "col-end-2",
        3: "col-end-3",
        4: "col-end-4",
        5: "col-end-5",
        6: "col-end-6",
        7: "col-end-7",
        8: "col-end-8",
        9: "col-end-9",
        10: "col-end-10",
        11: "col-end-11",
        12: "col-end-12",
        13: "col-end-13",
        auto: "col-end-auto",
      },
    },
  }
);

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  component?: React.ElementType;
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, colStart, colEnd, component = 'div', children, ...props }, ref) => {
    const Component = component;

    return (
      <Component
        className={cn(gridItemVariants({ colSpan, rowSpan, colStart, colEnd }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GridItem.displayName = 'GridItem';

export { Grid, GridItem, gridVariants, gridItemVariants };