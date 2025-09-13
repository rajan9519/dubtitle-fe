export default function SocialProof() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Real Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">29</div>
              <div className="text-gray-600">Languages supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Videos dubbed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3min</div>
              <div className="text-gray-600">Average processing time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Voice accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}