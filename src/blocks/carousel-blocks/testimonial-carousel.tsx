import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../../components/ui/carousel';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../components/ui/utils';

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
  featured?: boolean;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showRating?: boolean;
  showAvatar?: boolean;
  loop?: boolean;
  itemsPerView?: number;
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  autoplay = true,
  autoplayDelay = 5000,
  showRating = true,
  showAvatar = true,
  loop = true,
  itemsPerView = 1,
  className,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (loop) {
          return (prev + 1) % testimonials.length;
        }
        return prev < testimonials.length - 1 ? prev + 1 : prev;
      });
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, testimonials.length, loop]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={cn(
          'text-lg',
          i < rating ? 'text-yellow-500' : 'text-muted-foreground/30'
        )}
      >
        ★
      </span>
    ));
  };

  if (testimonials.length === 0) {
    return <div>No testimonials provided</div>;
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <Carousel
        className="w-full"
        opts={{
          loop,
          align: 'start',
          skipSnaps: false,
          duration: 15
        }}
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className={cn(
                itemsPerView === 2 && 'md:basis-1/2',
                itemsPerView === 3 && 'md:basis-1/3'
              )}
            >
              <Card className={cn(
                'h-full transition-all duration-300 hover:shadow-lg',
                testimonial.featured && 'border-primary/50 bg-primary/5'
              )}>
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Quote */}
                  <div className="flex-grow">
                    <div className="text-4xl text-primary/20 font-serif mb-2">"</div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {testimonial.content}
                    </p>
                    <div className="text-4xl text-primary/20 font-serif text-right">"</div>
                  </div>

                  {/* Rating */}
                  {showRating && testimonial.rating && (
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mt-auto">
                    {showAvatar && (
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">
                          {testimonial.name}
                        </p>
                        {testimonial.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      {(testimonial.role || testimonial.company) && (
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                          {testimonial.role && testimonial.company && ' at '}
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {testimonials.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>

      {/* Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted hover:bg-muted-foreground'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

