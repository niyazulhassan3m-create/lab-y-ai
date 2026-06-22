import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/demos", label: "Demos" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Lab Y - Innovating Intelligence"
              className="h-14 w-auto"
            />
          </Link>
          <div className="flex items-center gap-6">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-grey-500 hover:text-accent-400 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-[11px] text-grey-600">
            &copy; {new Date().getFullYear()} Lab Y AI Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] text-grey-600">
            <span className="hover:text-accent-400 transition-colors cursor-pointer">hello@lab-y.ai</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="hover:text-accent-400 transition-colors cursor-pointer">LinkedIn</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="hover:text-accent-400 transition-colors cursor-pointer">X</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
