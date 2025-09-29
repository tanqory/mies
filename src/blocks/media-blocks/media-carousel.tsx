import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

export interface MediaCarouselProps {
  items: MediaItem[];
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showThumbnails?: boolean;
  showIndicators?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
}

export function MediaCarousel({
  items,
  className,
  autoplay = false,
  autoplayInterval = 5000,
  showThumbnails = false,
  showIndicators = true,
  showNavigation = true,
  loop = true,
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(autoplay);
  const intervalRef = React.useRef<number>();

  React.useEffect(() => {
    if (isPlaying && items.length > 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) =>
          loop ? (prev + 1) % items.length : Math.min(prev + 1, items.length - 1)
        );
      }, autoplayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    return;
  }, [isPlaying, items.length, autoplayInterval, loop]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (loop) {
      setCurrentIndex(items.length - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (loop) {
      setCurrentIndex(0);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!items.length) {
    return (
      <Card className="flex items-center justify-center h-64 text-muted-foreground">
        ไม่มีสื่อที่จะแสดง
      </Card>
    );
  }


  return (
    <div className={cn('relative', className)}>
      {/* Main Display */}
      <Card className="relative overflow-hidden aspect-video">
        <div
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt || `Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === currentIndex ? 'eager' : 'lazy'}
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  className="w-full h-full object-cover"
                  poster={item.thumbnail}
                />
              )}
              {(item.title || item.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                  {item.title && (
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  )}
                  {item.description && (
                    <p className="text-sm opacity-90 mt-1">{item.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showNavigation && items.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
              onClick={goToPrevious}
              disabled={!loop && currentIndex === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
              onClick={goToNext}
              disabled={!loop && currentIndex === items.length - 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </>
        )}

        {/* Play/Pause Button */}
        {autoplay && items.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </Button>
        )}
      </Card>

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                currentIndex === index
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground hover:bg-muted-foreground/70'
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && items.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {items.map((item, index) => (
            <button
              key={index}
              className={cn(
                'flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200',
                currentIndex === index
                  ? 'border-primary scale-110'
                  : 'border-transparent opacity-60 hover:opacity-100'
              )}
              onClick={() => goToSlide(index)}
            >
              <img
                src={item.thumbnail || item.src}
                alt={item.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}