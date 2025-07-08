import React from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step6Summary: React.FC = () => {
  const { data, nextStep, prevStep } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep(); // Aller vers Step7Loading
  };

  const getDietTypeDisplay = () => {
    if (data.dietType === 'other' && data.dietTypeOther) {
      return data.dietTypeOther;
    }
    const dietLabels: { [key: string]: string } = {
      'none': 'No specific diet',
      'vegetarian': 'Vegetarian',
      'vegan': 'Vegan',
      'gluten-free': 'Gluten-Free'
    };
    return dietLabels[data.dietType] || data.dietType;
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Compact Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Summary & Confirmation
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please review all the information below to ensure accuracy
        </p>
      </div>

      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/50 border border-white/30 rounded-3xl p-6 md:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Profile Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Summary</h3>
            
            {/* Athlete Info */}
            <div className="bg-white/50 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Athlete Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <span className="text-xs text-gray-600 block">Name</span>
                  <p className="font-medium text-gray-800">{data.firstName} {data.lastName}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Age</span>
                  <p className="font-medium text-gray-800">{data.ageGroup}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Gender</span>
                  <p className="font-medium text-gray-800">{data.gender}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Academic</span>
                  <p className="font-medium text-gray-800">{data.academicLevel}</p>
                </div>
              </div>
            </div>

            {/* Sports Info */}
            <div className="bg-white/50 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Sports & Training</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <span className="text-xs text-gray-600 block">Primary Sport</span>
                  <p className="font-medium text-gray-800">{data.primarySport}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Frequency</span>
                  <p className="font-medium text-gray-800">{data.trainingFrequency}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Intensity</span>
                  <p className="font-medium text-gray-800">{data.trainingIntensity}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Experience</span>
                  <p className="font-medium text-gray-800">{data.experienceYears}</p>
                </div>
              </div>
              {data.secondarySport && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-600 block mb-2">Secondary Sport</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <span className="text-xs text-gray-600 block">Sport</span>
                      <p className="font-medium text-gray-800">{data.secondarySport}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-600 block">Frequency</span>
                      <p className="font-medium text-gray-800">{data.secondaryTrainingFrequency}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-600 block">Intensity</span>
                      <p className="font-medium text-gray-800">{data.secondaryTrainingIntensity}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-600 block">Experience</span>
                      <p className="font-medium text-gray-800">{data.secondaryExperienceYears}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Health Info */}
            <div className="bg-white/50 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Health Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <span className="text-xs text-gray-600 block">Height</span>
                  <p className="font-medium text-gray-800">{data.height} ft</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Weight</span>
                  <p className="font-medium text-gray-800">{data.weight} lbs</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Handedness</span>
                  <p className="font-medium text-gray-800">{data.handedness}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Fatigue</span>
                  <p className="font-medium text-gray-800">{data.fatigueLevel}/10</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-600 block">Allergies</span>
                  <p className="font-medium text-gray-800">
                    {data.allergies.length > 0 ? data.allergies.join(', ') : 'None'}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block">Diet</span>
                  <p className="font-medium text-gray-800">{getDietTypeDisplay()}</p>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white/50 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Goals</h4>
              <div className="flex flex-wrap gap-2">
                {data.goals.map((goal, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                    {goal}
                  </span>
                ))}
              </div>
              {data.tastePreferences.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs text-gray-600 block mb-1">Taste Preferences</span>
                  <div className="flex flex-wrap gap-1">
                    {data.tastePreferences.map((taste, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {taste}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              className="group px-6 py-3 bg-white/70 border border-gray-300/60 text-gray-700 font-medium rounded-xl hover:border-gray-400/60 hover:bg-white/80 transition-all duration-200"
            >
              <span className="flex items-center">
                <svg className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </span>
            </button>
            
            <button
              type="submit"
              className="group px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
            >
              <span className="flex items-center">
                Generate Recommendations
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default Step6Summary;