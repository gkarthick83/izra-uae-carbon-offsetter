import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ steps, currentStep }) => {
  const isStepComplete = (stepIndex) => stepIndex < currentStep;
  const isStepCurrent = (stepIndex) => stepIndex === currentStep;
  const isStepAccessible = (stepIndex) => stepIndex <= currentStep;

  return (
    <nav aria-label="Progress" className="py-6">
      <ol className="flex items-center justify-center gap-2 overflow-x-auto">
        {steps?.map((step, index) => (
          <li key={step?.id} className="flex items-center gap-2">
            {isStepAccessible(index) ? (
              <Link
                to={step?.path || '#'}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-smooth ${
                  isStepCurrent(index)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : isStepComplete(index)
                    ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isStepCurrent(index)
                      ? 'bg-primary-foreground/20'
                      : isStepComplete(index)
                      ? 'bg-success/20' :'bg-muted-foreground/20'
                  }`}
                >
                  {isStepComplete(index) ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  {step?.label}
                </span>
              </Link>
            ) : (
              <div
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted-foreground/10">
                  <span className="text-sm font-semibold">{index + 1}</span>
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  {step?.label}
                </span>
              </div>
            )}

            {index < steps?.length - 1 && (
              <Icon
                name="ChevronRight"
                size={20}
                className="text-muted-foreground hidden sm:block"
              />
            )}
          </li>
        ))}
      </ol>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps?.length}
          {steps?.[currentStep]?.description && (
            <span className="block mt-1 text-foreground font-medium">
              {steps?.[currentStep]?.description}
            </span>
          )}
        </p>
      </div>
    </nav>
  );
};

export default NavigationBreadcrumb;