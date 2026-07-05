import { Space_Grotesk, Sora } from "next/font/google";
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

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ParticlesBackground />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}
