import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dubtitle - AI-Powered Video Dubbing Coming Soon",
  description: "Transform your videos with automatic AI dubbing. Upload your video, select a target language, and get a professionally dubbed version instantly.",
  keywords: ["video dubbing", "AI dubbing", "video translation", "automatic dubbing", "dubtitle"],
  authors: [{ name: "Dubtitle Team" }],
  openGraph: {
    title: "Dubtitle - AI-Powered Video Dubbing Coming Soon",
    description: "Transform your videos with automatic AI dubbing. Upload your video, select a target language, and get a professionally dubbed version instantly.",
    url: "https://dubtitle.com",
    siteName: "Dubtitle",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubtitle - AI-Powered Video Dubbing Coming Soon",
    description: "Transform your videos with automatic AI dubbing. Coming soon!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-KPX62GPVQ2" />
        {children}
      </body>
    </html>
  );
}
