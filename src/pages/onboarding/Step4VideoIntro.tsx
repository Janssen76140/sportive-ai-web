import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step4VideoIntro: React.FC = () => {
  const { nextStep } = useOnboarding();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error);
      });
    }
  }, []);

  const handleVideoEnd = () => {
    // Automatically move to next step when video ends
    setTimeout(() => {
      nextStep();
    }, 500); // Small delay for smooth transition
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
            src="/assets/video2.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            controls={false}
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Optional: Loading spinner while video loads */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-black/80 rounded-full p-4"
            >
              <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Step4VideoIntro;