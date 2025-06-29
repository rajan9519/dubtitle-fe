export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                They are widely used to make websites work more efficiently and provide information to the owners of the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">
                DubTitle uses cookies to enhance your experience on our website and improve our services. We use cookies for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Authentication and security</li>
                <li>Remembering your preferences and settings</li>
                <li>Analyzing website usage and performance</li>
                <li>Providing personalized content and features</li>
                <li>Supporting our marketing efforts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies are necessary for the website to function properly. They include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Authentication cookies to keep you logged in</li>
                  <li>Security cookies to protect against attacks</li>
                  <li>Session cookies to maintain your session</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies help us understand how visitors use our website:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Google Analytics cookies for usage statistics</li>
                  <li>Performance monitoring cookies</li>
                  <li>Error tracking cookies</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Functional Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies enable enhanced functionality and personalization:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Language preference cookies</li>
                  <li>Theme and display preference cookies</li>
                  <li>Feature toggle cookies</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies are used to deliver relevant advertisements:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Social media tracking cookies</li>
                  <li>Advertising platform cookies</li>
                  <li>Conversion tracking cookies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services that set cookies on our behalf, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Stripe:</strong> For payment processing and fraud protection</li>
                <li><strong>Intercom:</strong> For customer support chat functionality</li>
                <li><strong>Social Media Platforms:</strong> For social sharing and authentication</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-700 mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Browser Settings:</strong> Most browsers allow you to view, delete, and block cookies</li>
                <li><strong>Opt-out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
                <li><strong>Cookie Banner:</strong> Use our cookie consent banner to manage preferences</li>
                <li><strong>Account Settings:</strong> Manage some cookie preferences in your account settings</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Note:</strong> Disabling essential cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Retention</h2>
              <p className="text-gray-700 mb-4">
                Different cookies have different lifespans:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
                <li><strong>Analytics Cookies:</strong> Usually expire after 2 years</li>
                <li><strong>Marketing Cookies:</strong> Typically expire after 30-90 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page
                and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about our use of cookies, please contact us at{' '}
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