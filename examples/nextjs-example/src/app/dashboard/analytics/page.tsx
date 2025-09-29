'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  LucideIcons,
} from '@tanqory/mies';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your website performance and user engagement metrics.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                  <p className="text-2xl font-bold">2,845,392</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> vs last period
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <LucideIcons.Eye className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Unique Visitors</p>
                  <p className="text-2xl font-bold">1,245,678</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.2%</span> vs last period
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <LucideIcons.Users className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                  <p className="text-2xl font-bold">42.6%</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">+2.1%</span> vs last period
                  </p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <LucideIcons.TrendingDown className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                  <p className="text-2xl font-bold">3m 24s</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15.3%</span> vs last period
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <LucideIcons.Clock className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <LucideIcons.TrendingUp className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Traffic Chart</p>
                  <p className="text-sm text-muted-foreground">
                    Line chart showing traffic trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Desktop</span>
                    <span>58.2%</span>
                  </div>
                  <Progress value={58.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mobile</span>
                    <span>34.8%</span>
                  </div>
                  <Progress value={34.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tablet</span>
                    <span>7.0%</span>
                  </div>
                  <Progress value={7.0} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages & Countries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { page: '/dashboard', views: '12,445', percentage: '23.4%' },
                  { page: '/components', views: '8,932', percentage: '16.8%' },
                  { page: '/analytics', views: '6,721', percentage: '12.7%' },
                  { page: '/settings', views: '4,563', percentage: '8.6%' },
                  { page: '/profile', views: '3,245', percentage: '6.1%' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.page}</p>
                      <p className="text-xs text-muted-foreground">{item.views} views</p>
                    </div>
                    <Badge variant="secondary">{item.percentage}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { country: 'United States', flag: '🇺🇸', users: '15,234', percentage: '28.5%' },
                  { country: 'United Kingdom', flag: '🇬🇧', users: '8,932', percentage: '16.7%' },
                  { country: 'Germany', flag: '🇩🇪', users: '6,421', percentage: '12.0%' },
                  { country: 'France', flag: '🇫🇷', users: '4,563', percentage: '8.5%' },
                  { country: 'Canada', flag: '🇨🇦', users: '3,245', percentage: '6.1%' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.flag}</span>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{item.country}</p>
                        <p className="text-xs text-muted-foreground">{item.users} users</p>
                      </div>
                    </div>
                    <Badge variant="outline">{item.percentage}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}