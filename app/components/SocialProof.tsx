export default function SocialProof() {
  const testimonials = [
    {
      name: "Voice Worth Hearing",
      role: "YouTube Creator",
      avatar: "👨🏻‍💻",
      rating: 5,
      text: "I use this to dub famous informative videos in Hindi for Indian people to learn from. My audience can now access valuable educational content in their native language. The quality makes complex topics easy to understand.",
      // metrics: "Educational Hindi dubbing"
    },
    {
      name: "Lakshit Ukani",
      role: "Udemy Instructor",
      subscribers: "Online Educator",
      avatar: "👨🏽‍🏫",
      rating: 4,
      text: "I'm using this for my Udemy courses and it's been a game changer. Students from different countries can now access my content in their native languages. The technical accuracy is spot on.",
      // metrics: "Multiple course languages"
    },
    {
      name: "Somorik",
      role: "Content Enthusiast",
      subscribers: "Personal User",
      avatar: "👨🏻‍🎬",
      rating: 5,
      text: "I use this to dub US shows in Russian for my personal enjoyment. It's amazing how I can now enjoy my favorite American series in Russian. The voice quality makes it feel natural.",
      // metrics: "Personal entertainment"
    },
    {
      name: "Riley P.",
      role: "Indie Filmmaker",
      subscribers: "Film Student",
      avatar: "👩🏼‍🎬",
      rating: 4,
      text: "Used it for my short film festival submissions. The quality varies by language - French was great, Mandarin needed some tweaks. But hey, it got my film seen internationally.",
      // metrics: "8 festival submissions"
    }
  ];

  const trustBadges = [
    { icon: "🔒", title: "SOC 2 Certified" },
    { icon: "🛡️", title: "Enterprise Security" },
    { icon: "⚡", title: "99.9% Uptime" },
    { icon: "🌍", title: "Global CDN" },
    { icon: "📞", title: "24/7 Support" },
    { icon: "💳", title: "Secure Payments" }
  ];

  const stats = [
    { number: "100+", label: "Minutes Dubbed", icon: "🎬" },
    { number: "10+", label: "Happy Creators", icon: "😊" },
    { number: "30+", label: "Languages", icon: "🌍" },
    { number: "99.2%", label: "Accuracy Rate", icon: "🎯" },
    { number: "2min", label: "Average Time", icon: "⚡" },
    { number: "4.8/5", label: "User Rating", icon: "⭐" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Statistics */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            📊 Proven Results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by <span className="text-purple-600">Creators Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of content creators who have transformed their reach with AI dubbing
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-purple-600 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-purple-600 text-xs font-medium">{testimonial.subscribers}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                
                {/* <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="text-purple-700 text-sm font-bold">Result: {testimonial.metrics}</div>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Video Testimonial */}
        {/* <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-12 text-white text-center mb-20">
          <h3 className="text-3xl font-bold mb-6">🎥 See Real Success Stories</h3>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Watch how creators like you transformed their content reach and revenue
          </p>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-800 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 hover:scale-110 transition-transform cursor-pointer">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-white text-sm font-medium">Customer Success Stories</div>
                  <div className="text-gray-300 text-xs">3:24 • Watch how creators boosted their reach</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Trust Badges */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            🛡️ Security & Trust You Can Count On
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-3xl mb-3">{badge.icon}</div>
                <div className="text-gray-900 font-medium text-sm">{badge.title}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-gray-600">
            <p className="mb-4">🔐 Your data is protected with enterprise-grade security</p>
            <p>✅ GDPR Compliant • ✅ SOC 2 Type II • ✅ ISO 27001</p>
          </div>
        </div>
      </div>
    </section>
  );
} 