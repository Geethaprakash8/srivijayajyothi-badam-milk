import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { open, setOpen, enriched, setQty, remove, subtotal, deliveryFee, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Your Bag</p>
                <h2 className="font-display text-2xl text-deep-green">Shopping Cart</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-cream"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {enriched.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-cream text-deep-green">
                    <ShoppingBag className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="font-display text-xl text-deep-green">Your cart is empty</p>
                    <p className="mt-1 text-sm text-muted-foreground">Add a bottle to begin your order.</p>
                  </div>
                  <Link
                    to="/menu"
                    onClick={() => setOpen(false)}
                    className="mt-2 rounded-full bg-deep-green px-5 py-2.5 text-sm font-medium text-cream"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {enriched.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-2xl border border-border bg-card p-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-24 w-20 rounded-xl object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-lg leading-tight text-deep-green">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">₹{item.product.price} / bottle</p>
                          </div>
                          <button
                            onClick={() => remove(item.id)}
                            aria-label="Remove"
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="grid h-8 w-8 place-items-center text-deep-green"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="grid h-8 w-8 place-items-center text-deep-green"
                              aria-label="Increase"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="font-display text-base font-semibold">₹{item.lineTotal}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {enriched.length > 0 && (
              <div className="border-t border-border bg-cream/60 px-6 py-5">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <dt>Subtotal</dt>
                    <dd>₹{subtotal}</dd>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <dt>Delivery</dt>
                    <dd>₹{deliveryFee}</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-semibold text-deep-green">
                    <dt>Total</dt>
                    <dd>₹{total}</dd>
                  </div>
                </dl>
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-deep-green px-5 py-3.5 text-sm font-medium text-cream transition-transform hover:scale-[1.01]"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}