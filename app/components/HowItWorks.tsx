export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload your video",
      description: "Simply drag and drop your video file or paste a YouTube link. We support all major formats.",
      icon: "📤"
    },
    {
      number: "02", 
      title: "Choose target language",
      description: "Select from 30+ languages. Our AI analyzes the speech patterns and emotional context.",
      icon: "🌍"
    },
    {
      number: "03",
      title: "AI processes your content", 
      description: "Advanced AI creates natural-sounding dubbing while maintaining lip-sync and emotion.",
      icon: "🤖"
    },
    {
      number: "04",
      title: "Download & share",
      description: "Get your dubbed video in minutes, ready to publish across all platforms.",
      icon: "🎯"
    }
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How it works
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            From upload to download in just 4 simple steps. No technical expertise required.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="text-sm font-medium text-blue-600 mb-2">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Why choose DubTitle?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-red-500 mr-3">❌</span>
                Traditional dubbing
              </h4>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">•</span>
                  <span>2-4 weeks production time</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">•</span>
                  <span>$500-5000+ per video</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">•</span>
                  <span>Complex coordination required</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-3">•</span>
                  <span>Limited language options</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-green-500 mr-3">✅</span>
                DubTitle AI
              </h4>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">•</span>
                  <span>2-10 minutes processing</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">•</span>
                  <span>Starting from ₹649/month</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">•</span>
                  <span>One-click solution</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">•</span>
                  <span>30+ languages available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}