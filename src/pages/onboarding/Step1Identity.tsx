import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import { SPORTS_LIST } from '../../types/onboarding.ts';

const Step1Identity: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.firstName && data.lastName && data.ageGroup && data.gender && data.primarySport) {
      nextStep();
    }
  };

  // Get available sports for secondary sport (excluding primary sport)
  const getAvailableSecondarySports = () => {
    return SPORTS_LIST.filter(sport => sport !== data.primarySport);
  };

  return (
    <div className="relative">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Header with glassmorphism effect */}
        <div className="mb-10 text-center">
          <div className="inline-block backdrop-blur-md bg-primary-500/10 border border-primary-500/20 rounded-2xl px-6 py-3 mb-6">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Step 1 of 6</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Let's start with your child's basic information
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            This information helps us personalize nutrition recommendations based on your child's age, 
            sport, and gender-specific nutritional needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Name Fields */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  First Name *
                </label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => updateData({ firstName: e.target.value })}
                  className="w-full px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                  placeholder="Enter your child's first name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => updateData({ lastName: e.target.value })}
                  className="w-full px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                  placeholder="Enter your child's last name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Age Group */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l6-6" />
                </svg>
              </div>
              Age Group *
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Age groups help us determine appropriate supplement dosages and nutritional requirements 
              for your child's development stage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['6–9', '10–13', '14–18'].map((age) => (
                <label
                  key={age}
                  className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    data.ageGroup === age
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name="ageGroup"
                    value={age}
                    checked={data.ageGroup === age}
                    onChange={(e) => updateData({ ageGroup: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <span className="font-semibold text-lg text-gray-800">{age} years old</span>
                    {data.ageGroup === age && (
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

          {/* Gender */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              Gender *
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl">
              Gender-specific recommendations ensure optimal nutrition for your child's physiological needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other / Prefer not to say' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    data.gender === option.value
                      ? 'border-primary-500 bg-primary-500/20 backdrop-blur-sm shadow-lg'
                      : 'border-gray-300/80 bg-white/70 backdrop-blur-sm hover:border-gray-400/80 hover:bg-white/80 shadow-sm'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={data.gender === option.value}
                    onChange={(e) => updateData({ gender: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <span className="font-semibold text-lg text-gray-800">{option.label}</span>
                    {data.gender === option.value && (
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

          {/* Sports Selection */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Sports Information
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl p-3">
              Each sport has unique nutritional demands. We'll tailor recommendations based on the 
              energy systems and physical demands of your child's sports activities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Sport */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Primary Sport *
                </label>
                <select
                  value={data.primarySport}
                  onChange={(e) => {
                    const newPrimarySport = e.target.value;
                    updateData({ 
                      primarySport: newPrimarySport,
                      // Reset secondary sport if it becomes the same as primary
                      secondarySport: data.secondarySport === newPrimarySport ? '' : data.secondarySport
                    });
                  }}
                  className="w-full px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 appearance-none shadow-sm"
                  required
                >
                  <option value="">Select your child's primary sport</option>
                  {SPORTS_LIST.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              {/* Secondary Sport */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Secondary Sport (Optional)
                </label>
                <select
                  value={data.secondarySport}
                  onChange={(e) => updateData({ secondarySport: e.target.value })}
                  className="w-full px-4 py-4 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 appearance-none shadow-sm"
                  disabled={!data.primarySport}
                >
                  <option value="">
                    {!data.primarySport ? 'Select primary sport first' : 'Select secondary sport (optional)'}
                  </option>
                  {getAvailableSecondarySports().map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="group relative px-12 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-2xl"
              disabled={!data.firstName || !data.lastName || !data.ageGroup || !data.gender || !data.primarySport}
            >
              <span className="flex items-center">
                Continue to Health Information
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

export default Step1Identity;