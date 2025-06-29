import Image from 'next/image';

export default function LogoCloud() {
  const logos = [
    { name: "Netflix", icon: "🎬", image: "/logos/netflix.webp" },
    { name: "YouTube", icon: "📺", image: "/logos/youtube.webp" },
    // { name: "Disney", icon: "🏰", image: "/logos/disney.png" },
    { name: "Amazon", icon: "📦", image: "/logos/amazon.webp" },
    // { name: "Apple", icon: "🍎", image: "/logos/apple.png" },
    { name: "Microsoft", icon: "🪟", image: "/logos/microsoft.webp" },
    { name: "Google", icon: "🔍", image: "/logos/google.webp" },
    // { name: "Meta", icon: "👥", image: "/logos/meta.png" }
  ];

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg font-medium mb-8">
            Trusted by content creators and companies worldwide
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {logos.map((logo, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-4 transition-all duration-300 hover:scale-110"
            >
              {logo.image ? (
                <div className="w-12 h-12 mb-2 transition-opacity relative">
                  <Image
                    src={logo.image}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-4xl mb-2 transition-opacity">
                  {logo.icon}
                </div>
              )}
              <span className="text-gray-500 text-sm font-medium">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">98%</span>
              <span className="ml-2 text-sm">Customer Satisfaction</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">500+</span>
              <span className="ml-2 text-sm">Minutes Dubbed</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">24/7</span>
              <span className="ml-2 text-sm">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 