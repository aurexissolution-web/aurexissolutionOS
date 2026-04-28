import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "AUREXIS SOLUTION | AI, Web & App Automation",
  description: "Building high-performance AI, Web, and App ecosystems for the next generation of industry leaders.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <ChatbotWidget />
      </body>
    </html>
  );
}
