import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../ui/utils"
import { ExternalLink } from "lucide-react"

const linkVariants = cva(
  "inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80 underline underline-offset-4",
        plain: "text-inherit hover:text-primary no-underline",
        critical: "text-destructive hover:text-destructive/80 underline underline-offset-4",
        monospace: "font-mono text-primary hover:text-primary/80 underline underline-offset-4",
      },
      tone: {
        inherit: "",
        subdued: "text-muted-foreground hover:text-foreground",
        critical: "text-destructive hover:text-destructive/80",
        primary: "text-primary hover:text-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  url?: string
  external?: boolean
  children: React.ReactNode
  monochrome?: boolean
  removeUnderline?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({
    className,
    variant,
    tone,
    url,
    href,
    external,
    children,
    monochrome,
    removeUnderline,
    target,
    rel,
    ...props
  }, ref) => {
    const finalUrl = url || href
    const isExternal = external || (finalUrl && (finalUrl.startsWith("http") || finalUrl.startsWith("mailto:")))

    const finalTarget = target || (isExternal ? "_blank" : undefined)
    const finalRel = rel || (isExternal ? "noopener noreferrer" : undefined)

    return (
      <a
        ref={ref}
        href={finalUrl}
        target={finalTarget}
        rel={finalRel}
        className={cn(
          linkVariants({ variant, tone }),
          monochrome && "text-inherit hover:text-inherit",
          removeUnderline && "no-underline",
          className
        )}
        {...props}
      >
        {children}
        {isExternal && (
          <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
        )}
      </a>
    )
  }
)
Link.displayName = "Link"

export { Link, linkVariants }