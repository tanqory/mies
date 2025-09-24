'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "bg-muted border-transparent focus-visible:border-input focus-visible:bg-background",
        outlined: "border-2 border-input",
      },
      size: {
        sm: "h-9 px-2 text-sm",
        default: "h-10 px-3",
        lg: "h-11 px-4 text-base",
      },
      state: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
        warning: "border-yellow-500 focus-visible:ring-yellow-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, state, startAdornment, endAdornment, fullWidth, type, ...props }, ref) => {
    if (startAdornment || endAdornment) {
      return (
        <div className={cn("relative flex items-center", fullWidth && "w-full")}>
          {startAdornment && (
            <div className="absolute left-3 z-10 flex items-center text-muted-foreground">
              {startAdornment}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size, state }),
              startAdornment && "pl-10",
              endAdornment && "pr-10",
              fullWidth && "w-full",
              className
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <div className="absolute right-3 z-10 flex items-center text-muted-foreground">
              {endAdornment}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, state }), fullWidth && "w-full", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };