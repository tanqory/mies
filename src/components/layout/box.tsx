'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const boxVariants = cva(
  "block",
  {
    variants: {
      display: {
        block: "block",
        inline: "inline",
        "inline-block": "inline-block",
        flex: "flex",
        "inline-flex": "inline-flex",
        grid: "grid",
        "inline-grid": "inline-grid",
        hidden: "hidden",
      },
      position: {
        static: "static",
        relative: "relative",
        absolute: "absolute",
        fixed: "fixed",
        sticky: "sticky",
      },
      overflow: {
        visible: "overflow-visible",
        hidden: "overflow-hidden",
        scroll: "overflow-scroll",
        auto: "overflow-auto",
      },
    },
    defaultVariants: {
      display: "block",
    },
  }
);

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  component?: React.ElementType;
  sx?: string;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, display, position, overflow, component = 'div', sx, children, ...props }, ref) => {
    const Component = component;

    return (
      <Component
        className={cn(boxVariants({ display, position, overflow }), sx, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';

export { Box, boxVariants };