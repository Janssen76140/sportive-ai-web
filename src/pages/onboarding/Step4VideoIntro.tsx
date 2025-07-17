import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step4VideoIntro: React.FC = () => {
  const { nextStep } = useOnboarding();
  const [showSkip, setShowSkip] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10); // 10 seconds countdown

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          nextStep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(countdownInterval);
    };
  }, [nextStep]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-7xl mx-auto"
    >
      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/70 border border-white/30 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon: Mobile App Preview</h2>
          <p className="text-gray-600 mb-8">Our mobile app is currently in development. Get ready for an amazing experience!</p>
          
          {/* Placeholder for video/image */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 aspect-video max-w-4xl mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-24 h-24 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18l.01 0M8.21 15.79L12 12m0 0l3.79 3.79M12 12l.01-7" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Mobile App Features</h3>
                <ul className="text-sm space-y-1">
                  <li>✓ Track your child's progress</li>
                  <li>✓ Real-time notifications</li>
                  <li>✓ Connect with coaches</li>
                  <li>✓ Monitor supplement schedule</li>
                </ul>
              </div>
            </div>
            
            {/* Try to load video as fallback */}
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              src="/assets/video2.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          
          {/* Countdown timer */}
          <div className="mt-8">
            <p className="text-gray-600">Continuing in {timeRemaining} seconds...</p>
            <div className="w-full max-w-xs mx-auto mt-2 bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-full bg-primary-500 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 10, ease: "linear" }}
              />
            </div>
          </div>
          
          {/* Skip button */}
          {showSkip && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => nextStep()}
              className="mt-4 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-200"
            >
              Continue Now →
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Step4VideoIntro;