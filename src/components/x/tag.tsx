import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../ui/utils"
import { X } from "lucide-react"

const tagVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        success: "bg-accent/10 text-accent-foreground",
        warning: "bg-muted/50 text-muted-foreground",
        info: "bg-muted/30 text-muted-foreground",
      },
      size: {
        small: "px-1.5 py-0.5 text-xs",
        medium: "px-2 py-1 text-xs",
        large: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode
  onRemove?: () => void
  disabled?: boolean
  url?: string
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, children, onRemove, disabled, url, onClick, ...props }, ref) => {
    const Component = url ? "a" : "span"

    const handleClick = (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!disabled && onRemove) {
        onRemove()
      }
    }

    return (
      <Component
        ref={ref as any}
        className={cn(
          tagVariants({ variant, size }),
          disabled && "opacity-50 cursor-not-allowed",
          url && "cursor-pointer hover:opacity-80",
          className
        )}
        href={url}
        onClick={handleClick}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            className="ml-1 rounded-sm hover:bg-black/10 dark:hover:bg-white/10 p-0.5 transition-colors"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        )}
      </Component>
    )
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants }