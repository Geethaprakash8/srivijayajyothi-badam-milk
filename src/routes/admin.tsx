import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import {
  ArrowUpRight,
  ChefHat,
  IndianRupee,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Royal Milk Beverages" },
      { name: "description", content: "Manage orders, products, customers and sales." },
    ],
  }),
  component: AdminPage,
});

const STATS = [
  { Icon: IndianRupee, label: "Revenue Today", value: "₹18,420", delta: "+12.4%" },
  { Icon: ShoppingCart, label: "Orders", value: "207", delta: "+8.1%" },
  { Icon: Users, label: "Customers", value: "1,842", delta: "+3.2%" },
  { Icon: Package, label: "Bottles Shipped", value: "2,341", delta: "+15.8%" },
];

const ORDERS = [
  { id: "RMB-8X2K9", name: "Anjali R.", items: 3, total: 205, status: "Out for delivery" },
  { id: "RMB-7Q1M4", name: "Rohan M.", items: 2, total: 145, status: "Preparing" },
  { id: "RMB-5T3L8", name: "Sneha K.", items: 6, total: 385, status: "Delivered" },
  { id: "RMB-9R6P2", name: "Vikram S.", items: 1, total: 85, status: "Confirmed" },
  { id: "RMB-4N7B5", name: "Priya D.", items: 4, total: 265, status: "Delivered" },
];

const STATUS_COLOR: Record<string, string> = {
  Confirmed: "bg-cream text-deep-green",
  Preparing: "bg-gold/20 text-gold",
  "Out for delivery": "bg-deep-green text-cream",
  Delivered: "bg-emerald-100 text-emerald-800",
};

function AdminPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Admin</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-deep-green sm:text-5xl">
            Today's Dashboard
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-deep-green px-5 py-2.5 text-sm font-medium text-cream">
          <ChefHat className="h-4 w-4" /> Start day's batch
        </button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="group rounded-3xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-gold/60">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream text-deep-green">
                <s.Icon className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
                <ArrowUpRight className="h-3 w-3" /> {s.delta}
              </span>
            </div>
            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-semibold text-deep-green">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-deep-green">Recent Orders</h2>
            <button className="text-xs font-medium text-deep-green hover:text-gold">View all</button>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Items</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="py-4 font-mono text-xs">{o.id}</td>
                    <td className="py-4 font-medium">{o.name}</td>
                    <td className="py-4">{o.items}</td>
                    <td className="py-4 font-display font-semibold">₹{o.total}</td>
                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${STATUS_COLOR[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6">
          <h2 className="font-display text-2xl text-deep-green">Products</h2>
          <ul className="mt-6 space-y-3">
            {PRODUCTS.map((p) => (
              <li key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-cream/40 p-3">
                <img src={p.image} alt="" className="h-14 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-deep-green">{p.name}</p>
                  <p className="text-xs text-muted-foreground">In stock · ₹{p.price}</p>
                </div>
                <button className="text-xs font-medium text-deep-green hover:text-gold">Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}