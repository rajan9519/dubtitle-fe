'use client';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
}

interface ValuePropositionProps {
  title: string;
  subtitle:string;
  testimonials: Testimonial[];
}

export default function ValueProposition({ title, subtitle, testimonials }: ValuePropositionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          </div>
          
          {/* Horizontal Scroll Carousel */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide scroll-smooth">
              <div className="flex gap-6 pb-4 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed text-sm sm:text-base">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors duration-200 cursor-pointer"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}