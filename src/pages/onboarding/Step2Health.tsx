import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import { ALLERGIES_LIST } from '../../types/onboarding.ts';

const Step2Health: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [showCelebration, setShowCelebration] = useState('');
  const [showHealthTips, setShowHealthTips] = useState<{[key: string]: boolean}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.height && data.weight && data.handedness) {
      setShowCelebration('step-complete');
      setTimeout(() => {
        nextStep();
      }, 800);
    }
  };

  const handleFieldUpdate = (field: string, value: any) => {
    updateData({ [field]: value });
    setShowCelebration(field);
    setTimeout(() => setShowCelebration(''), 500);
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
    setShowCelebration('allergies');
    setTimeout(() => setShowCelebration(''), 500);
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

  // Interactive help tooltips (on demand)
  const showHealthTip = (field: string) => {
    setShowHealthTips(prev => ({ ...prev, [field]: true }));
    setTimeout(() => setShowHealthTips(prev => ({ ...prev, [field]: false })), 6000);
  };


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
          
          {/* Height & Weight - Inline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Height (feet) *
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <motion.input
                    type="number"
                    step="0.1"
                    value={data.height}
                    onChange={(e) => handleFieldUpdate('height', e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                    placeholder="5.5"
                    required
                  />
                  {data.height && (
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
                <div className="px-3 py-3 bg-white/50 border border-gray-300/60 rounded-xl text-gray-600 text-sm">
                  ft
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Weight (pounds) *
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <motion.input
                    type="number"
                    step="0.1"
                    value={data.weight}
                    onChange={(e) => handleFieldUpdate('weight', e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                    placeholder="120"
                    required
                  />
                  {data.weight && (
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
                <div className="px-3 py-3 bg-white/50 border border-gray-300/60 rounded-xl text-gray-600 text-sm">
                  lbs
                </div>
              </div>
            </div>
          </div>

          {/* Allergies - Compact */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <label className="block text-sm font-medium text-gray-800">
                Food Allergies (select all that apply)
              </label>
              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() => showHealthTip('allergyHelp')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-4 h-4 rounded-full bg-gray-300 text-gray-600 text-xs flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                >
                  ?
                </motion.button>
                
                {/* Allergy Help Tooltip */}
                <AnimatePresence>
                  {showHealthTips.allergyHelp && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs"
                    >
                      <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
                      Select any food allergies to ensure safe supplement recommendations. We'll adapt all suggestions to avoid these ingredients.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {ALLERGIES_LIST.map((allergy) => (
                <motion.label
                  key={allergy}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.allergies.includes(allergy)
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.allergies.includes(allergy)}
                    onChange={() => handleAllergyToggle(allergy)}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm text-gray-800">{allergy}</span>
                  <AnimatePresence>
                    {data.allergies.includes(allergy) && (
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

          {/* Medical History - Compact */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Medical History (select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'None',
                'Asthma',
                'Knee surgery',
                'Other'
              ].map((condition) => (
                <motion.label
                  key={condition}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    (Array.isArray(data.medicalHistory) ? data.medicalHistory : []).includes(condition)
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(Array.isArray(data.medicalHistory) ? data.medicalHistory : []).includes(condition)}
                    onChange={() => handleMedicalHistoryToggle(condition)}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm text-gray-800">{condition}</span>
                  <AnimatePresence>
                    {(Array.isArray(data.medicalHistory) ? data.medicalHistory : []).includes(condition) && (
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

          {/* Handedness - Compact */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Dominant Hand *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'Right-handed', label: 'Right' },
                { value: 'Left-handed', label: 'Left' },
                { value: 'Ambidextrous', label: 'Both' }
              ].map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.handedness === option.value
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="radio"
                    name="handedness"
                    value={option.value}
                    checked={data.handedness === option.value}
                    onChange={(e) => handleFieldUpdate('handedness', e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-medium text-gray-800">{option.label}</span>
                  <AnimatePresence>
                    {data.handedness === option.value && (
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



          {/* Real-time Health Preview */}
          {(data.height || data.weight || data.allergies.length > 0 || data.handedness) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4"
            >
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium text-blue-800">Health Profile Preview</span>
              </div>
              <p className="text-sm text-blue-700">
                {data.height && data.weight 
                  ? `SportiveAI is establishing ${data.firstName}’s health profile, matching it with our database of young athletes to built personalized recommendations`
                  : data.height 
                  ? `Height recorded: ${data.height}ft - Add weight to continue profiling 📏`
                  : data.weight
                  ? `Weight recorded: ${data.weight}lbs - Add height for complete physical profile ⚖️`
                  : data.allergies.length > 0
                  ? `Allergy info saved: ${data.allergies.join(', ')} - Ensuring safe recommendations 🛡️`
                  : data.handedness
                  ? `Handedness: ${data.handedness} - Personalizing training recommendations 🤚`
                  : 'Health information is being recorded securely! 💙'
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
              disabled={!data.height || !data.weight || !data.handedness}
            >
              <span className="flex items-center relative z-10">
                {showCelebration === 'step-complete' ? 'Perfect! Moving forward...' : 'Continue'}
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

export default Step2Health;