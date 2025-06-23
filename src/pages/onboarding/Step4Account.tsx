import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step4Account: React.FC = () => {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      nextStep();
    }
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
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple OAuth
    console.log('Apple Sign-In clicked');
  };

  return (
    <div className="relative">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Header with glassmorphism effect */}
        <div className="mb-10 text-center">
          <div className="inline-block backdrop-blur-md bg-primary-500/10 border border-primary-500/20 rounded-2xl px-6 py-3 mb-6">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">Step 4 of 6</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Create Your Account
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Secure your account to access personalized recommendations and track your child's progress. 
            We take your privacy seriously and protect all your data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* OAuth Options */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Quick Sign Up
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl p-4">
              Sign up quickly using your existing Google or Apple account. Your data remains secure and private.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center px-6 py-4 border-2 border-gray-300/80 bg-white/70 rounded-xl hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-sm"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleAppleSignIn}
                className="flex items-center justify-center px-6 py-4 border-2 border-gray-300/80 bg-white/70 rounded-xl hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 shadow-sm"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="font-medium text-gray-700">Continue with Apple</span>
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/50 text-gray-500 rounded-lg">Or continue with email</span>
              </div>
            </div>
          </div>

          {/* Email & Password */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              Account Credentials
            </h3>
            <p className="text-sm text-gray-600 mb-6 bg-white/30 rounded-xl p-4">
              Create a secure account with your email address. This will be used to access your dashboard 
              and receive important updates about your child's nutrition program.
            </p>
            
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Parent Email Address *
                </label>
                <input
                  type="email"
                  value={data.parentEmail}
                  onChange={(e) => updateData({ parentEmail: e.target.value })}
                  className={`w-full px-4 py-4 backdrop-blur-sm bg-white/70 border-2 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm ${
                    data.parentEmail && !isValidEmail(data.parentEmail) 
                      ? 'border-red-400/80' 
                      : 'border-gray-300/80'
                  }`}
                  placeholder="Enter your email address"
                  required
                />
                {data.parentEmail && !isValidEmail(data.parentEmail) && (
                  <p className="mt-2 text-sm text-red-600">Please enter a valid email address</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="w-full px-4 py-4 pr-12 backdrop-blur-sm bg-white/70 border-2 border-gray-300/80 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm"
                    placeholder="Create a secure password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Password Strength */}
                {data.password && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Password Strength:</span>
                      <span className={`text-sm font-medium ${getPasswordStrengthText().color}`}>
                        {getPasswordStrengthText().text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength <= 1 ? 'bg-red-500' :
                          passwordStrength <= 2 ? 'bg-orange-500' :
                          passwordStrength <= 3 ? 'bg-yellow-500' :
                          passwordStrength <= 4 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      Password should be at least 8 characters with uppercase, lowercase, numbers, and symbols
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={data.confirmPassword}
                    onChange={(e) => updateData({ confirmPassword: e.target.value })}
                    className={`w-full px-4 py-4 pr-12 backdrop-blur-sm bg-white/70 border-2 rounded-xl focus:ring-4 focus:ring-primary-500/30 focus:border-primary-500 focus:bg-white/90 hover:border-gray-400/80 hover:bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-sm ${
                      data.confirmPassword && data.password !== data.confirmPassword 
                        ? 'border-red-400/80' 
                        : 'border-gray-300/80'
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {data.confirmPassword && data.password !== data.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                )}
                {data.confirmPassword && data.password === data.confirmPassword && data.password && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Passwords match
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms & Privacy */}
          <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                By creating an account, you agree to our{' '}
                <button type="button" className="text-primary-500 hover:text-primary-600 font-medium underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-primary-500 hover:text-primary-600 font-medium underline">
                  Privacy Policy
                </button>
                . We are committed to protecting your personal information and your child's data.
              </p>
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
              disabled={!isFormValid()}
            >
              <span className="flex items-center">
                Continue to AI Questionnaire
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

export default Step4Account;