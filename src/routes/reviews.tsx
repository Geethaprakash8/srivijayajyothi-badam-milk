import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Royal Milk Beverages" },
      { name: "description", content: "What our customers say about Royal Milk Beverages." },
      { property: "og:title", content: "Customer Reviews — Royal Milk Beverages" },
      { property: "og:description", content: "Loved by 2,000+ customers across the city." },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  { name: "Anjali R.", city: "Bengaluru", text: "The Badam Milk tastes exactly like homemade. The bottles arrive perfectly chilled." },
  { name: "Rohan M.", city: "Hyderabad", text: "Fast delivery and excellent packaging. The Pista Milk is unreal." },
  { name: "Sneha K.", city: "Chennai", text: "Best Rose Milk in town. You can tell the ingredients are real." },
  { name: "Vikram S.", city: "Mumbai", text: "A morning ritual now. The bottle design alone is worth it." },
  { name: "Priya D.", city: "Pune", text: "Hands down the freshest milk delivery in the city." },
  { name: "Arjun P.", city: "Delhi", text: "Reliable, premium, and reasonably priced. Highly recommend." },
];

function ReviewsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Reviews</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight text-deep-green sm:text-6xl">
          Trusted by 2,000+ <span className="gold-text italic">happy customers.</span>
        </h1>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="flex flex-col gap-5 rounded-3xl border border-border bg-white p-8">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, idx) => (<Star key={idx} className="h-4 w-4 fill-current" />))}
            </div>
            <blockquote className="font-display text-lg leading-snug text-deep-green">“{r.text}”</blockquote>
            <figcaption className="flex items-center gap-3 border-t border-border pt-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream font-display text-deep-green">{r.name[0]}</span>
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}