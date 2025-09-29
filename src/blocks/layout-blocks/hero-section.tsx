import React from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../components/ui/utils';

export interface HeroAction {
  label: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  href?: string;
  onClick?: () => void;
}

export interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  actions?: HeroAction[];
  alignment?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
}

export function HeroSection({
  badge,
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  overlayOpacity = 0.4,
  actions = [],
  alignment = 'center',
  size = 'lg',
  className,
  children,
}: HeroSectionProps) {
  const sizeClasses = {
    sm: 'py-16 sm:py-20',
    md: 'py-20 sm:py-28',
    lg: 'py-24 sm:py-32',
    xl: 'py-28 sm:py-40',
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const titleSizes = {
    sm: 'text-3xl sm:text-4xl',
    md: 'text-4xl sm:text-5xl',
    lg: 'text-5xl sm:text-6xl',
    xl: 'text-6xl sm:text-7xl',
  };

  return (
    <section className={cn(
      'relative overflow-hidden',
      sizeClasses[size],
      className
    )}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}

      {/* Background Video */}
      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {overlay && (backgroundImage || backgroundVideo) && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            'max-w-4xl mx-auto',
            alignmentClasses[alignment],
            alignment === 'left' && 'mx-0',
            alignment === 'right' && 'ml-auto mr-0'
          )}>
            {/* Badge */}
            {badge && (
              <div className="mb-4">
                <Badge
                  variant="outline"
                  className={cn(
                    'text-sm px-4 py-2',
                    (backgroundImage || backgroundVideo) && 'bg-white/10 text-white border-white/20 backdrop-blur-sm'
                  )}
                >
                  {badge}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h1 className={cn(
              'font-bold tracking-tight mb-6',
              titleSizes[size],
              (backgroundImage || backgroundVideo) ? 'text-white' : 'text-foreground'
            )}>
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <h2 className={cn(
                'text-xl sm:text-2xl font-medium mb-6',
                (backgroundImage || backgroundVideo) ? 'text-white/90' : 'text-muted-foreground'
              )}>
                {subtitle}
              </h2>
            )}

            {/* Description */}
            {description && (
              <p className={cn(
                'text-lg sm:text-xl max-w-2xl mb-8',
                alignment === 'center' && 'mx-auto',
                alignment === 'right' && 'ml-auto mr-0',
                (backgroundImage || backgroundVideo) ? 'text-white/80' : 'text-muted-foreground'
              )}>
                {description}
              </p>
            )}

            {/* Actions */}
            {actions.length > 0 && (
              <div className={cn(
                'flex flex-wrap gap-4',
                alignment === 'center' && 'justify-center',
                alignment === 'right' && 'justify-end'
              )}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'default'}
                    size={action.size || 'lg'}
                    onClick={action.onClick}
                    className={cn(
                      action.variant === 'outline' && (backgroundImage || backgroundVideo) &&
                      'border-white/20 text-white hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}

            {/* Custom Content */}
            {children && (
              <div className="mt-8">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Overlay */}
        <div className={cn(
          'absolute inset-0',
          !backgroundImage && !backgroundVideo && 'bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'
        )} />

        {/* Floating Shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </section>
  );
}