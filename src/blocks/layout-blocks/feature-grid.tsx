import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../components/ui/utils';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  badge?: string;
  link?: {
    href: string;
    label: string;
  };
  coming_soon?: boolean;
}

export interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'cards' | 'minimal';
  showImages?: boolean;
  className?: string;
  onFeatureClick?: (feature: Feature) => void;
}

export function FeatureGrid({
  title,
  subtitle,
  features,
  columns = 3,
  variant = 'cards',
  showImages = true,
  className,
  onFeatureClick,
}: FeatureGridProps) {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const handleFeatureClick = (feature: Feature) => {
    if (!feature.coming_soon) {
      onFeatureClick?.(feature);
    }
  };

  const renderFeature = (feature: Feature) => {
    const content = (
      <>
        {/* Image */}
        {showImages && feature.image && (
          <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Icon */}
        {feature.icon && !feature.image && (
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {feature.icon}
            </div>
          </div>
        )}

        {/* Badge */}
        {feature.badge && (
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {feature.badge}
            </Badge>
          </div>
        )}

        {/* Coming Soon Badge */}
        {feature.coming_soon && (
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              เร็วๆ นี้
            </Badge>
          </div>
        )}

        {/* Title */}
        <h3 className={cn(
          'font-semibold mb-2',
          variant === 'minimal' ? 'text-lg' : 'text-xl',
          feature.coming_soon && 'opacity-60'
        )}>
          {feature.title}
        </h3>

        {/* Description */}
        <p className={cn(
          'text-muted-foreground mb-4',
          variant === 'minimal' ? 'text-sm' : 'text-base',
          feature.coming_soon && 'opacity-60'
        )}>
          {feature.description}
        </p>

        {/* Link */}
        {feature.link && !feature.coming_soon && (
          <div className="mt-auto pt-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto font-medium"
              onClick={() => handleFeatureClick(feature)}
            >
              {feature.link.label}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}
      </>
    );

    if (variant === 'minimal') {
      return (
        <div
          key={feature.id}
          className={cn(
            'group text-center cursor-pointer p-4 rounded-lg transition-colors',
            !feature.coming_soon && 'hover:bg-muted/50',
            feature.coming_soon && 'cursor-not-allowed'
          )}
          onClick={() => handleFeatureClick(feature)}
        >
          {content}
        </div>
      );
    }

    return (
      <Card
        key={feature.id}
        className={cn(
          'group h-full transition-all duration-300',
          !feature.coming_soon && 'cursor-pointer hover:shadow-lg hover:-translate-y-1',
          feature.coming_soon && 'cursor-not-allowed opacity-75',
          variant === 'cards' && 'border-border/50'
        )}
        onClick={() => handleFeatureClick(feature)}
      >
        <CardHeader className={cn(
          variant === 'cards' ? 'pb-4' : 'pb-2'
        )}>
          <div className="space-y-2">
            {/* Image in header for cards variant */}
            {variant === 'cards' && showImages && feature.image && (
              <div className="w-full h-32 rounded-md overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Icon in header */}
            {feature.icon && (variant !== 'cards' || !feature.image) && (
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {feature.icon}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <CardTitle className={cn(
                feature.coming_soon && 'opacity-60'
              )}>
                {feature.title}
              </CardTitle>
              {feature.badge && (
                <Badge variant="secondary" className="text-xs">
                  {feature.badge}
                </Badge>
              )}
              {feature.coming_soon && (
                <Badge variant="outline" className="text-xs">
                  เร็วๆ นี้
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col h-full">
          <CardDescription className={cn(
            'flex-1',
            feature.coming_soon && 'opacity-60'
          )}>
            {feature.description}
          </CardDescription>

          {feature.link && !feature.coming_soon && (
            <div className="mt-4 pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto font-medium text-primary hover:text-primary/80"
              >
                {feature.link.label}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <section className={cn('py-16 sm:py-20', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12 sm:mb-16">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        <div className={cn(
          'grid gap-6 sm:gap-8',
          gridColsClass[columns]
        )}>
          {features.map(renderFeature)}
        </div>
      </div>
    </section>
  );
}