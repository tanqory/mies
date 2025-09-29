"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../ui/button"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        default: "py-12 px-6",
        sm: "py-8 px-4",
        lg: "py-16 px-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface EmptyStateAction {
  content: string
  onAction?: () => void
  url?: string
  external?: boolean
  loading?: boolean
  disabled?: boolean
}

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  heading?: string
  image: string
  largeImage?: string
  imageContained?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
  action?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  footerContent?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      size,
      heading,
      image,
      largeImage,
      imageContained = false,
      fullWidth = false,
      children,
      action,
      secondaryAction,
      footerContent,
      ...props
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = React.useState(false)
    const imageRef = React.useRef<HTMLImageElement>(null)

    React.useEffect(() => {
      if (imageRef.current?.complete) {
        setImageLoaded(true)
      }
    }, [])

    const renderAction = (actionData: EmptyStateAction, variant: "default" | "outline" = "default") => {
      if (actionData.url) {
        return (
          <Button
            variant={variant}
            asChild
            disabled={actionData.disabled}
            className="min-w-[120px]"
          >
            <a
              href={actionData.url}
              target={actionData.external ? "_blank" : undefined}
              rel={actionData.external ? "noopener noreferrer" : undefined}
            >
              {actionData.content}
            </a>
          </Button>
        )
      }

      return (
        <Button
          variant={variant}
          onClick={actionData.onAction}
          disabled={actionData.disabled || actionData.loading}
          className="min-w-[120px]"
        >
          {actionData.loading ? "Loading..." : actionData.content}
        </Button>
      )
    }

    const imageElement = React.useMemo(() => {
      const imageClassNames = cn(
        "transition-opacity duration-300",
        imageLoaded ? "opacity-100" : "opacity-0",
        imageContained ? "max-w-full max-h-[300px] object-contain" : "w-auto h-auto",
        "mx-auto mb-6"
      )

      if (largeImage) {
        return (
          <picture>
            <source media="(min-width: 568px)" srcSet={largeImage} />
            <img
              ref={imageRef}
              src={image}
              alt=""
              role="presentation"
              className={imageClassNames}
              onLoad={() => setImageLoaded(true)}
            />
          </picture>
        )
      }

      return (
        <img
          ref={imageRef}
          src={image}
          alt=""
          role="presentation"
          className={imageClassNames}
          onLoad={() => setImageLoaded(true)}
        />
      )
    }, [image, largeImage, imageContained, imageLoaded])

    const skeletonImage = (
      <div
        className={cn(
          "bg-muted animate-pulse rounded-lg mb-6 mx-auto transition-opacity duration-300",
          imageContained ? "w-[200px] h-[150px]" : "w-[300px] h-[200px]",
          imageLoaded ? "opacity-0" : "opacity-100"
        )}
      />
    )

    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ size }), className)}
        {...props}
      >
        {/* Image Container */}
        <div className="relative">
          {imageElement}
          {!imageLoaded && skeletonImage}
        </div>

        {/* Content */}
        <div className={cn("space-y-4", fullWidth ? "w-full" : "max-w-md")}>
          {/* Heading */}
          {heading && (
            <h3 className="text-lg font-semibold text-foreground">
              {heading}
            </h3>
          )}

          {/* Description */}
          {children && (
            <div className="text-sm text-muted-foreground">
              {children}
            </div>
          )}

          {/* Actions */}
          {(action || secondaryAction) && (
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {secondaryAction && renderAction(secondaryAction, "outline")}
              {action && renderAction(action, "default")}
            </div>
          )}

          {/* Footer Content */}
          {footerContent && (
            <div className="pt-4 text-sm text-muted-foreground">
              {footerContent}
            </div>
          )}
        </div>
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"

export { EmptyState, emptyStateVariants }