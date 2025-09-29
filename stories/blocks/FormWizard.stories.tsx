import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MultiStepForm,
  ProgressStepper,
  StepNavigation,
  useMultiStepForm,
  type FormStep
} from '../../src/blocks/form-wizard-blocks';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Textarea } from '../../src/components/ui/textarea';
import { Button } from '../../src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { User, Mail, FileText, CheckCircle } from 'lucide-react';

const meta: Meta<typeof MultiStepForm> = {
  title: 'Blocks/FormWizard',
  component: MultiStepForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Multi-step form wizard components for creating complex forms with step-by-step navigation and validation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MultiStepForm>;

// Sample form data
const sampleSteps: FormStep[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Enter your basic details',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="Enter your first name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Enter your last name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="Enter your phone number" />
        </div>
      </div>
    ),
    validate: async () => {
      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    },
  },
  {
    id: 'contact',
    title: 'Contact Details',
    description: 'How can we reach you?',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" placeholder="Enter your address" />
        </div>
      </div>
    ),
    validate: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return true;
    },
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Tell us about your preferences',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interests">Interests</Label>
          <Input id="interests" placeholder="What are you interested in?" />
        </div>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    steps: sampleSteps,
    onComplete: async () => {
      console.log('Form completed!');
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  },
};

export const WithCustomProgress: Story = {
  args: {
    steps: sampleSteps,
    progressOrientation: 'vertical',
    className: 'max-w-4xl',
    onComplete: async () => {
      console.log('Form completed!');
    },
  },
};

export const WithoutProgress: Story = {
  args: {
    steps: sampleSteps,
    showProgress: false,
    onComplete: async () => {
      console.log('Form completed!');
    },
  },
};

// Individual components
export const ProgressStepperDemo: StoryObj<typeof ProgressStepper> = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([0]);

    const steps = [
      { id: '1', title: 'Personal Info', description: 'Basic details' },
      { id: '2', title: 'Contact', description: 'Contact information' },
      { id: '3', title: 'Preferences', description: 'Your preferences' },
      { id: '4', title: 'Review', description: 'Review and submit' },
    ];

    return (
      <div className="space-y-8 max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold mb-4">Horizontal Progress</h3>
          <ProgressStepper
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Vertical Progress</h3>
          <ProgressStepper
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            orientation="vertical"
          />
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
              }
            }}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCompletedSteps([...completedSteps, currentStep]);
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const StepNavigationDemo: StoryObj<typeof StepNavigation> = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 4;

    return (
      <div className="space-y-8 max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold mb-4">Default Navigation</h3>
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={() => setCurrentStep(Math.min(currentStep + 1, totalSteps - 1))}
            onPrevious={() => setCurrentStep(Math.max(currentStep - 1, 0))}
            onComplete={() => alert('Completed!')}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Loading State</h3>
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            isLoading={true}
            onNext={() => {}}
            onPrevious={() => {}}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Custom Labels</h3>
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            nextLabel="Continue"
            previousLabel="Go Back"
            completeLabel="Finish"
            onNext={() => setCurrentStep(Math.min(currentStep + 1, totalSteps - 1))}
            onPrevious={() => setCurrentStep(Math.max(currentStep - 1, 0))}
            onComplete={() => alert('Finished!')}
          />
        </div>
      </div>
    );
  },
};

export const CompleteExample: Story = {
  render: () => {
    const {
      currentStep,
      completedSteps,
      formData,
      updateFormData,
      goToStep,
      markStepCompleted,
      reset,
    } = useMultiStepForm(sampleSteps);

    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = async () => {
      console.log('Final form data:', formData);
      setIsCompleted(true);
    };

    if (isCompleted) {
      return (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Form Completed!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for submitting your information.
            </p>
            <Button onClick={() => { setIsCompleted(false); reset(); }}>
              Start Over
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        <MultiStepForm
          steps={sampleSteps}
          onComplete={handleComplete}
          onStepChange={(step) => goToStep(step)}
        />
      </div>
    );
  },
};