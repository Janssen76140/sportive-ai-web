import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';
import { SPORTS_LIST } from '../../types/onboarding.ts';

const Step1Identity: React.FC = () => {
  const { data, updateData, nextStep } = useOnboarding();
  const [showCelebration, setShowCelebration] = useState('');
  const [showTooltips, setShowTooltips] = useState<{[key: string]: boolean}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.firstName && data.lastName && data.ageGroup && data.gender && data.primarySport) {
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

  // Get available sports for secondary sport (excluding primary sport)
  const getAvailableSecondarySports = () => {
    return SPORTS_LIST.filter(sport => sport !== data.primarySport);
  };

  // Interactive help tooltips (on demand)
  const showTooltip = (field: string) => {
    setShowTooltips(prev => ({ ...prev, [field]: true }));
    setTimeout(() => setShowTooltips(prev => ({ ...prev, [field]: false })), 6000); // Plus long
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-4xl mx-auto"
    >
      {/* Compact Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Let's get started
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us about your child to personalize their nutrition recommendations
        </p>
      </div>

      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/50 border border-white/30 rounded-3xl p-6 md:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Fields - Inline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                First Name *
              </label>
              <motion.input
                type="text"
                value={data.firstName}
                onChange={(e) => handleFieldUpdate('firstName', e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                placeholder="First name"
                required
              />
              {data.firstName && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-3 top-11 text-green-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Last Name *
              </label>
              <motion.input
                type="text"
                value={data.lastName}
                onChange={(e) => handleFieldUpdate('lastName', e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                placeholder="Last name"
                required
              />
              {data.lastName && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-3 top-11 text-green-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </div>
          </div>

          {/* Age Group - Compact */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <label className="block text-sm font-medium text-gray-800">
                Age Group *
              </label>
              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() => showTooltip('ageHelp')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-4 h-4 rounded-full bg-gray-300 text-gray-600 text-xs flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                >
                  ?
                </motion.button>
                
                {/* Age Help Tooltip */}
                <AnimatePresence>
                  {showTooltips.ageHelp && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs"
                    >
                      <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
                      Age groups help us calculate appropriate nutrition timing and portion sizes for optimal athletic development.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['6–9', '10–13', '14–18'].map((age) => (
                <motion.label
                  key={age}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.ageGroup === age
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="radio"
                    name="ageGroup"
                    value={age}
                    checked={data.ageGroup === age}
                    onChange={(e) => handleFieldUpdate('ageGroup', e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-medium text-gray-800">{age} years</span>
                  <AnimatePresence>
                    {data.ageGroup === age && (
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

          {/* Gender - Compact */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Gender *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'Male', label: 'Boy' },
                { value: 'Female', label: 'Girl' },
                { value: 'Other', label: 'Other' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.gender === option.value
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
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
                  <span className="font-medium text-gray-800">{option.label}</span>
                  {data.gender === option.value && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Sports Selection - Inline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-800">
                  Primary Sport *
                </label>
                <div className="relative">
                  <motion.button
                    type="button"
                    onClick={() => showTooltip('sportHelp')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-4 h-4 rounded-full bg-gray-300 text-gray-600 text-xs flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    ?
                  </motion.button>
                  
                  {/* Sport Help Tooltip */}
                  <AnimatePresence>
                    {showTooltips.sportHelp && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs"
                      >
                        <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
                        Your primary sport determines the core supplementation strategy. Secondary sports help us add cross-training support.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <select
                value={data.primarySport}
                onChange={(e) => {
                  const newPrimarySport = e.target.value;
                  updateData({ 
                    primarySport: newPrimarySport,
                    secondarySport: data.secondarySport === newPrimarySport ? '' : data.secondarySport
                  });
                }}
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800"
                required
              >
                <option value="">Select primary sport</option>
                {SPORTS_LIST.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Secondary Sport (Optional)
              </label>
              <select
                value={data.secondarySport}
                onChange={(e) => updateData({ secondarySport: e.target.value })}
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800"
                disabled={!data.primarySport}
              >
                <option value="">
                  {!data.primarySport ? 'Select primary sport first' : 'Select secondary sport'}
                </option>
                {getAvailableSecondarySports().map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>
          </div>



          {/* Real-time Preview */}
          {(data.firstName || data.primarySport) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-50 border border-primary-200 rounded-xl p-4"
            >
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-sm font-medium text-primary-800">AI Preview</span>
              </div>
              <p className="text-sm text-primary-700">
                {data.firstName && data.primarySport 
                  ? `We're preparing ${data.primarySport.toLowerCase()}-specific recommendations for ${data.firstName}! 🏆`
                  : data.firstName 
                  ? `Hi ${data.firstName}! Select your sport to see personalized recommendations 💪`
                  : data.primarySport
                  ? `${data.primarySport} athlete detected! Add your name to continue ⚽`
                  : 'Looking great so far! ✨'
                }
              </p>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              disabled={!data.firstName || !data.lastName || !data.ageGroup || !data.gender || !data.primarySport}
            >
              <span className="flex items-center relative z-10">
                {showCelebration === 'step-complete' ? 'Great! Moving forward...' : 'Continue'}
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

export default Step1Identity;