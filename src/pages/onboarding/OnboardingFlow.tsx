import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import Step1Identity from './Step1Identity.tsx';
import Step2Health from './Step2Health.tsx';
import Step3Training from './Step3Training.tsx';
import Step4Account from './Step4Account.tsx';
import Step5AIQuestionnaire from './Step5AIQuestionnaire.tsx';
import Step6Summary from './Step6Summary.tsx';

const OnboardingFlow: React.FC = () => {
  const { currentStep } = useOnboarding();

  const steps = [
    { number: 1, title: 'Identity & Sport', component: Step1Identity },
    { number: 2, title: 'Health & Medical', component: Step2Health },
    { number: 3, title: 'Training & Habits', component: Step3Training },
    { number: 4, title: 'Account Setup', component: Step4Account },
    { number: 5, title: 'AI Questionnaire', component: Step5AIQuestionnaire },
    { number: 6, title: 'Summary & Confirmation', component: Step6Summary },
  ];

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header style={{ backgroundColor: '#D2D2D2' }} className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <img 
              src="/assets/logo.png" 
              alt="SportiveAI" 
              className="h-16 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Registration Process
            </h2>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.number < currentStep
                      ? 'bg-primary-500 text-white'
                      : step.number === currentStep
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.number < currentStep ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1 text-center">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Background with gradient */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
        {/* Step Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {CurrentStepComponent && <CurrentStepComponent />}
        </main>
      </div>
    </div>
  );
};

export default OnboardingFlow;