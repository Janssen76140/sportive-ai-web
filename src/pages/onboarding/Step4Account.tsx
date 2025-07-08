import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step4Account: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showCelebration, setShowCelebration] = useState('');
  const [showAccountTips, setShowAccountTips] = useState<{[key: string]: boolean}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
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

  const isFormValid = () => {
    return (
      data.parentEmail &&
      data.password &&
      data.confirmPassword &&
      data.password === data.confirmPassword &&
      data.password.length >= 8 &&
      isValidEmail(data.parentEmail)
    );
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (password: string) => {
    updateData({ password });
    setPasswordStrength(checkPasswordStrength(password));
    handleFieldUpdate('password', password);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { text: 'Very Weak', color: 'text-red-500' };
      case 2:
        return { text: 'Weak', color: 'text-orange-500' };
      case 3:
        return { text: 'Fair', color: 'text-yellow-500' };
      case 4:
        return { text: 'Good', color: 'text-blue-500' };
      case 5:
        return { text: 'Strong', color: 'text-green-500' };
      default:
        return { text: '', color: '' };
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log('Google Sign-In clicked');
    setShowCelebration('oauth');
    setTimeout(() => setShowCelebration(''), 500);
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple OAuth
    console.log('Apple Sign-In clicked');
    setShowCelebration('oauth');
    setTimeout(() => setShowCelebration(''), 500);
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
          Create Your Account
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Set up your account to access personalized recommendations and track progress
        </p>
      </div>

      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/50 border border-white/30 rounded-3xl p-6 md:p-8 shadow-2xl">

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* OAuth Options - Compact */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-3">Quick Sign Up</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={handleGoogleSignIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300/60 bg-white/70 rounded-xl hover:border-gray-400/60 hover:bg-white/80 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-gray-700 text-sm">Google</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleAppleSignIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300/60 bg-white/70 rounded-xl hover:border-gray-400/60 hover:bg-white/80 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="font-medium text-gray-700 text-sm">Apple</span>
              </motion.button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white/50 text-gray-500 rounded">Or with email</span>
              </div>
            </div>
          </div>

          {/* Email & Password - Compact */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Parent Email Address *
              </label>
              <div className="relative">
                <motion.input
                  type="email"
                  value={data.parentEmail}
                  onChange={(e) => {
                    updateData({ parentEmail: e.target.value });
                    handleFieldUpdate('parentEmail', e.target.value);
                  }}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 backdrop-blur-sm bg-white/70 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500 ${
                    data.parentEmail && !isValidEmail(data.parentEmail) 
                      ? 'border-red-400/80' 
                      : 'border-gray-300/60'
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
                {data.parentEmail && isValidEmail(data.parentEmail) && (
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
              {data.parentEmail && !isValidEmail(data.parentEmail) && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-600"
                >
                  Please enter a valid email address
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Password *
              </label>
              <div className="relative">
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 pr-10 backdrop-blur-sm bg-white/70 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                  placeholder="Create a secure password"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </motion.button>
              </div>
              
              {/* Password Strength - Animated */}
              <AnimatePresence>
                {data.password && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-2"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Strength:</span>
                      <span className={`text-xs font-medium ${getPasswordStrengthText().color}`}>
                        {getPasswordStrengthText().text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          passwordStrength <= 1 ? 'bg-red-500' :
                          passwordStrength <= 2 ? 'bg-orange-500' :
                          passwordStrength <= 3 ? 'bg-yellow-500' :
                          passwordStrength <= 4 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <motion.input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={data.confirmPassword}
                  onChange={(e) => {
                    updateData({ confirmPassword: e.target.value });
                    handleFieldUpdate('confirmPassword', e.target.value);
                  }}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 pr-10 backdrop-blur-sm bg-white/70 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-gray-800 placeholder-gray-500 ${
                    data.confirmPassword && data.password !== data.confirmPassword 
                      ? 'border-red-400/80' 
                      : 'border-gray-300/60'
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </motion.button>
              </div>
              
              <AnimatePresence>
                {data.confirmPassword && data.password !== data.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    Passwords do not match
                  </motion.p>
                )}
                {data.confirmPassword && data.password === data.confirmPassword && data.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-green-600 flex items-center"
                  >
                    <motion.svg 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-3 h-3 mr-1" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </motion.svg>
                    Passwords match
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Smart Account Tips */}
          <AnimatePresence>
            {Object.entries(showAccountTips).map(([key, show]) => show && (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4"
              >
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-yellow-800 font-medium mb-1">Account Tip</p>
                    <p className="text-sm text-yellow-700">
                      {key === 'weakPassword' && '🔐 Consider adding numbers and special characters for stronger security'}
                      {key === 'strongPassword' && '💪 Excellent password strength! Your account will be well-protected'}
                      {key === 'gmailTip' && '📧 Gmail detected - you can use Google Sign-In for faster access in the future'}
                      {key === 'icloudTip' && '🍎 iCloud email detected - Apple Sign-In is available for convenient access'}
                      {key === 'youngAthleteParent' && '👶 Young athlete parent - we\'ll send simplified progress reports and nutrition tips'}
                      {key === 'teenAthleteParent' && '🧑‍🎓 Teen athlete parent - expect detailed performance analytics and independence tips'}
                      {key === 'securityTip' && '🛡️ Tip: Never share your login credentials - we\'ll never ask for them via email'}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAccountTips(prev => ({ ...prev, [key]: false }))}
                    className="text-yellow-400 hover:text-yellow-600 ml-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Real-time Account Preview */}
          {(data.parentEmail || data.password) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-50 border border-purple-200 rounded-xl p-4"
            >
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium text-purple-800">Account Setup Preview</span>
              </div>
              <p className="text-sm text-purple-700">
                {data.parentEmail && isValidEmail(data.parentEmail) && data.password && data.password === data.confirmPassword
                  ? `Account ready for ${data.parentEmail} - Secure password confirmed! 🔐`
                  : data.parentEmail && isValidEmail(data.parentEmail)
                  ? `Valid email: ${data.parentEmail} - Complete password setup 📧`
                  : data.password && passwordStrength >= 3
                  ? `Strong password created - Add your email to continue 🔑`
                  : data.parentEmail
                  ? `Email entered - Create a secure password to continue ✉️`
                  : 'Account creation in progress! 👤'
                }
              </p>
            </motion.div>
          )}

          {/* Terms & Privacy - Compact */}
          <div className="text-center">
            <p className="text-xs text-gray-600">
              By creating an account, you agree to our{' '}
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.05 }}
                className="text-primary-500 hover:text-primary-600 underline"
              >
                Terms
              </motion.button>{' '}
              and{' '}
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.05 }}
                className="text-primary-500 hover:text-primary-600 underline"
              >
                Privacy Policy
              </motion.button>
            </p>
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
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              disabled={!isFormValid()}
            >
              <span className="flex items-center relative z-10">
                {showCelebration === 'step-complete' ? 'Account secured! Final step...' : 'Continue'}
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

export default Step4Account;