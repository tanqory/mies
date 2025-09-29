import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  completeLabel?: string;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  nextButtonProps?: React.ComponentProps<typeof Button>;
  previousButtonProps?: React.ComponentProps<typeof Button>;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onComplete,
  nextLabel = 'Next',
  previousLabel = 'Previous',
  completeLabel = 'Complete',
  isNextDisabled = false,
  isPreviousDisabled = false,
  isLoading = false,
  className,
  nextButtonProps,
  previousButtonProps,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete();
    } else if (onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {/* Previous Button */}
      <div>
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isPreviousDisabled || isLoading}
            {...previousButtonProps}
            className={cn('', previousButtonProps?.className)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {previousLabel}
          </Button>
        )}
      </div>

      {/* Step Indicator (optional center content) */}
      <div className="text-sm text-muted-foreground hidden sm:block">
        Step {currentStep + 1} of {totalSteps}
      </div>

      {/* Next/Complete Button */}
      <div>
        <Button
          onClick={handleNext}
          disabled={isNextDisabled || isLoading}
          {...nextButtonProps}
          className={cn('', nextButtonProps?.className)}
        >
          {isLoading ? 'Loading...' : (isLastStep ? completeLabel : nextLabel)}
          {!isLastStep && !isLoading && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}

// Navigation Variants
export interface StepNavigationCenteredProps extends Omit<StepNavigationProps, 'className'> {
  className?: string;
}

export function StepNavigationCentered({
  className,
  ...props
}: StepNavigationCenteredProps) {
  return (
    <div className={cn('flex justify-center space-x-4', className)}>
      {props.currentStep > 0 && (
        <Button
          variant="outline"
          onClick={props.onPrevious}
          disabled={props.isPreviousDisabled || props.isLoading}
          {...props.previousButtonProps}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {props.previousLabel || 'Previous'}
        </Button>
      )}

      <Button
        onClick={props.currentStep === props.totalSteps - 1 ? props.onComplete : props.onNext}
        disabled={props.isNextDisabled || props.isLoading}
        {...props.nextButtonProps}
      >
        {props.isLoading ? 'Loading...' : (props.currentStep === props.totalSteps - 1
          ? (props.completeLabel || 'Complete')
          : (props.nextLabel || 'Next')
        )}
        {props.currentStep < props.totalSteps - 1 && !props.isLoading && <ChevronRight className="w-4 h-4 ml-2" />}
      </Button>
    </div>
  );
}

export interface StepNavigationMinimalProps extends Omit<StepNavigationProps, 'className' | 'onPrevious' | 'previousLabel'> {
  className?: string;
}

export function StepNavigationMinimal({
  className,
  ...props
}: StepNavigationMinimalProps) {
  return (
    <div className={cn('flex justify-end', className)}>
      <Button
        onClick={props.currentStep === props.totalSteps - 1 ? props.onComplete : props.onNext}
        disabled={props.isNextDisabled || props.isLoading}
        {...props.nextButtonProps}
      >
        {props.isLoading ? 'Loading...' : (props.currentStep === props.totalSteps - 1
          ? (props.completeLabel || 'Complete')
          : (props.nextLabel || 'Next')
        )}
        {props.currentStep < props.totalSteps - 1 && !props.isLoading && <ChevronRight className="w-4 h-4 ml-2" />}
      </Button>
    </div>
  );
}