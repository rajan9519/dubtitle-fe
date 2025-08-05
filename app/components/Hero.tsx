"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { trackButtonClick } from './GoogleAnalytics';

export default function Hero() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<'hindi' | 'english'>('hindi');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Replace these with your actual URLs
  const videoUrl = "https://res.cloudinary.com/dykgfl3rm/video/upload/v1751943920/Vijay_Mallya_podcast_is_a_MISTAKE__Abhi_and_Niyu-69639809_ma7u8j.mp4"; // You'll provide this
  const englishAudioUrl = "https://res.cloudinary.com/dykgfl3rm/video/upload/v1751943989/translations_audio_18_combined_audio-08175989_za59ny.wav"; // You'll provide this

  const handleLanguageToggle = (language: 'hindi' | 'english') => {
    setSelectedLanguage(language);
    
    if (language === 'english' && videoRef.current && audioRef.current) {
      // Get current video time
      const currentTime = videoRef.current.currentTime;
      
      // Mute the video and play the English audio
      videoRef.current.muted = true;
      audioRef.current.currentTime = currentTime;
      
      if (isPlaying) {
        audioRef.current.play();
      }
    } else if (language === 'hindi' && videoRef.current && audioRef.current) {
      // Unmute the video and pause the English audio
      videoRef.current.muted = false;
      audioRef.current.pause();
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (selectedLanguage === 'english' && audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        videoRef.current.play();
        if (selectedLanguage === 'english' && audioRef.current) {
          audioRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoTimeUpdate = () => {
    // Sync audio with video when playing English
    if (selectedLanguage === 'english' && videoRef.current && audioRef.current && isPlaying) {
      const videoTime = videoRef.current.currentTime;
      const audioTime = audioRef.current.currentTime;
      
      // Sync if the difference is more than 0.1 seconds
      if (Math.abs(videoTime - audioTime) > 0.1) {
        audioRef.current.currentTime = videoTime;
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 container mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-white text-2xl font-bold">DubTitle</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white hover:text-purple-300 transition-colors">Features</a>
          <a href="#pricing" className="text-white hover:text-purple-300 transition-colors">Pricing</a>
          <a href="#about" className="text-white hover:text-purple-300 transition-colors">About</a>
          <button
            onClick={() => {
              trackButtonClick('Login', 'Hero Navigation');
              router.push('/login');
            }}
            className="text-white hover:text-purple-300 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => {
              trackButtonClick('Sign Up', 'Hero Navigation');
              router.push('/signup');
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => {
              trackButtonClick('Login', 'Hero Navigation Mobile');
              router.push('/login');
            }}
            className="text-white hover:text-purple-300 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => {
              trackButtonClick('Sign Up', 'Hero Navigation Mobile');
              router.push('/signup');
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-white text-sm font-medium">🚀 Now Live - AI-Powered Dubbing</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Dub Videos
              </span>
              <br />
              <span className="text-white">in Any Language</span>
              <br />
              <span className="text-white text-4xl md:text-5xl">in Minutes ⚡</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform your content for global audiences with AI dubbing that preserves emotion, 
              tone, and perfect lip-sync. No studios, no voice actors, no weeks of waiting.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-purple-300">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-purple-300">Videos Dubbed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2min</div>
                <div className="text-purple-300">Average Time</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button 
                onClick={() => {
                  trackButtonClick('Get Started for Free', 'Hero Section');
                  router.push('/login');
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10">Get Started for Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
            </div>
          </div>

          {/* Right Column - Demo Video */}
          <div className="relative">
            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Video player */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl mb-6 relative overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover rounded-2xl"
                  onTimeUpdate={handleVideoTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  muted={selectedLanguage === 'english'}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Audio element for English dubbing */}
                <audio
                  ref={audioRef}
                  preload="auto"
                >
                  <source src={englishAudioUrl} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>

                {/* Play/Pause button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    {isPlaying ? (
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                </div>

              </div>

              {/* Language Selection */}
              <div className="text-center">
                
                {/* Language toggle buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleLanguageToggle('hindi')}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                      selectedLanguage === 'hindi'
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-white/20 text-gray-300 hover:bg-white/30'
                    }`}
                  >
                    🇮🇳 Hindi
                  </button>
                  <button
                    onClick={() => handleLanguageToggle('english')}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                      selectedLanguage === 'english'
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-white/20 text-gray-300 hover:bg-white/30'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center animate-bounce">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl flex items-center justify-center animate-pulse">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 