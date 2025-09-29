'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Avatar,
  AvatarFallback,
  LucideIcons,
} from '@tanqory/mies';

export default function EcommercePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">E-commerce Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your online store performance and sales metrics.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <LucideIcons.Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <LucideIcons.Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Sales Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$45,231.89</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+20.1%</span> from last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <LucideIcons.DollarSign className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Orders</p>
                  <p className="text-2xl font-bold">+2,350</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+180.1%</span> from last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <LucideIcons.ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Products Sold</p>
                  <p className="text-2xl font-bold">+12,234</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+19%</span> from last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <LucideIcons.Package className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Customers</p>
                  <p className="text-2xl font-bold">+573</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+201</span> since last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <LucideIcons.Users className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <LucideIcons.TrendingUp className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Sales Chart</p>
                    <p className="text-sm text-muted-foreground">
                      Monthly sales performance visualization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Wireless Headphones', sales: 1234, revenue: '$24,680' },
                { name: 'Smart Watch', sales: 987, revenue: '$19,740' },
                { name: 'Laptop Backpack', sales: 756, revenue: '$15,120' },
                { name: 'Bluetooth Speaker', sales: 654, revenue: '$13,080' },
                { name: 'Phone Case', sales: 543, revenue: '$10,860' },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                      <LucideIcons.Package className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{product.revenue}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: '#3210',
                  customer: 'John Doe',
                  email: 'john@example.com',
                  product: 'Wireless Headphones',
                  amount: '$199.99',
                  status: 'Completed',
                  date: '2 hours ago',
                },
                {
                  id: '#3209',
                  customer: 'Jane Smith',
                  email: 'jane@example.com',
                  product: 'Smart Watch',
                  amount: '$299.99',
                  status: 'Processing',
                  date: '4 hours ago',
                },
                {
                  id: '#3208',
                  customer: 'Bob Johnson',
                  email: 'bob@example.com',
                  product: 'Laptop Backpack',
                  amount: '$79.99',
                  status: 'Shipped',
                  date: '6 hours ago',
                },
                {
                  id: '#3207',
                  customer: 'Alice Brown',
                  email: 'alice@example.com',
                  product: 'Bluetooth Speaker',
                  amount: '$149.99',
                  status: 'Completed',
                  date: '8 hours ago',
                },
                {
                  id: '#3206',
                  customer: 'Charlie Wilson',
                  email: 'charlie@example.com',
                  product: 'Phone Case',
                  amount: '$29.99',
                  status: 'Processing',
                  date: '1 day ago',
                },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{order.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">•</p>
                        <p className="text-sm">{order.customer}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{order.product}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <Badge
                      variant={order.status === 'Completed' ? 'default' :
                              order.status === 'Processing' ? 'secondary' : 'outline'}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}