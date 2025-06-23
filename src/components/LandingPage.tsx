import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/onboarding');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav style={{ backgroundColor: '#D2D2D2' }} className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-32">
            <div className="flex items-center">
              <img 
                src="/assets/logo.png" 
                alt="SportiveAI" 
                className="h-32 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLoginClick}
                className="px-6 py-2 text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 rounded-lg hover:bg-white/30"
              >
                Log In
              </button>
              <button 
                onClick={handleRegisterClick}
                className="px-6 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Register My Child
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/hero-image.jpg')",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-center">
            {/* Glass effect box */}
            <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-8 md:p-12 shadow-2xl">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                All good things begin with <span className="text-primary-500 drop-shadow-lg">good health</span> and exercise.
              </h1>
              
              <p className="mt-6 text-lg text-white/90 sm:text-xl md:text-2xl leading-relaxed">
                We are here to facilitate the interaction between athletes and their academies while helping to improve their health, in order to provide exceptional care for a better life.
              </p>
              
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleRegisterClick}
                  className="flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-primary-500 hover:bg-primary-600 md:text-lg md:px-12 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Register My Child
                </button>
                <button className="flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-gray-800 bg-white/90 hover:bg-white md:text-lg md:px-12 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose SportiveAI?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Science-backed nutrition guidance for optimal athletic performance
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">AI-Powered Analysis</h3>
              <p className="mt-2 text-base text-gray-500">
                Advanced algorithms analyze your child's profile to recommend the perfect supplements
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Health-First Approach</h3>
              <p className="mt-2 text-base text-gray-500">
                Considers allergies, medical history, and individual health needs
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Progress Tracking</h3>
              <p className="mt-2 text-base text-gray-500">
                Monitor training, health metrics, and supplement effectiveness
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;