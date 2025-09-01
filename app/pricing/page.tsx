'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, User, redirectToLogin, isAuthenticated } from '../../lib/auth';
import { pricingPlans, PricingPlan } from '../../lib/pricing';

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
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
        if (!plan.checkoutUrl) {
          alert('Checkout URL not configured. Please contact support.');
          setProcessingPlan(null);
          return;
        }
        
        // Open LemonSqueezy checkout with user email pre-filled
        const checkoutUrl = new URL(plan.checkoutUrl);
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
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-white text-2xl font-bold">DubTitle</span>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-white hover:text-purple-300 transition-colors"
              >
                Dashboard
              </button>
              <span className="text-red-200">Welcome, {user.email}</span>
            </>
          ) : (
            <button
              onClick={() => router.push('/')}
              className="text-white hover:text-purple-300 transition-colors"
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Unlock the power of AI dubbing with our flexible pricing plans. 
              From getting started to scaling your business, we have the perfect plan for you.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`
                  ${plan.popular 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-center relative transform scale-105 shadow-2xl flex flex-col' 
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center flex flex-col'
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    🔥 MOST POPULAR
                  </div>
                )}
                
                <div className={`text-lg font-medium mb-2 ${plan.popular ? 'text-orange-900 mt-4' : 'text-red-200'}`}>
                  {plan.name}
                </div>
                
                <div className={`text-4xl font-bold mb-4 ${plan.popular ? 'text-white' : ''}`}>
                  {plan.originalPrice && (
                    <span className={`line-through mr-2 ${plan.popular ? 'text-orange-200' : 'text-red-300'}`}>
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span className={plan.popular ? '' : 'text-yellow-300'}>
                    ${plan.price}
                  </span>
                </div>
                
                <div className={`mb-6 ${plan.popular ? 'text-orange-100' : 'text-red-100'}`}>
                  {plan.duration}
                </div>
                
                <ul className="space-y-3 mb-8 text-left flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className={`mr-2 ${plan.popular ? 'text-green-600' : 'text-green-400'}`}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.warningFeatures?.map((feature, featureIndex) => (
                    <li key={`warning-${featureIndex}`} className="flex items-center">
                      <span className="text-red-400 mr-2">⚠</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handlePlanSelect(plan)}
                  disabled={processingPlan === plan.id}
                  className={`
                    w-full py-4 font-bold rounded-xl transition-all duration-300 mt-auto cursor-pointer
                    disabled:opacity-70 disabled:cursor-not-allowed
                    ${plan.popular 
                      ? 'bg-white text-orange-600 hover:bg-gray-100 disabled:hover:bg-white' 
                      : 'bg-white text-purple-600 hover:bg-gray-100 disabled:hover:bg-white'
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

          {/* Security and Support */}
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white font-semibold">30-Day Money Back</p>
                <p className="text-red-200 text-sm">Risk-free guarantee</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-white font-semibold">Secure Payments</p>
                <p className="text-red-200 text-sm">Powered by LemonSqueezy</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 6v6m0 0v6m6-6H6" />
                  </svg>
                </div>
                <p className="text-white font-semibold">Cancel Anytime</p>
                <p className="text-red-200 text-sm">No long-term commitment</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto">
              <p className="text-red-100 leading-relaxed">
                Need custom limits or have questions about enterprise pricing?{' '}
                <a 
                  href="mailto:rajan@dubtitle.com" 
                  className="text-yellow-300 hover:text-yellow-200 underline font-medium transition-colors"
                >
                  Contact us at rajan@dubtitle.com
                </a>
                {' '}and we&apos;ll help you find the perfect solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
