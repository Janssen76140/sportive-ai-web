import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { LoginCredentials, UserType } from '../types/auth.ts';
import { demoAccounts } from '../data/mockAuthData.ts';
import { useAuthRedirect } from '../hooks/useAuthRedirect.ts';

const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth();
  
  // Handle automatic redirect after successful login
  useAuthRedirect();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    userType: 'parent'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>('parent');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { ...credentials, userType: selectedUserType });
      await login({ ...credentials, userType: selectedUserType });
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleDemoLogin = async (userType: UserType) => {
    const demo = demoAccounts[userType];
    setCredentials({
      email: demo.email,
      password: demo.password,
      userType: userType
    });
    setSelectedUserType(userType);
    
    try {
      console.log('Attempting demo login as:', userType, demo.email);
      await login({
        email: demo.email,
        password: demo.password,
        userType: userType
      });
      console.log('Demo login successful');
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  const getUserTypeColor = (type: UserType) => {
    switch (type) {
      case 'parent': return 'from-green-500 to-green-600';
      case 'academy': return 'from-blue-500 to-blue-600';
      case 'admin': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getUserTypeIcon = (type: UserType) => {
    switch (type) {
      case 'parent':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        );
      case 'academy':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        );
      case 'admin':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SportiveAI</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* User Type Selection */}
        <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Type</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['parent', 'academy', 'admin'] as UserType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedUserType(type)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedUserType === type
                    ? `border-${type === 'parent' ? 'green' : type === 'academy' ? 'blue' : 'red'}-500 bg-${type === 'parent' ? 'green' : type === 'academy' ? 'blue' : 'red'}-50`
                    : 'border-gray-200 bg-white/60 hover:bg-white/80'
                }`}
              >
                <div className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  selectedUserType === type 
                    ? `bg-gradient-to-r ${getUserTypeColor(type)} text-white`
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {getUserTypeIcon(type)}
                  </svg>
                </div>
                <div className={`text-sm font-medium capitalize ${
                  selectedUserType === type ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {type}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : `bg-gradient-to-r ${getUserTypeColor(selectedUserType)} text-white hover:shadow-lg hover:scale-105`
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                `Sign in as ${selectedUserType}`
              )}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Accounts</h3>
          <div className="space-y-3">
            {(Object.entries(demoAccounts) as [UserType, typeof demoAccounts[UserType]][]).map(([type, account]) => (
              <button
                key={type}
                onClick={() => handleDemoLogin(type)}
                disabled={loading}
                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                  loading 
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                    : 'bg-white/60 border-white/40 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-r ${getUserTypeColor(type)} text-white`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getUserTypeIcon(type)}
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900 capitalize">{type} Demo</span>
                    </div>
                    <p className="text-sm text-gray-600">{account.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{account.email}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Demo Mode • SportiveAI Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;