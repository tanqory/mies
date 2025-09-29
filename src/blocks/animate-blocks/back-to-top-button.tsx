import React from 'react';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';

export interface BackToTopButtonProps extends React.ComponentProps<'button'> {
  scrollThreshold?: number;
  isDebounce?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  renderButton?: (isVisible: boolean) => React.ReactElement;
}

export function BackToTopButton({
  scrollThreshold = 300,
  isDebounce = true,
  icon = '↑',
  variant = 'default',
  size = 'icon',
  renderButton,
  className,
  onClick,
  ...other
}: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const debounceTimer = React.useRef<number>();

  const handleScroll = React.useCallback(() => {
    const scrolled = window.pageYOffset;
    const shouldShow = scrolled > scrollThreshold;

    if (isDebounce) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = window.setTimeout(() => {
        setIsVisible(shouldShow);
      }, 100);
    } else {
      setIsVisible(shouldShow);
    }
  }, [scrollThreshold, isDebounce]);

  const handleBackToTop = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    if (onClick) {
      onClick(event);
    }
  }, [onClick]);

  React.useEffect(() => {
    // Initial check
    handleScroll();

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [handleScroll]);

  if (renderButton) {
    const customButton = renderButton(isVisible);
    return React.cloneElement(customButton, {
      onClick: handleBackToTop,
      style: {
        ...customButton.props.style,
        transform: isVisible ? 'scale(1)' : 'scale(0)',
        transition: 'transform 0.3s ease-in-out',
      }
    });
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBackToTop}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 rounded-full shadow-lg',
        'transition-transform duration-300 ease-in-out',
        isVisible ? 'scale-100' : 'scale-0',
        'hover:shadow-xl',
        className
      )}
      {...other}
    >
      {icon}
    </Button>
  );
}

