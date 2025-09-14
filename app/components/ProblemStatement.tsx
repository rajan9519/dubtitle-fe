
interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface UseCase {
  icon: string;
  title: string;
  description: string;
}

interface ProblemStatementProps {
  title: string;
  subtitle: string;
  features: Feature[];
  useCasesTitle: string;
  useCases: UseCase[];
}

export default function ProblemStatement({
  title,
  subtitle,
  features,
  useCasesTitle,
  useCases,
}: ProblemStatementProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="max-w-4xl mx-auto mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">{useCasesTitle}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{useCase.icon}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h4>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}