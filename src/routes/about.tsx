import { createFileRoute } from "@tanstack/react-router";
import heroImg from "../assets/badam-milk.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Royal Milk Beverages" },
      { name: "description", content: "The story of Royal Milk Beverages — tradition, fresh ingredients, and craft." },
      { property: "og:title", content: "About Royal Milk Beverages" },
      { property: "og:description", content: "Traditional recipes. Fresh ingredients. Crafted daily." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Our Story</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-deep-green sm:text-6xl">
            A family recipe, <span className="gold-text italic">bottled with love.</span>
          </h1>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Royal Milk Beverages began in a small home kitchen, with three traditional recipes
              passed down through generations. Today, we still prepare every bottle by hand — using
              fresh milk from trusted local dairies, real almonds and pistachios, and natural rose essence.
            </p>
            <p>
              No shortcuts. No preservatives. Just freshness in every bottle, delivered chilled to
              your door each morning.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6">
            {[
              { k: "2018", v: "Founded" },
              { k: "100%", v: "Pure Milk" },
              { k: "Daily", v: "Bottled fresh" },
            ].map((s) => (
              <div key={s.v} className="border-l border-border pl-4 first:border-l-0 first:pl-0">
                <dt className="font-display text-2xl font-semibold text-deep-green">{s.k}</dt>
                <dd className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] border border-border">
          <img src={heroImg} alt="Bottles" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}