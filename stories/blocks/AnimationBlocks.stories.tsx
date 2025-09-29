import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  CountUpCard,
  TextReveal,
  ScrollToTop
} from '../../src/blocks/animation-blocks';
import {
  AnimateCountUp,
  AnimateText,
  BackToTopButton,
  MotionContainer
} from '../../src/blocks/animate-blocks';
import { _mock } from '../../src/utils/mock-data';
import { Rocket, Shield, BarChart3, Lightbulb } from 'lucide-react';

// Sample data ตามแบบ next-ts
const STATS_DATA = [
  {
    title: 'Total Users',
    value: 150000,
    suffix: '+',
    prefix: '',
    description: 'Active users on platform',
    trend: 'up' as const,
    change: '+12%',
    color: 'primary',
  },
  {
    title: 'Completed Projects',
    value: 2500,
    suffix: '+',
    prefix: '',
    description: 'Successfully delivered',
    trend: 'up' as const,
    change: '+8%',
    color: 'success',
  },
  {
    title: 'Satisfaction Rate',
    value: 98.5,
    suffix: '%',
    prefix: '',
    description: 'Customer satisfaction',
    trend: 'up' as const,
    change: '+2%',
    color: 'warning',
  },
  {
    title: 'Response Time',
    value: 1.2,
    suffix: 's',
    prefix: '',
    description: 'Average response time',
    trend: 'down' as const,
    change: '-15%',
    color: 'info',
  },
];

// Animation demo components (next-ts pattern)
function AnimateCountUpDemo() {
  return (
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
  );
}

function CountUpCardsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS_DATA.map((stat, index) => (
        <CountUpCard
          key={index}
          title={stat.title}
          value={stat.value}
          previousValue={stat.value - 100} // Add previous value for percentage calculation
          suffix={stat.suffix}
          description={stat.description}
          trend={stat.trend}
          className="bg-card border rounded-lg p-6"
        />
      ))}
    </div>
  );
}

function TextRevealDemo() {
  const texts = [
    'Welcome to our platform',
    'Build amazing applications',
    'With modern components',
    'Fast and reliable',
  ];

  return (
    <div className="space-y-8 text-center">
      {texts.map((text, index) => (
        <TextReveal
          key={index}
          text={text}
          delay={index * 0.3}
          duration={0.8}
          className="text-2xl font-bold"
        />
      ))}
    </div>
  );
}

function AnimateTextDemo() {
  return (
    <div className="space-y-8">
      <AnimateText
        textContent="Welcome to our system"
        animationType="typewriter"
        staggerDelay={100}
        className="text-2xl font-bold text-center"
      />
      <AnimateText
        textContent="Technology that changes the world"
        animationType="slide"
        staggerDelay={75}
        className="text-xl text-center text-muted-foreground"
      />
      <AnimateText
        textContent="Ready for transformation"
        animationType="scale"
        staggerDelay={60}
        className="text-lg text-center"
      />
    </div>
  );
}

function MotionContainerDemo() {
  const features = [
    { icon: <Rocket className="h-6 w-6" />, title: 'High Performance', description: 'Fast and stable operation' },
    { icon: <Shield className="h-6 w-6" />, title: 'Security', description: 'Enterprise-grade security' },
    { icon: <BarChart3 className="h-6 w-6" />, title: 'Analytics', description: 'Real-time data reporting' },
    { icon: <Lightbulb className="h-6 w-6" />, title: 'Innovation', description: 'Cutting-edge technology' },
  ];

  return (
    <MotionContainer className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Outstanding Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg bg-card text-center space-y-3"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h4 className="font-semibold">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionContainer>
  );
}

function BackToTopDemo() {
  return (
    <div className="relative">
      <div className="h-96 overflow-y-auto border rounded-lg p-6 space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 bg-muted rounded">
            <h4 className="font-medium">Content Block {i + 1}</h4>
            <p className="text-sm text-muted-foreground mt-2">
              {_mock.description(i)}
            </p>
          </div>
        ))}
      </div>
      <BackToTopButton
        threshold={100}
        className="absolute bottom-4 right-4"
      />
    </div>
  );
}

function ScrollToTopDemo() {
  return (
    <div className="text-center space-y-4">
      <p className="text-muted-foreground">
        Scroll down to see the back to top button in the bottom right corner
      </p>
      <ScrollToTop
        showBelow={200}
        className="bg-primary text-primary-foreground"
      />
    </div>
  );
}

// DEMO_COMPONENTS ตามแบบ next-ts
const DEMO_COMPONENTS = [
  { name: 'Animate Count Up', component: <AnimateCountUpDemo /> },
  { name: 'Count Up Cards', component: <CountUpCardsDemo /> },
  { name: 'Text Reveal', component: <TextRevealDemo /> },
  { name: 'Animate Text', component: <AnimateTextDemo /> },
  { name: 'Motion Container', component: <MotionContainerDemo /> },
  { name: 'Back to Top', component: <BackToTopDemo /> },
  { name: 'Scroll to Top', component: <ScrollToTopDemo /> },
];

// Meta configuration
const meta: Meta<typeof AnimateCountUpDemo> = {
  title: 'Blocks/Animation',
  component: AnimateCountUpDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Animation Component Blocks following next-ts patterns',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimateCountUpDemo>;

// Main Animation View Story
export const AnimationView: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Animation</h1>
        <p className="text-muted-foreground">
          Animation components for creating engaging user experiences
        </p>
      </div>

      <div className="space-y-16">
        {DEMO_COMPONENTS.map((demo, index) => (
          <section key={demo.name} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{demo.name}</h2>
              <div className="text-sm text-muted-foreground">
                Component demonstration following next-ts pattern
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-card">
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
        story: 'Animation view component exactly like next-ts implementation with various animation types.',
      },
    },
  },
};

// Individual component stories
export const CountUpExample: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto">
      <CountUpCardsDemo />
    </div>
  ),
};

export const TextAnimationExample: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto">
      <AnimateTextDemo />
    </div>
  ),
};

export const MotionExample: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto">
      <MotionContainerDemo />
    </div>
  ),
};

// Export data for other stories
export { STATS_DATA, DEMO_COMPONENTS };