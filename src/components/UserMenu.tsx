import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { UserType } from '../types/auth.ts';

interface UserMenuProps {
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ className = '' }) => {
  const { user, logout, switchUserType } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate menu position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8, // 8px margin
        right: window.innerWidth - rect.right
      });
    } else {
      setMenuPosition(null);
    }
  }, [isOpen]);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  if (!user) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSwitchUser = (userType: UserType) => {
    switchUserType(userType);
    setIsOpen(false);
  };

  const getUserTypeColor = (type: UserType) => {
    switch (type) {
      case 'parent': return 'from-green-500 to-green-600';
      case 'academy': return 'from-blue-500 to-blue-600';
      case 'admin': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getUserDisplayName = () => {
    if (user.userType === 'academy') {
      return user.academyName || `${user.firstName} ${user.lastName}`;
    }
    return `${user.firstName} ${user.lastName}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`relative z-50 ${className}`}>
      {/* User Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl bg-white/40 border border-white/30 hover:bg-white/60 transition-all duration-300"
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${getUserTypeColor(user.userType)} text-white`}>
          <span className="text-sm font-bold">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </span>
        </div>
        <div className="text-left hidden md:block">
          <div className="text-sm font-medium text-gray-900">{getUserDisplayName()}</div>
          <div className="text-xs text-gray-600 capitalize">{user.userType}</div>
        </div>
        <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu - Rendered via Portal */}
      {isOpen && menuPosition && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Menu */}
          <div 
            className="fixed w-80 backdrop-blur-md bg-white/90 border border-white/30 rounded-2xl shadow-xl z-[9999] p-4"
            style={{
              top: menuPosition.top,
              right: menuPosition.right
            }}
          >
            {/* User Info */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${getUserTypeColor(user.userType)} text-white`}>
                  <span className="text-lg font-bold">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{getUserDisplayName()}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{user.userType} Account</span>
                  </div>
                </div>
              </div>
              
              {/* Account Details */}
              <div className="text-xs text-gray-500 space-y-1">
                <div>Last login: {new Date(user.lastLogin).toLocaleString()}</div>
                <div>Member since: {new Date(user.createdAt).toLocaleDateString()}</div>
                {user.userType === 'academy' && user.totalAthletes && (
                  <div>Athletes: {user.totalAthletes}</div>
                )}
                {user.userType === 'parent' && user.children && (
                  <div>Children: {user.children.length}</div>
                )}
              </div>
            </div>

            {/* Demo Account Switcher */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Switch Demo Account</div>
              <div className="space-y-2">
                {(['parent', 'academy', 'admin'] as UserType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleSwitchUser(type)}
                    disabled={user.userType === type}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                      user.userType === type
                        ? 'bg-gray-100 cursor-not-allowed opacity-50'
                        : 'bg-white/60 hover:bg-white/80 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r ${getUserTypeColor(type)} text-white`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {type === 'parent' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        )}
                        {type === 'academy' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        )}
                        {type === 'admin' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        )}
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {type} {user.userType === type && '(Current)'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {type === 'parent' && 'Family management'}
                        {type === 'academy' && 'Institution dashboard'}
                        {type === 'admin' && 'Platform administration'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <button
                onClick={() => window.open('/onboarding', '_blank')}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Try Onboarding Flow</span>
              </button>
              
              <button
                onClick={() => window.open('/', '_blank')}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-medium text-gray-900">View Landing Page</span>
              </button>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium text-red-700">
                  {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                </span>
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default UserMenu;