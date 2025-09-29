import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../components/ui/utils';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const DEFAULT_ICON = (
  <svg
    className="mx-auto h-16 w-16 text-muted-foreground/40"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      vectorEffect="non-scaling-stroke"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6.5M7 13l-4-4 4-4m2 8h.01"
    />
  </svg>
);

export function EmptyState({
  title = 'No data available',
  description,
  icon = DEFAULT_ICON,
  image,
  actionLabel,
  onAction,
  className,
  size = 'md',
}: EmptyStateProps) {
  const sizeClasses = {
    sm: 'py-6 px-4',
    md: 'py-12 px-6',
    lg: 'py-16 px-8',
  };

  const iconSizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className={cn('text-center', sizeClasses[size])}>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Icon or Image */}
          <div className="flex-shrink-0">
            {image ? (
              <img
                src={image}
                alt="Empty state"
                className={cn(
                  'mx-auto object-contain opacity-60',
                  iconSizeClasses[size]
                )}
              />
            ) : (
              <div className={cn('mx-auto', iconSizeClasses[size])}>
                {icon}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2 max-w-sm">
            <h3 className="text-lg font-semibold text-muted-foreground">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Action */}
          {actionLabel && onAction && (
            <Button
              onClick={onAction}
              variant="outline"
              size={size === 'sm' ? 'sm' : 'default'}
              className="mt-4"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

