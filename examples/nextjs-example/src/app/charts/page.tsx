'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  LucideIcons,
} from '@tanqory/mies';
import { PageLayout } from '../../components/navigation';
import { LineChart, BarChart, DonutChart } from '../../components/charts';
import type {
  LineChartDataPoint,
  BarChartDataPoint,
  PieChartDataPoint,
  ProgressDataPoint,
  StatCardData
} from '../../components/charts';

// Mock chart data with proper typing
const lineChartData: LineChartDataPoint[] = [
  { month: 'Jan', sales: 4000, profit: 2400 },
  { month: 'Feb', sales: 3000, profit: 1398 },
  { month: 'Mar', sales: 2000, profit: 9800 },
  { month: 'Apr', sales: 2780, profit: 3908 },
  { month: 'May', sales: 1890, profit: 4800 },
  { month: 'Jun', sales: 2390, profit: 3800 },
];

const barChartData: BarChartDataPoint[] = [
  { category: 'Mobile', value: 65, color: 'bg-blue-500' },
  { category: 'Desktop', value: 45, color: 'bg-green-500' },
  { category: 'Tablet', value: 25, color: 'bg-yellow-500' },
  { category: 'Others', value: 15, color: 'bg-purple-500' },
];

const pieChartData: PieChartDataPoint[] = [
  { name: 'React', value: 35, color: 'bg-blue-500' },
  { name: 'Vue', value: 25, color: 'bg-green-500' },
  { name: 'Angular', value: 20, color: 'bg-red-500' },
  { name: 'Svelte', value: 20, color: 'bg-orange-500' },
];

const progressData: ProgressDataPoint[] = [
  { label: 'Project A', value: 75, color: 'text-blue-600' },
  { label: 'Project B', value: 60, color: 'text-green-600' },
  { label: 'Project C', value: 90, color: 'text-purple-600' },
  { label: 'Project D', value: 45, color: 'text-orange-600' },
];

const statsData: StatCardData[] = [
  { title: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up' },
  { title: 'Orders', value: '2,345', change: '+15.3%', trend: 'up' },
  { title: 'Customers', value: '1,234', change: '-2.5%', trend: 'down' },
  { title: 'Conversion', value: '3.24%', change: '+8.2%', trend: 'up' },
];

// Progress Chart Component
function ProgressChart({ item }: { item: ProgressDataPoint }) {
  return (
    <div className="text-center space-y-4">
      <div className="relative w-24 h-24 mx-auto">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - item.value / 100)}`}
            className={item.color}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${item.color}`}>{item.value}%</span>
        </div>
      </div>
      <div>
        <p className="font-medium">{item.label}</p>
        <p className="text-sm text-muted-foreground">Completion Rate</p>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ stat }: { stat: StatCardData }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
              {stat.change}
            </Badge>
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="h-8">
            <svg width="100%" height="100%" className="text-primary">
              <polyline
                points="0,20 20,15 40,25 60,10 80,5 100,15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ChartsPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Charts</h1>
            <p className="text-muted-foreground text-lg">
              Data visualization components for displaying statistics and analytics
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">8 Chart Types</Badge>
            <Badge variant="outline">SVG Based</Badge>
            <Badge variant="outline">Interactive</Badge>
          </div>
        </div>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.TrendingUp className="h-5 w-5" />
              Line Chart
            </CardTitle>
            <CardDescription>
              Display trends over time with multiple data series
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <LineChart data={lineChartData} />
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.BarChart className="h-5 w-5" />
              Bar Chart
            </CardTitle>
            <CardDescription>
              Compare different categories with vertical bars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <BarChart data={barChartData} />
            </div>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.PieChart className="h-5 w-5" />
              Donut Chart
            </CardTitle>
            <CardDescription>
              Show proportional data with a circular visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <DonutChart data={pieChartData} />
            </div>
          </CardContent>
        </Card>

        {/* Progress Charts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Target className="h-5 w-5" />
              Progress Charts
            </CardTitle>
            <CardDescription>
              Visualize progress and completion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {progressData.map((item, index) => (
                <ProgressChart key={index} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stat Cards with Mini Charts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Activity className="h-5 w-5" />
              Statistics with Mini Charts
            </CardTitle>
            <CardDescription>
              Combine key metrics with small trend indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Settings className="h-5 w-5" />
              Chart Features
            </CardTitle>
            <CardDescription>
              Available features and customization options for charts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: LucideIcons.Palette, title: 'Customizable Colors', description: 'Multiple color schemes and themes' },
                { icon: LucideIcons.MousePointer, title: 'Interactive', description: 'Hover effects and click events' },
                { icon: LucideIcons.Smartphone, title: 'Responsive', description: 'Adapts to different screen sizes' },
                { icon: LucideIcons.Download, title: 'Export Options', description: 'Save as PNG, SVG, or PDF' },
                { icon: LucideIcons.Zap, title: 'Animations', description: 'Smooth entrance and transition effects' },
                { icon: LucideIcons.Database, title: 'Data Binding', description: 'Easy integration with data sources' },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center space-y-3 p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Chart Types Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Grid3X3 className="h-5 w-5" />
              Available Chart Types
            </CardTitle>
            <CardDescription>
              Complete collection of chart components available in the library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'Line Chart', 'Bar Chart', 'Area Chart', 'Pie Chart',
                'Donut Chart', 'Scatter Plot', 'Histogram', 'Heatmap',
                'Radar Chart', 'Treemap', 'Funnel Chart', 'Gauge Chart'
              ].map((chartType, index) => (
                <div key={index} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                    <LucideIcons.BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium">{chartType}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}