'use client';

import { useState, useEffect } from 'react';
import { useCurrency } from '../../lib/currency-context';

export default function FloatingCurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the toggle after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`transition-all duration-300 ${isExpanded ? 'w-auto' : 'w-14'}`}>
        {isExpanded ? (
          // Expanded view with both currency options
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-1 flex items-center shadow-lg">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currency === 'USD'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currency === 'INR'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          // Collapsed view showing current currency
          <button
            onClick={() => setIsExpanded(true)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            title={`Current currency: ${currency === 'USD' ? 'US Dollar' : 'Indian Rupee'} - Click to change`}
          >
            <div className="text-center">
              <div className="text-xs font-bold">
                {currency === 'USD' ? '$' : '₹'}
              </div>
              <div className="text-xs opacity-80">
                {currency}
              </div>
            </div>
            
            {/* Hover indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
        )}
      </div>
      
      {/* Exchange rate indicator for INR */}
      {isExpanded && currency === 'INR' && (
        <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
          @ ₹90 per USD
        </div>
      )}
    </div>
  );
}
