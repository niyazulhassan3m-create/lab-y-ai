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
          <linearGradient id="zxXGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e07070" stop-opacity="0.6"/>
            <stop offset="50%" stop-color="#c84a4a" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#7B1E2D" stop-opacity="0"/>
          </linearGradient>
          <filter id="zxNodeGlow">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="zxXGlowFilter">
            <feGaussianBlur stdDeviation="3"/>
          </filter>
        </defs>

        {/* Tech X mark */}
        <g transform="translate(6, 22)">
          {/* Glow behind X */}
          <rect x="-4" y="-4" width="68" height="68" rx="12" fill="url(#zxXGlow)" opacity="0.08" filter="url(#zxXGlowFilter)"/>

          {/* Main diagonal - top-left to bottom-right */}
          <line x1="8" y1="8" x2="52" y2="52" stroke="url(#zxGrad)" stroke-width="6" stroke-linecap="round"/>
          <line x1="8" y1="8" x2="52" y2="52" stroke="#c84a4a" stroke-width="2" stroke-linecap="round" opacity="0.4"/>

          {/* Main diagonal - top-right to bottom-left */}
          <line x1="52" y1="8" x2="8" y2="52" stroke="url(#zxGrad)" stroke-width="6" stroke-linecap="round"/>
          <line x1="52" y1="8" x2="8" y2="52" stroke="#c84a4a" stroke-width="2" stroke-linecap="round" opacity="0.4"/>

          {/* Circuit branches - top */}
          <line x1="20" y1="8" x2="20" y2="0" stroke="#9B2D3E" stroke-width="2" stroke-linecap="round"/>
          <circle cx="20" cy="0" r="2" fill="#e07070" filter="url(#zxNodeGlow)"/>
          <line x1="40" y1="8" x2="40" y2="0" stroke="#9B2D3E" stroke-width="2" stroke-linecap="round"/>
          <circle cx="40" cy="0" r="2" fill="#e07070" filter="url(#zxNodeGlow)"/>

          {/* Circuit branches - bottom */}
          <line x1="20" y1="52" x2="20" y2="60" stroke="#9B2D3E" stroke-width="2" stroke-linecap="round"/>
          <circle cx="20" cy="60" r="2" fill="#e07070" filter="url(#zxNodeGlow)"/>
          <line x1="40" y1="52" x2="40" y2="60" stroke="#9B2D3E" stroke-width="2" stroke-linecap="round"/>
          <circle cx="40" cy="60" r="2" fill="#e07070" filter="url(#zxNodeGlow)"/>

          {/* Circuit branches - left */}
          <line x1="8" y1="20" x2="0" y2="20" stroke="#9B2D3E" stroke-width="2" stroke-linecap="round"/>
          <circle cx="0" cy="20" r="2" fill="#e07070" filter="url(#zxNodeGlow)"/>
          <line x1="8" y1="40" x2="0" y2="40" stroke="#9B2D3E" stroke-width="2" stroke-linecap="round"/>
          <circle cx="0" cy="40" r="2" fill="#e07070" filter="url(#zxNodeGlow)"/>

          {/* Circuit branches - right */}
          <line x1="52" y1="20" x2="60" y2="20" stroke="#9B2D3E" stroke-width="2" stroke-linecap="round"/>
          <circle cx="60" cy="20" r="2" fill="#e07070" filter="url(#zxNodeGlow)"/>
          <line x1="52" y1="40" x2="60" y2="40" stroke="#9B2D3E" stroke-width="2" stroke-linecap="round"/>
          <circle cx="60" cy="40" r="2" fill="#e07070" filter="url(#zxNodeGlow)"/>

          {/* Node at center */}
          <circle cx="30" cy="30" r="5" fill="url(#zxGrad)" filter="url(#zxNodeGlow)"/>
          <circle cx="30" cy="30" r="2" fill="#f0a0a0"/>

          {/* Node endpoints */}
          <circle cx="8" cy="8" r="3.5" fill="url(#zxGrad)" filter="url(#zxNodeGlow)"/>
          <circle cx="8" cy="8" r="1.5" fill="#f0a0a0"/>
          <circle cx="52" cy="52" r="3.5" fill="url(#zxGrad)" filter="url(#zxNodeGlow)"/>
          <circle cx="52" cy="52" r="1.5" fill="#f0a0a0"/>
          <circle cx="52" cy="8" r="3.5" fill="url(#zxGrad)" filter="url(#zxNodeGlow)"/>
          <circle cx="52" cy="8" r="1.5" fill="#f0a0a0"/>
          <circle cx="8" cy="52" r="3.5" fill="url(#zxGrad)" filter="url(#zxNodeGlow)"/>
          <circle cx="8" cy="52" r="1.5" fill="#f0a0a0"/>

          {/* Data signal arcs */}
          <path d="M14 2 Q18 -4 22 2" stroke="#e07070" stroke-width="1" fill="none" opacity="0.4"/>
          <path d="M38 2 Q42 -4 46 2" stroke="#e07070" stroke-width="1" fill="none" opacity="0.4"/>
          <path d="M14 58 Q18 64 22 58" stroke="#e07070" stroke-width="1" fill="none" opacity="0.4"/>
          <path d="M38 58 Q42 64 46 58" stroke="#e07070" stroke-width="1" fill="none" opacity="0.4"/>
        </g>

        {/* "ZiX" text */}
        <text x="74" y="72" font-family="'Inter','Segoe UI','Arial',sans-serif" font-size="62" font-weight="700" fill="url(#zxGrad)" letter-spacing="-0.5">ZiX</text>

        {/* Tagline */}
        <text x="74" y="102" font-family="'Space Grotesk','Inter','Arial',sans-serif" font-size="13" fill="#777" letter-spacing="5.5" font-weight="500">Innovating Intelligence</text>

        {/* Decorative line under tagline */}
        <line x1="74" y1="114" x2="290" y2="114" stroke="url(#zxGrad)" stroke-width="1.5" opacity="0.2"/>
      </svg>
    </Link>
  );
}
