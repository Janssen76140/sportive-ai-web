import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import { GOALS_LIST, TASTE_PREFERENCES } from '../../types/onboarding.ts';

const Step5AIQuestionnaire: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useOnboarding();

  const [customDietOther, setCustomDietOther] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.goals.length > 0) {
      nextStep();
    }
  };

  const handleGoalToggle = (goal: string) => {
    if (data.goals.includes(goal)) {
      updateData({ goals: data.goals.filter(g => g !== goal) });
    } else {
      updateData({ goals: [...data.goals, goal] });
    }
  };



  const handleTasteToggle = (taste: string) => {
    if (data.tastePreferences.includes(taste)) {
      updateData({ tastePreferences: data.tastePreferences.filter(t => t !== taste) });
    } else {
      updateData({ tastePreferences: [...data.tastePreferences, taste] });
    }
  };

  const handleDietTypeChange = (dietType: string) => {
    updateData({ dietType: dietType as any });
    if (dietType !== 'other') {
      updateData({ dietTypeOther: '' });
      setCustomDietOther('');
    }
  };

  const addCustomDiet = () => {
    const trimmedDiet = customDietOther.trim();
    if (trimmedDiet) {
      updateData({ dietTypeOther: trimmedDiet });
      setCustomDietOther('');
    }
  };

  const handleCustomDietKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomDiet();
    }
  };

  const dietOptions = [
    { value: 'none', label: 'No specific diet', description: 'Regular balanced diet' },
    { value: 'vegetarian', label: 'Vegetarian', description: 'No meat, fish allowed' },
    { value: 'vegan', label: 'Vegan', description: 'No animal products' },
    { value: 'gluten-free', label: 'Gluten-Free', description: 'No gluten-containing foods' },
    { value: 'other', label: 'Other', description: 'Specify custom diet' }
  ];

  return (
    <div className="relative">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Header with glassmorphism effect */}
        <div className="mb-10 text-center">
          <div className="inline-block backdrop-blur-md bg-primary-500/10 border border-primary-500/20 rounded-2xl px-6 py-3 mb-6">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Step 5 of 6</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            AI-Powered Personalization
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            These final details help our AI create the most accurate and personalized supplement 
            recommendations for your child's unique needs and preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Fatigue Level */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Current Fatigue Level
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              How often does your child feel tired or fatigued after training? This helps us recommend 
              energy and recovery supplements.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>No fatigue</span>
                <span>Extreme fatigue</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={data.fatigueLevel}
                onChange={(e) => updateData({ fatigueLevel: parseInt(e.target.value) })}
                className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="inline-block px-6 py-3 bg-primary-500 text-white rounded-full font-semibold text-lg">
                  Level {data.fatigueLevel}/10
                  {data.fatigueLevel <= 2 && ' - Minimal fatigue'}
                  {data.fatigueLevel >= 3 && data.fatigueLevel <= 5 && ' - Moderate fatigue'}
                  {data.fatigueLevel >= 6 && data.fatigueLevel <= 8 && ' - High fatigue'}
                  {data.fatigueLevel >= 9 && ' - Extreme fatigue'}
                </span>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              Primary Goals *
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              What are your main goals for your child's athletic development? Select all that apply.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {GOALS_LIST.map((goal) => (
                <label
                  key={goal}
                  className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    data.goals.includes(goal)
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.goals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <span className="font-medium text-sm text-gray-800">{goal}</span>
                    {data.goals.includes(goal) && (
                      <div className="mt-2">
                        <div className="w-5 h-5 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
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

          {/* Diet Type */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9" />
                </svg>
              </div>
              Dietary Preferences
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Does your child follow any specific diet? This ensures supplement recommendations are compatible.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dietOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    data.dietType === option.value
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name="dietType"
                    value={option.value}
                    checked={data.dietType === option.value}
                    onChange={(e) => handleDietTypeChange(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <span className="font-semibold text-base text-gray-800 block mb-1">{option.label}</span>
                    <span className="text-xs text-gray-600">{option.description}</span>
                    {data.dietType === option.value && (
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

            {/* Custom Diet Input */}
            {data.dietType === 'other' && (
              <div className="mt-6 flex gap-3">
                <input
                  type="text"
                  value={data.dietTypeOther || customDietOther}
                  onChange={(e) => {
                    if (data.dietTypeOther) {
                      updateData({ dietTypeOther: e.target.value });
                    } else {
                      setCustomDietOther(e.target.value);
                    }
                  }}
                  onKeyPress={handleCustomDietKeyPress}
                  className="flex-1 px-4 py-3 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                  placeholder="Specify diet type..."
                />
                {!data.dietTypeOther && customDietOther && (
                  <button
                    type="button"
                    onClick={addCustomDiet}
                    className="px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors duration-300 shadow-sm"
                  >
                    Save
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Injury History */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              Injury History (Optional)
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Any past or recurring injuries? This helps us recommend supplements for injury prevention and recovery.
            </p>
            
            <textarea
              value={data.injuryHistory}
              onChange={(e) => updateData({ injuryHistory: e.target.value })}
              rows={4}
              className="w-full px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm resize-none"
              placeholder="Describe any past injuries, recurring issues, or areas of concern..."
            />
          </div>

          {/* Taste Preferences */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              Flavor Preferences
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              What flavors does your child enjoy? This helps us recommend supplements they'll actually want to take.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TASTE_PREFERENCES.map((taste) => (
                <label
                  key={taste}
                  className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    data.tastePreferences.includes(taste)
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.tastePreferences.includes(taste)}
                    onChange={() => handleTasteToggle(taste)}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <span className="font-medium text-sm text-gray-800">{taste}</span>
                    {data.tastePreferences.includes(taste) && (
                      <div className="mt-2">
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
              disabled={data.goals.length === 0}
            >
              <span className="flex items-center">
                Generate Recommendations
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

export default Step5AIQuestionnaire;