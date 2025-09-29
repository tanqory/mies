import React from 'react';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';

export interface ScrollToTopProps {
  threshold?: number;
  behavior?: 'smooth' | 'auto';
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  icon?: React.ReactNode;
  showProgressRing?: boolean;
}

export function ScrollToTop({
  threshold = 400,
  behavior = 'smooth',
  className,
  size = 'default',
  variant = 'default',
  position = 'bottom-right',
  icon,
  showProgressRing = false,
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(scrolled > threshold);

      if (showProgressRing && maxScroll > 0) {
        setScrollProgress((scrolled / maxScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, showProgressRing]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-8 left-8';
      case 'bottom-center':
        return 'bottom-8 left-1/2 transform -translate-x-1/2';
      default:
        return 'bottom-8 right-8';
    }
  };

  const defaultIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  );

  return (
    <div
      className={cn(
        'fixed z-50 transition-all duration-300 transform',
        getPositionClasses(),
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none',
        className
      )}
    >
      <div className="relative">
        {showProgressRing && (
          <div className="absolute inset-0 rounded-full">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <circle
                className="stroke-muted"
                strokeWidth="2"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
              <circle
                className="stroke-primary transition-all duration-300"
                strokeWidth="2"
                strokeDasharray={`${scrollProgress} 100`}
                strokeLinecap="round"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
            </svg>
          </div>
        )}
        <Button
          variant={variant}
          size={size}
          onClick={handleClick}
          className={cn(
            'rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200',
            'hover:scale-105 active:scale-95',
            showProgressRing && 'relative z-10'
          )}
        >
          {icon || defaultIcon}
        </Button>
      </div>
    </div>
  );
}