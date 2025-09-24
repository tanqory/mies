'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';
import { Input, inputVariants } from './input';

const textFieldVariants = cva(
  "space-y-2",
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  }
);

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      state: {
        default: "text-foreground",
        error: "text-destructive",
        success: "text-green-600 dark:text-green-400",
        warning: "text-yellow-600 dark:text-yellow-400",
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-destructive",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

const helperTextVariants = cva(
  "text-xs",
  {
    variants: {
      state: {
        default: "text-muted-foreground",
        error: "text-destructive",
        success: "text-green-600 dark:text-green-400",
        warning: "text-yellow-600 dark:text-yellow-400",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof textFieldVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({
    className,
    containerClassName,
    variant,
    size,
    state,
    fullWidth,
    label,
    helperText,
    error,
    required,
    startAdornment,
    endAdornment,
    id,
    ...props
  }, ref) => {
    const inputId = id || React.useId();
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const finalState = error ? 'error' : state;

    return (
      <div className={cn(textFieldVariants({ fullWidth }), containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(labelVariants({ state: finalState, required }))}
          >
            {label}
          </label>
        )}
        <Input
          id={inputId}
          ref={ref}
          className={className}
          variant={variant}
          size={size}
          state={finalState}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          fullWidth={fullWidth}
          aria-describedby={helperTextId}
          aria-invalid={!!error}
          {...props}
        />
        {helperText && (
          <p
            id={helperTextId}
            className={cn(helperTextVariants({ state: finalState }))}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField, textFieldVariants, labelVariants, helperTextVariants };