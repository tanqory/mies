import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../components/ui/utils';
import { ProgressStepper, type Step } from './progress-stepper';
import { StepNavigation } from './step-navigation';

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  validate?: () => Promise<boolean> | boolean;
  onEnter?: () => void;
  onExit?: () => void;
}

export interface MultiStepFormProps {
  steps: FormStep[];
  initialStep?: number;
  onComplete?: (data?: any) => Promise<void> | void;
  onStepChange?: (step: number, direction: 'next' | 'previous') => void;
  showProgress?: boolean;
  progressOrientation?: 'horizontal' | 'vertical';
  className?: string;
  contentClassName?: string;
  navigationClassName?: string;
  progressClassName?: string;
  completedContent?: React.ReactNode;
}

export function MultiStepForm({
  steps,
  initialStep = 0,
  onComplete,
  onStepChange,
  showProgress = true,
  progressOrientation = 'horizontal',
  className,
  contentClassName,
  navigationClassName,
  progressClassName,
  completedContent,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const progressSteps: Step[] = steps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description,
  }));

  const currentFormStep = steps[currentStep];

  const handleNext = useCallback(async () => {
    if (!currentFormStep) return;

    try {
      setIsLoading(true);

      // Validate current step if validation function exists
      if (currentFormStep.validate) {
        const isValid = await currentFormStep.validate();
        if (!isValid) {
          setIsLoading(false);
          return;
        }
      }

      // Call onExit for current step
      if (currentFormStep.onExit) {
        currentFormStep.onExit();
      }

      // Mark current step as completed
      setCompletedSteps(prev => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep];
        }
        return prev;
      });

      const nextStep = currentStep + 1;

      if (nextStep < steps.length) {
        setCurrentStep(nextStep);
        onStepChange?.(nextStep, 'next');

        // Call onEnter for next step
        const nextFormStep = steps[nextStep];
        if (nextFormStep?.onEnter) {
          nextFormStep.onEnter();
        }
      }
    } catch (error) {
      console.error('Error during step validation:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentStep, currentFormStep, steps, onStepChange]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      // Call onExit for current step
      if (currentFormStep?.onExit) {
        currentFormStep.onExit();
      }

      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep, 'previous');

      // Call onEnter for previous step
      const prevFormStep = steps[prevStep];
      if (prevFormStep?.onEnter) {
        prevFormStep.onEnter();
      }
    }
  }, [currentStep, currentFormStep, steps, onStepChange]);

  const handleComplete = useCallback(async () => {
    try {
      setIsLoading(true);

      // Validate current step before completing
      if (currentFormStep?.validate) {
        const isValid = await currentFormStep.validate();
        if (!isValid) {
          setIsLoading(false);
          return;
        }
      }

      // Call onExit for current step
      if (currentFormStep?.onExit) {
        currentFormStep.onExit();
      }

      // Mark final step as completed
      setCompletedSteps(prev => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep];
        }
        return prev;
      });

      // Complete the form
      if (onComplete) {
        await onComplete();
      }

      setIsCompleted(true);
    } catch (error) {
      console.error('Error during form completion:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentStep, currentFormStep, onComplete]);

  // Step click handler for future use
  // const handleStepClick = useCallback((stepIndex: number) => {
  //   if (!allowSkipSteps) return;

  //   // Only allow going to completed steps or next uncompleted step
  //   const canNavigate = completedSteps.includes(stepIndex) ||
  //                      stepIndex === Math.max(...completedSteps) + 1 ||
  //                      stepIndex < currentStep;

  //   if (canNavigate) {
  //     setCurrentStep(stepIndex);
  //     onStepChange?.(stepIndex, stepIndex > currentStep ? 'next' : 'previous');
  //   }
  // }, [allowSkipSteps, completedSteps, currentStep, onStepChange]);

  if (isCompleted) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          {completedContent || (
            <div className="text-center py-8">
              <div className="text-2xl font-semibold text-green-600 mb-2">
                ✓ Completed!
              </div>
              <div className="text-muted-foreground">
                All steps have been completed successfully.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {/* Progress Stepper */}
        {showProgress && (
          <div className={cn('mb-6', progressClassName)}>
            <ProgressStepper
              steps={progressSteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              orientation={progressOrientation}
            />
          </div>
        )}

        {/* Step Content */}
        <div className={cn('mb-6', contentClassName)}>
          {currentFormStep?.content}
        </div>

        {/* Navigation */}
        <div className={navigationClassName}>
          <StepNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Hook for managing form wizard state
export function useMultiStepForm(steps: FormStep[], initialStep = 0) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const updateFormData = useCallback((stepId: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: data,
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  const markStepCompleted = useCallback((step: number) => {
    setCompletedSteps(prev => {
      if (!prev.includes(step)) {
        return [...prev, step];
      }
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
    setCompletedSteps([]);
    setFormData({});
  }, [initialStep]);

  return {
    currentStep,
    completedSteps,
    formData,
    updateFormData,
    goToStep,
    markStepCompleted,
    reset,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    totalSteps: steps.length,
  };
}