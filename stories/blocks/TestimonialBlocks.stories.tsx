import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { generateSlides, generateTestimonials, generateProducts } from '../../src/utils/mock-data';

const SLIDES = generateSlides(8);
const TESTIMONIALS = generateTestimonials(4);
const PRODUCTS = generateProducts(6);

// Simple Carousel Demo Component
function SimpleCarouselDemo() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-muted rounded-lg overflow-hidden">
        <div className="aspect-video flex items-center justify-center">
          <div className="text-center">
            <img
              src={SLIDES[currentSlide].coverUrl}
              alt={SLIDES[currentSlide].title}
              className="max-w-full max-h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{SLIDES[currentSlide].title}</h3>
            <p className="text-sm text-muted-foreground">{SLIDES[currentSlide].description}</p>
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 flex items-center">
          <Button onClick={prevSlide} variant="ghost" size="sm" className="ml-2">
            ←
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button onClick={nextSlide} variant="ghost" size="sm" className="mr-2">
            →
          </Button>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {SLIDES.map((_, index) => (
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

// Testimonials Demo Component
function TestimonialsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {TESTIMONIALS.map((testimonial, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <CardTitle className="text-base">{testimonial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{testimonial.position}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic">"{testimonial.content}"</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">{'★'.repeat(Math.floor(testimonial.rating))}</span>
              <span className="text-muted-foreground ml-2">{testimonial.rating}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Products Demo Component
function ProductsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PRODUCTS.map((product, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="aspect-square bg-muted flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold line-clamp-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-bold text-primary">{product.price}</span>
              <Badge variant="secondary">{product.rating} ★</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Image Gallery Demo Component
function ImageGalleryDemo() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {SLIDES.map((slide, index) => (
        <div key={index} className="space-y-2">
          <img
            src={slide.coverUrl}
            alt={slide.title}
            className="w-full aspect-square object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
          />
          <p className="text-sm text-center line-clamp-2">{slide.title}</p>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof TestimonialsDemo> = {
  title: 'Blocks/Testimonial & Content',
  component: TestimonialsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Testimonial and content showcase components using @tanqory/mies UI components',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialsDemo>;

export const CarouselView: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Simple Carousel</h2>
        <p className="text-muted-foreground">Basic carousel implementation using mies components</p>
      </div>
      <SimpleCarouselDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple carousel implementation using mies UI components',
      },
    },
  },
};

export const TestimonialView: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <p className="text-muted-foreground">Customer testimonials with ratings</p>
      </div>
      <TestimonialsDemo />
    </div>
  ),
};

export const ProductView: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <p className="text-muted-foreground">Product catalog with pricing and ratings</p>
      </div>
      <ProductsDemo />
    </div>
  ),
};

export const GalleryView: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Image Gallery</h2>
        <p className="text-muted-foreground">Responsive image gallery grid</p>
      </div>
      <ImageGalleryDemo />
    </div>
  ),
};

// Export data for other stories
export { SLIDES, TESTIMONIALS, PRODUCTS };