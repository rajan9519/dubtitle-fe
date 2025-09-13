import Hero from "./components/Hero";
import ProblemStatement from "./components/ProblemStatement";
import ValueProposition from "./components/ValueProposition";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Urgency from "./components/Urgency";
import Footer from "./components/Footer";
// import LogoCloud from "./components/LogoCloud";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero/>
      {/* <LogoCloud /> */}
      <ProblemStatement />
      <ValueProposition />
      <HowItWorks />
      {/* <SocialProof /> */}
      {/* <TeamSection /> */}
      <Urgency />
      <FAQ />
      <Footer />
    </div>
  );
}
