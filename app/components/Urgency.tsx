'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { pricingPlans, PricingPlan, convertPrice, formatPrice } from '../../lib/pricing';
import { isAuthenticated, redirectToLogin } from '../../lib/auth';
import { useCurrency } from '../../lib/currency-context';
import CurrencyToggle from './CurrencyToggle';

export default function Urgency() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { currency } = useCurrency();

  const handlePlanAction = async (plan: PricingPlan) => {
    if (plan.buttonAction === 'free') {
      setLoadingPlan(plan.id);
      // For free plan, redirect to login with dashboard as return URL
      redirectToLogin(`${window.location.origin}/dashboard`);
      return;
    } 
    
    if (plan.buttonAction === 'checkout') {
      setLoadingPlan(plan.id);
      
      try {
        // Check if user is authenticated first
        const userAuthenticated = await isAuthenticated();
        
        if (!userAuthenticated) {
          // If not authenticated, redirect to login with return URL to come back to pricing
          redirectToLogin(`${window.location.origin}${plan.checkoutPath || '/checkout/starter'}`);
          return;
        }
        
        // If authenticated, navigate to internal checkout page
        if (plan.checkoutPath) {
          router.push(plan.checkoutPath);
        } else {
          console.error('Checkout path not configured for plan:', plan.name);
          // User is authenticated but plan misconfigured - go to starter checkout as fallback
          router.push('/checkout/starter');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Fallback to login on error with return URL
        redirectToLogin(`${window.location.origin}${plan.checkoutPath || '/checkout/starter'}`);
      } finally {
        setLoadingPlan(null);
      }
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-red-500 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with Currency Toggle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Choose Your Plan
          </h2>
          <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed mb-8">
            Start your AI dubbing journey today. Pick the plan that fits your needs.
          </p>
          <CurrencyToggle className="mb-8" />
        </div>

        {/* <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🔥 Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Launch Special: <span className="text-yellow-300">50% OFF</span>
          </h2>
          <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed mb-8">
            We&apos;re celebrating our launch with an exclusive discount for early adopters. 
            This offer expires soon – don&apos;t miss out!
          </p>
        </div> */}

        {/* Countdown Timer */}
        {/* <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-12 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">⏰ Offer Expires In:</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-3xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="text-sm text-red-100">Days</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-sm text-red-100">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-sm text-red-100">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-sm text-red-100">Seconds</div>
            </div>
          </div>
        </div> */}

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
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
                    {formatPrice(convertPrice(plan.originalPrice, currency), currency)}
                  </span>
                )}
                <span className={plan.popular ? '' : 'text-yellow-300'}>
                  {formatPrice(convertPrice(plan.price, currency), currency)}
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
                onClick={() => handlePlanAction(plan)}
                disabled={loadingPlan === plan.id}
                className={`
                  w-full py-4 font-bold rounded-xl transition-all duration-300 mt-auto cursor-pointer
                  disabled:opacity-70 disabled:cursor-not-allowed
                  ${plan.popular 
                    ? 'bg-white text-orange-600 hover:bg-gray-100 disabled:hover:bg-white' 
                    : 'bg-white text-purple-600 hover:bg-gray-100 disabled:hover:bg-white'
                  }
                `}
              >
                {loadingPlan === plan.id ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {plan.buttonAction === 'checkout' ? 'Checking auth...' : 'Loading...'}
                  </div>
                ) : (
                  plan.buttonText
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Limited Spots */}
        {/* <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">⚡ Limited Beta Spots Available</h3>
          <p className="text-red-100 mb-6">
            Only <span className="text-yellow-300 font-bold">47 spots</span> remaining in our launch beta program. 
            Secure your access now before we reach capacity!
          </p>
          
          <div className="bg-white/20 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-red-400 h-full rounded-full" style={{width: '76%'}}></div>
          </div>
          
          <p className="text-sm text-red-200 mb-6">
            76% of beta spots taken • Join 2,847 creators already using DubTitle
          </p>

          <button className="group relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <span className="relative z-10">🚀 Claim Your Spot Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <p className="text-sm text-red-100 mt-4">
            ✅ No credit card required • ✅ Cancel anytime • ✅ 30-day money-back guarantee
          </p>
        </div> */}
      </div>
    </section>
  );
} 