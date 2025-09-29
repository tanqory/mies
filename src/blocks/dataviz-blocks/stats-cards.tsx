import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../components/ui/utils';

export interface StatCardData {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon?: React.ReactNode;
  description?: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
}

export interface StatsCardsProps {
  stats: StatCardData[];
  columns?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  animated?: boolean;
}

export function StatsCards({
  stats,
  columns = 4,
  className,
  animated = true,
}: StatsCardsProps) {
  const getGridClasses = () => {
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    };
    return gridCols[columns];
  };

  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'decrease':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };

  const getChangeColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'decrease':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getCardColorClasses = (color: StatCardData['color']) => {
    switch (color) {
      case 'primary':
        return 'border-primary/20 bg-primary/5 dark:bg-primary/10';
      case 'secondary':
        return 'border-secondary/20 bg-secondary/5 dark:bg-secondary/10';
      case 'success':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'destructive':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      default:
        return '';
    }
  };

  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      }
      if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return value.toLocaleString();
    }
    return value;
  };

  const formatChangeValue = (value: number): string => {
    const absValue = Math.abs(value);
    if (absValue >= 1000000) {
      return (absValue / 1000000).toFixed(1) + 'M';
    }
    if (absValue >= 1000) {
      return (absValue / 1000).toFixed(1) + 'K';
    }
    return absValue.toFixed(1);
  };

  return (
    <div className={cn('grid gap-4', getGridClasses(), className)}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={cn(
            'transition-all duration-200',
            animated && 'hover:shadow-md hover:scale-[1.02]',
            getCardColorClasses(stat.color)
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon && (
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {stat.icon}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Main Value */}
            <div className="text-2xl font-bold">
              {formatValue(stat.value)}
            </div>

            {/* Change Indicator */}
            {stat.change && (
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className={cn(
                    'text-xs px-2 py-1 font-medium',
                    getChangeColor(stat.change.type)
                  )}
                >
                  <span className="flex items-center space-x-1">
                    {getChangeIcon(stat.change.type)}
                    <span>{formatChangeValue(stat.change.value)}%</span>
                  </span>
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {stat.change.period}
                </span>
              </div>
            )}

            {/* Description */}
            {stat.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}