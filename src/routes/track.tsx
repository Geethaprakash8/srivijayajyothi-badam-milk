import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bike, CheckCircle2, ChefHat, ClipboardCheck, Package, Phone } from "lucide-react";

type Search = { id?: string };

export const Route = createFileRoute("/track")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Track Order — Royal Milk Beverages" },
      { name: "description", content: "Live status of your milk delivery." },
    ],
  }),
  component: TrackPage,
});

const STEPS = [
  { Icon: ClipboardCheck, label: "Order Confirmed" },
  { Icon: ChefHat, label: "Preparing" },
  { Icon: Bike, label: "Out for Delivery" },
  { Icon: CheckCircle2, label: "Delivered" },
];

function TrackPage() {
  const { id } = Route.useSearch();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s < STEPS.length - 1 ? s + 1 : s)), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Live Tracking</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-deep-green sm:text-5xl">
            Your order is on the way.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Order <span className="font-semibold text-foreground">{id ?? "RMB-XXXXXX"}</span> · ETA
            in 22 minutes
          </p>
        </div>
        <Link to="/menu" className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium hover:border-gold">
          Order Again
        </Link>
      </div>

      <div className="mt-12 rounded-3xl border border-border bg-white p-8">
        <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-4">
          {STEPS.map((s, i) => {
            const done = i <= step;
            const active = i === step;
            return (
              <li key={s.label} className="relative flex flex-col items-center text-center">
                {i < STEPS.length - 1 && (
                  <span className="absolute left-1/2 top-6 hidden h-0.5 w-full bg-border sm:block">
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: done ? "100%" : "0%" }}
                      transition={{ duration: 0.8 }}
                      className="block h-full bg-deep-green"
                    />
                  </span>
                )}
                <motion.span
                  animate={
                    active
                      ? { scale: [1, 1.08, 1], boxShadow: ["0 0 0 0 rgba(200,155,60,0.6)", "0 0 0 14px rgba(200,155,60,0)", "0 0 0 0 rgba(200,155,60,0)"] }
                      : {}
                  }
                  transition={active ? { duration: 1.8, repeat: Infinity } : {}}
                  className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border transition-colors ${
                    done ? "border-deep-green bg-deep-green text-cream" : "border-border bg-white text-muted-foreground"
                  }`}
                >
                  <s.Icon className="h-5 w-5" />
                </motion.span>
                <p className={`mt-3 text-sm font-semibold ${done ? "text-deep-green" : "text-muted-foreground"}`}>
                  {s.label}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-border bg-cream p-7">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Delivery Partner</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-deep-green font-display text-xl text-cream">
              R
            </div>
            <div className="flex-1">
              <p className="font-display text-xl text-deep-green">Ramesh K.</p>
              <p className="text-xs text-muted-foreground">Rider · Royal Express</p>
            </div>
            <a
              href="tel:+910000000000"
              className="inline-flex items-center gap-2 rounded-full bg-deep-green px-4 py-2.5 text-sm font-medium text-cream"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-3xl border border-border bg-white p-7">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-deep-green">
            <Package className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Insulated Pack</p>
            <p className="font-display text-lg text-deep-green">Chilled & sealed</p>
          </div>
        </div>
      </div>
    </section>
  );
}