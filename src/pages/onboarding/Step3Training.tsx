import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step3Training: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [customAcademy, setCustomAcademy] = useState('');
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');
  const [showCelebration, setShowCelebration] = useState('');
  const [showTrainingSuggestions, setShowTrainingSuggestions] = useState<{[key: string]: boolean}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation pour sport primaire (requis)
    const primaryValid = data.trainingIntensity && data.experienceYears && data.academicLevel;
    
    // Validation pour sport secondaire (requis si sport secondaire sélectionné)
    const secondaryValid = !data.secondarySport || 
      (data.secondaryTrainingIntensity && data.secondaryExperienceYears);
    
    if (primaryValid && secondaryValid) {
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

  const addCustomAcademy = () => {
    const trimmedAcademy = customAcademy.trim();
    if (trimmedAcademy) {
      updateData({ sportsAcademy: trimmedAcademy });
      setCustomAcademy('');
      handleFieldUpdate('sportsAcademy', trimmedAcademy);
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
    
    // Trigger celebration for the specific field
    const fieldName = Object.keys(updates)[0];
    handleFieldUpdate(fieldName, Object.values(updates)[0]);
  };

  const currentData = getCurrentData();
  const currentSport = activeTab === 'primary' ? data.primarySport : data.secondarySport;



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
          Training Information
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us about your child's training routine and experience level
        </p>
      </div>

      {/* Onglets pour Primary/Secondary Sport */}
      {data.secondarySport && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 border border-gray-300/60 rounded-xl p-1 mb-6"
        >
          <div className="flex gap-1">
            <motion.button
              type="button"
              onClick={() => setActiveTab('primary')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'primary'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-white/50'
              }`}
            >
              {data.primarySport} (Primary)
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setActiveTab('secondary')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'secondary'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-white/50'
              }`}
            >
              {data.secondarySport} (Secondary)
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/50 border border-white/30 rounded-3xl p-6 md:p-8 shadow-2xl">

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Training Frequency & Coaching - Inline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-3">
                Training Sessions per Week *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {frequencyOptions.map((option) => (
                  <motion.label
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      currentData.trainingFrequency === option.value
                        ? 'border-primary-500 bg-primary-500/20 shadow-md'
                        : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
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
                    <span className="font-medium text-gray-800">{option.label}</span>
                    <AnimatePresence>
                      {currentData.trainingFrequency === option.value && (
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

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-3">
                Coaching Sessions per Week
              </label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: '0', label: '0 sessions' },
                  { value: '1-2', label: '1-2 sessions' },
                  { value: '3', label: '3+ sessions' }
                ].map((option) => (
                  <motion.label
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      currentData.coachingSessions === option.value
                        ? 'border-primary-500 bg-primary-500/20 shadow-md'
                        : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
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
                    <span className="font-medium text-gray-800">{option.label}</span>
                    <AnimatePresence>
                      {currentData.coachingSessions === option.value && (
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
          </div>

          {/* Training Intensity - Compact */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Training Intensity * {data.secondarySport && `(${currentSport})`}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {intensityOptions.map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    currentData.trainingIntensity === option.value
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
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
                  <span className="font-medium text-gray-800">{option.value}</span>
                  <AnimatePresence>
                    {currentData.trainingIntensity === option.value && (
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

          {/* Experience Level - Compact */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Experience Level * {data.secondarySport && `(${currentSport})`}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {experienceOptions.map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    currentData.experienceYears === option.value
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
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
                  <span className="font-medium text-gray-800 text-sm">{option.label}</span>
                  <AnimatePresence>
                    {currentData.experienceYears === option.value && (
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

          {/* Academic Level - Only show on primary sport tab or when no secondary sport */}
          {(!data.secondarySport || activeTab === 'primary') && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Academic Level *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {academicOptions.map((option) => (
                <motion.label
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    data.academicLevel === option.value
                      ? 'border-primary-500 bg-primary-500/20 shadow-md'
                      : 'border-gray-300/60 bg-white/50 hover:border-gray-400/60 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="radio"
                    name="academicLevel"
                    value={option.value}
                    checked={data.academicLevel === option.value}
                    onChange={(e) => {
                      updateData({ academicLevel: e.target.value as any });
                      handleFieldUpdate('academicLevel', e.target.value);
                    }}
                    className="sr-only"
                  />
                  <span className="font-medium text-gray-800 text-sm">{option.label}</span>
                  <AnimatePresence>
                    {data.academicLevel === option.value && (
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
          )}

          {/* Sports Academy - Only show on primary sport tab or when no secondary sport */}
          {(!data.secondarySport || activeTab === 'primary') && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Sports Academy (Optional)
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <motion.input
                  type="text"
                  value={data.sportsAcademy || customAcademy}
                  onChange={(e) => {
                    if (data.sportsAcademy) {
                      updateData({ sportsAcademy: e.target.value });
                    } else {
                      setCustomAcademy(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAcademy())}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                  placeholder="Academy name (optional)"
                />
                {data.sportsAcademy && (
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
              {!data.sportsAcademy && customAcademy && (
                <motion.button
                  type="button"
                  onClick={addCustomAcademy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors duration-200"
                >
                  Save
                </motion.button>
              )}
            </div>

            {data.sportsAcademy && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-white/50 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">Academy: {data.sportsAcademy}</span>
                  <motion.button
                    type="button"
                    onClick={() => updateData({ sportsAcademy: '' })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-500 hover:text-red-700 transition-colors text-sm"
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
          )}

          {/* Smart Training Suggestions */}
          <AnimatePresence>
            {Object.entries(showTrainingSuggestions).map(([key, show]) => show && (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4"
              >
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-purple-800 font-medium mb-1">Training Insight</p>
                    <p className="text-sm text-purple-700">
                      {key === 'intensityWarning' && '⚠️ High intensity with low experience - we\'ll include recovery and injury prevention supplements'}
                      {key === 'soccerEndurance' && '⚽ High-frequency soccer training detected - endurance and electrolyte support will be emphasized'}
                      {key === 'swimmingSuggestion' && '🏊‍♀️ Swimming athlete - cardiovascular support and chlorine protection will be included'}
                      {key === 'basketballElite' && '🏀 Elite basketball player (7+ years) - advanced performance optimization will be prioritized'}
                      {key === 'stressManagement' && '🎓 High school + intense training - stress management and cognitive support will be added'}
                      {key === 'selfTraining' && '💪 Self-training detected - extra focus on proper nutrition timing and recovery'}
                      {key === 'crossTraining' && '🤸‍♀️ Cross-training athlete - balanced nutrition for multiple sport demands'}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowTrainingSuggestions(prev => ({ ...prev, [key]: false }))}
                    className="text-purple-400 hover:text-purple-600 ml-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Real-time Training Preview */}
          {(currentData.trainingFrequency || currentData.trainingIntensity || currentData.experienceYears || data.academicLevel) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-50 border border-orange-200 rounded-xl p-4"
            >
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium text-orange-800">Training Profile Preview</span>
              </div>
              <p className="text-sm text-orange-700">
                {currentData.trainingIntensity && currentData.experienceYears
                  ? `${currentSport || 'Primary sport'}: ${currentData.trainingIntensity} intensity, ${currentData.experienceYears} experience - Optimizing training recommendations! ⚡`
                  : currentData.trainingFrequency
                  ? `Training frequency: ${currentData.trainingFrequency} sessions/week - Building workout schedule 📅`
                  : currentData.trainingIntensity
                  ? `Training intensity: ${currentData.trainingIntensity} - Personalizing difficulty level 💪`
                  : data.academicLevel
                  ? `Academic level: ${data.academicLevel} - Balancing school and sports 🎓`
                  : 'Training profile is taking shape! 🏃‍♂️'
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
              disabled={
                !data.trainingIntensity || !data.experienceYears || !data.academicLevel ||
                (!!data.secondarySport && (!data.secondaryTrainingIntensity || !data.secondaryExperienceYears))
              }
            >
              <span className="flex items-center relative z-10">
                {showCelebration === 'step-complete' ? 'Excellent! Almost there...' : 'Continue'}
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

export default Step3Training;