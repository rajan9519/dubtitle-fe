export default function TeamSection() {
  const team = [
    {
      name: "Alex Rivera",
      role: "CEO & Founder",
      avatar: "👨🏽‍💼",
      bio: "Former Google AI researcher with 10+ years in machine learning. Built DubTitle after struggling to translate his own YouTube content.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Sarah Kim",
      role: "CTO",
      avatar: "👩🏻‍💻",
      bio: "Ex-Netflix engineer who led video processing innovations. Passionate about making AI accessible to creators worldwide.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Marcus Chen",
      role: "Head of AI",
      avatar: "👨🏻‍🔬",
      bio: "PhD in Computational Linguistics from MIT. Published 20+ papers on neural voice synthesis and cross-lingual speech processing.",
      linkedin: "#",
      twitter: "#"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            👥 Meet Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Minds Behind <span className="text-blue-600">DubTitle</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            We're a team of AI researchers, engineers, and creators who experienced the pain of traditional dubbing firsthand. 
            Our mission is to democratize global content creation.
          </p>
        </div>

        {/* Founder Message */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-16 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-6xl mb-4">👨🏽‍💼</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Alex Rivera</h3>
              <p className="text-blue-600 font-medium mb-4">CEO & Founder</p>
            </div>
            <div className="flex-1">
              <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                "I spent $5,000 trying to dub my tutorial series into Spanish. It took 3 months, the quality was inconsistent, 
                and I almost gave up on reaching global audiences. That's when I knew there had to be a better way. 
                Today, creators dub their content in minutes for under $100 – that's the transformation I dreamed of."
              </blockquote>
              <div className="text-blue-600 font-medium">
                – Alex Rivera, CEO & Founder
              </div>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="text-5xl mb-4">{member.avatar}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>
              
              <div className="flex justify-center space-x-4">
                <a href={member.linkedin} className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <span className="text-blue-600">💼</span>
                </a>
                <a href={member.twitter} className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <span className="text-blue-600">🐦</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Company Values */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-8">Our Mission</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="text-xl font-bold mb-3">Global Access</h4>
              <p className="text-blue-100">Breaking down language barriers so every creator can reach every audience</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-bold mb-3">Speed & Quality</h4>
              <p className="text-blue-100">Delivering professional results in minutes, not months</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💰</div>
              <h4 className="text-xl font-bold mb-3">Affordable Innovation</h4>
              <p className="text-blue-100">Making advanced AI technology accessible to creators of all sizes</p>
            </div>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-lg font-medium mb-4">🚀 Backed by leading investors</p>
            <div className="flex justify-center items-center space-x-8 text-sm opacity-80">
              <span>🏛️ Andreessen Horowitz</span>
              <span>🎯 Y Combinator</span>
              <span>⚡ Sequoia Capital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 