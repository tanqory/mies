import React from 'react';
import { Card } from '../../components/ui/card';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4 | 5;
  aspectRatio?: 'square' | '4/3' | '16/9' | '3/2';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  showTitles?: boolean;
  lightboxEnabled?: boolean;
}

export function ImageGallery({
  images,
  columns = 3,
  aspectRatio = 'square',
  gap = 'md',
  className,
  showTitles = false,
  lightboxEnabled = true,
}: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = React.useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const getGridClasses = () => {
    const gridCols = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    };

    const gaps = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    };

    return cn('grid', gridCols[columns], gaps[gap]);
  };

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '4/3':
        return 'aspect-[4/3]';
      case '16/9':
        return 'aspect-video';
      case '3/2':
        return 'aspect-[3/2]';
      default:
        return 'aspect-square';
    }
  };

  const openLightbox = (index: number) => {
    if (lightboxEnabled) {
      setCurrentImage(index);
      setIsLightboxOpen(true);
    }
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else {
      setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    if (!isLightboxOpen) return;

    switch (event.key) {
      case 'ArrowLeft':
        navigateLightbox('prev');
        break;
      case 'ArrowRight':
        navigateLightbox('next');
        break;
      case 'Escape':
        setIsLightboxOpen(false);
        break;
    }
  }, [isLightboxOpen]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div className={cn(getGridClasses(), className)}>
        {images.map((image, index) => (
          <Card
            key={index}
            className={cn(
              'group overflow-hidden cursor-pointer transition-all duration-200',
              'hover:shadow-lg hover:scale-[1.02]',
              !lightboxEnabled && 'cursor-default hover:scale-100'
            )}
            onClick={() => openLightbox(index)}
          >
            <div className={cn('relative', getAspectRatioClasses())}>
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              {lightboxEnabled && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {showTitles && image.title && (
              <div className="p-4">
                <h3 className="font-medium text-sm truncate">{image.title}</h3>
                {image.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {image.description}
                  </p>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {lightboxEnabled && (
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
            <div className="relative flex items-center justify-center bg-black">
              <img
                src={images[currentImage]?.src}
                alt={images[currentImage]?.alt}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                    onClick={() => navigateLightbox('prev')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                    onClick={() => navigateLightbox('next')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImage + 1} / {images.length}
              </div>

              {(images[currentImage]?.title || images[currentImage]?.description) && (
                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                  {images[currentImage]?.title && (
                    <h3 className="font-medium mb-1">{images[currentImage].title}</h3>
                  )}
                  {images[currentImage]?.description && (
                    <p className="text-sm opacity-90">{images[currentImage].description}</p>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}