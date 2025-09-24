'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const paperVariants = cva(
  "bg-background",
  {
    variants: {
      elevation: {
        0: "border-0 shadow-none",
        1: "border shadow-sm",
        2: "border shadow",
        3: "border shadow-md",
        4: "border shadow-lg",
        8: "border shadow-xl",
        12: "border shadow-2xl",
        16: "border shadow-2xl",
        24: "border shadow-2xl drop-shadow-xl",
      },
      variant: {
        elevation: "",
        outlined: "border border-border shadow-none",
      },
      square: {
        true: "rounded-none",
        false: "rounded-lg",
      },
    },
    defaultVariants: {
      elevation: 1,
      variant: "elevation",
      square: false,
    },
  }
);

export interface PaperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paperVariants> {
  component?: React.ElementType;
}

const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ className, elevation, variant, square, component = 'div', children, ...props }, ref) => {
    const Component = component;

    return (
      <Component
        className={cn(paperVariants({ elevation, variant, square }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Paper.displayName = 'Paper';

export { Paper, paperVariants };