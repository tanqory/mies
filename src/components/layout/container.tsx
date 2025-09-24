'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const containerVariants = cva(
  "mx-auto px-4 sm:px-6 lg:px-8",
  {
    variants: {
      maxWidth: {
        xs: "max-w-screen-xs",
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        false: "max-w-none",
      },
      disableGutters: {
        true: "px-0",
      },
      fixed: {
        true: "max-w-screen-lg",
      },
    },
    defaultVariants: {
      maxWidth: "lg",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  component?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, disableGutters, fixed, component = 'div', children, ...props }, ref) => {
    const Component = component;

    return (
      <Component
        className={cn(containerVariants({ maxWidth, disableGutters, fixed }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container, containerVariants };