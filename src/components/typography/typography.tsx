'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const typographyVariants = cva(
  "",
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
        subtitle1: "text-lg font-medium leading-7",
        subtitle2: "text-base font-medium leading-6",
        caption: "text-sm text-muted-foreground",
        overline: "text-xs uppercase tracking-widest font-medium text-muted-foreground",
      },
      color: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-muted-foreground",
        success: "text-green-600 dark:text-green-400",
        warning: "text-yellow-600 dark:text-yellow-400",
        error: "text-red-600 dark:text-red-400",
        inherit: "text-inherit",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      display: {
        initial: "",
        block: "block",
        inline: "inline",
        "inline-block": "inline-block",
      },
      gutterBottom: {
        true: "mb-4",
      },
      noWrap: {
        true: "whitespace-nowrap overflow-hidden text-ellipsis",
      },
    },
    defaultVariants: {
      variant: "body1",
      color: "default",
      align: "left",
      display: "initial",
    },
  }
);

const defaultElementMap = {
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
} as const;

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  component?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body1", color, align, display, gutterBottom, noWrap, component, children, ...props }, ref) => {
    const Component = component || (variant && defaultElementMap[variant]) || 'p';

    return (
      <Component
        className={cn(typographyVariants({ variant, color, align, display, gutterBottom, noWrap }), className)}
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