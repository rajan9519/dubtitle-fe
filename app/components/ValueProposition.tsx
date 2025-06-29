export default function ValueProposition() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Excellence",
      description: "Advanced neural networks trained on millions of hours of speech",
      benefit: "Perfect emotion & tone matching"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Complete dubbing in 2-10 minutes, not weeks",
      benefit: "Keep your content momentum"
    },
    {
      icon: "💰",
      title: "99% Cost Reduction",
      description: "From $100-500 to just $1-10 per video",
      benefit: "Affordable for everyone"
    },
    {
      icon: "🎯",
      title: "Perfect Lip Sync (Coming Soon)",
      description: "AI analyzes facial movements for natural synchronization",
      benefit: "Professional studio quality"
    },
    {
      icon: "🌐",
      title: "50+ Languages",
      description: "From Spanish to Mandarin, Hindi to Arabic",
      benefit: "Reach every market"
    },
    {
      icon: "🔧",
      title: "Full Control",
      description: "Adjust speed, tone, accent, and timing to your liking",
      benefit: "Your voice, your way"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            ✨ The Solution You've Been Waiting For
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Makes DubTitle <span className="text-green-600">Revolutionary?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We've solved every pain point in traditional dubbing with cutting-edge AI technology 
            that delivers studio-quality results at breakthrough speed and pricing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-700 text-sm font-medium">✓ {feature.benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Traditional Dubbing vs DubTitle
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">Feature</th>
                  <th className="text-center py-4 px-6 text-red-600 font-medium">Traditional Studios</th>
                  <th className="text-center py-4 px-6 text-green-600 font-medium">DubTitle</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Turnaround Time</td>
                  <td className="py-4 px-6 text-center text-red-600">2-6 weeks</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">2-10 minutes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Cost per Video</td>
                  <td className="py-4 px-6 text-center text-red-600">$100-500+</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">$1-10</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Languages Available</td>
                  <td className="py-4 px-6 text-center text-red-600">5-10 major ones</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">50+ languages</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Revisions</td>
                  <td className="py-4 px-6 text-center text-red-600">$200+ each</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">Unlimited & Free</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">Voice Consistency</td>
                  <td className="py-4 px-6 text-center text-red-600">Varies by actor</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">Always perfect</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">Availability</td>
                  <td className="py-4 px-6 text-center text-red-600">Business hours only</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">24/7 instant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group relative px-12 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <span className="relative z-10">🚀 Start Dubbing Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-gray-600 mt-4">✅ No credit card required • ✅ 7-day free trial</p>
        </div>
      </div>
    </section>
  );
} 