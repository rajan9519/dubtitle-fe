'use client';

interface TimeRangeToggleProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export default function TimeRangeToggle({ 
  className = '', 
  variant = 'light' 
}: TimeRangeToggleProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${
        isDark 
          ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
          : 'bg-gray-100 border border-gray-200'
      } rounded-full p-1 flex`}>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isDark
              ? 'bg-white text-purple-600 shadow-lg'
              : 'bg-blue-600 text-white shadow-lg'
          }`}
        >
          Monthly
        </button>
      </div>
    </div>
  );
}
