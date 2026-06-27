import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const path = useLocation({ select: (l) => l.pathname });
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobile(false), [path]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 sm:h-18 max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 py-2 sm:px-8 sm:py-3">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-deep-green" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-cream"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden h-10 items-center gap-2 rounded-full border border-border bg-white px-4 text-sm font-medium text-deep-green transition-all hover:border-gold hover:shadow-sm sm:inline-flex"
          >
            <User className="h-4 w-4" />
            Login
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="relative inline-flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-full brand-gradient px-3.5 sm:px-4 text-xs sm:text-sm font-medium text-cream transition-transform hover:scale-[1.03] shadow-sm"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="grid h-4 min-w-4 sm:h-5 sm:min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] sm:text-[11px] font-semibold text-deep-green">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobile((v) => !v)}
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-border bg-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-cream"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/auth"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-medium"
              >
                <User className="h-4 w-4" /> Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}