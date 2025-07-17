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

  const getStatusColor = (value: string, type: string) => {
    // Logic pour déterminer les couleurs selon les valeurs
    if (type === 'intensity') {
      return value === 'High' ? 'text-orange-500' : value === 'Moderate' ? 'text-blue-500' : 'text-green-500';
    }
    if (type === 'fatigue') {
      const level = parseInt(value);
      return level > 6 ? 'text-red-500' : level > 3 ? 'text-orange-500' : 'text-green-500';
    }
    return 'text-green-500'; // Default
  };

  const getStatusText = (value: string, type: string) => {
    if (type === 'intensity') {
      return value === 'High' ? 'High' : value === 'Moderate' ? 'Ideal' : 'Low';
    }
    if (type === 'fatigue') {
      const level = parseInt(value);
      return level > 6 ? 'High' : level > 3 ? 'Moderate' : 'Ideal';
    }
    if (type === 'experience') {
      return value === '7' ? 'Expert' : value === '4-6' ? 'Advanced' : value === '1-3' ? 'Good' : 'Beginner';
    }
    return 'Ideal';
  };

  return (
    <div className="relative max-w-6xl mx-auto">

      {/* Metrics Grid Container */}
      <div className="backdrop-blur-l bg-white/70 border border-white/30 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Info Grid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Basic Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Age Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-2xl font-bold text-gray-900">{data.ageGroup}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Age Group</div>
                <div className="text-sm text-green-500 font-medium mt-1">Active</div>
              </div>
              
              {/* Gender Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">{data.gender === 'Male' ? '♂️' : '♀️'}</div>
                <div className="text-2xl font-bold text-gray-900">{data.gender}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Gender</div>
                <div className="text-sm text-blue-500 font-medium mt-1">Identified</div>
              </div>
              
              {/* Height Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">📏</div>
                <div className="text-2xl font-bold text-gray-900">{data.height}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Height (ft)</div>
                <div className="text-sm text-green-500 font-medium mt-1">Normal</div>
              </div>
              
              {/* Weight Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">⚖️</div>
                <div className="text-2xl font-bold text-gray-900">{data.weight}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Weight (lbs)</div>
                <div className="text-sm text-green-500 font-medium mt-1">Healthy</div>
              </div>
            </div>
          </div>

          {/* Sports & Training Grid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Sports & Training</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Primary Sport Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">
                  {data.primarySport === 'Soccer' && '⚽'}
                  {data.primarySport === 'Basketball' && '🏀'}
                  {data.primarySport === 'Swimming' && '🏊‍♂️'}
                  {data.primarySport === 'Tennis' && '🎾'}
                  {data.primarySport === 'Volleyball' && '🏐'}
                  {data.primarySport === 'Hockey' && '🏑'}
                  {data.primarySport === 'Baseball' && '⚾'}
                  {data.primarySport === 'Running' && '🏃‍♂️'}
                  {data.primarySport === 'Cycling' && '🚴‍♂️'}
                  {data.primarySport === 'Gymnastics' && '🤸‍♂️'}
                  {!['Soccer', 'Basketball', 'Swimming', 'Tennis', 'Volleyball', 'Hockey', 'Baseball', 'Running', 'Cycling', 'Gymnastics'].includes(data.primarySport) && '🏃‍♂️'}
                </div>
                <div className="text-lg font-bold text-gray-900">{data.primarySport}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Primary Sport</div>
                <div className="text-sm text-blue-500 font-medium mt-1">Active</div>
              </div>
              
              {/* Training Frequency Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-2xl font-bold text-gray-900">{data.trainingFrequency}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Frequency</div>
                <div className="text-sm text-green-500 font-medium mt-1">Regular</div>
              </div>
              
              {/* Training Intensity Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">
                  {data.trainingIntensity === 'Low' && '🔥'}
                  {data.trainingIntensity === 'Moderate' && '💪'}
                  {data.trainingIntensity === 'High' && '⚡'}
                </div>
                <div className="text-2xl font-bold text-gray-900">{data.trainingIntensity}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Intensity</div>
                <div className={`text-sm font-medium mt-1 ${getStatusColor(data.trainingIntensity, 'intensity')}`}>
                  {getStatusText(data.trainingIntensity, 'intensity')}
                </div>
              </div>
              
              {/* Experience Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">
                  {data.experienceYears === '<1' && '⭐'}
                  {data.experienceYears === '1-3' && '🏆'}
                  {data.experienceYears === '4-6' && '📈'}
                  {data.experienceYears === '7' && '👑'}
                </div>
                <div className="text-2xl font-bold text-gray-900">{data.experienceYears}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Experience</div>
                <div className="text-sm text-purple-500 font-medium mt-1">
                  {getStatusText(data.experienceYears, 'experience')}
                </div>
              </div>
            </div>
            
            {/* Secondary Sport Row */}
            {data.secondarySport && (
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-4 text-center">Secondary Sport</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-4 shadow-sm text-center">
                    <div className="text-2xl mb-2">
                      {data.secondarySport === 'Soccer' && '⚽'}
                      {data.secondarySport === 'Basketball' && '🏀'}
                      {data.secondarySport === 'Swimming' && '🏊‍♂️'}
                      {data.secondarySport === 'Tennis' && '🎾'}
                      {data.secondarySport === 'Volleyball' && '🏐'}
                      {data.secondarySport === 'Hockey' && '🏑'}
                      {data.secondarySport === 'Baseball' && '⚾'}
                      {data.secondarySport === 'Running' && '🏃‍♂️'}
                      {data.secondarySport === 'Cycling' && '🚴‍♂️'}
                      {data.secondarySport === 'Gymnastics' && '🤸‍♂️'}
                      {!['Soccer', 'Basketball', 'Swimming', 'Tennis', 'Volleyball', 'Hockey', 'Baseball', 'Running', 'Cycling', 'Gymnastics'].includes(data.secondarySport) && '🏃‍♂️'}
                    </div>
                    <div className="text-lg font-bold text-gray-900">{data.secondarySport}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Secondary</div>
                    <div className="text-sm text-gray-500 font-medium mt-1">Optional</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 shadow-sm text-center">
                    <div className="text-2xl mb-2">📅</div>
                    <div className="text-lg font-bold text-gray-900">{data.secondaryTrainingFrequency}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Frequency</div>
                    <div className="text-sm text-gray-500 font-medium mt-1">Secondary</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 shadow-sm text-center">
                    <div className="text-2xl mb-2">
                      {data.secondaryTrainingIntensity === 'Low' && '🔥'}
                      {data.secondaryTrainingIntensity === 'Moderate' && '💪'}
                      {data.secondaryTrainingIntensity === 'High' && '⚡'}
                    </div>
                    <div className="text-lg font-bold text-gray-900">{data.secondaryTrainingIntensity}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Intensity</div>
                    <div className="text-sm text-gray-500 font-medium mt-1">Secondary</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 shadow-sm text-center">
                    <div className="text-2xl mb-2">
                      {data.secondaryExperienceYears === '<1' && '⭐'}
                      {data.secondaryExperienceYears === '1-3' && '🏆'}
                      {data.secondaryExperienceYears === '4-6' && '📈'}
                      {data.secondaryExperienceYears === '7' && '👑'}
                    </div>
                    <div className="text-lg font-bold text-gray-900">{data.secondaryExperienceYears}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Experience</div>
                    <div className="text-sm text-gray-500 font-medium mt-1">Secondary</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Health & Wellness Grid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Health & Wellness</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Handedness Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">
                  {data.handedness === 'Left-handed' && '👈'}
                  {data.handedness === 'Right-handed' && '👉'}
                  {data.handedness === 'Ambidextrous' && '🤲'}
                </div>
                <div className="text-lg font-bold text-gray-900">{data.handedness?.split('-')[0]}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Handedness</div>
                <div className="text-sm text-blue-500 font-medium mt-1">Natural</div>
              </div>
              
              {/* Fatigue Level Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">
                  {data.fatigueLevel <= 3 && '🔋'}
                  {data.fatigueLevel > 3 && data.fatigueLevel <= 6 && '⚡'}
                  {data.fatigueLevel > 6 && '😴'}
                </div>
                <div className="text-2xl font-bold text-gray-900">{data.fatigueLevel}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Fatigue Level</div>
                <div className={`text-sm font-medium mt-1 ${getStatusColor(data.fatigueLevel.toString(), 'fatigue')}`}>
                  {getStatusText(data.fatigueLevel.toString(), 'fatigue')}
                </div>
              </div>
              
              {/* Allergies Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">
                  {data.allergies.length === 0 && '✅'}
                  {data.allergies.includes('Peanuts') && '🥜'}
                  {data.allergies.includes('Lactose') && '🥛'}
                  {data.allergies.includes('Gluten') && '🌾'}
                  {data.allergies.includes('Other') && '🚫'}
                  {data.allergies.length > 0 && !data.allergies.includes('Peanuts') && !data.allergies.includes('Lactose') && !data.allergies.includes('Gluten') && !data.allergies.includes('Other') && '🚫'}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {data.allergies.length === 0 ? 'None' : data.allergies.length.toString()}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Allergies</div>
                <div className={`text-sm font-medium mt-1 ${data.allergies.length === 0 ? 'text-green-500' : 'text-orange-500'}`}>
                  {data.allergies.length === 0 ? 'Clear' : 'Listed'}
                </div>
              </div>
              
              {/* Diet Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">
                  {getDietTypeDisplay() === 'No specific diet' && '🍽️'}
                  {getDietTypeDisplay() === 'Vegetarian' && '🥗'}
                  {getDietTypeDisplay() === 'Vegan' && '🌱'}
                  {getDietTypeDisplay() === 'Gluten-Free' && '🌾'}
                  {!['No specific diet', 'Vegetarian', 'Vegan', 'Gluten-Free'].includes(getDietTypeDisplay()) && '🍎'}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {getDietTypeDisplay().split(' ')[0]}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Diet Type</div>
                <div className="text-sm text-green-500 font-medium mt-1">Healthy</div>
              </div>
              
              {/* Academic Level Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">🎓</div>
                <div className="text-lg font-bold text-gray-900">{data.academicLevel}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Academic</div>
                <div className="text-sm text-purple-500 font-medium mt-1">Student</div>
              </div>
              
              {/* Medical History Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-2">🏥</div>
                <div className="text-lg font-bold text-gray-900">
                  {!data.medicalHistory || data.medicalHistory.length === 0 || data.medicalHistory.includes('None') ? 'None' : data.medicalHistory.join(', ')}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Medical</div>
                <div className={`text-sm font-medium mt-1 ${!data.medicalHistory || data.medicalHistory.length === 0 || data.medicalHistory.includes('None') ? 'text-green-500' : 'text-blue-500'}`}>
                  {!data.medicalHistory || data.medicalHistory.length === 0 || data.medicalHistory.includes('None') ? 'Clear' : 'Noted'}
                </div>
              </div>
            </div>
          </div>

          {/* Goals & Preferences Grid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Goals & Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.goals.map((goal, index) => (
                <div key={index} className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4 shadow-sm text-center border border-primary-200">
                  <div className="text-2xl mb-2">
                    {goal === 'Basic' && '🎯'}
                    {goal === 'Recovery' && '🛡️'}
                    {goal === 'Endurance' && '🏃‍♂️'}
                    {goal === 'Performance' && '🚀'}
                  </div>
                  <div className="text-lg font-bold text-primary-800">{goal}</div>
                  <div className="text-xs text-primary-600 uppercase tracking-wide">Goal</div>
                  <div className="text-sm text-primary-700 font-medium mt-1">Target</div>
                </div>
              ))}
            </div>
            
            {/* Taste Preferences Row */}
            {data.tastePreferences.length > 0 && (
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-4 text-center">Taste Preferences</h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {data.tastePreferences.slice(0, 6).map((taste, index) => (
                    <div key={index} className="bg-green-50 rounded-2xl p-3 shadow-sm text-center border border-green-200">
                      <div className="text-xl mb-1">
                        {taste === 'Vanilla' && '🍦'}
                        {taste === 'Chocolate' && '🍫'}
                        {taste === 'Strawberry' && '🍓'}
                        {taste === 'Banana' && '🍌'}
                        {taste === 'Orange' && '🍊'}
                        {taste === 'Berry' && '🫐'}
                        {taste === 'Tropical' && '🥭'}
                        {taste === 'Mint' && '🌿'}
                        {!['Vanilla', 'Chocolate', 'Strawberry', 'Banana', 'Orange', 'Berry', 'Tropical', 'Mint'].includes(taste) && '🍎'}
                      </div>
                      <div className="text-sm font-medium text-green-800">{taste}</div>
                      <div className="text-xs text-green-600">Preferred</div>
                    </div>
                  ))}
                  {data.tastePreferences.length > 6 && (
                    <div className="bg-green-50 rounded-2xl p-3 shadow-sm text-center border border-green-200">
                      <div className="text-xl mb-1">➕</div>
                      <div className="text-sm font-medium text-green-800">+{data.tastePreferences.length - 6}</div>
                      <div className="text-xs text-green-600">More</div>
                    </div>
                  )}
                </div>
              </div>
            )}
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