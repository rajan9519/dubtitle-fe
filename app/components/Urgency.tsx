"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { pricingPlans, formatPrice, getPriceForTimeRange, getOriginalPriceForTimeRange } from '../../lib/pricing';
import { trackButtonClick } from './GoogleAnalytics';
import { useCurrency } from '../../lib/currency-context';
import CurrencyToggle from './CurrencyToggle';

export default function Pricing() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { currency } = useCurrency();

  const handlePlanAction = async (plan: { id: string; name: string; buttonAction: string }) => {
    if (loadingPlan) return;
    
    setLoadingPlan(plan.id);
    
    try {
      if (plan.buttonAction === 'free') {
        trackButtonClick(`${plan.name} Plan`, 'Pricing Section');
        router.push('/signup');
      } else if (plan.buttonAction === 'checkout') {
        trackButtonClick(`${plan.name} Plan`, 'Pricing Section');
        router.push('/signup');
      }
    } catch (error) {
      console.error('Error handling plan action:', error);
    } finally {
      setTimeout(() => setLoadingPlan(null), 1000);
    }
  };

  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Choose the plan that fits your needs. Start free, upgrade when you are ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <CurrencyToggle variant='light'/>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 ${
                plan.popular 
                  ? 'bg-white border-4 border-black scale-105' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most popular
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    {getOriginalPriceForTimeRange(plan, currency) && (
                      <span className="text-2xl line-through mr-2 text-gray-500">
                        {formatPrice(getOriginalPriceForTimeRange(plan, currency)!, currency)}
                      </span>
                    )}
                    <span>{formatPrice(getPriceForTimeRange(plan, currency), currency)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {plan.duration} {'/ month'}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-0.5 flex-shrink-0 text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.warningFeatures?.map((feature, index) => (
                    <li key={`warning-${index}`} className="flex items-start">
                      <span className="mr-3 mt-0.5 flex-shrink-0 text-orange-500">⚠</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handlePlanAction(plan)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full py-3 font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                    plan.popular 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {loadingPlan === plan.id ? 'Loading...' : plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}