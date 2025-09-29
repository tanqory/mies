import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../ui/utils"

const dividerVariants = cva(
  "border-border",
  {
    variants: {
      orientation: {
        horizontal: "w-full border-t",
        vertical: "h-full border-l",
      },
      spacing: {
        none: "",
        extraTight: "my-1",
        tight: "my-2",
        loose: "my-4",
        extraLoose: "my-6",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      spacing: "tight",
    },
  }
)

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  orientation?: "horizontal" | "vertical"
  spacing?: "none" | "extraTight" | "tight" | "loose" | "extraLoose"
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, spacing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ orientation, spacing, className }))}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    )
  }
)
Divider.displayName = "Divider"

export { Divider, dividerVariants }