import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "AUREXIS SOLUTION | AI, Web & App Automation",
  description: "Building high-performance AI, Web, and App ecosystems for the next generation of industry leaders.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preload the Spline scene so download starts before JS parses — narrows
            the overlap window between WebGL shader compilation and entry animations */}
        <link
          rel="preload"
          href="https://prod.spline.design/Jk40Mo0ZdZwuYhtE/scene.splinecode"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <ChatbotWidget />
      </body>
    </html>
  );
}
