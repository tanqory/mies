import React from 'react';
import { cn } from '../../components/ui/utils';

export interface AnimateTextProps extends React.ComponentProps<'div'> {
  textContent: string | string[];
  repeatDelayMs?: number;
  staggerDelay?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'typewriter';
}

export function AnimateText({
  textContent,
  repeatDelayMs = 0,
  staggerDelay = 50,
  animationType = 'fade',
  className,
  children,
  ...other
}: AnimateTextProps) {
  const [isInView, setIsInView] = React.useState(false);
  const [animationKey, setAnimationKey] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const textArray = React.useMemo(
    () => (Array.isArray(textContent) ? textContent.filter(item => item != null) : [textContent || '']),
    [textContent]
  );

  // Intersection Observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle repeat animation
  React.useEffect(() => {
    if (!isInView || !repeatDelayMs) return;

    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, repeatDelayMs);

    return () => clearInterval(interval);
  }, [isInView, repeatDelayMs]);

  const getAnimationClasses = () => {
    const baseClasses = 'inline-block transition-all duration-500 ease-out';

    switch (animationType) {
      case 'slide':
        return `${baseClasses} transform translate-y-4 opacity-0 animate-[slideUp_0.5s_ease-out_forwards]`;
      case 'scale':
        return `${baseClasses} transform scale-0 opacity-0 animate-[scaleIn_0.5s_ease-out_forwards]`;
      case 'typewriter':
        return `${baseClasses} opacity-0 animate-[typewriter_0.1s_ease-out_forwards]`;
      default: // fade
        return `${baseClasses} opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]`;
    }
  };

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      {...other}
    >
      {/* Screen reader content */}
      <span className="sr-only">
        {textArray.join(' ')}
      </span>

      {/* Animated content */}
      <div
        aria-hidden
        className="relative"
        key={animationKey}
      >
        {textArray.map((line, lineIndex) => (
          <div
            key={`${line}-${lineIndex}`}
            className="block"
          >
            {(line || '').split(' ').map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className="inline-block"
              >
                {(word || '').split('').map((char, charIndex) => (
                  <span
                    key={`${char}-${charIndex}`}
                    className={cn(
                      getAnimationClasses(),
                      !isInView && 'opacity-0'
                    )}
                    style={{
                      animationDelay: isInView
                        ? `${(lineIndex * 100 + wordIndex * 50 + charIndex * staggerDelay)}ms`
                        : '0ms',
                    }}
                  >
                    {char}
                  </span>
                ))}
                {wordIndex < (line || '').split(' ').length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes typewriter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

