"use client";

import { useState } from 'react';
import { useCurrency } from '../../lib/currency-context';
import { formatPrice, convertPrice, pricingPlans } from '../../lib/pricing';

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { currency } = useCurrency();

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
      question: "Is my content secure and private?",
      answer: "Yes, we take security very seriously. All uploads are encrypted, we're SOC 2 Type II certified, GDPR compliant, and follow enterprise-grade security practices. Your content is never shared or used for training. You can delete your content anytime, and we automatically delete processed files after 30 days."
    },
    {
      question: "How much does it cost?",
      answer: `We offer three flexible plans: Free (${formatPrice(0, currency)}) gives you 5 minutes of total dubbing with videos up to 30 seconds each (includes watermark). Starter (${formatPrice(convertPrice(pricingPlans[1].price, currency), currency)}, originally ${formatPrice(convertPrice(pricingPlans[1].originalPrice || 10, currency), currency)}) provides 20 minutes of total dubbing with videos up to 2 minutes each, no watermark. Professional (${formatPrice(convertPrice(pricingPlans[2].price, currency), currency)}, originally ${formatPrice(convertPrice(pricingPlans[2].originalPrice || 40, currency), currency)}) offers 90 minutes of total dubbing with videos up to 10 minutes each. All plans include AI dubbing in 30 languages, voice cloning, and HD quality output.`
    },
    {
      question: "Can I try it before buying?",
      answer: "Absolutely! Our free plan gives you 5 minutes of total dubbing to test the quality with no credit card required. You can dub multiple videos up to 30 seconds each to experience our AI dubbing firsthand. The free plan includes all core features like 30-language support and voice cloning, with a small watermark. We also offer a 30-day money-back guarantee on paid plans."
    },
    {
      question: "Do you offer bulk discounts for multiple videos?",
      answer: `Our plans are already designed to provide great value for bulk dubbing with generous minute allowances. The Professional plan gives you 90 minutes of dubbing for just ${formatPrice(convertPrice(pricingPlans[2].price, currency), currency)}. For enterprise customers with high-volume needs, contact our sales team at rajan@dubtitle.com for custom pricing and volume discounts.`
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