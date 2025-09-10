import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import { CurrencyProvider } from '../lib/currency-context';
import FloatingCurrencyToggle from './components/FloatingCurrencyToggle';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dubtitle - AI-Powered Video Dubbing Companion",
  description: "Transform your videos with automatic AI dubbing. Upload your video, select a target language, and get a professionally dubbed version instantly.",
  keywords: ["video dubbing", "AI dubbing", "video translation", "automatic dubbing", "dubtitle"],
  authors: [{ name: "Dubtitle Team" }],
  openGraph: {
    title: "Dubtitle - AI-Powered Video Dubbing Companion",
    description: "Transform your videos with automatic AI dubbing. Upload your video, select a target language, and get a professionally dubbed version instantly.",
    url: "https://dubtitle.com",
    siteName: "Dubtitle",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubtitle - AI-Powered Video Dubbing Companion",
    description: "Transform your videos with automatic AI dubbing. Upload your video, select a target language, and get a professionally dubbed version instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-KPX62GPVQ2" />
        <CurrencyProvider>
          {children}
          <FloatingCurrencyToggle />
        </CurrencyProvider>
      </body>
    </html>
  );
}
