import React, { useState, useEffect } from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const loadingSteps = [
  { text: "Analyzing your profile...", duration: 2000 },
  { text: "Matching training intensity...", duration: 2000 },
  { text: "Personalizing recommendations...", duration: 2000 },
  { text: "Optimizing supplement stack...", duration: 2000 },
  { text: "Finalizing your protocol...", duration: 2000 }
];

const Step7Loading: React.FC = () => {
  const { nextStep } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const startStep = (stepIndex: number) => {
      if (stepIndex >= loadingSteps.length) {
        // Toutes les étapes terminées, aller vers Step8Results
        setTimeout(() => {
          nextStep();
        }, 500);
        return;
      }

      setCurrentStep(stepIndex);
      setProgress((stepIndex / loadingSteps.length) * 100);

      // Animation de progression pendant l'étape
      const stepDuration = loadingSteps[stepIndex].duration;
      const progressSteps = 50; // 50 étapes d'animation
      const intervalTime = stepDuration / progressSteps;
      let progressCount = 0;

      progressInterval = setInterval(() => {
        progressCount++;
        const stepProgress = (progressCount / progressSteps) * (100 / loadingSteps.length);
        const baseProgress = (stepIndex / loadingSteps.length) * 100;
        setProgress(baseProgress + stepProgress);
        
        if (progressCount >= progressSteps) {
          clearInterval(progressInterval);
        }
      }, intervalTime);

      // Passer à l'étape suivante
      stepTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        startStep(stepIndex + 1);
      }, stepDuration);
    };

    startStep(0);

    return () => {
      if (stepTimeout) clearTimeout(stepTimeout);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [nextStep]);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/50 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/assets/logo-black.png" 
            alt="SportiveAI" 
            className="h-16 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            AI is Generating Your Recommendations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please wait while our AI analyzes your profile and creates personalized supplement recommendations
          </p>
        </div>

        {/* Current Step Text */}
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-3 bg-primary-500/10 border border-primary-500/20 rounded-xl">
            <p className="text-primary-700 font-medium text-lg">
              {loadingSteps[currentStep]?.text || "Processing..."}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="w-full bg-gray-200/60 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-4 mb-8">
          {loadingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-primary-500 shadow-sm'
                  : 'bg-gray-300/60'
              }`}
            />
          ))}
        </div>


      </div>
    </div>
  );
};

export default Step7Loading;