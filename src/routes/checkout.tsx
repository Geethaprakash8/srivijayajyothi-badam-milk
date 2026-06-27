import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Banknote, CheckCircle2, QrCode, Smartphone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Royal Milk Beverages" },
      { name: "description", content: "Complete your order — secure UPI and Cash on Delivery." },
    ],
  }),
  component: CheckoutPage,
});

type Payment = "upi" | "cod";

function CheckoutPage() {
  const navigate = useNavigate();
  const { enriched, subtotal, deliveryFee, total, clear } = useCart();
  const [payment, setPayment] = useState<Payment>("upi");
  const [upiApp, setUpiApp] = useState("gpay");
  const [placing, setPlacing] = useState(false);

  if (enriched.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-deep-green">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a bottle from the menu to begin checkout.</p>
        <Link to="/menu" className="mt-6 inline-flex rounded-full bg-deep-green px-6 py-3 text-sm font-medium text-cream">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Checkout</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-deep-green sm:text-5xl">
          Just a few details.
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPlacing(true);
          setTimeout(() => {
            const id = `RMB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
            clear();
            navigate({ to: "/order-success", search: { id, total } });
          }, 900);
        }}
        className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-8">
          <Card title="Delivery Address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Customer Name" name="name" required />
              <Field label="Mobile Number" name="phone" type="tel" required />
              <Field label="House Number" name="house" required />
              <Field label="Street" name="street" required />
              <Field label="Area" name="area" required />
              <Field label="City" name="city" required />
              <Field label="Pincode" name="pincode" required />
              <Field label="Landmark (Optional)" name="landmark" />
            </div>
            <div className="mt-4">
              <label htmlFor="notes" className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Order Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="Anything we should know?"
                className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </Card>

          <Card title="Payment Method">
            <div className="grid gap-3 sm:grid-cols-2">
              <PayOption
                active={payment === "upi"}
                onClick={() => setPayment("upi")}
                Icon={Smartphone}
                title="UPI"
                subtitle="Google Pay · PhonePe · Paytm · BHIM"
              />
              <PayOption
                active={payment === "cod"}
                onClick={() => setPayment("cod")}
                Icon={Banknote}
                title="Cash on Delivery"
                subtitle="Pay cash at your doorstep"
              />
            </div>

            {payment === "upi" ? (
              <div className="mt-6 rounded-2xl border border-border bg-cream/50 p-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "gpay", label: "Google Pay" },
                    { id: "phonepe", label: "PhonePe" },
                    { id: "paytm", label: "Paytm" },
                    { id: "bhim", label: "BHIM" },
                    { id: "upiid", label: "UPI ID" },
                  ].map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setUpiApp(a.id)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        upiApp === a.id
                          ? "border-deep-green bg-deep-green text-cream"
                          : "border-border bg-white text-foreground hover:border-gold"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
                {upiApp === "upiid" ? (
                  <div className="mt-4">
                    <Field label="Your UPI ID" name="upi" placeholder="name@bank" />
                  </div>
                ) : (
                  <div className="mt-5 flex items-center gap-4 rounded-2xl border border-dashed border-border bg-white p-5">
                    <div className="grid h-28 w-28 place-items-center rounded-xl bg-foreground/95 text-cream">
                      <QrCode className="h-14 w-14" />
                    </div>
                    <div>
                      <p className="font-display text-lg text-deep-green">Scan to pay</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Open your UPI app and scan the QR. Confirmation is automatic.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-cream/50 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-deep-green" />
                <p className="text-sm text-foreground">
                  Pay <span className="font-semibold">₹{total}</span> in cash at delivery. Please keep
                  exact change ready if possible.
                </p>
              </div>
            )}
          </Card>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card title="Order Summary">
            <ul className="space-y-3">
              {enriched.map((i) => (
                <li key={i.id} className="flex items-center gap-3">
                  <img src={i.product.image} alt="" className="h-14 w-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{i.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.qty}</p>
                  </div>
                  <p className="font-display text-sm font-semibold">₹{i.lineTotal}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-1.5 border-t border-border pt-4 text-sm">
              <Row label="Subtotal" value={`₹${subtotal}`} />
              <Row label="Delivery Fee" value={`₹${deliveryFee}`} />
              <Row label="Grand Total" value={`₹${total}`} bold />
            </dl>
            <button
              type="submit"
              disabled={placing}
              className="mt-6 w-full rounded-full bg-deep-green px-6 py-3.5 text-sm font-medium text-cream transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {placing ? "Placing order…" : `Place Order · ₹${total}`}
            </button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              By placing this order you agree to our terms of service.
            </p>
          </Card>
        </aside>
      </form>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-white p-7 shadow-[0_4px_30px_-25px_rgba(15,81,50,0.25)]">
      <h2 className="font-display text-2xl text-deep-green">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}

function PayOption({
  active,
  onClick,
  Icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  Icon: typeof Smartphone;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
        active ? "border-deep-green bg-cream" : "border-border bg-white hover:border-gold"
      }`}
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl ${
          active ? "bg-deep-green text-cream" : "bg-cream text-deep-green"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-semibold text-deep-green">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </button>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "border-t border-border pt-2 font-display text-lg font-semibold text-deep-green" : "text-muted-foreground"}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}