import Link from "next/link";

export default function Logo({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className.includes("h-") ? "" : "h-16"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 140" fill="none" className={className}>
        <defs>
          <linearGradient id="lb1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e07070"/>
            <stop offset="40%" stop-color="#d64b5a"/>
            <stop offset="100%" stop-color="#7B1E2D"/>
          </linearGradient>
          <radialGradient id="lbg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#9B2D3E" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#9B2D3E" stop-opacity="0"/>
          </radialGradient>
          <filter id="leg">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <mask id="lym">
            <rect x="0" y="0" width="140" height="140" fill="white"/>
            <g stroke="#000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
              <line x1="60" y1="55" x2="22" y2="14"/>
              <line x1="60" y1="55" x2="98" y2="14"/>
              <line x1="60" y1="55" x2="60" y2="106"/>
            </g>
          </mask>
        </defs>
        <circle cx="70" cy="70" r="62" fill="url(#lbg)"/>
        <g>
          <circle cx="60" cy="55" r="48" fill="url(#lb1)" mask="url(#lym)"/>
          <g stroke="#f0a0a0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.5">
            <line x1="60" y1="55" x2="22" y2="14"/>
            <line x1="60" y1="55" x2="98" y2="14"/>
            <line x1="60" y1="55" x2="60" y2="106"/>
          </g>
          <circle cx="22" cy="14" r="2.5" fill="#f0a0a0" filter="url(#leg)" opacity="0.7"/>
          <circle cx="98" cy="14" r="2.5" fill="#e07070" filter="url(#leg)" opacity="0.7"/>
          <circle cx="60" cy="106" r="2.5" fill="#d64b5a" filter="url(#leg)" opacity="0.7"/>
        </g>
        <text x="142" y="60" font-family="'Cassannet Plus','Sora','Inter',sans-serif" font-size="44" font-weight="700" fill="#f5f5f5" letter-spacing="3.5">LAB</text>
        <text x="248" y="64" font-family="'Cassannet Plus','Sora','Inter',sans-serif" font-size="48" font-weight="800" fill="url(#lb1)" letter-spacing="4">Y</text>
        <text x="142" y="94" font-family="'Space Grotesk','Inter',sans-serif" font-size="11.5" fill="#777" letter-spacing="7.5" font-weight="500">INNOVATING INTELLIGENCE</text>
        <line x1="142" y1="111" x2="370" y2="111" stroke="url(#lb1)" stroke-width="1" opacity="0.15"/>
      </svg>
    </Link>
  );
}
