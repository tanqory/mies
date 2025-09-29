"use client"

import * as React from "react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { PlayIcon, VideoIcon } from "lucide-react"
import { Button } from "../ui/button"

const videoThumbnailVariants = cva(
  "relative overflow-hidden rounded-md border bg-muted group cursor-pointer",
  {
    variants: {
      size: {
        small: "h-20 w-32",
        medium: "h-32 w-48",
        large: "h-40 w-60",
        extraLarge: "h-48 w-72",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

export interface VideoThumbnailProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof videoThumbnailVariants> {
  thumbnailUrl?: string
  videoUrl?: string
  alt?: string
  onPlay?: () => void
  showPlayButton?: boolean
  progress?: number // 0-100 for video progress
  duration?: string
  accessibilityLabel?: string
}

const VideoThumbnail = React.forwardRef<HTMLDivElement, VideoThumbnailProps>(
  (
    {
      className,
      size,
      thumbnailUrl,
      videoUrl,
      alt,
      onPlay,
      showPlayButton = true,
      progress,
      duration,
      accessibilityLabel,
      onClick,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)
    const [imageLoaded, setImageLoaded] = React.useState(false)

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (onPlay) {
        onPlay()
      } else if (videoUrl) {
        window.open(videoUrl, "_blank", "noopener,noreferrer")
      }
      onClick?.(event)
    }

    const showPlaceholder = !thumbnailUrl || imageError || !imageLoaded

    const playButtonSize = {
      small: "h-6 w-6",
      medium: "h-8 w-8",
      large: "h-10 w-10",
      extraLarge: "h-12 w-12",
    }[size || "medium"]

    const iconSize = {
      small: "h-8 w-8",
      medium: "h-12 w-12",
      large: "h-16 w-16",
      extraLarge: "h-20 w-20",
    }[size || "medium"]

    return (
      <div
        ref={ref}
        className={cn(videoThumbnailVariants({ size }), className)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={accessibilityLabel || `Play video: ${alt || "Video"}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleClick(e as any)
          }
        }}
        {...props}
      >
        {/* Thumbnail Image */}
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={alt || "Video thumbnail"}
            className={cn(
              "h-full w-full object-cover transition-opacity",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Placeholder */}
        {showPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <VideoIcon className={cn(iconSize, "text-muted-foreground")} />
          </div>
        )}

        {/* Loading State */}
        {!imageLoaded && thumbnailUrl && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <div className={cn(iconSize, "bg-muted-foreground/20 rounded")} />
          </div>
        )}

        {/* Play Button Overlay */}
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                playButtonSize,
                "rounded-full bg-white/90 hover:bg-white text-black"
              )}
            >
              <PlayIcon className="h-1/2 w-1/2 fill-current ml-0.5" />
            </Button>
          </div>
        )}

        {/* Progress Bar */}
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div
              className="h-full bg-white"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {duration}
          </div>
        )}

        {/* Focus Ring */}
        <div className="absolute inset-0 rounded-md ring-2 ring-ring ring-offset-2 ring-offset-background opacity-0 focus-within:opacity-100 pointer-events-none" />
      </div>
    )
  }
)

VideoThumbnail.displayName = "VideoThumbnail"

export { VideoThumbnail, videoThumbnailVariants }