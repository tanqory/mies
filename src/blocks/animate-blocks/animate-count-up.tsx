import React from 'react';
import { cn } from '../../components/ui/utils';

export interface AnimateCountUpProps extends React.ComponentProps<'span'> {
  to: number;
  from?: number;
  toFixed?: number;
  duration?: number;
  unit?: 'k' | 'm' | 'b' | string;
  suffix?: string;
  prefix?: string;
}

export function AnimateCountUp({
  to,
  from = 0,
  toFixed = 0,
  duration = 2000,
  unit: unitProp,
  suffix = '',
  prefix = '',
  className,
  ...other
}: AnimateCountUpProps) {
  const [displayValue, setDisplayValue] = React.useState(from);
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  const shortNumber = React.useMemo(() => shortenNumber(to), [to]);
  const endCount = shortNumber ? shortNumber.value : to;
  const unit = unitProp ?? shortNumber?.unit;

  // Intersection Observer for triggering animation when in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation effect
  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = displayValue;
    const difference = endCount - startValue;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + difference * easeOutQuart;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, endCount, duration, displayValue]);

  const formatValue = (value: number) => {
    const rounded = value.toFixed(isFloat(value) ? toFixed : 0);
    return rounded;
  };

  return (
    <span
      ref={ref}
      className={cn('inline-flex', className)}
      {...other}
    >
      {prefix}{formatValue(displayValue)}{unit || suffix}
    </span>
  );
}

// Helper functions
function isFloat(n: number): boolean {
  return typeof n === 'number' && !Number.isInteger(n);
}

function shortenNumber(value: number): { unit: string; value: number } | undefined {
  if (value >= 1e9) {
    return { unit: 'b', value: value / 1e9 };
  }
  if (value >= 1e6) {
    return { unit: 'm', value: value / 1e6 };
  }
  if (value >= 1e3) {
    return { unit: 'k', value: value / 1e3 };
  }
  return undefined;
}

