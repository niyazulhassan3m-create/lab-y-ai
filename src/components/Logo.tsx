import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className || "h-10"}`}>
      <img
        src="/LogoX.png"
        alt="ZiX AI Solutions"
        className="h-full w-auto object-contain"
        style={{ mixBlendMode: "multiply" }}
      />
    </Link>
  );
}
