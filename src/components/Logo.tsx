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
          <linearGradient id="zxMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#c84a4a"/>
            <stop offset="30%" stop-color="#9B2D3E"/>
            <stop offset="70%" stop-color="#7B1E2D"/>
            <stop offset="100%" stop-color="#e07070"/>
          </linearGradient>
          <linearGradient id="zxInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2a0a10"/>
            <stop offset="100%" stop-color="#1a0508"/>
          </linearGradient>
          <linearGradient id="zxGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e07070" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#c84a4a" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#7B1E2D" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="zxHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f0a0a0" stop-opacity="0"/>
            <stop offset="45%" stop-color="#f0a0a0" stop-opacity="0.6"/>
            <stop offset="55%" stop-color="#f0a0a0" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#f0a0a0" stop-opacity="0"/>
          </linearGradient>
          <filter id="zxBlur">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="zxSoft">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
          <filter id="zxGlowFilter">
            <feGaussianBlur stdDeviation="4"/>
          </filter>
        </defs>

        {/* "ZiX" text */}
        <text x="0" y="72" font-family="'Inter','Segoe UI','Arial',sans-serif" font-size="62" font-weight="700" fill="url(#zxGrad)" letter-spacing="-0.5">ZiX</text>

        {/* Circular emblem */}
        <g transform="translate(210, 20)">
          {/* Outer ring shadow */}
          <circle cx="60" cy="60" r="56" fill="none" stroke="#2a0a10" stroke-width="1" opacity="0.3" transform="translate(1,1)"/>

          {/* Outer metallic ring */}
          <circle cx="60" cy="60" r="54" fill="url(#zxInner)" stroke="url(#zxMetallic)" stroke-width="5"/>

          {/* Ring highlight */}
          <circle cx="60" cy="60" r="54" fill="none" stroke="url(#zxHighlight)" stroke-width="5" opacity="0.4"/>

          {/* Inner dark face */}
          <circle cx="60" cy="60" r="49" fill="#1a0508"/>

          {/* Ambient glow behind X */}
          <ellipse cx="60" cy="60" rx="44" ry="44" fill="url(#zxGlow)" opacity="0.15" filter="url(#zxGlowFilter)"/>

          {/* Diagonal line top-left to bottom-right */}
          <line x1="28" y1="28" x2="92" y2="92" stroke="url(#zxMetallic)" stroke-width="2.5" stroke-linecap="round" filter="url(#zxBlur)"/>

          {/* Diagonal line top-right to bottom-left */}
          <line x1="92" y1="28" x2="28" y2="92" stroke="url(#zxMetallic)" stroke-width="2.5" stroke-linecap="round" filter="url(#zxBlur)"/>

          {/* Data nodes along top-left to bottom-right */}
          <circle cx="28" cy="28" r="4" fill="#e07070" filter="url(#zxBlur)"/>
          <circle cx="44" cy="44" r="2.5" fill="#f0a0a0"/>
          <circle cx="60" cy="60" r="5" fill="#e07070" filter="url(#zxBlur)"/>
          <circle cx="76" cy="76" r="2.5" fill="#f0a0a0"/>
          <circle cx="92" cy="92" r="4" fill="#e07070" filter="url(#zxBlur)"/>

          {/* Data nodes along top-right to bottom-left */}
          <circle cx="92" cy="28" r="4" fill="#e07070" filter="url(#zxBlur)"/>
          <circle cx="76" cy="44" r="2.5" fill="#f0a0a0"/>
          <circle cx="44" cy="76" r="2.5" fill="#f0a0a0"/>
          <circle cx="28" cy="92" r="4" fill="#e07070" filter="url(#zxBlur)"/>

          {/* Signal wave top */}
          <path d="M48 18 Q54 12 60 18 Q66 24 72 18" stroke="#e07070" stroke-width="1.2" fill="none" opacity="0.5"/>
          <path d="M42 14 Q54 4 66 14 Q72 19 78 14" stroke="#d64b5a" stroke-width="0.8" fill="none" opacity="0.25"/>

          {/* Signal wave bottom */}
          <path d="M48 102 Q54 108 60 102 Q66 96 72 102" stroke="#e07070" stroke-width="1.2" fill="none" opacity="0.5"/>
          <path d="M42 106 Q54 116 66 106 Q72 101 78 106" stroke="#d64b5a" stroke-width="0.8" fill="none" opacity="0.25"/>

          {/* Signal wave left */}
          <path d="M12 48 Q6 54 12 60 Q18 66 12 72" stroke="#e07070" stroke-width="1.2" fill="none" opacity="0.5"/>

          {/* Signal wave right */}
          <path d="M108 48 Q114 54 108 60 Q102 66 108 72" stroke="#e07070" stroke-width="1.2" fill="none" opacity="0.5"/>
          <path d="M112 42 Q122 54 112 66 Q107 72 112 78" stroke="#d64b5a" stroke-width="0.8" fill="none" opacity="0.25"/>

          {/* Data pulse dots on signal waves */}
          <circle cx="48" cy="18" r="1.5" fill="#f0a0a0" opacity="0.8"/>
          <circle cx="72" cy="18" r="1.5" fill="#f0a0a0" opacity="0.8"/>
          <circle cx="48" cy="102" r="1.5" fill="#f0a0a0" opacity="0.8"/>
          <circle cx="72" cy="102" r="1.5" fill="#f0a0a0" opacity="0.8"/>
          <circle cx="12" cy="48" r="1.5" fill="#f0a0a0" opacity="0.8"/>
          <circle cx="12" cy="72" r="1.5" fill="#f0a0a0" opacity="0.8"/>
          <circle cx="108" cy="48" r="1.5" fill="#f0a0a0" opacity="0.8"/>
          <circle cx="108" cy="72" r="1.5" fill="#f0a0a0" opacity="0.8"/>
        </g>

        {/* Tagline */}
        <text x="0" y="102" font-family="'Space Grotesk','Inter','Arial',sans-serif" font-size="13" fill="#777" letter-spacing="5.5" font-weight="500">Innovating Intelligence</text>

        {/* Decorative line under tagline */}
        <line x1="0" y1="114" x2="218" y2="114" stroke="url(#zxGrad)" stroke-width="1.5" opacity="0.2"/>
      </svg>
    </Link>
  );
}
