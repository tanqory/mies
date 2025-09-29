"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle } from "lucide-react"

const inlineErrorVariants = cva(
  "flex items-start gap-2 text-sm text-destructive",
  {
    variants: {
      variant: {
        default: "",
        critical: "text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InlineErrorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineErrorVariants> {
  message: string
  fieldID?: string
  icon?: React.ComponentType<{ className?: string }> | false
}

const InlineError = React.forwardRef<HTMLDivElement, InlineErrorProps>(
  (
    {
      className,
      variant,
      message,
      fieldID,
      icon,
      ...props
    },
    ref
  ) => {
    const IconComponent = icon === false ? null : icon || AlertCircle

    return (
      <div
        ref={ref}
        className={cn(inlineErrorVariants({ variant }), className)}
        id={fieldID ? `${fieldID}-error` : undefined}
        role="alert"
        {...props}
      >
        {IconComponent && (
          <IconComponent className="h-4 w-4 flex-shrink-0 mt-0.5" />
        )}
        <span className="leading-5">{message}</span>
      </div>
    )
  }
)

InlineError.displayName = "InlineError"

export { InlineError, inlineErrorVariants }