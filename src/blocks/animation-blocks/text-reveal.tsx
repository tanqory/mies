import React from 'react';
import { cn } from '../../components/ui/utils';

export interface TextRevealProps {
  text: string;
  className?: string;
  variant?: 'fade-up' | 'fade-in' | 'slide-right' | 'typewriter';
  duration?: number;
  delay?: number;
  trigger?: 'onMount' | 'onVisible';
  as?: keyof JSX.IntrinsicElements;
}

export function TextReveal({
  text,
  className,
  variant = 'fade-up',
  duration = 1000,
  delay = 0,
  trigger = 'onMount',
  as: _Component = 'div',
}: TextRevealProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentText, setCurrentText] = React.useState('');
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (trigger === 'onMount') {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
    return;
  }, [trigger, delay]);

  React.useEffect(() => {
    if (trigger === 'onVisible' && ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
            observer.unobserve(entry?.target);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    return;
  }, [trigger, delay]);

  React.useEffect(() => {
    if (variant === 'typewriter' && isVisible) {
      let currentIndex = 0;
      const typewriter = () => {
        if (currentIndex <= text.length) {
          setCurrentText(text.slice(0, currentIndex));
          currentIndex++;
          setTimeout(typewriter, duration / text.length);
        }
      };
      typewriter();
    }
    return;
  }, [isVisible, text, variant, duration]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all';

    switch (variant) {
      case 'fade-up':
        return cn(
          baseClasses,
          'transform',
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        );
      case 'fade-in':
        return cn(
          baseClasses,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
      case 'slide-right':
        return cn(
          baseClasses,
          'transform',
          isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-8'
        );
      case 'typewriter':
        return cn(baseClasses, 'opacity-100');
      default:
        return baseClasses;
    }
  };

  const animationStyle = {
    transitionDuration: variant === 'typewriter' ? '0ms' : `${duration}ms`,
  };

  const displayText = variant === 'typewriter' ? currentText : text;

  // Simplify to avoid complex union type issues - use div directly
  return (
    <div
      ref={trigger === 'onVisible' ? ref : undefined}
      className={cn(getAnimationClasses(), className)}
      style={animationStyle}
    >
      {displayText}
      {variant === 'typewriter' && (
        <span className={cn(
          'inline-block w-0.5 h-[1em] bg-current ml-1 animate-pulse',
          currentText.length === text.length ? 'opacity-0' : ''
        )} />
      )}
    </div>
  );
}