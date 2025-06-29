export default function ProblemStatement() {
  const problems = [
    {
      icon: "⏰",
      title: "Weeks of Waiting",
      description: "Traditional dubbing takes 2-6 weeks minimum",
      example: "Your viral video loses momentum while waiting for translation"
    },
    {
      icon: "💸",
      title: "Sky-High Costs",
      description: "$100-500+ per video for professional dubbing",
      example: "Small creators can't afford professional voice actors"
    },
    {
      icon: "🎭",
      title: "Inconsistent Quality",
      description: "Voice actors may not match your content's tone",
      example: "Energetic content dubbed with monotone voices"
    },
    {
      icon: "🌍",
      title: "Limited Reach",
      description: "Miss out on 75% of global audience",
      example: "English-only content excludes billions of potential viewers"
    }
  ];

  return (
    <section className="py-20 bg-red-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚨 The Current Reality
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Content Creators Are <span className="text-red-600">Struggling</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            While your content could reach billions globally, language barriers and traditional dubbing limitations 
            are keeping you stuck with local audiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 mb-4 font-medium">{problem.description}</p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <p className="text-red-700 text-sm italic">&quot;{problem.example}&quot;</p>
              </div>
            </div>
          ))}
        </div>

        {/* Real scenario */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sound Familiar?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">JM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">James Miller</div>
                    <div className="text-gray-600 text-sm">YouTube Creator, 500K subscribers</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  &quot;I created an amazing tutorial that went viral in English. But I&apos;m missing out on 
                  Spanish, French, and German audiences. Professional dubbing costs more than I make 
                  from the video!&quot;
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-red-50 rounded-2xl p-6">
                <h4 className="font-bold text-red-900 mb-4">The Hard Truth:</h4>
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>75% of internet users don&apos;t speak English as first language</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Multilingual content gets 3x more engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>You&apos;re leaving money on the table every day</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 