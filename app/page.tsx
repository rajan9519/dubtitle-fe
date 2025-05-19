"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    
    try {
      const response = await fetch("https://api.subgen.in//contact-us", {
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-950 dark:to-pink-950">
      {/* Header */}
      <header className="container mx-auto p-6 md:p-8">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/dubtitle-logo.svg"
            alt="Dubtitle Logo"
            width={200}
            height={50}
            priority
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-4xl">
          <div className="mb-8">
            <Image
              src="/dub-icon.svg"
              alt="Video Dubbing"
              width={100}
              height={100}
              className="mx-auto mb-6 animate-float"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
            Coming Soon to Transform Your Videos
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
            Dubtitle is revolutionizing video dubbing with AI technology.
            Upload your video, select a target language, and get a professionally dubbed version instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="flex-1 max-w-xs bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-500 font-bold text-xl mb-2">Upload</div>
              <p className="text-gray-600 dark:text-gray-400">Upload your video in any language</p>
            </div>
            
            <div className="flex-1 max-w-xs bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-500 font-bold text-xl mb-2">Select</div>
              <p className="text-gray-600 dark:text-gray-400">Choose your target language</p>
            </div>
            
            <div className="flex-1 max-w-xs bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-500 font-bold text-xl mb-2">Download</div>
              <p className="text-gray-600 dark:text-gray-400">Get your professionally dubbed video</p>
            </div>
          </div>
          
          {/* Notify Me Form */}
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Be the first to know when we launch
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button 
                type="submit"
                className={`px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium rounded-lg transition-opacity ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Notify Me'}
              </button>
            </form>
            {status === "success" && (
              <p className="mt-3 text-green-600 dark:text-green-400">Thank you! We&apos;ll notify you when we launch.</p>
            )}
            {status === "error" && (
              <p className="mt-3 text-red-600 dark:text-red-400">Something went wrong. Please try again later.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto p-6 text-center text-gray-600 dark:text-gray-400">
        <div className="mb-4">
          <p>© 2025 Dubtitle. All rights reserved.</p>
        </div>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-indigo-500 transition-colors">Twitter</a>
          <a href="#" className="hover:text-indigo-500 transition-colors">Instagram</a>
          <a href="#" className="hover:text-indigo-500 transition-colors">LinkedIn</a>
          <a href="mailto:rajankumarsinghvnit@gmail.com" className="hover:text-indigo-500 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
