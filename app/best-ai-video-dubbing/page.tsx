import { Metadata } from 'next';
import Hero from "../components/Hero";
import ProblemStatement from "../components/ProblemStatement";
import ValueProposition from "../components/ValueProposition";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: 'Best AI Video Dubbing: The Ultimate Solution for 2025',
  description: 'Discover why Dubtitle is the best AI video dubbing tool. Explore features like voice cloning, emotion preservation, and natural speech patterns for your video content.',
};

export default function BestAIDubbingPage() {
  const heroProps = {
    badgeText: "Your Guide to the Best AI Video Dubbing",
    title: (
      <>
        Find the Best
        <br />
        <span className="text-blue-600">AI Video Dubbing</span> Solution
      </>
    ),
    subtitle: "Unlock global audiences with the highest quality, most realistic AI-powered video dubbing available. Discover why we are the top choice for creators.",
    stats: [
      { value: "99.8%", label: "Voice Accuracy" },
      { value: "Top 1%", label: "Voice Realism" },
      { value: "4.9/5", label: "User Rating" },
      { value: "24/7", label: "Support" },
    ]
  };

  const problemStatementProps = {
    title: "Why Dubtitle is the Best AI Video Dubbing Tool",
    subtitle: "Our cutting-edge technology ensures your content is dubbed with the highest quality, preserving the original's integrity while reaching a global audience.",
    features: [
      {
        icon: "🏆",
        title: "Unmatched Voice Realism",
        description: "Experience the most natural-sounding AI voices. Our technology captures and replicates tonal nuances and emotions, making dubbed content feel authentic."
      },
      {
        icon: "🎵",
        title: "Natural Audio Quality",
        description: "Our AI produces crystal-clear, professional-grade audio that maintains the original speaker's natural speech patterns and cadence."
      },
      {
        icon: "🌐",
        title: "Extensive Language Support",
        description: "Reach a global audience with our support for over 29 languages. From major world languages to regional dialects, we've got you covered."
      },
      {
        icon: "⚙️",
        title: "Simple and Intuitive Workflow",
        description: "No technical expertise needed. Our platform is designed for ease of use, allowing you to dub your videos in just a few clicks."
      }
    ],
    useCasesTitle: "Ideal for a Variety of Content",
    useCases: [
      {
        icon: "🎥",
        title: "Filmmakers",
        description: "Distribute your films to international audiences without the high cost of traditional dubbing studios."
      },
      {
        icon: "📢",
        title: "Marketing Agencies",
        description: "Create localized video campaigns that resonate with different markets and cultures."
      },
      {
        icon: "📚",
        title: "E-Learning Platforms",
        description: "Make your educational content accessible to students from all over the world."
      }
    ]
  };

  const valuePropositionProps = {
    title: "Hear From Creators Who Chose the Best",
    subtitle: "Discover why professionals rank us as the best AI video dubbing solution on the market.",
    testimonials: [
      {
        name: "Alex Rivera",
        role: "Documentary Filmmaker",
        avatar: "🎬",
        rating: 5,
        content: "Dubtitle has been a revelation for my international distribution. The voice quality is uncanny, and the natural speech patterns are incredibly realistic. It's a must-have for any serious filmmaker."
      },
      {
        name: "Samantha Bee",
        role: "Marketing Head",
        avatar: "📈",
        rating: 5,
        content: "We were looking for the best AI video dubbing tool to localize our campaigns, and Dubtitle exceeded our expectations. The platform is incredibly easy to use, and the results are consistently professional. Our engagement in non-English markets has skyrocketed."
      },
      {
        name: "Dr. Chen",
        role: "Online Educator",
        avatar: "🧑‍🏫",
        rating: 5,
        content: "As an educator, clarity and accessibility are paramount. Dubtitle provides the best AI video dubbing I've come across, making my courses available to a global student base without any linguistic barriers."
      },
      {
        name: "Casey Neistat",
        role: "YouTube Vlogger",
        avatar: "🤳",
        rating: 4,
        content: "I've tested a bunch of AI dubbing tools, and Dubtitle is hands-down one of the best. It's not perfect, but it's damn close. The voice cloning feature is a game-changer for maintaining my brand's voice across different languages."
      }
    ]
  };

  const howItWorksProps = {
    badgeText: "Our Workflow",
    title: "The Best AI Video Dubbing Process",
    subtitle: "Achieve professional-grade dubbing with our streamlined, user-friendly process. Here’s how we deliver the best results in the industry.",
    steps: [
      {
        number: "01",
        title: "Secure Video Upload",
        description: "Your content's security is our priority. Upload your videos through our encrypted platform, supporting all major formats and direct imports.",
        icon: "🔒"
      },
      {
        number: "02",
        title: "Intelligent Language Detection",
        description: "Our AI automatically detects the source language and offers you a choice of over 29 languages for dubbing, ensuring the best possible context recognition.",
        icon: "🧠"
      },
      {
        number: "03",
        title: "Advanced AI Dubbing & Sync",
        description: "This is where the magic happens. Our AI not only translates and dubs but also masters the audio to preserve natural speech patterns and emotional nuance.",
        icon: "✨"
      },
      {
        number: "04",
        title: "Quality Check & Download",
        description: "Review your dubbed video in our interactive editor. Once you're satisfied with the quality, download it in high resolution, ready for global distribution.",
        icon: "✅"
      }
    ],
    comparisonTitle: "Why We're the Best Choice",
    comparisonSubtitle: "See how Dubtitle's AI-powered solution stacks up against other dubbing methods.",
    traditionalDubbingTitle: "Other AI Dubbing Tools",
    traditionalDubbingFeatures: [
      {
        text: "Robotic, Unnatural Voices",
        subtext: "Many tools produce monotonous voices that lack emotion and realism."
      },
      {
        text: "Poor Audio Quality",
        subtext: "Many tools produce muffled or unnatural audio that sounds robotic and unprofessional."
      },
      {
        text: "Limited Language Options",
        subtext: "Most competitors offer a smaller selection of languages, limiting your global reach."
      },
      {
        text: "Complex User Interface",
        subtext: "Navigating other platforms can be complicated and time-consuming for users."
      }
    ],
    aiDubbingTitle: "Dubtitle: The Best AI Dubbing",
    aiDubbingFeatures: [
      {
        text: "Human-Like Voice Quality",
        subtext: "Our AI delivers voices that are rich in emotion and natural cadence."
      },
      {
        text: "Professional Audio Quality",
        subtext: "We deliver studio-grade audio quality that sounds natural and maintains the original's emotional depth."
      },
      {
        text: "29+ Supported Languages",
        subtext: "Our extensive language support helps you connect with a truly global audience."
      },
      {
        text: "Effortless & Intuitive",
        subtext: "Our platform is designed for speed and ease of use, regardless of your technical skill."
      }
    ]
  };

  const faqProps = {
    title: "Your Questions About the Best AI Video Dubbing Tool Answered",
    subtitle: "Everything you need to know about Dubtitle and why it's the best choice for your video content.",
    faqs: [
      {
        question: "What makes Dubtitle the best AI video dubbing tool?",
        answer: "Dubtitle stands out due to its superior voice cloning technology, emotion preservation, and natural speech pattern recreation. Our commitment to quality and ease of use makes us the best choice for creators and businesses alike."
      },
      {
        question: "How does your voice cloning compare to other AI dubbing tools?",
        answer: "Our voice cloning is among the best in the industry. It captures the unique characteristics of the original speaker's voice, resulting in a dub that is rich, authentic, and emotionally resonant."
      },
      {
        question: "Is Dubtitle the best option for a small YouTube creator?",
        answer: "Absolutely. We offer a range of flexible pricing plans, including a free tier, that makes our professional-grade dubbing accessible to everyone. Dubtitle is the best way to grow your channel internationally."
      },
      {
        question: "What kind of support can I expect from the best AI video dubbing platform?",
        answer: "We offer comprehensive support to all our users. From a detailed knowledge base to responsive customer service, we're here to help you get the best results from our platform."
      },
      {
        question: "How do you ensure the voice quality is the best on the market?",
        answer: "Our proprietary AI models are trained on vast datasets to understand the nuances of human speech patterns, emotion, and tonal variations. This allows us to achieve a level of voice realism and natural flow that is unmatched by other tools."
      },
      {
        question: "Can I customize the dubbed audio?",
        answer: "Yes, our platform provides you with tools to fine-tune the dubbed audio. You can adjust the tone, pace, and volume to ensure the final product meets your exact specifications. This level of control is part of what makes us the best AI video dubbing tool."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero {...heroProps} />
      <ProblemStatement {...problemStatementProps} />
      <ValueProposition {...valuePropositionProps} />
      <HowItWorks {...howItWorksProps} />
      <Pricing />
      <FAQ {...faqProps} />
      <Footer />
    </div>
  );
}
