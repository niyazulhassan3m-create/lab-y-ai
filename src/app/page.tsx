"use client";

import { useState, useEffect, useCallback } from "react";
import { Inter } from "next/font/google";
import { Search, User, Menu, X, Star, Clock, Calendar, Play, ChevronLeft, ChevronRight } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const navLinks = ["Movies", "TV Series", "Editor's Pick", "Interviews", "User Reviews"];

const staggerNav = [100, 150, 200, 250, 300];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => setMobileOpen((p) => !p), []);

  useEffect(() => {
    document.body.style.fontFamily = "'Inter', sans-serif";
    return () => { document.body.style.fontFamily = ""; };
  }, []);

  return (
    <div className={`${inter.className} relative h-screen w-screen overflow-hidden bg-black text-white`}>
      <style jsx global>{`
        @keyframes blurFadeUp {
          from {
            opacity: 0;
            filter: blur(20px);
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
        .animate-blur-fade-up {
          opacity: 0;
          animation: blurFadeUp 1s ease-out forwards;
        }
        .liquid-glass {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.45) 0%,
            rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%,
            rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%,
            rgba(255,255,255,0.45) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
          type="video/mp4"
        />
      </video>

      {/* Bottom blur overlay — no dark gradient, only blur */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 45%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 45%)",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
        {/* Logo */}
        <div
          className="animate-blur-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <span className="text-lg md:text-xl font-semibold tracking-tight">CINEMATIC</span>
        </div>

        {/* Center nav links — desktop only */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href="#"
              className="animate-blur-fade-up text-sm hover:text-gray-300 transition-colors"
              style={{ animationDelay: `${staggerNav[i]}ms` }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Search — sm+ */}
          <div
            className="animate-blur-fade-up hidden sm:block"
            style={{ animationDelay: "350ms" }}
          >
            <button className="liquid-glass rounded-full flex items-center gap-2 px-4 md:px-6 py-2 text-sm">
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* User — sm+ */}
          <div
            className="animate-blur-fade-up hidden sm:block"
            style={{ animationDelay: "400ms" }}
          >
            <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center">
              <User size={18} />
            </button>
          </div>

          {/* Hamburger — below lg */}
          <div
            className="animate-blur-fade-up lg:hidden"
            style={{ animationDelay: "350ms" }}
          >
            <button
              onClick={toggleMobile}
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center relative"
            >
              <Menu
                size={20}
                className={`absolute transition-all duration-500 ease-out ${
                  mobileOpen ? "rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                }`}
              />
              <X
                size={20}
                className={`absolute transition-all duration-500 ease-out ${
                  mobileOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-50"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-[72px] left-0 right-0 z-40 transition-all duration-500 ease-out ${
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(17,17,17,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        <div className="border-t border-b border-gray-800 shadow-2xl px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className="py-3 px-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 text-sm"
                style={{
                  animation: mobileOpen ? `slideIn 0.5s ease-out ${i * 50}ms forwards` : "none",
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? "translateX(-12px)" : "none",
                }}
              >
                {link}
              </a>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col gap-3 sm:hidden">
            <button className="liquid-glass rounded-full flex items-center gap-3 px-4 py-3 text-sm w-full justify-center">
              <Search size={18} />
              Search
            </button>
            <button className="liquid-glass rounded-full flex items-center gap-3 px-4 py-3 text-sm w-full justify-center">
              <User size={18} />
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Hero content — bottom of viewport */}
      <div className="relative z-10 flex-1 flex flex-col justify-end h-[calc(100vh-80px)] px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
        <div className="flex flex-col md:flex-row items-end gap-8">
          {/* Left */}
          <div className="flex-1 w-full">
            {/* Metadata row */}
            <div
              className="animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm"
              style={{ animationDelay: "300ms" }}
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Star size={16} className="fill-white sm:w-5 sm:h-5" />
                8.7/10 IMDB
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                132 min
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                April, 2025
              </span>
            </div>

            {/* Title */}
            <h1
              className="animate-blur-fade-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter mb-4 md:mb-6"
              style={{ animationDelay: "400ms", letterSpacing: "-0.04em" }}
            >
              Step Through. Work Smarter.
            </h1>

            {/* Description */}
            <p
              className="animate-blur-fade-up text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl"
              style={{ animationDelay: "500ms" }}
            >
              A voyage through forgotten realms, where past and future intertwine.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                className="animate-blur-fade-up bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-gray-200 transition-colors"
                style={{ animationDelay: "600ms" }}
              >
                <Play size={18} fill="black" />
                Watch Now
              </button>
              <button
                className="animate-blur-fade-up liquid-glass rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3"
                style={{ animationDelay: "700ms" }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right — navigation arrows */}
          <div className="flex md:flex-col md:w-auto gap-3 self-start md:self-end mt-4 md:mt-0">
            <button
              className="animate-blur-fade-up liquid-glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-1"
              style={{ animationDelay: "800ms" }}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              className="animate-blur-fade-up liquid-glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-1"
              style={{ animationDelay: "900ms" }}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
