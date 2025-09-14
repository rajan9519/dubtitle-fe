import { Metadata } from 'next';
import Hero from "../components/Hero";
import ProblemStatement from "../components/ProblemStatement";
import ValueProposition from "../components/ValueProposition";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: 'Best ElevenLabs Alternative for AI Video Dubbing | Dubtitle',
  description: 'Professional ElevenLabs alternative for AI video dubbing. Dubtitle delivers enterprise-grade video dubbing with the same voice quality at 50% lower cost. Built specifically for content creators and businesses seeking scalable multilingual solutions.',
};

export default function ElevenLabsAlternativesPage() {
  const heroProps = {
    badgeText: "Professional ElevenLabs Alternative for Video",
    title: (
      <>
        ElevenLabs Quality,
        <br />
        <span className="text-blue-600">Smarter Price for Dubbing</span>
      </>
    ),
    subtitle: "Built on ElevenLabs' industry-leading voice technology, enhanced with our proprietary video dubbing algorithms. Experience enterprise-grade multilingual content production with transparent pricing and streamlined workflows designed for modern creators and businesses.",
    stats: [
      { value: "ElevenLabs", label: "Voice Quality" },
      { value: "Proprietary", label: "Dubbing Method" },
      { value: "50% Less", label: "Average Cost" },
      { value: "Video-First", label: "Platform" },
    ]
  };

  const problemStatementProps = {
    title: "Why Video Creators Choose Dubtitle as Their ElevenLabs Alternative",
    subtitle: "ElevenLabs is excellent for voice generation, but video creators need specialized features for seamless dubbing workflows. Dubtitle combines the same voice quality with video-first design and transparent pricing.",
    features: [
      {
        icon: "🎥",
        title: "Video-First Platform Design",
        description: "Unlike ElevenLabs' audio-focused approach, Dubtitle is built specifically for video dubbing with automatic timing synchronization, visual format compatibility, and streamlined video workflows."
      },
      {
        icon: "💰",
        title: "Transparent Video Pricing",
        description: "Simple per-minute pricing for video content eliminates the complexity of character-based billing, making it easier to budget for video projects of any length."
      },
      {
        icon: "⚡",
        title: "All-in-One Video Solution",
        description: "Complete video dubbing in one platform without needing additional tools for timing, synchronization, or format conversion—streamlining your entire production workflow."
      },
      {
        icon: "🎯",
        title: "Creator-Focused Features",
        description: "Purpose-built for content creators with features like batch processing, project management, and direct video output—designed specifically for modern video production needs."
      }
    ],
    useCasesTitle: "Who Benefits from Video-First ElevenLabs Alternative Solutions?",
    useCases: [
      {
        icon: "🎬",
        title: "YouTubers & Content Creators",
        description: "Scale global reach through professional multilingual content production while maintaining authentic voice characteristics and streamlined creative workflows."
      },
      {
        icon: "🏢",
        title: "Marketing Teams",
        description: "Deliver culturally adapted campaigns with enterprise-grade dubbing that maintains brand voice consistency across diverse international markets and customer segments."
      },
      {
        icon: "🎓",
        title: "E-learning Providers",
        description: "Democratize education through professional multilingual course content that preserves instructional clarity and emotional engagement for learners worldwide."
      }
    ]
  };

  const valuePropositionProps = {
    title: "Why Creators Choose Dubtitle Over ElevenLabs",
    subtitle: "Hear from creators who made the switch and experienced the difference a video-first platform makes.",
    testimonials: [
      {
        name: "Sriyansh Gupta",
        role: "Content Creator",
        avatar: "👨‍💻",
        rating: 5,
        content: "We were using ElevenLabs, but it was getting expensive for our volume of content. With Dubtitle, we get the same quality at a fraction of the cost. Perfect for our YouTube shorts production workflow."
      },
      {
        name: "Maria Garcia",
        role: "Online Course Instructor",
        avatar: "👩‍🏫",
        rating: 5,
        content: "Dubtitle's workflow is incredibly simple and intuitive. I can upload, dub, and download in minutes. It has saved me hours of work on each course I produce."
      },
      {
        name: "Tech Forward",
        role: "Marketing Agency",
        avatar: "📈",
        rating: 4,
        content: "The voice quality is on par with ElevenLabs, but the video integration is what makes Dubtitle the best alternative. It’s our go-to solution for localizing client campaigns."
      },
      {
        name: "Indie Film Co.",
        role: "Short Film Producer",
        avatar: "🎥",
        rating: 5,
        content: "For indie filmmakers on a budget, Dubtitle is a game-changer. We easily dub our Hindi content to English, reaching a global audience. Studio-quality dubbing at a fraction of the cost - a clear ElevenLabs alternative for video."
      }
    ]
  };

  const howItWorksProps = {
    badgeText: "Professional ElevenLabs Alternative Workflow",
    title: "Streamlined Video Dubbing Beyond ElevenLabs",
    subtitle: "Our enterprise-grade platform reimagines the dubbing workflow for modern content creators. Experience professional video production that combines ElevenLabs voice quality with advanced video-first technology.",
    steps: [
      {
        number: "01",
        title: "Upload Your Video",
        description: "Upload video content directly or integrate via URL. Our platform automatically handles format optimization and audio extraction, eliminating manual preprocessing workflows.",
        icon: "📤"
      },
      {
        number: "02",
        title: "Select Language",
        description: "Select from 29+ professionally supported languages with native-level accuracy. Our advanced AI maintains authentic voice characteristics and emotional nuance throughout the dubbing process.",
        icon: "🌍"
      },
      {
        number: "03",
        title: "Professional AI Processing",
        description: "Our proprietary algorithms generate broadcast-quality dubbed audio with precise voice matching, emotional authenticity, and optimal timing synchronization for professional video content.",
        icon: "🤖"
      },
      {
        number: "04",
        title: "Download Your Dubbed Video",
        description: "Download broadcast-ready, professionally dubbed content optimized for your target distribution channels and audience engagement requirements.",
        icon: "🎯"
      }
    ],
    comparisonTitle: "Professional Comparison: Dubtitle vs. ElevenLabs for Video Production",
    comparisonSubtitle: "Comprehensive analysis for content creators and enterprises choosing between ElevenLabs alternatives.",
    traditionalDubbingTitle: "ElevenLabs API",
    traditionalDubbingFeatures: [
      {
        text: "Industry-Leading Voice Synthesis",
        subtext: "Professional-grade voice generation with advanced AI capabilities."
      },
      {
        text: "Higher Implementation Costs",
        subtext: "Character-based pricing with additional development overhead for video workflows."
      },
      {
        text: "Developer-Focused Platform",
        subtext: "Requires technical integration and custom workflow development."
      }
    ],
    aiDubbingTitle: "Dubtitle",
    aiDubbingFeatures: [
      {
        text: "Enterprise-Grade Voice Quality",
        subtext: "Built on ElevenLabs technology with proprietary video optimization enhancements."
      },
      {
        text: "Transparent Value Proposition",
        subtext: "Minute-based pricing with up to 50% cost savings compared to traditional approaches."
      },
      {
        text: "Complete Video Production Platform",
        subtext: "End-to-end dubbing workflow from upload to broadcast-ready output with zero technical complexity."
      },
    ]
  };

  const faqProps = {
    title: "ElevenLabs Alternative: Frequently Asked Questions",
    subtitle: "Everything you need to know about choosing Dubtitle as your professional ElevenLabs alternative for video dubbing.",
    faqs: [
      {
        question: "Why choose Dubtitle over ElevenLabs for video dubbing projects?",
        answer: "Dubtitle is specifically engineered as a comprehensive ElevenLabs alternative for video creators. While ElevenLabs excels at voice generation, Dubtitle provides an integrated video dubbing ecosystem that combines the same voice quality with video-optimized workflows, transparent pricing, and enterprise-grade project management capabilities designed for professional content production."
      },
      {
        question: "Does Dubtitle match ElevenLabs voice quality standards?",
        answer: "Absolutely. Our platform leverages the same industry-leading voice synthesis technology as ElevenLabs, enhanced with proprietary video optimization algorithms. This ensures you receive the same premium voice quality while benefiting from advanced video-specific features like automated timing synchronization and format optimization that ElevenLabs doesn't provide."
      },
      {
        question: "How does Dubtitle pricing compare to ElevenLabs for video content?",
        answer: "Dubtitle offers significant cost advantages over ElevenLabs for video production. While ElevenLabs uses character-based pricing that can be unpredictable for video content, our transparent minute-based model typically reduces costs by 40-60%. Our video-optimized infrastructure eliminates the additional development and integration costs required when building ElevenLabs-based video workflows."
      },
      {
        question: "Can I migrate my existing ElevenLabs voice profiles to Dubtitle?",
        answer: "Yes, we support seamless migration from ElevenLabs to maintain consistency across your content. Our platform accommodates custom voice profiles and brand-specific audio assets, ensuring your transition from ElevenLabs to Dubtitle preserves your unique voice identity while unlocking superior video production capabilities."
      },
      {
        question: "What technical advantages does Dubtitle offer over ElevenLabs API integration?",
        answer: "Unlike ElevenLabs API implementation which requires significant technical development, Dubtitle provides a complete, ready-to-use video dubbing platform. We eliminate the complexity of custom integration, audio-video synchronization coding, and workflow management that ElevenLabs API users must develop independently. This saves months of development time and ongoing maintenance overhead."
      },
      {
        question: "Which content formats and languages does Dubtitle support compared to ElevenLabs?",
        answer: "Dubtitle supports 29+ languages with the same quality standards as ElevenLabs, plus comprehensive video format compatibility that ElevenLabs lacks. We handle everything from social media content to broadcast-quality productions, with automated optimization for different platforms and resolutions—capabilities that require custom development when using ElevenLabs APIs directly."
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
