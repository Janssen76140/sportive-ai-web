import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import { ALLERGIES_LIST } from '../../types/onboarding.ts';

const Step2Health: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.height && data.weight) {
      nextStep();
    }
  };

  const handleAllergyToggle = (allergy: string) => {
    if (allergy === 'None') {
      updateData({ allergies: data.allergies.includes('None') ? [] : ['None'] });
    } else {
      const currentAllergies = data.allergies.filter(a => a !== 'None');
      if (currentAllergies.includes(allergy)) {
        updateData({ allergies: currentAllergies.filter(a => a !== allergy) });
      } else {
        updateData({ allergies: [...currentAllergies, allergy] });
      }
    }
  };



  const handleMedicalHistoryToggle = (condition: string) => {
    const currentHistory = Array.isArray(data.medicalHistory) ? data.medicalHistory : [];
    
    if (condition === 'None') {
      updateData({ medicalHistory: currentHistory.includes('None') ? [] : ['None'] });
    } else {
      const filteredHistory = currentHistory.filter(c => c !== 'None');
      if (filteredHistory.includes(condition)) {
        updateData({ medicalHistory: filteredHistory.filter(c => c !== condition) });
      } else {
        updateData({ medicalHistory: [...filteredHistory, condition] });
      }
    }
  };



  return (
    <div className="relative">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Header with glassmorphism effect */}
        <div className="mb-10 text-center">
          <div className="inline-block backdrop-blur-md bg-primary-500/10 border border-primary-500/20 rounded-2xl px-6 py-3 mb-6">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Step 2 of 6</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Health & Medical Information
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            These health details help us ensure safe and appropriate supplement recommendations 
            tailored to your child's physical needs and medical history.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Height & Weight */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Physical Measurements
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Height and weight help us calculate appropriate dosages and identify the best supplements 
              for your child's body composition and growth stage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Height */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Height *
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={data.height}
                    onChange={(e) => updateData({ height: e.target.value })}
                    className="flex-1 px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                    placeholder="Enter height in feet"
                    required
                  />
                  <div className="px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl text-gray-800 font-medium">
                    ft
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Weight *
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={data.weight}
                    onChange={(e) => updateData({ weight: e.target.value })}
                    className="flex-1 px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                    placeholder="Enter weight in pounds"
                    required
                  />
                  <div className="px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl text-gray-800 font-medium">
                    lbs
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              Food Allergies & Restrictions
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Critical for safety - we'll exclude any supplements containing allergens that could 
              harm your child. Select all that apply.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              {ALLERGIES_LIST.map((allergy) => (
                <label
                  key={allergy}
                  className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    data.allergies.includes(allergy)
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.allergies.includes(allergy)}
                    onChange={() => handleAllergyToggle(allergy)}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <span className="font-medium text-sm text-gray-800">{allergy}</span>
                    {data.allergies.includes(allergy) && (
                      <div className="mt-1">
                        <div className="w-4 h-4 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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

          {/* Medical History */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              Medical History
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Select any relevant medical conditions that might affect supplement recommendations. Select all that apply.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                'None',
                'Asthma',
                'Knee surgery',
                'Other'
              ].map((condition) => (
                <label
                  key={condition}
                  className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    (Array.isArray(data.medicalHistory) ? data.medicalHistory : []).includes(condition)
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(Array.isArray(data.medicalHistory) ? data.medicalHistory : []).includes(condition)}
                    onChange={() => handleMedicalHistoryToggle(condition)}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <span className="font-medium text-sm text-gray-800">{condition}</span>
                    {(Array.isArray(data.medicalHistory) ? data.medicalHistory : []).includes(condition) && (
                      <div className="mt-1">
                        <div className="w-4 h-4 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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

          {/* Handedness */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              Dominant Hand *
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Handedness can relate to coordination and motor skill development in sports performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'Right-handed', label: 'Right-handed' },
                { value: 'Left-handed', label: 'Left-handed' },
                { value: 'Ambidextrous', label: 'Ambidextrous' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    data.handedness === option.value
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name="handedness"
                    value={option.value}
                    checked={data.handedness === option.value}
                    onChange={(e) => updateData({ handedness: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <span className="font-semibold text-lg text-gray-800">{option.label}</span>
                    {data.handedness === option.value && (
                      <div className="mt-2">
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
              disabled={!data.height || !data.weight || !data.handedness}
            >
              <span className="flex items-center">
                Continue to Training Information
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

export default Step2Health;