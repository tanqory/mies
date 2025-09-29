import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../../components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { AspectRatio } from '../../components/ui/aspect-ratio';
import { cn } from '../../components/ui/utils';

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  category?: string;
  badge?: string;
  description?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface ProductCarouselProps {
  products: Product[];
  itemsPerView?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showAddToCart?: boolean;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  className?: string;
  currency?: string;
}

export function ProductCarousel({
  products,
  itemsPerView = 3,
  autoplay = false,
  autoplayDelay = 3000,
  loop = true,
  showAddToCart = true,
  onProductClick,
  onAddToCart,
  className,
  currency = '$',
}: ProductCarouselProps) {
  // Auto-play functionality
  React.useEffect(() => {
    if (!autoplay || products.length <= itemsPerView) return;

    const interval = setInterval(() => {
      // Auto-scroll logic would be handled by the carousel component
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, products.length, itemsPerView]);

  const formatPrice = (price: number) => {
    return `${currency}${price.toFixed(2)}`;
  };

  const getDiscountPercentage = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={cn(
          'text-sm',
          i < rating ? 'text-yellow-500' : 'text-muted-foreground/30'
        )}
      >
        ★
      </span>
    ));
  };

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  const getItemClass = () => {
    switch (itemsPerView) {
      case 1:
        return '';
      case 2:
        return 'md:basis-1/2';
      case 3:
        return 'md:basis-1/3';
      case 4:
        return 'md:basis-1/4';
      default:
        return 'md:basis-1/3';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <Carousel
        className="w-full"
        opts={{
          loop,
          align: 'start',
          skipSnaps: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className={cn('pl-2 md:pl-4', getItemClass())}
            >
              <Card className="h-full group transition-all duration-300 hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                        onClick={() => onProductClick?.(product)}
                        style={{ cursor: onProductClick ? 'pointer' : 'default' }}
                      />
                    </AspectRatio>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.badge && (
                        <Badge variant="destructive" className="text-xs">
                          {product.badge}
                        </Badge>
                      )}
                      {product.originalPrice && (
                        <Badge variant="secondary" className="text-xs">
                          -{getDiscountPercentage(product.originalPrice, product.price)}%
                        </Badge>
                      )}
                    </div>

                    {/* Stock indicator */}
                    {product.inStock === false && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-4 flex flex-col h-full">
                  {/* Category */}
                  {product.category && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.category}
                    </p>
                  )}

                  {/* Product Name */}
                  <CardTitle
                    className="text-sm mb-2 line-clamp-2 leading-tight cursor-pointer hover:text-primary transition-colors"
                    onClick={() => onProductClick?.(product)}
                  >
                    {product.name}
                  </CardTitle>

                  {/* Description */}
                  {product.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(product.rating)}
                      {product.reviewCount && (
                        <span className="text-xs text-muted-foreground ml-1">
                          ({product.reviewCount})
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-auto space-y-2">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    {showAddToCart && (
                      <Button
                        size="sm"
                        className="w-full"
                        disabled={product.inStock === false}
                        onClick={() => onAddToCart?.(product)}
                      >
                        {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {products.length > itemsPerView && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
    </div>
  );
}

