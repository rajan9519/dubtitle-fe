export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using DubTitle&apos;s services, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                DubTitle provides AI-powered dubbing services that allow users to automatically translate and dub audio/video content
                into multiple languages. Our service includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Automatic speech recognition and translation</li>
                <li>AI voice synthesis and dubbing</li>
                <li>Multi-language support</li>
                <li>Content processing and delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">Users are responsible for:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Ensuring they have rights to all content they upload</li>
                <li>Complying with all applicable laws and regulations</li>
                <li>Not uploading harmful, illegal, or copyrighted content without permission</li>
                <li>Maintaining the security of their account credentials</li>
                <li>Using the service in accordance with our Acceptable Use Policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                You retain ownership of your original content. By using our service, you grant DubTitle a limited license to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Process your content to provide dubbing services</li>
                <li>Store your content temporarily for processing</li>
                <li>Use aggregated, anonymized data to improve our services</li>
              </ul>
              <p className="text-gray-700 mt-4">
                DubTitle retains ownership of all AI models, algorithms, and proprietary technology.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment and Billing</h2>
              <p className="text-gray-700 mb-4">
                Payment terms for DubTitle services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fees are charged based on usage and selected plan</li>
                <li>Payment is due in advance for subscription plans</li>
                <li>Refunds may be provided at our discretion</li>
                <li>Failed payments may result in service suspension</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                While we strive for high availability, we do not guarantee uninterrupted service. 
                We may perform maintenance, updates, or experience technical issues that temporarily affect service availability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                DubTitle shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 mb-4">
                Either party may terminate this agreement at any time. Upon termination:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Your access to the service will be discontinued</li>
                <li>Your data will be deleted according to our data retention policy</li>
                <li>Outstanding payments remain due</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of significant changes
                via email or through our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:rajan@dubtitle.com" className="text-purple-600 hover:text-purple-800">
                  rajan@dubtitle.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 