import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const timelineVariants = cva("flex flex-col space-y-6");

const timelineItemVariants = cva("relative flex gap-3", {
  variants: {
    position: {
      left: "flex-row",
      right: "flex-row-reverse",
      center: "flex-col items-center text-center",
    },
  },
  defaultVariants: {
    position: "left",
  },
});

const timelineDotVariants = cva(
  "relative z-10 flex items-center justify-center rounded-full border-2 bg-background",
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary bg-primary text-primary-foreground",
        success: "border-success bg-success text-success-foreground",
        warning: "border-warning bg-warning text-warning-foreground",
        destructive: "border-destructive bg-destructive text-destructive-foreground",
        outline: "border-border bg-background",
      },
      size: {
        sm: "h-6 w-6",
        default: "h-8 w-8",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const timelineConnectorVariants = cva(
  "absolute left-1/2 top-full w-0.5 -translate-x-1/2 bg-border",
  {
    variants: {
      variant: {
        default: "bg-border",
        primary: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
        outline: "bg-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const timelineContentVariants = cva("flex-1 space-y-1", {
  variants: {
    position: {
      left: "text-left",
      right: "text-right",
      center: "text-center",
    },
  },
  defaultVariants: {
    position: "left",
  },
});

export interface TimelineContextValue {
  position?: "left" | "right" | "center";
}

const TimelineContext = React.createContext<TimelineContextValue>({});

const useTimelineContext = () => React.useContext(TimelineContext);

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right" | "center";
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, position = "left", children, ...props }, ref) => {
    const contextValue: TimelineContextValue = { position };

    return (
      <TimelineContext.Provider value={contextValue}>
        <div ref={ref} className={cn(timelineVariants(), className)} {...props}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                ...child.props,
                isLast: index === React.Children.count(children) - 1,
              });
            }
            return child;
          })}
        </div>
      </TimelineContext.Provider>
    );
  }
);

Timeline.displayName = "Timeline";

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {
  isLast?: boolean;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, position: itemPosition, isLast, children, ...props }, ref) => {
    const { position: contextPosition } = useTimelineContext();
    const position = itemPosition || contextPosition || "left";

    return (
      <div
        ref={ref}
        className={cn(timelineItemVariants({ position }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

export interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  icon?: React.ReactNode;
  isLast?: boolean;
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, variant, size, icon, isLast, children, ...props }, ref) => {
    return (
      <div className="relative flex flex-col items-center">
        <div
          ref={ref}
          className={cn(timelineDotVariants({ variant, size }), className)}
          {...props}
        >
          {icon || children}
        </div>
        {!isLast && (
          <div
            className={cn(
              timelineConnectorVariants({ variant }),
              "h-6" // Default connector height, can be overridden
            )}
          />
        )}
      </div>
    );
  }
);

TimelineDot.displayName = "TimelineDot";

export interface TimelineContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineContentVariants> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, position: itemPosition, children, ...props }, ref) => {
    const { position: contextPosition } = useTimelineContext();
    const position = itemPosition || contextPosition || "left";

    return (
      <div
        ref={ref}
        className={cn(timelineContentVariants({ position }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TimelineContent.displayName = "TimelineContent";

export interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, as: Component = "h3", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TimelineTitle.displayName = "TimelineTitle";

export interface TimelineDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const TimelineDescription = React.forwardRef<HTMLParagraphElement, TimelineDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

TimelineDescription.displayName = "TimelineDescription";

export interface TimelineTimeProps extends React.HTMLAttributes<HTMLTimeElement> {
  dateTime?: string;
}

const TimelineTime = React.forwardRef<HTMLTimeElement, TimelineTimeProps>(
  ({ className, dateTime, children, ...props }, ref) => {
    return (
      <time
        ref={ref}
        className={cn("text-xs text-muted-foreground", className)}
        dateTime={dateTime}
        {...props}
      >
        {children}
      </time>
    );
  }
);

TimelineTime.displayName = "TimelineTime";

// Separator component for visual separation between timeline sections
export interface TimelineSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineSeparator = React.forwardRef<HTMLDivElement, TimelineSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("my-4 flex items-center justify-center", className)}
        {...props}
      >
        <div className="h-px w-full bg-border" />
        <div className="mx-4 text-xs text-muted-foreground bg-background px-2">
          {props.children || "•••"}
        </div>
        <div className="h-px w-full bg-border" />
      </div>
    );
  }
);

TimelineSeparator.displayName = "TimelineSeparator";

export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineSeparator,
  timelineVariants,
  timelineItemVariants,
  timelineDotVariants,
  timelineConnectorVariants,
  timelineContentVariants,
};