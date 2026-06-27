import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Royal Milk Beverages" },
      { name: "description", content: "Browse our hand-crafted milk beverages: Badam, Pista and Rose Milk." },
      { property: "og:title", content: "Menu — Royal Milk Beverages" },
      { property: "og:description", content: "Three signature bottles, hand-prepared fresh each morning." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Our Menu</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight text-deep-green sm:text-6xl">
          The full collection.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Three bottles, made the way they should be. Pick a flavour or grab one of each.
        </p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}