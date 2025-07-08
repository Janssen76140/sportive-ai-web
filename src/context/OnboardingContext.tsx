import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingData } from '../types/onboarding.ts';

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const initialData: OnboardingData = {
  firstName: '',
  lastName: '',
  ageGroup: '',
  gender: '',
  primarySport: '',
  secondarySport: '',
  height: '',
  heightUnit: 'ft',
  weight: '',
  weightUnit: 'lbs',
  allergies: [],
  medicalHistory: [],
  handedness: '',
  trainingFrequency: '',
  trainingIntensity: '',
  coachingSessions: '',
  experienceYears: '',
  academicLevel: '',
  sportsAcademy: '',
  secondaryTrainingFrequency: '',
  secondaryTrainingIntensity: '',
  secondaryCoachingSessions: '',
  secondaryExperienceYears: '',
  parentEmail: '',
  password: '',
  confirmPassword: '',
  fatigueLevel: 5,
  goals: [],
  dietType: '',
  dietTypeOther: '',
  injuryHistory: '',
  tastePreferences: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <OnboardingContext.Provider value={{
      data,
      updateData,
      currentStep,
      setCurrentStep,
      nextStep,
      prevStep
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};