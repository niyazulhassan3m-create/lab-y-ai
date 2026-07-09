"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/demos", label: "Demos" },
  { href: "/agents", label: "Agents" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <Link href="/" className="absolute top-0 left-0 z-50">
        <div style={{ height: 5 }}><Logo className="w-auto" /></div>
      </Link>
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <div className="hidden md:flex items-center gap-1 ml-8">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-2 rounded-lg text-[11px] font-medium tracking-[0.15em] uppercase transition-all ${
                    isActive
                      ? "text-accent-400 bg-accent-600/10"
                      : "text-grey-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex px-5 py-2 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent-500 transition-all"
          >
            Get Started
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-grey-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-[11px] font-medium tracking-[0.15em] uppercase ${
                  pathname === l.href
                    ? "text-accent-400 bg-accent-600/10"
                    : "text-grey-400"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg bg-accent-600 text-white text-[11px] font-bold tracking-[0.15em] uppercase text-center mt-3"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
