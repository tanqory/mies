'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const stepperVariants = cva(
  "flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-row items-center",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const stepVariants = cva(
  "relative flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const stepIndicatorVariants = cva(
  "flex items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
  {
    variants: {
      state: {
        completed: "border-primary bg-primary text-primary-foreground",
        active: "border-primary bg-background text-primary",
        inactive: "border-muted-foreground bg-background text-muted-foreground",
      },
      size: {
        sm: "h-6 w-6 text-xs",
        default: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
      },
    },
    defaultVariants: {
      state: "inactive",
      size: "default",
    },
  }
);

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  activeStep?: number;
  children: React.ReactNode;
}

export interface StepProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepVariants> {
  label?: string;
  description?: string;
  state?: "completed" | "active" | "inactive";
  index?: number;
  isLast?: boolean;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, orientation, activeStep = 0, children, ...props }, ref) => {
    const steps = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation }), className)}
        {...props}
      >
        {steps.map((step, index) => {
          if (React.isValidElement(step)) {
            const stepState = index < activeStep ? "completed" : index === activeStep ? "active" : "inactive";
            return React.cloneElement(step, {
              key: index,
              index,
              state: stepState,
              orientation,
              isLast: index === steps.length - 1,
            });
          }
          return step;
        })}
      </div>
    );
  }
);
Stepper.displayName = "Stepper";

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, orientation, label, description, state, index, isLast, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stepVariants({ orientation }), className)}
        {...props}
      >
        <div className={cn(
          "flex items-center",
          orientation === "vertical" ? "flex-col" : "flex-row"
        )}>
          <div className={cn(stepIndicatorVariants({ state }))}>
            {state === "completed" ? (
              <Check className="h-4 w-4" />
            ) : (
              <span>{(index || 0) + 1}</span>
            )}
          </div>

          {(label || description) && (
            <div className={cn(
              "flex flex-col",
              orientation === "horizontal" ? "ml-3" : "mt-2 text-center"
            )}>
              {label && (
                <span className={cn(
                  "text-sm font-medium",
                  state === "active" ? "text-foreground" : "text-muted-foreground"
                )}>
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-muted-foreground">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>

        {!isLast && (
          <div className={cn(
            "bg-border",
            orientation === "horizontal"
              ? "mx-4 h-0.5 flex-1"
              : "my-4 w-0.5 h-8 ml-4"
          )} />
        )}
      </div>
    );
  }
);
Step.displayName = "Step";

export { Stepper, Step, stepperVariants, stepVariants, stepIndicatorVariants };