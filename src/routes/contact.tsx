import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Royal Milk Beverages" },
      { name: "description", content: "Get in touch with Royal Milk Beverages — phone, WhatsApp and email." },
      { property: "og:title", content: "Contact Royal Milk Beverages" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}

function ContactPage() {
  const [sending, setSending] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Contact</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-deep-green sm:text-6xl">
            We'd love to <span className="gold-text italic">hear from you.</span>
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Questions, feedback or a bulk order? Reach out — we usually reply within an hour.
          </p>
          <ul className="mt-10 space-y-3">
            {[
              { Icon: Phone, label: "Phone", value: "+91 90000 00000" },
              { Icon: MessageCircle, label: "WhatsApp", value: "+91 90000 00000" },
              { Icon: Mail, label: "Email", value: "hello@royalmilk.in" },
              { Icon: Clock, label: "Business Hours", value: "Mon — Sun · 6:00 AM to 10:00 PM" },
            ].map(({ Icon, label, value }) => (
              <li key={label} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cream text-deep-green">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              setSending(false);
              toast.success("Message sent! We'll get back to you shortly.");
              (e.target as HTMLFormElement).reset();
            }, 700);
          }}
          className="rounded-3xl border border-border bg-white p-8 shadow-[0_4px_30px_-20px_rgba(15,81,50,0.2)]"
        >
          <h2 className="font-display text-2xl text-deep-green">Send a message</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
          </div>
          <div className="mt-4">
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full rounded-full bg-deep-green px-6 py-3.5 text-sm font-medium text-cream transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}