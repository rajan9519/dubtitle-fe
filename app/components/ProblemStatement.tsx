export default function ProblemStatement() {
  const features = [
    {
      icon: "🎯",
      title: "Voice cloning technology",
      description: "Our AI preserves the original speaker's voice characteristics, tone, and emotion across languages."
    },
    {
      icon: "🔄",
      title: "Natural speech patterns",
      description: "Advanced algorithms maintain natural rhythm and flow for authentic-sounding results."
    },
    {
      icon: "⚡",
      title: "Lightning fast",
      description: "What takes traditional studios weeks, we accomplish in minutes with cutting-edge AI processing."
    },
    {
      icon: "🌍",
      title: "29 languages",
      description: "Expand your reach globally with support for major world languages and regional dialects."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powered by breakthrough AI
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our advanced AI technology delivers studio-quality dubbing that preserves emotion 
            and sounds completely natural.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="max-w-4xl mx-auto mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Perfect for</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Content Creators</h4>
              <p className="text-gray-600">YouTubers, TikTokers, and social media influencers expanding globally</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Businesses</h4>
              <p className="text-gray-600">Companies creating multilingual marketing and training content</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Educators</h4>
              <p className="text-gray-600">Teachers and trainers making content accessible worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}