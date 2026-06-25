export default function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl ${
        hover ? "hover:border-accent-600/30 hover:bg-white/[0.05] transition-all duration-500" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
