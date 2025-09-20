'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, User, redirectToLogin, isAuthenticated } from '../../lib/auth';
import { pricingPlans, PricingPlan, formatPrice, getPriceForTimeRange, getOriginalPriceForTimeRange, getCheckoutUrlForTimeRange } from '../../lib/pricing';
import { useCurrency } from '../../lib/currency-context';
import CurrencyToggle from '../components/CurrencyToggle';

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const { currency } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handlePlanSelect = async (plan: PricingPlan) => {
    if (plan.id === 'free') {
      // For free plan, redirect to signup or dashboard
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/signup');
      }
      return;
    }

    // For paid plans, go directly to LemonSqueezy payment
    if (plan.buttonAction === 'checkout') {
      setProcessingPlan(plan.id);
      
      try {
        // Check if user is authenticated first
        const userAuthenticated = await isAuthenticated();
        
        if (!userAuthenticated) {
          // If not authenticated, redirect to login with return URL to come back to pricing
          redirectToLogin(`${window.location.origin}/pricing`);
          return;
        }
        
        // User is authenticated, proceed directly to LemonSqueezy
        const checkoutUrlString = getCheckoutUrlForTimeRange(plan);
        if (!checkoutUrlString) {
          alert('Checkout URL not configured. Please contact support.');
          setProcessingPlan(null);
          return;
        }
        
        // Open LemonSqueezy checkout with user email pre-filled
        const checkoutUrl = new URL(checkoutUrlString);
        if (user?.email) {
          checkoutUrl.searchParams.set('checkout[email]', user.email);
          checkoutUrl.searchParams.set('checkout[custom][email]', user.email);
        }
      
        if (user?.id) {
          checkoutUrl.searchParams.set('checkout[custom][user_id]', user.id);
        }
        
        window.open(checkoutUrl.toString(), '_blank', 'noopener,noreferrer');
      } catch (error) {
        console.error('Error processing plan selection:', error);
        // Fallback to login on error
        redirectToLogin(`${window.location.origin}/pricing`);
      } finally {
        setProcessingPlan(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-100 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gray-50 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 container mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-black text-xl font-semibold">DubTitle</span>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                Dashboard
              </button>
              <span className="text-gray-600">Welcome, {user.email}</span>
            </>
          ) : (
            <button
              onClick={() => router.push('/')}
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              ← Back to Home
            </button>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Unlock the power of AI dubbing with our flexible pricing plans. 
              From getting started to scaling your business, we have the perfect plan for you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <CurrencyToggle variant="light"/>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="mb-12">
            <div className="flex gap-6 overflow-x-auto pb-4 px-2 pt-8 scrollbar-hide">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`
                    flex-shrink-0 w-80
                    ${plan.popular 
                      ? 'bg-white text-gray-900 rounded-3xl p-8 text-center relative transform scale-105 shadow-2xl flex flex-col border-4 border-black' 
                      : 'bg-white border border-gray-200 rounded-3xl p-8 text-center flex flex-col shadow-lg'
                    }
                  `}
                >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Most popular
                  </div>
                )}
                
                <div className={`text-lg font-medium mb-2 ${plan.popular ? 'text-gray-700 mt-4' : 'text-gray-700'}`}>
                  {plan.name}
                </div>
                
                <div className={`text-4xl font-bold mb-4 ${plan.popular ? 'text-gray-900' : 'text-gray-900'}`}>
                  {(() => {
                    const originalPrice = getOriginalPriceForTimeRange(plan, currency);
                    const currentPrice = getPriceForTimeRange(plan, currency);
                    const shouldShowOriginal = originalPrice && originalPrice !== currentPrice;
                    
                    return (
                      <>
                        {shouldShowOriginal && (
                          <span className={`line-through mr-2 ${plan.popular ? 'text-gray-500' : 'text-gray-500'}`}>
                            {formatPrice(originalPrice, currency)}
                          </span>
                        )}
                        <span className={plan.popular ? 'text-gray-900' : 'text-gray-900'}>
                          {formatPrice(currentPrice, currency)}
                        </span>
                      </>
                    );
                  })()}
                </div>
                
                <div className={`mb-6 ${plan.popular ? 'text-gray-600' : 'text-gray-600'}`}>
                  {plan.duration} {'/ month'}
                </div>
                
                <ul className="space-y-3 mb-8 text-left flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className={`mr-2 ${plan.popular ? 'text-green-500' : 'text-green-500'}`}>✓</span>
                      <span className={plan.popular ? 'text-gray-700' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                  {plan.warningFeatures?.map((feature, featureIndex) => (
                    <li key={`warning-${featureIndex}`} className="flex items-center">
                      <span className="text-orange-500 mr-2">⚠</span>
                      <span className={plan.popular ? 'text-gray-700' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handlePlanSelect(plan)}
                  disabled={processingPlan === plan.id}
                  className={`
                    w-full py-4 font-bold rounded-lg transition-all duration-300 mt-auto cursor-pointer
                    disabled:opacity-70 disabled:cursor-not-allowed
                    ${plan.popular 
                      ? 'bg-black text-white hover:bg-gray-800 disabled:hover:bg-black' 
                      : 'bg-black text-white hover:bg-gray-800 disabled:hover:bg-black'
                    }
                  `}
                >
                  {processingPlan === plan.id ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </div>
            ))}
            </div>
          </div>

          {/* Security and Support */}
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-900 font-semibold">30-Day Money Back</p>
                <p className="text-gray-600 text-sm">Risk-free guarantee</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-gray-900 font-semibold">Secure Payments</p>
                <p className="text-gray-600 text-sm">Powered by LemonSqueezy</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 6v6m0 0v6m6-6H6" />
                  </svg>
                </div>
                <p className="text-gray-900 font-semibold">Cancel Anytime</p>
                <p className="text-gray-600 text-sm">No long-term commitment</p>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 max-w-2xl mx-auto">
              <p className="text-gray-700 leading-relaxed mb-4">
                Need custom limits or have questions about enterprise pricing? We&apos;ll help you find the perfect solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="/contact"
                  className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Contact Sales Team
                </a>
                <span className="text-gray-600">or</span>
                <a 
                  href="mailto:rajan@dubtitle.com" 
                  className="text-gray-700 hover:text-black underline font-medium transition-colors"
                >
                  rajan@dubtitle.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
