"use client";

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

export default function FAQ({ title, subtitle, faqs }: FAQProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p className="text-xl text-gray-600">
              {subtitle}
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
                    <p 
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
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