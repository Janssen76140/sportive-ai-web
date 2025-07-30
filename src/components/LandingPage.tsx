import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    '/assets/wlp1.jpg',
    '/assets/wlp2.jpg',
    '/assets/wlp3.jpg',
    '/assets/wlp4.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleRegisterClick = () => {
    navigate('/onboarding');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-1"></div>
            <div className="flex items-center justify-center">
              <img 
                src="/assets/logo-white.png" 
                alt="SportiveAI" 
                className="h-16 w-auto"
              />
            </div>
            <div className="flex-1 flex justify-end">
              <button 
                onClick={handleLoginClick}
                className="p-3 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <img 
                  src="/assets/login-icon.png" 
                  alt="Login" 
                  className="h-16 w-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden bg-black">
        {/* Background Images Carousel */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide}')`,
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          </div>
        ))}
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-3xl tracking-tight font-extrabold text-white sm:text-4xl md:text-5xl uppercase">
                <span className="text-primary-500">AI and technology</span> to improve young<br />
                athlete’s performance.
              </h1>
              
              <p className="mt-6 text-base text-white/80 sm:text-lg max-w-xl">
              Leveraging 100’s of data points and thousands of athlete’s health and performance stats, Sportive AI is an AI-
              native platform with a proprietary algorithm designed to help young athletes improve their performance.
              </p>
              
              <div className="mt-10 flex flex-row gap-4">
                <button className="px-8 py-3 text-sm font-semibold rounded-full text-black bg-white hover:bg-gray-200 uppercase transition-all duration-300">
                  Learn More
                </button>
                <button 
                  onClick={handleRegisterClick}
                  className="px-8 py-3 text-sm font-semibold rounded-full text-white bg-primary-500 hover:bg-primary-600 uppercase transition-all duration-300"
                >
                  Create my child’s profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
      </section>

      {/* Why Choose Section */}
      <section className="relative">
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 uppercase flex items-center justify-center">
                Why Choose Sportive
                <span className="inline-flex items-center ml-2">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full border-2 border-primary-500">AI</span>
                  <span className="text-gray-900 ml-1">?</span>
                </span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Science-backed nutrition guidance for optimal athletic performance
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black h-20"></div>
      </section>

      {/* Features Section - Phone Banner */}
      <section className="bg-black text-white pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* AI-Powered Analysis */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="/assets/phone1.png" 
                  alt="AI-Powered Analysis"
                  className="h-100 w-auto object-contain drop-shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider">AI-Powered Analysis</h3>
            </div>

            {/* Health-First Approach */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="/assets/phone2.png" 
                  alt="Health-First Approach"
                  className="h-100 w-auto object-contain drop-shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider">Health-First Approach</h3>
            </div>

            {/* Progress Tracking */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="/assets/phone3.png" 
                  alt="Progress Tracking"
                  className="h-100 w-auto object-contain drop-shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider">Progress Tracking</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Description Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI-Powered Analysis Description */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-500 rounded-lg p-3">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-base">
                Advanced algorithms analyze<br />
                your child's profile to recommend<br />
                the perfect supplements
              </p>
            </div>

            {/* Health-First Approach Description */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-500 rounded-lg p-3">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-base">
                Considers allergies, medical history,<br />
                and individual health needs
              </p>
            </div>

            {/* Progress Tracking Description */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-500 rounded-lg p-3">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 text-base">
                Monitor training, health metrics,<br />
                and supplement effectiveness
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;