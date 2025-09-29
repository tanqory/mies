"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { FileIcon, ImageIcon, FileTextIcon, MusicIcon, VideoIcon } from "lucide-react"

const thumbnailVariants = cva(
  "relative overflow-hidden rounded-md border bg-muted flex items-center justify-center",
  {
    variants: {
      size: {
        small: "h-8 w-8",
        medium: "h-12 w-12",
        large: "h-16 w-16",
        extraLarge: "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

export type ThumbnailSource = string | "placeholder"

export interface ThumbnailProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thumbnailVariants> {
  source?: ThumbnailSource
  alt?: string
  transparentBackground?: boolean
  fileType?: "image" | "video" | "audio" | "document" | "pdf" | "zip" | "unknown"
}

const getFileIcon = (fileType?: string) => {
  switch (fileType) {
    case "image":
      return ImageIcon
    case "video":
      return VideoIcon
    case "audio":
      return MusicIcon
    case "document":
    case "pdf":
      return FileTextIcon
    default:
      return FileIcon
  }
}

const Thumbnail = React.forwardRef<HTMLDivElement, ThumbnailProps>(
  (
    {
      className,
      size,
      source,
      alt,
      transparentBackground = false,
      fileType,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)
    const [imageLoaded, setImageLoaded] = React.useState(false)

    const isImageSource = source && source !== "placeholder" && !imageError
    const showPlaceholder = !source || source === "placeholder" || imageError || !imageLoaded

    const IconComponent = getFileIcon(fileType)

    const iconSize = {
      small: "h-3 w-3",
      medium: "h-4 w-4",
      large: "h-6 w-6",
      extraLarge: "h-8 w-8",
    }[size || "medium"]

    return (
      <div
        ref={ref}
        className={cn(
          thumbnailVariants({ size }),
          transparentBackground && "bg-transparent border-dashed",
          className
        )}
        {...props}
      >
        {isImageSource && (
          <img
            src={source}
            alt={alt || "Thumbnail"}
            className={cn(
              "h-full w-full object-cover transition-opacity",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {showPlaceholder && (
          <div className="flex items-center justify-center h-full w-full">
            <IconComponent
              className={cn(iconSize, "text-muted-foreground")}
            />
          </div>
        )}

        {!imageLoaded && isImageSource && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <div className={cn(iconSize, "bg-muted-foreground/20 rounded")} />
          </div>
        )}
      </div>
    )
  }
)

Thumbnail.displayName = "Thumbnail"

export { Thumbnail, thumbnailVariants }