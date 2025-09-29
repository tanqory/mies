"use client"

import * as React from "react"
import { X, AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { cn } from "../ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const notificationVariants = cva(
  "relative flex items-start gap-3 rounded-lg border p-4 shadow-md transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        notice: "border-muted bg-muted/30 text-foreground",
        warning: "border-muted bg-muted/50 text-foreground",
        success: "border-accent/20 bg-accent/5 text-foreground",
        destructive: "border-destructive/20 bg-destructive/5 text-foreground",
      },
      theme: {
        default: "",
        light: "bg-background border-border text-foreground",
        dark: "bg-background border-border text-foreground",
      },
      animation: {
        fadeIn: "animate-in slide-in-from-top-2 fade-in-0",
        fadeOut: "animate-out slide-out-to-top-2 fade-out-0",
        slideIn: "animate-in slide-in-from-right-full",
        slideOut: "animate-out slide-out-to-right-full",
      },
    },
    defaultVariants: {
      variant: "default",
      theme: "default",
      animation: "fadeIn",
    },
  }
)

export type NotificationType = "default" | "notice" | "warning" | "success" | "destructive"

export interface NotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof notificationVariants> {
  title?: string
  description?: string
  closable?: boolean
  onClose?: () => void
  autoClose?: boolean
  autoCloseDelay?: number
  icon?: React.ReactNode
  showIcon?: boolean
  action?: React.ReactNode
}

const getDefaultIcon = (variant: NotificationType) => {
  switch (variant) {
    case "notice":
      return <Info className="h-4 w-4" />
    case "warning":
      return <AlertTriangle className="h-4 w-4" />
    case "success":
      return <CheckCircle className="h-4 w-4" />
    case "destructive":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Info className="h-4 w-4" />
  }
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      className,
      variant = "default",
      theme,
      animation,
      title,
      description,
      closable = true,
      onClose,
      autoClose = false,
      autoCloseDelay = 5000,
      icon,
      showIcon = true,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true)
    const [isExiting, setIsExiting] = React.useState(false)
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()

    React.useEffect(() => {
      if (autoClose && autoCloseDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          handleClose()
        }, autoCloseDelay)
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [autoClose, autoCloseDelay])

    const handleClose = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      setIsExiting(true)

      // Wait for exit animation before hiding
      setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, 150)
    }

    if (!isVisible) {
      return null
    }

    const displayIcon = icon || (showIcon ? getDefaultIcon(variant || "default") : null)

    return (
      <div
        ref={ref}
        className={cn(
          notificationVariants({
            variant,
            theme,
            animation: isExiting ? "fadeOut" : animation
          }),
          className
        )}
        role="alert"
        {...props}
      >
        {/* Icon */}
        {displayIcon && (
          <div className="flex-shrink-0 mt-0.5">
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold mb-1">
              {title}
            </h4>
          )}

          {description && (
            <p className="text-sm opacity-90">
              {description}
            </p>
          )}

          {children && (
            <div className="mt-2">
              {children}
            </div>
          )}

          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>

        {/* Close Button */}
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className="flex-shrink-0 rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)

Notification.displayName = "Notification"

// Notification Provider/Container for managing multiple notifications
interface NotificationItem extends NotificationProps {
  id: string
}

interface NotificationContextType {
  notifications: NotificationItem[]
  addNotification: (notification: Omit<NotificationItem, 'id'>) => string
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = React.createContext<NotificationContextType | null>(null)

export interface NotificationProviderProps {
  children: React.ReactNode
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  maxNotifications?: number
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  position = "top-right",
  maxNotifications = 5,
}) => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([])

  const addNotification = (notification: Omit<NotificationItem, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }

    setNotifications(prev => {
      const updated = [newNotification, ...prev]
      return updated.slice(0, maxNotifications)
    })

    return id
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}

      {/* Notification Container */}
      <div
        className={cn(
          "fixed z-50 flex flex-col gap-2 pointer-events-none",
          positionClasses[position]
        )}
        style={{ maxWidth: "400px", width: "calc(100vw - 2rem)" }}
      >
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification
              {...notification}
              onClose={() => removeNotification(notification.id)}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export { Notification, notificationVariants }