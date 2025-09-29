import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../../src/components/ui/carousel';
import { Card, CardContent } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import { Progress } from '../../src/components/ui/progress';
import { cn } from '../../src/components/ui/utils';
// Import only available carousel plugins
// Plugins removed due to compatibility issues

// Generate sample data following Next-TS patterns
const SLIDES = Array.from({ length: 20 }, (_, index) => ({
  id: `slide-${index}`,
  title: `Slide ${index + 1}`,
  coverUrl: `https://picsum.photos/seed/${index + 100}/400/300`,
  description: `Description for slide ${index + 1}`,
}));

// Carousel with different alignments
function CarouselAlign({ data = SLIDES.slice(0, 4) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img
                        src={slide.coverUrl}
                        alt={slide.title}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Carousel with progress indicator
function CarouselProgress({ data = SLIDES.slice(0, 4) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img
                        src={slide.coverUrl}
                        alt={slide.title}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <span className="text-sm font-semibold">{slide.title}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
      <Progress value={(current / count) * 100} className="w-full" />
    </div>
  );
}

// Carousel with opacity effects
function CarouselOpacity({ data = SLIDES.slice(0, 4) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className={cn(
                  "transition-opacity duration-300",
                  current === index ? "opacity-100" : "opacity-50"
                )}>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img
                        src={slide.coverUrl}
                        alt={slide.title}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <span className="text-sm font-semibold">{slide.title}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Carousel with scale effects
function CarouselScale({ data = SLIDES.slice(0, 4) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className={cn(
                  "transition-transform duration-300",
                  current === index ? "scale-100" : "scale-90"
                )}>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img
                        src={slide.coverUrl}
                        alt={slide.title}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <span className="text-sm font-semibold">{slide.title}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Carousel with fade effect (simplified without plugin)
function CarouselFade({ data = SLIDES.slice(0, 4) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="transition-all duration-500">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img
                        src={slide.coverUrl}
                        alt={slide.title}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <span className="text-sm font-semibold">{slide.title}</span>
                      <Badge variant="outline" className="mt-2">Fade Effect</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Carousel with simulated autoplay (without plugin)
function CarouselAutoplay({ data = SLIDES.slice(0, 4) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img
                        src={slide.coverUrl}
                        alt={slide.title}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <span className="text-sm font-semibold">{slide.title}</span>
                      <Badge variant="secondary" className="mt-2">Auto Ready</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Carousel with multiple visible items (simulated auto scroll)
function CarouselAutoScroll({ data = SLIDES.slice(0, 6) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img
                        src={slide.coverUrl}
                        alt={slide.title}
                        className="w-full h-16 object-cover rounded mb-2"
                      />
                      <span className="text-xs font-semibold">{index + 1}</span>
                      <Badge variant="outline" className="mt-1 text-xs">Scroll Ready</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Carousel with thumbnail navigation (X-axis)
function CarouselThumbsX({ data = SLIDES.slice(0, 6) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  const [api, setApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      const selected = api.selectedScrollSnap();
      setCurrent(selected);
      thumbApi?.scrollTo(selected);
    });
  }, [api, thumbApi]);

  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full max-w-xs mx-auto space-y-2">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="text-center">
                    <img
                      src={slide.coverUrl}
                      alt={slide.title}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <span className="text-sm font-semibold">{slide.title}</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel setApi={setThumbApi} className="w-full">
        <CarouselContent className="-ml-1">
          {data.map((slide, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/4">
              <button
                onClick={() => handleThumbClick(index)}
                className={cn(
                  "w-full h-16 rounded border-2 transition-all",
                  current === index ? "border-primary" : "border-transparent"
                )}
              >
                <img
                  src={slide.coverUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

// Carousel with variable widths
function CarouselVariableWidths({ data = SLIDES.slice(0, 8) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  return (
    <div className="w-full max-w-sm mx-auto">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {data.map((slide, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "pl-2 md:pl-4",
                index % 3 === 0 ? "basis-1/2" :
                index % 3 === 1 ? "basis-1/3" : "basis-2/3"
              )}
            >
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="text-center">
                    <img
                      src={slide.coverUrl}
                      alt={slide.title}
                      className="w-full h-16 object-cover rounded mb-2"
                    />
                    <span className="text-xs font-semibold">{index + 1}</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Carousel with dots and numbers
function CarouselDotsNumber({ data = SLIDES.slice(0, 5) }: { data?: typeof SLIDES }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full max-w-xs mx-auto"><span className="text-sm text-muted-foreground">No data available</span></div>;
  }
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="text-center">
                    <img
                      src={slide.coverUrl}
                      alt={slide.title}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <span className="text-sm font-semibold">{slide.title}</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-8 h-8 rounded-full text-xs font-medium transition-colors",
              current === index + 1
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

// Simple carousel variant for basic use
function CarouselBasic({ data = SLIDES.slice(0, 5) }: { data?: typeof SLIDES }) {
  // Safety check for data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full max-w-xs mx-auto">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-sm text-muted-foreground">No data available</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {data.map((slide, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="text-center">
                    <img
                      src={slide.coverUrl}
                      alt={slide.title}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <span className="text-sm font-semibold">{slide.title}</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Demo components array following Next-TS pattern
const DEMO_COMPONENTS = [
  { name: 'Basic', component: <CarouselBasic /> },
  { name: 'Align', component: <CarouselAlign /> },
  { name: 'Progress', component: <CarouselProgress /> },
  { name: 'Opacity', component: <CarouselOpacity /> },
  { name: 'Scale', component: <CarouselScale /> },
  { name: 'Fade', component: <CarouselFade /> },
  { name: 'Autoplay', component: <CarouselAutoplay /> },
  { name: 'Auto Scroll', component: <CarouselAutoScroll /> },
  { name: 'Thumbs-x', component: <CarouselThumbsX /> },
  { name: 'Variable widths', component: <CarouselVariableWidths /> },
  { name: 'Dots number', component: <CarouselDotsNumber /> },
];

// Meta configuration
const meta: Meta<typeof CarouselBasic> = {
  title: 'Blocks/Carousel',
  component: CarouselBasic,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Carousel component blocks following Next-TS carousel-view patterns with Embla carousel.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarouselBasic>;

// Main Carousel View Story
export const CarouselView: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Carousel</h1>
        <p className="text-muted-foreground">
          A collection of carousel components with different effects and behaviors
        </p>
        <div className="text-sm text-muted-foreground">
          Powered by{' '}
          <a
            href="https://www.embla-carousel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Embla Carousel
          </a>
        </div>
      </div>

      <div className="space-y-16">
        {DEMO_COMPONENTS.map((demo, index) => (
          <section key={demo.name} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{demo.name}</h2>
              <div className="text-sm text-muted-foreground">
                {demo.name} carousel variant demonstration
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-card flex justify-center">
              {demo.component}
            </div>
          </section>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Carousel view component exactly like Next-TS carousel-view implementation with various carousel types.',
      },
    },
  },
};

// Individual component stories
export const BasicExample: Story = {
  render: () => <CarouselBasic />,
};

export const AlignExample: Story = {
  render: () => <CarouselAlign />,
};

export const ProgressExample: Story = {
  render: () => <CarouselProgress />,
};

export const AutoplayExample: Story = {
  render: () => <CarouselAutoplay />,
};

export const ThumbsExample: Story = {
  render: () => <CarouselThumbsX />,
};

// Export demo components and data
export { DEMO_COMPONENTS, SLIDES };