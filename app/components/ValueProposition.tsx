'use client';

import { useCurrency } from '../../lib/currency-context';
import { convertPrice, formatPrice } from '../../lib/pricing';

export default function ValueProposition() {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "YouTube Creator, 500K subscribers",
      content: "DubTitle saved me thousands of dollars and weeks of time. I can now reach Spanish and French audiences with the same quality as my English content.",
      avatar: "👨🏽‍💼"
    },
    {
      name: "Priya Sharma",
      role: "Educational Content Creator",
      content: "The voice cloning is incredible. My students in different countries can learn in their native language while still hearing my actual voice.",
      avatar: "👩🏽‍🏫"
    },
    {
      name: "Marcus Johnson",
      role: "Business Owner",
      content: "We localized our entire training library in 6 languages in just one week. This would have taken months and cost us over $50,000 traditionally.",
      avatar: "👨🏿‍💼"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What our users say
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Real feedback from creators who transformed their content reach
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your content is processed securely and deleted after processing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Get your dubbed videos in minutes, not days or weeks</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Studio Quality</h3>
              <p className="text-gray-600">Professional-grade results that sound natural and authentic</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}