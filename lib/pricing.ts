// Pricing configuration for LemonSqueezy integration

export type Currency = 'USD' | 'INR';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceINR: number;
  originalPrice?: number;
  originalPriceINR?: number;
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

export const getPriceForTimeRange = (plan: PricingPlan, currency: Currency): number => {
  if (currency === 'INR') {
    return plan.priceINR;
  }
  return plan.price;
};

export const getOriginalPriceForTimeRange = (plan: PricingPlan, currency: Currency): number | undefined => {
  if (currency === 'INR' && plan.originalPriceINR) {
    return plan.originalPriceINR;
  }
  return plan.originalPrice;
};

export const getCheckoutUrlForTimeRange = (plan: PricingPlan): string | undefined => {
  return plan.checkoutUrl;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'FREE',
    price: 0,
    priceINR: 0,
    duration: '5 minutes of dubbing',
    maxPerVideoMinutes: 1,
    features: [
      'AI dubbing in 30 languages',
      'Advanced Voice cloning',
      'HD quality output',
      'Maximum 60 seconds per video/audio',
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
    price: 5,
    priceINR: 399,
    originalPrice: 7,
    originalPriceINR: 599,
    duration: '10 minutes of dubbing',
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
    buttonAction: 'checkout'
  },
  {
    id: 'creator',
    name: 'CREATOR',
    price: 22,
    priceINR: 1799,
    originalPrice: 30,
    originalPriceINR: 2499,
    duration: '45 minutes of dubbing',
    maxPerVideoMinutes: 10,
    features: [
      'Everything in Starter',
      // 'Maximum 30 minutes per video/audio'
    ],
    checkoutUrl: process.env.NEXT_PUBLIC_LEMONSQUEEZY_CREATOR_CHECKOUT_URL,
    checkoutPath: '/checkout/creator',
    buttonText: 'Get Creator Plan',
    buttonAction: 'checkout',
    popular: true
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    price: 45,
    priceINR: 4049,
    originalPrice: 49,
    originalPriceINR: 4049,
    duration: '100 minutes of dubbing',
    maxPerVideoMinutes: 10,
    features: [
      'Everything in Creator',
      // 'Maximum 30 minutes per video/audio'
    ],
    checkoutUrl: process.env.NEXT_PUBLIC_LEMONSQUEEZY_PROFESSIONAL_CHECKOUT_URL,
    checkoutPath: '/checkout/professional',
    buttonText: 'Get Professional Plan',
    buttonAction: 'checkout'
  },
  {
    id: 'scale',
    name: 'SCALE',
    price: 99,
    priceINR: 8499,
    originalPrice: 99,
    originalPriceINR: 8499,
    duration: '250 minutes of dubbing',
    maxPerVideoMinutes: 10,
    features: [
      'Everything in Creator',
      // 'Maximum 30 minutes per video/audio'
    ],
    checkoutUrl: process.env.NEXT_PUBLIC_LEMONSQUEEZY_SCALE_CHECKOUT_URL,
    checkoutPath: '/checkout/professional',
    buttonText: 'Get Scale Plan',
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
