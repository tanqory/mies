import React from 'react';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';

export interface NotificationToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  className?: string;
}

export interface ToastContextValue {
  toasts: NotificationToastProps[];
  addToast: (toast: Omit<NotificationToastProps, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<NotificationToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<NotificationToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    if (!toast.persistent && toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }

    return id;
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 w-full max-w-sm p-4 space-y-4 pointer-events-none">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

function Toast({
  id,
  title,
  description,
  variant = 'default',
  action,
  onClose,
  className,
}: NotificationToastProps) {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLeaving, setIsLeaving] = React.useState(false);

  React.useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose?.();
      removeToast(id);
    }, 300);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return 'border-destructive/50 bg-destructive text-destructive-foreground';
      case 'success':
        return 'border-green-500/50 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100';
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100';
      default:
        return 'border-border bg-background text-foreground';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'destructive':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={cn(
        'pointer-events-auto relative w-full rounded-lg border p-4 shadow-lg transition-all duration-300',
        getVariantStyles(),
        isVisible && !isLeaving
          ? 'transform translate-x-0 opacity-100'
          : 'transform translate-x-full opacity-0',
        isLeaving && 'transform translate-x-full opacity-0',
        className
      )}
      style={{
        transition: isLeaving
          ? 'all 0.3s ease-in-out'
          : 'all 0.3s ease-out'
      }}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{title}</div>
          {description && (
            <div className="text-sm opacity-90 mt-1">{description}</div>
          )}

          {/* Action */}
          {action && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className={cn(
                  'h-8 px-3 text-xs',
                  variant === 'success' && 'border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-800/20',
                  variant === 'warning' && 'border-yellow-200 hover:bg-yellow-100 dark:border-yellow-800 dark:hover:bg-yellow-800/20',
                  variant === 'destructive' && 'border-destructive/20 hover:bg-destructive/10'
                )}
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
          onClick={handleClose}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

// Helper functions for common toast types
export const toast = {
  success: (message: string, options?: Partial<NotificationToastProps>) => {
    const { addToast } = useToast();
    return addToast({
      title: message,
      variant: 'success',
      duration: 4000,
      ...options,
    });
  },

  error: (message: string, options?: Partial<NotificationToastProps>) => {
    const { addToast } = useToast();
    return addToast({
      title: message,
      variant: 'destructive',
      duration: 6000,
      ...options,
    });
  },

  warning: (message: string, options?: Partial<NotificationToastProps>) => {
    const { addToast } = useToast();
    return addToast({
      title: message,
      variant: 'warning',
      duration: 5000,
      ...options,
    });
  },

  info: (message: string, options?: Partial<NotificationToastProps>) => {
    const { addToast } = useToast();
    return addToast({
      title: message,
      variant: 'default',
      duration: 4000,
      ...options,
    });
  },
};