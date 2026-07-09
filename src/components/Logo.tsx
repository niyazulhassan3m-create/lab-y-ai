import Link from "next/link";

export default function Logo({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className.includes("h-") ? "" : "h-16"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 160" fill="none" className={className}>
        <defs>
          <linearGradient id="zxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#9B2D3E"/>
            <stop offset="50%" stop-color="#7B1E2D"/>
            <stop offset="100%" stop-color="#5C1420"/>
          </linearGradient>
        </defs>

        {/* "ZiX" text */}
        <text x="0" y="72" font-family="'Inter','Segoe UI','Arial',sans-serif" font-size="62" font-weight="700" fill="url(#zxGrad)" letter-spacing="-0.5">ZiX</text>

        {/* Tagline */}
        <text x="0" y="102" font-family="'Space Grotesk','Inter','Arial',sans-serif" font-size="13" fill="#777" letter-spacing="5.5" font-weight="500">Innovating Intelligence</text>

        {/* Decorative line under tagline */}
        <line x1="0" y1="114" x2="218" y2="114" stroke="url(#zxGrad)" stroke-width="1.5" opacity="0.2"/>
      </svg>
    </Link>
  );
}
