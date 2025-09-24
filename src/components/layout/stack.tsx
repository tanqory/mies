'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const stackVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        column: "flex-col",
        "row-reverse": "flex-row-reverse",
        "column-reverse": "flex-col-reverse",
      },
      spacing: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        6: "gap-6",
        8: "gap-8",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
    },
    defaultVariants: {
      direction: "column",
      spacing: 2,
    },
  }
);

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  component?: React.ElementType;
  divider?: React.ReactNode;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, justify, component = 'div', divider, children, ...props }, ref) => {
    const Component = component;

    const childrenArray = React.Children.toArray(children);
    const childrenWithDividers = divider
      ? childrenArray.reduce<React.ReactNode[]>((acc, child, index) => {
          acc.push(child);
          if (index < childrenArray.length - 1) {
            acc.push(
              <div key={`divider-${index}`} className="flex-shrink-0">
                {divider}
              </div>
            );
          }
          return acc;
        }, [])
      : children;

    return (
      <Component
        className={cn(stackVariants({ direction, spacing, align, justify }), className)}
        ref={ref}
        {...props}
      >
        {childrenWithDividers}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';

export { Stack, stackVariants };