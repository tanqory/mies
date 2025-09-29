import type { Meta, StoryObj } from '@storybook/react';
import { Stepper, Step, StepIcon, StepLabel, StepContent } from '../src/components/ui/stepper';
import { useState } from 'react';
import { Button } from '../src/components/ui/button';
import { CheckCircle, XCircle, User, CreditCard, Truck } from 'lucide-react';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A stepper component that displays progress through a sequence of logical and numbered steps.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      control: { type: 'number', min: 0, max: 4, step: 1 },
      description: 'Currently active step index',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the stepper',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size of the stepper components',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  'Select campaign settings',
  'Create an ad group',
  'Create an ad',
  'Review and launch',
];

export const Default: Story = {
  args: {
    activeStep: 1,
    orientation: 'horizontal',
    size: 'default',
  },
  render: (args) => (
    <Stepper {...args}>
      {steps.map((label, index) => (
        <Step key={index} index={index}>
          <StepIcon index={index} />
          <StepLabel index={index}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  ),
};

export const Vertical: Story = {
  args: {
    activeStep: 2,
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="w-80">
      <Stepper {...args}>
        {steps.map((label, index) => (
          <Step key={index} index={index}>
            <StepIcon index={index} />
            <StepLabel index={index}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  ),
};

export const WithErrors: Story = {
  args: {
    activeStep: 2,
    error: [1],
    completed: [0],
  },
  render: (args) => (
    <Stepper {...args}>
      {steps.map((label, index) => (
        <Step key={index} index={index}>
          <StepIcon index={index} />
          <StepLabel index={index}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  ),
};

export const CustomIcons: Story = {
  args: {
    activeStep: 1,
    completed: [0],
  },
  render: (args) => {
    const icons = [User, CreditCard, Truck, CheckCircle];
    const labels = ['Account', 'Payment', 'Shipping', 'Review'];

    return (
      <Stepper {...args}>
        {labels.map((label, index) => {
          const IconComponent = icons[index];
          return (
            <Step key={index} index={index}>
              <StepIcon index={index} icon={<IconComponent className="h-4 w-4" />} />
              <StepLabel index={index}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  },
};

export const WithContent: Story = {
  render: function StepperWithContent() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<number[]>([]);

    const handleNext = () => {
      if (activeStep < steps.length - 1) {
        setCompleted([...completed, activeStep]);
        setActiveStep(activeStep + 1);
      }
    };

    const handleBack = () => {
      if (activeStep > 0) {
        setActiveStep(activeStep - 1);
        setCompleted(completed.filter(step => step !== activeStep - 1));
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <Stepper
          activeStep={activeStep}
          completed={completed}
          orientation="vertical"
        >
          {steps.map((label, index) => (
            <Step key={index} index={index}>
              <StepIcon index={index} />
              <StepLabel index={index}>{label}</StepLabel>
              <StepContent index={index}>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Content for step {index + 1}: {label}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleNext}
                      disabled={activeStep === steps.length - 1}
                      size="sm"
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      variant="outline"
                      size="sm"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Small</h3>
        <Stepper activeStep={1} size="sm">
          {steps.slice(0, 3).map((label, index) => (
            <Step key={index} index={index}>
              <StepIcon index={index} />
              <StepLabel index={index}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Default</h3>
        <Stepper activeStep={1} size="default">
          {steps.slice(0, 3).map((label, index) => (
            <Step key={index} index={index}>
              <StepIcon index={index} />
              <StepLabel index={index}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Large</h3>
        <Stepper activeStep={1} size="lg">
          {steps.slice(0, 3).map((label, index) => (
            <Step key={index} index={index}>
              <StepIcon index={index} />
              <StepLabel index={index}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<number[]>([]);
    const [error, setError] = useState<number[]>([]);

    const handleStepClick = (step: number) => {
      setActiveStep(step);
    };

    const handleComplete = () => {
      setCompleted([...completed, activeStep]);
      setError(error.filter(s => s !== activeStep));
    };

    const handleError = () => {
      setError([...error, activeStep]);
      setCompleted(completed.filter(s => s !== activeStep));
    };

    return (
      <div className="w-full max-w-lg space-y-6">
        <Stepper
          activeStep={activeStep}
          completed={completed}
          error={error}
        >
          {steps.map((label, index) => (
            <Step key={index} index={index}>
              <button onClick={() => handleStepClick(index)}>
                <StepIcon index={index} />
              </button>
              <StepLabel index={index}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="flex gap-2">
          <Button onClick={handleComplete} size="sm">
            Mark Complete
          </Button>
          <Button onClick={handleError} variant="destructive" size="sm">
            Mark Error
          </Button>
          <Button
            onClick={() => {
              setCompleted([]);
              setError([]);
              setActiveStep(0);
            }}
            variant="outline"
            size="sm"
          >
            Reset
          </Button>
        </div>
      </div>
    );
  },
};