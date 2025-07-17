import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step4VideoIntro: React.FC = () => {
  const { nextStep } = useOnboarding();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 2 seconds
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Try to play video when it's loaded
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay failed, but video is loaded:', err);
      });
    }
  }, [isVideoLoaded]);

  const handleVideoEnd = () => {
    setTimeout(() => {
      nextStep();
    }, 500);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-7xl mx-auto"
    >
      {/* Glassmorphism container */}
      <div className="backdrop-blur-l bg-white/70 border border-white/30 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl">
        <div className="relative rounded-2xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="w-full h-auto"
            src="https://res.cloudinary.com/dhmxbbc7x/video/upload/v1752745532/video2_bi9wuj.mp4"
            autoPlay
            muted
            playsInline
            controls={false}
            onEnded={handleVideoEnd}
            onLoadedData={handleVideoLoaded}
            onError={(e) => {
              console.error('Video failed to load:', e);
              // Skip to next step after 3 seconds if video fails
              setTimeout(() => nextStep(), 3000);
            }}
          />
          
          {/* Loading state */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-sm">Loading video preview...</p>
              </div>
            </div>
          )}
          
          {/* Skip button */}
          {showSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => nextStep()}
              className="absolute bottom-4 right-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg text-sm font-medium transition-all duration-200"
            >
              Skip →
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Step4VideoIntro;