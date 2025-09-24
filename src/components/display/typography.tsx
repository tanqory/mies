'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
        h5: "scroll-m-20 text-lg font-semibold tracking-tight",
        h6: "scroll-m-20 text-base font-semibold tracking-tight",
        body1: "leading-7",
        body2: "text-sm leading-6",
        subtitle1: "text-lg font-medium leading-6",
        subtitle2: "text-sm font-medium leading-5",
        caption: "text-xs text-muted-foreground",
        overline: "text-xs uppercase tracking-wider text-muted-foreground",
        button: "text-sm font-medium",
      },
      color: {
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        success: "text-green-600 dark:text-green-400",
        error: "text-destructive",
        warning: "text-yellow-600 dark:text-yellow-400",
        info: "text-blue-600 dark:text-blue-400",
        inherit: "text-inherit",
        disabled: "text-muted-foreground opacity-50",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      noWrap: {
        true: "whitespace-nowrap overflow-hidden text-ellipsis",
      },
      gutterBottom: {
        true: "mb-4",
      },
    },
    defaultVariants: {
      variant: "body1",
      color: "inherit",
      align: "left",
    },
  }
);

const variantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  button: 'span',
} as const;

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  component?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body1', color, align, noWrap, gutterBottom, component, children, ...props }, ref) => {
    const Component = component || (variant ? variantElementMap[variant] : null) || 'p';

    return (
      <Component
        className={cn(typographyVariants({ variant, color, align, noWrap, gutterBottom }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };