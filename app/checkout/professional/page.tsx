'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, redirectToLogin, User } from '../../../lib/auth';
import { pricingPlans } from '../../../lib/pricing';

export default function ProfessionalCheckout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Get the professional plan details
  const professionalPlan = pricingPlans.find(plan => plan.id === 'professional');

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getUser();
      if (!currentUser) {
        // Redirect to login with return URL
        redirectToLogin(window.location.href);
        return;
      }
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleProceedToPayment = () => {
    if (!professionalPlan?.checkoutUrl) {
      alert('Checkout URL not configured. Please contact support.');
      return;
    }
    
    // Open LemonSqueezy checkout with user email pre-filled
    const checkoutUrl = new URL(professionalPlan.checkoutUrl);
    if (user?.email) {
      checkoutUrl.searchParams.set('checkout[email]', user.email);
      checkoutUrl.searchParams.set('checkout[custom][email]', user.email);
    }

    if (user?.id) {
      checkoutUrl.searchParams.set('checkout[custom][user_id]', user.id);
    }

    
    window.open(checkoutUrl.toString(), '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!professionalPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="text-white text-xl">Plan not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-white text-2xl font-bold">DubTitle</span>
        </div>
        <button
          onClick={() => router.push('/')}
          className="text-white hover:text-purple-300 transition-colors"
        >
          ← Back to Home
        </button>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Your Purchase
            </h1>
            <p className="text-xl text-purple-100">
              Unlock professional-grade AI dubbing capabilities
            </p>
          </div>

          {/* Checkout Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
            {/* Plan Details */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                👑 PROFESSIONAL PLAN
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{professionalPlan.name} Plan</h2>
              <div className="text-5xl font-bold text-yellow-300 mb-2">
                {professionalPlan.originalPrice && (
                  <span className="text-2xl line-through text-white/50 mr-2">
                    ${professionalPlan.originalPrice}
                  </span>
                )}
                ${professionalPlan.price}
              </div>
              <p className="text-purple-100">{professionalPlan.duration}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">What&apos;s included:</h3>
              <ul className="space-y-3">
                {professionalPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* User Info */}
            <div className="mb-8 p-4 bg-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2">Account Details</h3>
              <p className="text-purple-100">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              {user?.first_name && (
                <p className="text-purple-100">
                  <span className="font-medium">Name:</span> {user.first_name} {user?.last_name || ''}
                </p>
              )}
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToPayment}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-xl rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Payment
            </button>

            {/* Security Note */}
            <div className="text-center mt-6">
              <p className="text-sm text-purple-200">
                🔒 Secure payment powered by LemonSqueezy
              </p>
              <p className="text-xs text-purple-300 mt-2">
                30-day money-back guarantee • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
