"use client"

import * as React from "react"
import { Upload, AlertCircle, File, Image as ImageIcon } from "lucide-react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Label } from "../ui/label"

const dropzoneVariants = cva(
  "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-border hover:border-primary",
        active: "border-primary bg-primary/5",
        error: "border-destructive bg-destructive/5",
        disabled: "border-muted cursor-not-allowed opacity-60",
      },
      size: {
        sm: "h-32 p-4",
        default: "h-48 p-6",
        lg: "h-64 p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type DropZoneFileType = "file" | "image" | "video"

export interface DropZoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop">,
    VariantProps<typeof dropzoneVariants> {
  label?: string
  labelHidden?: boolean
  id?: string
  accept?: string
  type?: DropZoneFileType
  active?: boolean
  error?: boolean
  overlay?: boolean
  overlayText?: string
  errorOverlayText?: string
  allowMultiple?: boolean
  disabled?: boolean
  children?: React.ReactNode
  customValidator?: (file: File) => boolean
  onDrop?: (files: File[], acceptedFiles: File[], rejectedFiles: File[]) => void
  onDropAccepted?: (acceptedFiles: File[]) => void
  onDropRejected?: (rejectedFiles: File[]) => void
  onDragEnter?: () => void
  onDragLeave?: () => void
  onDragOver?: () => void
  onFileDialogClose?: () => void
}

const DropZone = React.forwardRef<HTMLDivElement, DropZoneProps>(
  (
    {
      className,
      variant,
      size,
      label,
      labelHidden = false,
      id,
      accept,
      type = "file",
      active = false,
      error = false,
      overlay = true,
      overlayText,
      errorOverlayText,
      allowMultiple = true,
      disabled = false,
      children,
      customValidator,
      onDrop,
      onDropAccepted,
      onDropRejected,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onFileDialogClose,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const [internalError, setInternalError] = React.useState(false)
    // @ts-expect-error - dragCounter is used indirectly in drag event handlers
    const [dragCounter, setDragCounter] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const generatedId = React.useId()
    const inputId = id || generatedId

    const fileAccepted = React.useCallback(
      (file: File) => {
        if (!accept) return true
        const acceptTypes = accept.split(",").map(type => type.trim())
        return acceptTypes.some(acceptType => {
          if (acceptType === file.type) return true
          if (acceptType.endsWith("/*")) {
            return file.type.startsWith(acceptType.slice(0, -1))
          }
          if (acceptType.startsWith(".")) {
            return file.name.toLowerCase().endsWith(acceptType.toLowerCase())
          }
          return false
        })
      },
      [accept]
    )

    const validateFiles = React.useCallback(
      (files: FileList | File[]) => {
        const fileArray = Array.from(files)
        const acceptedFiles: File[] = []
        const rejectedFiles: File[] = []

        fileArray.forEach((file) => {
          const isAccepted = fileAccepted(file) && (!customValidator || customValidator(file))
          if (isAccepted) {
            acceptedFiles.push(file)
          } else {
            rejectedFiles.push(file)
          }
        })

        if (!allowMultiple && acceptedFiles.length > 1) {
          rejectedFiles.push(...acceptedFiles.slice(1))
          acceptedFiles.splice(1)
        }

        return { files: fileArray, acceptedFiles, rejectedFiles }
      },
      [fileAccepted, customValidator, allowMultiple]
    )

    const handleDrop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (disabled) return

        setIsDragging(false)
        setDragCounter(0)

        const files = e.dataTransfer.files
        const { files: allFiles, acceptedFiles, rejectedFiles } = validateFiles(files)

        setInternalError(rejectedFiles.length > 0)

        onDrop?.(allFiles, acceptedFiles, rejectedFiles)
        if (acceptedFiles.length > 0) {
          onDropAccepted?.(acceptedFiles)
        }
        if (rejectedFiles.length > 0) {
          onDropRejected?.(rejectedFiles)
        }
      },
      [disabled, validateFiles, onDrop, onDropAccepted, onDropRejected]
    )

    const handleDragEnter = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (disabled) return

        setDragCounter(prev => prev + 1)

        if (!isDragging) {
          setIsDragging(true)
          onDragEnter?.()
        }
      },
      [disabled, isDragging, onDragEnter]
    )

    const handleDragLeave = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (disabled) return

        setDragCounter(prev => {
          const newCounter = prev - 1
          if (newCounter === 0) {
            setIsDragging(false)
            setInternalError(false)
            onDragLeave?.()
          }
          return newCounter
        })
      },
      [disabled, onDragLeave]
    )

    const handleDragOver = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (disabled) return

        onDragOver?.()
      },
      [disabled, onDragOver]
    )

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return

        if (onClick) {
          onClick(e)
        } else {
          inputRef.current?.click()
        }
      },
      [disabled, onClick]
    )

    const handleFileChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        const { files: allFiles, acceptedFiles, rejectedFiles } = validateFiles(files)

        setInternalError(rejectedFiles.length > 0)

        onDrop?.(allFiles, acceptedFiles, rejectedFiles)
        if (acceptedFiles.length > 0) {
          onDropAccepted?.(acceptedFiles)
        }
        if (rejectedFiles.length > 0) {
          onDropRejected?.(rejectedFiles)
        }

        // Reset input value
        e.target.value = ""
        onFileDialogClose?.()
      },
      [validateFiles, onDrop, onDropAccepted, onDropRejected, onFileDialogClose]
    )

    const getIcon = () => {
      if (type === "image") return ImageIcon
      return File
    }

    const getDefaultText = () => {
      const typeText = type === "image" ? "images" : "files"
      const multipleText = allowMultiple ? typeText : type === "image" ? "image" : "file"
      return `Drop ${multipleText} here or click to browse`
    }

    const getOverlayText = () => {
      if (internalError || error) {
        return errorOverlayText || "Some files were rejected"
      }
      return overlayText || getDefaultText()
    }

    const currentVariant =
      disabled ? "disabled" :
      internalError || error ? "error" :
      isDragging || active ? "active" :
      "default"

    const IconComponent = getIcon()

    return (
      <div className="space-y-2">
        {label && !labelHidden && (
          <Label htmlFor={inputId} className={disabled ? "opacity-60" : ""}>
            {label}
          </Label>
        )}

        <div
          ref={ref}
          className={cn(dropzoneVariants({ variant: currentVariant, size }), className)}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          {...props}
        >
          {/* Overlay */}
          {overlay && (isDragging || active) && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col items-center gap-2 text-center">
                {internalError || error ? (
                  <AlertCircle className="h-8 w-8 text-destructive" />
                ) : (
                  <Upload className="h-8 w-8 text-primary" />
                )}
                <p className="text-sm font-medium">
                  {getOverlayText()}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          {children || (
            <div className="flex flex-col items-center gap-4 text-center">
              <IconComponent className="h-10 w-10 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {getDefaultText()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {accept ? `Accepted formats: ${accept}` : "All file types accepted"}
                </p>
              </div>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            multiple={allowMultiple}
            disabled={disabled}
            onChange={handleFileChange}
            className="sr-only"
            aria-hidden="true"
          />
        </div>
      </div>
    )
  }
)

DropZone.displayName = "DropZone"

export { DropZone, dropzoneVariants }