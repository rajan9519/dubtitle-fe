// Pricing configuration for LemonSqueezy integration

export type Currency = 'USD' | 'INR';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  maxPerVideoMinutes: number;
  features: string[];
  checkoutUrl?: string;
  checkoutPath?: string; // Internal path for checkout pages
  buttonText: string;
  buttonAction: 'free' | 'checkout';
  popular?: boolean;
  warningFeatures?: string[];
}

// Currency conversion utility
export const EXCHANGE_RATE_USD_TO_INR = 90;

export const convertPrice = (priceUSD: number, currency: Currency): number => {
  if (currency === 'INR') {
    return Math.round(priceUSD * EXCHANGE_RATE_USD_TO_INR);
  }
  return priceUSD;
};

export const formatPrice = (price: number, currency: Currency): string => {
  if (currency === 'INR') {
    return `₹${price}`;
  }
  return `$${price}`;
};

export const getCurrencySymbol = (currency: Currency): string => {
  return currency === 'INR' ? '₹' : '$';
};

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'FREE',
    price: 0,
    duration: '5 minutes of dubbing',
    maxPerVideoMinutes: 0.5,
    features: [
      'AI dubbing in 30 languages',
      'Advanced Voice cloning',
      'HD quality output',
      'Maximum 30 seconds per video/audio',
      '5 voice style options',
      'Email support'
    ],
    warningFeatures: ['Includes watermark'],
    buttonText: 'Get Started Free',
    buttonAction: 'free'
  },
  {
    id: 'starter',
    name: 'STARTER',
    price: 7,
    originalPrice: 10,
    duration: '20 minutes of dubbing',
    maxPerVideoMinutes: 2,
    features: [
      'Everything in Free',
      'No watermark',
      'Unlimited duration per video/audio',
      'Priority processing'
    ],
    checkoutUrl: process.env.NEXT_PUBLIC_LEMONSQUEEZY_STARTER_CHECKOUT_URL,
    checkoutPath: '/checkout/starter',
    buttonText: 'Get Starter Plan',
    buttonAction: 'checkout',
    popular: true
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    price: 25,
    originalPrice: 40,
    duration: '90 minutes of dubbing',
    maxPerVideoMinutes: 10,
    features: [
      'Everything in Starter',
      // 'Maximum 30 minutes per video/audio'
    ],
    checkoutUrl: process.env.NEXT_PUBLIC_LEMONSQUEEZY_PROFESSIONAL_CHECKOUT_URL,
    checkoutPath: '/checkout/professional',
    buttonText: 'Get Professional Plan',
    buttonAction: 'checkout'
  }
];

// Helper function to open LemonSqueezy checkout
export const openCheckout = (checkoutUrl: string) => {
  if (!checkoutUrl) {
    console.error('Checkout URL is not configured');
    return;
  }
  
  // Open checkout in a new tab/window
  window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
};

// Alternative: Open checkout in same window
export const openCheckoutSameWindow = (checkoutUrl: string) => {
  if (!checkoutUrl) {
    console.error('Checkout URL is not configured');
    return;
  }
  
  window.location.href = checkoutUrl;
};
