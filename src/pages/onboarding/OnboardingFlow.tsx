import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import Step1Identity from './Step1Identity.tsx';
import Step2Health from './Step2Health.tsx';
import Step3Training from './Step3Training.tsx';
import Step4Account from './Step4Account.tsx';
import Step4VideoIntro from './Step4VideoIntro.tsx';
import Step5AIQuestionnaire from './Step5AIQuestionnaire.tsx';
import Step6Summary from './Step6Summary.tsx';
import Step7Loading from './Step7Loading.tsx';
import Step8Results from './Step8Results.tsx';

const OnboardingFlow: React.FC = () => {
  const { currentStep, data } = useOnboarding();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const steps = [
    { 
      number: 1, 
      title: 'Identity & Sport', 
      component: Step1Identity,
      headerTitle: "LET'S GET STARTED",
      headerSubtitle: "Tell us about your child to personalize their nutrition recommendations"
    },
    { 
      number: 2, 
      title: 'Health & Medical', 
      component: Step2Health,
      headerTitle: "HEALTH INFORMATION",
      headerSubtitle: "Help us ensure safe and appropriate recommendations for your child"
    },
    { 
      number: 3, 
      title: 'Training & Habits', 
      component: Step3Training,
      headerTitle: "TRAINING INFORMATION",
      headerSubtitle: "Tell us about your child's training routine and experience level"
    },
    { 
      number: 4, 
      title: 'Account Setup', 
      component: Step4Account,
      headerTitle: "CREATE YOUR ACCOUNT",
      headerSubtitle: "Set up your account to access personalized recommendations and track progress"
    },
    { 
      number: 5, 
      title: 'Mobile Preview', 
      component: Step4VideoIntro,
      headerTitle: "MOBILE APP PREVIEW",
      headerSubtitle: "Get a sneak peek at our upcoming mobile application"
    },
    { 
      number: 6, 
      title: 'AI Questionnaire', 
      component: Step5AIQuestionnaire,
      headerTitle: "AI-POWERED PERSONALIZATION",
      headerSubtitle: "Final details to create personalized supplement recommendations"
    },
    { 
      number: 7, 
      title: 'Summary & Confirmation', 
      component: Step6Summary,
      headerTitle: `${data.firstName} ${data.lastName}`.toUpperCase(),
      headerSubtitle: "Athlete Profile Summary"
    },
    { 
      number: 8, 
      title: 'AI Processing', 
      component: Step7Loading,
      headerTitle: "AI IS GENERATING YOUR RECOMMENDATIONS",
      headerSubtitle: "Please wait while our AI analyzes your profile and creates personalized supplement recommendations"
    },
    { 
      number: 9, 
      title: 'Your Results', 
      component: Step8Results,
      headerTitle: "YOUR PERSONALIZED RESULTS",
      headerSubtitle: "Based on your profile, our AI has generated personalized supplement recommendations"
    },
  ];

  const CurrentStepComponent = steps[currentStep - 1]?.component;
  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 relative">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800 relative z-20">
        <div className="w-full px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center flex-1">
              <img 
                src="/assets/logo-white.png" 
                alt="SportiveAI" 
                className="h-14 w-auto mr-12"
              />
              <div className="border-l border-gray-700 pl-12 h-16 flex flex-col justify-center">
                <h1 className="text-white text-3xl font-bold tracking-wider">{currentStepData?.headerTitle || "LET'S GET STARTED"}</h1>
                <p className="text-gray-300 text-base mt-1">{currentStepData?.headerSubtitle || "Tell us about your child to personalize their nutrition recommendations"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={handleLoginClick}
                className="p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <img 
                  src="/assets/login-icon.png" 
                  alt="Login" 
                  className="h-16 w-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-80 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/wallpaper2.jpeg')" }}
      />
      
      {/* Layout container with flex */}
      <div className="flex min-h-[calc(100vh-6rem)] relative z-10">
        
        {/* Sticky Progress Bar - Left Side */}
        <div className="fixed top-32 left-8 w-72 h-[calc(100vh-12rem)] bg-black rounded-2xl shadow-2xl z-10">
          <div className="p-5 h-full flex flex-col">
            
            {/* Progress Header */}
            <div className="mb-6">
              <h2 className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
                YOUR PROGRESS
              </h2>
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
              <p className="text-gray-500 text-xs mt-2">
                {currentStep} of {steps.length} steps completed
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-1 flex-1">
              {steps.map((step) => (
                <div 
                  key={step.number} 
                  className="flex items-center space-x-3 py-1.5"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.number < currentStep
                      ? 'bg-primary-500 text-white'
                      : step.number === currentStep
                      ? 'bg-primary-500 text-white ring-2 ring-primary-500 ring-offset-2 ring-offset-black'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}>
                    {step.number < currentStep ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-medium ${
                      step.number <= currentStep ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    {step.number === currentStep && (
                      <p className="text-[10px] text-gray-600 mt-0.5">
                        Current step
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-3 bg-green-950/50 rounded-lg border border-green-900/50">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-green-500 font-medium">
                  Take your time
                </p>
              </div>
              <p className="text-[10px] text-green-400 leading-relaxed">
                Complete each step carefully for the best personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-80 flex items-center justify-center">
          {/* Step Content */}
          <main className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
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