import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step7Loading: React.FC = () => {
  const { nextStep, data } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    { text: `Analyzing ${data.firstName}'s profile`, duration: 2500 },
    { text: `Running ${data.firstName}'s profile against our database of thousands of young athletes`, duration: 3000 },
    { text: `Checking ${data.primarySport} routines and performance goals`, duration: 2500 },
    { text: "Generating personalized recommendations", duration: 2000 },
    { text: "Following body needs and health guidelines", duration: 2000 }
  ];

  useEffect(() => {
    let stepTimeout: ReturnType<typeof setTimeout>;
    let progressInterval: ReturnType<typeof setInterval>;

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-4xl mx-auto"
    >
      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/70 border border-white/30 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
        
        {/* Header with Logo and Title */}
        <div className="text-center mb-8">
          <img 
            src="/assets/logo-black.png" 
            alt="SportiveAI" 
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            SportiveAI's proprietary AI engine is hard at work
          </h2>
        </div>

        {/* Spinning Wheel and Current Step */}
        <div className="flex items-center justify-center mb-8">
          {/* Spinning Wheel */}
          <div className="mr-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-gray-200" />
                <path
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-primary-500"
                />
              </svg>
            </motion.div>
          </div>

          {/* Current Step Text */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4"
            >
              <p className="text-primary-700 font-medium text-lg">
                {loadingSteps[currentStep]?.text || "Processing..."}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Progress Steps List */}
        <div className="mb-8">
          <div className="space-y-3">
            {loadingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-3 transition-all duration-300 ${
                  index === currentStep ? 'scale-105' : ''
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-primary-500 text-white ring-4 ring-primary-500/20'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : index === currentStep ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <p className={`text-sm transition-all duration-300 ${
                  index < currentStep
                    ? 'text-green-600 font-medium'
                    : index === currentStep
                    ? 'text-primary-700 font-semibold'
                    : 'text-gray-400'
                }`}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="w-full bg-gray-200/60 rounded-full h-2 shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full shadow-sm relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
            </motion.div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Step7Loading;