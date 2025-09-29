import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../ui/utils"
import * as LucideIcons from "lucide-react"

const iconVariants = cva(
  "shrink-0",
  {
    variants: {
      size: {
        extraSmall: "h-3 w-3",
        small: "h-4 w-4",
        medium: "h-5 w-5",
        large: "h-6 w-6",
        extraLarge: "h-8 w-8",
      },
      tone: {
        inherit: "text-inherit",
        subdued: "text-muted-foreground",
        critical: "text-destructive",
        warning: "text-yellow-600 dark:text-yellow-400",
        success: "text-green-600 dark:text-green-400",
        primary: "text-primary",
        info: "text-blue-600 dark:text-blue-400",
      },
    },
    defaultVariants: {
      size: "medium",
      tone: "inherit",
    },
  }
)

export interface IconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconVariants> {
  source: keyof typeof LucideIcons | React.ComponentType<{ className?: string }>
  accessibilityLabel?: string
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, source, size, tone, accessibilityLabel, ...props }, ref) => {
    let IconComponent: React.ComponentType<{ className?: string }>

    if (typeof source === "string") {
      IconComponent = LucideIcons[source] as React.ComponentType<{ className?: string }>
      if (!IconComponent) {
        console.warn(`Icon "${source}" not found in Lucide icons`)
        IconComponent = LucideIcons.HelpCircle
      }
    } else {
      IconComponent = source
    }

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center justify-center", className)}
        role="img"
        aria-label={accessibilityLabel}
        {...props}
      >
        <IconComponent className={cn(iconVariants({ size, tone }))} />
      </span>
    )
  }
)
Icon.displayName = "Icon"

export { Icon, iconVariants }