import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '../src/components/ui/aspect-ratio';
import { Card, CardContent } from '../src/components/ui/card';
import { Camera } from 'lucide-react';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays content within a desired ratio. Useful for responsive media and maintaining consistent proportions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 10, step: 0.1 },
      description: 'The desired width/height ratio',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio {...args} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A 16:9 aspect ratio container with an image.',
      },
    },
  },
};

export const CommonRatios: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">16:9 (Widescreen)</h4>
        <div className="w-[400px]">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1464822759844-d150b9c63a92?w=800&dpr=2&q=80"
              alt="Mountains"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">4:3 (Standard)</h4>
        <div className="w-[400px]">
          <AspectRatio ratio={4 / 3} className="bg-muted rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80"
              alt="Landscape"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">1:1 (Square)</h4>
        <div className="w-[300px]">
          <AspectRatio ratio={1} className="bg-muted rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1576992579827-46f6aa6e2f80?w=800&dpr=2&q=80"
              alt="Architecture"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common aspect ratios used in web design and media.',
      },
    },
  },
};

export const WithCard: Story = {
  render: () => (
    <div className="w-[350px]">
      <Card>
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&dpr=2&q=80"
              alt="City skyline"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </AspectRatio>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">Beautiful Cityscape</h3>
            <p className="text-sm text-muted-foreground">
              A stunning view of the city skyline during golden hour. Perfect for
              desktop wallpapers and design inspiration.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AspectRatio used within a card component for media previews.',
      },
    },
  },
};

export const VideoEmbed: Story = {
  render: () => (
    <div className="w-[600px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AspectRatio for responsive video embeds.',
      },
    },
  },
};

export const PlaceholderContent: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Image Placeholder</h4>
        <div className="w-[400px]">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md border border-dashed border-border flex items-center justify-center">
            <div className="text-center">
              <Camera className="h-12 w-12 mb-2 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Upload Image</p>
              <p className="text-xs text-muted-foreground">16:9 ratio</p>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Content Placeholder</h4>
        <div className="w-[300px]">
          <AspectRatio ratio={1} className="bg-muted rounded-md border flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                <div className="w-8 h-8 bg-primary/40 rounded-full" />
              </div>
              <p className="text-sm font-medium">Profile Photo</p>
              <p className="text-xs text-muted-foreground">1:1 ratio</p>
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using AspectRatio for placeholder content and empty states.',
      },
    },
  },
};

export const ResponsiveGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
      {Array.from({ length: 6 }, (_, i) => (
        <Card key={i}>
          <CardContent className="p-0">
            <AspectRatio ratio={16 / 9}>
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?w=400&h=225&fit=crop&q=80`}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover rounded-t-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x225/e2e8f0/64748b?text=Image+${i + 1}`;
                }}
              />
            </AspectRatio>
            <div className="p-3">
              <h4 className="font-medium text-sm">Gallery Item {i + 1}</h4>
              <p className="text-xs text-muted-foreground">Sample description</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AspectRatio used in a responsive grid layout for consistent image dimensions.',
      },
    },
  },
};

export const CustomRatios: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Portrait (3:4)</h4>
        <div className="w-[250px]">
          <AspectRatio ratio={3 / 4} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-2xl font-bold mb-2">3:4</div>
              <div className="text-sm opacity-90">Portrait</div>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Ultra-wide (21:9)</h4>
        <div className="w-[500px]">
          <AspectRatio ratio={21 / 9} className="bg-gradient-to-r from-green-500 to-teal-600 rounded-md flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-2xl font-bold mb-2">21:9</div>
              <div className="text-sm opacity-90">Ultra-wide</div>
            </div>
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Golden Ratio (1.618:1)</h4>
        <div className="w-[400px]">
          <AspectRatio ratio={1.618} className="bg-gradient-to-tl from-orange-500 to-red-600 rounded-md flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-2xl font-bold mb-2">φ</div>
              <div className="text-sm opacity-90">Golden Ratio</div>
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom aspect ratios including portrait, ultra-wide, and golden ratio.',
      },
    },
  },
};