import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ParticlesBackground from "@/components/ParticlesBackground";

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
      className={`${spaceGrotesk.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://db.onlinewebfonts.com/c/ef8a59c146027de56b9f1646a6c36ce0?family=Cassannet+Plus" />
      </head>
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
