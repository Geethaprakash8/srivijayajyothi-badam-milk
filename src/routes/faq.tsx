import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Royal Milk Beverages" },
      { name: "description", content: "Answers to common questions about delivery, payment, storage and more." },
      { property: "og:title", content: "FAQ — Royal Milk Beverages" },
      { property: "og:description", content: "Everything you need to know about ordering with us." },
    ],
  }),
  component: FaqPage,
});

const QA = [
  { q: "What are your delivery timings?", a: "We deliver every day between 6:00 AM and 10:00 PM. Most orders arrive within 30 to 45 minutes." },
  { q: "Which payment methods do you accept?", a: "We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM) and Cash on Delivery." },
  { q: "What's your refund policy?", a: "If anything's wrong with your order, message us within 24 hours and we'll refund or replace it." },
  { q: "How should I store the bottles?", a: "Keep refrigerated between 2–6°C. Best enjoyed within 24 hours of opening." },
  { q: "How long do the bottles stay fresh?", a: "Unopened bottles stay fresh for 48 hours when refrigerated. We bottle daily." },
  { q: "Do you offer bulk or subscription orders?", a: "Yes — message us on WhatsApp and we'll set up a custom plan for you." },
];

function FaqPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">FAQ</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight text-deep-green sm:text-6xl">
        Questions, <span className="gold-text italic">answered.</span>
      </h1>
      <Accordion type="single" collapsible className="mt-10 space-y-3">
        {QA.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-white px-5">
            <AccordionTrigger className="py-5 text-left font-display text-lg text-deep-green hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}