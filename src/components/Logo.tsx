import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className || "h-10"}`}>
      <img
        src="/LogoX-transparent.png"
        alt="ZiX AI Solutions"
        className="h-full w-auto object-contain"
        style={{
          filter:
            "sepia(0.5) hue-rotate(-15deg) saturate(2.2) brightness(1.3) drop-shadow(0 0 14px rgba(224,112,112,0.5))",
        }}
      />
    </Link>
  );
}
