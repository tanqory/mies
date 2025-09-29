'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  LucideIcons,
} from '@tanqory/mies';
import { Rocket, Lightbulb, Lock, BarChart3 } from 'lucide-react';
import { PageLayout } from '../../components/navigation';

// Mock animation components (simplified versions based on our blocks)
function AnimateCountUp({ from = 0, to, duration = 2, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    const increment = (to - from) / (duration * 60); // 60fps
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if ((increment > 0 && next >= to) || (increment < 0 && next <= to)) {
          clearInterval(timer);
          return to;
        }
        return next;
      });
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

function TextReveal({ text, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}>
      {text}
    </div>
  );
}

function AnimateText({ text, className = '' }) {
  const [visibleChars, setVisibleChars] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setVisibleChars(prev => {
        if (prev >= text.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={className}>
      {text.slice(0, visibleChars)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function MotionContainer({ children, className = '' }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${className}`}>
      {children}
    </div>
  );
}

const STATS_DATA = [
  {
    title: 'Total Users',
    value: 150000,
    suffix: '+',
    prefix: '',
    description: 'Active users on platform',
    trend: 'up' as const,
    change: '+12%',
    color: 'text-primary',
  },
  {
    title: 'Completed Projects',
    value: 2500,
    suffix: '+',
    prefix: '',
    description: 'Successfully delivered',
    trend: 'up' as const,
    change: '+8%',
    color: 'text-accent',
  },
  {
    title: 'Satisfaction Rate',
    value: 98.5,
    suffix: '%',
    prefix: '',
    description: 'Customer satisfaction',
    trend: 'up' as const,
    change: '+2%',
    color: 'text-destructive',
  },
  {
    title: 'Response Time',
    value: 1.2,
    suffix: 's',
    prefix: '',
    description: 'Average response time',
    trend: 'down' as const,
    change: '-15%',
    color: 'text-muted-foreground',
  },
];

export default function AnimationPage() {
  const [resetKey, setResetKey] = React.useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Animation</h1>
              <p className="text-muted-foreground text-lg">
                Count-up animations, text reveals, and motion containers
              </p>
            </div>
            <Button onClick={handleReset} variant="outline">
              <LucideIcons.RotateCcw className="h-4 w-4 mr-2" />
              Reset Animations
            </Button>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">7 Animation Types</Badge>
            <Badge variant="outline">Interactive Demo</Badge>
          </div>
        </div>

        {/* Count Up Demo */}
        <Card key={`count-${resetKey}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.TrendingUp className="h-5 w-5" />
              Count Up Animation
            </CardTitle>
            <CardDescription>
              Animated number counters for displaying statistics and metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <AnimateCountUp
                  from={0}
                  to={1500}
                  duration={2}
                  className="text-3xl font-bold text-primary"
                />
                <p className="text-sm text-muted-foreground mt-2">Active Users</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <AnimateCountUp
                  from={0}
                  to={250}
                  duration={1.5}
                  suffix="+"
                  className="text-3xl font-bold text-accent"
                />
                <p className="text-sm text-muted-foreground mt-2">Projects</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <AnimateCountUp
                  from={0}
                  to={99.9}
                  duration={2.5}
                  decimals={1}
                  suffix="%"
                  className="text-3xl font-bold text-primary"
                />
                <p className="text-sm text-muted-foreground mt-2">Uptime</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <AnimateCountUp
                  from={0}
                  to={24}
                  duration={1}
                  suffix="/7"
                  className="text-3xl font-bold text-destructive"
                />
                <p className="text-sm text-muted-foreground mt-2">Support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Count Up Cards */}
        <Card key={`cards-${resetKey}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.BarChart className="h-5 w-5" />
              Statistical Cards
            </CardTitle>
            <CardDescription>
              Count-up animations integrated with card layouts and trend indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS_DATA.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <Badge variant={stat.trend === 'up' ? 'success' : 'secondary'} className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                      <div className={`text-3xl font-bold ${stat.color}`}>
                        <AnimateCountUp
                          from={0}
                          to={stat.value}
                          duration={2 + index * 0.2}
                          suffix={stat.suffix}
                          prefix={stat.prefix}
                          decimals={stat.value % 1 !== 0 ? 1 : 0}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Text Reveal */}
        <Card key={`reveal-${resetKey}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Type className="h-5 w-5" />
              Text Reveal Animation
            </CardTitle>
            <CardDescription>
              Smooth text animations that reveal content with staggered timing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 text-center py-8">
              <TextReveal
                text="Welcome to our platform"
                delay={0}
                className="text-3xl font-bold"
              />
              <TextReveal
                text="Build amazing applications"
                delay={0.5}
                className="text-2xl font-semibold text-muted-foreground"
              />
              <TextReveal
                text="With modern components"
                delay={1}
                className="text-xl"
              />
              <TextReveal
                text="Fast and reliable"
                delay={1.5}
                className="text-lg text-muted-foreground"
              />
            </div>
          </CardContent>
        </Card>

        {/* Typewriter Effect */}
        <Card key={`typewriter-${resetKey}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Keyboard className="h-5 w-5" />
              Typewriter Animation
            </CardTitle>
            <CardDescription>
              Character-by-character text animation with typing cursor effect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 py-8">
              <div className="text-center">
                <AnimateText
                  text="Welcome to our system"
                  className="text-2xl font-bold"
                />
              </div>
              <div className="text-center">
                <AnimateText
                  text="Technology that changes the world"
                  className="text-xl text-muted-foreground"
                />
              </div>
              <div className="text-center">
                <AnimateText
                  text="Ready for transformation"
                  className="text-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motion Container */}
        <Card key={`motion-${resetKey}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Move className="h-5 w-5" />
              Motion Container
            </CardTitle>
            <CardDescription>
              Container-level animations that affect all child elements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MotionContainer className="py-6">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold">Outstanding Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: <Rocket className="h-6 w-6" />, title: 'High Performance', description: 'Fast and stable operation' },
                    { icon: <Lock className="h-6 w-6" />, title: 'Security', description: 'Enterprise-grade security' },
                    { icon: <BarChart3 className="h-6 w-6" />, title: 'Analytics', description: 'Real-time data reporting' },
                    { icon: <Lightbulb className="h-6 w-6" />, title: 'Innovation', description: 'Cutting-edge technology' },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="p-6 border rounded-lg bg-card text-center space-y-3 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="text-4xl">{feature.icon}</div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MotionContainer>
          </CardContent>
        </Card>

        {/* Loading Animations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Loader2 className="h-5 w-5 animate-spin" />
              Loading Animations
            </CardTitle>
            <CardDescription>
              Various loading states and progress indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg space-y-4">
                <LucideIcons.Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-sm font-medium">Spinning Loader</p>
              </div>

              <div className="text-center p-6 border rounded-lg space-y-4">
                <div className="flex space-x-1 justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                </div>
                <p className="text-sm font-medium">Pulsing Dots</p>
              </div>

              <div className="text-center p-6 border rounded-lg space-y-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm font-medium">Border Spinner</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animation Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Settings className="h-5 w-5" />
              Animation Controls
            </CardTitle>
            <CardDescription>
              Interactive controls to reset and replay animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleReset}>
                <LucideIcons.RotateCcw className="h-4 w-4 mr-2" />
                Reset All Animations
              </Button>
              <Button variant="outline">
                <LucideIcons.Play className="h-4 w-4 mr-2" />
                Play Demo
              </Button>
              <Button variant="outline">
                <LucideIcons.Pause className="h-4 w-4 mr-2" />
                Pause Animations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}