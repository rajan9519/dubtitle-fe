'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How accurate is the AI dubbing compared to human voice actors?",
      answer: "Our AI achieves 99.2% accuracy in translation and voice matching. We use advanced neural networks trained on millions of hours of speech data. While human voice actors can vary in quality and consistency, our AI delivers consistent, professional results every time. For most content types, viewers cannot distinguish between our AI dubbing and professional human dubbing."
    },
    {
      question: "What languages do you support?",
      answer: "We support 29 languages including Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Hindi, Arabic, Dutch, Swedish, Danish, Polish, Turkish, Greek, Bulgarian, Croatian, Czech, Filipino, Finnish, Indonesian, Malay, Romanian, Slovak, Tamil, and Ukrainian. We're constantly adding new languages based on user demand."
    },
    {
      question: "How long does it take to dub a video?",
      answer: "Most videos are processed in 2-10 minutes depending on length and complexity. A 10-minute video typically takes 8-12 minutes to complete. This includes translation, voice generation, and lip-sync processing. Compare this to traditional dubbing which takes 2-6 weeks!"
    },
    {
      question: "What video formats do you support?",
      answer: "We support all major video formats including MP4, MOV, AVI, WMV, MKV, FLV, and more. Maximum file size is 2GB for individual uploads. We automatically optimize your video for the best dubbing results while maintaining original quality."
    },
    {
      question: "Is my content secure and private?",
      answer: "Yes, we take security very seriously. All uploads are encrypted, we're SOC 2 Type II certified, GDPR compliant, and follow enterprise-grade security practices. Your content is never shared or used for training. You can delete your content anytime, and we automatically delete processed files after 30 days."
    },
    {
      question: "How much does it cost?",
      answer: "We offer three flexible plans: Free ($0) gives you 5 minutes of total dubbing with videos up to 30 seconds each (includes watermark). Starter ($7, originally $10) provides 20 minutes of total dubbing with videos up to 2 minutes each, no watermark. Professional ($25, originally $40) offers 90 minutes of total dubbing with videos up to 10 minutes each. All plans include AI dubbing in 30 languages, voice cloning, and HD quality output."
    },
    {
      question: "Can I try it before buying?",
      answer: "Absolutely! Our free plan gives you 5 minutes of total dubbing to test the quality with no credit card required. You can dub multiple videos up to 30 seconds each to experience our AI dubbing firsthand. The free plan includes all core features like 30-language support and voice cloning, with a small watermark. We also offer a 30-day money-back guarantee on paid plans."
    },
    {
      question: "Do you offer bulk discounts for multiple videos?",
      answer: "Our plans are already designed to provide great value for bulk dubbing with generous minute allowances. The Professional plan gives you 90 minutes of dubbing for just $25. For enterprise customers with high-volume needs, contact our sales team at rajan@dubtitle.com for custom pricing and volume discounts."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            ❓ Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Got Questions? <span className="text-orange-600">We Have Answers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about AI dubbing, pricing, and getting started
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45 bg-orange-500' : ''
                  }`}>
                    <svg 
                      className={`w-4 h-4 transition-colors duration-300 ${
                        openIndex === index ? 'text-white' : 'text-orange-600'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-8">
              Our support team is here to help you succeed. Get answers in minutes, not hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button className="group px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105">
                💬 Live Chat Support
              </button> */}
              <button className="group px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all duration-300 hover:scale-105">
                📧 Email Support
              </button>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>📞 Average response time: 2 minutes</p>
              <p>✅ 24/7 support • ✅ 98% satisfaction rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 