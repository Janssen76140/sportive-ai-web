import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import { GOALS_LIST, TASTE_PREFERENCES } from '../../types/onboarding.ts';

const Step5AIQuestionnaire: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [customDietOther, setCustomDietOther] = useState('');
  const [showCelebration, setShowCelebration] = useState('');
  const [showAIGuidance, setShowAIGuidance] = useState<{[key: string]: boolean}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.goals.length > 0) {
      setShowCelebration('step-complete');
      setTimeout(() => {
        nextStep();
      }, 800);
    }
  };

  const handleFieldUpdate = (field: string, value: any) => {
    setShowCelebration(field);
    setTimeout(() => setShowCelebration(''), 500);
  };

  const handleGoalToggle = (goal: string) => {
    if (data.goals.includes(goal)) {
      updateData({ goals: data.goals.filter(g => g !== goal) });
    } else {
      updateData({ goals: [...data.goals, goal] });
    }
    handleFieldUpdate('goals', goal);
  };

  const handleTasteToggle = (taste: string) => {
    if (data.tastePreferences.includes(taste)) {
      updateData({ tastePreferences: data.tastePreferences.filter(t => t !== taste) });
    } else {
      updateData({ tastePreferences: [...data.tastePreferences, taste] });
    }
    handleFieldUpdate('tastePreferences', taste);
  };

  const handleDietTypeChange = (dietType: string) => {
    updateData({ dietType: dietType as any });
    if (dietType !== 'other') {
      updateData({ dietTypeOther: '' });
      setCustomDietOther('');
    }
    handleFieldUpdate('dietType', dietType);
  };

  const addCustomDiet = () => {
    const trimmedDiet = customDietOther.trim();
    if (trimmedDiet) {
      updateData({ dietTypeOther: trimmedDiet });
      setCustomDietOther('');
      handleFieldUpdate('dietTypeOther', trimmedDiet);
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-4xl mx-auto"
    >

      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/70 border border-white/30 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fatigue Level */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Current Fatigue Level
            </label>
            <p className="text-sm text-gray-600 mb-4">
              How often does your child feel tired after training?
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>No fatigue</span>
                <span>Extreme fatigue</span>
              </div>
              <div className="relative">
                <motion.input
                  type="range"
                  min="0"
                  max="10"
                  value={data.fatigueLevel}
                  onChange={(e) => {
                    updateData({ fatigueLevel: parseInt(e.target.value) });
                    handleFieldUpdate('fatigueLevel', e.target.value);
                  }}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <motion.div 
                className="text-center"
                key={data.fatigueLevel}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg font-medium text-sm">
                  Level {data.fatigueLevel}/10
                  {data.fatigueLevel <= 2 && ' - Minimal'}
                  {data.fatigueLevel >= 3 && data.fatigueLevel <= 5 && ' - Moderate'}
                  {data.fatigueLevel >= 6 && data.fatigueLevel <= 8 && ' - High'}
                  {data.fatigueLevel >= 9 && ' - Extreme'}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Primary Goals * (select all that apply)
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {GOALS_LIST.map((goal) => (
                <motion.label
                  key={goal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.goals.includes(goal)
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.goals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm text-gray-800">{goal}</span>
                  <AnimatePresence>
                    {data.goals.includes(goal) && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center"
                      >
                        <motion.svg 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="w-3 h-3 text-white" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Diet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Dietary Preferences
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {dietOptions.map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.dietType === option.value
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
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
                  <span className="font-medium text-sm text-gray-800">{option.label}</span>
                  <AnimatePresence>
                    {data.dietType === option.value && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center"
                      >
                        <motion.svg 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="w-3 h-3 text-white" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.label>
              ))}
            </div>

            {/* Custom Diet Input */}
            <AnimatePresence>
              {data.dietType === 'other' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex gap-3"
                >
                  <div className="relative flex-1">
                    <motion.input
                      type="text"
                      value={data.dietTypeOther || customDietOther}
                      onChange={(e) => {
                        if (data.dietTypeOther) {
                          updateData({ dietTypeOther: e.target.value });
                        } else {
                          setCustomDietOther(e.target.value);
                        }
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomDiet())}
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                      placeholder="Specify diet type..."
                    />
                    {data.dietTypeOther && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute right-3 top-3 text-green-500"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  {!data.dietTypeOther && customDietOther && (
                    <motion.button
                      type="button"
                      onClick={addCustomDiet}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors duration-200"
                    >
                      Save
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Injury History */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Injury History (Optional)
            </label>
            <div className="relative">
              <motion.textarea
                value={data.injuryHistory}
                onChange={(e) => {
                  updateData({ injuryHistory: e.target.value });
                  handleFieldUpdate('injuryHistory', e.target.value);
                }}
                whileFocus={{ scale: 1.02 }}
                rows={3}
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500 resize-none"
                placeholder="Describe any past injuries or areas of concern..."
              />
              {data.injuryHistory && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-3 top-3 text-green-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </div>
          </div>

          {/* Taste Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Flavor Preferences (select all that apply)
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TASTE_PREFERENCES.map((taste) => (
                <motion.label
                  key={taste}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.tastePreferences.includes(taste)
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.tastePreferences.includes(taste)}
                    onChange={() => handleTasteToggle(taste)}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm text-gray-800">{taste}</span>
                  <AnimatePresence>
                    {data.tastePreferences.includes(taste) && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center"
                      >
                        <motion.svg 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="w-3 h-3 text-white" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Smart AI Guidance */}
          <AnimatePresence>
            {Object.entries(showAIGuidance).map(([key, show]) => show && (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4"
              >
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-indigo-800 font-medium mb-1">AI Guidance</p>
                    <p className="text-sm text-indigo-700">
                      {key === 'highFatigue' && '😴 High fatigue detected - recovery and sleep support will be our primary focus'}
                      {key === 'lowFatigue' && '🚀 Low fatigue shows great recovery - we can focus on performance enhancement'}
                      {key === 'basicRecovery' && '🏃‍♀️ Basic + Recovery combination - balanced foundation approach will be recommended'}
                      {key === 'endurancePerformance' && '💪 Endurance + Performance - advanced athlete profile detected, premium stack coming!'}
                      {key === 'veganGuidance' && '🌱 Vegan athlete - plant-based protein and B12 supplementation will be prioritized'}
                      {key === 'vegetarianGuidance' && '🥛 Vegetarian diet - iron and complete protein profiles will be optimized'}
                      {key === 'vanillaOnly' && '🍦 Vanilla preference - classic flavors with proven palatability will be selected'}
                      {key === 'diverseTastes' && '🎨 Diverse taste preferences - variety packs and rotating flavors will keep it interesting!'}
                      {key === 'injuryHistory' && '🩹 Injury history noted - anti-inflammatory and joint support will be integrated'}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAIGuidance(prev => ({ ...prev, [key]: false }))}
                    className="text-indigo-400 hover:text-indigo-600 ml-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Real-time AI Preview */}
          {(data.goals.length > 0 || data.fatigueLevel !== 5 || data.dietType || data.tastePreferences.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-xl p-4"
            >
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-sm font-medium text-green-800">AI Analysis Preview</span>
              </div>
              <p className="text-sm text-green-700">
                {data.goals.length > 0 && data.fatigueLevel <= 3
                  ? `Goals: ${data.goals.join(', ')} | Low fatigue detected - Optimizing for performance enhancement! 🚀`
                  : data.goals.length > 0 && data.fatigueLevel >= 7
                  ? `Goals: ${data.goals.join(', ')} | High fatigue detected - Prioritizing recovery support 🛡️`
                  : data.goals.length > 0
                  ? `Goals: ${data.goals.join(', ')} | Balanced approach for optimal results 💪`
                  : data.dietType && data.dietType !== 'none'
                  ? `Dietary preference: ${data.dietType} - Adapting supplement recommendations 🥗`
                  : data.tastePreferences.length > 0
                  ? `Flavor preferences: ${data.tastePreferences.join(', ')} - Personalizing taste profile 😋`
                  : 'AI is analyzing your preferences for personalized recommendations! 🤖'
                }
              </p>
            </motion.div>
          )}

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
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              disabled={data.goals.length === 0}
            >
              <span className="flex items-center relative z-10">
                {showCelebration === 'step-complete' ? 'Analysis complete! Review time...' : 'Review Summary'}
                {showCelebration === 'step-complete' ? (
                  <motion.svg 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
              
              {/* Celebration confetti */}
              {showCelebration === 'step-complete' && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        y: 0, 
                        x: 0, 
                        opacity: 1,
                        rotate: 0 
                      }}
                      animate={{ 
                        y: -30 + Math.random() * -20, 
                        x: (Math.random() - 0.5) * 60, 
                        opacity: 0,
                        rotate: Math.random() * 360 
                      }}
                      transition={{ 
                        duration: 0.6,
                        delay: i * 0.1 
                      }}
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
                      style={{
                        backgroundColor: ['#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f87171'][i % 5]
                      }}
                    />
                  ))}
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Step5AIQuestionnaire;