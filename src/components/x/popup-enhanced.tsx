"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { X } from "lucide-react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const popupVariants = cva(
  "z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
  {
    variants: {
      variant: {
        default: "border-border",
        minimal: "border-none shadow-lg",
        bordered: "border-2",
      },
      size: {
        sm: "w-48 p-2",
        default: "w-64 p-4",
        lg: "w-80 p-6",
        xl: "w-96 p-8",
        auto: "max-w-sm p-4",
      },
      animation: {
        default: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        slide: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-4 data-[side=left]:slide-in-from-right-4 data-[side=right]:slide-in-from-left-4 data-[side=top]:slide-in-from-bottom-4",
        fade: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "default",
    },
  }
)

export interface PopupEnhancedProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popupVariants> {
  trigger: React.ReactNode
  title?: string
  description?: string
  closable?: boolean
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerAsChild?: boolean
  modal?: boolean
  arrow?: boolean
  offset?: number
}

const PopupEnhanced = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopupEnhancedProps
>(
  (
    {
      className,
      variant,
      size,
      animation,
      trigger,
      title,
      description,
      closable = true,
      closeOnClickOutside = true,
      closeOnEscape = true,
      defaultOpen,
      open,
      onOpenChange,
      triggerAsChild = false,
      modal = false,
      arrow = false,
      offset = 4,
      align = "center",
      side = "bottom",
      children,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false)

    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen

    const handleOpenChange = (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    }

    return (
      <PopoverPrimitive.Root
        open={isOpen}
        onOpenChange={handleOpenChange}
        modal={modal}
      >
        <PopoverPrimitive.Trigger asChild={triggerAsChild}>
          {triggerAsChild ? trigger : <button type="button">{trigger}</button>}
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={ref}
            align={align}
            side={side}
            sideOffset={offset}
            className={cn(popupVariants({ variant, size, animation }), className)}
            onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
            onPointerDownOutside={closeOnClickOutside ? undefined : (e) => e.preventDefault()}
            {...props}
          >
            {/* Header */}
            {(title || closable) && (
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {title && (
                    <h3 className="text-sm font-semibold leading-none">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {description}
                    </p>
                  )}
                </div>

                {closable && (
                  <PopoverPrimitive.Close className="ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </PopoverPrimitive.Close>
                )}
              </div>
            )}

            {/* Content */}
            <div className={cn(
              (title || description) && "mt-3"
            )}>
              {children}
            </div>

            {/* Arrow */}
            {arrow && (
              <PopoverPrimitive.Arrow className="fill-popover" />
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    )
  }
)

PopupEnhanced.displayName = "PopupEnhanced"

// Compound components for better organization
const PopupTrigger = PopoverPrimitive.Trigger
const PopupContent = PopoverPrimitive.Content
const PopupClose = PopoverPrimitive.Close

// Hook for programmatic control
export const usePopup = () => {
  const [open, setOpen] = React.useState(false)

  const openPopup = React.useCallback(() => setOpen(true), [])
  const closePopup = React.useCallback(() => setOpen(false), [])
  const togglePopup = React.useCallback(() => setOpen(prev => !prev), [])

  return {
    open,
    setOpen,
    openPopup,
    closePopup,
    togglePopup,
  }
}

// Enhanced hook with more features
export const usePopupEnhanced = (options?: {
  defaultOpen?: boolean
  autoClose?: boolean
  autoCloseDelay?: number
  closeOnOutsideClick?: boolean
}) => {
  const {
    defaultOpen = false,
    autoClose = false,
    autoCloseDelay = 3000,
    closeOnOutsideClick = true,
  } = options || {}

  const [open, setOpen] = React.useState(defaultOpen)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()

  const openPopup = React.useCallback(() => {
    setOpen(true)

    if (autoClose && autoCloseDelay > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setOpen(false)
      }, autoCloseDelay)
    }
  }, [autoClose, autoCloseDelay])

  const closePopup = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setOpen(false)
  }, [])

  const togglePopup = React.useCallback(() => {
    if (open) {
      closePopup()
    } else {
      openPopup()
    }
  }, [open, openPopup, closePopup])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    open,
    setOpen,
    openPopup,
    closePopup,
    togglePopup,
    closeOnOutsideClick,
  }
}

export {
  PopupEnhanced,
  PopupTrigger,
  PopupContent,
  PopupClose,
  popupVariants
}