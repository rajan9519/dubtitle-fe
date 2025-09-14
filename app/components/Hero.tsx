"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { trackButtonClick } from './GoogleAnalytics';

interface Stat {
  value: string;
  label: string;
}

interface HeroProps {
  badgeText: string;
  title: React.ReactNode;
  subtitle: string;
  stats: Stat[];
}

export default function Hero({ badgeText, title, subtitle, stats }: HeroProps) {
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'hindi' | 'english'>('hindi');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Demo video URLs
  const videoUrl = "https://res.cloudinary.com/dykgfl3rm/video/upload/v1751943920/Vijay_Mallya_podcast_is_a_MISTAKE__Abhi_and_Niyu-69639809_ma7u8j.mp4";
  const englishAudioUrl = "https://res.cloudinary.com/dykgfl3rm/video/upload/v1751943989/translations_audio_18_combined_audio-08175989_za59ny.wav";

  const handleLanguageToggle = (language: 'hindi' | 'english') => {
    setSelectedLanguage(language);
    
    if (language === 'english' && videoRef.current && audioRef.current) {
      const currentTime = videoRef.current.currentTime;
      videoRef.current.muted = true;
      audioRef.current.currentTime = currentTime;
      
      if (isPlaying) {
        audioRef.current.play();
      }
    } else if (language === 'hindi' && videoRef.current && audioRef.current) {
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
    if (selectedLanguage === 'english' && videoRef.current && audioRef.current && isPlaying) {
      const videoTime = videoRef.current.currentTime;
      const audioTime = audioRef.current.currentTime;
      
      if (Math.abs(videoTime - audioTime) > 0.1) {
        audioRef.current.currentTime = videoTime;
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative z-20 container mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-black text-xl font-semibold">DubTitle</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-700 hover:text-black transition-colors font-medium">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-black transition-colors font-medium">Pricing</a>
          <button
            onClick={() => {
              if (loginLoading) return;
              setLoginLoading(true);
              trackButtonClick('Login', 'Hero Navigation');
              router.push('/login');
            }}
            disabled={loginLoading}
            className="text-gray-700 hover:text-black transition-colors font-medium disabled:opacity-50 cursor-pointer"
          >
            {loginLoading ? 'Loading...' : 'Sign in'}
          </button>
          <button
            onClick={() => {
              if (loginLoading) return;
              setLoginLoading(true);
              trackButtonClick('Sign Up', 'Hero Navigation');
              router.push('/signup');
            }}
            disabled={loginLoading}
            className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loginLoading ? 'Loading...' : 'Sign up'}
          </button>
          <button
            onClick={() => {
              trackButtonClick('Contact Sales', 'Hero Navigation');
              router.push('/contact');
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:text-black transition-colors cursor-pointer"
          >
            Contact Sales
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={() => {
              trackButtonClick('Contact Sales Mobile', 'Hero Navigation');
              router.push('/contact');
            }}
            className="px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:text-black transition-colors text-sm"
          >
            Sales
          </button>
          <button
            onClick={() => {
              if (loginLoading) return;
              setLoginLoading(true);
              trackButtonClick('Sign Up Mobile', 'Hero Navigation');
              router.push('/signup');
            }}
            disabled={loginLoading}
            className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loginLoading ? 'Loading...' : 'Sign up'}
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-gray-800 text-sm font-medium">{badgeText}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* CTA Button */}
          <div className="mb-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {
                if (loginLoading) return;
                setLoginLoading(true);
                trackButtonClick('Get Started Free', 'Hero Section');
                router.push('/signup');
              }}
              disabled={loginLoading}
              className="px-8 py-4 bg-black text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loginLoading ? 'Loading...' : 'Get Started Free'}
            </button>
            <button 
              onClick={() => {
                trackButtonClick('Contact Sales', 'Hero Section');
                router.push('/contact');
              }}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-lg hover:border-gray-400 hover:text-black transition-colors"
            >
              Contact Sales
            </button>
          </div>

          {/* Demo Section */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">See it in action</h3>
            
            {/* Video player */}
            <div className="aspect-video bg-gray-900 rounded-2xl mb-6 relative overflow-hidden">
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
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleLanguageToggle('hindi')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedLanguage === 'hindi'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇮🇳 Hindi (Original)
              </button>
              <button
                onClick={() => handleLanguageToggle('english')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedLanguage === 'english'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇺🇸 English (Dubbed)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}