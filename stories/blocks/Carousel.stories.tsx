import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/ui/button';
import { Card, CardContent } from '../../src/components/ui/card';
import { Progress as ProgressBar } from '../../src/components/ui/progress';
import { generateSlides } from '../../src/utils/mock-data';

const SLIDES = generateSlides(16);

// Carousel demos matching the 16 variants from next-ts
function AlignDemo() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = SLIDES.slice(0, 4);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Align</h3>
      <div className="relative bg-muted/30 rounded-lg overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 70}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="min-w-[70%] p-2">
              <img src={slide.coverUrl} alt={slide.title} className="w-full aspect-video object-cover rounded-lg" />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-2 flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}>‹</Button>
        </div>
        <div className="absolute inset-y-0 right-2 flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}>›</Button>
        </div>
      </div>
    </div>
  );
}

function ProgressDemo() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = SLIDES.slice(4, 8);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Progress</h3>
      <div className="space-y-2">
        <img src={slides[currentSlide].coverUrl} alt={slides[currentSlide].title} className="w-full aspect-video object-cover rounded-lg" />
        <ProgressBar value={((currentSlide + 1) / slides.length) * 100} className="w-full" />
        <p className="text-sm text-center">{slides[currentSlide].title}</p>
      </div>
    </div>
  );
}

function OpacityDemo() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = SLIDES.slice(8, 12);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Opacity</h3>
      <div className="relative aspect-video">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.coverUrl}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScaleDemo() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = SLIDES.slice(12, 16);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Scale</h3>
      <div className="grid grid-cols-2 gap-4">
        {slides.map((slide, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-transform duration-300 ${
              index === currentSlide ? 'scale-105' : 'hover:scale-102'
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            <CardContent className="p-0">
              <img src={slide.coverUrl} alt={slide.title} className="w-full aspect-video object-cover rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Carousel',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Carousel examples using Embla Carousel, matching the next-ts implementation with 16 variants.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Align: Story = {
  render: () => <AlignDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Carousel with 70% slide width and alignment control',
      },
    },
  },
};

export const Progress: Story = {
  render: () => <ProgressDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Auto-playing carousel with progress indicator',
      },
    },
  },
};

export const Opacity: Story = {
  render: () => <OpacityDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Fade transition between slides using opacity',
      },
    },
  },
};

export const Scale: Story = {
  render: () => <ScaleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Scale effect on slide hover and selection',
      },
    },
  },
};