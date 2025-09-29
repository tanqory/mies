import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { User, Settings, CreditCard, Bell, Shield, Palette } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The value of the tab that should be active when initially rendered',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic tabs with two panels.',
      },
      source: {
        code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tanqory/mies';

export default function TabsExample() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}`,
      },
    },
  },
};

export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Your account overview and recent activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold">$45,231.89</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold">2,350</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Detailed analytics and performance metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analytics dashboard with charts and metrics would be displayed here.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Report generation interface would be displayed here.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Generate Report</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with card content for a dashboard interface.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Billing
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your profile information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Application Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure your application preferences here.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="billing" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Billing & Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your billing information and subscription.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Choose how you want to be notified about updates.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with icons for better visual identification.',
      },
    },
  },
};

export const ProductTabs: Story = {
  render: () => (
    <Tabs defaultValue="description" className="w-[700px]">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews (23)</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Product Description</h3>
          <p className="text-muted-foreground">
            This premium wireless headphone delivers exceptional sound quality with advanced noise cancellation technology.
            Perfect for music lovers and professionals who demand the best audio experience.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Active noise cancellation</li>
              <li>30-hour battery life</li>
              <li>Premium comfort design</li>
              <li>High-resolution audio support</li>
            </ul>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="specifications" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Technical Specifications</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="font-medium">Driver Size</p>
                <p className="text-sm text-muted-foreground">40mm dynamic</p>
              </div>
              <div>
                <p className="font-medium">Frequency Response</p>
                <p className="text-sm text-muted-foreground">20Hz - 20kHz</p>
              </div>
              <div>
                <p className="font-medium">Impedance</p>
                <p className="text-sm text-muted-foreground">32Ω</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Battery Life</p>
                <p className="text-sm text-muted-foreground">30 hours (ANC on)</p>
              </div>
              <div>
                <p className="font-medium">Weight</p>
                <p className="text-sm text-muted-foreground">250g</p>
              </div>
              <div>
                <p className="font-medium">Connectivity</p>
                <p className="text-sm text-muted-foreground">Bluetooth 5.0, 3.5mm jack</p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="reviews" className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">4.8</span>
              <div className="text-yellow-500">★★★★★</div>
              <span className="text-sm text-muted-foreground">(23 reviews)</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="font-medium">Sarah M.</div>
                <div className="text-yellow-500">★★★★★</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Amazing sound quality and the noise cancellation is fantastic. Worth every penny!
              </p>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="font-medium">Mike R.</div>
                <div className="text-yellow-500">★★★★☆</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Great headphones, very comfortable for long listening sessions. Battery life is excellent.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="shipping" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <div className="grid gap-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Standard Shipping</p>
                <p className="text-sm text-muted-foreground">5-7 business days</p>
              </div>
              <Badge variant="outline">Free</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Express Shipping</p>
                <p className="text-sm text-muted-foreground">2-3 business days</p>
              </div>
              <Badge>$9.99</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Next Day Delivery</p>
                <p className="text-sm text-muted-foreground">Order by 2 PM</p>
              </div>
              <Badge>$19.99</Badge>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product page tabs showing different types of information.',
      },
    },
  },
};

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="inbox" className="relative">
          Inbox
          <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
            12
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="sent">
          Sent
        </TabsTrigger>
        <TabsTrigger value="drafts" className="relative">
          Drafts
          <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="trash">
          Trash
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>
              You have 12 unread messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded">
                <div className="flex-1">
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-muted-foreground">John Doe just signed up</p>
                </div>
                <div className="text-sm text-muted-foreground">2m ago</div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded">
                <div className="flex-1">
                  <p className="font-medium">Password reset request</p>
                  <p className="text-sm text-muted-foreground">From security@example.com</p>
                </div>
                <div className="text-sm text-muted-foreground">5m ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sent" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your sent messages will appear here.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="drafts" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Draft Messages</CardTitle>
            <CardDescription>
              You have 3 draft messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your draft messages will appear here.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="trash" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Deleted Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Deleted messages will appear here.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Email client tabs with badges showing counts.',
      },
    },
  },
};