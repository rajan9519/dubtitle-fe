"use client";

import { useState } from 'react';
import { trackFormSubmission, trackButtonClick } from './GoogleAnalytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://api.subgen.in/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          domain: 'dubtitle.com'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe. Please try again.');
      }

      setIsSubmitted(true);
      setEmail('');
      trackFormSubmission('Newsletter Subscription', true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      trackFormSubmission('Newsletter Subscription', false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white text-2xl font-bold">DubTitle</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Democratizing global content creation with AI-powered dubbing technology. 
              Reach every audience, in every language, in minutes.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <span>🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <span>💼</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <span>📺</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <span>📱</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li> */}
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li> */}
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Languages</a></li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li> */}
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Live Chat</a></li> */}
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status Page</a></li> */}
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li> */}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-12 max-w-md mx-auto">
          <div className="text-center">
            <div>
              <h4 className="font-bold text-white mb-2">📧 Email</h4>
              <p className="text-gray-400">rajan@dubtitle.com</p>
              {/* <p className="text-gray-400">support@dubtitle.com</p> */}
            </div>
            {/* <div>
              <h4 className="font-bold text-white mb-2">💬 Live Chat</h4>
              <p className="text-gray-400">Available 24/7</p>
              <p className="text-gray-400">Average response: 2 minutes</p>
            </div> */}
            {/* <div>
              <h4 className="font-bold text-white mb-2">🏢 Address</h4>
              <p className="text-gray-400">San Francisco, CA</p>
              <p className="text-gray-400">New York, NY</p>
            </div> */}
          </div>
        </div>

        {/* Trust Badges */}
        {/* <div className="flex flex-wrap justify-center items-center gap-8 mb-12 py-8 border-t border-b border-gray-800">
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-green-400">🔒</span>
            <span className="text-sm">SOC 2 Certified</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-blue-400">🛡️</span>
            <span className="text-sm">GDPR Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-purple-400">✅</span>
            <span className="text-sm">ISO 27001</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm">4.9/5 Rating</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-green-400">⚡</span>
            <span className="text-sm">99.9% Uptime</span>
          </div>
        </div> */}

        {/* Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} DubTitle, Inc. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="/acceptable-use" className="hover:text-white transition-colors">Acceptable Use</a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-12 border-t border-gray-800 text-center">
          <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Get the latest updates on new features, languages, and AI dubbing tips
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button 
                type="submit"
                disabled={isLoading}
                onClick={() => trackButtonClick('Newsletter Subscribe', 'Footer')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            
            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-300 text-sm">
                  ✅ Successfully subscribed! You&apos;ll receive updates soon.
                </p>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
          </form>
          
          <p className="text-xs text-gray-500 mt-3">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </footer>
  );
} 