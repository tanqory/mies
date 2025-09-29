import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../src/components/ui/table';
import { Badge } from '../src/components/ui/badge';
import { Button } from '../src/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../src/components/ui/avatar';
import { MoreHorizontal, ArrowUpDown, CheckCircle, XCircle, Clock, Edit, Trash2 } from 'lucide-react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive table component for displaying data in rows and columns.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV003</TableCell>
            <TableCell>Unpaid</TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell className="text-right">$350.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic table with invoices data.',
      },
    },
  },
};

export const WithBadges: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">#3001</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            </TableCell>
            <TableCell>2024-01-15</TableCell>
            <TableCell className="text-right">$89.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">#3002</TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                Processing
              </Badge>
            </TableCell>
            <TableCell>2024-01-14</TableCell>
            <TableCell className="text-right">$124.50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">#3003</TableCell>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>
              <Badge variant="destructive">
                <XCircle className="w-3 h-3 mr-1" />
                Cancelled
              </Badge>
            </TableCell>
            <TableCell>2024-01-13</TableCell>
            <TableCell className="text-right">$45.75</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">#3004</TableCell>
            <TableCell>Alice Wilson</TableCell>
            <TableCell>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            </TableCell>
            <TableCell>2024-01-12</TableCell>
            <TableCell className="text-right">$299.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with status badges and icons.',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="w-full max-w-5xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">ID: 001</div>
                </div>
              </div>
            </TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>
              <Badge variant="outline">Admin</Badge>
            </TableCell>
            <TableCell>
              <Badge className="bg-green-500">Active</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612c593?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-muted-foreground">ID: 002</div>
                </div>
              </div>
            </TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>
              <Badge variant="secondary">Editor</Badge>
            </TableCell>
            <TableCell>
              <Badge className="bg-green-500">Active</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>BJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Bob Johnson</div>
                  <div className="text-sm text-muted-foreground">ID: 003</div>
                </div>
              </div>
            </TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>
              <Badge variant="outline">User</Badge>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">Inactive</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with user avatars and action buttons.',
      },
    },
  },
};

export const Sortable: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium">
                Product
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium">
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium">
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium">
                Stock
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Wireless Headphones</TableCell>
            <TableCell>Electronics</TableCell>
            <TableCell>$199.99</TableCell>
            <TableCell>45</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Coffee Mug</TableCell>
            <TableCell>Home & Kitchen</TableCell>
            <TableCell>$12.99</TableCell>
            <TableCell>120</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Laptop Stand</TableCell>
            <TableCell>Office</TableCell>
            <TableCell>$79.99</TableCell>
            <TableCell>23</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Running Shoes</TableCell>
            <TableCell>Sports</TableCell>
            <TableCell>$129.99</TableCell>
            <TableCell>67</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with sortable column headers.',
      },
    },
  },
};

export const Analytics: Story = {
  render: () => (
    <div className="w-full max-w-6xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Website Analytics</h3>
        <p className="text-sm text-muted-foreground">Page performance overview</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Unique Visitors</TableHead>
            <TableHead>Bounce Rate</TableHead>
            <TableHead>Avg. Duration</TableHead>
            <TableHead>Conversion</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div>
                <div className="font-medium">/</div>
                <div className="text-sm text-muted-foreground">Homepage</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">12,543</div>
              <div className="text-sm text-green-600">+12%</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">8,721</div>
              <div className="text-sm text-green-600">+8%</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">34.2%</div>
              <div className="text-sm text-red-600">+2.1%</div>
            </TableCell>
            <TableCell>2m 34s</TableCell>
            <TableCell>
              <div className="font-medium">4.2%</div>
              <div className="text-sm text-green-600">+0.5%</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="font-medium">$2,340</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div>
                <div className="font-medium">/products</div>
                <div className="text-sm text-muted-foreground">Products Page</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">8,932</div>
              <div className="text-sm text-green-600">+18%</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">6,543</div>
              <div className="text-sm text-green-600">+15%</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">28.1%</div>
              <div className="text-sm text-green-600">-3.2%</div>
            </TableCell>
            <TableCell>3m 12s</TableCell>
            <TableCell>
              <div className="font-medium">8.7%</div>
              <div className="text-sm text-green-600">+1.2%</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="font-medium">$4,120</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div>
                <div className="font-medium">/about</div>
                <div className="text-sm text-muted-foreground">About Page</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">3,421</div>
              <div className="text-sm text-red-600">-5%</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">2,876</div>
              <div className="text-sm text-red-600">-3%</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">45.7%</div>
              <div className="text-sm text-red-600">+5.3%</div>
            </TableCell>
            <TableCell>1m 45s</TableCell>
            <TableCell>
              <div className="font-medium">1.3%</div>
              <div className="text-sm text-red-600">-0.2%</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="font-medium">$432</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Analytics table with metrics and trend indicators.',
      },
    },
  },
};

export const Pricing: Story = {
  render: () => (
    <div className="w-full max-w-5xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Users</TableHead>
            <TableHead>Storage</TableHead>
            <TableHead>Support</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-muted/50">
            <TableCell>
              <div>
                <div className="font-semibold">Free</div>
                <Badge variant="secondary" className="mt-1">
                  Current Plan
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <ul className="text-sm space-y-1">
                <li>✓ Basic features</li>
                <li>✓ 5 projects</li>
                <li>✓ Community support</li>
              </ul>
            </TableCell>
            <TableCell>Up to 3</TableCell>
            <TableCell>1 GB</TableCell>
            <TableCell>
              <Badge variant="outline">Community</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="font-bold text-lg">$0</div>
              <div className="text-sm text-muted-foreground">/month</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div>
                <div className="font-semibold">Pro</div>
                <Badge className="mt-1">Popular</Badge>
              </div>
            </TableCell>
            <TableCell>
              <ul className="text-sm space-y-1">
                <li>✓ All Free features</li>
                <li>✓ Unlimited projects</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
              </ul>
            </TableCell>
            <TableCell>Up to 10</TableCell>
            <TableCell>100 GB</TableCell>
            <TableCell>
              <Badge>Email & Chat</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="font-bold text-lg">$29</div>
              <div className="text-sm text-muted-foreground">/month</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-semibold">Enterprise</div>
            </TableCell>
            <TableCell>
              <ul className="text-sm space-y-1">
                <li>✓ All Pro features</li>
                <li>✓ Custom integrations</li>
                <li>✓ Dedicated manager</li>
                <li>✓ SLA guarantee</li>
              </ul>
            </TableCell>
            <TableCell>Unlimited</TableCell>
            <TableCell>1 TB</TableCell>
            <TableCell>
              <Badge variant="outline">24/7 Phone</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="font-bold text-lg">Custom</div>
              <div className="text-sm text-muted-foreground">pricing</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pricing comparison table with features and badges.',
      },
    },
  },
};