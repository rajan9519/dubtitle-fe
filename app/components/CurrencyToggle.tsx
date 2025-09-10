'use client';

import { useCurrency } from '../../lib/currency-context';

interface CurrencyToggleProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export default function CurrencyToggle({ className = '', variant = 'dark' }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${
        isDark 
          ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
          : 'bg-gray-100 border border-gray-200'
      } rounded-full p-1 flex`}>
        <button
          onClick={() => setCurrency('USD')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            currency === 'USD'
              ? isDark
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-blue-600 text-white shadow-lg'
              : isDark
                ? 'text-white hover:text-purple-300'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          USD ($)
        </button>
        <button
          onClick={() => setCurrency('INR')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            currency === 'INR'
              ? isDark
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-blue-600 text-white shadow-lg'
              : isDark
                ? 'text-white hover:text-purple-300'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          INR (₹)
        </button>
      </div>
      {currency === 'INR' && (
        <p className={`text-xs ml-4 ${
          isDark ? 'text-red-200' : 'text-gray-500'
        }`}>
          @ ₹90 per USD
        </p>
      )}
    </div>
  );
}

