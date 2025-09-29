import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../../components/ui/carousel';
import { Card, CardContent } from '../../components/ui/card';
import { AspectRatio } from '../../components/ui/aspect-ratio';
import { cn } from '../../components/ui/utils';

export interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt?: string;
    caption?: string;
  }>;
  aspectRatio?: number;
  showThumbnails?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  className?: string;
}

export function ImageCarousel({
  images,
  aspectRatio = 16 / 9,
  showThumbnails = false,
  autoplay = false,
  autoplayDelay = 3000,
  loop = true,
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoplay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (loop) {
          return (prev + 1) % images.length;
        }
        return prev < images.length - 1 ? prev + 1 : prev;
      });
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, images.length, loop]);

  if (images.length === 0) {
    return <div>No images provided</div>;
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <Carousel className="w-full" opts={{ loop, align: 'start' }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="p-0">
                  <AspectRatio ratio={aspectRatio}>
                    <img
                      src={image.src}
                      alt={image.alt || `Image ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </AspectRatio>
                  {image.caption && (
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground text-center">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>

      {showThumbnails && images.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all',
                index === currentIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-muted hover:border-muted-foreground'
              )}
            >
              <img
                src={image.src}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

