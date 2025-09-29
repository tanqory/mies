import React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '../../components/ui/utils';

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps?: number[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressStepper({
  steps,
  currentStep,
  completedSteps = [],
  orientation = 'horizontal',
  size = 'md',
  className,
}: ProgressStepperProps) {
  const sizeClasses = {
    sm: {
      icon: 'w-6 h-6',
      text: 'text-xs',
      title: 'text-sm',
      connector: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
    },
    md: {
      icon: 'w-8 h-8',
      text: 'text-sm',
      title: 'text-base',
      connector: orientation === 'horizontal' ? 'h-1' : 'w-1',
    },
    lg: {
      icon: 'w-10 h-10',
      text: 'text-base',
      title: 'text-lg',
      connector: orientation === 'horizontal' ? 'h-1.5' : 'w-1.5',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'items-center' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index) || index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                'flex items-center',
                orientation === 'vertical' && 'mb-4'
              )}
            >
              {/* Step Icon */}
              <div
                className={cn(
                  'flex items-center justify-center rounded-full border-2 transition-colors',
                  classes.icon,
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground'
                    : isCurrent
                    ? 'bg-background border-primary text-primary'
                    : 'bg-background border-muted text-muted-foreground'
                )}
              >
                {step.icon ? (
                  step.icon
                ) : isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Circle
                    className={cn(
                      'w-3 h-3',
                      isCurrent ? 'fill-current' : 'fill-muted-foreground/20'
                    )}
                  />
                )}
              </div>

              {/* Step Content */}
              <div
                className={cn(
                  'ml-3',
                  orientation === 'vertical' ? 'flex-1' : 'text-center'
                )}
              >
                <div
                  className={cn(
                    'font-medium transition-colors',
                    classes.title,
                    isCompleted || isCurrent
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div
                    className={cn(
                      'mt-1 transition-colors',
                      classes.text,
                      isCompleted || isCurrent
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground/60'
                    )}
                  >
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {/* Connector */}
            {!isLast && (
              <div
                className={cn(
                  'flex-1 transition-colors',
                  classes.connector,
                  orientation === 'horizontal'
                    ? 'mx-4 min-w-[2rem]'
                    : 'ml-4 min-h-[1rem] -mt-4 mb-0',
                  isCompleted
                    ? 'bg-primary'
                    : 'bg-muted'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}