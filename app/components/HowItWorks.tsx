'use client';


interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface ComparisonFeature {
  text: string;
  subtext: string;
}

interface HowItWorksProps {
  badgeText: string;
  title: string;
  subtitle: string;
  steps: Step[];
  comparisonTitle: string;
  comparisonSubtitle: string;
  traditionalDubbingTitle: string;
  traditionalDubbingFeatures: ComparisonFeature[];
  aiDubbingTitle: string;
  aiDubbingFeatures: ComparisonFeature[];
}

export default function HowItWorks({
  badgeText,
  title,
  subtitle,
  steps,
  comparisonTitle,
  comparisonSubtitle,
  traditionalDubbingTitle,
  traditionalDubbingFeatures,
  aiDubbingTitle,
  aiDubbingFeatures,
}: HowItWorksProps) {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-100 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gray-50 rounded-full animate-pulse animation-delay-2000 opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-50 rounded-full animate-pulse animation-delay-4000 opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
            <span className="text-gray-700 text-sm font-medium">{badgeText}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center group hover-lift"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="text-sm font-bold text-gray-600 mb-3 bg-gray-100 rounded-full px-3 py-1 inline-block">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="max-w-6xl mx-auto mt-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {comparisonTitle}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {comparisonSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Dubbing */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover-lift">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gray-400 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">❌</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{traditionalDubbingTitle}</h4>
              </div>
              
              <div className="space-y-6">
                {traditionalDubbingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-gray-500 mr-4 mt-1 text-lg">•</span>
                    <div>
                      <span className="text-gray-800 font-semibold">{feature.text}</span>
                      <p className="text-gray-600 text-sm mt-1">{feature.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* DubTitle AI */}
            <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover-lift relative">
              <div className="absolute -top-4 right-6 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Recommended
              </div>
              
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gray-400 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">✅</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{aiDubbingTitle}</h4>
              </div>
              
              <div className="space-y-6">
                {aiDubbingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-gray-600 mr-4 mt-1 text-lg">•</span>
                    <div>
                      <span className="text-gray-800 font-semibold">{feature.text}</span>
                      <p className="text-gray-600 text-sm mt-1">{feature.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}