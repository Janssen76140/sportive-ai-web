import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import Step1Identity from './Step1Identity.tsx';
import Step2Health from './Step2Health.tsx';
import Step3Training from './Step3Training.tsx';
import Step4Account from './Step4Account.tsx';
import Step5AIQuestionnaire from './Step5AIQuestionnaire.tsx';
import Step6Summary from './Step6Summary.tsx';
import Step7Loading from './Step7Loading.tsx';
import Step8Results from './Step8Results.tsx';

const OnboardingFlow: React.FC = () => {
  const { currentStep } = useOnboarding();

  const steps = [
    { number: 1, title: 'Identity & Sport', component: Step1Identity },
    { number: 2, title: 'Health & Medical', component: Step2Health },
    { number: 3, title: 'Training & Habits', component: Step3Training },
    { number: 4, title: 'Account Setup', component: Step4Account },
    { number: 5, title: 'AI Questionnaire', component: Step5AIQuestionnaire },
    { number: 6, title: 'Summary & Confirmation', component: Step6Summary },
    { number: 7, title: 'AI Processing', component: Step7Loading },
    { number: 8, title: 'Your Results', component: Step8Results },
  ];

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/wallpaper.jpeg')" }}
      />
      
      {/* Layout container with flex */}
      <div className="flex min-h-screen relative z-10">
        
        {/* Sticky Progress Bar - Left Side */}
        <motion.div 
          className="fixed top-0 left-0 w-80 h-full bg-white border-r border-gray-200 shadow-lg z-10"
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ willChange: 'transform' }}
        >
          <div className="p-6">
            
            {/* Logo */}
            <motion.div 
              className="my-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.img 
                src="/assets/logo-black.png" 
                alt="SportiveAI" 
                className="h-12 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Progress Header */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.h2 
                className="text-lg font-semibold text-gray-900 mb-2"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                Your Progress
              </motion.h2>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full shadow-sm relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ willChange: 'width' }}
                >
                  {/* Enhanced Shimmer effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: [-100, 200] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "linear",
                      repeatType: "loop"
                    }}
                    style={{ width: '50%' }}
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-60" />
                </motion.div>
              </div>
              <motion.p 
                className="text-sm text-gray-600 mt-2"
                key={`${currentStep}-${steps.length}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep} of {steps.length} steps completed
              </motion.p>
            </motion.div>

            {/* Steps List */}
            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.number} 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step.number < currentStep
                        ? 'bg-primary-500 text-white shadow-md'
                        : step.number === currentStep
                        ? 'bg-primary-500 text-white shadow-md ring-2 ring-primary-200'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    whileHover={{ scale: step.number <= currentStep ? 1.1 : 1 }}
                    animate={{
                      scale: step.number === currentStep ? [1, 1.05, 1] : 1,
                      boxShadow: step.number === currentStep 
                        ? '0 0 0 4px rgba(52, 170, 53, 0.2)' 
                        : step.number < currentStep
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        : 'none'
                    }}
                    transition={{
                      scale: { duration: 2, repeat: step.number === currentStep ? Infinity : 0, repeatType: "reverse" },
                      boxShadow: { duration: 0.3 }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {step.number < currentStep ? (
                        <motion.svg 
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                          className="w-5 h-5" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      ) : (
                        <motion.span
                          key="number"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {step.number}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <div className="flex-1">
                    <motion.p 
                      className={`text-sm font-medium transition-colors duration-300 ${
                        step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}
                      animate={{
                        color: step.number <= currentStep ? '#111827' : '#6B7280'
                      }}
                    >
                      {step.title}
                    </motion.p>
                    <motion.p 
                      className="text-xs text-gray-500"
                      animate={{
                        opacity: step.number === currentStep ? [0.7, 1, 0.7] : 1
                      }}
                      transition={{
                        opacity: { duration: 2, repeat: step.number === currentStep ? Infinity : 0, repeatType: "reverse" }
                      }}
                    >
                      {step.number < currentStep 
                        ? 'Completed' 
                        : step.number === currentStep 
                        ? 'Current step' 
                        : 'Upcoming'
                      }
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div 
              className="mt-8 p-4 bg-primary-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <motion.svg 
                  className="w-5 h-5 text-primary-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </motion.svg>
                <motion.p 
                  className="text-sm text-primary-800 font-medium"
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  Take your time
                </motion.p>
              </div>
              <p className="text-xs text-primary-700 mt-1">
                Complete each step carefully for the best personalized recommendations.
              </p>
            </motion.div>

            {/* Estimated Time */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.p 
                className="text-xs text-gray-500"
                key={currentStep}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Estimated time: {Math.max(1, 8 - currentStep + 1)} minutes remaining
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 ml-80">
          {/* Step Content */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AnimatePresence mode="wait">
              {CurrentStepComponent && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                    scale: { duration: 0.3 }
                  }}
                >
                  <CurrentStepComponent />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;