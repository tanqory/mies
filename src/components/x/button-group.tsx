import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../ui/utils"

const buttonGroupVariants = cva(
  "inline-flex",
  {
    variants: {
      spacing: {
        none: "[&>*]:border-l-0 [&>*:first-child]:border-l [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*]:rounded-none",
        extraTight: "gap-1",
        tight: "gap-2",
        loose: "gap-4",
        extraLoose: "gap-6",
      },
      variant: {
        default: "",
        segmented: "[&>*]:border-l-0 [&>*:first-child]:border-l [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*]:rounded-none",
      }
    },
    defaultVariants: {
      spacing: "tight",
      variant: "default",
    },
  }
)

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  children: React.ReactNode
  spacing?: "none" | "extraTight" | "tight" | "loose" | "extraLoose"
  variant?: "default" | "segmented"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, spacing, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(buttonGroupVariants({ spacing, variant, className }))}
        role="group"
        {...props}
      >
        {children}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup, buttonGroupVariants }