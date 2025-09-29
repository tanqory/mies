"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const formLayoutVariants = cva("space-y-6", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-4",
      loose: "space-y-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface FormLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formLayoutVariants> {
  as?: React.ElementType
}

const FormLayout = React.forwardRef<HTMLDivElement, FormLayoutProps>(
  ({ className, as = "div", variant, children, ...props }, ref) => {
    const Component = as

    return (
      <Component
        className={cn(formLayoutVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

FormLayout.displayName = "FormLayout"

// Form Layout Group component for grouping related form fields
const formLayoutGroupVariants = cva("space-y-4", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-2",
      loose: "space-y-6",
    },
    condensed: {
      true: "space-y-2",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    condensed: false,
  },
})

export interface FormLayoutGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formLayoutGroupVariants> {
  as?: React.ElementType
  title?: string
  helpText?: string
}

const FormLayoutGroup = React.forwardRef<HTMLDivElement, FormLayoutGroupProps>(
  (
    {
      className,
      as = "div",
      variant,
      condensed,
      title,
      helpText,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as

    return (
      <Component
        className={cn("space-y-3", className)}
        ref={ref}
        {...props}
      >
        {(title || helpText) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-sm font-medium leading-none">{title}</h3>
            )}
            {helpText && (
              <p className="text-sm text-muted-foreground">{helpText}</p>
            )}
          </div>
        )}
        <div className={cn(formLayoutGroupVariants({ variant, condensed }))}>
          {children}
        </div>
      </Component>
    )
  }
)

FormLayoutGroup.displayName = "FormLayoutGroup"

export { FormLayout, FormLayoutGroup, formLayoutVariants, formLayoutGroupVariants }