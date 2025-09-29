'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Progress,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';

// Mock slide data
const SLIDES = [
  {
    id: 1,
    title: 'Beautiful Landscapes',
    description: 'Stunning natural scenery from around the world',
    coverUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Urban Architecture',
    description: 'Modern city skylines and architectural marvels',
    coverUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Nature Photography',
    description: 'Wildlife and natural environments captured in detail',
    coverUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Ocean Views',
    description: 'Serene ocean scenes and coastal landscapes',
    coverUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Mountain Peaks',
    description: 'Majestic mountain ranges and hiking trails',
    coverUrl: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=800&h=400&fit=crop',
  },
];

// Basic Carousel Component
function BasicCarousel({ slides, autoplay = false }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  React.useEffect(() => {
    if (autoplay) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="space-y-4">
      <div className="relative bg-muted rounded-lg overflow-hidden">
        <div className="aspect-video flex items-center justify-center">
          <div className="text-center p-6">
            <img
              src={slides[currentSlide].coverUrl}
              alt={slides[currentSlide].title}
              className="max-w-full max-h-48 object-cover rounded mx-auto"
            />
            <h3 className="text-lg font-semibold mt-4">{slides[currentSlide].title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{slides[currentSlide].description}</p>
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 flex items-center">
          <Button onClick={prevSlide} variant="ghost" size="sm" className="ml-2">
            <LucideIcons.ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button onClick={nextSlide} variant="ghost" size="sm" className="mr-2">
            <LucideIcons.ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Carousel with Progress
function CarouselWithProgress({ slides }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  React.useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 2; // 5 seconds total (100 / 2 * 100ms)
      });
    }, 100);

    return () => clearInterval(progressTimer);
  }, [currentSlide]);

  return (
    <div className="space-y-4">
      <div className="relative bg-muted rounded-lg overflow-hidden">
        <div className="aspect-video">
          <img
            src={slides[currentSlide].coverUrl}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h3 className="text-lg font-semibold text-white">{slides[currentSlide].title}</h3>
            <p className="text-sm text-white/80">{slides[currentSlide].description}</p>
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 flex items-center">
          <Button onClick={prevSlide} variant="ghost" size="sm" className="ml-2 text-white hover:bg-white/20">
            <LucideIcons.ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button onClick={nextSlide} variant="ghost" size="sm" className="mr-2 text-white hover:bg-white/20">
            <LucideIcons.ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Slide {currentSlide + 1} of {slides.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
}

// Thumbnail Carousel
function ThumbnailCarousel({ slides }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <div className="space-y-4">
      <div className="relative bg-muted rounded-lg overflow-hidden">
        <div className="aspect-video">
          <img
            src={slides[currentSlide].coverUrl}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">{slides[currentSlide].title}</h3>
        <p className="text-sm text-muted-foreground">{slides[currentSlide].description}</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`flex-shrink-0 relative ${
              index === currentSlide ? 'ring-2 ring-primary' : ''
            } rounded overflow-hidden`}
          >
            <img
              src={slide.coverUrl}
              alt={slide.title}
              className="w-20 h-12 object-cover"
            />
            {index === currentSlide && (
              <div className="absolute inset-0 bg-primary/20" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Fade Carousel
function FadeCarousel({ slides }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-muted rounded-lg overflow-hidden">
        <div className={`aspect-video transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <img
            src={slides[currentSlide].coverUrl}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h3 className="text-lg font-semibold text-white">{slides[currentSlide].title}</h3>
            <p className="text-sm text-white/80">{slides[currentSlide].description}</p>
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 flex items-center">
          <Button onClick={prevSlide} variant="ghost" size="sm" className="ml-2 text-white hover:bg-white/20">
            <LucideIcons.ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button onClick={nextSlide} variant="ghost" size="sm" className="mr-2 text-white hover:bg-white/20">
            <LucideIcons.ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function CarouselPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Carousel</h1>
            <p className="text-muted-foreground text-lg">
              Image carousels with autoplay, fade effects, and thumbnail navigation
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">11 Carousel Types</Badge>
            <Badge variant="outline">Interactive Navigation</Badge>
            <Badge variant="outline">Auto-play Support</Badge>
          </div>
        </div>

        {/* Basic Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Images className="h-5 w-5" />
              Basic Carousel
            </CardTitle>
            <CardDescription>
              Simple carousel with navigation arrows and dot indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BasicCarousel slides={SLIDES} />
          </CardContent>
        </Card>

        {/* Autoplay Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Play className="h-5 w-5" />
              Autoplay Carousel
            </CardTitle>
            <CardDescription>
              Carousel that automatically advances every 3 seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BasicCarousel slides={SLIDES} autoplay={true} />
          </CardContent>
        </Card>

        {/* Progress Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.BarChart className="h-5 w-5" />
              Progress Carousel
            </CardTitle>
            <CardDescription>
              Carousel with progress bar showing slide advancement timing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CarouselWithProgress slides={SLIDES} />
          </CardContent>
        </Card>

        {/* Thumbnail Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Grid3X3 className="h-5 w-5" />
              Thumbnail Carousel
            </CardTitle>
            <CardDescription>
              Carousel with thumbnail navigation for quick slide selection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThumbnailCarousel slides={SLIDES} />
          </CardContent>
        </Card>

        {/* Fade Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Zap className="h-5 w-5" />
              Fade Carousel
            </CardTitle>
            <CardDescription>
              Smooth fade transition between slides instead of sliding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FadeCarousel slides={SLIDES} />
          </CardContent>
        </Card>

        {/* Multiple Items Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.LayoutGrid className="h-5 w-5" />
              Multiple Items Carousel
            </CardTitle>
            <CardDescription>
              Display multiple slides at once with responsive grid layout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SLIDES.map((slide, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={slide.coverUrl}
                        alt={slide.title}
                        className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h4 className="text-white font-medium">{slide.title}</h4>
                        <p className="text-white/80 text-sm">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vertical Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.ArrowUpDown className="h-5 w-5" />
              Vertical Carousel
            </CardTitle>
            <CardDescription>
              Vertical scrolling carousel for displaying content in a different orientation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="h-96 overflow-hidden rounded-lg border">
                  <div className="space-y-4 p-4">
                    {SLIDES.map((slide, index) => (
                      <div key={index} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <img
                          src={slide.coverUrl}
                          alt={slide.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{slide.title}</h4>
                          <p className="text-sm text-muted-foreground">{slide.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-64">
                <div className="space-y-2">
                  <h4 className="font-medium">Vertical Navigation</h4>
                  <p className="text-sm text-muted-foreground">
                    Scroll vertically through content items with smooth transitions.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <LucideIcons.ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <LucideIcons.ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carousel Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Settings className="h-5 w-5" />
              Carousel Features
            </CardTitle>
            <CardDescription>
              Available features and customization options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.MousePointer, title: 'Touch/Swipe Support', description: 'Native touch gestures on mobile devices' },
                { icon: LucideIcons.Repeat, title: 'Infinite Loop', description: 'Seamless looping through slides' },
                { icon: LucideIcons.Zap, title: 'Smooth Transitions', description: 'CSS-based smooth animations' },
                { icon: LucideIcons.Pause, title: 'Pause on Hover', description: 'Auto-pause when user hovers' },
                { icon: LucideIcons.RotateCcw, title: 'Auto-restart', description: 'Resume after user interaction' },
                { icon: LucideIcons.Smartphone, title: 'Responsive Design', description: 'Adapts to all screen sizes' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center space-y-3 p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}