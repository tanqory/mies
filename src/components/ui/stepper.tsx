import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const stepperVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const stepVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-col items-center",
      vertical: "flex-row items-center",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const stepIconVariants = cva(
  "flex items-center justify-center rounded-full border-2 font-medium transition-all duration-200",
  {
    variants: {
      state: {
        inactive: "border-muted-foreground/30 bg-background text-muted-foreground",
        active: "border-primary bg-primary text-primary-foreground",
        completed: "border-primary bg-primary text-primary-foreground",
        error: "border-destructive bg-destructive text-destructive-foreground",
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

const stepLabelVariants = cva("text-center transition-colors duration-200", {
  variants: {
    state: {
      inactive: "text-muted-foreground",
      active: "text-foreground font-medium",
      completed: "text-foreground",
      error: "text-destructive",
    },
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
    orientation: {
      horizontal: "mt-2 max-w-[100px]",
      vertical: "ml-3 flex-1",
    },
  },
  defaultVariants: {
    state: "inactive",
    size: "default",
    orientation: "horizontal",
  },
});

const stepConnectorVariants = cva("bg-border transition-colors duration-200", {
  variants: {
    orientation: {
      horizontal: "h-0.5 flex-1 mx-2",
      vertical: "w-0.5 min-h-[32px] ml-4 my-1",
    },
    state: {
      inactive: "bg-border",
      active: "bg-border",
      completed: "bg-primary",
      error: "bg-destructive",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    state: "inactive",
  },
});

export interface StepperContextValue {
  activeStep: number;
  orientation: "horizontal" | "vertical";
  size: "sm" | "default" | "lg";
  completed?: number[];
  error?: number[];
}

const StepperContext = React.createContext<StepperContextValue | undefined>(undefined);

const useStepperContext = () => {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
};

// Check icon component
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

// Error icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  activeStep?: number;
  completed?: number[];
  error?: number[];
  size?: "sm" | "default" | "lg";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      orientation,
      activeStep = 0,
      completed = [],
      error = [],
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const contextValue: StepperContextValue = {
      activeStep,
      orientation: orientation || "horizontal",
      size,
      completed,
      error,
    };

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(stepperVariants({ orientation, className }))}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);

Stepper.displayName = "Stepper";

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, index, children, ...props }, ref) => {
    const { activeStep, orientation, completed, error } = useStepperContext();

    const isActive = index === activeStep;
    const isCompleted = completed?.includes(index) || false;
    const hasError = error?.includes(index) || false;

    const state = hasError ? "error" : isCompleted ? "completed" : isActive ? "active" : "inactive";

    return (
      <div
        ref={ref}
        className={cn(stepVariants({ orientation }), className)}
        {...props}
      >
        {children}
        {/* Connector line */}
        {orientation === "vertical" && index < React.Children.count(children) - 1 && (
          <div className={cn(stepConnectorVariants({ orientation, state }))} />
        )}
      </div>
    );
  }
);

Step.displayName = "Step";

export interface StepIconProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  icon?: React.ReactNode;
}

const StepIcon = React.forwardRef<HTMLDivElement, StepIconProps>(
  ({ className, index, icon, ...props }, ref) => {
    const { activeStep, size, completed, error } = useStepperContext();

    const isActive = index === activeStep;
    const isCompleted = completed?.includes(index) || false;
    const hasError = error?.includes(index) || false;

    const state = hasError ? "error" : isCompleted ? "completed" : isActive ? "active" : "inactive";

    const displayIcon = () => {
      if (hasError) {
        return <XIcon className="h-3 w-3" />;
      }
      if (isCompleted) {
        return <CheckIcon className="h-3 w-3" />;
      }
      if (icon) {
        return icon;
      }
      return index + 1;
    };

    return (
      <div
        ref={ref}
        className={cn(stepIconVariants({ state, size }), className)}
        {...props}
      >
        {displayIcon()}
      </div>
    );
  }
);

StepIcon.displayName = "StepIcon";

export interface StepLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  optional?: React.ReactNode;
}

const StepLabel = React.forwardRef<HTMLDivElement, StepLabelProps>(
  ({ className, index, optional, children, ...props }, ref) => {
    const { activeStep, orientation, completed, error } = useStepperContext();

    const isActive = index === activeStep;
    const isCompleted = completed?.includes(index) || false;
    const hasError = error?.includes(index) || false;

    const state = hasError ? "error" : isCompleted ? "completed" : isActive ? "active" : "inactive";

    return (
      <div
        ref={ref}
        className={cn(stepLabelVariants({ state, orientation }), className)}
        {...props}
      >
        <div className="font-medium">{children}</div>
        {optional && (
          <div className="text-xs text-muted-foreground mt-0.5">{optional}</div>
        )}
      </div>
    );
  }
);

StepLabel.displayName = "StepLabel";

export interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(
  ({ className, index, children, ...props }, ref) => {
    const { activeStep, orientation } = useStepperContext();

    const isActive = index === activeStep;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "mt-2",
          orientation === "vertical" && "ml-10 pb-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StepContent.displayName = "StepContent";

export interface StepConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepConnector = React.forwardRef<HTMLDivElement, StepConnectorProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useStepperContext();

    return (
      <div
        ref={ref}
        className={cn(stepConnectorVariants({ orientation, state: "inactive" }), className)}
        {...props}
      />
    );
  }
);

StepConnector.displayName = "StepConnector";

export {
  Stepper,
  Step,
  StepIcon,
  StepLabel,
  StepContent,
  StepConnector,
  stepperVariants,
  stepVariants,
  stepIconVariants,
  stepLabelVariants,
  stepConnectorVariants,
};