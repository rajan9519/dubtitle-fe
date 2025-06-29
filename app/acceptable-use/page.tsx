export default function AcceptableUse() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Acceptable Use Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 mb-4">
                This Acceptable Use Policy ("Policy") governs your use of DubTitle's services. By using our services,
                you agree to comply with this Policy. Violation of this Policy may result in suspension or termination of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Permitted Uses</h2>
              <p className="text-gray-700 mb-4">
                You may use DubTitle's services for legitimate purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Creating dubbed content for educational purposes</li>
                <li>Localizing content for global audiences</li>
                <li>Accessibility improvements for hearing-impaired audiences</li>
                <li>Personal and commercial content creation</li>
                <li>Marketing and promotional content</li>
                <li>Entertainment and media production</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">
                You may NOT use DubTitle's services for:
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Illegal Activities</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Any illegal activity or content that violates applicable laws</li>
                  <li>Copyright infringement or unauthorized use of protected content</li>
                  <li>Trademark infringement or misrepresentation</li>
                  <li>Fraud, money laundering, or other financial crimes</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Harmful Content</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Hate speech, discrimination, or harassment</li>
                  <li>Violence, threats, or intimidation</li>
                  <li>Content that promotes self-harm or suicide</li>
                  <li>Sexually explicit or pornographic content</li>
                  <li>Content involving minors in inappropriate contexts</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Deceptive Practices</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Creating deepfakes or misleading synthetic content</li>
                  <li>Impersonating individuals without consent</li>
                  <li>Spreading misinformation or disinformation</li>
                  <li>Phishing or social engineering attacks</li>
                  <li>Creating content intended to deceive or manipulate</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Abuse</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Attempting to reverse engineer or hack our services</li>
                  <li>Overloading our systems with excessive requests</li>
                  <li>Circumventing usage limits or restrictions</li>
                  <li>Distributing malware or viruses</li>
                  <li>Unauthorized access to other users' accounts</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Guidelines</h2>
              <p className="text-gray-700 mb-4">
                When using our services, you must ensure that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You own or have proper licensing for all uploaded content</li>
                <li>Content does not violate any third-party rights</li>
                <li>Content is appropriate for the intended audience</li>
                <li>Content complies with applicable content rating systems</li>
                <li>You have consent from all individuals featured in the content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Voice and Identity</h2>
              <p className="text-gray-700 mb-4">
                Special considerations for voice synthesis and dubbing:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Do not create synthetic voices of real people without explicit consent</li>
                <li>Clearly disclose when content uses AI-generated voices</li>
                <li>Do not use voices for harassment, impersonation, or fraud</li>
                <li>Respect celebrity likeness and voice rights</li>
                <li>Follow applicable laws regarding synthetic media disclosure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reporting Violations</h2>
              <p className="text-gray-700 mb-4">
                If you encounter content or behavior that violates this Policy, please report it to us immediately:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Email: <a href="mailto:rajan@dubtitle.com" className="text-purple-600 hover:text-purple-800">rajan@dubtitle.com</a></li>
                <li>Include detailed information about the violation</li>
                <li>Provide relevant links, screenshots, or evidence</li>
                <li>We will investigate all reports promptly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Enforcement</h2>
              <p className="text-gray-700 mb-4">
                We may take the following actions for Policy violations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Warning:</strong> First-time minor violations may receive a warning</li>
                <li><strong>Content Removal:</strong> Violating content will be removed from our systems</li>
                <li><strong>Account Suspension:</strong> Temporary restriction of account access</li>
                <li><strong>Account Termination:</strong> Permanent closure of account for serious violations</li>
                <li><strong>Legal Action:</strong> Reporting to authorities for illegal activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Appeals Process</h2>
              <p className="text-gray-700 mb-4">
                If you believe your account was suspended or terminated in error:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Contact us at <a href="mailto:rajan@dubtitle.com" className="text-purple-600 hover:text-purple-800">rajan@dubtitle.com</a></li>
                <li>Provide your account information and details of the issue</li>
                <li>Explain why you believe the action was taken in error</li>
                <li>We will review your appeal within 5 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-700 mb-4">
                We may update this Acceptable Use Policy from time to time. Continued use of our services after changes
                constitutes acceptance of the updated Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700">
                For questions about this Acceptable Use Policy, please contact us at{' '}
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