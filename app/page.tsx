import Hero from "./components/Hero";
import ProblemStatement from "./components/ProblemStatement";
import ValueProposition from "./components/ValueProposition";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
// import LogoCloud from "./components/LogoCloud";

export default function Home() {
  const heroProps = {
    badgeText: "AI-powered dubbing platform",
    title: (
      <>
        The most realistic
        <br />
        <span className="text-blue-600">voice dubbing</span> platform
      </>
    ),
    subtitle: "AI dubbing that preserves emotion and natural speech patterns. Transform your content for global audiences in minutes, not weeks.",
    stats: [
      { value: "29", label: "Languages supported" },
      { value: "200+", label: "Videos dubbed" },
      { value: "3min", label: "Average processing time" },
      { value: "95%", label: "Voice accuracy" },
    ]
  };

  const problemStatementProps = {
    title: "Powered by breakthrough AI",
    subtitle: "Our advanced AI technology delivers studio-quality dubbing that preserves emotion and sounds completely natural.",
    features: [
      {
        icon: "🎯",
        title: "Voice cloning technology",
        description: "Our AI preserves the original speaker's voice characteristics, tone, and emotion across languages."
      },
      {
        icon: "🔄",
        title: "Natural speech patterns",
        description: "Advanced algorithms maintain natural rhythm and flow for authentic-sounding results."
      },
      {
        icon: "⚡",
        title: "Lightning fast",
        description: "What takes traditional studios weeks, we accomplish in minutes with cutting-edge AI processing."
      },
      {
        icon: "🌍",
        title: "29 languages",
        description: "Expand your reach globally with support for major world languages and regional dialects."
      }
    ],
    useCasesTitle: "Perfect for",
    useCases: [
      {
        icon: "🎬",
        title: "Content Creators",
        description: "YouTubers, TikTokers, and social media influencers expanding globally"
      },
      {
        icon: "🏢",
        title: "Businesses",
        description: "Companies creating multilingual marketing and training content"
      },
      {
        icon: "🎓",
        title: "Educators",
        description: "Teachers and trainers making content accessible worldwide"
      }
    ]
  };

  const valuePropositionProps = {
    title: "What our users say",
    subtitle: "Real feedback from creators who transformed their content reach",
    testimonials: [
      {
        name: "Voice Worth Hearing",
        role: "YouTube Creator",
        avatar: "👨🏻‍💻",
        rating: 5,
        content: "I use this to dub famous informative videos in Hindi for Indian people to learn from. My audience can now access valuable educational content in their native language. The quality makes complex topics easy to understand."
      },
      {
        name: "Lakshit Ukani",
        role: "Udemy Instructor",
        avatar: "👨🏽‍🏫",
        rating: 4,
        content: "I am using this for my Udemy courses and it has been a game changer. Students from different countries can now access my content in their native languages. The technical accuracy is spot on."
      },
      {
        name: "Somorik",
        role: "Content Enthusiast",
        avatar: "👨🏻‍🎬",
        rating: 5,
        content: "I use this to dub US shows in Russian for my personal enjoyment. It is amazing how I can now enjoy my favorite American series in Russian. The voice quality makes it feel natural."
      },
      {
        name: "Riley P.",
        role: "Indie Filmmaker",
        avatar: "👩🏼‍🎬",
        rating: 4,
        content: "Used it for my short film festival submissions. The quality varies by language - French was great, Mandarin needed some tweaks. But hey, it got my film seen internationally."
      }
    ]
  };

  const howItWorksProps = {
    badgeText: "Simple 4-step process",
    title: "How it works",
    subtitle: "From upload to download in just 4 simple steps. No technical expertise required.",
    steps: [
      {
        number: "01",
        title: "Upload your video",
        description: "Simply drag and drop your video file or paste a YouTube link. We support all major formats.",
        icon: "📤"
      },
      {
        number: "02",
        title: "Choose target language",
        description: "Select from 29 languages. Our AI analyzes the speech patterns and emotional context.",
        icon: "🌍"
      },
      {
        number: "03",
        title: "AI processes your content",
        description: "Advanced AI creates natural-sounding dubbing while preserving the original speaker's emotion and tone.",
        icon: "🤖"
      },
      {
        number: "04",
        title: "Download & share",
        description: "Get your dubbed video in minutes, ready to publish across all platforms.",
        icon: "🎯"
      }
    ],
    comparisonTitle: "Why choose DubTitle?",
    comparisonSubtitle: "See how our AI-powered solution compares to traditional dubbing methods",
    traditionalDubbingTitle: "Traditional dubbing",
    traditionalDubbingFeatures: [
      {
        text: "2-4 weeks production time",
        subtext: "Complex coordination between multiple teams"
      },
      {
        text: "$500-5000+ per video",
        subtext: "High costs for professional voice actors"
      },
      {
        text: "Complex coordination required",
        subtext: "Multiple vendors and scheduling challenges"
      },
      {
        text: "Limited language options",
        subtext: "Only 5-10 languages typically available"
      }
    ],
    aiDubbingTitle: "DubTitle AI",
    aiDubbingFeatures: [
      {
        text: "2-10 minutes processing",
        subtext: "Lightning-fast AI-powered dubbing"
      },
      {
        text: "Starting from $7/month",
        subtext: "Unlimited videos with monthly subscription"
      },
      {
        text: "One-click solution",
        subtext: "Upload, select language, download - that's it!"
      },
      {
        text: "29 languages available",
        subtext: "More languages than traditional dubbing"
      }
    ]
  };

  const faqProps = {
    title: "Frequently asked questions",
    subtitle: "Everything you need to know about our AI dubbing platform",
    faqs: [
      {
        question: "How accurate is the AI dubbing?",
        answer: "Our AI dubbing achieves 95%+ accuracy in voice replication and maintains natural speech patterns. The technology preserves emotion, tone, and speaking style for authentic results."
      },
      {
        question: "What languages do you support?",
        answer: "We support 29 languages including Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Hindi, Arabic, Dutch, Swedish, Danish, Polish, Turkish, Greek, Bulgarian, Croatian, Czech, Filipino, Finnish, Indonesian, Malay, Romanian, Slovak, Tamil, and Ukrainian. We're constantly adding new languages based on user demand."
      },
      {
        question: "How long does it take to dub a video?",
        answer: "Most videos are processed within 2-10 minutes, depending on length and complexity. Short videos (under 5 minutes) typically complete in under 2 minutes."
      },
      {
        question: "Can I use my own voice for dubbing?",
        answer: "Yes! You can clone your own voice and use it for dubbing in different languages. This maintains consistency across your multilingual content."
      },
      {
        question: "What video formats do you support?",
        answer: "We support all major video formats including MP4, MOV, AVI, MKV, and more. You can also directly import from YouTube, Vimeo, and other platforms."
      },
      {
        question: "How much does it cost?",
        answer: "We offer a range of pricing plans to suit different needs. Our plans are designed to be flexible and affordable, whether you're a small creator or a large enterprise. For detailed information, please visit our pricing page."
      },
      {
        question: "Can I try it before buying?",
        answer: "Absolutely! Our free plan gives you 5 minutes of total dubbing to test the quality with no credit card required. You can dub multiple videos up to 30 seconds each to experience our AI dubbing firsthand."
      },
      {
        question: "Do you offer bulk discounts for multiple videos?",
        answer: "Our plans are already designed to provide great value for bulk dubbing with generous minute allowances. For enterprise customers with high-volume needs, please contact our sales team for custom pricing and volume discounts."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero {...heroProps} />
      {/* <LogoCloud /> */}
      <ProblemStatement {...problemStatementProps} />
      <ValueProposition {...valuePropositionProps} />
      <HowItWorks {...howItWorksProps} />
      {/* <SocialProof /> */}
      {/* <TeamSection /> */}
      <Pricing />
      <FAQ {...faqProps} />
      <Footer />
    </div>
  );
}
