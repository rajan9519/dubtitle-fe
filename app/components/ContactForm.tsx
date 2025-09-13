"use client";

import { useState } from 'react';
import { trackFormSubmission } from './GoogleAnalytics';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dubtitle.com/api';

interface ContactFormProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'modal';
}

export default function ContactForm({ 
  title = "Contact Us",
  description = "Get in touch with our team. We'll respond within 24 hours.",
  className = "",
  variant = "default"
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          domain: 'dubtitle.com'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit. Please try again.');
      }

      setIsSubmitted(true);
      trackFormSubmission('Contact Form', true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      trackFormSubmission('Contact Form', false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`${className}`}>
        <div className={`${variant === 'modal' ? 'bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8' : 'bg-green-50 border border-green-200 rounded-xl p-8'} text-center`}>
          <div className={`w-16 h-16 ${variant === 'modal' ? 'bg-green-500/20' : 'bg-green-500'} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <svg className={`w-8 h-8 ${variant === 'modal' ? 'text-green-400' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold mb-4 ${variant === 'modal' ? 'text-white' : 'text-gray-900'}`}>
            Message Sent Successfully! 🎉
          </h3>
          <p className={`mb-6 ${variant === 'modal' ? 'text-gray-300' : 'text-gray-600'}`}>
            Thank you for contacting us! We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', subject: '', message: '' });
            }}
            className={`px-6 py-3 ${variant === 'modal' ? 'bg-black text-white hover:bg-gray-800' : 'bg-black text-white hover:bg-gray-800'} font-semibold rounded-lg transition-colors`}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className={variant === 'modal' ? 'bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8' : 'bg-white border border-gray-200 rounded-xl p-8 shadow-sm'}>
        {variant !== 'minimal' && (
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 ${variant === 'modal' ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h2>
            <p className={`text-lg ${variant === 'modal' ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-2 ${variant === 'modal' ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                  variant === 'modal' 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-sm' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${variant === 'modal' ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                  variant === 'modal' 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-sm' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${variant === 'modal' ? 'text-gray-300' : 'text-gray-700'}`}>
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                variant === 'modal' 
                  ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-sm' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className={`block text-sm font-medium mb-2 ${variant === 'modal' ? 'text-gray-300' : 'text-gray-700'}`}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-vertical ${
                variant === 'modal' 
                  ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-sm' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          {error && (
            <div className={`border rounded-lg p-4 text-center ${
              variant === 'modal' 
                ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                : 'bg-red-50 border-red-200 text-red-600'
            }`}>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-8 py-4 font-bold text-lg rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              variant === 'modal'
                ? 'bg-black text-white hover:bg-gray-800 hover:shadow-2xl hover:shadow-black/25 transform hover:scale-105 hover:-translate-y-1 disabled:transform-none'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </form>

        <div className={`mt-8 text-center border-t pt-6 ${variant === 'modal' ? 'border-white/20' : 'border-gray-200'}`}>
          <p className={`text-sm mb-3 ${variant === 'modal' ? 'text-gray-300' : 'text-gray-600'}`}>
            Prefer to email us directly?
          </p>
          <a 
            href="mailto:rajan@dubtitle.com"
            className={`inline-flex items-center space-x-2 font-semibold transition-colors ${
              variant === 'modal'
                ? 'text-gray-300 hover:text-gray-200'
                : 'text-black hover:text-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>rajan@dubtitle.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
