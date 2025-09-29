"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { ExternalLink } from "lucide-react"

const footerHelpVariants = cva(
  "text-sm text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        subtle: "text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface FooterHelpProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerHelpVariants> {
  children: React.ReactNode
}

const FooterHelp = React.forwardRef<HTMLDivElement, FooterHelpProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(footerHelpVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FooterHelp.displayName = "FooterHelp"

// Footer Help Link component for creating help links
export interface FooterHelpLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string
  external?: boolean
  children: React.ReactNode
}

const FooterHelpLink = React.forwardRef<HTMLAnchorElement, FooterHelpLinkProps>(
  ({ className, url, external = false, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (external) {
        e.preventDefault()
        window.open(url, "_blank", "noopener,noreferrer")
      }
    }

    return (
      <a
        ref={ref}
        href={url}
        className={cn(
          "text-primary underline-offset-4 hover:underline inline-flex items-center gap-1",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {external && <ExternalLink className="h-3 w-3" />}
      </a>
    )
  }
)

FooterHelpLink.displayName = "FooterHelpLink"

export { FooterHelp, FooterHelpLink, footerHelpVariants }