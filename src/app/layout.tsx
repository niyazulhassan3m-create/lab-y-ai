import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ParticlesBackground from "@/components/ParticlesBackground";

const cassannetPlus = localFont({
  src: "../fonts/cassannet-plus.woff2",
  weight: "400",
  variable: "--font-cassannet",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-heading-fallback",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lab-Y AI Solutions | B2B AI Products & SaaS",
  description:
    "Lab-Y delivers enterprise-grade SaaS, Micro SaaS, AI voice agents, and AI-integrated CRMs to transform your business operations.",
  openGraph: {
    title: "Lab-Y AI Solutions",
    description: "Enterprise AI products & SaaS for B2B businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cassannetPlus.variable} ${spaceGrotesk.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ParticlesBackground />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
