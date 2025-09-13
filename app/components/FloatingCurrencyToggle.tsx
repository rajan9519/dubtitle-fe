'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCurrency } from '../../lib/currency-context';

export default function FloatingCurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  // Only show on home page and pricing page
  const shouldShow = pathname === '/' || pathname === '/pricing';
  
  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`transition-all duration-300 ${isExpanded ? 'w-auto' : 'w-14'}`}>
        {isExpanded ? (
          // Expanded view with both currency options
          <div className="bg-white/95 backdrop-blur-sm border-2 border-gray-300 rounded-full p-1 flex items-center shadow-xl">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                currency === 'USD'
                  ? 'bg-black text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                currency === 'INR'
                  ? 'bg-black text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="ml-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
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
            className="w-16 h-16 bg-black hover:bg-gray-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-white"
            title={`Current currency: ${currency === 'USD' ? 'US Dollar' : 'Indian Rupee'} - Click to change`}
          >
            <div className="text-center">
              <div className="text-lg font-bold">
                {currency === 'USD' ? '$' : '₹'}
              </div>
              <div className="text-xs font-medium opacity-90">
                {currency}
              </div>
            </div>
            
            {/* Hover indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg border border-gray-300">
              <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
