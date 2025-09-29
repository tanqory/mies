import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../src/components/ui/progress';
import { Button } from '../src/components/ui/button';
import { useState } from 'react';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A progress indicator that shows the completion progress of a task, typically displayed as a progress bar.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default progress bar with 60% completion.',
      },
    },
  },
};

export const Values: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Starting</span>
          <span className="text-sm text-muted-foreground">0%</span>
        </div>
        <Progress value={0} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">In Progress</span>
          <span className="text-sm text-muted-foreground">33%</span>
        </div>
        <Progress value={33} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Half Way</span>
          <span className="text-sm text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Almost Done</span>
          <span className="text-sm text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Complete</span>
          <span className="text-sm text-muted-foreground">100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars at different completion percentages.',
      },
    },
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">File Upload</span>
          <span className="text-sm text-muted-foreground">7.3 MB of 10 MB</span>
        </div>
        <Progress value={73} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Project Completion</span>
          <span className="text-sm text-muted-foreground">8 of 12 tasks</span>
        </div>
        <Progress value={67} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Storage Used</span>
          <span className="text-sm text-muted-foreground">456 GB of 1 TB</span>
        </div>
        <Progress value={46} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with descriptive labels and values.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    const startProgress = () => {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    };

    return (
      <div className="space-y-4 w-96">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Download Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <Button onClick={startProgress} disabled={progress > 0 && progress < 100}>
          {progress === 0 ? 'Start Download' : progress === 100 ? 'Download Complete' : 'Downloading...'}
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive progress bar that can be started with a button.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Small Progress</span>
          <span className="text-sm text-muted-foreground">25%</span>
        </div>
        <Progress value={25} className="h-1" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Default Progress</span>
          <span className="text-sm text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Large Progress</span>
          <span className="text-sm text-muted-foreground">75%</span>
        </div>
        <Progress value={75} className="h-3" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Extra Large Progress</span>
          <span className="text-sm text-muted-foreground">90%</span>
        </div>
        <Progress value={90} className="h-4" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars in different sizes.',
      },
    },
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold">Profile Completion</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Complete your profile</span>
            <span className="text-muted-foreground">6/10 steps</span>
          </div>
          <Progress value={60} />
          <p className="text-xs text-muted-foreground">
            Add a profile photo and bio to reach 80%
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold">Subscription Usage</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>API Calls</span>
              <span className="text-muted-foreground">8,500 / 10,000</span>
            </div>
            <Progress value={85} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Storage</span>
              <span className="text-muted-foreground">2.3 GB / 5 GB</span>
            </div>
            <Progress value={46} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Bandwidth</span>
              <span className="text-muted-foreground">156 GB / 500 GB</span>
            </div>
            <Progress value={31} />
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold">Skill Level</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>JavaScript</span>
              <span className="text-muted-foreground">Advanced</span>
            </div>
            <Progress value={90} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>TypeScript</span>
              <span className="text-muted-foreground">Intermediate</span>
            </div>
            <Progress value={70} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Python</span>
              <span className="text-muted-foreground">Beginner</span>
            </div>
            <Progress value={30} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world progress bar examples in different contexts.',
      },
    },
  },
};