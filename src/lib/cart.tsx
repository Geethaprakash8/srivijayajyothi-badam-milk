import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, DELIVERY_FEE, type Product } from "./products";

export type CartItem = { id: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  enriched: Array<CartItem & { product: Product; lineTotal: number }>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "rmb-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback((id: string, qty: number = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const enriched = useMemo(
    () =>
      items
        .map((i) => {
          const product = PRODUCTS.find((p) => p.id === i.id)!;
          return product ? { ...i, product, lineTotal: product.price * i.qty } : null;
        })
        .filter(Boolean) as CartContextValue["enriched"],
    [items],
  );

  const subtotal = enriched.reduce((s, i) => s + i.lineTotal, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{ items, open, setOpen, add, remove, setQty, clear, count, subtotal, deliveryFee, total, enriched }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}