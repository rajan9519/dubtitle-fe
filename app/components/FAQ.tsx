"use client";

import { useState } from 'react';

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How accurate is the AI dubbing?",
      answer: "Our AI dubbing achieves 95%+ accuracy in voice replication and maintains natural speech patterns. The technology preserves emotion, tone, and speaking style for authentic results."
    },
    {
      question: "What languages do you support?",
      answer: "We support 29 languages including Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Hindi, Arabic, Dutch, Swedish, Danish, Polish, Turkish, Greek, Bulgarian, Croatian, Czech, Filipino, Finnish, Indonesian, Malay, Romanian, Slovak, Tamil, and Ukrainian. We're constantly adding new languages based on user demand."
    },
    {
      question: "How long does it take to dub a video?",
      answer: "Most videos are processed within 2-10 minutes, depending on length and complexity. Short videos (under 5 minutes) typically complete in under 2 minutes."
    },
    {
      question: "Can I use my own voice for dubbing?",
      answer: "Yes! You can clone your own voice and use it for dubbing in different languages. This maintains consistency across your multilingual content."
    },
    {
      question: "What video formats do you support?",
      answer: "We support all major video formats including MP4, MOV, AVI, MKV, and more. You can also directly import from YouTube, Vimeo, and other platforms."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! You get 5 minutes of free dubbing to test our platform. No credit card required to get started."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our AI dubbing platform
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}