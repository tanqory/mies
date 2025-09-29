import React from 'react';
import { cn } from '../../components/ui/utils';

export interface MotionContainerProps extends React.ComponentProps<'div'> {
  staggerChildren?: number;
  delayChildren?: number;
  animationVariant?: 'fade' | 'slide' | 'scale' | 'bounce';
  duration?: number;
}

export function MotionContainer({
  staggerChildren = 0.1,
  delayChildren = 0,
  animationVariant = 'fade',
  duration = 0.5,
  className,
  children,
  ...other
}: MotionContainerProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';

    switch (animationVariant) {
      case 'slide':
        return `${baseClasses} transform translate-y-8 opacity-0`;
      case 'scale':
        return `${baseClasses} transform scale-95 opacity-0`;
      case 'bounce':
        return `${baseClasses} transform scale-95 opacity-0`;
      default: // fade
        return `${baseClasses} opacity-0`;
    }
  };

  const getVisibleClasses = () => {
    switch (animationVariant) {
      case 'slide':
        return 'transform translate-y-0 opacity-100';
      case 'scale':
        return 'transform scale-100 opacity-100';
      case 'bounce':
        return 'transform scale-100 opacity-100 animate-bounce';
      default: // fade
        return 'opacity-100';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        getAnimationClasses(),
        isVisible && getVisibleClasses(),
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delayChildren}s`,
      }}
      {...other}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            style: {
              ...child.props.style,
              transitionDelay: `${delayChildren + index * staggerChildren}s`,
              transitionDuration: `${duration}s`,
              transitionProperty: 'all',
              transitionTimingFunction: 'ease-out',
            },
            className: cn(
              child.props.className,
              getAnimationClasses(),
              isVisible && getVisibleClasses()
            ),
          });
        }
        return child;
      })}
    </div>
  );
}

