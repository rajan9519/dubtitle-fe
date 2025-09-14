
"use client";
import Footer from "../components/Footer";
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'AI Dubbing', href: '/ai-dubbing' },
  { name: 'Contact', href: '/contact' },
]

const features = [
  {
    name: 'Global Audience Reach',
    description: 'Instantly translate and dub your videos into multiple languages, breaking geographical barriers and connecting with a global audience.',
  },
  {
    name: 'Fast Video Translation',
    description: 'Our AI-powered platform delivers high-quality dubbed videos in minutes, not days. Speed up your content pipeline and stay ahead of the curve.',
  },
  {
    name: 'Preserve Brand Voice',
    description: 'Maintain your unique style and tone across all languages with our advanced voice cloning and emotion preservation technology.',
  },
  {
    name: 'Cost-Effective Solution',
    description: 'Traditional dubbing is expensive and time-consuming. Dubtitle offers a budget-friendly alternative without compromising on quality.',
  },
];

export default function AiDubbingPage() {
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
      <nav className="relative z-20 container mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-black text-xl font-semibold">DubTitle</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="/pricing" className="text-gray-700 hover:text-black transition-colors font-medium">Pricing</a>
          <a href="/ai-dubbing" className="text-gray-700 hover:text-black transition-colors font-medium">AI Dubbing</a>
          <a href="/contact" className="text-gray-700 hover:text-black transition-colors font-medium">Contact</a>
          <button
            onClick={() => {
              if (loginLoading) return;
              setLoginLoading(true);
              router.push('/login');
            }}
            disabled={loginLoading}
            className="text-gray-700 hover:text-black transition-colors font-medium disabled:opacity-50 cursor-pointer"
          >
            {loginLoading ? 'Loading...' : 'Sign in'}
          </button>
          <button
            onClick={() => {
              if (loginLoading) return;
              setLoginLoading(true);
              router.push('/signup');
            }}
            disabled={loginLoading}
            className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loginLoading ? 'Loading...' : 'Sign up'}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={() => {
              router.push('/contact');
            }}
            className="px-3 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:text-black transition-colors text-sm"
          >
            Sales
          </button>
          <button
            onClick={() => {
              if (loginLoading) return;
              setLoginLoading(true);
              router.push('/signup');
            }}
            disabled={loginLoading}
            className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loginLoading ? 'Loading...' : 'Sign up'}
          </button>
        </div>
      </nav>
      </header>
      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f3f4f6] to-[#d1d5db] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  AI Dubbing for <span className="text-blue-600">Content Creators</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Reach a global audience with fast, accurate, and natural-sounding AI-powered video dubbing. Expand your reach, boost engagement, and grow your brand.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/signup"
                    className="px-8 py-4 bg-black text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    Get started for free
                  </a>
                  <a href="/contact" className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-lg hover:border-gray-400 hover:text-black transition-colors">
                    Contact sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Go Global</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to expand your audience
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Dubtitle's AI dubbing service empowers content creators to break language barriers and connect with viewers worldwide.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* How it works section */}
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Dub your content in 3 simple steps.
                    </p>
                </div>
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mt-16">
                    <ol className="list-decimal list-inside space-y-4 text-gray-700">
                    <li>
                        <span className="font-semibold text-black">Upload Your Video:</span> Simply upload your video file to our secure platform. We support all major video formats.
                    </li>
                    <li>
                        <span className="font-semibold text-black">Select Languages:</span> Choose from a wide range of languages to dub your video into. Our AI will handle the translation and dubbing process automatically.
                    </li>
                    <li>
                        <span className="font-semibold text-black">Download and Share:</span> Your professionally dubbed video will be ready for download in minutes. Share it with your global audience and watch your engagement soar.
                    </li>
                    </ol>
                </div>
            </div>
        </div>

        {/* CTA section */}
        <div className="relative -z-10 mt-16 mb-16">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center py-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ready to Reach a Global Audience?</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Start dubbing your videos with AI today and connect with viewers worldwide.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/signup"
                            className="px-8 py-4 bg-black text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Get started for free
                        </a>
                    </div>
                </div>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
