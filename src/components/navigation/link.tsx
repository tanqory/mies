'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const linkVariants = cva(
  "inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        muted: "text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",
        subtle: "text-foreground hover:text-muted-foreground no-underline hover:underline underline-offset-4",
        button: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md no-underline",
        ghost: "hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md no-underline",
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
      underline: {
        none: "no-underline",
        hover: "no-underline hover:underline",
        always: "underline",
      },
      color: {
        default: "",
        primary: "text-primary hover:text-primary/80",
        secondary: "text-muted-foreground hover:text-foreground",
        success: "text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300",
        warning: "text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300",
        error: "text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300",
        inherit: "text-inherit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      underline: "hover",
      color: "default",
    },
  }
);

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    VariantProps<typeof linkVariants> {
  component?: React.ElementType;
  disabled?: boolean;
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, underline, color, component, disabled, external, href, children, ...props }, ref) => {
    const Component = component || 'a';

    const externalProps = external && href?.startsWith('http') ? {
      target: '_blank',
      rel: 'noopener noreferrer'
    } : {};

    return (
      <Component
        className={cn(linkVariants({ variant, size, underline, color }), disabled && "pointer-events-none opacity-50", className)}
        href={disabled ? undefined : href}
        ref={ref}
        {...externalProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Link.displayName = 'Link';

export { Link, linkVariants };