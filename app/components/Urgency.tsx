'use client';

import { useState, useEffect } from 'react';

export default function Urgency() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 7 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-red-500 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🔥 Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Launch Special: <span className="text-yellow-300">50% OFF</span>
          </h2>
          <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed mb-8">
            We're celebrating our launch with an exclusive discount for early adopters. 
            This offer expires soon – don't miss out!
          </p>
        </div> */}

        {/* Countdown Timer */}
        {/* <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-12 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">⏰ Offer Expires In:</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-3xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="text-sm text-red-100">Days</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-sm text-red-100">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-sm text-red-100">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-sm text-red-100">Seconds</div>
            </div>
          </div>
        </div> */}

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center flex flex-col">
            <div className="text-lg font-medium text-red-200 mb-2">FREE</div>
            <div className="text-4xl font-bold mb-4">
              <span className="text-yellow-300">$0</span>
            </div>
            <div className="text-red-100 mb-6">5 minutes of dubbing</div>
            <ul className="space-y-3 mb-8 text-left flex-grow">
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>AI dubbing in 50+ languages</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Voice cloning technology</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>HD quality output</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>5 voice style options</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Email support</span>
              </li>
              <li className="flex items-center">
                <span className="text-red-400 mr-2">⚠</span>
                <span>Includes watermark</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 mt-auto cursor-pointer">
              Get Started Free
            </button>
          </div>

          {/* Starter Plan - Most Popular */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-center relative transform scale-105 shadow-2xl flex flex-col">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              🔥 MOST POPULAR
            </div>
            <div className="text-lg font-medium text-orange-900 mb-2 mt-4">STARTER</div>
            <div className="text-4xl font-bold mb-4 text-white">
              <span className="line-through text-orange-200">$10</span>
              <span className="ml-2">$5</span>
            </div>
            <div className="text-orange-100 mb-6">15 minutes of dubbing</div>
            <ul className="space-y-3 mb-8 text-left flex-grow">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Everything in Free</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>No watermark</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Advanced voice cloning</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Priority processing</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 mt-auto cursor-pointer">
              Coming Soon
            </button>
          </div>

          {/* Professional Plan */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center flex flex-col">
            <div className="text-lg font-medium text-red-200 mb-2">PROFESSIONAL</div>
            <div className="text-4xl font-bold mb-4">
              <span className="line-through text-red-300">$35</span>
              <span className="text-yellow-300 ml-2">$25</span>
            </div>
            <div className="text-red-100 mb-6">60 minutes of dubbing</div>
            <ul className="space-y-3 mb-8 text-left flex-grow">
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Everything in Starter</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Custom voice training</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 mt-auto cursor-pointer">
              Coming Soon
            </button>
          </div>
        </div>

        {/* Limited Spots */}
        {/* <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">⚡ Limited Beta Spots Available</h3>
          <p className="text-red-100 mb-6">
            Only <span className="text-yellow-300 font-bold">47 spots</span> remaining in our launch beta program. 
            Secure your access now before we reach capacity!
          </p>
          
          <div className="bg-white/20 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-red-400 h-full rounded-full" style={{width: '76%'}}></div>
          </div>
          
          <p className="text-sm text-red-200 mb-6">
            76% of beta spots taken • Join 2,847 creators already using DubTitle
          </p>

          <button className="group relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <span className="relative z-10">🚀 Claim Your Spot Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <p className="text-sm text-red-100 mt-4">
            ✅ No credit card required • ✅ Cancel anytime • ✅ 30-day money-back guarantee
          </p>
        </div> */}
      </div>
    </section>
  );
} 