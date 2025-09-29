import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../components/ui/utils';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export interface CountUpCardProps {
  title: string;
  value: number;
  previousValue?: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  animationDuration?: number;
}

export function CountUpCard({
  title,
  value,
  previousValue,
  suffix = '',
  prefix = '',
  description,
  trend = 'neutral',
  className,
  animationDuration = 2000,
}: CountUpCardProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = displayValue;
    const difference = value - startValue;

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(startValue + difference * easeOutQuart);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateValue);
  }, [value, animationDuration]);

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-accent';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <ArrowRight className="h-3 w-3" />;
    }
  };

  const changePercentage = React.useMemo(() => {
    if (!previousValue || previousValue === 0) return null;
    const change = ((value - previousValue) / previousValue) * 100;
    return change.toFixed(1);
  }, [value, previousValue]);

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K';
    }
    return val.toLocaleString();
  };

  return (
    <Card className={cn('transition-all duration-200 hover:shadow-md', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <span
            className={cn(
              'text-2xl font-bold transition-all duration-300',
              isAnimating && 'text-primary'
            )}
          >
            {prefix}{formatValue(displayValue)}{suffix}
          </span>
          {changePercentage && (
            <Badge
              variant="secondary"
              className={cn('text-xs', getTrendColor())}
            >
              <span className="flex items-center gap-1">
                {getTrendIcon()} {changePercentage}%
              </span>
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}