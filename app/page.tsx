"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import ProblemStatement from "./components/ProblemStatement";
import ValueProposition from "./components/ValueProposition";
import SocialProof from "./components/SocialProof";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Urgency from "./components/Urgency";
import Footer from "./components/Footer";
import LogoCloud from "./components/LogoCloud";
import TeamSection from "./components/TeamSection";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    
    try {
      const response = await fetch("https://api.subgen.in/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, "domain": "dubtitle.com" }),
      });
      
      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero onEmailSubmit={handleSubmit} email={email} setEmail={setEmail} loading={loading} status={status} />
      <LogoCloud />
      <ProblemStatement />
      <ValueProposition />
      <HowItWorks />
      <SocialProof />
      {/* <TeamSection /> */}
      <FAQ />
      <Urgency />
      <Footer />
    </div>
  );
}
