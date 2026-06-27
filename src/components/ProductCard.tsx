import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_4px_30px_-12px_rgba(15,81,50,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(15,81,50,0.25)]"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${product.accent}, var(--cream))` }}
      >
        <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-deep-green backdrop-blur">
          Fresh Today
        </span>
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={1000}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl tracking-tight text-deep-green">{product.name}</h3>
          <div className="text-right">
            <p className="font-display text-2xl font-semibold text-foreground">₹{product.price}</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">per bottle</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="mt-auto flex items-center gap-3 pt-2">
          <div className="inline-flex items-center rounded-full border border-border bg-cream">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-10 w-10 place-items-center text-deep-green transition-colors hover:text-gold"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-7 text-center text-sm font-semibold tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="grid h-10 w-10 place-items-center text-deep-green transition-colors hover:text-gold"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => {
              add(product.id, qty);
              toast.success(`${product.name} added to cart`, {
                action: { label: "View", onClick: () => setOpen(true) },
              });
            }}
            className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-deep-green px-5 py-3 text-sm font-medium text-cream transition-all hover:bg-foreground"
          >
            <ShoppingBag className="h-4 w-4 transition-transform group-hover/btn:-rotate-12" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}