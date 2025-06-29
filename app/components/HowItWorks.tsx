'use client';

import { useState } from 'react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      icon: "📤",
      title: "Upload Your Video",
      description: "Drag & drop or select your video file. We support MP4, MOV, AVI and more.",
      details: "Our AI instantly analyzes your video's audio track, identifies speakers, and prepares for translation.",
      image: "🎬"
    },
    {
      icon: "🌍",
      title: "Choose Target Language",
      description: "Select from 50+ languages with native-quality AI voices.",
      details: "Pick the perfect voice tone, accent, and style that matches your content's personality.",
      image: "🗣️"
    },
    {
      icon: "🤖",
      title: "AI Magic Happens",
      description: "Our advanced AI translates, synchronizes, and generates natural speech.",
      details: "Advanced lip-sync technology ensures perfect mouth movement matching.",
      image: "⚡"
    },
    {
      icon: "🎯",
      title: "Review & Download",
      description: "Preview your dubbed video and make any adjustments needed.",
      details: "Download in HD quality, ready to upload to any platform instantly.",
      image: "🎉"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🛠️ How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Upload to Global Reach in <span className="text-blue-600">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process makes professional dubbing accessible to everyone. 
            No technical skills required – just upload and go global.
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="max-w-6xl mx-auto">
          {/* Step Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-2xl">{step.icon}</span>
                <span className="font-medium">Step {index + 1}</span>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-3xl">{steps[activeStep].icon}</span>
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 font-medium mb-1">STEP {activeStep + 1}</div>
                    <h3 className="text-3xl font-bold text-gray-900">{steps[activeStep].title}</h3>
                  </div>
                </div>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  {steps[activeStep].description}
                </p>
                
                <p className="text-gray-600 mb-8">
                  {steps[activeStep].details}
                </p>

                {/* Progress indicators */}
                <div className="flex items-center space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= activeStep ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{steps[activeStep].image}</div>
                    <div className="bg-gray-100 rounded-xl p-6">
                      <div className="text-sm text-gray-600 mb-2">Processing...</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Steps Overview */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time Comparison */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 md:p-12 mt-16 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">⏱️ Time Comparison</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 text-red-200">Traditional Method</h4>
              <div className="space-y-2 text-left">
                <div>📞 Contact studios: 2-3 days</div>
                <div>💰 Get quotes: 1-2 days</div>
                <div>🎭 Find voice actors: 3-5 days</div>
                <div>🎬 Recording: 5-10 days</div>
                <div>✂️ Editing & sync: 7-14 days</div>
              </div>
              <div className="border-t border-white/30 mt-4 pt-4">
                <div className="text-2xl font-bold text-red-200">18-34 days total</div>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 text-green-200">DubTitle</h4>
              <div className="space-y-2 text-left">
                <div>📤 Upload video: 30 seconds</div>
                <div>🌍 Select language: 10 seconds</div>
                <div>🤖 AI processing: 2-10 minutes</div>
                <div>🎯 Review & download: 2 minutes</div>
                <div>🎉 Ready to publish: Instantly</div>
              </div>
              <div className="border-t border-white/30 mt-4 pt-4">
                <div className="text-2xl font-bold text-green-200">5-10 minutes total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 