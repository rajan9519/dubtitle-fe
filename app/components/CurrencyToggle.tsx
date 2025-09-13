'use client';

import { useCurrency } from '../../lib/currency-context';

interface CurrencyToggleProps {
  className?: string;
  variant?: 'dark' | 'light';
  showExchangeRate?: boolean;
}

export default function CurrencyToggle({ className = '', variant = 'dark' }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${
        isDark 
          ? 'bg-white/20 backdrop-blur-sm border-2 border-white/30' 
          : 'bg-gray-200 border-2 border-gray-300'
      } rounded-full p-1 flex shadow-lg`}>
        <button
          onClick={() => setCurrency('USD')}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            currency === 'USD'
              ? isDark
                ? 'bg-white text-black shadow-lg transform scale-105'
                : 'bg-black text-white shadow-lg transform scale-105'
              : isDark
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-gray-700 hover:text-black hover:bg-gray-100'
          }`}
        >
          USD ($)
        </button>
        <button
          onClick={() => setCurrency('INR')}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            currency === 'INR'
              ? isDark
                ? 'bg-white text-black shadow-lg transform scale-105'
                : 'bg-black text-white shadow-lg transform scale-105'
              : isDark
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-gray-700 hover:text-black hover:bg-gray-100'
          }`}
        >
          INR (₹)
        </button>
      </div>
    </div>
  );
}

