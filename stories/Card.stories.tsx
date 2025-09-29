import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../src/components/ui/avatar';
import { Heart, MessageCircle, Share, Star, User } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component for displaying content in a contained, structured format.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent className="pt-6">
        <p>A simple card with just content and no header or footer.</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A minimal card with only content.',
      },
    },
  },
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500" />
      <CardHeader>
        <CardTitle>Beautiful Gradient</CardTitle>
        <CardDescription>A card with an image header</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card features a beautiful gradient background in the header area.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Learn More</Button>
        <Button>Get Started</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with an image or visual header.',
      },
    },
  },
};

export const UserProfile: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Avatar className="mr-4">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg">Sarah Johnson</CardTitle>
          <CardDescription>@sarahjohnson</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          Follow
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Frontend developer passionate about creating beautiful and accessible user interfaces.
        </p>
        <div className="flex gap-2 mt-3">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Design Systems</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>1.2k followers</span>
        <span>432 following</span>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User profile card with avatar, bio, and stats.',
      },
    },
  },
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <div className="w-20 h-20 bg-gray-300 rounded" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Wireless Headphones</CardTitle>
            <CardDescription>Premium Audio Experience</CardDescription>
          </div>
          <Badge>Best Seller</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-muted-foreground ml-1">(128 reviews)</span>
        </div>
        <p className="text-sm text-muted-foreground">
          High-quality wireless headphones with noise cancellation and 30-hour battery life.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold">$199.99</span>
          <span className="text-sm text-muted-foreground line-through ml-2">$249.99</span>
        </div>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'E-commerce product card with image, rating, and pricing.',
      },
    },
  },
};

export const ArticleCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Badge variant="outline">Technology</Badge>
          <span>•</span>
          <span>5 min read</span>
        </div>
        <CardTitle className="text-lg">
          The Future of Web Development
        </CardTitle>
        <CardDescription>
          Exploring upcoming trends and technologies that will shape how we build web applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">John Doe</p>
            <p className="text-muted-foreground">March 15, 2024</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-1" />
            24
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            12
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Blog article card with author info and engagement metrics.',
      },
    },
  },
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl">$45,231.89</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +20.1% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-3xl">2,350</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +180.1% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Sales</CardDescription>
          <CardTitle className="text-3xl">12,234</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +19% from last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Now</CardDescription>
          <CardTitle className="text-3xl">573</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +201 since last hour
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dashboard statistics cards with metrics and changes.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <Card className="w-80 hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>This card responds to hover interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the shadow effect. This demonstrates how cards can be made interactive.</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive card with hover effects.',
      },
    },
  },
};