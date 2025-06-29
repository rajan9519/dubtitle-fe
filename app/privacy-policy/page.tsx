export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                DubTitle collects information to provide better services to our users. We collect information in the following ways:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Information you give us:</strong> Account information, payment details, and content you upload for dubbing</li>
                <li><strong>Information we get from your use of our services:</strong> Usage data, device information, and IP addresses</li>
                <li><strong>Audio and video content:</strong> Files you upload for processing are temporarily stored and processed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our AI dubbing services</li>
                <li>Process your audio/video content for dubbing</li>
                <li>Communicate with you about your account and our services</li>
                <li>Develop new features and improve our AI models</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Encryption in transit and at rest</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and authentication</li>
                <li>Secure cloud infrastructure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your data only as long as necessary to provide our services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Uploaded content is processed and then deleted within 30 days</li>
                <li>Account information is retained while your account is active</li>
                <li>Usage logs are kept for 90 days for security and improvement purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services to help provide our services, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Cloud storage and computing providers</li>
                <li>Payment processors</li>
                <li>Analytics services</li>
                <li>AI and machine learning services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Export your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at{' '}
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