import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext.tsx';

const Step4VideoIntro: React.FC = () => {
  const { nextStep } = useOnboarding();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Auto-play video when component mounts
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Reset video to beginning
          videoRef.current.currentTime = 0;
          // Ensure video is muted for autoplay
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-play was prevented:', error);
          // Fallback: Show play button
          setShowPlayButton(true);
        }
      }
    };
    
    playVideo();
  }, []);

  const handleVideoEnd = () => {
    // Automatically move to next step when video ends
    setTimeout(() => {
      nextStep();
    }, 500); // Small delay for smooth transition
  };

  const handleManualPlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Manual play failed:', error);
      }
    }
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
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            controls={false}
            onLoadedData={() => console.log('Video loaded successfully')}
            onError={(e) => {
              console.error('Video error:', e);
              console.error('Video element:', videoRef.current);
              console.error('Video src:', videoRef.current?.src);
              setVideoError(true);
              // Auto skip after 3 seconds if video fails
              setTimeout(() => nextStep(), 3000);
            }}
          >
            <source src="/assets/video2.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
            <source src="/assets/video2.mp4" type="video/mp4" />
            <p>Your browser does not support the video tag.</p>
          </video>
          
          {/* Play button if autoplay fails */}
          {showPlayButton && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={handleManualPlay}
                className="bg-white/90 hover:bg-white rounded-full p-6 shadow-xl hover:shadow-2xl transition-all duration-200"
              >
                <svg className="w-12 h-12 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          )}
          
          {/* Loading spinner while video loads */}
          {!showPlayButton && !isPlaying && (
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
          )}
          
          {/* Error message if video fails */}
          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="text-center p-8">
                <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-white text-lg font-semibold mb-2">Video Preview Unavailable</h3>
                <p className="text-gray-300 mb-4">Moving to the next step...</p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              </div>
            </div>
          )}
          
          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={() => nextStep()}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg text-sm font-medium transition-all duration-200"
          >
            Skip →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Step4VideoIntro;