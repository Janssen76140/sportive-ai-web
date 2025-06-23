import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step3Training: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [customAcademy, setCustomAcademy] = useState('');
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation pour sport primaire (requis)
    const primaryValid = data.trainingIntensity && data.experienceYears && data.academicLevel;
    
    // Validation pour sport secondaire (requis si sport secondaire sélectionné)
    const secondaryValid = !data.secondarySport || 
      (data.secondaryTrainingIntensity && data.secondaryExperienceYears);
    
    if (primaryValid && secondaryValid) {
      nextStep();
    }
  };

  const addCustomAcademy = () => {
    const trimmedAcademy = customAcademy.trim();
    if (trimmedAcademy) {
      updateData({ sportsAcademy: trimmedAcademy });
      setCustomAcademy('');
    }
  };

  const handleAcademyKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomAcademy();
    }
  };

  const intensityOptions = [
    { value: 'Low', label: 'Low', description: 'Light training, focus on fun and basics' },
    { value: 'Moderate', label: 'Moderate', description: 'Regular training with skill development' },
    { value: 'High', label: 'High', description: 'Intensive training, competitive level' }
  ];

  const experienceOptions = [
    { value: '<1', label: 'Less than 1 year', description: 'Beginner level' },
    { value: '1-3', label: '1-3 years', description: 'Developing skills' },
    { value: '4-6', label: '4-6 years', description: 'Experienced player' },
    { value: '7', label: '7+ years', description: 'Advanced/Expert level' }
  ];

  const academicOptions = [
    { value: 'primary', label: 'Primary School', description: 'Elementary education' },
    { value: 'middle', label: 'Middle School', description: 'Junior high education' },
    { value: 'high', label: 'High School', description: 'Senior high education' },
    { value: 'other', label: 'Other', description: 'Alternative education' }
  ];

  // Options pour Training Frequency
  const frequencyOptions = [
    { value: '1-2', label: '1-2 sessions', description: 'Light training schedule' },
    { value: '3-4', label: '3-4 sessions', description: 'Regular training schedule' },
    { value: '5-7', label: '5-7 sessions', description: 'Intensive training schedule' }
  ];

  // Helpers pour les champs selon l'onglet actif
  const getCurrentData = () => {
    if (activeTab === 'primary') {
      return {
        trainingFrequency: data.trainingFrequency,
        trainingIntensity: data.trainingIntensity,
        coachingSessions: data.coachingSessions,
        experienceYears: data.experienceYears
      };
    } else {
      return {
        trainingFrequency: data.secondaryTrainingFrequency,
        trainingIntensity: data.secondaryTrainingIntensity,
        coachingSessions: data.secondaryCoachingSessions,
        experienceYears: data.secondaryExperienceYears
      };
    }
  };

  const updateCurrentData = (updates: any) => {
    if (activeTab === 'primary') {
      updateData(updates);
    } else {
      const secondaryUpdates: any = {};
      Object.keys(updates).forEach(key => {
        secondaryUpdates[`secondary${key.charAt(0).toUpperCase() + key.slice(1)}`] = updates[key];
      });
      updateData(secondaryUpdates);
    }
  };

  const currentData = getCurrentData();
  const currentSport = activeTab === 'primary' ? data.primarySport : data.secondarySport;

  return (
    <div className="relative">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Header with glassmorphism effect */}
        <div className="mb-10 text-center">
          <div className="inline-block backdrop-blur-md bg-primary-500/10 border border-primary-500/20 rounded-2xl px-6 py-3 mb-6">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Step 3 of 6</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Training & Habits
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Understanding your child's training routine and experience helps us recommend supplements 
            that support their specific performance and recovery needs.
          </p>
        </div>

        {/* Onglets pour Primary/Secondary Sport */}
        {data.secondarySport && (
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-2 mb-8">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('primary')}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'primary'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {data.primarySport} (Primary)
                </div>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('secondary')}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'secondary'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  {data.secondarySport} (Secondary)
                </div>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Training Frequency & Coaching */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Training Schedule {data.secondarySport && `(${currentSport})`}
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Training frequency and coaching sessions help us understand the intensity and structure 
              of your child's athletic program.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Training Frequency */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Training Sessions per Week *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {frequencyOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        currentData.trainingFrequency === option.value
                          ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                          : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`trainingFrequency_${activeTab}`}
                        value={option.value}
                        checked={currentData.trainingFrequency === option.value}
                        onChange={(e) => updateCurrentData({ trainingFrequency: e.target.value as any })}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <span className="font-semibold text-lg text-gray-800 block mb-2">{option.label}</span>
                        <span className="text-sm text-gray-600">{option.description}</span>
                        {currentData.trainingFrequency === option.value && (
                          <div className="mt-3">
                            <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Coaching Sessions */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Coaching Sessions per Week
                </label>
                <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: '0', label: '0 sessions', description: 'Self-directed training' },
                    { value: '1-2', label: '1-2 sessions', description: 'Regular coaching' },
                    { value: '3', label: '3+ sessions', description: 'Intensive coaching' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        currentData.coachingSessions === option.value
                          ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                          : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`coachingSessions_${activeTab}`}
                        value={option.value}
                        checked={currentData.coachingSessions === option.value}
                        onChange={(e) => updateCurrentData({ coachingSessions: e.target.value as any })}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <span className="font-semibold text-lg text-gray-800 block mb-2">{option.label}</span>
                        <span className="text-sm text-gray-600">{option.description}</span>
                        {currentData.coachingSessions === option.value && (
                          <div className="mt-3">
                            <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Training Intensity */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Training Intensity * {data.secondarySport && `(${currentSport})`}
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Training intensity affects nutritional and recovery needs. Higher intensity requires 
              more targeted supplementation for performance and recovery.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {intensityOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    currentData.trainingIntensity === option.value
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name={`trainingIntensity_${activeTab}`}
                    value={option.value}
                    checked={currentData.trainingIntensity === option.value}
                    onChange={(e) => updateCurrentData({ trainingIntensity: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <span className="font-semibold text-lg text-gray-800 block mb-2">{option.label}</span>
                    <span className="text-sm text-gray-600">{option.description}</span>
                    {currentData.trainingIntensity === option.value && (
                      <div className="mt-3">
                        <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              Experience Level * {data.secondarySport && `(${currentSport})`}
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Experience level helps us understand your child's development stage and appropriate 
              supplement complexity for their athletic maturity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {experienceOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    currentData.experienceYears === option.value
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name={`experienceYears_${activeTab}`}
                    value={option.value}
                    checked={currentData.experienceYears === option.value}
                    onChange={(e) => updateCurrentData({ experienceYears: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <span className="font-semibold text-lg text-gray-800 block mb-2">{option.label}</span>
                    <span className="text-xs text-gray-600">{option.description}</span>
                    {currentData.experienceYears === option.value && (
                      <div className="mt-3">
                        <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Academic Level - Only show on primary sport tab or when no secondary sport */}
          {(!data.secondarySport || activeTab === 'primary') && (
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              Academic Level *
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Academic level helps us understand developmental stage and scheduling demands 
              that may affect nutrition and supplement timing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {academicOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    data.academicLevel === option.value
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name="academicLevel"
                    value={option.value}
                    checked={data.academicLevel === option.value}
                    onChange={(e) => updateData({ academicLevel: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <span className="font-semibold text-lg text-gray-800 block mb-2">{option.label}</span>
                    <span className="text-xs text-gray-600">{option.description}</span>
                    {data.academicLevel === option.value && (
                      <div className="mt-3">
                        <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
          )}

          {/* Sports Academy - Only show on primary sport tab or when no secondary sport */}
          {(!data.secondarySport || activeTab === 'primary') && (
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              Sports Academy (Optional)
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              If your child trains at a specific sports academy, we can coordinate with them 
              for optimal nutrition and supplement programs.
            </p>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={data.sportsAcademy || customAcademy}
                onChange={(e) => {
                  if (data.sportsAcademy) {
                    updateData({ sportsAcademy: e.target.value });
                  } else {
                    setCustomAcademy(e.target.value);
                  }
                }}
                onKeyPress={handleAcademyKeyPress}
                className="flex-1 px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                placeholder="Enter sports academy name (optional)..."
              />
              {!data.sportsAcademy && customAcademy && (
                <button
                  type="button"
                  onClick={addCustomAcademy}
                  className="px-6 py-4 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors duration-300 shadow-sm"
                >
                  Save
                </button>
              )}
            </div>

            {data.sportsAcademy && (
              <div className="mt-4 p-4 bg-white/30 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">Academy: {data.sportsAcademy}</span>
                  <button
                    type="button"
                    onClick={() => updateData({ sportsAcademy: '' })}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <button
              type="button"
              onClick={prevStep}
              className="group relative px-8 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 text-gray-700 font-bold rounded-2xl hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              <span className="flex items-center">
                <svg className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </span>
            </button>
            
            <button
              type="submit"
              className="group relative px-12 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-2xl"
              disabled={
                !data.trainingIntensity || !data.experienceYears || !data.academicLevel ||
                (!!data.secondarySport && (!data.secondaryTrainingIntensity || !data.secondaryExperienceYears))
              }
            >
              <span className="flex items-center">
                Continue to Account Setup
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3Training;