'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Progress,
  Separator,
  LucideIcons,
} from '@tanqory/mies';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your projects today.
            </p>
          </div>

          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Welcome back 👋</h2>
                  <p className="text-muted-foreground max-w-2xl">
                    If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.
                  </p>
                </div>
                <Button className="shrink-0">
                  <LucideIcons.ArrowRight className="w-4 h-4 ml-2" />
                  Go now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
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
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <LucideIcons.DollarSign className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Subscriptions</p>
                  <p className="text-2xl font-bold">+2350</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+180.1%</span> from last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <LucideIcons.Users className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Sales</p>
                  <p className="text-2xl font-bold">+12,234</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+19%</span> from last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <LucideIcons.CreditCard className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                  <p className="text-2xl font-bold">+573</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+201</span> since last hour
                  </p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <LucideIcons.Activity className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <LucideIcons.BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Chart placeholder</p>
                    <p className="text-sm text-muted-foreground">
                      Analytics chart would be rendered here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
                  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
                  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
                  { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
                  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
                ].map((sale, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <LucideIcons.User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{sale.name}</p>
                      <p className="text-xs text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="text-sm font-medium">{sale.amount}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Revenue</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>New Customers</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Project Completion</span>
                    <span>91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Examples</CardTitle>
            <p className="text-sm text-muted-foreground">
              Explore different dashboard layouts and components
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                { name: 'Analytics', icon: LucideIcons.BarChart3, description: 'Website and app analytics' },
                { name: 'Banking', icon: LucideIcons.CreditCard, description: 'Financial dashboard' },
                { name: 'E-commerce', icon: LucideIcons.ShoppingCart, description: 'Online store management' },
                { name: 'Calendar', icon: LucideIcons.Calendar, description: 'Schedule and events' },
                { name: 'Chat', icon: LucideIcons.MessageSquare, description: 'Team communication' },
                { name: 'File Manager', icon: LucideIcons.FolderOpen, description: 'Document management' },
                { name: 'Kanban', icon: LucideIcons.Columns, description: 'Project board' },
                { name: 'Mail', icon: LucideIcons.Mail, description: 'Email management' },
              ].map((item, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}