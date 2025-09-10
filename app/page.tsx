"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../lib/auth";
import Hero from "./components/Hero";
import ProblemStatement from "./components/ProblemStatement";
import ValueProposition from "./components/ValueProposition";
import SocialProof from "./components/SocialProof";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Urgency from "./components/Urgency";
import Footer from "./components/Footer";
// import LogoCloud from "./components/LogoCloud";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          router.push("/dashboard");
          return;
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero/>
      {/* <LogoCloud /> */}
      <ProblemStatement />
      <ValueProposition />
      <HowItWorks />
      <SocialProof />
      {/* <TeamSection /> */}
      <Urgency />
      <FAQ />
      <Footer />
    </div>
  );
}
