import { Link } from "@tanstack/react-router";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const fg = variant === "dark" ? "text-deep-green" : "text-cream";
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${fg}`}>
      <span className="relative grid h-10 w-10 place-items-center rounded-full border border-gold/60 bg-gradient-to-br from-cream to-white shadow-sm transition-transform group-hover:rotate-6">
        <span className="font-display text-[1.05rem] font-semibold gold-text">S</span>
        <span className="absolute -inset-1 rounded-full border border-gold/20" />
      </span>
      <span className="flex flex-col justify-center leading-tight">
        <span className="font-display text-[1rem] font-bold tracking-tight">Srivijayajyothi</span>
        <span className="text-[0.68rem] font-medium uppercase tracking-widest text-muted-foreground">Badam Milk</span>
      </span>
    </Link>
  );
}