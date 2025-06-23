import React, { useState } from 'react';

interface SubStepContainerProps {
  children: React.ReactNode[];
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription: string;
  onComplete: () => void;
  onBack: () => void;
}

export const SubStepContainer: React.FC<SubStepContainerProps> = ({
  children,
  currentStep,
  totalSteps,
  stepTitle,
  stepDescription,
  onComplete,
  onBack
}) => {
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const totalSubSteps = children.length;

  const handleNext = () => {
    if (currentSubStep < totalSubSteps - 1) {
      setCurrentSubStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const goToSubStep = (index: number) => {
    setCurrentSubStep(index);
  };

  return (
    <div className="relative">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        
        {/* Header with dual progress */}
        <div className="mb-8 text-center">
          {/* Main Step Progress */}
          <div className="inline-block backdrop-blur-md bg-primary-500/10 border border-primary-500/20 rounded-2xl px-6 py-3 mb-4">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          {/* Micro Progress Bar */}
          <div className="w-full max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between mb-2">
              {Array.from({ length: totalSubSteps }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSubStep(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    index <= currentSubStep
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white/40 text-gray-500 hover:bg-white/60'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentSubStep + 1) / totalSubSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Title and Description */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {stepTitle}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {stepDescription}
          </p>
        </div>

        {/* SubStep Content with Slide Animation */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSubStep * 100}%)` }}
          >
            {children.map((child, index) => (
              <div key={index} className="w-full flex-shrink-0">
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/20">
          <button
            onClick={handlePrev}
            className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-gray-700 hover:bg-white/30 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{currentSubStep + 1} of {totalSubSteps}</span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>{currentSubStep === totalSubSteps - 1 ? 'Continue' : 'Next'}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};