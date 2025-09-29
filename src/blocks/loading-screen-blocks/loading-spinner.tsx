import { cn } from '../../components/ui/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dots' | 'bars' | 'ring';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  variant = 'default',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'bg-current rounded-full',
                  size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3',
                  'animate-pulse'
                )}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s',
                }}
              />
            ))}
          </div>
        );

      case 'bars':
        return (
          <div className="flex space-x-1 items-end">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'bg-current',
                  size === 'sm' ? 'w-1' : size === 'md' ? 'w-1.5' : 'w-2',
                  'animate-pulse'
                )}
                style={{
                  height: `${20 + Math.random() * 20}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s',
                }}
              />
            ))}
          </div>
        );

      case 'ring':
        return (
          <div
            className={cn(
              sizeClasses[size],
              'border-2 border-current border-t-transparent rounded-full animate-spin'
            )}
          />
        );

      default:
        return (
          <div
            className={cn(
              sizeClasses[size],
              'border-2 border-muted border-t-current rounded-full animate-spin'
            )}
          />
        );
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center text-muted-foreground',
        className
      )}
    >
      {renderVariant()}
    </div>
  );
}

