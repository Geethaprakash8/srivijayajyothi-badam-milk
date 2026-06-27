import { Link } from "@tanstack/react-router";
import logoImg from "../assets/logo.png";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const fg = variant === "dark" ? "text-deep-green" : "text-cream";
  const subFg = variant === "dark" ? "text-muted-foreground" : "text-cream/80";
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5 sm:gap-3">
      <img
        src={logoImg}
        alt="Sri Vijaya Jyothi Badam Milks"
        className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
      />
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-display text-sm sm:text-base font-extrabold uppercase tracking-wider ${fg}`}>
          SRI VIJAYA JYOTHI
        </span>
        <span className={`mt-0.5 text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.26em] ${subFg}`}>
          BADAM MILKS
        </span>
      </span>
    </Link>
  );
}