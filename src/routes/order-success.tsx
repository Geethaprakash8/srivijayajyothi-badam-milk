import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, MapPin, Timer } from "lucide-react";

type Search = { id?: string; total?: number };

export const Route = createFileRoute("/order-success")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
    total: typeof s.total === "number" ? s.total : Number(s.total) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Royal Milk Beverages" },
      { name: "description", content: "Your order has been placed successfully." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { id, total } = Route.useSearch();
  const orderId = id ?? "RMB-XXXXXX";

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-deep-green text-cream shadow-[0_20px_50px_-15px_rgba(15,81,50,0.5)]"
      >
        <Check className="h-12 w-12" strokeWidth={2.5} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 font-display text-4xl tracking-tight text-deep-green sm:text-5xl"
      >
        Thank you for your order.
      </motion.h1>
      <p className="mt-3 text-muted-foreground">
        Your beverages are being prepared and will arrive chilled.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-white p-6 text-left">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Order Number</p>
          <p className="mt-2 font-display text-2xl font-semibold text-deep-green">{orderId}</p>
          {total && (
            <p className="mt-1 text-sm text-muted-foreground">Total ₹{total}</p>
          )}
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 text-left">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <Timer className="h-3.5 w-3.5" /> Estimated Delivery
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-deep-green">30 – 45 min</p>
          <p className="mt-1 text-sm text-muted-foreground">Fresh, chilled, at your door</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/track"
          search={{ id: orderId }}
          className="inline-flex items-center gap-2 rounded-full bg-deep-green px-6 py-3.5 text-sm font-medium text-cream"
        >
          <MapPin className="h-4 w-4" /> Track Order
        </Link>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-medium text-foreground hover:border-gold"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}